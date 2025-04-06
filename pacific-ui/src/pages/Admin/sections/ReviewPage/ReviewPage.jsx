import { Button, Rate, Space, Table, Tooltip, Select, Modal, Descriptions } from 'antd';
import React, { useState, useEffect } from 'react';
import { useAuth } from '~/config/AuthContext';
import { FaCheckCircle } from 'react-icons/fa';
import { DeleteOutlined } from '@ant-design/icons';
import { BiDetail } from 'react-icons/bi';
import TourServices from '~/services/TourServices';
import RatingService from '~/services/RatingService';
import { MdCancel } from 'react-icons/md';

export const ReviewPage = () => {
    const { currentUser } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [tours, setTours] = useState([]);
    const [selectedTour, setSelectedTour] = useState(null);
    const [loading, setLoading] = useState(false);
    const [selectedReview, setSelectedReview] = useState(null);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        fetchData();
        fetchTours();
    }, []);

    const fetchData = async (tourId = null) => {
        try {
            setLoading(true);
            let data = tourId
                ? await RatingService.getRatingsByTourId(tourId)
                : await RatingService.getAllRatings();
            const formattedReviews = data.data.map(review => ({
                id: review.id,
                rating: review.rating,
                comment: review.comment,
                tourName: review.tuorName,
                status: review.status.toLowerCase(),
                email: review.email,
                createdAt: review.createdAt,
            }));
            setReviews(formattedReviews);
        } catch (error) {
            console.error('Error fetching reviews:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchTours = async () => {
        try {
            const tourData = await TourServices.getAllTour({});
            setTours(tourData.data);
        } catch (error) {
            console.error('Error fetching tours:', error);
        }
    };

    const handleApprove = async (reviewId) => {
        try {
            await RatingService.updateRatingStatus(reviewId, 'APPROVED');
            fetchData(selectedTour);
        } catch (error) {
            console.error('Error approving review:', error);
        }
    };

    const handleHideReview = async (reviewId) => {
        Modal.confirm({
            title: 'Ẩn đánh giá',
            content: 'Bạn có muốn ẩn đánh giá này không? Đánh giá sẽ được chuyển sang trạng thái REJECTED.',
            okText: 'Có',
            cancelText: 'Không',
            onOk: async () => {
                try {
                    await RatingService.updateRatingStatus(reviewId, 'REJECTED');
                    fetchData(selectedTour);
                    setIsModalVisible(false);
                } catch (error) {
                    console.error('Error hiding review:', error);
                }
            },
        });
    };

    const showReviewDetails = (review) => {
        setSelectedReview(review);
        setIsModalVisible(true);
    };

    const columns = [
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            render: (text) => <Rate disabled defaultValue={text} allowHalf />,
        },
        {
            title: 'Nội dung',
            dataIndex: 'comment',
            key: 'comment',
        },
        {
            title: 'Tour',
            dataIndex: 'tourName',
            key: 'tourName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (text) => (
                <span className={`text-sm font-semibold ${text === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                    {text === 'approved' ? 'Đã duyệt' : 'Chưa duyệt'}
                </span>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Tooltip title="Duyệt đánh giá">
                        <Button
                            type="text"
                            icon={<FaCheckCircle color="green" />}
                            disabled={record.status === 'approved'}
                            onClick={() => handleApprove(record.id)}
                        />
                    </Tooltip>
                    <Tooltip title="Ẩn đánh giá">
                        <Button
                            icon={<MdCancel color={'red'} />}
                            type={'text'}
                            onClick={() => handleHideReview(record.id)}
                        />
                    </Tooltip>
                    <Tooltip title="Xem chi tiết">
                        <Button
                            icon={<BiDetail />}
                            type="text"
                            onClick={() => showReviewDetails(record)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const handleTourFilter = (tourId) => {
        setSelectedTour(tourId);
        fetchData(tourId);
    };

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans">
            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Quản lý Đánh giá</h1>
                    <Select
                        style={{ width: 200 }}
                        placeholder="Lọc theo tour"
                        onChange={handleTourFilter}
                        allowClear
                        options={tours.map(tour => ({
                            value: tour.id,
                            label: tour.title,
                        }))}
                    />
                </div>
                <Table
                    columns={columns}
                    dataSource={reviews}
                    pagination={{
                        pageSize: 5,
                        showSizeChanger: false,
                    }}
                    loading={loading}
                    rowKey={(record) => record.id}
                />
            </div>

            {/* Review Details Modal */}
            <Modal
                title="Chi tiết Đánh giá"
                visible={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={[
                    <Button key="close" onClick={() => setIsModalVisible(false)}>
                        Đóng
                    </Button>,
                    <Button
                        key="hide"
                        type="primary"
                        danger
                        onClick={() => handleHideReview(selectedReview?.id)}
                        disabled={selectedReview?.status === 'rejected'}
                    >
                        Ẩn đánh giá
                    </Button>,
                ]}
            >
                {selectedReview && (
                    <Descriptions column={1} bordered>
                        <Descriptions.Item label="Đánh giá">
                            <Rate disabled value={selectedReview.rating} allowHalf />
                        </Descriptions.Item>
                        <Descriptions.Item label="Nội dung">
                            {selectedReview.comment}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tour">
                            {selectedReview.tourName}
                        </Descriptions.Item>
                        <Descriptions.Item label="Email">
                            {selectedReview.email}
                        </Descriptions.Item>
                        <Descriptions.Item label="Trạng thái">
                            <span className={selectedReview.status === 'approved' ? 'text-green-500' : 'text-red-500'}>
                                {selectedReview.status === 'approved' ? 'Đã duyệt' : 'Chưa duyệt'}
                            </span>
                        </Descriptions.Item>
                        <Descriptions.Item label="Ngày tạo">
                            {new Date(selectedReview.createdAt).toLocaleString()}
                        </Descriptions.Item>
                    </Descriptions>
                )}
            </Modal>
        </div>
    );
};

export default ReviewPage;