import React from "react";
import { Button, Space, Tag, Switch, Table, Image } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TransportCard = ({ transports, onEdit, onDelete, onStatusChange }) => {
    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Tên phương tiện", dataIndex: "name", key: "name" },
        { title: "Chi phí", dataIndex: "cost", key: "cost", render: (cost) => `${cost} VND` },
        {
            title: "Hình ảnh",
            dataIndex: "ImageURL",
            key: "ImageURL",
            render: (url) => url ? <Image width={60} src={url} /> : "Không có ảnh"
        },
        { title: "Loại phương tiện", dataIndex: "typeTransport", key: "typeTransport" },
        {
            title: "Trạng thái",
            dataIndex: "active",
            key: "active",
            render: (active) => (
                <Tag color={active ? "green" : "volcano"}>
                    {active ? "ACTIVE" : "INACTIVE"}
                </Tag>
            ),
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_, transport) => (
                <Space>
                    <Button type="primary" icon={<EditOutlined />} onClick={() => onEdit(transport)}>Sửa</Button>
                    <Button danger icon={<DeleteOutlined />} onClick={() => onDelete(transport.id)}>Xóa</Button>
                    <Switch checked={transport.active} onChange={() => onStatusChange(transport.id, transport.active)} />
                </Space>
            ),
        },
    ];

    return <Table columns={columns} dataSource={transports} rowKey="id" pagination={{ pageSize: 5 }} />;
};

export default TransportCard;
