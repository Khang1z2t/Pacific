import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form, Input, Menu, message, Modal, Space, Table, Tag } from 'antd';
import { CheckCircleOutlined, DeleteOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import RatingService from '~/services/RatingService';

const Rating = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    const [selectedSort, setSelectedSort] = useState("");
    const navigate = useNavigate();
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(false);
    const ITEM_PER_PAGE = 7;
    const [filteredRatings, setFilteredRatings] = useState([]);

    useEffect(() => {
        setLoading(true);
        RatingService.getAllRatings()
            .then((res) => {
                const pendingRatings = res.data.filter((rating) => rating.status === "disable");
                setRatings(pendingRatings);
                setFilteredRatings(pendingRatings);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);
    

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Bạn có chắc chắn muốn xóa đánh giá này?",
            content: "Hành động này không thể hoàn tác!",
            okText: "Xóa",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    await RatingService.deleteRating(id);
                    message.success("Xóa đánh giá thành công!");
                    setRatings(prev => prev.filter(rating => rating.id !== id));
                    setFilteredRatings(prev => prev.filter(rating => rating.id !== id));
                } catch (error) {
                    console.error("Lỗi khi xóa đánh giá:", error);
                    message.error("Lỗi khi xóa đánh giá!");
                }
            },
        });
    };
    

    const sortTypes = {
        "1-5": "Đánh giá (1-5)",
        "5-1": "Đánh giá (5-1)",
    };

    useEffect(() => {
        let newList = ratings.filter(rating =>
            rating.tuorName && rating.tuorName.toLowerCase().includes(searchText.toLowerCase())
        );
    
        if (selectedSort === "1-5") {
            newList.sort((a, b) => a.rating - b.rating);
        } else if (selectedSort === "5-1") {
            newList.sort((a, b) => b.rating - a.rating);
        }
    
        setFilteredRatings(newList);
    }, [searchText, selectedSort, ratings]);
    

    const handleSwitchChange = async (id, checked) => {
        const newStatus = checked ? "active" : "inactive";
        try {
            await RatingService.updateRatingStatus(id, newStatus);
            setRatings(prevRatings =>
                prevRatings.map(rating => (rating.id === id ? { ...rating, status: newStatus } : rating))
            );
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
    };

    const handleApprove = async (id) => {
        try {
            await RatingService.updateRatingStatus(id, "active");
    
            setRatings((prevRatings) => prevRatings.filter((rating) => rating.id !== id));
    
            message.success("Đánh giá đã được duyệt!");
        } catch (error) {
            console.error("Lỗi khi duyệt đánh giá:", error);
            message.error("Lỗi khi duyệt đánh giá!");
        }
    };
    

    const columns = [
        { title: "Người đánh giá", dataIndex: "email", key: "email" },
        { title: "Đánh giá", dataIndex: "rating", key: "rating" },
        { title: "Tour", dataIndex: "tuorName", key: "tuorName" },
        { title: "Nội dung", dataIndex: "comment", key: "comment" },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "disable" ? "gold" : "green"}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<CheckCircleOutlined />} onClick={() => handleApprove(record.id)}>
                        Duyệt
                    </Button>
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}>
                        Xóa
                    </Button>
                </Space>
            ),
        },
    ];
    

    return (
        <div className="container mx-auto p-2">
            <h2 className="text-2xl font-bold mb-4">ĐÁNH GIÁ CỦA KHÁCH HÀNG</h2>

            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Tìm kiếm"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Dropdown
                    overlay={
                        <Menu onClick={(e) => setSelectedSort(e.key)}>
                            {Object.keys(sortTypes).map((key) => (
                                <Menu.Item key={key}>{sortTypes[key]}</Menu.Item>
                            ))}
                        </Menu>
                    }
                    trigger={["click"]}
                >
                    <Button>
                        {sortTypes[selectedSort] || "Sắp xếp theo"} <DownOutlined />
                    </Button>
                </Dropdown>
            </Space>

            <Table
                dataSource={filteredRatings.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE)}
                columns={columns}
                pagination={{
                    current: currentPage,
                    pageSize: ITEM_PER_PAGE,
                    total: filteredRatings.length,
                    onChange: setCurrentPage,
                }}
                rowKey="id"
                loading={loading}
                size="large"
            />
        </div>
    );  
};

export default Rating;