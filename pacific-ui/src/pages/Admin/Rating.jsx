import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Menu, message, Modal, Select, Space, Table, Tag } from 'antd';
import { DownOutlined, EyeOutlined } from '@ant-design/icons';
import RatingService from '~/services/RatingService';

const { Option } = Select;

const Rating = () => {
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTourRatings, setSelectedTourRatings] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [currentTourId, setCurrentTourId] = useState(null);
    const [tourIdFilter, setTourIdFilter] = useState(null);
    const [tourIdOptions, setTourIdOptions] = useState([]);
    const [selectedSort, setSelectedSort] = useState("");
    const [selectedSortModal, setSelectedSortModal] = useState(""); // Loại sắp xếp cho modal

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await RatingService.getAllRatings();
            const activeRatings = response.data.filter(rating => rating.status === "active");
            const uniqueTourRatings = getUniqueTourRatings(activeRatings);
            setRatings(uniqueTourRatings);

            // Lấy danh sách tourId duy nhất để hiển thị trong dropdown
            const uniqueTourIds = [...new Set(activeRatings.map(rating => rating.tourId))];
            setTourIdOptions(uniqueTourIds);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu đánh giá:", error);
            message.error("Lỗi khi lấy dữ liệu đánh giá!");
        } finally {
            setLoading(false);
        }
    };

    const getUniqueTourRatings = (data) => {
        const uniqueTourIds = new Set();
        return data.filter(item => {
            if (!uniqueTourIds.has(item.tourId)) {
                uniqueTourIds.add(item.tourId);
                return true;
            }
            return false;
        });
    };

    const handleShowDetail = async (tourId) => {
        setCurrentTourId(tourId);
        setLoading(true);
        try {
            const response = await RatingService.getRatingsByTourId(tourId);
            const activeTourRatings = response.data.filter(rating => rating.status === "active");
            setSelectedTourRatings(activeTourRatings);
            setIsModalVisible(true);
            setSelectedSortModal(""); // Reset loại sắp xếp khi mở modal mới
        } catch (error) {
            console.error("Lỗi khi lấy chi tiết đánh giá:", error);
            message.error("Lỗi khi lấy chi tiết đánh giá!");
        } finally {
            setLoading(false);
        }
    };

    const handleHideRating = async (id) => {
        try {
            await RatingService.updateRatingStatus(id, "disable");
            message.success("Đánh giá đã được ẩn!");
            setSelectedTourRatings(prev => prev.map(rating =>
                rating.id === id ? { ...rating, status: "disable" } : rating
            ));
            setRatings(prev => prev.map(rating =>
                rating.id === id ? { ...rating, status: "disable" } : rating
            ));
        } catch (error) {
            console.error("Lỗi khi ẩn đánh giá:", error);
            message.error("Lỗi khi ẩn đánh giá!");
        } finally {
            fetchData();
            handleShowDetail(currentTourId)
        }
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setSelectedTourRatings([]);
        setCurrentTourId(null);
    };

    const columns = [
        {
            title: "Tour",
            dataIndex: "tourId",
            key: "tourId",
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EyeOutlined />} onClick={() => handleShowDetail(record.tourId)}>
                        Xem chi tiết
                    </Button>
                </Space>
            ),
        },
    ];

    const detailColumns = [
        { title: "Người đánh giá", dataIndex: "email", key: "email" },
        { title: "Đánh giá", dataIndex: "rating", key: "rating" },
        { title: "Nội dung", dataIndex: "comment", key: "comment" },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "active" ? "green" : "gold"}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Button onClick={() => handleHideRating(record.id)}>Ẩn đánh giá</Button>
            ),
        },
    ];

    const sortTypes = {
        "1-5": "Đánh giá (1-5)",
        "5-1": "Đánh giá (5-1)",
    };

    let filteredRatings = tourIdFilter ? ratings.filter(rating => rating.tourId === tourIdFilter) : ratings;

    if (selectedSort === "1-5") {
        filteredRatings.sort((a, b) => a.rating - b.rating);
    } else if (selectedSort === "5-1") {
        filteredRatings.sort((a, b) => b.rating - a.rating);
    }

    // Sắp xếp dữ liệu trong modal
    let sortedTourRatings = [...selectedTourRatings];
    if (selectedSortModal === "1-5") {
        sortedTourRatings.sort((a, b) => a.rating - b.rating);
    } else if (selectedSortModal === "5-1") {
        sortedTourRatings.sort((a, b) => b.rating - a.rating);
    }

    return (
        <div className="container mx-auto p-2">
            <h2 className="text-2xl font-bold mb-4">Đánh giá của khách hàng</h2>

            <Space style={{ marginBottom: 16 }}>
                <Select
                    placeholder="Lọc theo Tour ID"
                    style={{ width: 200 }}
                    onChange={(value) => setTourIdFilter(value)}
                    allowClear
                >
                    {tourIdOptions.map(tourId => (
                        <Option key={tourId} value={tourId}>{tourId}</Option>
                    ))}
                </Select>
            </Space>

            <Table
                dataSource={filteredRatings}
                columns={columns}
                rowKey="id"
                loading={loading}
            />

            <Modal
                title={`Chi tiết đánh giá Tour ID: ${currentTourId}`}
                visible={isModalVisible}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Đóng
                    </Button>,
                ]}
                width={1000}
            >
                <Space style={{ marginBottom: 16 }}>
                    <Dropdown
                        overlay={
                            <Menu onClick={(e) => setSelectedSortModal(e.key)}>
                                {Object.keys(sortTypes).map((key) => (
                                    <Menu.Item key={key}>{sortTypes[key]}</Menu.Item>
                                ))}
                            </Menu>
                        }
                        trigger={["click"]}
                    >
                        <Button>
                            {sortTypes[selectedSortModal] || "Sắp xếp theo"} <DownOutlined />
                        </Button>
                    </Dropdown>
                </Space>
                <Table
                    dataSource={sortedTourRatings}
                    columns={detailColumns}
                    rowKey="id"
                    loading={loading}
                />
            </Modal>
        </div>
    );
};

export default Rating;