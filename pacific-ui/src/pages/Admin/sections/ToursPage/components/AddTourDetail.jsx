import { Input, InputNumber, Modal, DatePicker, Select } from 'antd';
import { useEffect, useState } from 'react';
import HotelServices from '~/services/HotelServices';
import TransportServices from '~/services/TransportServices';

const { RangePicker } = DatePicker;

export const AddTourDetail = ({tourId, hotelId, transId, setAddDetailModalVisible, addDetailModalVisible, setLoading }) => {
    // states
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState(0);
    const [priceAdults, setPriceAdults] = useState(0);
    const [priceChildren, setPriceChildren] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [hotels, setHotels] = useState([]);
    const [transports, setTransports] = useState([]);

    const [selectedHotel, setSelectedHotel] = useState({});
    const [selectedTransport, setSelectedTransport] = useState({});

    // Modules
    useEffect(() => {
        HotelServices.getHotels().then((res) => {
            setHotels(res);
        })
    }, []);
    useEffect(() => {
        TransportServices.getTransports().then((res) => {
            setTransports(res);
        })
    }, []);
    return (
        <Modal
            width={800}
            title={'Thêm chi tiết tour'}
            open={addDetailModalVisible}
            onCancel={() => setAddDetailModalVisible(false)}
            okText={'Lưu'}
        >
            <div className={'p-4 space-y-2 w-full'}>
                <div className={'p-2 grid grid-cols-2 gap-4'}>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'font-semibold text-black uppercase'}>Tên tour chi tiết</label>
                        <Input placeholder={'Tên tour'}
                               allowClear
                        />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'font-semibold text-black uppercase'}>Mô tả tour chi tiết</label>
                        <Input.TextArea rootClassName={'max-h-24'}
                                        allowClear
                                        placeholder={'Mô tả tour'} />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'font-semibold text-black uppercase'}>Thời gian</label>
                        <InputNumber
                            className={'w-full'}
                            min={0}
                            placeholder={'Thời gian'} />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'font-semibold text-black uppercase'}>Ngày bắt đầu - Ngày kết thúc</label>
                        <RangePicker />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'font-semibold text-black uppercase'}>Giá người lớn</label>
                        <div className={'flex flex-wrap gap-2'}>
                            <InputNumber
                                placeholder={'Giá người lớn'}
                                allowClear
                                suffix={'VND'}
                                min={0}
                            />
                            -&nbsp;
                            <InputNumber
                                placeholder={'Giá trẻ em (30% giá người lớn)'}
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
                            min={0}
                            placeholder={'Số lượng tour'} />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'font-semibold text-black uppercase'}>Mã lịch trình</label>
                        <Select
                            showSearch
                            placeholder={'Chọn lịch trình'}
                        />
                    </div>
                    <div className={'flex flex-col gap-2'}>
                        <label className={'font-semibold text-black uppercase'}>Khách sạn</label>
                        <Select
                            showSearch
                            options={hotels}
                            optionFilterProp={'label'}
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
                            optionFilterProp={'label'}
                            fieldNames={{ value: 'id', label: 'name' }}
                            onChange={(e) => setSelectedTransport(e)}
                            placeholder={'Chọn lịch trình'}
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};