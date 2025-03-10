import React, { useState, useEffect, useCallback } from 'react';
import {
    Space, Table, Button, Input, Dropdown, Menu, Switch, Modal,
    Form, Row, Col, DatePicker, Select, Upload
} from 'antd';
import { SearchOutlined, DownOutlined, UploadOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Guide = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedSort, setSelectedSort] = useState("Sp xếp theo");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUsers();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchText, selectedSort]);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/guide?search=${searchText}&sort=${selectedSort}`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching guide:", error);
        }
        setLoading(false);
    }, [searchText, selectedSort]);

    const handleAddGuide = () => navigate("/add-guide");

    const showUserDetails = (user) => {
        if (!user) return;
        setSelectedUser(user);
        form.setFieldsValue({
            ...user,
            start_date: user.start_date ? dayjs(user.start_date, "YYYY-MM-DD HH:mm") : null,
            end_date: user.end_date ? dayjs(user.end_date, "YYYY-MM-DD HH:mm") : null,
        });
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setIsEditing(false);
        setSelectedUser(null);
    };

    const handleSortChange = (key) => setSelectedSort(key);

    const sortTypes = {
        "name-asc": "Họ & tên (A-Z)",
        "name-desc": "Họ & tên (Z-A)",
        "date-newest": "Ngày tạo (mới nhất)",
        "date-oldest": "Ngày tạo (cũ nhất)",
    };

    const menu = (
        <Menu onClick={(e) => handleSortChange(e.key)}>
            {Object.entries(sortTypes).map(([key, label]) => (
                <Menu.Item key={key}>{label}</Menu.Item>
            ))}
        </Menu>
    );

    const handleEdit = () => setIsEditing(true);

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            const updatedUser = {
                ...values,
                start_date: values.start_date?.format("YYYY-MM-DD HH:mm"),
                end_date: values.end_date?.format("YYYY-MM-DD HH:mm"),
            };

            const response = await fetch(`http://localhost:3000/api/guide/${selectedUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedUser),
            });

            if (!response.ok) throw new Error("Lỗi khi cập nhật dữ liệu");

            fetchUsers();
            setIsEditing(false);
            setModalVisible(false);
        } catch (error) {
            console.error("Lỗi:", error);
        }
    };

    const handleSwitchChange = async (id, checked) => {
        try {
            const updatedStatus = checked ? "active" : "inactive";
            const response = await fetch(`http://localhost:3000/api/guide/${id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: updatedStatus }),
            });

            if (!response.ok) throw new Error("Lỗi khi cập nhật trạng thái");

            setUsers(users.map(user => user.id === id ? { ...user, status: updatedStatus } : user));
        } catch (error) {
            console.error("Lỗi:", error);
        }
    };

    const handleUpload = () => {
        console.log("Upload function");
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">HƯỚNG DẪN VIÊN</h2>
            <Space style={{ marginBottom: 16 }}>
                <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <Dropdown overlay={menu} trigger={["click"]}>
                    <Button>{sortTypes[selectedSort] || "Sắp xếp theo"} <DownOutlined /></Button>
                </Dropdown>
            </Space>
            <Button type="primary" onClick={handleAddGuide} style={{ float: "right" }}>Thêm</Button>
            <Table
                loading={loading}
                dataSource={users}
                columns={[
                    { title: "ID", dataIndex: "id", key: "id" },
                    { title: "Tên tài khoản", dataIndex: "username", key: "username" },
                    { title: "Họ & tên", dataIndex: "fullname", key: "fullname" },
                    { title: "Tour", dataIndex: "tour", key: "tour" },
                    {
                        title: "Trạng thái",
                        dataIndex: "status",
                        key: "status",
                        render: (status, record) => (
                            <Switch checked={status === "active"} onChange={(checked) => handleSwitchChange(record.id, checked)} />
                        ),
                    },
                    { title: "Ngày đi", dataIndex: "start_date", key: "start_date" },
                    { title: "Ngày về", dataIndex: "end_date", key: "end_date" },
                    {
                        title: "Hành động",
                        key: "action",
                        render: (_, record) => (
                            <Button type="link" onClick={() => showUserDetails(record)}>Xem chi tiết</Button>
                        ),
                    },
                ]}
                pagination={{ current: currentPage, pageSize: 5, onChange: setCurrentPage }}
                rowKey="id"
            />

            {/* Popup */}
            <Modal
                title="Thông tin chi tiết tour"
                open={modalVisible}
                onCancel={handleCloseModal}
                footer={[
                    isEditing ? (
                        <Button key="save" type="primary" onClick={handleSave}>
                            Lưu
                        </Button>
                    ) : (
                        <Button key="edit" type="default" onClick={handleEdit}>
                            Chỉnh sửa
                        </Button>
                    ),
                    <Button key="close" onClick={handleCloseModal}>
                        Đóng
                    </Button>,
                ]}
            >
                {selectedUser && (
                    <Form form={form} layout="vertical">
                        <Form.Item label="Ảnh tour" name="image">
                            <Upload listType="picture-card" onChange={handleUpload} showUploadList={false}>
                                {selectedUser.image ? <img src={selectedUser.image} alt="avatar" style={{ width: "100%" }} /> : <UploadOutlined />}
                            </Upload>
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Tên tour" name="tour">
                                    <Input readOnly />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Điểm đến" name="destination">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Hành trình" name="schedule">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Số lượng khách" name="quantity">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Ngày đi" name="start_date">
                                    <DatePicker
                                        showTime={{ format: "HH:mm" }}
                                        format="DD/MM/YYYY HH:mm"
                                        disabled={!isEditing}
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Ngày về" name="end_date">
                                    <DatePicker
                                        showTime={{ format: "HH:mm" }}
                                        format="DD/MM/YYYY HH:mm"
                                        disabled={!isEditing}
                                    />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Trạng thái" name="status">
                                    <Select disabled={!isEditing}>
                                        <Select.Option value="active">Active</Select.Option>
                                        <Select.Option value="inactive">Inactive</Select.Option>
                                        <Select.Option value="pending">Pending</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default Guide;

