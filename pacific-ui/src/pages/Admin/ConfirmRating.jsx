import React, { useState, useEffect } from "react";
import { Space, Table, Modal, Button, Form, Input, DatePicker, Row, Col
} from 'antd';
import { SearchOutlined, InfoCircleOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const ConfirmRating = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedRating, setSelectedRating] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    const [rating, setRating] = useState([]);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        fetchRatings();
    }, []);

    const fetchRatings = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/rating");
            const data = await response.json();
            setRating(data);
        } catch (error) {
            console.error("Error fetching rating:", error);
        }
        setLoading(false);
    };

    const showDetails = (rating) => {
        setSelectedRating({ ...rating });

        form.setFieldsValue({
            name: rating.name,
            tour: rating.tour,
            content: rating.content,
            rating: rating.rating,
            date: rating.date ? dayjs(rating.date, "YYYY/MM/DD") : null,
        });

        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedRating(null);
    };

    const filteredRating = rating.filter(item =>
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.tour.toLowerCase().includes(searchText.toLowerCase()) ||
        item.content.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc chắn muốn xóa đánh giá này không?",
            onOk: async () => {
                try {
                    await fetch(`http://localhost:3000/api/rating/${id}`, { method: "DELETE" });
                    setRating(prevRatings => prevRatings.filter(item => item.id !== id));
                } catch (error) {
                    console.error("Error deleting rating:", error);
                }
            },
        });
    };

    const columns = [
        { title: "Người đánh giá", dataIndex: "name", key: "name" },
        { title: "Tour", dataIndex: "tour", key: "tour" },
        { title: "Nội dung", dataIndex: "content", key: "content" },
        { title: "Số sao", dataIndex: "rating", key: "rating" },
        { title: "Ngày đánh giá", dataIndex: "date", key: "date" },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<InfoCircleOutlined />} onClick={() => showDetails(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                </Space>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">DANH SÁCH ĐÁNH GIÁ ĐÃ DUYỆT</h2>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Tìm kiếm"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </Space>
            <Table
                className="w-full, h-full"
                dataSource={filteredRating}
                columns={columns}
                loading={loading}
                pagination={{ current: currentPage, pageSize: 5, onChange: setCurrentPage }}
                rowKey="id"
                size="large"
            />

            {/* Popup */}
            <Modal
                title="Đánh giá chi tiết"
                open={modalVisible}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="close" onClick={handleCloseModal}>
                        Đóng
                    </Button>,
                ]}
            >
                {selectedRating && (
                    <Form form={form} layout="vertical">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Họ & tên" name="name">
                                    <Input readOnly />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Tour" name="tour">
                                    <Input readOnly />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Nội dung" name="content">
                                    <Input readOnly />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Số sao" name="rating">
                                    <Input readOnly />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Ngày đánh giá" name="date">
                                    <DatePicker format="DD/MM/YYYY" disabled />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default ConfirmRating;
