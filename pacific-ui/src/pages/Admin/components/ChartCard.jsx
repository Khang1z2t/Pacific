import React from 'react';
import { Card } from 'antd';
import { Info } from 'lucide-react';
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import config from '~/config';

export const ChartCard = ({ title, totalAmount, weekChange, dayChange, dailyAmount, chartData, chartType = 'line' }) => {
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white p-2 border rounded shadow">
                    <p className="text-sm">{`${label}: ${config.webConfig.getCurrency(payload[0].value)}`}</p>
                </div>
            );
        }
        return null;
    };
    return (
        <Card className="w-full shadow-md" bordered={true}>
            <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600 text-sm">{title}</span>
                <Info className="text-gray-400" size={16} />
            </div>
            <h2 className="text-3xl font-bold">{config.webConfig.getCurrency(totalAmount)}</h2>
            <div className="w-full h-24">
                <ResponsiveContainer width="100%" height={100}>
                    {chartType === 'bar' ? (
                        <BarChart data={chartData}>
                            <XAxis dataKey="name" hide />
                            <YAxis hide />
                            <Tooltip content={<CustomTooltip/>} />
                            <Bar dataKey="value" fill="#6366F1" />
                        </BarChart>
                    ) : (
                        <LineChart data={chartData}>
                            <XAxis dataKey="name" hide />
                            <YAxis hide />
                            <Tooltip content={<CustomTooltip/>} />
                            <Line type="monotone" dataKey="value" stroke="#6366F1" strokeWidth={2} dot={false} />
                        </LineChart>
                    )}
                </ResponsiveContainer>
            </div>
            <hr className="my-2" />
            <div className="text-gray-600 text-sm">{config.webConfig.getCurrency(dailyAmount)}</div>
        </Card>
    );
};