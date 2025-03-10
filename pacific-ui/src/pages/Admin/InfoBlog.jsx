import React from "react";
import { Form, Input, Upload, Select, DatePicker, Button } from "antd";
import { UploadOutlined, DownOutlined } from "@ant-design/icons";

const { TextArea } = Input;

const InfoBlog = () => {
    const [form] = Form.useForm();

    const handleSubmit = async (values) => {
        const formData = new FormData();
        formData.append("title", values.title);
        formData.append("searchName", values.searchName);
        formData.append("status", values.status);
        formData.append("date", values.date.format("YYYY-MM-DD"));
        formData.append("content", values.content);
        formData.append("description", values.description);

        // Thêm ảnh vào formData
        values.images?.forEach((file, index) => {
            formData.append(`images[${index}]`, file.originFileObj);
        });

        try {
            const response = await fetch("http://localhost:3000/api/blog", {
                method: "POST",
                body: formData,
            });
            console.log("Response:", await response.json());
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h2 className="text-2xl font-bold mb-4">THÔNG TIN BLOGS</h2>
            <Form form={form} layout="vertical" onFinish={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="title" label="Tiêu đề *" rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}>
                        <Input placeholder="Nhập tiêu đề" />
                    </Form.Item>
                    <Form.Item name="searchName" label="Tên tìm kiếm *" rules={[{ required: true, message: "Vui lòng nhập tên tìm kiếm" }]}>
                        <Input placeholder="Nhập tên tìm kiếm" />
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="banner" label="Banner *" valuePropName="fileList">
                        <Upload beforeUpload={() => false} listType="picture">
                            <Button icon={<UploadOutlined />}>Choose a picture</Button>
                        </Upload>
                    </Form.Item>

                    <Form.Item name="images" label="Hình ảnh *" valuePropName="fileList">
                        <Upload
                            multiple
                            listType="picture"
                            beforeUpload={() => false} // Không upload ngay lập tức
                            onChange={({ fileList }) => form.setFieldsValue({ images: fileList })}
                        >
                            <Button icon={<UploadOutlined />}>Tải lên nhiều hình ảnh</Button>
                        </Upload>
                    </Form.Item>
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <Form.Item name="status" label="Trạng thái *" rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}>
                        <Select placeholder="Choose a active">
                            <Select.Option value="active">Hiển thị</Select.Option>
                            <Select.Option value="inactive">Vô hiệu hóa</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="date" label="Ngày tạo *" rules={[{ required: true, message: "Vui lòng chọn ngày tạo" }]}>
                        <DatePicker format="DD/MM/YYYY" className="w-full" />
                    </Form.Item>
                </div>

                <Form.Item name="content" label="Nội dung *" rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}>
                    <TextArea rows={4} placeholder="Nhập nội dung blog" />
                </Form.Item>
                <Form.Item name="description" label="Mô tả *" rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
                    <TextArea rows={3} placeholder="Describe something..." />
                </Form.Item>

                <div className="flex justify-end gap-2">
                    <Button
                        type="default"
                        className="bg-gray-500 text-white"
                        onClick={() => {
                            form.resetFields(); // Reset tất cả dữ liệu
                        }}
                    >
                        Làm mới
                    </Button>
                    <Button type="primary" htmlType="submit">Lưu</Button>
                </div>
            </Form>
        </div>
    );
};

export default InfoBlog;
