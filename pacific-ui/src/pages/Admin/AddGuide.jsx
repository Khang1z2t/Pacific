import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Input, message, Row, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import GuideServices from '~/services/GuideServices';

const AddGuide = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredGuides, setFilteredGuides] = useState([]);

    useEffect(() => {
        GuideServices.getAllGuides()
            .then((res) => {
                setGuides(res.data);
                setFilteredGuides(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
        setCurrentPage(1);
    }, []);

    const handleAddGuide = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const values = await form.validateFields();
            console.log("Dữ liệu form gửi đi:", values);

            // Kiểm tra email & phone đã tồn tại chưa
            const isEmailExists = guides.some((guide) => guide.email === values.email);
            const isPhoneExists = guides.some((guide) => guide.phone === values.phone);

            if (isEmailExists) {
                message.error("Email đã tồn tại, vui lòng nhập email khác!");
                setLoading(false);
                return;
            }

            if (isPhoneExists) {
                message.error("Số điện thoại đã tồn tại, vui lòng nhập số khác!");
                setLoading(false);
                return;
            }

            // Chuẩn bị dữ liệu gửi API
            const newGuideData = {
                ...values,
                start_date: values.start_date ? values.start_date.format("YYYY-MM-DD HH:mm:ss") : null,
                end_date: values.end_date ? values.end_date.format("YYYY-MM-DD HH:mm:ss") : null,
                image: selectedGuide?.image || null,
            };

            console.log("Gửi API với dữ liệu:", newGuideData);

            // Gọi API
            const response = await GuideServices.createGuide(newGuideData);

            if (response && response.data && response.data.id) {
                message.success("Thêm hướng dẫn viên thành công!");
                form.resetFields();

                // Chờ 1 giây rồi chuyển về trang admin
                setTimeout(() => {
                    navigate("/admin");
                }, 1000);
            } else {
                console.error("API phản hồi không hợp lệ:", response);
                message.error("API không trả về dữ liệu hợp lệ!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm hướng dẫn viên:", error);

            if (error.response && error.response.data && error.response.data.message) {
                message.error(`Lỗi từ server: ${error.response.data.message}`);
            } else {
                message.error("Đã xảy ra lỗi, vui lòng thử lại!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">THÊM HƯỚNG DẪN VIÊN</h2>
            <Form form={form} layout="vertical">
                <Row gutter={[16, 32]}>
                    <Col span={12}>
                        <Form.Item label="Họ" name="firstName" rules={[{ required: true, message: "Vui lòng nhập Họ!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Tên" name="lastName" rules={[{ required: true, message: "Vui lòng nhập Tên!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 32]}>
                    <Col span={12}>
                        <Form.Item label="Kinh nghiệm (năm)" name="experienceYears" rules={[{ required: true, message: "Vui lòng nhập kinh nghiệm!" }]}>
                            <Input type="number" min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Vui lòng nhập email!", type: "email" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 32]}>
                    <Col span={12}>
                        <Form.Item label="SĐT" name="phone" rules={[{ required: true, message: "Vui lòng nhập SĐT!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Địa chỉ" name="address" rules={[{ required: true, message: "Vui lòng nhập địa chỉ!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Form.Item label="Trạng thái" name="status" rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}>
                    <Select>
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="inactive">Inactive</Select.Option>
                        <Select.Option value="pending">Pending</Select.Option>
                    </Select>
                </Form.Item>
                <Button type="primary" onClick={handleAddGuide} loading={loading} style={{ marginRight: "10px" }}>
                    {loading ? "Đang lưu..." : "Lưu"}
                </Button>
                <Button onClick={() => navigate("/admin")}>Hủy</Button>
            </Form>
        </div>
    );
};

export default AddGuide;
