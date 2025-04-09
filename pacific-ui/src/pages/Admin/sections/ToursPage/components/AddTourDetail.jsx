import { DatePicker, Divider, Input, InputNumber, message, Modal, Select, Form } from 'antd';
import { useEffect, useCallback, useState } from 'react';
import HotelServices from '~/services/HotelServices';
import TransportServices from '~/services/TransportServices';
import moment from 'moment/moment';
import { differenceInDays } from 'date-fns';
import TourDetailServices from '~/services/TourDetailServices';
import GuideServices from '~/services/GuideServices';
import config from '~/config';

const { RangePicker } = DatePicker;

export const AddTourDetail = ({ tour, setAddDetailModalVisible, addDetailModalVisible }) => {
    const [form] = Form.useForm();
    const [hotels, setHotels] = useState([]);
    const [transports, setTransports] = useState([]);
    const [guides, setGuides] = useState([]);

    // Fetch dữ liệu hotels, transports và guides bằng Promise.all và useCallback
    const fetchData = useCallback(async () => {
        try {
            const [hotelRes, transportRes, guideRes] = await Promise.all([
                HotelServices.getAllHotels(),
                TransportServices.getTransports(),
                GuideServices.getAllGuides(),
            ]);
            setHotels(hotelRes.data);
            setTransports(transportRes);
            // Lọc guides chỉ lấy những guide có active = true
            const activeGuides = guideRes.data.filter(guide => guide.active === true);
            setGuides(activeGuides);
        } catch (error) {
            message.error('Không thể tải dữ liệu khách sạn, phương tiện hoặc hướng dẫn viên!');
            console.error(error);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // Hàm kiểm tra ngày hợp lệ dựa trên tour.duration
    const disabledDate = (current, { from }) => {
        if (!from || !tour?.duration) {
            return false;
        }
        const diff = Math.abs(current.diff(from, 'days'));
        return diff >= tour.duration;
    };

    // Xử lý submit form
    const handleAddTourDetail = async (values) => {
        const [startDate, endDate] = values.dateRange || [];

        if (!startDate || !endDate) {
            message.error('Vui lòng chọn đầy đủ ngày và giờ bắt đầu, kết thúc!');
            return;
        }

        // Tính số ngày dựa trên ngày (bỏ qua giờ phút)
        const days = differenceInDays(
            moment(endDate).startOf('day').toDate(),
            moment(startDate).startOf('day').toDate(),
        );

        if (days !== tour?.duration - 1) {
            message.error(`Khoảng thời gian phải đúng ${tour?.duration} ngày!`);
            return;
        }

        const data = {
            startDate: startDate, // Đã được định dạng ISO 8601 từ RangePicker
            endDate: endDate,     // Đã được định dạng ISO 8601 từ RangePicker
            priceAdults: values.priceAdults,
            priceChildren: values.priceChildren,
            quantity: values.quantity,
            tourId: tour?.id,
            guideId: values.guideId,
            hotelId: values.hotelId,
            transportId: values.transportId,
        };

        try {
            await TourDetailServices.addTourDetail(data);
            message.success('Thêm chi tiết tour thành công', 1);
            setAddDetailModalVisible(false);
            form.resetFields();
        } catch (error) {
            message.error('Thêm chi tiết tour thất bại: ' + (error.message || 'Có lỗi xảy ra'), 1);
            console.error(error);
        }
    };

    // Xử lý thay đổi giá người lớn để tự động tính giá trẻ em
    const handlePriceAdultsChange = (value) => {
        form.setFieldsValue({ priceChildren: value * 0.3 });
    };

    return (
        <Modal
            width={800}
            title={'Thêm chi tiết tour'}
            open={addDetailModalVisible}
            onCancel={() => {
                form.resetFields();
                setAddDetailModalVisible(false);
            }}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleAddTourDetail}
                initialValues={{ priceChildren: 0 }}
            >
                <div className={'p-4 space-y-2 w-full'}>
                    <div className={'flex flex-col justify-center mx-auto p-2'}>
                        <label className={'font-semibold text-black uppercase'}>Mã tour</label>
                        <Input
                            value={tour?.id}
                            disabled
                            rootClassName={'font-bold text-xl text-center w-fit-content'}
                        />
                    </div>
                    <div className={'p-2 grid grid-cols-2 gap-4'}>
                        <Form.Item
                            name="dateRange"
                            label={<span
                                className={'font-semibold text-black uppercase'}>Ngày bắt đầu - Ngày kết thúc</span>}
                            rules={[
                                { required: true, message: 'Vui lòng chọn ngày và giờ bắt đầu, kết thúc!' },
                            ]}
                        >
                            <div>
                                <span className={'text-red-500'}>Số ngày: {tour?.duration}</span>
                                <RangePicker
                                    showTime={{ format: 'HH:mm' }}
                                    disabledDate={(current) => disabledDate(current, { from: form.getFieldValue(['dateRange', 0]) })}
                                    format={'YYYY-MM-DD HH:mm:ss'}
                                    className="w-full"
                                    onChange={(dates) => {
                                        if (dates) {
                                            form.setFieldsValue({
                                                dateRange: [
                                                    dates[0].format('YYYY-MM-DDTHH:mm:ss'),
                                                    dates[1].format('YYYY-MM-DDTHH:mm:ss'),
                                                ],
                                            });
                                        } else {
                                            form.setFieldsValue({ dateRange: [] });
                                        }
                                    }}
                                />
                            </div>
                        </Form.Item>

                        <Form.Item
                            label={<span className={'font-semibold text-black uppercase'}>Giá người lớn - Giá trẻ em (30% giá người lớn)</span>}
                        >
                            <div className={'grid grid-cols-2 gap-2 w-full'}>
                                <Form.Item
                                    name="priceAdults"
                                    rules={[{ required: true, message: 'Vui lòng nhập giá người lớn!' }]}
                                    noStyle
                                >
                                    <InputNumber
                                        placeholder={'Giá người lớn'}
                                        allowClear
                                        formatter={(e) => `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        className={'w-full'}
                                        suffix={'VND'}
                                        min={0}
                                        onChange={handlePriceAdultsChange}
                                    />
                                </Form.Item>
                                <Form.Item name="priceChildren" noStyle>
                                    <InputNumber
                                        placeholder={'Giá trẻ em'}
                                        allowClear
                                        formatter={(e) => `${e}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                        className={'w-full'}
                                        suffix={'VND'}
                                        min={0}
                                        disabled
                                    />
                                </Form.Item>
                            </div>
                        </Form.Item>

                        <Form.Item
                            name="quantity"
                            label={<span className={'font-semibold text-black uppercase'}>Số lượng tour</span>}
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng tour!' }]}
                        >
                            <InputNumber
                                className={'w-full'}
                                min={0}
                                placeholder={'Số lượng tour'}
                            />
                        </Form.Item>

                        <Form.Item
                            name="guideId"
                            label={<span className={'font-semibold text-black uppercase'}>Hướng dẫn viên</span>}
                            rules={[{ required: true, message: 'Vui lòng chọn hướng dẫn viên!' }]}
                        >
                            <Select
                                showSearch
                                options={guides.map((guide) => ({
                                    id: guide.id,
                                    name: `${guide.firstName} ${guide.lastName}`,
                                }))}
                                optionFilterProp={'name'}
                                fieldNames={{ value: 'id', label: 'name' }}
                                placeholder={'Chọn hướng dẫn viên'}
                            />
                        </Form.Item>

                        <Form.Item
                            name="hotelId"
                            label={<span className={'font-semibold text-black uppercase'}>Khách sạn</span>}
                            rules={[{ required: true, message: 'Vui lòng chọn khách sạn!' }]}
                        >
                            <Select
                                showSearch
                                options={hotels.map((hotel) => ({
                                    id: hotel.id,
                                    name: `${hotel.name} - ${config.webConfig.getCurrency(hotel.cost)}`,
                                }))}
                                optionFilterProp={'name'}
                                fieldNames={{ value: 'id', label: 'name' }}
                                placeholder={'Chọn khách sạn'}
                            />
                        </Form.Item>

                        <Form.Item
                            name="transportId"
                            label={<span className={'font-semibold text-black uppercase'}>Phương tiện</span>}
                            rules={[{ required: true, message: 'Vui lòng chọn phương tiện!' }]}
                        >
                            <Select
                                showSearch
                                options={transports.map((transport) => ({
                                    id: transport.id,
                                    name: `${transport.name} - ${config.webConfig.getCurrency(transport.cost)}`,
                                }))}
                                optionFilterProp={'name'}
                                fieldNames={{ value: 'id', label: 'name' }}
                                placeholder={'Chọn phương tiện'}
                            />
                        </Form.Item>
                    </div>

                    <div className="flex justify-end gap-2">
                        <button
                            type="button"
                            className="px-4 py-2 border rounded-md"
                            onClick={() => setAddDetailModalVisible(false)}
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md"
                        >
                            Lưu
                        </button>
                    </div>
                </div>
            </Form>
        </Modal>
    );
};