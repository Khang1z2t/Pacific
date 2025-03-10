// Booking.jsx
import React, { useState } from "react";
import { Typography, Card, Table, Button, Input, Space, Tag } from "antd";
import { SearchOutlined, DeleteOutlined, EditOutlined, InfoCircleOutlined } from '@ant-design/icons';
import BookingCard from "../components/BookingCard";

const { Title } = Typography;

const Booking = () => {
    const [searchText, setSearchText] = useState("");
    const [bookings, setBookings] = useState([
        { id: 1, name: "Tí Ní", bookingId: "ID21", tour: "Hạ Long Bay", date: "2025/02/22", payment: "Tiền mặt", status: "Đã thanh toán", price: "9.000.000 đ", discount: 0 },
        { id: 2, name: "Tí Đẹp", bookingId: "ID26", tour: "Hạ Long Bay", date: "2025/02/22", payment: "Thanh toán online", status: "Đã thanh toán", price: "9.000.000 đ", discount: 0 },
    ]);

    const handleDelete = (id) => {
        setBookings(bookings.filter((b) => b.id !== id));
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Tên người dùng", dataIndex: "name", key: "name" },
        { title: "Booking ID", dataIndex: "bookingId", key: "bookingId" },
        { title: "Tên Tour", dataIndex: "tour", key: "tour" },
        { title: "Ngày khởi hành", dataIndex: "date", key: "date" },
        { title: "PTTT", dataIndex: "payment", key: "payment" },
        { title: "Trạng thái", dataIndex: "status", key: "status", render: (status) => (
                <Tag color={status === "Đã thanh toán" ? "green" : "red"}>{status}</Tag>
            )},
        { title: "Giá tour", dataIndex: "price", key: "price" },
        { title: "Giảm giá", dataIndex: "discount", key: "discount" },
        { title: "Thao tác", key: "action", render: (_, record) => (
                <Space>
                    <Button icon={<InfoCircleOutlined />} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
                </Space>
            )},
    ];

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
                <Button> Sắp xếp theo </Button>
            </Space>
            <Card>
                <Table columns={columns} dataSource={bookings} rowKey="id" />
            </Card>
        </div>
    );
};

export default Booking;
