import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Modal, Table, Tag } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import SupportService from '~/services/SupportService';
import dayjs from 'dayjs';

const ITEM_PER_PAGE = 7;

const Support = () => {
    const [form] = Form.useForm();
    const [supports, setSupports] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [supportId, setSupportId] = useState(null);

    useEffect(() => {
        fetchSupports();
    }, []);


    const fetchSupports = async () => {
        try {
            const res = await SupportService.getAllSupports();

            // Support mới lên đầu
            const sortedSupports = res.data.sort((a, b) => {
                // Ưu tiên pending lên đầu
                if (a.status === 'pending' && b.status !== 'pending') return -1;
                if (a.status !== 'pending' && b.status === 'pending') return 1;

                // Nếu cùng trạng thái, sắp theo ngày mới nhất
                return new Date(b.createdAt) - new Date(a.createdAt);
            });

            setSupports(sortedSupports);
        } catch (err) {
            console.error(err);
            message.error("Có lỗi khi lấy danh sách yêu cầu hỗ trợ.");
        }
    };


    const handleOpenModal = (record) => {
        setSupportId(record.id);
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

            // Gửi phản hồi và cập nhật trạng thái hỗ trợ
            const response = await SupportService.respondToSupport({
                id: supportId,
                email: values.email,
                subject: values.subject,
                responseMessage: values.message,
            });

            if (response?.code === 200) {

                const updateStatusResponse = await SupportService.updateSupportStatus(supportId, 'resolved');
                console.log("Cập nhật trạng thái trả về:", updateStatusResponse);

                if (updateStatusResponse?.code === 200) {
                    message.success("Phản hồi thành công, email đã được gửi và trạng thái đã được cập nhật!");

                    // Cập nhật lại state `support` để tránh phải reload trang
                    setSupports((prevSupports) =>
                        prevSupports.map((support) =>
                            support.id === supportId
                                ? { ...support, status: 'resolved' } // Cập nhật trạng thái của yêu cầu hỗ trợ cụ thể
                                : support
                        )
                    );

                    handleCloseModal();
                } else {
                    message.error("Cập nhật trạng thái thất bại!");
                }
            } else {
                message.error("Phản hồi thất bại!");
            }
        } catch (error) {
            console.error("Lỗi khi phản hồi:", error?.response?.data || error.message);
            message.error("Phản hồi thất bại!");
        }
    };


    const columns = [
        {
            title: "Tên khách hàng",
            key: "customerName",
            render: (_, record) => record.username || record.name || "Chưa có"
        },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Tiêu đề", dataIndex: "subject", key: "subject" },
        { title: "Nội dung", dataIndex: "message", key: "message" },
        {
            title: "Ngày gửi",
            dataIndex: "createdAt",
            key: "createdAt",
            render: (value) => value ? dayjs(value).format("DD/MM/YYYY HH:mm") : "-"
        },
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
                    <Tag color={statusColors[status?.toLowerCase()] || "default"}>
                        {status?.toUpperCase()}
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
            <Table
                dataSource={supports}
                columns={columns}
                pagination={{ pageSize: ITEM_PER_PAGE }}
                rowKey="id"
            />

            {/* Modal gửi thư */}
            <Modal
                title="GỬI THƯ PHẢN HỒI KHÁCH HÀNG"
                open={modalVisible}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="send" type="primary" onClick={handleSubmit} icon={<MailOutlined />}>
                        Gửi
                    </Button>,
                    <Button key="close" onClick={handleCloseModal}>
                        Đóng
                    </Button>,
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
