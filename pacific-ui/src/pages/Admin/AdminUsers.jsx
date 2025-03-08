import React, { useState } from "react";
import { Space, Table, Tag, Pagination, Switch, Modal, Button, Form, Input, Radio, Select, DatePicker, Upload, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

 const initialData = [
     { id: 1, username: "LyAdmin", fullname: "Lý Nguyễn", deposit: 0, role: "admin", status: "active", gender: "nữ", email: "ly@gmail.com", phone: "0123456789", address: "Hà Nội", created_at: "2025-02-20", update_at: "2025-02-22", image: null },
     { id: 2, username: "TuanAdmin", fullname: "Tuấn Nguyễn", deposit: 0, role: "admin", status: "pending", gender: "nam", email: "tuan@gmail.com", phone: "0987654321", address: "TP HCM", created_at: "2025-02-19", update_at: "2025-02-20", image: null },
     { id: 3, username: "RonGuide", fullname: "Rôn Phạm", deposit: 1000000, role: "guide", status: "active", gender: "nam", email: "ron@gmail.com", phone: "0123334444", address: "Cần Thơ", created_at: "2025-02-20", update_at: "2025-02-21", image: null },
     { id: 4, username: "ChuongVo", fullname: "Chương Võ", deposit: 3000000, role: "user", status: "pending", gender: "nam", email: "chuong@gmail.com", phone: "0907654321", address: "TP HCM", created_at: "2025-02-19", update_at: "2025-02-21", image: null },
     { id: 5, username: "KhangAnime", fullname: "Khang Bảo", deposit: 500000, role: "user", status: "inactive", gender: "nữ", email: "khang@gmail.com", phone: "0123456780", address: "Huế", created_at: "2025-02-20", update_at: "2025-02-24", image: null },
     { id: 6, username: "HuuGuide", fullname: "Hữu Phan", deposit: 2000000, role: "guide", status: "pending", gender: "nam", email: "huu@gmail.com", phone: "0981234567", address: "Đà Nẵng", created_at: "2025-02-19", update_at: "2025-02-24", image: null },
 ];

 const AdminUsers = () => {
     const [currentPage, setCurrentPage] = useState(1);
     const [modalVisible, setModalVisible] = useState(false);
     const [isEditing, setIsEditing] = useState(false);
     const [selectedUser, setSelectedUser] = useState(null);
     const [form] = Form.useForm();
     const [users, setUsers] = useState(initialData);


     const showUserDetails = (user) => {
         setSelectedUser({ ...user });
         form.setFieldsValue({
             ...user,
             created_at: dayjs(user.created_at),
             update_at: dayjs(user.update_at),
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
                 console.log("Cập nhật dữ liệu:", values);

                 // Cập nhật dữ liệu
                 setUsers((prevUsers) =>
                     prevUsers.map((user) =>
                         user.id === selectedUser.id ? { ...user, ...values } : user
                     )
                 );

                 setIsEditing(false);
             })
             .catch((errorInfo) => {
                 console.error("Lỗi cập nhật:", errorInfo);
             });
     };


     const handleSwitchChange = (id, checked) => {
         setUsers((prevUsers) =>
             prevUsers.map((user) =>
                 user.id === id ? { ...user, status: checked ? "active" : "inactive" } : user
             )
         );
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
         { title: "Ngày tạo", dataIndex: "created_at", key: "created_at" },
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
             <h2 className="text-xl font-bold mb-4">QUẢN LÝ TÀI KHOẢN</h2>
             <Table dataSource={users} columns={columns} pagination={{ current: currentPage, pageSize: 5, onChange: setCurrentPage }} rowKey="id" />

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
                                <Form.Item label="Mật khẩu" name="password">
                                    <Input.Password disabled={!isEditing} />
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

export default AdminUsers;


// import React, { useState, useEffect } from "react";
// import { Table, Tag, Switch, Button, Space } from "antd";
// import axiosInstance, { getAllUsers } from "~/config/axiosConfig";
//
//
// const AdminUsers = () => {
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(false); // Thêm state loading
//
//     useEffect(() => {
//         const fetchUsers = async () => {
//             setLoading(true); // Bắt đầu loading
//             try {
//                 const response = await getAllUsers(); // Gọi API từ axiosConfig.js
//                 console.log(response.data);
//                 // setUsers(response.data);
//             } catch (error) {
//                 console.error("Lỗi khi gọi API:", error);
//             }
//             setLoading(false); // Dừng loading
//         };
//
//         fetchUsers();
//     }, []);
//
//     // Cập nhật trạng thái người dùng
//     const handleSwitchChange = async (id, checked) => {
//         const newStatus = checked ? "active" : "inactive";
//         try {
//             await axiosInstance.patch(`/users/${id}/status`, { status: newStatus });
//             setUsers(users.map(user => (user.id === id ? { ...user, status: newStatus } : user)));
//             console.log(`✅ Cập nhật trạng thái User ${id}: ${newStatus}`);
//         } catch (error) {
//             console.error(`Lỗi cập nhật trạng thái user ${id}:`, error);
//         }
//     };
//
//     // Cấu hình cột hiển thị trên bảng
//     const columns = [
//         { title: "ID", dataIndex: "id", key: "id" },
//         { title: "Tên tài khoản", dataIndex: "username", key: "username" },
//         {
//             title: "Họ & tên",
//             key: "fullname",
//             render: (record) => `${record.firstname || ''} ${record.lastname || ''}`.trim()
//         },
//         { title: "Email", dataIndex: "email", key: "email" },
//         { title: "SĐT", dataIndex: "phone", key: "phone" },
//         { title: "Địa chỉ", dataIndex: "address", key: "address" },
//         { title: "Giới tính", dataIndex: "gender", key: "gender" },
//         { title: "Ngày sinh", dataIndex: "birthday", key: "birthday" },
//         { title: "Số dư (VNĐ)", dataIndex: "deposit", key: "deposit" },
//         {
//             title: "Mật khẩu",
//             dataIndex: "password",
//             key: "password",
//             render: () => "******" // Ẩn mật khẩu
//         },
//         {
//             title: "Ảnh đại diện",
//             dataIndex: "avatarUrl",
//             key: "avatarUrl",
//             render: (avatarUrl) => (
//                 avatarUrl ? <img src={avatarUrl} alt="Avatar" style={{ width: 40, borderRadius: "50%" }} />
//                     : "N/A"
//             )
//         },
//         {
//             title: "Vai trò",
//             dataIndex: "role",
//             key: "role",
//             render: (role) => (
//                 <Tag color={role === "admin" ? "blue" : role === "guide" ? "purple" : "gray"}>
//                     {role.toUpperCase()}
//                 </Tag>
//             )
//         },
//         {
//             title: "Trạng thái",
//             dataIndex: "status",
//             key: "status",
//             render: (status) => (
//                 <Tag color={status === "active" ? "green" : status === "pending" ? "gold" : "volcano"}>
//                     {status.toUpperCase()}
//                 </Tag>
//             )
//         },
//         {
//             title: "Hành động",
//             key: "action",
//             render: (_, record) => (
//                 <Space size="middle">
//                     <Button type="link" onClick={() => console.log("Xem chi tiết user:", record)}>Xem chi tiết</Button>
//                     <Switch
//                         checked={record.status === "active"}
//                         onChange={(checked) => handleSwitchChange(record.id, checked)}
//                     />
//                 </Space>
//             ),
//         },
//     ];
//
//     return (
//         <div className="container mx-auto p-4">
//             <h2 className="text-xl font-bold mb-4">QUẢN LÝ TÀI KHOẢN</h2>
//             <Table
//                 dataSource={users || []}
//                 columns={columns}
//                 rowKey="id"
//                 loading={loading} // Đã định nghĩa biến loading
//                 pagination={{ pageSize: 5 }}
//             />
//         </div>
//     );
// };
//
// export default AdminUsers;
//
