import React, { useState, useEffect } from "react";
import { Table, Button, Upload, Select, DatePicker, Typography, Space, Input, Modal, Form } from "antd";
import { SearchOutlined, UploadOutlined, EditOutlined, DeleteOutlined, InfoOutlined } from '@ant-design/icons';
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

const Blog = () => {
    const [blog, setBlog] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [editingBlog, setEditingBlog] = useState(null);
    const [form] = Form.useForm();
    const [searchTitle, setSearchTitle] = useState("");

    useEffect(() => {
        fetchBlog();
    }, []);

    const fetchBlog = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/blog");
            const data = await response.json();
            setBlog(data);
        } catch (error) {
            console.error("Error fetching blog:", error);
        }
        setLoading(false);
    };

    const filteredBlogs = blog.filter((item) => {
        const matchTitle = item.title.toLowerCase().includes(searchTitle.toLowerCase());
        // const matchDate = searchDate ? dayjs(item.date).isSame(searchDate, "day") : true;
        return matchTitle;
    });

    const handleDelete = async (title) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: `Bạn có chắc chắn muốn xóa blog "${title}" không?`,
            onOk: async () => {
                try {
                    await fetch(`http://localhost:3000/api/blog/${title}`, { method: "DELETE" });
                    setBlog(blog.filter((blog) => blog.title !== title));
                } catch (error) {
                    console.error("Error deleting blog:", error);
                }
            },
        });
    };

    const handleEdit = (blog) => {
        setEditingBlog(blog);
        form.setFieldsValue({ ...blog, date: dayjs(blog.date) });
        setModalVisible(true);
    };

    const handleAdd = () => {
        setEditingBlog(null);
        form.resetFields();
        setModalVisible(true);
    };

    const handleSubmit = async (values) => {
        try {
            // Lấy danh sách file ảnh
            const images = values.images?.map(file => file.originFileObj) || [];

            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("searchName", values.searchName);
            formData.append("status", values.status);
            formData.append("date", values.date.format("YYYY-MM-DD"));
            formData.append("content", values.content);
            formData.append("description", values.description);

            images.forEach((image, index) => {
                formData.append(`images[${index}]`, image);
            });

            if (editingBlog) {
                await fetch(`http://localhost:3000/api/blog/${editingBlog.id}`, {
                    method: "PUT",
                    body: formData,
                });
                setBlog(blog.map((b) => (b.id === editingBlog.id ? { ...b, ...values } : b)));
            } else {
                const response = await fetch("http://localhost:3000/api/blog", {
                    method: "POST",
                    body: formData,
                });
                const newBlog = await response.json();
                setBlog([...blog, newBlog]);
            }
            setModalVisible(false);
        } catch (error) {
            console.error("Error saving blog:", error);
        }
    };

    const navigate = useNavigate();

    const handleInfo = (record) => {
        navigate(`/info-blog/${record.title}`);
    };

    const columns = [
        { title: "Tiêu đề", dataIndex: "title", key: "title" },
        { title: "Ngày tạo", dataIndex: "date", key: "date", render: (text) => dayjs(text).format("DD/MM/YYYY") },
        { title: "Nội dung", dataIndex: "content", key: "content" },
        { title: "Trạng thái", dataIndex: "status", key: "status" },
        {
            title: "Thao tác",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button icon={<InfoOutlined />} onClick={() => handleInfo(record)} />
                    <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.title)} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
            <Title level={2}>DANH SÁCH BLOG</Title>

            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Tìm theo tiêu đề..."
                    prefix={<SearchOutlined />}
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    style={{ width: 200 }}
                />
                <Button type="primary" onClick={handleAdd}>Thêm mới</Button>
            </Space>

            <Table columns={columns} dataSource={filteredBlogs} loading={loading} rowKey="title" />

            {/* Modal Form */}
            <Modal
                title={editingBlog ? "Chỉnh Sửa Blog" : "Thêm Mới Blog"}
                open={modalVisible}
                onOk={() => form.submit()}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setModalVisible(false)}>Hủy</Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()}>Lưu</Button>
                ]}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleSubmit}
                >
                    <Form.Item name="title" label="Tiêu đề" rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="searchName" label="Tên tìm kiếm" rules={[{ required: true, message: "Vui lòng nhập tên tìm kiếm" }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item name="banner" label="Banner">
                        <Upload beforeUpload={() => false}>
                            <Button icon={<UploadOutlined />}>Tải lên banner</Button>
                        </Upload>
                    </Form.Item>
                    
                    <Form.Item name="images" label="Hình ảnh">
                        <Upload
                            multiple
                            listType="picture"
                            beforeUpload={() => false}  // Không upload ngay lập tức
                            onChange={({ fileList }) => form.setFieldsValue({ images: fileList })}
                        >
                            <Button icon={<UploadOutlined />}>Tải hình ảnh lên</Button>
                        </Upload>
                    </Form.Item>
                    
                    <Form.Item name="status" label="Trạng thái" rules={[{ required: true, message: "Vui lòng chọn trạng thái" }]}>
                        <Select>
                            <Select.Option value="active">Hiển thị</Select.Option>
                            <Select.Option value="inactive">Vô hiệu hóa</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item name="date" label="Ngày tạo" rules={[{ required: true, message: "Vui lòng chọn ngày tạo" }]}>
                        <DatePicker format="DD/MM/YYYY" />
                    </Form.Item>

                    <Form.Item name="content" label="Nội dung" rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}>
                        <Input.TextArea rows={5} placeholder="Nhập nội dung blog" />
                    </Form.Item>

                    <Form.Item name="description" label="Mô tả" rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}>
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Blog;