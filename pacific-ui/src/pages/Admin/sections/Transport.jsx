import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Space, message, Select } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import TransportServices from "~/services/TransportServices";
import TransportCard from "~/pages/Admin/components/TransportCard";

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
            message.error("Lỗi tải dữ liệu phương tiện!");
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        setFilteredTransports(transports.filter((t) => t.name.toLowerCase().includes(value)));
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
            handleCloseModal();
        } catch (error) {
            message.error("Lỗi khi lưu dữ liệu!");
        }
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Xác nhận xoá",
            content: "Bạn có chắc chắn muốn xóa phương tiện này?",
            okText: "Xoá",
            okType: "danger",
            cancelText: "Hủy",
            onOk: async () => {
                try {
                    await TransportServices.deleteTransport(id);
                    fetchTransports();
                    message.success("Xóa phương tiện thành công!");
                } catch (error) {
                    message.error("Không thể xóa phương tiện!");
                }
            },
        });
    };

    const handleEdit = (transport) => {
        setEditingTransport(transport);
        form.setFieldsValue(transport);
        setShowModal(true);
    };

    const handleStatusChange = async (id, status) => {
        try {
            await TransportServices.updateTransport(id, { active: status });
            fetchTransports();
            message.success("Cập nhật trạng thái thành công!");
        } catch (error) {
            message.error("Lỗi khi cập nhật trạng thái!");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingTransport(null);
        form.resetFields();
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

            <TransportCard
                transports={filteredTransports}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onStatusChange={handleStatusChange}
            />

            <Modal open={showModal} onCancel={handleCloseModal} footer={null} title={editingTransport ? "Chỉnh sửa phương tiện" : "Thêm phương tiện mới"}>
                <Form layout="vertical" form={form} onFinish={handleSave} initialValues={{ active: true }}>
                    <Form.Item name="name" label="Tên phương tiện" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="cost" label="Chi phí" rules={[{ required: true, message: "Vui lòng nhập chi phí!" }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="imageURL" label="URL Ảnh" rules={[{ required: true, message: "Vui lòng nhập URL ảnh!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="typeTransport" label="Loại phương tiện" rules={[{ required: true, message: "Vui lòng chọn loại phương tiện!" }]}>
                        <Select>
                            <Select.Option value="Car">Ô tô</Select.Option>
                            <Select.Option value="Bus">Xe buýt</Select.Option>
                            <Select.Option value="Bike">Xe máy</Select.Option>
                            <Select.Option value="Ship">Tàu thủy</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item name="active" label="Trạng thái" rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}>
                        <Select>
                            <Select.Option value={true}>Đang hoạt động</Select.Option>
                            <Select.Option value={false}>Ngừng hoạt động</Select.Option>
                        </Select>
                    </Form.Item>
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={handleCloseModal}>Hủy</Button>
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
