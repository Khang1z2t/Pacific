import React, { useState } from "react";
import { Card, Button, Space, Tag, Modal } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const BookingCard = ({ booking, onDelete }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getStatusTag = (status) => {
        switch (status) {
            case "Đã xác nhận":
                return <Tag color="green">Đã xác nhận</Tag>;
            case "Chờ xác nhận":
                return <Tag color="orange">Chờ xác nhận</Tag>;
            default:
                return <Tag color="blue">{status}</Tag>;
        }
    };

    return (
        <>
            <Card
                title={booking.name}
                bordered={false}
                className="booking-card"
                extra={getStatusTag(booking.status)}
            >
                <p>🗺️ <strong>Tour:</strong> {booking.tour}</p>
                <p>📅 <strong>Ngày:</strong> {booking.date}</p>

                <Space style={{ marginTop: "10px" }}>
                    <Button icon={<EyeOutlined />} type="primary" onClick={() => setIsModalVisible(true)}>
                        Xem
                    </Button>
                    <Button icon={<EditOutlined />} type="default">
                        Sửa
                    </Button>
                    <Button icon={<DeleteOutlined />} type="danger" onClick={() => onDelete(booking.id)}>
                        Xóa
                    </Button>
                </Space>
            </Card>

            {/* Popup Modal */}
            <Modal
                title={`Chi tiết đặt chỗ - ${booking.name}`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={700}
            >
                <p>🗺️ <strong>Tour:</strong> {booking.tour}</p>
                <p>📅 <strong>Ngày khởi hành:</strong> {booking.date}</p>
                <p>📌 <strong>Trạng thái:</strong> {getStatusTag(booking.status)}</p>
                <p>📜 <strong>Chi tiết:</strong> {booking.details}</p>
            </Modal>
        </>
    );
};

export default BookingCard;
