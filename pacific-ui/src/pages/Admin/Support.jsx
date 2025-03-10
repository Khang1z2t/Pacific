import React, { useState, useEffect } from "react";
import { Table, Button, Typography, Space, Input, Modal, Form, message } from "antd";
import { SearchOutlined, InfoOutlined, MailOutlined } from '@ant-design/icons';
import dayjs from "dayjs";

const { Title } = Typography;

const Support = () => {
    const [support, setSupport] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [form] = Form.useForm();
    const [searchName, setSearchName] = useState("");
    const [searchEmail, setSearchEmail] = useState("");
    const [infoModalVisible, setInfoModalVisible] = useState(false);
    const [selectedSupport, setSelectedSupport] = useState(null);


    useEffect(() => {
        fetchSupport();
    }, []);

    const fetchSupport = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:3000/api/support");
            const data = await response.json();
            setSupport(data);
        } catch (error) {
            console.error("Error fetching support:", error);
        }
        setLoading(false);
    };

    const filteredSupport = support.filter((item) =>
        item.name.toLowerCase().includes(searchName.toLowerCase()) ||
        item.email.toLowerCase().includes(searchName.toLowerCase())
    );

    const handleInfo = (record) => {
        setSelectedSupport(record);
        setInfoModalVisible(true);
    };

    // Xử lý mở modal gửi email phản hồi
    const handleReply = (record) => {
        setSelectedSupport(record);
        setModalVisible(true);
    };

    // Xử lý gửi email
    const handleSendEmail = async (values) => {
        try {
            await fetch("http://localhost:3000/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    to: selectedSupport.email,
                    subject: values.subject,
                    message: values.message,
                }),
            });
            message.success("Gửi email thành công!");
            setModalVisible(false);
            form.resetFields();
        } catch (error) {
            console.error("Lỗi khi gửi email:", error);
            message.error("Gửi email thất bại!");
        }
    };

    const columns = [
        { title: "Họ & tên", dataIndex: "name", key: "name" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "Nội dung", dataIndex: "content", key: "content" },
        { title: "Ngày gửi", dataIndex: "date", key: "date", render: (text) => dayjs(text).format("DD/MM/YYYY") },
        {
            title: "Thao tác",
            key: "actions",
            render: (_, record) => (
                <Space>
                    <Button icon={<InfoOutlined />} onClick={() => handleInfo(record)} />
                    <Button icon={<MailOutlined />} type="primary" onClick={() => handleReply(record)}>Phản hồi</Button>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
            <Title level={2}>DANH SÁCH KHÁCH HÀNG CẦN TƯ VẤN</Title>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Tìm theo họ tên hoặc email..."
                    prefix={<SearchOutlined />}
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    style={{ width: 300 }}
                />
            </Space>

            <Table columns={columns} dataSource={filteredSupport} loading={loading} rowKey="email" />

            {/* Modal Gửi Email */}
            <Modal
                title="Gửi Email Phản Hồi"
                open={modalVisible}
                onOk={() => form.submit()}
                onCancel={() => setModalVisible(false)}
                footer={[
                    <Button key="cancel" onClick={() => setModalVisible(false)}>Hủy</Button>,
                    <Button key="submit" type="primary" onClick={() => form.submit()}>Gửi</Button>
                ]}
            >
                <Form form={form} layout="vertical" onFinish={handleSendEmail}>
                    <Form.Item label="Người nhận">
                        <Input value={selectedSupport ? selectedSupport.email : ""} disabled />
                    </Form.Item>
                    <Form.Item label="Họ và tên">
                        <Input value={selectedSupport ? selectedSupport.name : ""} disabled />
                    </Form.Item>
                    <Form.Item label="Ngày gửi">
                        <Input value={selectedSupport ? dayjs(selectedSupport.date).format("DD/MM/YYYY") : ""} disabled />
                    </Form.Item>
                    <Form.Item label="Nội dung">
                        <Input.TextArea value={selectedSupport ? selectedSupport.content : ""} disabled />
                    </Form.Item>
                </Form>
            </Modal>

            {/* Modal Info */}
            <Modal
                title="Thông Tin Chi Tiết"
                open={infoModalVisible}
                onCancel={() => setInfoModalVisible(false)}
                footer={[<Button key="close" onClick={() => setInfoModalVisible(false)}>Đóng</Button>]}>
                {selectedSupport && (
                    <Form layout="vertical">
                        <Form.Item label="Họ và tên">
                            <Input value={selectedSupport.name} disabled />
                        </Form.Item>
                        <Form.Item label="Email">
                            <Input value={selectedSupport.email} disabled />
                        </Form.Item>
                        <Form.Item label="Ngày gửi">
                            <Input value={dayjs(selectedSupport.date).format("DD/MM/YYYY")} disabled />
                        </Form.Item>
                        <Form.Item label="Nội dung">
                            <Input.TextArea value={selectedSupport.content} disabled />
                        </Form.Item>
                    </Form>
                )}
            </Modal>

        </div>
    );
};

export default Support;
