import React, { useState, useEffect } from "react";
import { Table, Button, Switch, Typography, Space, Input, Modal, Form } from "antd";
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

const { Title } = Typography;

const TourList = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/tours");
      const data = await response.json();
      setTours(data);
    } catch (error) {
      console.error("Error fetching tours:", error);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    Modal.confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc chắn muốn xóa tour này?",
      onOk: async () => {
        try {
          await fetch(`http://localhost:3000/api/tours/${id}`, { method: "DELETE" });
          setTours(tours.filter((tour) => tour.id !== id));
        } catch (error) {
          console.error("Error deleting tour:", error);
        }
      },
    });
  };

  const handleEdit = (tour) => {
    setEditingTour(tour);
    form.setFieldsValue(tour);
    setModalVisible(true);
  };

  const handleAdd = () => {
    setEditingTour(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (editingTour) {
        await fetch(`http://localhost:3000/api/tours/${editingTour.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        setTours(tours.map((tour) => (tour.id === editingTour.id ? { ...tour, ...values } : tour)));
      } else {
        const response = await fetch("http://localhost:3000/api/tours", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });
        const newTour = await response.json();
        setTours([...tours, newTour]);
      }
      setModalVisible(false);
    } catch (error) {
      console.error("Error saving tour:", error);
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Tên tour", dataIndex: "name", key: "name" },
    { title: "Ngày khởi hành", dataIndex: "startDate", key: "startDate" },
    { title: "Điểm đến", dataIndex: "destination", key: "destination" },
    { title: "Giá tour", dataIndex: "price", key: "price", render: (price) => `${price.toLocaleString()} đ` },
    { title: "Flash Sale", dataIndex: "flashSale", key: "flashSale", render: (_, record) => (
          <Switch checked={record.flashSale} />
      ) },
    {
      title: "Thao tác",
      key: "actions",
      render: (_, record) => (
          <Space>
            <Button icon={<EditOutlined />} onClick={() => handleEdit(record)} />
            <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)} />
          </Space>
      ),
    },
  ];

  return (
      <div style={{ padding: 24, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
        <Title level={2}>QUẢN LÝ TOUR</Title>
        <Space style={{ marginBottom: 16 }}>
          <Input placeholder="Search for..." prefix={<SearchOutlined />} />
          <Button type="primary" icon={<PlusOutlined />} onClick={handleAdd}>Thêm</Button>
        </Space>
        <Table columns={columns} dataSource={tours} loading={loading} rowKey="id" />
        <Modal
            title={editingTour ? "Chỉnh sửa tour" : "Thêm mới tour"}
            open={modalVisible}
            onOk={handleSubmit}
            onCancel={() => setModalVisible(false)}
        >
          <Form form={form} layout="vertical">
            <Form.Item name="name" label="Tên tour" rules={[{ required: true, message: "Vui lòng nhập tên tour" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="startDate" label="Ngày khởi hành" rules={[{ required: true, message: "Vui lòng nhập ngày khởi hành" }]}>
              <Input type="date" />
            </Form.Item>
            <Form.Item name="destination" label="Điểm đến" rules={[{ required: true, message: "Vui lòng nhập điểm đến" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="price" label="Giá tour" rules={[{ required: true, message: "Vui lòng nhập giá tour" }]}>
              <Input type="number" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
  );
};

export default TourList;
