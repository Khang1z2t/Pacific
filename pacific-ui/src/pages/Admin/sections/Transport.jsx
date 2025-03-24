import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Space, message, Select } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import TransportCard from "~/pages/Admin/components/TransportCard";
import TransportServices from "~/services/TransportServices";

const Transport = () => {
  const [transports, setTransports] = useState([]);
  const [filteredTransports, setFilteredTransports] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingTransport, setEditingTransport] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchTransports();
  }, []);

  const fetchTransports = async () => {
    try {
      const response = await TransportServices.getTransports();
      setTransports(response || []);
      setFilteredTransports(response || []);
    } catch (error) {
      console.error("Lỗi tải dữ liệu:", error);
    }
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchText(value);
    setFilteredTransports(
        transports.filter((transport) =>
            transport.name.toLowerCase().includes(value)
        )
    );
  };

  const handleSave = async (values) => {
    try {
      if (editingTransport) {
        await TransportServices.updateTransport(editingTransport.id, values);
        message.success("Cập nhật phương tiện thành công!");
      } else {
        await TransportServices.addTransport(values);
        message.success("Thêm phương tiện mới thành công!");
      }
      fetchTransports();
      setShowModal(false);
      setEditingTransport(null);
      form.resetFields();
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu:", error);
      message.error("Có lỗi xảy ra, vui lòng thử lại!");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa?")) return;
    try {
      await TransportServices.deleteTransport(id);
      fetchTransports();
      message.success("Xóa phương tiện thành công!");
    } catch (error) {
      console.error("Lỗi khi xóa dữ liệu:", error);
      message.error("Không thể xóa phương tiện!");
    }
  };

  const handleEdit = (transport) => {
    setEditingTransport(transport);
    form.setFieldsValue(transport);
    setShowModal(true);
  };

  return (
      <div>
        <h1>Danh sách phương tiện</h1>
        <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <Input
              placeholder="Tìm kiếm phương tiện..."
              prefix={<SearchOutlined />}
              value={searchText}
              onChange={handleSearch}
              style={{ width: "300px" }}
          />
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowModal(true)}>
            Thêm phương tiện
          </Button>
        </Space>
        <TransportCard transports={filteredTransports} onEdit={handleEdit} onDelete={handleDelete} />
        <Modal open={showModal} onCancel={() => setShowModal(false)} footer={null} title={editingTransport ? "Chỉnh sửa phương tiện" : "Thêm phương tiện mới"}>
          <Form layout="vertical" form={form} onFinish={handleSave}>
            <Form.Item name="name" label="Tên phương tiện" rules={[{ required: true, message: "Vui lòng nhập tên phương tiện" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="cost" label="Chi phí" rules={[{ required: true, message: "Vui lòng nhập chi phí" }]}>
              <Input type="number" />
            </Form.Item>
            <Form.Item name="ImageURL" label="URL Ảnh" rules={[{ required: true, message: "Vui lòng nhập URL ảnh" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="typeTransport" label="Loại phương tiện" rules={[{ required: true, message: "Vui lòng chọn loại phương tiện" }]}>
              <Select>
                <Select.Option value="Car">Ô tô</Select.Option>
                <Select.Option value="Bus">Xe buýt</Select.Option>
                <Select.Option value="Bike">Xe máy</Select.Option>
                <Select.Option value="Ship">Tàu thủy</Select.Option>
              </Select>
            </Form.Item>
            <div style={{ textAlign: "right" }}>
              <Button onClick={() => setShowModal(false)}>Đóng</Button>
              <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
                {editingTransport ? "Cập nhật" : "Thêm mới"}
              </Button>
            </div>
          </Form>
        </Modal>
      </div>
  );
};

export default Transport;
