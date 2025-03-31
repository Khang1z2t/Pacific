import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Modal, Select, Space, Upload } from 'antd';
import { PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import HotelServices from '~/services/HotelServices';
import HotelCard from '~/pages/Admin/components/HotelCard';

const { Option } = Select;

const Hotel = () => {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingHotel, setEditingHotel] = useState(null);
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState([]);
    const [searchParams, setSearchParams] = useState({
        name: '',
        minPrice: null,
        maxPrice: null,
        typeHotel: ''
    });

    useEffect(() => {
        fetchHotels();
    }, []);

    const fetchHotels = async () => {
        setLoading(true);
        try {
            const response = await HotelServices.getAllHotels();
            setHotels(response || []);
            setFilteredHotels(response || []);
        } catch (error) {
            message.error(error.message || "Lỗi tải dữ liệu khách sạn!");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        setLoading(true);
        try {
            const response = await HotelServices.searchHotels(
                searchParams.name,
                searchParams.minPrice,
                searchParams.maxPrice,
                searchParams.typeHotel
            );
            setFilteredHotels(response || []);
        } catch (error) {
            message.error(error.message || "Lỗi tìm kiếm khách sạn!");
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (values) => {
        setLoading(true);
        try {
            let response;
            if (fileList.length > 0 && !editingHotel) {
                response = await HotelServices.createHotelWithImage(values, fileList[0].originFileObj);
            } else if (editingHotel) {
                response = await HotelServices.updateHotel(editingHotel.id, values);
                if (fileList.length > 0) {
                    await HotelServices.updateHotelImage(editingHotel.id, fileList[0].originFileObj);
                }
            } else {
                response = await HotelServices.createHotel(values);
            }
            message.success("Thao tác thành công!");
            fetchHotels();
            handleCloseModal();
        } catch (error) {
            message.error(error.message || "Lỗi khi lưu dữ liệu!");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateImage = async (id) => {
        if (fileList.length === 0) return;
        setLoading(true);
        try {
            await HotelServices.updateHotelImage(id, fileList[0].originFileObj);
            message.success("Cập nhật ảnh thành công!");
            fetchHotels();
            setFileList([]);
        } catch (error) {
            message.error(error.message || "Lỗi khi cập nhật ảnh!");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await HotelServices.deleteHotel(id);
            message.success("Xóa khách sạn thành công!");
            fetchHotels();
        } catch (error) {
            message.error(error.message || "Không thể xóa khách sạn!");
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (hotel) => {
        setEditingHotel(hotel);
        form.setFieldsValue({
            name: hotel.name,
            rating: hotel.rating,
            cost: hotel.cost,
            typeHotel: hotel.typeHotel
        });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingHotel(null);
        form.resetFields();
        setFileList([]);
    };

    const uploadProps = {
        onRemove: () => setFileList([]),
        beforeUpload: (file) => {
            setFileList([file]);
            return false;
        },
        fileList,
        maxCount: 1
    };

    return (
        <div>
            <h1>Danh sách khách sạn</h1>
            <Space style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <Space>
                    <Input
                        placeholder="Tên khách sạn"
                        value={searchParams.name}
                        onChange={(e) => setSearchParams({...searchParams, name: e.target.value})}
                    />
                    <InputNumber
                        placeholder="Giá thấp nhất"
                        min={0}
                        value={searchParams.minPrice}
                        onChange={(value) => setSearchParams({...searchParams, minPrice: value})}
                    />
                    <InputNumber
                        placeholder="Giá cao nhất"
                        min={0}
                        value={searchParams.maxPrice}
                        onChange={(value) => setSearchParams({...searchParams, maxPrice: value})}
                    />
                    <Select
                        placeholder="Loại khách sạn"
                        style={{ width: 150 }}
                        value={searchParams.typeHotel || undefined}
                        onChange={(value) => setSearchParams({...searchParams, typeHotel: value})}
                    >
                        <Option value="Resort">Resort</Option>
                        <Option value="Hotel">Khách sạn</Option>
                        <Option value="Motel">Nhà nghỉ</Option>
                        <Option value="Homestay">Homestay</Option>
                    </Select>
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        onClick={handleSearch}
                        loading={loading}
                    >
                        Tìm kiếm
                    </Button>
                </Space>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setShowModal(true)}
                    loading={loading}
                >
                    Thêm khách sạn
                </Button>
            </Space>

            <HotelCard
                hotels={filteredHotels}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onUpdateImage={handleUpdateImage}
                loading={loading}
            />

            <Modal
                open={showModal}
                onCancel={handleCloseModal}
                footer={null}
                title={editingHotel ? "Chỉnh sửa khách sạn" : "Thêm khách sạn mới"}
                width={700}
            >
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={handleSave}
                    initialValues={{ rating: 3 }}
                >
                    <Form.Item
                        name="name"
                        label="Tên khách sạn"
                        rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="rating"
                        label="Đánh giá (1-5 sao)"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập đánh giá!",
                            type: 'number',
                            min: 1,
                            max: 5
                        }]}
                    >
                        <InputNumber min={1} max={5} step={0.1} />
                    </Form.Item>
                    <Form.Item
                        name="cost"
                        label="Chi phí"
                        rules={[{
                            required: true,
                            message: "Vui lòng nhập chi phí!",
                            type: 'number',
                            min: 0
                        }]}
                    >
                        <InputNumber min={0} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        name="typeHotel"
                        label="Loại khách sạn"
                        rules={[{ required: true, message: "Vui lòng chọn loại khách sạn!" }]}
                    >
                        <Select>
                            <Option value="Resort">Resort</Option>
                            <Option value="Hotel">Khách sạn</Option>
                            <Option value="Motel">Nhà nghỉ</Option>
                            <Option value="Homestay">Homestay</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Ảnh khách sạn">
                        <Upload {...uploadProps}>
                            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
                        </Upload>
                    </Form.Item>
                    <div style={{ textAlign: "right" }}>
                        <Button onClick={handleCloseModal}>Hủy</Button>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ marginLeft: 10 }}
                            loading={loading}
                        >
                            {editingHotel ? "Cập nhật" : "Thêm mới"}
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default Hotel;