import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, InputNumber, Modal, Switch, message, Select } from 'antd';
import TourServices from '~/services/TourServices';
import dayjs from 'dayjs';
import config from '~/config';

export const EditTourDetail = ({ visible, hotels, guides, transports, setVisible, tourDetail, onSuccess }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);


    const handlePriceAdultsChange = (value) => {
        form.setFieldsValue({ priceChildren: value * 0.3 });
    };

    useEffect(() => {
        if (tourDetail) {
            form.setFieldsValue({
                ...tourDetail,
                startDate: dayjs(tourDetail.startDate),
                hotelId: tourDetail.hotelId || '',
                transportId: tourDetail.transportId || '',
                quantity: tourDetail.quantity || 0,
                priceAdults: tourDetail.priceAdults || 0,
                priceChildren: tourDetail.priceChildren || 0,
                active: tourDetail.active,
            });
        }
    }, [tourDetail, form]);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const formData = {
                ...values,
                startDate: values.startDate.format('YYYY-MM-DD'),
            };

            await TourServices.updateTourDetail(tourDetail.id, formData);
            message.success('Cập nhật chi tiết tour thành công!');
            setVisible(false);
            if (onSuccess) onSuccess();
        } catch (error) {
            console.error('Error updating tour detail:', error);
            message.error('Cập nhật chi tiết tour thất bại!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Chỉnh sửa chi tiết tour"
            open={visible}
            onCancel={() => setVisible(false)}
            footer={null}
            width={600}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                className="space-y-4"
            >
                <Form.Item
                    label={
                        <span className={'font-semibold text-black uppercase'}>
                                    Giá người lớn - Giá trẻ em (30% giá người lớn)
                                </span>
                    }
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

                <div className="grid grid-cols-2 gap-4">
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

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item
                        name="startDate"
                        label="Ngày khởi hành"
                        rules={[{ required: true, message: 'Vui lòng chọn ngày khởi hành!' }]}
                    >
                        <DatePicker
                            className="w-full"
                            format="DD/MM/YYYY"
                            disabledDate={(current) => current && current < dayjs().startOf('day')}
                        />
                    </Form.Item>

                    <Form.Item
                        name="quantity"
                        label="Số lượng"
                        rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                    >
                        <InputNumber className="w-full" min={0} />
                    </Form.Item>
                </div>

                <Form.Item
                    name="active"
                    label="Trạng thái"
                    valuePropName="checked"
                >
                    <Switch />
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

                <div className="flex justify-end gap-2">
                    <Button onClick={() => setVisible(false)}>Hủy</Button>
                    <Button type="primary" htmlType="submit" loading={loading}>
                        Lưu
                    </Button>
                </div>
            </Form>
        </Modal>
    );
};