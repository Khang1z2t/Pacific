import React from "react";
import { Form, Input, Select, DatePicker, Button, message } from "antd";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

const AddGuide = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const handleSave = () => {
        form.validateFields()
            .then((values) => {
                const newGuide = {
                    id: Date.now(),
                    ...values,
                    start_date: values.start_date.format("DD/MM/YYYY HH:mm"),
                    end_date: values.end_date.format("DD/MM/YYYY HH:mm"),
                };


                const storedGuides = JSON.parse(localStorage.getItem("guides")) || [];
                const updatedGuides = [...storedGuides, newGuide];


                localStorage.setItem("guides", JSON.stringify(updatedGuides));

                message.success("Thêm hướng dẫn viên thành công!");

                setTimeout(() => {
                    navigate("/info-guide");
                }, 500);
            })
            .catch((errorInfo) => {
                console.error("Lỗi nhập liệu:", errorInfo);
            });
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Thêm Hướng Dẫn Viên</h2>
            <Form form={form} layout="vertical">
                <Form.Item label="Tên tài khoản" name="username" rules={[{ required: true, message: "Vui lòng nhập tên tài khoản!" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Họ & Tên" name="fullname" rules={[{ required: true, message: "Vui lòng nhập họ & tên!" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Tour" name="tour" rules={[{ required: true, message: "Vui lòng nhập tên tour!" }]}>
                    <Input />
                </Form.Item>

                <Form.Item label="Trạng thái" name="status" rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}>
                    <Select>
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="inactive">Inactive</Select.Option>
                        <Select.Option value="pending">Pending</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item label="Ngày đi" name="start_date" rules={[{ required: true, message: "Vui lòng chọn ngày đi!" }]}>
                    <DatePicker showTime format="DD/MM/YYYY HH:mm" />
                </Form.Item>

                <Form.Item label="Ngày về" name="end_date" rules={[{ required: true, message: "Vui lòng chọn ngày về!" }]}>
                    <DatePicker showTime format="DD/MM/YYYY HH:mm" />
                </Form.Item>

                <Button type="primary" onClick={handleSave} style={{ marginRight: "10px" }}>
                    Lưu
                </Button>
                <Button onClick={() => navigate("/info-guide")}>Hủy</Button>
            </Form>
        </div>
    );
};

export default AddGuide;
