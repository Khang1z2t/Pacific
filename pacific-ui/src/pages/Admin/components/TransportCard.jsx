import React from "react";
import { Button, Space, Tag, Switch, Table, Image, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const TransportCard = ({ transports = [], onEdit, onDelete, onStatusChange }) => {
    const handleDelete = (id) => {
        if (!id) {
            console.error("[TransportCard] Lỗi: ID không hợp lệ để xóa.");
            message.error("Không thể xóa vì thiếu ID!");
            return;
        }

        if (onDelete) {
            onDelete(id)
                .then(() => message.success("✅ Xóa phương tiện thành công!"))
                .catch((error) => {
                    console.error(`[TransportCard] Lỗi khi xóa phương tiện ID ${id}:`, error);
                    message.error("❌ Lỗi khi xóa phương tiện!");
                });
        }
    };

    const handleStatusChange = (id, checked) => {
        if (!id) {
            console.error("[TransportCard] Lỗi: ID không hợp lệ để cập nhật trạng thái.");
            message.error("Không thể cập nhật trạng thái vì thiếu ID!");
            return;
        }

        if (onStatusChange) {
            onStatusChange(id, checked)
                .then(() => {
                    message.success(`🚀 Trạng thái đã được cập nhật: ${checked ? "Kích hoạt" : "Ngừng hoạt động"}`);
                })
                .catch((error) => {
                    console.error(`[TransportCard] Lỗi khi cập nhật trạng thái ID ${id}:`, error);
                    message.error("❌ Lỗi khi cập nhật trạng thái!");
                });
        }
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Tên phương tiện", dataIndex: "name", key: "name", render: (name) => name || "Chưa có tên" },
        {
            title: "Chi phí",
            dataIndex: "cost",
            key: "cost",
            render: (cost) => (cost ? `${cost.toLocaleString("vi-VN")} VND` : "N/A"),
        },
        {
            title: "Hình ảnh",
            dataIndex: "imageURL",
            key: "imageURL",
            render: (url) =>
                url ? <Image width={60} src={url} alt="Hình phương tiện" /> : <Tag color="gray">Không có ảnh</Tag>,
        },
        { title: "Loại phương tiện", dataIndex: "typeTransport", key: "typeTransport", render: (type) => type || "Không xác định" },
        {
            title: "Trạng thái",
            dataIndex: "active",
            key: "active",
            render: (active) => (
                <Tag color={active ? "green" : "volcano"}>{active ? "Đang hoạt động" : "Ngừng hoạt động"}</Tag>
            ),
        },
        {
            title: "Hành động",
            key: "actions",
            render: (_, transport) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            if (!transport?.id) {
                                console.error("[TransportCard] Lỗi: Không có ID để sửa.");
                                message.error("Không thể sửa vì thiếu ID!");
                                return;
                            }
                            onEdit?.(transport);
                        }}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa phương tiện này?"
                        onConfirm={() => handleDelete(transport.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger icon={<DeleteOutlined />}>Xóa</Button>
                    </Popconfirm>
                    <Switch checked={transport.active} onChange={(checked) => handleStatusChange(transport.id, checked)} />
                </Space>
            ),
        },
    ];

    return <Table columns={columns} dataSource={transports} rowKey="id" pagination={{ pageSize: 5 }} />;
};

export default TransportCard;
