import React, { useEffect, useState } from "react";
import { Table, Button, Input, Space, Tag, message } from "antd";
import { SearchOutlined, EyeOutlined, EditOutlined, DeleteOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import axios from "axios";
import TourCard from "../components/TourCard";

const Tour = () => {
  const [tours, setTours] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/tours/get-all-tours");
      setTours(response.data);
    } catch (error) {
      message.error("Không thể tải danh sách tour");
      console.error("Lỗi khi tải danh sách tour:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/tours/delete-tour/${id}`);
      setTours(tours.filter((tour) => tour.id !== id));
      message.success("Xóa thành công!");
    } catch (error) {
      message.error("Xóa không thành công!");
      console.error("Lỗi khi xóa tour:", error);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên tour", dataIndex: "name", key: "name" },
    { title: "Category", dataIndex: "category", key: "category" },
    { title: "Số ngày", dataIndex: "duration", key: "duration" },
    { title: "Điểm đến", dataIndex: "destination", key: "destination" },
    { title: "Mô tả", dataIndex: "description", key: "description" },
    { title: "HDV", dataIndex: "guide", key: "guide" },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => <Tag color={status === "ACTIVE" ? "green" : "red"}>{status}</Tag>,
    },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
          <Space size="middle">
            <Button icon={<EyeOutlined />} type="primary" />
            <Button icon={<EditOutlined />} />
            <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger />
          </Space>
      ),
    },
  ];

  return (
      <div className="tour-management">
        <h2>Quản lý Tour</h2>
        <div className="toolbar" style={{ marginBottom: 16 }}>
          <Input
              placeholder="Tìm kiếm"
              prefix={<SearchOutlined />}
              style={{ width: 200, marginRight: 8 }}
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
          />
          <Button type="primary" icon={<PlusOutlined />}>Thêm</Button>
          <Button icon={<FilterOutlined />}>Sắp xếp theo</Button>
        </div>
        <Table
            columns={columns}
            dataSource={tours.filter((tour) => tour.name.toLowerCase().includes(searchText.toLowerCase()))}
            rowKey="id"
            pagination={{ pageSize: 5 }}
        />
      </div>
  );
};

export default Tour;