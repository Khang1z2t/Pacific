import { Input, InputNumber, Modal, DatePicker, Select, Divider } from 'antd';
import { useEffect, useState } from 'react';
import HotelServices from '~/services/HotelServices';
import TransportServices from '~/services/TransportServices';
import moment from 'moment/moment';
import { differenceInDays } from 'date-fns';
import TourDetailServices from '~/services/TourDetailServices';
import { message } from 'antd';
const { RangePicker } = DatePicker;

export const AddTourDetail = ({ tourId, setAddDetailModalVisible, addDetailModalVisible }) => {
    // states
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [duration, setDuration] = useState(0);
    const [priceAdults, setPriceAdults] = useState(0);
    const [priceChildren, setPriceChildren] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [hotels, setHotels] = useState([]);
    const [transports, setTransports] = useState([]);

    const [selectedHotel, setSelectedHotel] = useState({});
    const [selectedTransport, setSelectedTransport] = useState({});


    // Lich trinh
    const [dayNumber, setDayNumber] = useState(0);
    const [title, setTitle] = useState('');
    const [dayDetail, setDayDetail] = useState('');
    const [note, setNote] = useState('');

    // Modules
    useEffect(() => {
        HotelServices.getHotels().then((res) => {
            setHotels(res);
        });
    }, []);
    useEffect(() => {
        TransportServices.getTransports().then((res) => {
            setTransports(res);
        });
    }, []);

    useEffect(() => {
        if(startDate && endDate) {
            const days = differenceInDays(new Date(endDate), new Date(startDate));
            setDayNumber(days);
        }
    }, [startDate,endDate]);
    // handles & functions
    const handleAddTourDetail = async () => {
        const data = {
            startDate: startDate,
            endDate: endDate,
            priceAdults: priceAdults,
            priceChildren: priceChildren,
            quantity: quantity,
            tourId: tourId,
            hotelId: selectedHotel,
            transportId: selectedTransport,
            itineraries: [
                {
                    dayNumber: dayNumber,
                    title: title,
                    dayDetail: dayDetail,
                    note: note,
                }
            ]
        };
        await TourDetailServices.addTourDetail(data);
        message.success('Thêm chi tiết tour thành công',1);
        setAddDetailModalVisible(false);

    };

    return (
        <Modal
            width={800}
            title={'Thêm chi tiết tour'}
            onOk={handleAddTourDetail}
            open={addDetailModalVisible}
            onCancel={() => setAddDetailModalVisible(false)}
            okText={'Lưu'}
        >
            <div className={'p-4 space-y-2 w-full'}>
                <div className={'flex flex-col justify-center mx-auto p-2'}>
                    <label className={'font-semibold text-black uppercase'}>Mã tour</label>
                    <Input
                        value={tourId}
                        disabled
                        rootClassName={'font-bold text-xl text-center w-fit-content'}
                    />
                </div>
                <div className={'p-2 grid grid-cols-2 gap-4'}>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'font-semibold text-black uppercase'}>Thời gian</label>
                        <InputNumber
                            className={'w-full'}
                            min={0}
                            placeholder={'Thời gian'}
                            onChange={(e) => setDuration(e)}
                        />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'font-semibold text-black uppercase'}>Ngày bắt đầu - Ngày kết thúc</label>
                        <RangePicker
                            format={'DD-MM-YYYY'}
                            onChange={(date, dateString) => {
                                const formattedStartDate = moment(dateString[0], 'DD-MM-YYYY').format('YYYY-MM-DD');
                                const formattedEndDate = moment(dateString[1], 'DD-MM-YYYY').format('YYYY-MM-DD');
                                setStartDate(formattedStartDate);
                                setEndDate(formattedEndDate);
                            }}
                        />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'font-semibold text-black uppercase'}>Giá người lớn - Giá trẻ em (30% giá
                            người lớn)</label>
                        <div className={'grid grid-cols-2 gap-2 w-full'}>
                            <InputNumber
                                placeholder={'Giá người lớn'}
                                allowClear
                                formatter={(e) => `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                className={'w-fit'}
                                suffix={'VND'}
                                min={0}
                                onChange={(e) => {
                                    setPriceAdults(e);
                                    setPriceChildren(e * 0.3);
                                }}
                            />
                            <InputNumber
                                placeholder={'Giá trẻ em (30% giá người lớn)'}
                                allowClear
                                formatter={(e) => `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                value={priceChildren}
                                className={'w-fit'}
                                disabled
                                suffix={'VND'}
                                min={0}
                            />
                        </div>
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'font-semibold text-black uppercase'}>Số lượng tour</label>
                        <InputNumber
                            className={'w-full'}
                            onChange={(e) => setQuantity(e)}
                            min={0}
                            placeholder={'Số lượng tour'} />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'font-semibold text-black uppercase'}>Khách sạn</label>
                        <Select
                            showSearch
                            options={hotels}
                            optionFilterProp={'name'}
                            fieldNames={{ value: 'id', label: 'name' }}
                            onChange={(e) => setSelectedHotel(e)}
                            placeholder={'Chọn khách sạn'}
                        />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'font-semibold text-black uppercase'}>Phương tiện</label>
                        <Select
                            showSearch
                            options={transports}
                            optionFilterProp={'name'}
                            fieldNames={{ value: 'id', label: 'name' }}
                            onChange={(e) => setSelectedTransport(e)}
                            placeholder={'Chọn lịch trình'}
                        />
                    </div>
                </div>
                <Divider />
                <h2 className={'text-center text-2xl font-semibold'}>Tạo lịch trình</h2>
                <div className={'grid grid-cols-2 gap-4 p-2'}>
                    <div className={"flex flex-col gap-2"}>
                        <label className={"font-semibold text-black uppercase"}>Số ngày đi</label>
                        <Input
                            className={"w-full"}
                            disabled
                            placeholder={"Số ngày đi"}
                            value={dayNumber + ' ngày'}
                            // onChange={(e) => setDayNumber(e)}
                            />
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <label className={"font-semibold text-black uppercase"}>Tựa đề lịch trình</label>
                        <Input
                            className={'w-full'}
                            placeholder={"Tựa đề lịch trình"}
                            onChange={(e) => setTitle(e.target.value)}
                            />
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <label className={"font-semibold text-black uppercase"}>Chi tiết lịch trình</label>
                        <Input.TextArea
                            className={'w-full max-h-24'}
                            placeholder={"Chi tiết lịch trình"}
                            onChange={(e) => setDayDetail(e.target.value)}
                            />
                    </div>
                    <div className={"flex flex-col gap-2"}>
                        <label className={"font-semibold text-black uppercase"}>Ghi chú</label>
                        <Input
                            className={'w-full'}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder={"Ghi chú"}
                            />
                    </div>
                </div>
            </div>
        </Modal>
    );
};