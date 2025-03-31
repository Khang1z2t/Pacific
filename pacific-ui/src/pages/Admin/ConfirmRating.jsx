import React, { useEffect, useState } from 'react';
import { Button, Dropdown, Form, Input, Menu, message, Modal, Select, Space, Switch, Table, Tag } from 'antd';
import { DeleteOutlined, DownOutlined, SearchOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import RatingService from '~/services/RatingService';
import dayjs from 'dayjs';

const { Option } = Select;

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
    const [tourIdFilter, setTourIdFilter] = useState(null);
    const [tourIdOptions, setTourIdOptions] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await RatingService.getAllRatings();
            const disabledRatings = response.data.filter((rating) => rating.status === "disable");
            setRatings(disabledRatings);
            setFilteredRatings(disabledRatings);

            // Lấy danh sách tourId duy nhất để hiển thị trong dropdown
            const uniqueTourIds = [...new Set(disabledRatings.map(rating => rating.tourId))];
            setTourIdOptions(uniqueTourIds);

        } catch (err) {
            console.error(err);
            message.error("Lỗi khi lấy dữ liệu đánh giá!");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let newList = ratings.filter(rating =>
            rating.tuorName && rating.tuorName.toLowerCase().includes(searchText.toLowerCase())
        );

        if (tourIdFilter) {
            newList = newList.filter(rating => rating.tourId === tourIdFilter);
        }

        if (selectedSort === "1-5") {
            newList.sort((a, b) => a.rating - b.rating);
        } else if (selectedSort === "5-1") {
            newList.sort((a, b) => b.rating - a.rating);
        }

        setFilteredRatings(newList);
    }, [searchText, selectedSort, ratings, tourIdFilter]);

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


    const handleSwitchChange = async (id, checked) => {
        const newStatus = checked ? "active" : "disable"; // Đảo ngược trạng thái
        try {
            await RatingService.updateRatingStatus(id, newStatus);
            message.success("Cập nhật trạng thái thành công!");
            fetchData()
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            message.error("Lỗi khi cập nhật trạng thái!");
        }
    };

    const columns = [
        { title: "Người đánh giá", dataIndex: "email", key: "email" },
        { title: "Đánh giá", dataIndex: "rating", key: "rating" },
        { title: "Tour", dataIndex: "tuorName", key: "tuorName" },
        { title: "Tour ID", dataIndex: "tourId", key: "tourId" },
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