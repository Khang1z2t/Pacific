import React, { useCallback, useEffect, useState } from 'react';
import {
    Button,
    Col,
    Dropdown,
    Form,
    Image,
    Input,
    Menu,
    Modal,
    Radio,
    Row,
    Select,
    Space,
    Switch,
    Table,
    Tag,
    Upload,
} from 'antd';
import { DownOutlined, InfoCircleOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import UserServices from '~/services/UserServices';
import config from '~/config';

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

    const ITEM_PER_PAGE = 7;
    const [filteredUsers, setFilteredUsers] = useState([]);
    // const page = filteredUsers.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);
    // const onChange = (e) => {setCurrentPage(e);};
    const [imagePreview, setImagePreview] = useState(selectedUser?.image || ""); // Lưu ảnh preview

    useEffect(() => {
        UserServices.getAllUsers().then((res) => {
            setUsers(res.data);
            setFilteredUsers(res.data);
        }).catch((err) => {
            console.error(err);
        });
        setCurrentPage(1);
    }, []);


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


    const handleSave = useCallback(async () => {
        if (!selectedUser) {
            console.error("Không có selectedUser");
            return;
        }

        try {
            const values = await form.validateFields();
            const updatedUser = await UserServices.updateUser(selectedUser.id, values);

            if (updatedUser) {
                setUsers(prevUsers =>
                    prevUsers.map(user =>
                        user.id === selectedUser.id ? { ...user, ...values } : user
                    )
                );
                handleCloseModal();
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật user:", error);
        }
    }, [selectedUser, form]);


    const sortTypes = {
        "Tên tài khoản (A-Z)": "Tên (A-Z)",
        "Tên tài khoản (Z-A)": "Tên (Z-A)",
    };

    const handleSortChange = (type) => {
        setSelectedSort(type);
    }

    const menu = (
        <Menu onClick={(e) => handleSortChange(e.key)}>
            {Object.keys(sortTypes).map((key) => (
                <Menu.Item key={key}>{sortTypes[key]}</Menu.Item>
            ))}
        </Menu>
    );

    // Xử lý tìm kiếm và sắp xếp
    useEffect(() => {
        let newList = users.filter(user =>
            user.username.toLowerCase().includes(searchText.toLowerCase())
        );

        if (selectedSort === "Tên tài khoản (A-Z)") {
            newList.sort((a, b) => a.username.localeCompare(b.username));
        } else if (selectedSort === "Tên tài khoản (Z-A)") {
            newList.sort((a, b) => b.username.localeCompare(a.username));
        }

        setFilteredUsers(newList);
    }, [searchText, selectedSort, users]);

    const handleSwitchChange = async (id, checked) => {
        const newStatus = checked ? "active" : "inactive";
        try {
            await UserServices.updateUserStatus(id, newStatus);
            setUsers(prevUsers =>
                prevUsers.map(user => (user.id === id ? { ...user, status: newStatus } : user))
            );
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
    };


    // const handleUpload = useCallback(({ fileList }) => {
    //     if (fileList.length > 0) {
    //         form.setFieldsValue({
    //             image: fileList[0].thumbUrl,
    //         });
    //     }
    // }, [form]);


    // Xử lý khi upload ảnh
    const handleUpload = ({ file }) => {
        if (file) {
            const reader = new FileReader();
            reader.onload = e => {
                setImagePreview(e.target.result);
                form.setFieldsValue({ image: e.target.result });
            };
            reader.readAsDataURL(file);
        }
    };

    const columns = [
        { title: "Tên tài khoản", dataIndex: "username", key: "username" },
        { title: "Hình Ảnh", dataIndex: "avatarUrl", render: (value) => (
                <Image.PreviewGroup
                >
                    <Image width={100} src={`${config.imageConfig.getAvatar(value)}`} />
                </Image.PreviewGroup>
            ) },
        { title: "Deposit", dataIndex: "deposit", key: "deposit" },
        { title: "Email", dataIndex: "email", key: "email" },
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
                dataSource={filteredUsers.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE)}
                columns={columns}
                pagination={{
                    current: currentPage,
                    pageSize: ITEM_PER_PAGE,
                    total: filteredUsers.length,
                    onChange: setCurrentPage,
                }}
                rowKey={(record) => record.id || record.key}
                loading={loading}
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
                    <Form form={form} layout="vertical" initialValues={selectedUser}>
                        {/* Ảnh đại diện */}
                        <Form.Item label="Ảnh đại diện" name="image">
                            <Upload
                                listType="picture-card"
                                showUploadList={false} // Không hiển thị danh sách file
                                beforeUpload={() => false} // Không upload tự động lên server
                                maxCount={1} // Chỉ cho phép chọn 1 ảnh
                                onChange={handleUpload} // Gọi khi có ảnh mới
                            >
                                {imagePreview ? (
                                    <img src={imagePreview} alt="avatar" style={{ width: "100%" }} />
                                ) : (
                                    <UploadOutlined />
                                )}
                            </Upload>
                        </Form.Item>

                        {/* Thông tin người dùng */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Tên tài khoản" name="username">
                                    <Input readOnly />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Email" name="email">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Deposit" name="deposit">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Vai trò" name="role">
                                    <Input disabled={!isEditing} />
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
