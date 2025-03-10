import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Space, Table, Tag, Pagination, Switch, Modal, Button, Form, Input, Radio, Select, Upload, Row, Col, Dropdown, Menu } from "antd";
import { SearchOutlined, DownOutlined, InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    const [selectedSort, setSelectedSort] = useState("Sắp xếp theo");
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchUsers();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchText, selectedSort]);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:3000/api/users?search=${searchText}&sort=${selectedSort}`);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
        setLoading(false);
    }, [searchText, selectedSort]);

    const handleCloseModal = () => {
        setModalVisible(false);
        setIsEditing(false);
        setSelectedUser(null);
        form.resetFields();
    };

    const showDetails = (record) => {
        setSelectedUser(record);
        setModalVisible(true);
        form.setFieldsValue(record);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = async () => {
        if (!selectedUser) return;
        try {
            const values = form.getFieldsValue();
            const response = await fetch(`http://localhost:3000/api/users/${selectedUser.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(values),
            });
            if (response.ok) {
                setUsers(users.map(user => user.id === selectedUser.id ? { ...user, ...values } : user));
                handleCloseModal();
            } else {
                console.error("Failed to update user");
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const sortTypes = {
        "name-asc": "Họ & tên (A-Z)",
        "name-desc": "Họ & tên (Z-A)",
        "date-newest": "Ngày tạo (mới nhất)",
        "date-oldest": "Ngày tạo (cũ nhất)",
    };

    const handleSortChange = (type) => {
        setSelectedSort(type);
    };

    const menu = (
        <Menu onClick={(e) => handleSortChange(e.key)}>
            {Object.keys(sortTypes).map((key) => (
                <Menu.Item key={key}>{sortTypes[key]}</Menu.Item>
            ))}
        </Menu>
    );

    const filteredUsers = useMemo(() => {
        return users.filter((user) => {
            return (
                (user.username?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
                (user.fullname?.toLowerCase() || "").includes(searchText.toLowerCase()) ||
                (user.role?.toLowerCase() || "").includes(searchText.toLowerCase())
            );
        });
    }, [users, searchText]);

    const handleSwitchChange = async (id, checked) => {
        const newStatus = checked ? "active" : "inactive";
        try {
            const response = await fetch(`http://localhost:3000/api/users/${id}/status`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (response.ok) {
                setUsers(prevUsers =>
                    prevUsers.map(user => user.id === id ? { ...user, status: newStatus } : user)
                );
            } else {
                console.error("Cập nhật trạng thái thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
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
        { title: "Vai trò", dataIndex: "role", key: "role" },
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
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<InfoCircleOutlined />} onClick={() => showDetails(record)} />
                    <Switch checked={record.status === "active"} onChange={(checked) => handleSwitchChange(record.id, checked)} />
                </Space>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-2">
            <h2 className="text-2xl font-bold mb-4">QUẢN LÝ TÀI KHOẢN</h2>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Tìm kiếm"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Dropdown overlay={menu} trigger={["click"]}>
                    <Button>{sortTypes[selectedSort] || "Sắp xếp theo"} <DownOutlined /></Button>
                </Dropdown>
            </Space>
            <Table
                dataSource={filteredUsers}
                columns={columns}
                pagination={{ current: currentPage, pageSize: 5, onChange: setCurrentPage }}
                rowKey="id"
                size="large"
            />

            {/* Popup */}
            <Modal
                title="Thông tin tài khoản"
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
                        <Form.Item label="Ảnh đại diện" name="image">
                            <Upload listType="picture-card" onChange={handleUpload} showUploadList={false}>
                                {selectedUser.image ? <img src={selectedUser.image} alt="avatar" style={{ width: "100%" }} /> : <UploadOutlined />}
                            </Upload>
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Tên tài khoản" name="username">
                                    <Input readOnly />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Họ & Tên" name="fullname">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Email" name="email">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Số điện thoại" name="phone">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Địa chỉ" name="address">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Ngày sinh" name="birthday">
                                    <Input disabled={!isEditing} format="DD/MM/YYYY" />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Giới tính" name="gender">
                                    <Radio.Group disabled={!isEditing}>
                                        <Radio value="nam">Nam</Radio>
                                        <Radio value="nữ">Nữ</Radio>
                                        <Radio value="khác">Khác</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
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

export default Users;
