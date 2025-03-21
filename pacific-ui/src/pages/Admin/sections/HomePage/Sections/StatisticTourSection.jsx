import React, { useEffect, useState } from 'react';
import { Input, Select, Table } from 'antd';
import { Card } from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import config from '~/config';
import TourService from '~/services/TourService';
import AdminServices from '~/services/AdminServices';

export const StatisticTourSection = () => {
    const [data, setData] = useState([]);
    const [dataTour, setDataTour] = useState([
        {
            key: '',
            keyword: '',
            quantity: '',
            ground: null,
            trend: '',
        },
    ]);

    useEffect(() => {
        AdminServices.getBookingRevenue().then((res) => {
            setData(res);
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    useEffect(() => {
        const temp = data.map((item, index) => {
            return {
                key: index,
                keyword: item.tourTitle,
                quantity: item.totalNumber || 10,
                growth: 21,
                trend: 'up',
            };
        });
        setDataTour(temp);
    }, [data]);
    // const dataSource = [
    //     { key: '1', keyword: `${tours.title}`, users: 663, growth: 21, trend: 'up' },
    //     { key: '2', keyword: `${tours.title}`, users: 419, growth: 35, trend: 'up' },
    //     { key: '3', keyword: `${tours.title}`, users: 414, growth: 96, trend: 'down' },
    //     { key: '4', keyword: `${tours.title}`, users: 201, growth: 8, trend: 'up' },
    //     { key: '5', keyword: `${tours.title}`, users: 761, growth: 35, trend: 'down' },
    // ];

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
                <Link to={'#'} className="text-blue-500 font-semibold hover:underline">
                    {text}
                </Link>
            ),
        },
        {
            title: 'quantity',
            dataIndex: 'quantity',
            key: 'quantity',
            align: 'center',
        },
        {
            title: 'Tăng trưởng',
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
            <div className="flex flex-wrap gap-4 items-center mb-4">
                <h3 className="text-lg font-semibold uppercase text-orange-400">Danh sách tour bán chạy</h3>
                <Input className={'w-4/12'}
                       allowClear
                       placeholder="Tìm kiếm tour"
                />
                <Select className={'w-4/12'} placeholder={'Chọn bộ lọc'}>
                    <Select.Option value="1">A-Z</Select.Option>
                    <Select.Option value="2">Z-A</Select.Option>
                    <Select.Option value="3">Số lượng bán cao nhất</Select.Option>
                    <Select.Option value="3">Số lượng bán thấp nhất</Select.Option>

                </Select>
            </div>

            {/* Bảng dữ liệu */}
            <Table
                columns={columns}
                dataSource={dataTour}
                pagination={{ pageSize: 5 }}
                size="small"
            />
        </Card>
    );
};
