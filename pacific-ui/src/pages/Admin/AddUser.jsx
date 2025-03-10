import React, { useState } from 'react';
import { Form, Input, Row, DatePicker, Button, message, Upload, Radio, Col
} from 'antd';
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';

const AddUser = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    // 🟢 Xử lý tải ảnh lên
    const handleUpload = ({ file }) => {
        if (!file.type.startsWith("image/")) {
            message.error("Vui lòng tải lên tệp hình ảnh!");
            return;
        }

        if (file.size / 1024 / 1024 > 2) {
            message.error("Ảnh không được lớn hơn 2MB!");
            return;
        }

        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        form.setFieldsValue({ image: imageUrl });
    };

    // 🟢 Gửi dữ liệu lên API
    const handleSave = () => {
        form.validateFields()
            .then(async (values) => {
                setLoading(true);

                const newUser = {
                    ...values,
                    birthday: values.birthday.format("DD/MM/YYYY"),
                    image: selectedImage || "",
                };

                try {
                    const response = await fetch("http://localhost:3000/api/users", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(newUser),
                    });

                    if (response.ok) {
                        message.success("Thêm thành viên thành công!");
                        setTimeout(() => navigate("/admin"), 1000);
                    } else {
                        message.error("Lỗi khi thêm người dùng!");
                    }
                } catch (error) {
                    console.error("Lỗi:", error);
                    message.error("Lỗi kết nối tới server!");
                }

                setLoading(false);
            })
            .catch(() => {
                message.error("Vui lòng nhập đầy đủ thông tin!");
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Thêm Thành Viên</h2>
            <Form form={form} layout="vertical">
                <Row gutter={[16, 32]}>
                    <Col span={24}>
                        <Form.Item label="Ảnh đại diện" name="image">
                            <Upload beforeUpload={() => false} showUploadList={false} accept="image/png, image/jpeg" onChange={handleUpload}>
                                {selectedImage ? (
                                    <img src={selectedImage} alt="avatar" style={{ width: "100px", borderRadius: "10px" }} />
                                ) : (
                                    <Button icon={<UploadOutlined />}>Tải ảnh lên</Button>
                                )}
                            </Upload>
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 32]}>
                    <Col span={12}>
                        <Form.Item label="Tên tài khoản" name="username" rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Họ & Tên" name="fullname" rules={[{ required: true, message: "Vui lòng nhập họ & tên!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 32]}>
                    <Col span={12}>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Vui lòng nhập địa chỉ email!" }]}>
                            <Input type="email" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Số điện thoại" name="phone" rules={[{ required: true, message: "Vui lòng nhập số điện thoại!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 32]}>
                    <Col span={12}>
                        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Ngày sinh" name="birthday" rules={[{ required: true, message: "Vui lòng chọn ngày sinh!" }]}>
                            <DatePicker format="DD/MM/YYYY" style={{ width: "100%" }} />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={[16, 32]}>
                    <Col span={24}>
                        <Form.Item label="Giới tính" name="gender">
                            <Radio.Group>
                                <Radio value="nam">Nam</Radio>
                                <Radio value="nữ">Nữ</Radio>
                                <Radio value="khác">Khác</Radio>
                            </Radio.Group>
                        </Form.Item>
                    </Col>
                </Row>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}>
                    <Button onClick={() => navigate("/admin")}>Hủy</Button>
                    <Button type="primary" onClick={handleSave} loading={loading}>
                        {loading ? "Đang lưu..." : "Lưu"}
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default AddUser;
