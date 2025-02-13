import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import config from '~/config';
import { Form, Input, DatePicker, Select, Radio, Button } from 'antd';
import { Loading } from '~/component/ui/Loading';

const { TextArea } = Input;

export const BookingInfo1 = ({tourInfo,setStep}) => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [tour, setTour] = useState({});
    const [form] = Form.useForm();
    const [totalPrice, setTotalPrice] = useState(5000000);
    const [numPeople, setNumPeople] = useState(1);
    const pricePerPerson = 5000000;

    const handlePeopleChange = (value) => {
        setNumPeople(value);
        setTotalPrice(value * pricePerPerson);
    };

    const onFinish = (values) => {
        console.log('Form Data:', values);
        setStep(2);
    };

    return (
        <div className={'container mx-auto my-12'}>
            <h1 className="text-5xl font-light text-orange-600 mb-4 text-center">Đặt tour</h1>
            <h2 className="text-2xl font-light text-orange-600 mb-4 text-center">THÔNG TIN CHI TIẾT TOUR</h2>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg uppercase my-14 border">
                <Form form={form} layout="vertical" onFinish={onFinish} initialValues={{ people: 1 }}>
                    <Form.Item label="Họ và tên" name="name"
                               rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                        <Input placeholder={"Nhập họ và tên"}  />
                    </Form.Item>

                    <Form.Item label="Số điện thoại" name="phone"
                               rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                        <Input placeholder={"Nhập Số điện thoại"} />
                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
                        <Input placeholder={"Nhập tài khoản email"} />
                    </Form.Item>

                    <Form.Item label="Tên Tour" name="tourName" initialValue="Tour Hạ Long 3 Ngày 2 Đêm">
                        <Input disabled />
                    </Form.Item>

                    <Form.Item label="Ngày khởi hành" name="departureDate" initialValue={tour.departureDate}
                               rules={[{ required: true, message: 'Chọn ngày khởi hành' }]}>
                        <DatePicker className="w-full" format="YYYY-MM-DD" />
                    </Form.Item>

                    <Form.Item label="Số lượng người" name="people">
                        <Select onChange={handlePeopleChange}>
                            {[...Array(10)].map((_, i) => (
                                <Select.Option key={i + 1} value={i + 1}>
                                    {i + 1}
                                </Select.Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <div className="text-lg font-semibold text-orange-500">
                        Tổng tiền cần thanh toán: {totalPrice.toLocaleString()} VND
                    </div>

                    <Form.Item label="Ghi chú" name="note">
                        <TextArea rows={3} placeholder="Ghi chú" />
                    </Form.Item>

                    <Form.Item label="Phương thức thanh toán" name="paymentMethod">
                        <Radio.Group>
                            <Radio value="cash">Thanh toán tiền mặt tại công ty</Radio>
                            <Radio value="bank">Chuyển khoản STK: 0834534939 - MB Bank</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="bg-orange-500 w-full">
                            Xác nhận đặt tour
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};