import React, { useState, useEffect, useCallback } from 'react';
import { Button, Image, Rate, Table, Typography, message, Tooltip, Space, Modal, Form, Input, InputNumber } from 'antd';
import { RefreshCwIcon, TrashIcon } from 'lucide-react';
import HotelServices from '~/services/HotelServices';
import config from '~/config';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const HotelPage = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addHotelModalVisible, setAddHotelModalVisible] = useState(false);
    const [editHotelModalVisible, setEditHotelModalVisible] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [deleteHotelModalVisible, setDeleteHotelModalVisible] = useState(false);
    const [form] = Form.useForm(); // Form instance for managing form state

    const fetchHotels = useCallback(async () => {
        setLoading(true);
        try {
            const response = await HotelServices.getAllHotels();
            setHotels(response.data || []);
            message.success('Danh sách khách sạn đã được cập nhật!');
        } catch (error) {
            console.error('Error fetching hotels:', error);
            message.error('Không thể tải danh sách khách sạn!');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHotels();
    }, [fetchHotels]);

    // Handle form submission to add a new hotel
    const handleAddHotel = async (values) => {
        setLoading(true);
        try {
            const payload = {
                id: values.id,
                name: values.name,
                rating: values.rating,
                cost: values.cost,
                typeHotel: values.typeHotel,
                imageURL: values.imageURL,
            };
            await HotelServices.createHotel(payload); // Assuming HotelServices.addHotel exists
            message.success('Thêm khách sạn thành công!');
            setAddHotelModalVisible(false);
            form.resetFields(); // Reset form after submission
            fetchHotels(); // Refresh hotel list
        } catch (error) {
            console.error('Error adding hotel:', error);
            message.error('Không thể thêm khách sạn!');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Mã khách sạn',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
            width: 120,
        },
        {
            title: 'Tên khách sạn',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            filterSearch: true,
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
            width: 200,
        },
        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            key: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            render: (value) => <Rate value={value} allowHalf disabled />,
            filters: [
                { text: '1 sao', value: 1 },
                { text: '2 sao', value: 2 },
                { text: '3 sao', value: 3 },
                { text: '4 sao', value: 4 },
                { text: '5 sao', value: 5 },
            ],
            onFilter: (value, record) => Math.floor(record.rating) === value,
            width: 150,
        },
        {
            title: 'Giá (VND)',
            dataIndex: 'cost',
            key: 'cost',
            sorter: (a, b) => a.cost - b.cost,
            render: (text) => `${config.webConfig.getCurrency(text)}`,
            filters: [
                { text: 'Dưới 1 triệu', value: 1 },
                { text: '1 - 2 triệu', value: 2 },
                { text: '2 - 3 triệu', value: 3 },
                { text: 'Trên 3 triệu', value: 4 },
            ],
            onFilter: (value, record) => {
                const cost = record.cost;
                if (value === 1) return cost < 1000000;
                if (value === 2) return cost >= 1000000 && cost <= 2000000;
                if (value === 3) return cost > 2000000 && cost <= 3000000;
                if (value === 4) return cost > 3000000;
                return true;
            },
            width: 150,
        },
        {
            title: 'Ảnh',
            dataIndex: 'imageURL',
            key: 'imageURL',
            render: (imageURL) => (
                <Image
                    src={config.imageConfig.getImage(imageURL)}
                    alt="Hotel"
                    width={100}
                    height={100}
                    className="object-cover rounded-md"
                    preview
                />
            ),
            width: 120,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Tooltip title="Xóa khách sạn">
                        <Button danger icon={<DeleteOutlined />} />
                    </Tooltip>
                    <Tooltip title="Xem chi tiết">
                        <Button icon={<EditOutlined />} />
                    </Tooltip>
                </Space>
            ),
            width: 120,
        },
    ];

    return (
        <>
            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans">
                <div className="flex flex-col gap-6">
                    <div className="flex justify-between items-center">
                        <Title level={2} className="text-gray-800 m-0">
                            Danh sách khách sạn
                        </Title>
                        <Space>
                            <Button
                                icon={<RefreshCwIcon size={16} />}
                                loading={loading}
                                onClick={fetchHotels}
                                type="text"
                                className="flex items-center border border-gray-300"
                            >
                                Làm mới
                            </Button>
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => setAddHotelModalVisible(true)}
                                className="flex items-center"
                            >
                                Thêm khách sạn
                            </Button>
                        </Space>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={hotels}
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                        rowKey="id"
                        bordered
                        className="bg-white shadow-md rounded-lg"
                        scroll={{ x: 'max-content' }}
                    />
                </div>
            </div>

            {/* Add Hotel Modal */}
            <Modal
                open={addHotelModalVisible}
                onCancel={() => setAddHotelModalVisible(false)}
                title="Thêm khách sạn"
                footer={null}
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddHotel}
                    initialValues={{
                        rating: 0,
                        cost: 0,
                    }}
                >
                    <Form.Item
                        name="id"
                        label="Mã khách sạn"
                        rules={[{ required: true, message: 'Vui lòng nhập mã khách sạn!' }]}
                    >
                        <Input placeholder="Nhập mã khách sạn" />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        label="Tên khách sạn"
                        rules={[{ required: true, message: 'Vui lòng nhập tên khách sạn!' }]}
                    >
                        <Input placeholder="Nhập tên khách sạn" />
                    </Form.Item>

                    <Form.Item
                        name="rating"
                        label="Đánh giá (sao)"
                        rules={[{ required: true, message: 'Vui lòng chọn đánh giá!' }]}
                    >
                        <Rate allowHalf />
                    </Form.Item>

                    <Form.Item
                        name="cost"
                        label="Giá (VND)"
                        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                    >
                        <InputNumber
                            min={0}
                            step={100000}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            style={{ width: '100%' }}
                            placeholder="Nhập giá khách sạn"
                        />
                    </Form.Item>

                    <Form.Item
                        name="typeHotel"
                        label="Loại khách sạn"
                        rules={[{ required: true, message: 'Vui lòng nhập loại khách sạn!' }]}
                    >
                        <Input placeholder="Nhập loại khách sạn (VD: Resort, Hotel)" />
                    </Form.Item>

                    <Form.Item
                        name="imageURL"
                        label="URL ảnh"
                        rules={[{ required: true, message: 'Vui lòng nhập URL ảnh!' }]}
                    >
                        <Input placeholder="Nhập URL ảnh khách sạn" />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Thêm khách sạn
                            </Button>
                            <Button onClick={() => setAddHotelModalVisible(false)}>
                                Hủy
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};