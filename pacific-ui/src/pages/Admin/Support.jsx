import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Table, Tag } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import SupportService from '~/services/SupportService';

const ITEM_PER_PAGE = 7;

const Support = () => {
    const [form] = Form.useForm();
    const [supports, setSupports] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        SupportService.getAllSupports().then((res) => {
            setSupports(res.data);
        }).catch((err) => {
            console.error(err);
        });
    }, []);


    const [supportId, setSupportId] = useState(null); // Lưu ID của support cần cập nhật

    const handleOpenModal = (record) => {
        setSupportId(record.id); // Gán supportId từ record
        form.setFieldsValue({
            email: record.email,
            subject: "",
            message: ""
        });
        setModalVisible(true);
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        form.resetFields();
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            console.log("Dữ liệu gửi mail:", values);

            // Gửi email
            await SupportService.sendMail(values.email, values.subject, values.message);
            await SupportService.updateSupportStatus(supportId, "resolved");
            message.success("Gửi email thành công, trạng thái đã cập nhật!");

            // Làm mới DS
            SupportService.getAllSupports()
                .then((res) => {
                    setSupports(res.data);
                    handleCloseModal();
                })
                .catch((err) => {
                    console.error("Lỗi khi làm mới danh sách:", err);
                    message.error("Có lỗi khi làm mới dữ liệu!");
                });

        } catch (error) {
            console.error("Lỗi khi gửi email:", error?.response?.data || error.message);
            message.error("Gửi email thất bại!");
        }
    };


    const columns = [
        { title: "Tên tài khoản", dataIndex: "username", key: "username" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Tiêu đề", dataIndex: "subject", key: "subject" },
        { title: "Nội dung", dataIndex: "message", key: "message" },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const statusColors = {
                    pending: "volcano",
                    resolved: "blue",
                };
                return (
                    <Tag color={statusColors[status.toLowerCase()] || "default"}>
                        {status.toUpperCase()}
                    </Tag>
                );
            },
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Button icon={<MailOutlined />} type="link" onClick={() => handleOpenModal(record)}>
                    Gửi thư
                </Button>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-2">
            <h2 className="text-2xl font-bold mb-4">KHÁCH HÀNG CẦN HỖ TRỢ & TƯ VẤN</h2>
            <Table dataSource={supports} columns={columns} pagination={{ pageSize: ITEM_PER_PAGE }} rowKey="id" />

            {/* Modal gửi thư */}
            <Modal
                title="GỬI THƯ PHẢN HỒI KHÁCH HÀNG"
                open={modalVisible}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="send" type="primary" onClick={handleSubmit} icon={<MailOutlined />}>Gửi</Button>,
                    <Button key="close" onClick={handleCloseModal}>Đóng</Button>,
                ]}
            >
                <Form form={form} layout="vertical">
                    <Form.Item label="To Email:" name="email" rules={[{ required: true, message: "Vui lòng nhập email" }]}>
                        <Input placeholder="Nhập email" />
                    </Form.Item>
                    <Form.Item label="Tiêu đề" name="subject" rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}>
                        <Input placeholder="Nhập tiêu đề" />
                    </Form.Item>
                    <Form.Item label="Nội dung" name="message" rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}>
                        <Input.TextArea rows={4} placeholder="Nhập nội dung thư" />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Support;
