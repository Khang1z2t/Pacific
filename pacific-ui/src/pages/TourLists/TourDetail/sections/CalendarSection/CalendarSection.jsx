import React, {useEffect, useState} from 'react';
import {Button, Calendar, Card, Divider, Image, Menu, Skeleton} from 'antd';
import dayjs from 'dayjs';
import BookingServices from '~/services/BookingServices';
import config from '~/config';
import TourDetailServices from '~/services/TourDetailServices';
import HotelServices from '~/services/HotelServices';
import TransportServices from '~/services/TransportServices';
import {FaBus, FaCalendarAlt, FaChild, FaHotel, FaMoneyBill, FaUser} from 'react-icons/fa';
import {PhoneOutlined} from '@ant-design/icons';
import {useNavigate} from 'react-router-dom';

export const CalendarSection = ({data}) => {
    const [loading, setLoading] = useState(false);
    const [month, setMonth] = useState([]);
    const [days, setDays] = useState([]);
    const [tourDetail, setTourDetail] = useState(data.detail[0]);
    const [transport, setTransport] = useState({});
    const [hotel, setHotel] = useState({});
    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedDay, setSelectedDay] = useState();
    const [toggle, setToggle] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        BookingServices.getInfoMonth(data.id)
            .then((res) => setMonth(res.data))
            .catch((err) => console.error(err));
    }, []);

    const handleSelectedMonth = async (month) => {
        setSelectedMonth(month);
        setToggle(true);
        await BookingServices.getInfoDay({tourId: data.id, months: month})
            .then((res) => setDays(res.data))
            .catch((err) => console.error(err));
    };

    const selectTourDetail = async (id) => {
        setToggle(false); // Chuyển sang Card thông tin tour trước
        setLoading(true); // Bật Skeleton sau khi chuyển
        await TourDetailServices.getTourDetailById(id)
            .then((res) => {
                setTourDetail(res.data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false)); // Tắt Skeleton khi API hoàn tất
    };

    useEffect(() => {
        if (month.length > 0) {
            setSelectedMonth(month[0]?.getDate);
            handleSelectedMonth(month[0]?.getDate);
        }
    }, [month]);

    useEffect(() => {
        if (tourDetail?.hotelId) {
            HotelServices.getHotelById(tourDetail.hotelId)
                .then((res) => setHotel(res))
                .catch((err) => console.error(err));
        }
        if (tourDetail?.transportId) {
            TransportServices.getTransportById(tourDetail.transportId)
                .then((res) => setTransport(res))
                .catch((err) => console.error(err));
        }
    }, [tourDetail]);

    return (
        <>
            {/* Phần hình ảnh và booking info giữ nguyên */}
            <div className="flex justify-between px-8 py-6">
                <div className="flex flex-col w-full">
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        <Image src={config.imageConfig.getImage(data.thumbnail)} alt="Main Tour" height={650}
                               rootClassName="col-span-3 rounded-xl w-full object-cover shadow-lg"/>
                        <div className="flex flex-col gap-2">
                            {data.images.map((img, index) => (
                                <Image key={index} src={config.imageConfig.getImage(img)} alt={'subImage'}
                                       rootClassName="rounded-xl w-full h-full hover:cursor-pointer shadow-lg object-cover"/>
                            ))}
                        </div>
                    </div>
                </div>
                <Card className="max-w-sm p-4 h-fit sticky top-20 shadow-xl ms-10 rounded-2xl">
                    <h2 className="text-2xl font-semibold mb-4 text-red-600">Giá: {config.webConfig.getCurrency(tourDetail?.priceAdults)} /
                        Người</h2>
                    <p className="bg-red-100 text-red-600 p-2 rounded mb-2">Đặt ngay để nhận ưu đãi giờ chót tiết kiệm
                        thêm 300K</p>
                    <div className="space-y-2">
                        <p><strong>Mã tour:</strong> {data.id}</p>
                        <p><strong>Khởi hành:</strong> {data.destination}</p>
                        <p><strong>Ngày khởi
                            hành:</strong> {tourDetail.startDate ? config.webConfig.convertDateNoTime(tourDetail.startDate) : 'Chưa có thông tin'}
                        </p>
                        <p><strong>Thời gian:</strong> {data.duration} ngày {data.duration - 1} đêm</p>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <Button
                            disabled={tourDetail?.priceAdults === null || !days.some((day) => day.status === 'OPEN')}
                            onClick={() => navigate(config.routes.booking + `${tourDetail.id}`)}
                            type="primary"
                            className="bg-red-500 w-full">Đặt tour</Button>
                    </div>
                    <div className="mt-4">
                        <Button icon={<PhoneOutlined/>} className="w-full bg-gray-100">Gọi miễn phí qua
                            internet</Button>
                    </div>
                </Card>
            </div>

            <Divider className={'my-8'}><p className={'font-bold uppercase text-orange-400 text-3xl'}
                                           align={'center'}>Lịch trình khởi hành</p></Divider>

            <div className="flex p-4 space-x-4">
                <Card className="max-w-1/4 h-[435px] border-r p-4 shadow-lg">
                    <h2 className="font-bold mb-2">Chọn tháng</h2>
                    <Menu defaultSelectedKeys={selectedMonth} mode="vertical">
                        {month.map((m) => (
                            <Menu.Item onClick={() => handleSelectedMonth(m.getDate)}
                                       className={'text-blue-500 font-bold'}
                                       key={m.getDate}>{config.webConfig.convertMonthYear(m.getDate)}</Menu.Item>
                        ))}
                    </Menu>
                </Card>

                <div className={'transition-all'}>
                    {toggle ? (
                        <Card className={'w-3/4 h-[435px] shadow-lg'}>
                            <Calendar
                                value={selectedMonth ? dayjs(selectedMonth, 'YYYY-MM') : dayjs()}
                                fullscreen={false}
                                onPanelChange={(date) => handleSelectedMonth(date.format('YYYY-MM'))}
                                headerRender={() => null}
                                fullCellRender={(date) => {
                                    const day = date.date();
                                    const monthYear = date.format('YYYY-MM');
                                    const currentMonth = selectedMonth || dayjs().format('YYYY-MM');
                                    const validDay = days.find((d) => Number(d.getDate) === day && monthYear === currentMonth); // Chỉ lấy ngày trong tháng hiện tại

                                    return (
                                        <div
                                            onClick={() => {
                                                if (validDay && validDay.status !== 'IN_PROGRESS' && validDay.status !== 'CLOSED') {
                                                    setSelectedDay(validDay.getDate); // Lưu ngày
                                                    selectTourDetail(validDay.getId).then(r => r); // Gọi API với getId
                                                }
                                            }}
                                            className={`text-center p-2 rounded-lg transition-colors duration-200 
                                            ${
                                                monthYear !== currentMonth
                                                    ? 'text-gray-300'
                                                    : validDay
                                                        ? validDay.status === 'OPEN'
                                                            ? 'border border-blue-500 text-blue-500 hover:bg-blue-100 cursor-pointer'
                                                            : validDay.status === 'IN_PROGRESS'
                                                                ? 'border border-orange-500 text-orange-500 cursor-not-allowed'
                                                                : validDay.status === 'CLOSED'
                                                                    ? 'border border-gray-500 text-gray-500 cursor-not-allowed'
                                                                    : 'border border-red-500 text-red-500 hover:bg-red-100 cursor-pointer' // Trạng thái khác (ví dụ: ACTIVE)
                                                        : 'text-gray-700'
                                            }`}
                                        >
                                            {day}
                                            {validDay && (
                                                <div className="text-xs font-bold">
                                                    {validDay.status === 'OPEN'
                                                        ? 'Tour đang mở!'
                                                        : validDay.status === 'IN_PROGRESS'
                                                            ? 'Tour đang diễn ra!'
                                                            : validDay.status === 'CLOSED'
                                                                ? 'Tour đã đóng!'
                                                                : 'Tour đang bán!'}
                                                </div>
                                            )}
                                        </div>
                                    );
                                }}
                            />
                        </Card>
                    ) : (
                        <Card className="w-[960px] p-6 shadow-lg rounded-xl">
                            {loading ? (
                                <Skeleton active paragraph={{rows: 10}} style={{padding: '20px'}}/>
                            ) : (
                                <>
                                    <h2 className="font-bold text-red-500 text-3xl text-center">
                                        {selectedDay}/{config.webConfig.convertMonthYear(selectedMonth)}
                                    </h2>
                                    <div className="mt-4">
                                        <h2 className="text-orange-500 text-center text-xl font-bold uppercase">Thông
                                            tin khởi hành</h2>
                                        <div className="grid grid-cols-3 gap-4 mt-4 text-gray-700">
                                            <p className="flex flex-col gap-2 font-semibold">
                                                <div className={'flex flex-wrap gap-2 items-center'}>
                                                    <FaHotel className="text-orange-500"/> Khách sạn: <span
                                                    className="text-gray-500">{hotel.name || 'Đang tải...'}</span>
                                                </div>
                                                <div className={'flex flex-wrap gap-2 items-center'}>
                                                    <FaMoneyBill className={'text-orange-500'}/> Giá: <span
                                                    className="text-gray-500">{config.webConfig.getCurrency(hotel.cost) || 'Đang tải...'}</span>
                                                </div>
                                            </p>
                                            <p className="flex flex-col gap-2 font-semibold">
                                                <div className={'flex flex-wrap gap-2 items-center'}>
                                                    <FaBus className="text-orange-500"/> Phương tiện: <span
                                                    className="text-gray-500">{transport.name || 'Đang tải...'}</span>
                                                </div>
                                                <div className={'flex flex-wrap gap-2 items-center'}>
                                                    <FaMoneyBill className={'text-orange-500'}/> Giá: <span
                                                    className="text-gray-500">{config.webConfig.getCurrency(transport.cost) || 'Đang tải...'}</span>
                                                </div>
                                            </p>
                                            <p className="flex flex-col gap-2 font-semibold">
                                                <div className={'flex flex-wrap gap-2 items-center'}>
                                                    <FaCalendarAlt className="text-orange-500"/> Ngày khởi hành: <span
                                                    className="text-gray-500">{selectedDay}/{config.webConfig.convertMonthYear(selectedMonth)}</span>
                                                </div>
                                                <div className={'flex flex-wrap gap-2 items-center'}>
                                                    <FaCalendarAlt className={'text-orange-500'}/> Ngày về: <span
                                                    className={'text-gray-500'}>{tourDetail.endDate ? config.webConfig.convertDateNoTime(tourDetail.endDate) : `${selectedDay}/${config.webConfig.convertMonthYear(selectedMonth)}`}</span>
                                                </div>
                                            </p>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <h2 className="text-center text-orange-500 text-xl font-bold uppercase">Giá
                                        tour</h2>
                                    <div className="grid grid-cols-2 gap-6 p-4">
                                        <div className="space-y-3">
                                            <p className="font-semibold text-lg flex items-center gap-2">
                                                <FaUser className="text-red-500"/> Người lớn: <span
                                                className="text-red-500">{config.webConfig.getCurrency(tourDetail.priceAdults)}</span>
                                            </p>
                                            <p className="font-semibold text-lg flex items-center gap-2">
                                                <FaChild className="text-red-500"/> Trẻ em: <span
                                                className="text-red-500">{config.webConfig.getCurrency(tourDetail.priceChildren)}</span>
                                            </p>
                                        </div>
                                        <div className="space-y-3">
                                            <p className="font-semibold text-lg flex items-center gap-2">
                                                <FaHotel className="text-red-500"/> Giá khách sạn: <span
                                                className="text-red-500">{config.webConfig.getCurrency(hotel.cost)}</span>
                                            </p>
                                            <p className="font-semibold text-lg flex items-center gap-2">
                                                <FaBus className="text-red-500"/> Giá phương tiện: <span
                                                className="text-red-500">{config.webConfig.getCurrency(transport.cost)}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <Divider/>
                                    <p className="text-red-500 text-center font-bold italic p-4 rounded-lg bg-blue-50 mx-auto w-fit">
                                        Giá tour mỗi người chưa bao gồm khách sạn, dịch vụ, phương tiện - Chúc bạn có
                                        chuyến đi vui
                                        vẻ!
                                    </p>
                                </>
                            )}
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
};