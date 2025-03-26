import React, { useState } from 'react';
import { Button, Card, Modal, Space, Tag } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';

const BookingCard = ({ booking, onEdit, onDelete }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getStatusTag = (status) => {
        return status === "Đã thanh toán" ? <Tag color="green">Đã thanh toán</Tag> : <Tag color="red">Chưa thanh toán</Tag>;
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
                <p>💳 <strong>PTTT:</strong> {booking.method}</p>
                <p>💰 <strong>Giá:</strong> {booking.price.toLocaleString()} đ</p>

                <Space style={{ marginTop: "10px" }}>
                    <Button icon={<EyeOutlined />} type="primary" onClick={() => setIsModalVisible(true)}>
                        Xem
                    </Button>
                    <Button icon={<EditOutlined />} type="default" onClick={() => onEdit(booking)}>
                        Sửa
                    </Button>
                    <Button icon={<DeleteOutlined />} type="danger" onClick={() => onDelete(booking.id)}>
                        Xóa
                    </Button>
                </Space>
            </Card>

            {/* Popup Modal Chi Tiết */}
            <Modal
                title={`Chi tiết Booking - ${booking.name}`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={700}
            >
                <p>🗺️ <strong>Tour:</strong> {booking.tour}</p>
                <p>📅 <strong>Ngày khởi hành:</strong> {booking.date}</p>
                <p>📌 <strong>Trạng thái:</strong> {getStatusTag(booking.status)}</p>
                <p>💳 <strong>Phương thức thanh toán:</strong> {booking.method}</p>
                <p>💰 <strong>Giá tour:</strong> {booking.price.toLocaleString()} đ</p>
            </Modal>
        </>
    );
};

export default BookingCard;
