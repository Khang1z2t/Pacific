import { Button, Card, Image, message, Modal, Table, QRCode, Divider, Rate, Avatar, Typography, Progress } from 'antd';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '~/config/AuthContext';

const { Text, Title } = Typography;


export const BookedTourCard = ({ data, tour }) => {
    const { currentUser } = useAuth();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    const [reviewed, setReviewed] = useState(true);
    const [showReview, setShowReview] = useState(false);

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

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


    if (!tour) {
        return (
            <Card className="w-full rounded-lg shadow-lg border-2">
                <p className="text-lg font-bold text-gray-500">Không tìm thấy thông tin tour</p>
            </Card>
        );
    }
    // Mẫu user
    const userReview = {
        avatar: null, // Could be a URL from API
        username: 'Nguyễn Văn A',
        rating: 4.5,
        comment: 'Tour rất tuyệt vời, hướng dẫn viên nhiệt tình, nhưng giá hơi cao so với kỳ vọng.',
        categories: {
            price: 2,
            transportation: 5,
            service: 4.5,
            food: 4,
            accommodation: 4.5,
        },
        date: '2025-03-25T10:00:00',
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
                                    className="text-xl font-bold text-blue-900 hover:text-orange-600 cursor-pointer transition-colors duration-200"
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
                                    {config.webConfig.getCurrency(data.totalAmount || 0)}
                                </p>
                                <Divider className="my-2" />
                                {reviewed && (
                                    <div className={'flex items-center gap-2'}>
                                        <Rate allowHalf defaultValue={4.5} disabled />
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
                                )}
                                {!reviewed && (
                                    <Button
                                        type="primary"
                                        className="bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold"
                                        onClick={() => {
                                            navigate(config.routes.review + tour.id);
                                        }}
                                    >
                                        Đánh giá tour
                                    </Button>
                                )}
                            </div>

                            <div
                                className={`text-right ${data.status === 'SUCCESS' ? 'text-green-600' : 'text-red-600'}`}>
                                <p className="text-sm font-semibold">
                                    {data.status === 'SUCCESS' ? 'Thành công' :
                                        data.status === 'PENDING' ? 'Đang chờ thanh toán' :
                                            data.status || 'N/A'}
                                </p>
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
                        <div className="bg-white p-3 rounded-lg shadow-md"> {/* Background and padding for QR */}
                            <QRCode
                                value={config.webConfig.getTourDetailQrUrl(tour.id)}
                                size={140} // Slightly larger for clarity
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
                bodyStyle={{ padding: '24px' }}
                className="rounded-lg"
            >
                <div className="flex flex-col gap-6">
                    {/* User Info and Overall Rating */}
                    <div className="flex items-center gap-4">
                        <Avatar
                            size={64}
                            src={currentUser.avatar}
                            icon={!currentUser.avatar && <UserOutlined />}
                            className="border-2 border-gray-200"
                        />
                        <div>
                            <Text strong className="text-lg text-gray-800">{currentUser.firstName} {currentUser.lastName}</Text>
                            <div className="flex items-center gap-2 mt-1">
                                <Rate allowHalf value={4.5} disabled />
                                <Text className="text-gray-600">({4.5}/5)</Text>
                            </div>
                            <Text className="text-sm text-gray-500">
                                Đánh giá vào: {config.webConfig.convertDateNoTime(currentUser.createdAt)}
                            </Text>
                        </div>
                    </div>

                    {/* Comment */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <Text className="text-base text-gray-700">{userReview.comment}</Text>
                    </div>

                    {/* Categorized Ratings */}
                    <div>
                        <Title level={4} className="text-gray-800 mb-4">Chi tiết đánh giá</Title>
                        <div className="grid grid-cols-2 gap-4">
                            {Object.entries(userReview.categories).map(([category, score]) => (
                                <div key={category} className="flex items-center gap-2">
                                    <Text className="text-gray-600 capitalize w-32">
                                        {category === 'price' ? 'Giá cả' :
                                            category === 'transportation' ? 'Phương tiện' :
                                                category === 'service' ? 'Dịch vụ' :
                                                    category === 'food' ? 'Ẩm thực' :
                                                        category === 'accommodation' ? 'Lưu trú' : category}
                                    </Text>
                                    <Progress
                                        percent={score * 20} // Convert 5-star to percentage
                                        size="small"
                                        strokeColor="#1890ff"
                                        showInfo={false}
                                        className="flex-1"
                                    />
                                    <Text className="text-gray-700 w-12 text-right">{score}/5</Text>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-3">
                        <Button
                            type="default"
                            onClick={() => navigate(config.routes.review + tour.id)}
                            className="rounded-full border-gray-300 hover:border-gray-400"
                        >
                            Chỉnh sửa đánh giá
                        </Button>
                        <Button
                            type="primary"
                            onClick={() => setShowReview(false)}
                            className="bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold"
                        >
                            Đóng
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};