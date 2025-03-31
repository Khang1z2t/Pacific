import React, { useEffect, useState } from "react";
import { Table, Tag, message } from "antd";
import BookingServices from "~/services/BookingServices";
import BookingCard from "~/pages/Admin/components/BookingCard";
// Booking.jsx
import React, { useState } from 'react';
import { Button, Card, Input, Space, Table, Tag, Typography } from 'antd';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Booking = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedBooking, setSelectedBooking] = useState(null);

    const fetchBookings = async () => {
        setLoading(true);
        try {
            const data = await BookingServices.getBookings();
            setBookings(Array.isArray(data) ? data : []);
        } catch (error) {
            message.error("Không thể tải danh sách booking.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const openModal = (booking) => {
        setSelectedBooking(booking);
        setModalVisible(true);
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Tên người dùng", dataIndex: "name", key: "name" },
        { title: "Booking ID", dataIndex: "bookingId", key: "bookingId" },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "Đã xác nhận" ? "green" : "volcano"}>
                    {status.toUpperCase()}
                </Tag>
            ),
        },
        {
            title: "Chi tiết",
            key: "actions",
            render: (_, record) => (
                <a onClick={() => openModal(record)}>Xem chi tiết</a>
            ),
        },
    ];

    return (
        <div>
            <h2>Danh sách Booking</h2>
            <Table
                columns={columns}
                dataSource={bookings}
                loading={loading}
                rowKey="id"
            />
            {selectedBooking && (
                <BookingCard
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    booking={selectedBooking}
                />
            )}
        </div>
    );
};

export default Booking;
