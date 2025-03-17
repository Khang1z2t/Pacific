import React, { useState, useEffect } from "react";
import { Typography, Card, Table, Button, Input, Space, Tag, message } from "antd";
import { SearchOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import axios from "axios";
import BookingCard from "../components/BookingCard";

const { Title } = Typography;

const Booking = () => {
    const [searchText, setSearchText] = useState("");
    const [bookings, setBookings] = useState([]);

    // Gọi API lấy danh sách bookings
    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/bookings"); // Thay URL bằng API backend
            setBookings(response.data);
        } catch (error) {
            message.error("Không thể lấy dữ liệu bookings");
            console.error(error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/bookings/${id}`);
            setBookings(bookings.filter((b) => b.id !== id));
            message.success("Xóa thành công!");
        } catch (error) {
            message.error("Xóa không thành công!");
            console.error(error);
        }
    };

    return (
        <div className="container">
            <Title level={2}>QUẢN LÝ BOOKING</Title>
            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Tìm kiếm"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button onClick={fetchBookings}>Làm mới</Button>
            </Space>
            <Card>
                {bookings.map((booking) => (
                    <BookingCard key={booking.id} booking={booking} onDelete={handleDelete} />
                ))}
            </Card>
        </div>
    );
};

export default Booking;
