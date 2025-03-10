import React, { useEffect, useState } from 'react';
import { Form, Input, Row, Col, Select, DatePicker, Button, message, Upload
} from 'antd';
import { useNavigate } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';


const AddGuide = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [selectedUser, setSelectedUser] = useState({ image: null });
    const [loading, setLoading] = useState(false);
    const [guides, setGuides] = useState([]);

    useEffect(() => {
        fetchTours();
    }, []);

    const fetchTours = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/guide");
            const data = await response.json();
            setGuides(data);
        } catch (error) {
            console.error("Error fetching guide:", error);
        }
        setLoading(false);
    };

    const handleUpload = ({ fileList }) => {
        if (fileList.length > 0) {
            const imageUrl = fileList[0].thumbUrl;
            setSelectedUser((prev) => ({ ...prev, image: imageUrl }));
            form.setFieldsValue({ image: imageUrl }); // Lưu ảnh vào form
        }
    };

    const handleAddGuide = async () => {
        try {
            const values = await form.validateFields(); // Lấy dữ liệu từ form
            const newGuide = {
                ...values,
                start_date: values.start_date?.format("YYYY-MM-DD HH:mm:ss"),
                end_date: values.end_date?.format("YYYY-MM-DD HH:mm:ss"),
                image: selectedUser.image,
            };

            const response = await fetch("http://localhost:3000/api/guide", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newGuide),
            });

            if (!response.ok) {
                throw new Error("Lỗi khi thêm mới hướng dẫn viên");
            }

            message.success("Thêm hướng dẫn viên thành công!");
            fetchTours(); // Cập nhật danh sách sau khi thêm mới
            form.resetFields(); // Xóa dữ liệu form sau khi lưu
            setSelectedUser({ image: null });
        } catch (error) {
            console.error("Lỗi:", error);
            message.error("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Thêm Hướng Dẫn Viên</h2>
            <Form form={form} layout="vertical">
                <Form.Item label="Ảnh đại diện" name="image">
                    <Upload listType="picture-card" onChange={handleUpload} showUploadList={false}>
                        {selectedUser.image ? <img src={selectedUser.image} alt="avatar" style={{ width: "100%" }} /> : <UploadOutlined />}
                    </Upload>
                </Form.Item>
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
                        <Form.Item label="Tour" name="tour" rules={[{ required: true, message: "Vui lòng nhập tên tour!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Trạng thái" name="status" rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}>
                            <Select>
                                <Select.Option value="active">Active</Select.Option>
                                <Select.Option value="inactive">Inactive</Select.Option>
                                <Select.Option value="pending">Pending</Select.Option>
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 32]}>
                    <Col span={12}>
                        <Form.Item label="Ngày đi" name="start_date" rules={[{ required: true, message: "Vui lòng chọn ngày đi!" }]}>
                            <DatePicker showTime format="DD/MM/YYYY HH:mm" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Ngày về" name="end_date" rules={[{ required: true, message: "Vui lòng chọn ngày về!" }]}>
                            <DatePicker showTime format="DD/MM/YYYY HH:mm" />
                        </Form.Item>
                    </Col>
                </Row>
                <Button type="primary" onClick={handleAddGuide} style={{ marginRight: "10px" }}>
                    Lưu
                </Button>
                <Button onClick={() => navigate("/admin")}>Hủy</Button>
            </Form>
        </div>
    );
};

export default AddGuide;
