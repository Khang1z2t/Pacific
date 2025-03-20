import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import config from '~/config';
import { Form, Input, DatePicker, Select, Radio, Button } from 'antd';
import { Loading } from '~/component/ui/Loading';
import BookingServices from '~/services/BookingServices';

const { TextArea } = Input;

export const BookingInfo1 = ({ data, setStep }) => {
    const { id } = useParams();
    //
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [note, setNote] = useState('');

    //
    const [tour, setTour] = useState({});
    const [form] = Form.useForm();
    const [numPeople, setNumPeople] = useState(1);
    console.log(data)
    const pricePerPerson = data.detail[0].priceAdults;
    const [totalPrice, setTotalPrice] = useState(pricePerPerson * numPeople);


    const handlePeopleChange = (value) => {
        if (value < 1) {
            setNumPeople(1);
            setTotalPrice(pricePerPerson);
        } else {
            setNumPeople(value);
            setTotalPrice(value * pricePerPerson);
        }
    };

    const BookTour = (amount,orderInfo) => {
        BookingServices.checkOut(amount,orderInfo).then((res) => {
            window.location.href = res;
        }).catch((err) => {
            console.error(err);
        });
    }

    return (
        <div className={'container mx-auto my-12'}>
            <h1 className="text-5xl font-light text-orange-600 mb-4 text-center">Đặt tour</h1>
            <h2 className="text-2xl font-light text-orange-600 mb-4 text-center">THÔNG TIN CHI TIẾT TOUR</h2>
            <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg uppercase my-14 border">
                <Form form={form} layout="vertical" initialValues={{ people: 1 }}>
                    <Form.Item label="Họ và tên" name="name"
                               rules={[{ required: true, message: 'Vui lòng nhập họ tên' }]}>
                        <Input placeholder={'Nhập họ và tên'}
                               onChange={(e) => setFullName(e.target.value)} />

                    </Form.Item>

                    <Form.Item label="Số điện thoại" name="phone"
                               rules={[{ required: true, message: 'Vui lòng nhập số điện thoại' }]}>
                        <Input placeholder={'Nhập Số điện thoại'}
                               onChange={(e) => setPhone(e.target.value)} />

                    </Form.Item>

                    <Form.Item label="Email" name="email" rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
                        <Input placeholder={'Nhập tài khoản email'}
                               onChange={(e) => setEmail(e.target.value)} />

                    </Form.Item>

                    <Form.Item label="Tên Tour" name="tourName" initialValue={data.title}>
                        <Input disabled />
                    </Form.Item>

                    <Form.Item label="Ngày khởi hành" name="departureDate"
                               rules={[{ required: true, message: 'Chọn ngày khởi hành' }]}>
                        <DatePicker className="w-full" format="YYYY-MM-DD"
                                    onChange={(date, dateString) => setDate(dateString)} />
                    </Form.Item>

                    <Form.Item label="Số lượng người" name="people">
                        <Input placeholder="Số lượng người" type="number"
                               onChange={(e) => handlePeopleChange(e.target.value)} />
                    </Form.Item>

                    <div className="text-lg font-semibold text-orange-500">
                        Tổng tiền cần thanh toán: {totalPrice.toLocaleString()} VND
                    </div>

                    <Form.Item label="Ghi chú" name="note">
                        <TextArea rows={3} placeholder="Ghi chú"
                                  onChange={(e) => setNote(e.target.value)}
                        />
                    </Form.Item>

                    <Form.Item label="Phương thức thanh toán" name="paymentMethod">
                        <Radio.Group>
                            <Radio value="cash">Thanh toán tiền mặt tại công ty</Radio>
                            <Radio value="bank">Chuyển khoản STK: 0834534939 - MB Bank</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                        <Button
                            onClick={() => BookTour(totalPrice, 'A')}
                            type="primary" htmlType="submit" className="bg-orange-500 w-full">
                            Xác nhận đặt tour
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
};