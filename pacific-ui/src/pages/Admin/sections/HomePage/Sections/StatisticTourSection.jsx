import React from "react";
import { Table } from "antd";
import { Card } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const dataSource = [
    { key: "1", keyword: "搜索关键词-0", users: 663, growth: 21, trend: "up" },
    { key: "2", keyword: "搜索关键词-1", users: 419, growth: 35, trend: "up" },
    { key: "3", keyword: "搜索关键词-2", users: 414, growth: 96, trend: "down" },
    { key: "4", keyword: "搜索关键词-3", users: 201, growth: 8, trend: "up" },
    { key: "5", keyword: "搜索关键词-4", users: 761, growth: 35, trend: "down" },
];

const columns = [
    {
        title: "排名",
        dataIndex: "key",
        key: "key",
        align: "center",
    },
    {
        title: "搜索关键词",
        dataIndex: "keyword",
        key: "keyword",
        render: (text) => (
            <a href="#" className="text-blue-500 hover:underline">
                {text}
            </a>
        ),
    },
    {
        title: "用户数",
        dataIndex: "users",
        key: "users",
        align: "center",
    },
    {
        title: "周涨幅",
        dataIndex: "growth",
        key: "growth",
        align: "center",
        render: (value, record) => (
            <span className={record.trend === "up" ? "text-red-500" : "text-green-500"}>
        {value}% {record.trend === "up" ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
      </span>
        ),
    },
];

export const StatisticTourSection = () => {
    return (
        <Card className="p-4">
            {/* Tiêu đề */}
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold">线上热门搜索</h3>
                <button className="text-gray-500">...</button>
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
