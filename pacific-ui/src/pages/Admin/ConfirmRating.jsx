import React, { useEffect, useState } from "react";
import { Space, Table, Tag, Switch, Button, Form, Input, Dropdown, Menu, Modal, message } from 'antd';
import { SearchOutlined, DownOutlined, DeleteOutlined, CheckCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import RatingService from '~/services/RatingService';
import dayjs from 'dayjs';

const ConfirmRating = () => {
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
                const activeRatings = res.data.filter((rating) => rating.status === "active");
                setRatings(activeRatings);
                setFilteredRatings(activeRatings);
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
            message.success("Cập nhật trạng thái thành công!");
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            message.error("Lỗi khi cập nhật trạng thái!");
        }
    };

    const columns = [
        { title: "Người đánh giá", dataIndex: "email", key: "email" },
        { title: "Đánh giá", dataIndex: "rating", key: "rating" },
        { title: "Tour", dataIndex: "tuorName", key: "tuorName" },
        { title: "Nội dung", dataIndex: "comment", key: "comment" },
        {
            title: "Ngày đánh giá",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (text) => dayjs(text).format("DD/MM/YYYY"),
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "active" ? "green" : "volcano"}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                    <Switch checked={record.status === "active"} onChange={(checked) => handleSwitchChange(record.id, checked)} />
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

export default ConfirmRating;
