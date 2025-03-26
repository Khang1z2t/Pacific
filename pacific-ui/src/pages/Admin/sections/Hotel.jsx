import React, { useEffect, useState } from "react";
import { Button, Modal, Form, Input, Space, message, Select } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import HotelServices from "~/services/HotelServices";
import HotelCard from "~/pages/Admin/components/HotelCard";

const Hotel = () => {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [editingHotel, setEditingHotel] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        try {
            const response = await HotelServices.getHotels();
            setHotels(response);
            setFilteredHotels(response);
        } catch (error) {
            message.error("Lỗi tải dữ liệu khách sạn!");
        }
    };

    const handleSearch = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchText(value);
        setFilteredHotels(hotels.filter((hotel) => hotel.name.toLowerCase().includes(value)));
    };

    const handleSave = async (values) => {
        try {
            if (editingHotel) {
                await HotelServices.updateHotel(editingHotel.id, values);
                message.success("Cập nhật khách sạn thành công!");
            } else {
                await HotelServices.createHotel(values);
                message.success("Thêm khách sạn mới thành công!");
            }
            fetchHotels();
            handleCloseModal();
        } catch (error) {
            message.error("Lỗi khi lưu dữ liệu!");
        }
    };

    const handleDelete = async (id) => {
        try {
            await HotelServices.deleteHotel(id);
            fetchHotels();
            message.success("Xóa khách sạn thành công!");
        } catch (error) {
            message.error("Không thể xóa khách sạn!");
        }
    };

    const handleEdit = (hotel) => {
        setEditingHotel(hotel);
        form.setFieldsValue(hotel);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingHotel(null);
        form.resetFields();
    };

    return (
        <div>
            <h1>Danh sách khách sạn</h1>
            <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <Input
                    placeholder="Tìm kiếm khách sạn..."
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={handleSearch}
                    style={{ width: "300px" }}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setShowModal(true)}>
                    Thêm khách sạn
                </Button>
            </Space>

            <HotelCard hotels={filteredHotels} onEdit={handleEdit} onDelete={handleDelete} />

            <Modal open={showModal} onCancel={handleCloseModal} footer={null} title={editingHotel ? "Chỉnh sửa khách sạn" : "Thêm khách sạn mới"}>
                <Form layout="vertical" form={form} onFinish={handleSave} initialValues={{ active: true }}>
                    <Form.Item name="name" label="Tên khách sạn" rules={[{ required: true, message: "Vui lòng nhập tên!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="cost" label="Chi phí" rules={[{ required: true, message: "Vui lòng nhập chi phí!" }]}>
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item name="imageUrl" label="URL Ảnh" rules={[{ required: true, message: "Vui lòng nhập URL ảnh!" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="type" label="Loại khách sạn" rules={[{ required: true, message: "Vui lòng chọn loại khách sạn!" }]}>
                        <Select>
                            <Select.Option value="Resort">Resort</Select.Option>
                            <Select.Option value="Hotel">Khách sạn</Select.Option>
                            <Select.Option value="Motel">Nhà nghỉ</Select.Option>
                            <Select.Option value="Homestay">Homestay</Select.Option>
                        </Select>
                    </Form.Item>
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={handleCloseModal}>Hủy</Button>
                        <Button type="primary" htmlType="submit" style={{ marginLeft: 10 }}>
                            {editingHotel ? "Cập nhật" : "Thêm mới"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default Hotel;