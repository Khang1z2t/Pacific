import React, { useState } from "react";
import { Table, Button, Modal, Form, Input, Typography, Select, Space, Card } from "antd";
import { SearchOutlined, FilterOutlined, PlusOutlined } from "@ant-design/icons";
import TourListCard from "../components/TourListCard";

const { Title } = Typography;
const { Option } = Select;

const toursData = [
  { id: 1, name: "Tour Hà Nội", price: 500, destination: "Hà Nội", rating: 4.5, duration: "3 ngày 2 đêm" },
  { id: 2, name: "Tour Sài Gòn", price: 700, destination: "TP. HCM", rating: 4.7, duration: "4 ngày 3 đêm" },
  { id: 3, name: "Tour Đà Nẵng", price: 600, destination: "Đà Nẵng", rating: 4.6, duration: "3 ngày 2 đêm" },
];

const TourList = () => {
  const [tours, setTours] = useState(toursData);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const showAddTourModal = () => setIsModalVisible(true);
  const handleCancel = () => setIsModalVisible(false);

  const handleAddTour = (values) => {
    const newTour = {
      id: tours.length + 1,
      name: values.name,
      price: values.price,
      destination: values.destination,
      rating: 5.0,
      duration: values.duration,
    };
    setTours([...tours, newTour]);
    setIsModalVisible(false);
    form.resetFields();
  };

  return (
      <div style={{ padding: 24, backgroundColor: "#f0f2f5", minHeight: "100vh" }}>
        <Card style={{ padding: 24 }}>
          <Title level={2} style={{ textAlign: "center", marginBottom: 24 }}>Danh sách Tour Du Lịch</Title>

          {/* Search & Filter */}
          <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 24 }}>
            <Input placeholder="Tìm kiếm tour..." prefix={<SearchOutlined />} style={{ width: "40%" }} />
            <Select placeholder="Lọc theo điểm đến" style={{ width: "30%" }}>
              <Option value="Hà Nội">Hà Nội</Option>
              <Option value="TP. HCM">TP. HCM</Option>
              <Option value="Đà Nẵng">Đà Nẵng</Option>
            </Select>
            <Button type="primary" icon={<FilterOutlined />}>Lọc</Button>
          </Space>

          {/* Add Tour Button */}
          <Button type="primary" icon={<PlusOutlined />} onClick={showAddTourModal} style={{ marginBottom: 24 }}>
            Thêm Tour Mới
          </Button>

          {/* Tour Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
            {tours.map((tour) => (
                <TourListCard key={tour.id} tour={tour} />
            ))}
          </div>
        </Card>

        {/* Add Tour Modal */}
        <Modal title="Thêm Tour Mới" open={isModalVisible} onCancel={handleCancel} onOk={() => form.submit()}>
          <Form form={form} layout="vertical" onFinish={handleAddTour}>
            <Form.Item name="name" label="Tên Tour" rules={[{ required: true, message: "Vui lòng nhập tên tour" }]}> <Input /> </Form.Item>
            <Form.Item name="destination" label="Điểm đến" rules={[{ required: true, message: "Vui lòng nhập điểm đến" }]}> <Input /> </Form.Item>
            <Form.Item name="price" label="Giá" rules={[{ required: true, message: "Vui lòng nhập giá" }]}> <Input type="number" /> </Form.Item>
            <Form.Item name="duration" label="Thời gian" rules={[{ required: true, message: "Vui lòng nhập thời gian" }]}> <Input /> </Form.Item>
          </Form>
        </Modal>
      </div>
  );
};

export default TourList;