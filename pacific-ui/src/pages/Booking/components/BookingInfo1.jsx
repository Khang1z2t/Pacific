import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import config from '~/config';
import { Form, Input, DatePicker, Select, Radio, Button, InputNumber, Checkbox, Modal, Card, Divider } from 'antd';
import BookingServices from '~/services/BookingServices';
import { ModalTerms } from '~/pages/Terms/ModalTerms';
import { FaPhoneAlt, FaPlaneDeparture, FaTags } from 'react-icons/fa';
import { BiSolidUserDetail } from 'react-icons/bi';
import TourService from '~/services/TourServices';
import { TourInfoCard } from '~/pages/Booking/components/bookingInfo1/components/TourInfoCard';

const { TextArea } = Input;

export const BookingInfo1 = ({ data, setStep }) => {
    const { id } = useParams();
    //
    const [fullName, setFullName] = useState('');
    const [adults, setAdults] = useState(0);
    const [children, setChildren] = useState(0);
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [startDate, setStartDate] = useState('');
    const [note, setNote] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [open, setOpen] = useState(false);
    const [voucher, setVoucher] = useState('');

    //
    const [tour, setTour] = useState({});
    const [totalPrice, setTotalPrice] = useState((adults * data.priceAdults) + (children * data.priceChildren));
    const [form] = Form.useForm();

    const [orderInfo, setOrderInfo] = useState({
        name: fullName,
        phone: phone,
        email: email,
        tourId: id,
        startDate: startDate,
        note: note,
        totalPrice: totalPrice,
        paymentMethod: 'VNPAY',
    });

    useEffect(() => {
        TourService.getById('TOUR001').then((res) => {
            setTour(res.data);
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        setTotalPrice((adults * data.priceAdults) + (children * data.priceChildren));

        setOrderInfo({
            name: fullName,
            phone: phone,
            email: email,
            tourId: id,
            startDate: startDate,
            note: note,
            totalPrice: totalPrice,
            paymentMethod: 'VNPAY',
        });

    }, [fullName, phone, email, startDate, note, totalPrice, adults, children]);
    console.log(orderInfo);

    const BookTour = async (amount, info) => {
        await BookingServices.checkOut({ amount: amount, orderInfo: info }).then((res) => {
            window.location.href = res;
        }).catch((err) => {
            console.error(err);
        });
    };

    return (
        <div className={'container mx-auto my-12'}>
            <h1 className="text-5xl font-light text-orange-600 mb-4 text-center">Đặt tour</h1>
            <h2 className="text-2xl font-light text-orange-600 mb-4 text-center">THÔNG TIN CHI TIẾT TOUR</h2>
            {/**/}
            <div className={'flex flex-wrap justify-center items-center gap-4'}>
                <div>
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
                            <Form.Item label="Email" name="email"
                                       rules={[{ type: 'email', message: 'Email không hợp lệ' }]}>
                                <Input placeholder={'Nhập tài khoản email'}
                                       onChange={(e) => setEmail(e.target.value)} />

                            </Form.Item>
                            <Form.Item label="Ngày khởi hành" name="startDate"
                                       initialValue={config.webConfig.convertDateNoTime(data.startDate)}>
                                <Input disabled />
                            </Form.Item>
                            <div className={'gap-4'}>
                                <h2 className={'text-lg font-semibold text-orange-500'}>Hành khách</h2>
                                <div className={'grid grid-cols-2 gap-4 w-fit'}>
                                    <Card className={'flex flex-col bg-gray-50 shadow-lg'}>
                                        <div className="text-lg font-semibold flex flex-col">Người lớn<span
                                            className={'text-red-300 text-sm font-mono'}>{config.webConfig.getCurrency(data.priceAdults)}/Người</span>
                                        </div>
                                        <InputNumber min={0} defaultValue={1} onChange={(e) => setAdults(e)} />
                                    </Card>
                                    <Card className={'flex flex-col bg-gray-50 shadow-lg'}>
                                        <div className="text-lg font-semibold flex flex-col">Trẻ em<span
                                            className={'text-red-300 text-sm font-mono'}>( 30% giá người lớn )</span>
                                            <span
                                                className={'text-red-300 text-sm font-mono'}>{config.webConfig.getCurrency(data.priceChildren)}/Người</span>
                                        </div>
                                        <InputNumber min={0} defaultValue={0} onChange={(e) => setChildren(e)} />
                                    </Card>
                                </div>
                            </div>
                            <Form.Item label="Ghi chú" name="note">
                                <TextArea rootClassName={'max-h-32'} rows={3} placeholder="Ghi chú"
                                          onChange={(e) => setNote(e.target.value)}
                                />
                            </Form.Item>

                            <Divider />

                            {/* Mã giảm giá */}
                            <div className="flex flex-col gap-2">
                                <div className={'flex flex-wrap gap-2 items-center'}>
                                    <FaTags className="text-blue-500 text-lg" />
                                    <a className="font-semibold text-blue-500">Thêm mã giảm giá</a>
                                </div>
                                <Input placeholder="Nhập mã giảm giá"
                                       onChange={(e) => setVoucher(e.target.value)}
                                />
                            </div>
                            <div className={'justify-start flex items-center mb-3 mt-4'}>
                                <Checkbox rootClassName={'text-red-500'} onChange={() => setConfirm(!confirm)}>Tôi đã
                                    đọc và đồng ý
                                    với các</Checkbox>
                                <a onClick={() => setOpen(!open)} className={'text-indigo-500 underline'}>chính sách và
                                    điều
                                    khoản.</a>
                            </div>
                            <Divider />
                            <div className="text-lg font-semibold text-orange-500 mt-2">
                                Tổng tiền cần thanh toán: {''}
                                {voucher.includes('Pacific') ?
                                    <>
                                         {config.webConfig.getCurrency(totalPrice - totalPrice * 0.9)}
                                        <span className={'text-xs text-green-500'}> (-10%)</span>
                                    </> : config.webConfig.getCurrency(totalPrice)}
                            </div>
                            <Form.Item>
                                <Button
                                    disabled={!confirm}
                                    onClick={() => BookTour(totalPrice, 'A')}
                                    type="primary" htmlType="submit" className="bg-orange-500 w-full">
                                    Xác nhận đặt tour
                                </Button>
                            </Form.Item>
                        </Form>
                        <Modal open={open}
                               onCancel={() => setOpen(!open)}
                               onOk={() => setOpen(!open)}
                               title={'Điều khoản và điều kiện'}>
                            <Card className={'overflow-y-scroll max-h-screen'}>
                                <ModalTerms />
                            </Card>
                        </Modal>
                    </div>
                </div>
                {/*    */}
                <TourInfoCard voucher={voucher} detailData={data} children={children} adults={adults}
                              totalPrice={totalPrice} data={tour} />
            </div>
        </div>
    );
};