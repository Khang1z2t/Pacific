import React, { useState, useEffect } from "react";
import { Space, Table, Tag, Pagination, Switch, Modal, Button, Form, Input, Select, DatePicker, Upload, Row, Col } from "antd";
import { UploadOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const InfoGuide = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();



    const fetchUsers = () => {
        const storedUsers = JSON.parse(localStorage.getItem("guides")) || [];
        setUsers(storedUsers);
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    useEffect(() => {
        const storedUsers = JSON.parse(localStorage.getItem("guides")) || [];
        setUsers(storedUsers);
    }, []);


    const handleAddGuide = () => {
        navigate("/add-guide");
    };

    const showUserDetails = (user) => {
        setSelectedUser({ ...user });
        form.setFieldsValue({
            ...user,
            start_date: dayjs(user.start_date, "DD/MM/YYYY HH:mm"),
            end_date: dayjs(user.end_date, "DD/MM/YYYY HH:mm"),
        });
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setIsEditing(false);
        setSelectedUser(null);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = () => {
        form.validateFields()
            .then((values) => {
                const updatedUser = {
                    ...values,
                    start_date: values.start_date.format("DD/MM/YYYY HH:mm"),
                    end_date: values.end_date.format("DD/MM/YYYY HH:mm"),
                };

                console.log("Cập nhật dữ liệu:", updatedUser);

                setUsers((prevUsers) =>
                    prevUsers.map((user) =>
                        user.id === selectedUser.id ? { ...user, ...updatedUser } : user
                    )
                );

                setIsEditing(false);
            })
            .catch((errorInfo) => {
                console.error("Lỗi cập nhật:", errorInfo);
            });
    };

    const handleSwitchChange = (id, checked) => {
        setUsers((prevUsers) => {
            const updatedUsers = prevUsers.map((user) =>
                user.id === id ? { ...user, status: checked ? "active" : "inactive" } : user
            );

            localStorage.setItem("guides", JSON.stringify(updatedUsers)); // ✅ Lưu vào localStorage
            return updatedUsers;
        });
    };


    const handleUpload = ({ fileList }) => {
        if (fileList.length > 0) {
            setSelectedUser((prev) => ({
                ...prev,
                image: fileList[0].thumbUrl,
            }));
        }
    };


    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Tên tài khoản", dataIndex: "username", key: "username" },
        { title: "Họ & tên", dataIndex: "fullname", key: "fullname" },
        { title: "Tour", dataIndex: "tour", key: "tour" },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "active" ? "green" : status === "pending" ? "gold" : "volcano"}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        { title: "Ngày đi", dataIndex: "start_date", key: "start_date" },
        { title: "Ngày về", dataIndex: "end_date", key: "end_date" },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button type="link" onClick={() => showUserDetails(record)}>
                        Xem chi tiết
                    </Button>
                    <Switch
                        checked={record.status === "active"}
                        onChange={(checked) => handleSwitchChange(record.id, checked)}
                    />
                </Space>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">HƯỚNG DẪN VIÊN</h2>
            <Button type="primary" onClick={handleAddGuide} style={{ marginBottom: "10px" }}>
                Thêm
            </Button>
            <Table dataSource={users} columns={columns} pagination={{ current: currentPage, pageSize: 5, onChange: setCurrentPage }} rowKey="id" />

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

export default InfoGuide;
