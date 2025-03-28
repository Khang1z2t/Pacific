import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import config from '~/config';
import { Button, Card, Checkbox, DatePicker, Divider, Form, Input, InputNumber, message, Modal, Radio } from 'antd';
import BookingServices from '~/services/BookingServices';
import { ModalTerms } from '~/pages/Terms/ModalTerms';
import { FaTags } from 'react-icons/fa';
import TourService from '~/services/TourServices';
import { TourInfoCard } from '~/pages/Booking/components/bookingInfo1/components/TourInfoCard';
import { useAuth } from '~/config/AuthContext';

const { TextArea } = Input;

export const BookingInfo1 = ({ data, setStep }) => {
    const { id } = useParams();
    const { currentUser, booking, setBooking } = useAuth();

    const [fullName, setFullName] = useState(currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : '');
    const [address, setAddress] = useState(currentUser ? `${currentUser.address}` : '');
    const [adults, setAdults] = useState(1);
    const [children, setChildren] = useState(0);
    const [phone, setPhone] = useState(currentUser ? `${currentUser.phone}` : '');
    const [email, setEmail] = useState(currentUser ? `${currentUser.email}` : '');
    const [note, setNote] = useState('');
    const [confirm, setConfirm] = useState(false);
    const [open, setOpen] = useState(false);
    const [voucher, setVoucher] = useState('');
    const [tour, setTour] = useState({});
    const [bookingDetails, setBookingDetails] = useState([]);
    const [totalPrice, setTotalPrice] = useState(adults * data.priceAdults + children * data.priceChildren);

    const MAX_TOTAL_PASSENGERS = 10; // Giới hạn tổng số hành khách

    // Hàm xử lý thay đổi số lượng người lớn
    const handleAdultsChange = (value) => {
        const total = value + children;
        if (total > MAX_TOTAL_PASSENGERS) {
            message.warning(`Tổng số hành khách không được vượt quá ${MAX_TOTAL_PASSENGERS}`);
            setAdults(MAX_TOTAL_PASSENGERS - children);
        } else {
            setAdults(value);
        }
    };

    // Hàm xử lý thay đổi số lượng trẻ em
    const handleChildrenChange = (value) => {
        const total = adults + value;
        if (total > MAX_TOTAL_PASSENGERS) {
            message.warning(`Tổng số hành khách không được vượt quá ${MAX_TOTAL_PASSENGERS}`);
            setChildren(MAX_TOTAL_PASSENGERS - adults);
        } else {
            setChildren(value);
        }
    };

    // Quản lý danh sách hành khách (người lớn và trẻ em)
    useEffect(() => {
        setBookingDetails((prev) => {
            const newDetails = [];

            // Thêm người lớn
            for (let i = 0; i < adults; i++) {
                newDetails.push({
                    id: `adult-${i}`,
                    fullName: prev.find((item) => item.id === `adult-${i}`)?.fullName || '',
                    email: prev.find((item) => item.id === `adult-${i}`)?.email || '',
                    phoneNumber: prev.find((item) => item.id === `adult-${i}`)?.phoneNumber || '',
                    gender: prev.find((item) => item.id === `adult-${i}`)?.gender || 'MALE',
                    birthday: prev.find((item) => item.id === `adult-${i}`)?.birthday || '',
                    ageGroup: 'ADULT',
                    price: data.priceAdults,
                });
            }

            // Thêm trẻ em
            for (let i = 0; i < children; i++) {
                newDetails.push({
                    id: `child-${i}`,
                    fullName: prev.find((item) => item.id === `child-${i}`)?.fullName || '',
                    email: '',
                    phoneNumber: prev.find((item) => item.id === `child-${i}`)?.phoneNumber || '',
                    gender: prev.find((item) => item.id === `child-${i}`)?.gender || 'MALE',
                    birthday: prev.find((item) => item.id === `child-${i}`)?.birthday || '',
                    ageGroup: 'CHILD',
                    price: data.priceChildren, // Sửa price cho trẻ em
                });
            }

            return newDetails;
        });
    }, [adults, children, data.priceAdults, data.priceChildren]);

    // Cập nhật totalPrice khi adults hoặc children thay đổi
    useEffect(() => {
        setTotalPrice(adults * data.priceAdults + children * data.priceChildren);
    }, [adults, children, data.priceAdults, data.priceChildren]);

    const updateBookingDetail = (id, field, value) => {
        setBookingDetails((prev) => {
            const updated = [...prev];
            const index = updated.findIndex((item) => item.id === id);
            if (index !== -1) {
                updated[index][field] = value;
            }
            return updated;
        });
    };

    const [form] = Form.useForm();

    useEffect(() => {
        TourService.getById('TOUR001')
            .then((res) => {
                setTour(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const BookTour = async (amount, info) => {
        const body = {
            paymentMethod: 'VNPAY',
            specialRequests: 'NO',
            bookingDetails: bookingDetails.map((detail) => ({
                fullName: detail.fullName || '',
                email: detail.email || '',
                phoneNumber: detail.phoneNumber || '',
                gender: detail.gender || 'MALE',
                birthday: detail.birthday ? new Date(detail.birthday).toISOString() : null,
                ageGroup: detail.ageGroup || 'ADULT',
                price: detail.price || 0, // Sử dụng price từ bookingDetails
            })),
        };
        await BookingServices.getBookingByTourId(data.id, body)
            .then((res) => {
                setBooking(res.data);
            })
            .catch((err) => {
                console.error(err);
            });

        await BookingServices.checkOut({ amount: amount, orderInfo: info || `TOURID : ${data.id}` })
            .then((res) => {
                window.location.href = res;
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <div className={'container mx-auto my-12'}>
            <h1 className="text-5xl font-light text-orange-600 mb-4 text-center">Đặt tour</h1>
            <h2 className="text-2xl font-light text-orange-600 mb-4 text-center">THÔNG TIN CHI TIẾT TOUR</h2>
            <div className={'flex flex-wrap justify-center gap-4'}>
                <div>
                    <div className="w-[85vh] mx-auto p-6 bg-white shadow-lg rounded-lg uppercase border">
                        <Form form={form} layout="vertical" initialValues={{ people: 1 }}>
                            <div className={'grid grid-cols-2 gap-4'}>
                                <div className={'flex flex-col'}>
                                    <label className={'font-bold'}>Họ và tên</label>
                                    <Input placeholder="Nhập họ và tên" onChange={(e) => setFullName(e.target.value)}
                                           value={fullName} />
                                </div>
                                <div className={'flex flex-col'}>
                                    <label className={'font-bold'}>Số điện thoại</label>
                                    <Input placeholder="Nhập số điện thoại" onChange={(e) => setPhone(e.target.value)}
                                           value={phone} />
                                </div>
                                <div className={'flex flex-col'}>
                                    <label className={'font-bold'}>Email</label>
                                    <Input placeholder="Nhập email" onChange={(e) => setEmail(e.target.value)}
                                           value={email} />
                                </div>
                                <div className={'flex flex-col'}>
                                    <label className={'font-bold'}>Địa chỉ</label>
                                    <Input placeholder="Nhập địa chỉ" onChange={(e) => setAddress(e.target.value)}
                                           value={address} />
                                </div>
                            </div>
                            <div className={'gap-4'}>
                                <h2 className={'text-lg font-semibold text-orange-500'}>Hành khách</h2>
                                <div className={'flex flex-wrap mx-auto justify-center gap-4 w-fit'}>
                                    <Card className={'flex flex-col bg-gray-50 shadow-lg'}>
                                        <div className="text-lg font-semibold flex flex-col">
                                            Người lớn
                                            <span
                                                className={'text-red-300 text-sm font-mono'}>{config.webConfig.getCurrency(data.priceAdults)}/Người</span>
                                        </div>
                                        <InputNumber
                                            className={'w-full mt-5'}
                                            min={1}
                                            max={MAX_TOTAL_PASSENGERS - children}
                                            value={adults}
                                            onChange={handleAdultsChange}
                                        />
                                    </Card>
                                    <Card className={'flex flex-col bg-gray-50 shadow-lg'}>
                                        <div className="text-lg font-semibold flex flex-col">
                                            Trẻ em
                                            <span
                                                className={'text-red-300 text-sm font-mono'}>( 30% giá người lớn )</span>
                                            <span
                                                className={'text-red-300 text-sm font-mono'}>{config.webConfig.getCurrency(data.priceChildren)}/Người</span>
                                        </div>
                                        <InputNumber
                                            className={'w-full'}
                                            min={0}
                                            max={MAX_TOTAL_PASSENGERS - adults}
                                            value={children}
                                            onChange={handleChildrenChange}
                                        />
                                    </Card>
                                </div>
                            </div>
                            <Divider />
                            <h2 className="text-lg font-semibold text-orange-500">Thông tin từng hành khách</h2>
                            <div className="overflow-y-scroll space-y-4 p-5 max-h-96">
                                {bookingDetails.map((item, index) => {
                                    const isAdult = item.ageGroup === 'ADULT';
                                    const passengerNumber =
                                        isAdult
                                            ? index + 1 - bookingDetails.filter((i, idx) => i.ageGroup === 'CHILD' && idx < index).length
                                            : index + 1 - bookingDetails.filter((i, idx) => i.ageGroup === 'ADULT' && idx < index).length;

                                    return (
                                        <Card
                                            title={
                                                isAdult
                                                    ? `Người lớn ${passengerNumber} - ${config.webConfig.getCurrency(data.priceAdults)}`
                                                    : `Trẻ em ${passengerNumber} - ${config.webConfig.getCurrency(data.priceChildren)}`
                                            }
                                            key={item.id}
                                        >
                                            <div
                                                className="grid grid-cols-2 gap-2 mb-4 rounded-lg border border-gray-100 transition-all hover:border-orange-600 p-4 shadow-lg">
                                                <div className={'gap-2 flex flex-col mb-2'}>
                                                    <label className={'font-bold'}>Họ và tên</label>
                                                    <Input
                                                        placeholder={'Nhập họ và tên'}
                                                        value={item.fullName}
                                                        onChange={(e) => updateBookingDetail(item.id, 'fullName', e.target.value)}
                                                    />
                                                </div>
                                                {item.ageGroup === 'ADULT' && (
                                                    <>
                                                        <div className={'gap-2 flex flex-col mb-2'}>
                                                            <label className={'font-bold'}>Số điện thoại</label>
                                                            <Input
                                                                placeholder={'Nhập Số điện thoại'}
                                                                value={item.phoneNumber}
                                                                onChange={(e) => updateBookingDetail(item.id, 'phoneNumber', e.target.value)}
                                                            />
                                                        </div>
                                                        <div className={'gap-2 flex flex-col mb-2'}>
                                                            <label className={'font-bold'}>Email</label>
                                                            <Input
                                                                placeholder={'Nhập email'}
                                                                value={item.email}
                                                                onChange={(e) => updateBookingDetail(item.id, 'email', e.target.value)}
                                                            />
                                                        </div>
                                                    </>
                                                )}
                                                <div className={'gap-2 flex flex-col mb-2'}>
                                                    <label className={'font-bold'}>Ngày sinh</label>
                                                    <DatePicker
                                                        placeholder={'Nhập ngày sinh'}
                                                        onChange={(date, dateString) => updateBookingDetail(item.id, 'birthday', dateString)}
                                                    />
                                                </div>
                                                <div className={'gap-2 flex flex-col mb-2'}>
                                                    <label className={'font-bold'}>Giới tính</label>
                                                    <Radio.Group
                                                        value={item.gender}
                                                        onChange={(e) => updateBookingDetail(item.id, 'gender', e.target.value)}
                                                    >
                                                        <Radio className={'text-sm'} value={'MALE'}>Nam</Radio>
                                                        <Radio className={'text-sm'} value={'FEMALE'}>Nữ</Radio>
                                                    </Radio.Group>
                                                </div>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                            <Divider />
                            <Form.Item label="Ghi chú" name="note">
                                <TextArea rootClassName={'max-h-32'} rows={3} placeholder="Ghi chú"
                                          onChange={(e) => setNote(e.target.value)} />
                            </Form.Item>
                            <Divider />
                            <div className="flex flex-col gap-2">
                                <div className={'flex flex-wrap gap-2 items-center'}>
                                    <FaTags className="text-blue-500 text-lg" />
                                    <a className="font-semibold text-blue-500">Thêm mã giảm giá</a>
                                </div>
                                <Input placeholder="Nhập mã giảm giá" onChange={(e) => setVoucher(e.target.value)} />
                            </div>
                            <div className={'justify-start flex items-center mb-3 mt-4'}>
                                <Checkbox rootClassName={'text-red-500'} onChange={() => setConfirm(!confirm)}>
                                    Tôi đã đọc và đồng ý với các
                                </Checkbox>
                                <a onClick={() => setOpen(!open)} className={'text-indigo-500 underline'}>chính sách và
                                    điều khoản.</a>
                            </div>
                            <Divider />
                            <div className="text-lg font-semibold text-orange-500 mt-2">
                                Tổng tiền cần thanh toán:{' '}
                                {voucher.includes('Pacific') ? (
                                    <>
                                        {config.webConfig.getCurrency(totalPrice - totalPrice * 0.9)}
                                        <span className={'text-xs text-green-500'}> (-90%)</span>
                                    </>
                                ) : (
                                    config.webConfig.getCurrency(totalPrice)
                                )}
                            </div>
                            <Form.Item>
                                <Button
                                    disabled={!confirm}
                                    onClick={() => BookTour(totalPrice, note)}
                                    type="primary"
                                    htmlType="submit"
                                    className="bg-orange-500 w-full"
                                >
                                    Xác nhận đặt tour
                                </Button>
                            </Form.Item>
                        </Form>
                        <Modal open={open} footer={null} width={800} onCancel={() => setOpen(!open)}
                               title={'Điều khoản và điều kiện'}>
                            <Card className={'overflow-y-scroll max-h-screen'}>
                                <ModalTerms />
                            </Card>
                        </Modal>
                    </div>
                </div>
                <TourInfoCard voucher={voucher} detailData={data} children={children} adults={adults}
                              totalPrice={totalPrice} data={tour} />
            </div>
        </div>
    );
};