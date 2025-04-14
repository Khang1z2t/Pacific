import { StatusCard } from '~/pages/Admin/components/StatusCard';
import { ChartCard } from '~/pages/Admin/components/ChartCard';
import { StatisticSection } from '~/pages/Admin/sections/HomePage/Sections/StatisticSection';
import { StatisticTourSection } from '~/pages/Admin/sections/HomePage/Sections/StatisticTourSection';
import { useEffect, useState } from 'react';
import AdminServices from '~/services/AdminServices';
import Orb from '~/component/Animation/Orb';
import { Card } from 'antd';

export const HomePage = () => {
    const [revenueData, setRevenueData] = useState({});
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        AdminServices.getBookingYearlyStats().then((res) => {
            setRevenueData({
                totalRevenue: res.data.totalRevenue,
                revenueChange: res.data.revenueChange,
                change: res.data.change,
            });
            setChartData(res.data.monthlyRevenues.map(item => ({
                name: `Tháng ${item.month}`,
                value: item.revenue,
            })));
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    // const chartData = [
    //     { name: 'Mon', value: 1200 },
    //     { name: 'Tue', value: 2100 },
    //     { name: 'Wed', value: 800 },
    //     { name: 'Thu', value: 1600 },
    //     { name: 'Fri', value: 2400 },
    //     { name: 'Sat', value: 1800 },
    //     { name: 'Sun', value: 2200 },
    // ];

    return (
        <div className={'space-y-4'}>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
                <StatusCard
                    title="Tổng doanh thu năm nay"
                    totalAmount={revenueData.totalRevenue || 0}
                    change={revenueData.change || { value: 0, type: 'neutral' }}
                />
                <ChartCard
                    title="Doanh thu theo tháng"
                    totalAmount={revenueData.totalRevenue || 0}
                    change={revenueData.change || { value: 0, type: 'neutral' }}
                    chartData={chartData}
                />
                <Card
                    className="w-full shadow-lg border border-gray-100 hover:shadow-xl transition-shadow"
                    style={{ borderRadius: '8px', background: '#fff' }}
                >
                    <Orb
                        hoverIntensity={0.5}
                        rotateOnHover={true}
                        hue={0}
                        forceHoverState={false}
                    />
                </Card>
            </div>
            {/*Thống kê doanh thu theo tháng/năm*/}
            <StatisticSection />
            {/*Số lượng được đặt như thế nào trong các tour*/}
            <StatisticTourSection />
        </div>
    );
};