import {
    Avatar,
    Button,
    Card,
    Divider,
    Form,
    Image,
    Input,
    message,
    Modal,
    Progress,
    QRCode,
    Rate,
    Space,
    Table,
    Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { ExclamationCircleOutlined, UserOutlined } from '@ant-design/icons';
import { useAuth } from '~/config/AuthContext';
import RatingServices from '~/services/RatingServices';
import BookingServices from '~/services/BookingServices';
import { FaTags } from 'react-icons/fa';

const { Text, Title } = Typography;
const { TextArea } = Input;

export const BookedTourCard = ({ data, tour, onUpdateBooking, voucher }) => {
    const { currentUser } = useAuth();

    const [timeLeft, setTimeLeft] = useState('');
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    // State để control dđánh giá hay chưa
    const [reviewed, setReviewed] = useState(!!data.review);
    const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
    const [showReview, setShowReview] = useState(false);
    const [loading, setLoading] = useState(false);
    const [visible, setVisible] = useState(false);


    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setVisible(false);
    const handleSubmit = () => {
        //
        setTimeout(() => {
            message.success('Yêu cầu hoàn tiền đã được gửi thành công!', 1);
            setVisible(false); // Close modal after submission
        }, 300);
        //
    };
    const columns = [
        { title: 'Họ và tên', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (text) => (text ? config.webConfig.convertDateNoTime(text) : 'N/A'),
        },
        { title: 'Nhóm tuổi', dataIndex: 'ageGroup', key: 'ageGroup' },
        {
            title: 'Giá/Người',
            dataIndex: 'price',
            key: 'price',
            render: (text) => config.webConfig.getCurrency(text),
        },
    ];
    useEffect(() => {
        if (data.status === 'PENDING' && data.createdAt) {
            const calculateTimeLeft = () => {
                // Giả sử thời hạn là 24 giờ từ khi tạo
                const createdTime = new Date(data.createdAt);
                const expiryTime = new Date(createdTime.getTime() + 24 * 60 * 60 * 1000);
                const now = new Date();

                const difference = expiryTime - now;

                if (difference > 0) {
                    const hours = Math.floor(difference / (1000 * 60 * 60));
                    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

                    setTimeLeft(`${hours} giờ ${minutes} phút ${seconds} giây`);
                } else {
                    setTimeLeft('Hết hạn');
                }
            };

            // Cập nhật mỗi giây
            calculateTimeLeft();
            const timer = setInterval(calculateTimeLeft, 1000);

            // Cleanup interval khi component unmount
            return () => clearInterval(timer);
        }
    }, [data.status, data.createdAt]);


    if (!tour) {
        return (
            <Card className="w-full rounded-lg shadow-lg border-2">
                <p className="text-lg font-bold text-gray-500">Không tìm thấy thông tin tour</p>
            </Card>
        );
    }

    const calculateOverallRating = () => {
        const values = form.getFieldsValue(['price', 'transportation', 'service', 'food', 'accommodation']);
        const ratings = Object.values(values).filter(val => val !== undefined && val !== 0);
        const average = ratings.length > 0 ? ratings.reduce((sum, val) => sum + val, 0) / ratings.length : 0;
        form.setFieldsValue({ overallRating: average });
    };

    // Xử lý submit đánh giá
    const handleReviewSubmit = async (values) => {
        setLoading(true);
        try {
            const ratingData = {
                comment: values.comment || '',
                priceRating: values.price || 0,
                serviceRating: values.service || 0,
                facilityRating: values.transportation || 0,
                foodRating: values.food || 0,
                accommodationRating: values.accommodation || 0,
                bookingId: data.id,
                tourId: tour.id,
            };

            const response = await RatingServices.addRating(ratingData);
            setReviewed(true);
            setIsReviewModalOpen(false);
            message.success('Đánh giá của bạn đã được gửi thành công!');

            // Cập nhật data với review mới từ response
            const updatedData = {
                ...data,
                review: {
                    id: response.id, // Giả sử response trả về id của review
                    comment: ratingData.comment,
                    priceRating: ratingData.priceRating,
                    serviceRating: ratingData.serviceRating,
                    facilityRating: ratingData.facilityRating,
                    foodRating: ratingData.foodRating,
                    accommodationRating: ratingData.accommodationRating,
                    rating: response.rating || values.overallRating, // Lấy rating từ response hoặc overallRating
                    createdAt: response.createdAt || new Date().toISOString(), // Lấy từ response hoặc thời gian hiện tại
                },
            };

            // Gọi callback để cập nhật state ở component cha
            if (onUpdateBooking) {
                onUpdateBooking(updatedData);
            }
        } catch (error) {
            console.error('Error submitting review:', error);
            const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại!';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };
    const showReviewModal = () => setIsReviewModalOpen(true);
    const handleReviewCancel = () => setIsReviewModalOpen(false);

    const handleCheckout = async () => {
        try {
            if (data.status !== 'PENDING') {
                message.error('Chỉ có thể thanh toán cho các booking đang chờ!');
                return;
            }

            const amount = data.totalAmount || 0; // Tổng tiền từ booking đã có sẵn
            const orderInfo = data.bookingNo || 'N/A'; // Mã booking làm thông tin đơn hàng

            await BookingServices.checkOut({ amount: amount, orderInfo: orderInfo }).then((res) => {
                window.location.href = res;
            }).catch((err) => {
                console.error('Error during checkout:', err);
                message.error('Có lỗi xảy ra khi thanh toán. Vui lòng thử lại!');
            });
        } catch (error) {
            console.error('Error during checkout:', error);
            const errorMessage = error.response?.data?.message || 'Có lỗi xảy ra khi thanh toán. Vui lòng thử lại!';
            message.error(errorMessage);
        }
    };

    return (
        <>
            <Card
                className="w-full rounded-xl shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)' }}
                bodyStyle={{ padding: '20px' }}
            >
                <div className="flex items-start gap-6">
                    <div className="flex-1">
                        <div className="flex justify-between items-start gap-4">
                            <div>
                                <h3
                                    className="text-xl font-bold text-orange-500 hover:underline hover:text-orange-600 cursor-pointer transition-colors duration-200"
                                    onClick={() => navigate(config.routes.tourDetail + tour.id)}
                                >
                                    {tour.title || 'N/A'}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Ngày đi:{' '}
                                    <span className="font-semibold">
                                    {tour.duration ? `${tour.duration}N${tour.duration - 1}Đ` : 'N/A'}
                                </span>
                                </p>
                                <p className="text-sm text-gray-600 mt-1">
                                    Số người: <span className="font-semibold">{data.totalNumber || 0}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Ngày đặt: <span
                                    className="font-semibold">{config.webConfig.convertDateNoTime(data.createdAt)}</span>
                                </p>
                                <p className="text-sm text-gray-600">
                                    Mã đặt tour: <span className="font-semibold">{data.bookingNo}</span>
                                </p>
                                <p className="text-lg font-semibold text-orange-600">
                                    {config.webConfig.getCurrency(data.totalAmount || 0)} {' '} {voucher && (
                                        <sup className="text-sm text-green-500">(-{voucher.discountValue || 0}%)</sup>
                                )}
                                </p>
                                <Divider className="my-2" />
                                {reviewed ? (
                                    <div className={'flex items-center gap-2'}>
                                        <Rate allowHalf defaultValue={data.review?.rating || 0} disabled />
                                        <Button
                                            type="link"
                                            className="text-blue-600 hover:text-blue-700"
                                            onClick={() => {
                                                setShowReview(!showReview);
                                            }}
                                        >
                                            Xem đánh giá
                                        </Button>
                                    </div>
                                ) : (
                                    data.status === 'COMPLETED' && (
                                        <Button
                                            type="primary"
                                            className="bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold"
                                            onClick={showReviewModal}
                                        >
                                            Đánh giá tour
                                        </Button>
                                    )
                                )}
                                {!reviewed && data.status !== 'COMPLETED' && (
                                    <p className="text-sm text-red-500">Chỉ có thể đánh giá sau khi tour hoàn thành</p>
                                )}
                            </div>

                            <div
                                className={`text-right ${data.status === 'PAID' || data.status === 'COMPLETED' || data.status === 'ONGOING' ? 'text-green-600' : data.status === 'PENDING' ? 'text-yellow-600' : 'text-red-600'}`}>
                                <p className="text-sm font-semibold"> Trạng thái: {' '}
                                    {data.status === 'PAID' ? 'Thành công' :
                                        data.status === 'PENDING' ? 'Đang chờ thanh toán' :
                                            data.status === 'FAILED' ? 'Thất bại' :
                                                data.status === 'COMPLETED' ? 'Hoàn thành' :
                                                    data.status === 'ONGOING' ? 'Đang đi' :
                                                        data.status || 'N/A'}
                                </p>
                                {data.status === 'PENDING' && (
                                    <div className="flex flex-col items-end gap-2 w-full">
                                        <p className="text-sm text-red-500 font-medium">
                                            {timeLeft ? `Thời gian thanh toán còn lại: ${timeLeft}` : 'Đang tính toán...'}
                                        </p>
                                        {data.voucherId && (
                                            <div
                                                className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full shadow-sm">
                                                <FaTags className="text-green-500" />
                                                <span className="text-sm text-green-600 font-semibold">
                                                  Voucher: {voucher.codeVoucher || 'N/A'} (-{voucher.discountValue || 0}%)
                                                </span>
                                            </div>
                                        )}
                                        <Button
                                            type="primary"
                                            onClick={handleCheckout}
                                            className="w-1/2 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full text-white font-semibold py-2 shadow-md hover:shadow-lg transition-all duration-300"
                                        >
                                            Thanh toán ngay
                                        </Button>
                                    </div>
                                )}
                                {data.status === 'PAID' && (
                                    <button
                                        type="primary"
                                        onClick={() => setVisible(!visible)}
                                        className="w-40 mt-2 p-1 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-full text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 border-none"
                                    >
                                        Yêu cầu hoàn tiền
                                    </button>
                                )}
                                <p className="text-sm text-gray-600 mt-1">
                                    Thanh toán: <span className="font-semibold">{data.paymentMethod || 'N/A'}</span>
                                </p>
                                <Button
                                    type="primary"
                                    onClick={showModal}
                                    className="w-32 mt-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold"
                                >
                                    Chi tiết
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-2 flex-shrink-0">
                        <div className="bg-white p-3 rounded-lg shadow-md">
                            <QRCode
                                value={config.webConfig.getTourDetailQrUrl(tour.id)}
                                size={140}
                                level="H"
                                includeMargin={true}
                            />
                        </div>
                        <p className="text-sm font-medium text-gray-700">
                            Quét để xem thông tin tour
                        </p>
                    </div>
                </div>
            </Card>

            <Modal
                title={<span className="text-2xl font-bold text-gray-800">Chi tiết tour</span>}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
                width={900}
                bodyStyle={{ padding: '24px' }}
                className="rounded-lg"
            >
                <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-6">
                        {/* Tour Image */}
                        <div className="flex-shrink-0">
                            <Image
                                src={config.imageConfig.getImage(tour.thumbnail) || config.webConfig.defaultTour}
                                alt={tour.title || 'Tour'}
                                width={200}
                                height={200}
                                className="rounded-lg object-cover shadow-md"
                            />
                        </div>

                        <div className="flex-1 flex flex-col justify-center">
                            <h2
                                onClick={() => navigate(config.routes.tourDetail + tour.id)}
                                className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-orange-500 hover:underline transition-colors duration-200"
                            >
                                {tour.title || 'N/A'}
                            </h2>
                            <p className="text-base text-gray-600 mt-2 line-clamp-2">
                                {tour.description || 'Không có mô tả'}
                            </p>
                        </div>
                    </div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                        <div>
                            <p className="text-sm text-gray-500">Số lượng người lớn</p>
                            <p className="text-lg font-semibold text-gray-800">{data.adultNum || 0}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Số lượng trẻ em</p>
                            <p className="text-lg font-semibold text-gray-800">{data.childrenNum || 0}</p>
                        </div>
                        <div>
                            <p className="text-sm text-gray-500">Tổng tiền</p>
                            <p className="text-lg font-semibold text-orange-600">
                                {config.webConfig.getCurrency(data.totalAmount || 0)}
                            </p>
                        </div>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-3">Thông tin hành khách</h3>
                        <Table
                            columns={columns}
                            dataSource={data.details || []}
                            pagination={true}
                            size={'small'}
                            rowKey="id"
                            bordered
                            className="rounded-lg"
                        />
                    </div>
                </div>
            </Modal>
            {/*DANH GIA MODAL*/}
            <Modal
                title={<span className="text-2xl font-bold text-gray-800">Đánh giá của bạn</span>}
                open={showReview}
                onCancel={() => setShowReview(false)}
                footer={null}
                width={700}
                bodyStyle={{ padding: '24px', background: '#f9fafb' }} // Đồng bộ với modal đánh giá
                className="rounded-lg shadow-xl"
            >
                <div className="flex flex-col gap-6">
                    {/* User Info and Overall Rating */}
                    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                        <Avatar
                            size={64}
                            src={currentUser.avatar}
                            icon={!currentUser.avatar && <UserOutlined />}
                            className="border-2 border-blue-200"
                        />
                        <div>
                            <Text strong className="text-lg text-gray-800">
                                {currentUser.firstName} {currentUser.lastName}
                            </Text>
                            <div className="flex items-center gap-2 mt-1">
                                <Rate allowHalf value={data.review?.rating || 0} disabled className="text-yellow-500" />
                                <Text className="text-gray-600">({data.review?.rating || 0}/5)</Text>
                            </div>
                            <Text className="text-sm text-gray-500">
                                Đánh giá
                                vào: {data.review?.createdAt ? config.webConfig.convertDateNoTime(data.review.createdAt) : 'N/A'}
                            </Text>
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                        <Text className="text-base text-gray-700">
                            {data.review?.comment || 'Chưa có nhận xét'}
                        </Text>
                    </div>

                    {/* Categorized Ratings */}
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                        <Title level={4} className="text-gray-800 mb-4 font-semibold">Chi tiết đánh giá</Title>
                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { key: 'priceRating', label: 'Giá cả' },
                                { key: 'facilityRating', label: 'Phương tiện' },
                                { key: 'serviceRating', label: 'Dịch vụ' },
                                { key: 'foodRating', label: 'Ẩm thực' },
                                { key: 'accommodationRating', label: 'Lưu trú' },
                            ].map(({ key, label }) => (
                                <div key={key} className="flex items-center gap-2">
                                    <Text className="text-gray-600 w-32 font-medium">{label}</Text>
                                    <Progress
                                        percent={(data.review?.[key] || 0) * 20} // Convert 5-star to percentage
                                        size="small"
                                        strokeColor="#1890ff"
                                        showInfo={false}
                                        className="flex-1"
                                    />
                                    <Text className="text-gray-700 w-12 text-right">
                                        {data.review?.[key] || 0}/5
                                    </Text>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <Button
                            type="primary"
                            onClick={() => setShowReview(false)}
                            className="rounded-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                        >
                            Đóng
                        </Button>
                    </div>
                </div>
            </Modal>

            {/*    Danh gia*/}
            <Modal
                title={<span className="text-2xl font-bold text-gray-800">Đánh giá Tour</span>}
                open={isReviewModalOpen}
                onCancel={handleReviewCancel}
                footer={null}
                width={1200}
                bodyStyle={{ padding: '24px', background: '#f9fafb' }} // Nền nhẹ nhàng
                className="rounded-lg shadow-xl"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleReviewSubmit}
                    initialValues={{
                        overallRating: 0,
                        comment: '',
                        price: 0,
                        transportation: 0,
                        service: 0,
                        food: 0,
                        accommodation: 0,
                    }}
                >
                    <div className="flex flex-col gap-6">
                        {/* User Info */}
                        <div
                            className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                            <Avatar
                                size={64}
                                src={config.imageConfig.getAvatar(currentUser.avatarUrl)}
                                icon={!currentUser.avatarUrl && <UserOutlined />}
                                className="border-2 border-blue-200"
                            />
                            <div>
                                <Text strong className="text-lg text-gray-800">
                                    {currentUser.firstName} {currentUser.lastName}
                                </Text>
                                <Text className="block text-sm text-gray-500">
                                    Đánh giá tour: <span className={'font-bold'}>{tour.title || 'N/A'}</span>
                                </Text>
                            </div>
                        </div>

                        {/* Overall Rating and Comment */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center gap-4 mb-4">
                                <Form.Item
                                    name="overallRating"
                                    label={<span
                                        className="text-base font-medium text-gray-700">Đánh giá tổng thể</span>}
                                    className="mb-0"
                                >
                                    <Rate allowHalf disabled className="text-xl" />
                                </Form.Item>
                                <Text className="text-gray-600">
                                    (Tự động tính từ các hạng mục bên dưới)
                                </Text>
                            </div>
                            <Form.Item
                                name="comment"
                                label={<span className="text-base font-medium text-gray-700">Nhận xét của bạn</span>}
                                rules={[
                                    ({ getFieldValue }) => ({
                                        validator(_, value) {
                                            const overallRating = getFieldValue('overallRating');
                                            if (overallRating <= 3 && !value) {
                                                return Promise.reject(new Error('Vui lòng nhập nhận xét khi đánh giá!'));
                                            }
                                            return Promise.resolve();
                                        },
                                    }),
                                ]}
                            >
                                <TextArea
                                    rows={4}
                                    placeholder="Chia sẻ trải nghiệm của bạn về tour..."
                                    className="rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                                />
                            </Form.Item>
                        </div>

                        {/* Detailed Ratings */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <Title level={4} className="text-gray-800 mb-4 font-semibold">
                                Chi tiết đánh giá
                            </Title>
                            <div className="grid grid-cols-3 gap-4 ">
                                {[
                                    { name: 'price', label: 'Giá cả' },
                                    { name: 'transportation', label: 'Phương tiện' },
                                    { name: 'service', label: 'Dịch vụ' },
                                    { name: 'food', label: 'Ẩm thực' },
                                    { name: 'accommodation', label: 'Khách sạn' },
                                ].map((item) => (
                                    <Form.Item
                                        key={item.name}
                                        name={item.name}
                                        label={<span className="text-gray-700 font-medium">{item.label}</span>}
                                        className="mb-2"
                                    >
                                        <Rate
                                            allowHalf
                                            onChange={calculateOverallRating}
                                            className="text-yellow-500 text-3xl"
                                        />
                                    </Form.Item>
                                ))}
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex justify-end gap-3 mt-4">
                            <Button
                                type="default"
                                onClick={handleReviewCancel}
                                className="rounded-full px-6 py-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium"
                                disabled={loading}
                            >
                                Hủy
                            </Button>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="rounded-full px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                                loading={loading}
                            >
                                Gửi đánh giá
                            </Button>
                        </div>
                    </div>
                </Form>
            </Modal>
            <Modal
                open={visible}
                onCancel={handleCancel}
                footer={null}
                width={600} // Slightly reduced width for better focus
                className="rounded-xl overflow-hidden shadow-2xl"
                closeIcon={<span className="text-gray-500 text-xl hover:text-gray-700">×</span>}
                centered // Center the modal on screen
            >
                <div className="p-8 bg-white">
                    {/* Header with Icon and Title */}
                    <div className="flex items-center justify-center mb-6">
                        <ExclamationCircleOutlined style={{ fontSize: '32px', color: '#faad14' }} />
                        <Title level={3} className="ml-3 mb-0 uppercase text-red-800">
                            Xác nhận yêu cầu hoàn tiền
                        </Title>
                    </div>

                    {/* Description */}
                    <Text className="block text-center text-gray-600 text-lg mb-8">
                        Bạn có chắc chắn muốn gửi yêu cầu hoàn tiền cho giao dịch này không?
                        Hành động này không thể hoàn tác.
                    </Text>
                    <div className={'flex flex-col w-full justify-center mb-6'}>
                        <label className={'text-gray-600 text-lg mr-2'}>Lý do hoàn tiền:</label>
                        <Input.TextArea className={'max-h-80'} rows={4} placeholder={'Nhập lý do hoàn tiền...'} />
                    </div>
                    <span className={'text-red-500 text-md mb-4'}>(* Quý khách sẽ được hoàn tiền 80% số tiền gốc)</span>
                    {/* Buttons */}
                    <Space direction="horizontal" size="large" className="flex justify-center">
                        <Button
                            type="primary"
                            size="large"
                            onClick={handleSubmit}
                            className="rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-300"
                            style={{ minWidth: '120px' }}
                        >
                            Gửi yêu cầu
                        </Button>
                        <Button
                            type="default"
                            size="large"
                            onClick={handleCancel}
                            className="rounded-lg border-gray-300 hover:border-gray-400 transition-colors duration-300"
                            style={{ minWidth: '120px' }}
                        >
                            Hủy
                        </Button>
                    </Space>
                </div>
            </Modal>
        </>
    );
};