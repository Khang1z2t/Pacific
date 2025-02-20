import React, { useEffect, useState } from 'react';
import { Select, Table } from 'antd';
import { Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import config from '~/config';

export const StatisticTourSection = () => {
    const [tours, setTours] = useState([]);
    useEffect(() => {
        config.getAllTour().then((res) => {
            setTours(res.data);
        }).catch((err) => {
            console.error(err);
        });
    }, []);
    const dataSource = [
        { key: '1', keyword: `${tours.title}`, users: 663, growth: 21, trend: 'up' },
        { key: '2', keyword: `${tours.title}`, users: 419, growth: 35, trend: 'up' },
        { key: '3', keyword: `${tours.title}`, users: 414, growth: 96, trend: 'down' },
        { key: '4', keyword: `${tours.title}`, users: 201, growth: 8, trend: 'up' },
        { key: '5', keyword: `${tours.title}`, users: 761, growth: 35, trend: 'down' },
    ];

    const columns = [
        {
            title: 'Số thứ tự',
            dataIndex: 'key',
            key: 'key',
            align: 'center',
        },
        {
            title: 'Tên tour',
            dataIndex: 'keyword',
            key: 'keyword',
            render: (text) => (
                <Link to={config.routes.tourDetail + `${tours.id}`} className="text-blue-500 hover:underline">
                    {text}
                </Link>
            ),
        },
        {
            title: '用户数',
            dataIndex: 'users',
            key: 'users',
            align: 'center',
        },
        {
            title: '周涨幅',
            dataIndex: 'growth',
            key: 'growth',
            align: 'center',
            render: (value, record) => (
                <span className={record.trend === 'up' ? 'text-red-500' : 'text-green-500'}>
        {value}% {record.trend === 'up' ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
      </span>
            ),
        },
    ];
    return (
        <Card className="p-4">
            {/* Tiêu đề */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold uppercase">Danh sách tour bán chạy</h3>
                <Select className={'w-40'} placeholder={'Chọn bộ lọc'}>
                    <Select.Option value="1">全部渠道</Select.Option>
                    <Select.Option value="2">线上</Select.Option>
                    <Select.Option value="3">线下</Select.Option>
                </Select>
            </div>

            {/* Bảng dữ liệu */}
            <Table
                columns={columns}
                dataSource={dataSource}
                pagination={{ pageSize: 5 }}
                size="small"
            />
        </Card>
    );
};
