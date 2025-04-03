import React, { useEffect, useState } from 'react';
import { Card, DatePicker, Table, Tabs } from 'antd';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import AdminServices from '~/services/AdminServices';
import moment from 'moment';
import config from '~/config';

const { RangePicker } = DatePicker;

// Bảng doanh số


// Bảng lượt truy cập
const visitRanking = [
    { key: '1', rank: 1, name: '工专路 0 号店', value: '45,678' },
    { key: '2', rank: 2, name: '工专路 1 号店', value: '42,987' },
    { key: '3', rank: 3, name: '工专路 2 号店', value: '39,654' },
    { key: '4', rank: 4, name: '工专路 3 号店', value: '35,234' },
    { key: '5', rank: 5, name: '工专路 4 号店', value: '30,876' },
];

// Cấu trúc cột cho bảng
export const StatisticSection = () => {
    const [activeTab, setActiveTab] = useState('1');
    const [data, setData] = useState([]);
    const [tourId, setTourId] = useState(null);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [salesRanking, setSalesRanking] = useState([{
        key: '',
        rank: null,
        name: '',
        value: '',
    }]);

    const [dataByYears, setDataByYears] = useState([]);
    const [dataMonths, setDataMonths] = useState([]);

    const [years, setYears] = useState({ years: new Date().getFullYear() });

    useEffect(() => {
        AdminServices.getBookingRevenue({ tourId: tourId, startDate: startDate, endDate: endDate }).then((res) => {
            setData(res);
        }).catch((error) => {
            console.error(error);
        });
    }, [startDate,endDate]);
    // BAO CAO NAM
    useEffect(() => {
        AdminServices.getBookingRevenuesByYear().then((res) => {
            setDataByYears(res);
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    // BAO CAO THANG THEO NAM
    useEffect(() => {
        AdminServices.getBookingRevenueMonthByYear(years).then((res) => {
            const allMonths = Array.from({ length: 12 }, (_, index) => ({
                bookingDate: `${index + 1}`,
                totalRevenue: 0,
            }));

            // Map dữ liệu API vào danh sách 12 tháng
            res.forEach(item => {
                const monthIndex = parseInt(item.bookingDate, 10) - 1;
                if (monthIndex >= 0 && monthIndex < 12) {
                    allMonths[monthIndex].totalRevenue = item.totalRevenue;
                }
            });

            setDataMonths(allMonths);
        }).catch((err) => {
            console.error(err);
        });
    }, [years]);

    useEffect(() => {
        const datas = data.map((item, index) => {
            return {
                key: index,
                rank: index,
                name: item.tourTitle,
                value: config.webConfig.getCurrency(item.tourRevenue) || 'KHÔNG CÓ DỮ LIỆU',
            };
        });
        setSalesRanking(datas);
    }, [data]);
    const columns = [
        { title: 'Số thứ tự', dataIndex: 'rank', key: 'rank' },
        { title: 'Tên tour', dataIndex: 'name', key: 'name' },
        { title: 'Doanh thu', dataIndex: 'value', key: 'value' },
    ];
    // const salesRanking = [
    //     { key: "1", rank: 1, name: "工专路 0 号店", value: "323,234" },
    //     { key: "2", rank: 2, name: "工专路 1 号店", value: "312,432" },
    //     { key: "3", rank: 3, name: "工专路 2 号店", value: "290,876" },
    //     { key: "4", rank: 4, name: "工专路 3 号店", value: "250,567" },
    //     { key: "5", rank: 5, name: "工专路 4 号店", value: "200,321" },
    // ];

    return (
        <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
                <Tabs defaultActiveKey="1" onChange={setActiveTab}>
                    <Tabs.TabPane tab="Theo năm" key="1" />
                    <Tabs.TabPane tab="Theo tháng" key="2" />
                </Tabs>
                <div className="flex space-x-4">
                    {activeTab === '2' && (
                        [2023, 2024, 2025].map(year => (
                            <button
                                key={year}
                                className={`px-4 py-2 rounded ${years.years === year ? 'bg-orange-500 text-white' : 'bg-gray-200 transition-all hover:bg-orange-100 text-gray-500'}`}
                                onClick={() => setYears({ years: year })}
                            >
                                {year}
                            </button>
                        ))
                    )}
                    <RangePicker
                        format={'DD-MM-YYYY'}
                        onChange={(date, dateString) => {
                            if(!dateString[0] || !dateString[1]) {
                                setStartDate(null);
                                setEndDate(null);
                            }else {
                                const formattedStartDate = moment(dateString[0], 'DD-MM-YYYY').format('YYYY-MM-DD');
                                const formattedEndDate = moment(dateString[1], 'DD-MM-YYYY').format('YYYY-MM-DD');
                                setStartDate(formattedStartDate);
                                setEndDate(formattedEndDate);
                            }
                        }}
                    />
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {/* Biểu đồ cột */}
                <div className="col-span-2">
                    <ResponsiveContainer width="100%" height={300}>
                        {/*CHART*/}
                        <BarChart data={activeTab === '1' ? dataByYears : dataMonths}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="bookingDate" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="totalRevenue" fill={activeTab === '1' ? '#1890ff' : '#ff4d4f'} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Bảng dữ liệu */}
                <div>
                    <h3 className="mb-2 uppercase font-semibold">
                        {activeTab === '1' ? 'Danh sách tour được book nhiều nhất' : 'Danh sách tour được xem nhiều nhất'}
                    </h3>
                    <Table
                        className={'overflow-y-scroll max-h-60'}
                        columns={columns}
                        dataSource={activeTab === '1' ? salesRanking : visitRanking}
                        pagination={false}
                        size="small"
                    />
                </div>

            </div>
        </Card>
    );
};
