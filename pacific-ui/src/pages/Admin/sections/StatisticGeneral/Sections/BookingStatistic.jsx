import React, { useState } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    LineChart,
    Line,
} from 'recharts';
import { Card, Row, Col, Statistic, Button, Tabs, Badge } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';

// Dữ liệu mẫu
const bookingStatusData = [
    { name: 'Đã xác nhận', value: 400 },
    { name: 'Đang chờ', value: 300 },
    { name: 'Đã hủy', value: 200 },
    { name: 'Hoàn thành', value: 100 },
];

const paymentStatusData = [
    { name: 'Đã thanh toán', value: 600 },
    { name: 'Chưa thanh toán', value: 300 },
    { name: 'Hoàn tiền', value: 100 },
];

const monthlyData = [
    { name: 'Tháng 1', bookings: 240, revenue: 2400 },
    { name: 'Tháng 2', bookings: 139, revenue: 2210 },
    { name: 'Tháng 3', bookings: 980, revenue: 2290 },
    { name: 'Tháng 4', bookings: 390, revenue: 2000 },
    { name: 'Tháng 5', bookings: 480, revenue: 2181 },
];

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export const BookingStatistic = () => {
    const [years, setYears] = useState({ years: 2023 });


    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans">
            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Thống kê Booking</h1>
                <div className="space-x-2">
                    <Button type="primary" className="bg-indigo-600 hover:bg-indigo-700">
                        Xuất báo cáo
                    </Button>
                    <Button>Refresh</Button>
                </div>
            </div>

            {/* Statistic Cards */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card className="shadow-md hover:shadow-lg transition-shadow border-none">
                        <Statistic
                            title="Tổng Booking"
                            value={1128}
                            prefix={<CalendarOutlined />}
                            valueStyle={{ color: '#6366f1' }}
                        />
                        <p className="text-sm text-gray-500 mt-1">+12% so với tháng trước</p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card className="shadow-md hover:shadow-lg transition-shadow border-none">
                        <Statistic
                            title="Doanh thu"
                            value={24500000}
                            prefix="VNĐ"
                            valueStyle={{ color: '#14b8a6' }}
                        />
                        <p className="text-sm text-gray-500 mt-1">+8% so với tuần trước</p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card className="shadow-md hover:shadow-lg transition-shadow border-none">
                        <Statistic
                            title="Khách mới"
                            value={245}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#ec4899' }}
                        />
                        <p className="text-sm text-gray-500 mt-1">+15 hôm nay</p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card className="shadow-md hover:shadow-lg transition-shadow border-none">
                        <Statistic
                            title="Tỷ lệ hủy"
                            value={12.5}
                            suffix="%"
                            valueStyle={{ color: '#f97316' }}
                        />
                        <p className="text-sm text-gray-500 mt-1">-2% so với tuần trước</p>
                    </Card>
                </Col>
            </Row>

            {/* Charts Section */}
            <Row gutter={[16, 16]} className="mt-6">
                {/* PieChart Trạng thái Booking */}
                <Col xs={24} md={12} lg={8}>
                    <Card
                        title={<span className="text-lg font-semibold">Trạng thái Booking</span>}
                        className="shadow-md border-none"
                        extra={<Badge count="Live" style={{ backgroundColor: '#52c41a' }} />}
                    >
                        <PieChart width={300} height={300} className="mx-auto">
                            <Pie
                                data={bookingStatusData}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {bookingStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Card>
                </Col>

                {/* PieChart Trạng thái Thanh toán */}
                <Col xs={24} md={12} lg={8}>
                    <Card
                        title={<span className="text-lg font-semibold">Trạng thái Thanh toán</span>}
                        className="shadow-md border-none"
                    >
                        <PieChart width={300} height={300} className="mx-auto">
                            <Pie
                                data={paymentStatusData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                                label
                            >
                                {paymentStatusData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Card>
                </Col>

                {/* BarChart Booking theo tháng */}
                <Col xs={24} lg={8}>
                    <Card
                        title={<span className="text-lg font-semibold">Booking theo tháng</span>}
                        className="shadow-md border-none"
                    >
                        <BarChart width={300} height={300} data={monthlyData} className="mx-auto">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="bookings" fill="#6366f1" barSize={30} />
                        </BarChart>
                    </Card>
                </Col>
            </Row>

            {/* LineChart Doanh thu */}
            <Row gutter={[16, 16]} className="mt-6">
                <Col xs={24}>
                    <Card
                        title={<span className="text-lg font-semibold">Doanh thu theo tháng</span>}
                        className="shadow-md border-none">
                        <LineChart width={1100} height={300} data={monthlyData} className="mx-auto">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} />
                        </LineChart>
                    </Card>
                </Col>
            </Row>

            {/* Tabs cho dữ liệu chi tiết */}
            <Row gutter={[16, 16]} className="mt-6">
                <Col xs={24}>
                    <Card className="shadow-md border-none">
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="Chi tiết Booking" key="1">
                                <p className="text-gray-600">Dữ liệu chi tiết về các booking sẽ hiển thị ở đây
                                    (bảng
                                    hoặc danh sách).</p>
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="Khách hàng" key="2">
                                <p className="text-gray-600">Thông tin khách hàng chi tiết.</p>
                            </Tabs.TabPane>
                        </Tabs>
                    </Card>
                </Col>
            </Row>
        </div>
    );
};

export default BookingStatistic;