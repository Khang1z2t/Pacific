import React, { useState } from "react";
import { Typography, Card, Row, Col } from "antd";
import BookingCard from "../components/BookingCard";

const { Title } = Typography;

const Booking = () => {
    const [bookings, setBookings] = useState([
        { id: 1, name: "Nguyễn Văn A", tour: "Tour Đà Nẵng", date: "2024-07-30", status: "Đã xác nhận", details: "Tour Đà Nẵng 3 ngày 2 đêm, bao gồm vé máy bay, khách sạn 4 sao, và tham quan Bà Nà Hills." },
        { id: 2, name: "Trần Thị B", tour: "Tour Nha Trang", date: "2024-08-10", status: "Chờ xác nhận", details: "Tour Nha Trang 4 ngày 3 đêm, trải nghiệm Vinpearl Land, đảo Hòn Mun, và bãi biển đẹp nhất." },
        { id: 3, name: "Lê Văn C", tour: "Tour Phú Quốc", date: "2024-09-05", status: "Đã xác nhận", details: "Tour Phú Quốc 5 ngày 4 đêm, nghỉ dưỡng tại resort 5 sao, khám phá Bãi Sao và làng chài Hàm Ninh." },
    ]);

    const handleDelete = (id) => {
        setBookings(bookings.filter((b) => b.id !== id));
    };

    return (
        <div className="container">
            <Card className="booking-container">
                <Title level={2} className="booking-title">Quản lý Đặt Tour</Title>
                <Row gutter={[16, 16]}>
                    {bookings.map((booking) => (
                        <Col xs={24} sm={12} md={8} key={booking.id}>
                            <BookingCard booking={booking} onDelete={handleDelete} />
                        </Col>
                    ))}
                </Row>
            </Card>
        </div>
    );
};

export default Booking;
