import React from "react";
import { Button, Space, Tag, Table, Image, message, Popconfirm } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

const HotelCard = ({ hotels = [], onEdit, onDelete }) => {
    const handleDelete = (id) => {
        if (!id) {
            console.error("[HotelCard] Lỗi: ID không hợp lệ để xóa.");
            message.error("Không thể xóa vì thiếu ID!");
            return;
        }

        if (onDelete) {
            onDelete(id)
                .then(() => message.success("✅ Xóa khách sạn thành công!"))
                .catch((error) => {
                    console.error(`[HotelCard] Lỗi khi xóa khách sạn ID ${id}:`, error);
                    message.error("❌ Lỗi khi xóa khách sạn!");
                });
        }
    };

    const columns = [
        { title: "ID", dataIndex: "id", key: "id" },
        { title: "Tên khách sạn", dataIndex: "name", key: "name", render: (name) => name || "Chưa có tên" },
        {
            title: "Đánh giá",
            dataIndex: "rating",
            key: "rating",
            render: (rating) => rating || "Chưa có đánh giá",
        },
        {
            title: "Chi phí",
            dataIndex: "cost",
            key: "cost",
            render: (cost) => (cost ? `${cost.toLocaleString("vi-VN")} VND` : "N/A"),
        },
        {
            title: "Hình ảnh",
            dataIndex: "ImageURL",
            key: "ImageURL",
            render: (url) =>
                url ? <Image width={60} src={url} alt="Hình khách sạn" /> : <Tag color="gray">Không có ảnh</Tag>,
        },
        { title: "Loại khách sạn", dataIndex: "typeHotel", key: "typeHotel", render: (type) => type || "Không xác định" },
        {
            title: "Hành động",
            key: "actions",
            render: (_, hotel) => (
                <Space>
                    <Button
                        type="primary"
                        icon={<EditOutlined />}
                        onClick={() => {
                            if (!hotel?.id) {
                                console.error("[HotelCard] Lỗi: Không có ID để sửa.");
                                message.error("Không thể sửa vì thiếu ID!");
                                return;
                            }
                            onEdit?.(hotel);
                        }}
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        title="Bạn có chắc chắn muốn xóa khách sạn này?"
                        onConfirm={() => handleDelete(hotel.id)}
                        okText="Xóa"
                        cancelText="Hủy"
                    >
                        <Button danger icon={<DeleteOutlined />}>Xóa</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return <Table columns={columns} dataSource={hotels} rowKey="id" pagination={{ pageSize: 5 }} />;
};

export default HotelCard;