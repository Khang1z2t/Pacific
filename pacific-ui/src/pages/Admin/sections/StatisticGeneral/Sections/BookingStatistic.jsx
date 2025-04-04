import React, { useState, useEffect } from 'react';
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    Legend,
    CartesianGrid,
    XAxis,
    YAxis, BarChart, Bar,
} from 'recharts';
import { Card, Row, Col, Statistic, Button, Tabs, Badge, Select, Empty, DatePicker, Input, InputNumber } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined, CalendarOutlined, UserOutlined } from '@ant-design/icons';
import AdminServices from '~/services/AdminServices';
import moment from 'moment';

const { Option } = Select;
const { RangePicker } = DatePicker;

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];

export const BookingStatistic = () => {
    const [years, setYears] = useState({ years: 2023 });
    const [bookingStatusData, setBookingStatusData] = useState([]);
    const [revenueData, setRevenueData] = useState(null);
    const [ratingData, setRatingData] = useState([]); // Dữ liệu cho PieChart Review
    const [detailedRatingData, setDetailedRatingData] = useState([]); // Dữ liệu cho PieChart DetailReview
    const [period, setPeriod] = useState('week');
    const [loading, setLoading] = useState(false);
    const [monthlyData, setMonthlyData] = useState([]);
    const [topBookedTours, setTopBookedTours] = useState([]);
    const [selectedRatingType, setSelectedRatingType] = useState('Accommodation');
    const [dateRange, setDateRange] = useState([moment('2023-01-01'), moment('2025-12-31')]);
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        fetchData();
    }, [period,limit,dateRange]);

    const fetchData = () => {
        setLoading(true);
        const params = { period }; // Có thể thêm startDate và endDate nếu dùng khoảng thời gian tùy chỉnh
        const dateParams = {
            startDate: dateRange[0].format('YYYY-MM-DD'),
            endDate: dateRange[1].format('YYYY-MM-DD'),
            limit: limit,
        };
        Promise.all([
            AdminServices.getBookingStatusStats(),
            AdminServices.getRevenueStats({ period }),
            AdminServices.getReviewStats(params), // Gọi API cho PieChart Review
            AdminServices.getDetailReviewStats(params), // Gọi API cho PieChart DetailReview
            AdminServices.getTopBookedTours(dateParams),
        ])
            .then(([statusRes, revenueRes, ratingRes, detailedRatingRes, topBookedRes]) => {
                const statusData = statusRes.data.map((item) => ({
                    name: item.status,
                    value: item.count,
                    percent: item.percentage,
                }));
                setBookingStatusData(statusData);
                setRevenueData(revenueRes.data);
                setRatingData(ratingRes.data); // Lưu dữ liệu rating tổng quan
                setDetailedRatingData(detailedRatingRes.data); // Lưu dữ liệu rating chi tiết
                setTopBookedTours(topBookedRes.data);
            })
            .catch((err) => {
                console.error('Error fetching data:', err);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handlePeriodChange = (value) => {
        setPeriod(value);
    };

    const getComparisonLabel = (type) => {
        switch (type) {
            case 'newCustomer':
                return period === 'week' ? 'hôm nay' : period === 'month' ? 'hôm nay' : 'hôm nay';
            default:
                return period === 'week' ? 'tuần trước' : period === 'month' ? 'tháng trước' : 'năm trước';
        }
    };

    return (
        <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans">
            {/* Header */}
            <div className="mb-6 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Thống kê Booking</h1>
                <div className="space-x-2">
                    <Select
                        defaultValue="week"
                        style={{ width: 120 }}
                        onChange={handlePeriodChange}
                        loading={loading}
                    >
                        <Option value="week">Tuần</Option>
                        <Option value="month">Tháng</Option>
                        <Option value="year">Năm</Option>
                    </Select>
                    <RangePicker
                        format={'DD-MM-YYYY'}
                        defaultValue={dateRange}
                        onChange={(dates) => setDateRange(dates)}
                    />
                    <InputNumber
                        min={1}
                        onChange={(value) => setLimit(value)}
                        />
                    <Button type="primary" className="bg-indigo-600 hover:bg-indigo-700">
                        Xuất báo cáo
                    </Button>
                    <Button onClick={fetchData} loading={loading}>
                        Refresh
                    </Button>
                </div>
            </div>

            {/* Statistic Cards */}
            <Row gutter={[16, 16]}>
                <Col xs={24} sm={12} md={6}>
                    <Card className="shadow-md hover:shadow-lg transition-shadow border-none">
                        <Statistic
                            title="Tổng Booking"
                            value={revenueData?.totalBookings || 0}
                            prefix={<CalendarOutlined />}
                            valueStyle={{ color: '#6366f1' }}
                            loading={loading}
                        />
                        <p className="text-sm mt-1">
                            <span
                                style={{
                                    color: revenueData?.bookingGrowthPercentage >= 0 ? '#52c41a' : '#f5222d',
                                }}
                            >
                                {revenueData?.bookingGrowthPercentage >= 0 ? (
                                    <ArrowUpOutlined />
                                ) : (
                                    <ArrowDownOutlined />
                                )}{' '}
                                {Math.abs(revenueData?.bookingGrowthPercentage || 0)}% so với{' '}
                                {getComparisonLabel('booking')}
                            </span>
                        </p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card className="shadow-md hover:shadow-lg transition-shadow border-none">
                        <Statistic
                            title="Doanh thu"
                            value={revenueData?.totalRevenue || 0}
                            prefix="VNĐ"
                            valueStyle={{ color: '#14b8a6' }}
                            loading={loading}
                        />
                        <p className="text-sm mt-1">
                            <span
                                style={{
                                    color: revenueData?.revenueGrowthPercentage >= 0 ? '#52c41a' : '#f5222d',
                                }}
                            >
                                {revenueData?.revenueGrowthPercentage >= 0 ? (
                                    <ArrowUpOutlined />
                                ) : (
                                    <ArrowDownOutlined />
                                )}{' '}
                                {Math.abs(revenueData?.revenueGrowthPercentage || 0)}% so với{' '}
                                {getComparisonLabel('revenue')}
                            </span>
                        </p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card className="shadow-md hover:shadow-lg transition-shadow border-none">
                        <Statistic
                            title="Khách mới"
                            value={revenueData?.newCustomers || 0}
                            prefix={<UserOutlined />}
                            valueStyle={{ color: '#ec4899' }}
                            loading={loading}
                        />
                        <p className="text-sm mt-1">
                            <span
                                style={{
                                    color:
                                        revenueData?.newCustomerGrowthPercentage >= 0
                                            ? '#52c41a'
                                            : '#f5222d',
                                }}
                            >
                                {revenueData?.newCustomerGrowthPercentage >= 0 ? (
                                    <ArrowUpOutlined />
                                ) : (
                                    <ArrowDownOutlined />
                                )}{' '}
                                {Math.abs(revenueData?.newCustomerGrowthPercentage || 0)}%{' '}
                                {getComparisonLabel('newCustomer')}
                            </span>
                        </p>
                    </Card>
                </Col>
                <Col xs={24} sm={12} md={6}>
                    <Card className="shadow-md hover:shadow-lg transition-shadow border-none">
                        <Statistic
                            title="Tỷ lệ hủy"
                            value={revenueData?.cancellationRate || 0}
                            suffix="%"
                            valueStyle={{ color: '#f97316' }}
                            loading={loading}
                        />
                        <p className="text-sm mt-1">
                            <span
                                style={{
                                    color:
                                        revenueData?.cancellationRateGrowthPercentage >= 0
                                            ? '#f5222d'
                                            : '#52c41a',
                                }}
                            >
                                {revenueData?.cancellationRateGrowthPercentage >= 0 ? (
                                    <ArrowUpOutlined />
                                ) : (
                                    <ArrowDownOutlined />
                                )}{' '}
                                {Math.abs(revenueData?.cancellationRateGrowthPercentage || 0)}% so với{' '}
                                {getComparisonLabel('cancellation')}
                            </span>
                        </p>
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

                {/* PieChart Review (Phân bố rating tổng quan) */}
                <Col xs={24} md={12} lg={8}>
                    <Card
                        title={<span className="text-lg font-semibold">Phân bố Đánh giá Tổng quan</span>}
                        className="shadow-md border-none"
                    >
                        <PieChart width={300} height={300} className="mx-auto">
                            <Pie
                                data={ratingData.map(item => ({
                                    name: `${item.ratingLevel} sao`,
                                    value: item.count,
                                }))}
                                cx="50%"
                                cy="50%"
                                outerRadius={100}
                                fill="#8884d8"
                                dataKey="value"
                            >
                                {ratingData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </Card>
                </Col>

                {/* PieChart DetailReview (Chọn một loại rating chi tiết để hiển thị, ví dụ: Accommodation) */}
                <Col xs={24} md={12} lg={8}>
                    <Card
                        title={<span className="text-lg font-semibold">Phân bố Đánh giá Chỗ ở</span>}
                        className="shadow-md border-none"
                    >
                        <Select
                            defaultValue="Accommodation"
                            style={{ width: 200, marginBottom: 16 }}
                            onChange={(value) => setSelectedRatingType(value)}
                        >
                            {detailedRatingData.map((item) => (
                                <Option key={item.ratingType} value={item.ratingType}>
                                    {item.ratingType}
                                </Option>
                            ))}
                        </Select>
                        {detailedRatingData ? (
                            <Empty
                                image={'/img/a.gif'}
                                imageStyle={{
                                    height: 120,
                                    width: 120,
                                    alignSelf: 'center',
                                    margin: '0 auto',
                                }}
                                description="Không có dữ liệu"
                                className="mx-auto"
                                />
                        ) : (
                            <PieChart width={300} height={300} className="mx-auto">
                                <Pie
                                    data={
                                        detailedRatingData
                                            .find(item => item.ratingType === selectedRatingType)
                                            ?.levels.map(level => ({
                                            name: `${level.ratingLevel} sao`,
                                            value: level.count,
                                        })) || []
                                    }
                                    cx="50%"
                                    cy="50%"
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                >
                                    {detailedRatingData
                                        .find(item => item.ratingType === selectedRatingType)
                                        ?.levels.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>                        )}
                    </Card>
                </Col> </Row>

            <Row gutter={[16, 16]} className="mt-6">
                <Col xs={24}>
                    <Card
                        title={<span className="text-lg font-semibold">Top Tour Được Booking Nhiều Nhất</span>}
                        className="shadow-md border-none"
                    >
                        <BarChart width={1100} height={300} data={topBookedTours} className="mx-auto">
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="tourTitle" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="bookingCount" fill="#8b5cf6" barSize={30} />
                        </BarChart>
                    </Card>
                </Col>
            </Row>

            {/* Tabs cho dữ liệu chi tiết */}
            <Row gutter={[16, 16]} className="mt-6">
                <Col xs={24}>
                    <Card className="shadow-md border-none">
                        <Tabs defaultActiveKey="1">
                            <Tabs.TabPane tab="Chi tiết Booking" key="1">
                                <p className="text-gray-600">
                                    Dữ liệu chi tiết về các booking sẽ hiển thị ở đây (bảng hoặc danh sách).
                                </p>
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