import React, { useCallback, useEffect, useState } from 'react';
import { Card, DatePicker, Table, Tabs } from 'antd';
import { BarChart, Bar, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import AdminServices from '~/services/AdminServices';
import moment from 'moment';
import config from '~/config';

const { RangePicker } = DatePicker;

export const StatisticSection = () => {
    const [activeChartTab, setActiveChartTab] = useState('year');
    const [activeTableTab, setActiveTableTab] = useState('revenue');
    const [salesRanking, setSalesRanking] = useState([]);
    const [topBooked, setTopBooked] = useState([]);
    const [dataByYears, setDataByYears] = useState([]);
    const [dataMonths, setDataMonths] = useState([]);
    const [years, setYears] = useState({ years: new Date().getFullYear() });
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    // Hàm gọi API với useCallback
    const fetchBookingRevenue = useCallback(async () => {
        try {
            const res = await AdminServices.getBookingRevenue({
                tourId: null,
                startDate: startDate || `${years.years}-01-01`,
                endDate: endDate || `${years.years}-12-31`,
            });
            const ranking = res
                .reduce((acc, item) => {
                    const existing = acc.find((x) => x.tourId === item.tourId);
                    if (existing) {
                        existing.tourRevenue = Number(existing.tourRevenue) + Number(item.tourRevenue);
                    } else {
                        acc.push({
                            tourId: item.tourId,
                            tourTitle: item.tourTitle,
                            tourRevenue: Number(item.tourRevenue),
                        });
                    }
                    return acc;
                }, [])
                .sort((a, b) => b.tourRevenue - a.tourRevenue)
                .map((item, index) => ({
                    key: item.tourId,
                    rank: index + 1,
                    name: item.tourTitle,
                    value: config.webConfig.getCurrency(item.tourRevenue),
                }));
            setSalesRanking(ranking);
        } catch (error) {
            console.error('Error fetching booking revenue:', error);
            setSalesRanking([]);
        }
    }, [startDate, endDate, years.years]);

    const fetchTopBookedTours = useCallback(async () => {
        try {
            const res = await AdminServices.getTopBookedTours({
                limit: 5,
                startDate: startDate || `${years.years}-01-01`,
                endDate: endDate || `${years.years}-12-31`,
            });
            const booked = res.data.map((item, index) => ({
                key: item.tourId,
                rank: index + 1,
                name: item.tourTitle,
                value: item.bookingCount,
            }));
            setTopBooked(booked);
        } catch (error) {
            console.error('Error fetching top booked tours:', error);
            setTopBooked([]);
        }
    }, [startDate, endDate, years.years]);

    const fetchYearlyRevenues = useCallback(async () => {
        try {
            const res = await AdminServices.getBookingRevenuesByYear();
            setDataByYears(
                res.map((item) => ({
                    bookingDate: item.bookingYear || item.bookingDate,
                    totalRevenue: Number(item.totalRevenue) || 0,
                })),
            );
        } catch (error) {
            console.error('Error fetching yearly revenues:', error);
            setDataByYears([]);
        }
    }, []);

    const fetchMonthlyRevenues = useCallback(async () => {
        try {
            const res = await AdminServices.getBookingRevenueMonthByYear(years);
            const allMonths = Array.from({ length: 12 }, (_, index) => ({
                bookingDate: `${index + 1}`,
                totalRevenue: 0,
            }));
            res.forEach((item) => {
                const monthIndex = parseInt(item.bookingDate, 10) - 1;
                if (monthIndex >= 0 && monthIndex < 12) {
                    allMonths[monthIndex].totalRevenue = Number(item.totalRevenue) || 0;
                }
            });
            setDataMonths(allMonths);
        } catch (error) {
            console.error('Error fetching monthly revenues:', error);
            setDataMonths(
                Array.from({ length: 12 }, (_, index) => ({
                    bookingDate: `${index + 1}`,
                    totalRevenue: 0,
                })),
            );
        }
    }, [years]);

    // Gộp các API vào một useEffect với Promise.all
    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([
                    fetchBookingRevenue(),
                    fetchTopBookedTours(),
                    fetchYearlyRevenues(),
                    fetchMonthlyRevenues(),
                ]);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [fetchBookingRevenue, fetchTopBookedTours, fetchYearlyRevenues, fetchMonthlyRevenues]);

    // Cột cho bảng
    const salesColumns = [
        { title: 'Số thứ tự', dataIndex: 'rank', key: 'rank', width: 100 },
        { title: 'Tên tour', dataIndex: 'name', key: 'name' },
        { title: 'Doanh thu', dataIndex: 'value', key: 'value', width: 150 },
    ];

    const bookedColumns = [
        { title: 'Số thứ tự', dataIndex: 'rank', key: 'rank', width: 100 },
        { title: 'Tên tour', dataIndex: 'name', key: 'name' },
        { title: 'Số lượng đặt', dataIndex: 'value', key: 'value', width: 150 },
    ];

    // Hàm định dạng tiền tệ ngắn gọn cho trục Y
    const formatCurrency = (value) => {
        if (value >= 1000000000) {
            return `${(value / 1000000000).toFixed(0)} tỷ`;
        }
        if (value >= 1000000) {
            return `${(value / 1000000).toFixed(0)} triệu`;
        }
        return `${value.toLocaleString('vi-VN')} VNĐ`;
    };

    return (
        <Card
            className="shadow-lg hover:shadow-xl transition-shadow"
            style={{ borderRadius: '8px', background: '#fff', padding: '16px' }}
        >
            {/* Phần điều khiển */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                <Tabs
                    defaultActiveKey="year"
                    onChange={setActiveChartTab}
                    tabBarStyle={{ color: '#1F2937', fontWeight: 600, marginBottom: 0 }}
                >
                    <Tabs.TabPane tab="Theo năm" key="year" />
                    <Tabs.TabPane tab="Theo tháng" key="month" />
                </Tabs>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                    {activeChartTab === 'month' && (
                        <div className="flex gap-2">
                            {[2023, 2024, 2025].map((year) => (
                                <button
                                    key={year}
                                    className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                                        years.years === year
                                            ? 'bg-indigo-600 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-indigo-100'
                                    }`}
                                    onClick={() => setYears({ years: year })}
                                >
                                    {year}
                                </button>
                            ))}
                        </div>
                    )}
                    <RangePicker
                        format="DD-MM-YYYY"
                        onChange={(date, dateString) => {
                            if (!dateString[0] || !dateString[1]) {
                                setStartDate(null);
                                setEndDate(null);
                            } else {
                                const formattedStartDate = moment(dateString[0], 'DD-MM-YYYY').format('YYYY-MM-DD');
                                const formattedEndDate = moment(dateString[1], 'DD-MM-YYYY').format('YYYY-MM-DD');
                                setStartDate(formattedStartDate);
                                setEndDate(formattedEndDate);
                            }
                        }}
                        className="border-gray-300 rounded-md w-full sm:w-auto"
                        placeholder={['Từ ngày', 'Đến ngày']}
                    />
                </div>
            </div>

            {/* Biểu đồ cột */}
            <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                    {activeChartTab === 'year' ? 'Doanh thu theo năm' : `Doanh thu tháng - ${years.years}`}
                </h3>
                <ResponsiveContainer width="100%" height={320}>
                    <BarChart data={activeChartTab === 'year' ? dataByYears : dataMonths}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis
                            dataKey="bookingDate"
                            fontSize={12}
                            tickLine={false}
                            axisLine={{ stroke: '#D1D5DB' }}
                            tickFormatter={(value) =>
                                activeChartTab === 'month' ? `Tháng ${value}` : value
                            }
                        />
                        <YAxis
                            fontSize={12}
                            tickLine={false}
                            axisLine={{ stroke: '#D1D5DB' }}
                            domain={[0, 1000000]} // Max 1 tỷ VNĐ
                            tickFormatter={formatCurrency}
                            ticks={[0, 200000000, 400000000, 600000000, 800000000, 1000000000]} // Chia đều 0-1 tỷ
                        />
                        <Tooltip
                            formatter={(value) => [config.webConfig.getCurrency(value), 'Doanh thu']}
                            contentStyle={{
                                background: '#fff',
                                borderRadius: '4px',
                                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                                border: 'none',
                            }}
                            labelFormatter={(label) =>
                                activeChartTab === 'month' ? `Tháng ${label}` : `Năm ${label}`
                            }
                        />
                        <Bar
                            dataKey="totalRevenue"
                            fill={activeChartTab === 'year' ? '#6366F1' : '#F97316'}
                            radius={[4, 4, 0, 0]}
                            barSize={30}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>

            {/* Phần bảng */}
            <Tabs
                defaultActiveKey="revenue"
                onChange={setActiveTableTab}
                tabBarStyle={{ color: '#1F2937', fontWeight: 600, marginBottom: '16px' }}
            >
                <Tabs.TabPane tab="Top doanh thu" key="revenue" />
                <Tabs.TabPane tab="Top lượt đặt" key="booked" />
            </Tabs>
            <div className="grid grid-cols-1">
                <Table
                    columns={activeTableTab === 'revenue' ? salesColumns : bookedColumns}
                    dataSource={activeTableTab === 'revenue' ? salesRanking : topBooked}
                    pagination={false}
                    bordered
                    rowKey="key"
                    scroll={{ y: 240 }}
                    className="rounded-md shadow-sm"
                    locale={{ emptyText: 'Không có dữ liệu' }}
                />
            </div>
        </Card>
    );
};