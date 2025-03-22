import React, { useEffect, useState } from 'react';
import { Menu, Calendar, Modal, Card, Divider, Button } from 'antd';
import dayjs from 'dayjs';
import { LocationDetails } from '~/pages/TourLists/TourDetail/sections/CalendarSection/Components/LocationDetails';
import BookingServices from '~/services/BookingServices';
import config from '~/config';
import TourDetailServices from '~/services/TourDetailServices';
import HotelServices from '~/services/HotelServices';
import TransportServices from '~/services/TransportServices';
import { FaBus, FaCalendarAlt, FaChild, FaHotel, FaUser } from 'react-icons/fa';
import { PhoneOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const CalendarSection = ({ data }) => {
    const [loading, setLoading] = useState(false);
    const [month, setMonth] = useState([]);
    const [days, setDays] = useState([]);
    const [tourDetail, setTourDetail] = useState([]);
    const [transport, setTransport] = useState({});
    const [hotel, setHotel] = useState({});
    const [quantity, setQuantity] =  useState('');
    const [orderInfo, setOrderInfo] = useState('');
    const images = data.images;
    const price = data.priceAdults;
    const navigate = useNavigate();

    const [selectedMonth, setSelectedMonth] = useState();
    const [selectedDay, setSelectedDay] = useState();

    const [toggle, setToggle] = useState(true);
    const [display, setDisplay] = useState(false);


    // useEffect
    useEffect(() => {
        BookingServices.getInfoMonth(data.id).then((res) => {
            setMonth(res.data);
        }).catch((err) => {
            console.error(err);
        });
    }, []);


    // handles
    const handleSelectedMonth = (month) => {
        setSelectedMonth(month);
        setToggle(true);
        BookingServices.getInfoDay({ tourId: data.id, months: month }).then((res) => {
            setDays(res.data);
        }).catch((err) => {
            console.error(err);
        });
    };

    const selectTourDetail = async (id) => {
        await TourDetailServices.getTourDetailById(id).then((res) => {
            setTourDetail(res.data);
            setLoading(true);
            setToggle(!toggle);
        }).catch((err) => {
            console.error(err);
        });
    };
    // render
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
            <div className="flex justify-between px-8 py-6">
                {/* Left Section: Image Gallery and Title */}
                <div className="flex flex-col w-full">
                    <div className="grid grid-cols-4 gap-2 mb-4">
                        <img src={config.imageConfig.getImage(data.thumbnail)} alt="Main Tour"
                             className="col-span-3 rounded-xl w-full max-h-[650px] object-cover shadow-lg" />
                        <div className="flex flex-col gap-2">
                            {images.map((img, index) => (
                                <img key={index} src={config.imageConfig.getImage(img)} alt={'subImage'}
                                     className="rounded-xl w-full h-full hover:cursor-pointer shadow-lg object-cover" />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Section: Booking Info */}
                <Card className="max-w-sm p-4 h-fit sticky top-20 shadow-xl ms-10 rounded-2xl">
                    <h2 className="text-2xl font-semibold mb-4 text-red-600">Giá: {config.webConfig.getCurrency(data.maxPrice)} /
                        Khách</h2>
                    <p className="bg-red-100 text-red-600 p-2 rounded mb-2">
                        Đặt ngay để nhận ưu đãi giờ chót tiết kiệm thêm 300K
                    </p>
                    <div className="space-y-2">
                        <p><strong>Mã tour:</strong> NDSGN841-017-270924XE-H</p>
                        <p><strong>Khởi hành:</strong> {data.destination}</p>
                        <p><strong>Ngày khởi hành:</strong> {data.createdAt}</p>
                        <p><strong>Thời gian:</strong> {data.duration} ngày {data.duration - 1} đêm</p>
                        <p><strong>Số chỗ còn:</strong> 9 chỗ</p>
                    </div>
                    <div className="flex space-x-4 mt-4">
                        <Button
                            onClick={() => navigate(config.routes.booking + `${data.id}`)}
                            type="primary" className="bg-red-500 hover:bg-red-700 w-full">
                            Đặt tour
                        </Button>
                    </div>
                    <div className="mt-4">
                        <Button icon={<PhoneOutlined />} className="w-full bg-gray-100">
                            Gọi miễn phí qua internet
                        </Button>
                    </div>
                </Card>
            </div>
            <Divider className={"my-8"}><p className={"font-bold uppercase text-orange-400 text-3xl"} align={"center"}>Lịch trình khởi hành</p></Divider>
            <div className="flex p-4 space-x-4">
                {/* Month Picker */}
                <Card className="max-w-1/4 h-[435px] border-r p-4 shadow-lg">
                    <h2 className="font-bold mb-2">Chọn tháng</h2>
                    <Menu
                        defaultSelectedKeys={selectedMonth}
                        mode="vertical">
                        {month.map((m) => (
                            <Menu.Item
                                onClick={() => {
                                    handleSelectedMonth(m.getDate);
                                }}
                                className={'text-blue-500 font-bold'}
                                key={m.getDate}>{config.webConfig.convertMonthYear(m.getDate)}</Menu.Item>
                        ))}
                    </Menu>
                </Card>

                {/* Date Picker */}
                <div className={'transition-all'}>
                    {toggle ? (
                        <Card className={'w-3/4 h-[435px] shadow-lg'}>
                            <Calendar
                                value={selectedMonth ? dayjs(selectedMonth, 'YYYY-MM') : dayjs()}
                                fullscreen={false}
                                headerRender={() => null}
                                dateFullCellRender={(date) => {
                                    const day = date.date();
                                    const monthYear = date.format('YYYY-MM');
                                    const currentMonth = selectedMonth || dayjs().format('YYYY-MM');
                                    const validDay = days.find((d) => Number(d.getDate) === day);
                                    return (
                                        <div
                                            onClick={() => {
                                                if (validDay) {
                                                    setSelectedDay(validDay.getDate);
                                                    selectTourDetail(validDay.getId);
                                                }
                                            }}
                                            className={`text-center p-2 rounded-lg transition-colors duration-200 
                                        ${
                                                monthYear !== currentMonth
                                                    ? 'text-gray-300' // Làm mờ ngày không thuộc tháng
                                                    : validDay
                                                        ? 'border border-red-500 text-red-500 hover:bg-red-100 cursor-pointer'
                                                        : 'text-gray-700'
                                            }`}
                                        >
                                            {day}
                                            {validDay && <div className="text-xs font-bold">Tour đang bán!</div>}
                                        </div>
                                    );
                                }}

                            />
                        </Card>
                    ) : (
                        <Card className="w-[960px] p-6 shadow-lg rounded-xl">
                            {/* Tiêu đề ngày khởi hành */}
                            <h2 className="font-bold text-red-500 text-3xl text-center">
                                {selectedDay}/{config.webConfig.convertMonthYear(selectedMonth)}
                            </h2>

                            {/* Thông tin khởi hành */}
                            <div className="mt-4">
                                <h2 className="text-orange-500 text-center text-xl font-bold uppercase">
                                    Thông tin khởi hành
                                </h2>
                                <div className="grid grid-cols-3 gap-4 mt-4 text-gray-700">
                                    <p className="flex items-center gap-2 font-semibold">
                                        <FaHotel className="text-orange-500" /> Khách sạn: <span
                                        className="text-gray-500">{hotel.name}</span>
                                    </p>
                                    <p className="flex items-center gap-2 font-semibold">
                                        <FaBus className="text-orange-500" /> Phương tiện: <span
                                        className="text-gray-500">{transport.name}</span>
                                    </p>
                                    <p className="flex items-center gap-2 font-semibold">
                                        <FaCalendarAlt className="text-orange-500" /> Ngày khởi hành: <span
                                        className="text-gray-500">{selectedDay}/{config.webConfig.convertMonthYear(selectedMonth)}</span>
                                    </p>
                                </div>
                            </div>

                            <Divider />

                            {/* Giá tour */}
                            <h2 className="text-center text-orange-500 text-xl font-bold uppercase">Giá tour</h2>
                            <div className="grid grid-cols-2 gap-6 p-4">
                                <div className="space-y-3">
                                    <p className="font-semibold text-lg flex items-center gap-2">
                                        <FaUser className="text-red-500" /> Người lớn:
                                        <span
                                            className="text-red-500">{config.webConfig.getCurrency(tourDetail.priceAdults)}</span>
                                    </p>
                                    <p className="font-semibold text-lg flex items-center gap-2">
                                        <FaChild className="text-red-500" /> Trẻ em:
                                        <span
                                            className="text-red-500">{config.webConfig.getCurrency(tourDetail.priceChildren)}</span>
                                    </p>
                                </div>
                                <div className="space-y-3">
                                    <p className="font-semibold text-lg flex items-center gap-2">
                                        <FaHotel className="text-red-500" /> Giá khách sạn:
                                        <span className="text-red-500">{config.webConfig.getCurrency(hotel.cost)}</span>
                                    </p>
                                    <p className="font-semibold text-lg flex items-center gap-2">
                                        <FaBus className="text-red-500" /> Giá phương tiện:
                                        <span
                                            className="text-red-500">{config.webConfig.getCurrency(transport.cost)}</span>
                                    </p>
                                </div>
                            </div>

                            <Divider />

                            {/* Lưu ý */}
                            <p className="text-red-500 text-center font-bold italic p-4 rounded-lg bg-blue-50 mx-auto w-fit">
                                Giá tour đã bao gồm khách sạn, dịch vụ, phương tiện - Chúc bạn có chuyến đi vui vẻ!
                            </p>
                        </Card>
                    )}
                </div>
            </div>
        </>
    );
};