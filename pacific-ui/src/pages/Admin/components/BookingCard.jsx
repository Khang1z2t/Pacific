import React, { useState } from "react";
import { Card, Button, Space, Tag, Modal } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const BookingCard = ({ booking, onDelete }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);

    const getStatusTag = (status) => {
        return status === "confirmed" ? <Tag color="green">Đã xác nhận</Tag> : <Tag color="red">Đang chờ</Tag>;
    };

    return (
        <>
            <Card
                title={booking.user.fullName}
                bordered={false}
                className="booking-card"
                extra={getStatusTag(booking.bookingStatus)}
            >
                <p>🗺️ <strong>Tour:</strong> {booking.tourDetail.name}</p>
                <p>👨‍👩‍👧‍👦 <strong>Số lượng:</strong> {booking.totalNumber}</p>
                <p>💳 <strong>PTTT:</strong> {booking.paymentMethod}</p>
                <p>💰 <strong>Tổng tiền:</strong> {booking.totalAmount.toLocaleString()} đ</p>

                <Space style={{ marginTop: "10px" }}>
                    <Button icon={<EyeOutlined />} type="primary" onClick={() => setIsModalVisible(true)}>
                        Xem
                    </Button>
                    <Button icon={<DeleteOutlined />} type="danger" onClick={() => onDelete(booking.id)}>
                        Xóa
                    </Button>
                </Space>
            </Card>

            {/* Popup Modal Chi Tiết */}
            <Modal
                title={`Chi tiết Booking - ${booking.user.fullName}`}
                open={isModalVisible}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                width={700}
            >
                <p>🗺️ <strong>Tour:</strong> {booking.tourDetail.name}</p>
                <p>👨‍👩‍👧‍👦 <strong>Số lượng:</strong> {booking.totalNumber}</p>
                <p>📌 <strong>Trạng thái:</strong> {getStatusTag(booking.bookingStatus)}</p>
                <p>💳 <strong>Phương thức thanh toán:</strong> {booking.paymentMethod}</p>
                <p>💰 <strong>Tổng tiền:</strong> {booking.totalAmount.toLocaleString()} đ</p>
            </Modal>
        </>
    );
};

export default BookingCard;
