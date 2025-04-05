import React, { useState, useEffect, useCallback } from 'react';
import { Button, Image, Table, Typography, message, Tooltip, Space, Modal, Form, Input, InputNumber, Switch } from 'antd';
import { RefreshCwIcon } from 'lucide-react';
import TransportServices from '~/services/TransportServices'; // Assuming this exists
import config from '~/config';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

const { Title } = Typography;

export const TransportationPage = () => {
    const [transports, setTransports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addTransportModalVisible, setAddTransportModalVisible] = useState(false);
    const [form] = Form.useForm(); // Form instance for managing form state

    const fetchTransports = useCallback(async () => {
        setLoading(true);
        try {
            const response = await TransportServices.getTransports();
            setTransports(response || []); // Fallback to empty array if response is undefined
            message.success('Danh sách phương tiện đã được cập nhật!');
        } catch (error) {
            console.error('Error fetching transports:', error);
            message.error('Không thể tải danh sách phương tiện!');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTransports();
    }, [fetchTransports]);

    // Handle form submission to add a new transport
    const handleAddTransport = async (values) => {
        setLoading(true);
        try {
            const payload = {
                name: values.name,
                cost: values.cost,
                imageURL: values.imageURL,
                typeTransport: values.typeTransport,
                active: values.active,
            };
            await TransportServices.addTransport(payload); // Assuming TransportServices.addTransport exists
            message.success('Thêm phương tiện thành công!');
            setAddTransportModalVisible(false);
            form.resetFields(); // Reset form after submission
            fetchTransports(); // Refresh transport list
        } catch (error) {
            console.error('Error adding transport:', error);
            message.error('Không thể thêm phương tiện!');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Mã phương tiện',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id.localeCompare(b.id), // String comparison for ID
            width: 150,
        },
        {
            title: 'Tên phương tiện',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            filterSearch: true,
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
            width: 200,
        },
        {
            title: 'Giá (VND)',
            dataIndex: 'cost',
            key: 'cost',
            sorter: (a, b) => a.cost - b.cost,
            render: (text) => `${config.webConfig.getCurrency(text)}`,
            filters: [
                { text: 'Dưới 500 nghìn', value: 1 },
                { text: '500 nghìn - 1 triệu', value: 2 },
                { text: '1 - 2 triệu', value: 3 },
                { text: 'Trên 2 triệu', value: 4 },
            ],
            onFilter: (value, record) => {
                const cost = record.cost;
                if (value === 1) return cost < 500000;
                if (value === 2) return cost >= 500000 && cost <= 1000000;
                if (value === 3) return cost > 1000000 && cost <= 2000000;
                if (value === 4) return cost > 2000000;
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
                    alt="Transport"
                    width={100}
                    height={100}
                    className="object-cover rounded-md"
                    preview
                />
            ),
            width: 120,
        },
        {
            title: 'Loại phương tiện',
            dataIndex: 'typeTransport',
            key: 'typeTransport',
            sorter: (a, b) => a.typeTransport.localeCompare(b.typeTransport),
            width: 150,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            key: 'active',
            render: (active) => (active ? 'Hoạt động' : 'Không hoạt động'),
            filters: [
                { text: 'Hoạt động', value: true },
                { text: 'Không hoạt động', value: false },
            ],
            onFilter: (value, record) => record.active === value,
            width: 150,
        },
        {
            title: 'Hành động',
            key: 'action',
            render: (text, record) => (
                <Space>
                    <Tooltip title="Xóa phương tiện">
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
                            Danh sách phương tiện
                        </Title>
                        <Space>
                            <Button
                                icon={<RefreshCwIcon size={16} />}
                                loading={loading}
                                onClick={fetchTransports}
                                type="text"
                                className="flex items-center border border-gray-300"
                            >
                                Làm mới
                            </Button>
                            <Button
                                icon={<PlusOutlined />}
                                type="primary"
                                onClick={() => setAddTransportModalVisible(true)}
                                className="flex items-center"
                            >
                                Thêm phương tiện
                            </Button>
                        </Space>
                    </div>

                    <Table
                        columns={columns}
                        dataSource={transports}
                        loading={loading}
                        pagination={{ pageSize: 10 }}
                        rowKey="id"
                        bordered
                        className="bg-white shadow-md rounded-lg"
                        scroll={{ x: 'max-content' }}
                    />
                </div>
            </div>

            {/* Add Transport Modal */}
            <Modal
                open={addTransportModalVisible}
                onCancel={() => setAddTransportModalVisible(false)}
                title="Thêm phương tiện"
                footer={null}
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddTransport}
                    initialValues={{
                        cost: 0,
                        active: true,
                    }}
                >
                    <Form.Item
                        name="name"
                        label="Tên phương tiện"
                        rules={[{ required: true, message: 'Vui lòng nhập tên phương tiện!' }]}
                    >
                        <Input placeholder="Nhập tên phương tiện" />
                    </Form.Item>

                    <Form.Item
                        name="cost"
                        label="Giá (VND)"
                        rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                    >
                        <InputNumber
                            min={0}
                            step={10000}
                            formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                            parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                            style={{ width: '100%' }}
                            placeholder="Nhập giá phương tiện"
                        />
                    </Form.Item>

                    <Form.Item
                        name="imageURL"
                        label="URL ảnh"
                        rules={[{ required: true, message: 'Vui lòng nhập URL ảnh!' }]}
                    >
                        <Input placeholder="Nhập URL ảnh phương tiện" />
                    </Form.Item>

                    <Form.Item
                        name="typeTransport"
                        label="Loại phương tiện"
                        rules={[{ required: true, message: 'Vui lòng nhập loại phương tiện!' }]}
                    >
                        <Input placeholder="Nhập loại phương tiện (VD: Xe máy, Ô tô)" />
                    </Form.Item>

                    <Form.Item
                        name="active"
                        label="Trạng thái hoạt động"
                        valuePropName="checked" // For Switch component
                    >
                        <Switch checkedChildren="Hoạt động" unCheckedChildren="Không hoạt động" />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Thêm phương tiện
                            </Button>
                            <Button onClick={() => setAddTransportModalVisible(false)}>
                                Hủy
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};