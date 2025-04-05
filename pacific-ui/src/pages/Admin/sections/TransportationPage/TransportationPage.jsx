import React, { useState, useEffect, useCallback } from 'react';
import {
    Button,
    Image,
    Table,
    Typography,
    message,
    Tooltip,
    Space,
    Modal,
    Form,
    Input,
    InputNumber,
    Switch,
    Upload, Select,
} from 'antd';
import { RefreshCwIcon } from 'lucide-react';
import TransportServices from '~/services/TransportServices';
import config from '~/config';
import {
    DeleteOutlined,
    PlusOutlined,
    LoadingOutlined,
    ExclamationCircleOutlined,
    EditOutlined, SearchOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

// TYPE TRANSPORT: 1 - TRAIN, 2 - BUS, 3 - FLIGHT
const transportTypes = {
    1: 'Tàu',
    2: 'Xe khách',
    3: 'Máy bay',
};

// Utility function to convert image to base64 for preview
const getBase64 = (img, callback) => {
    if (!img || !(img instanceof Blob)) {
        console.error('Invalid file object:', img);
        return;
    }
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
};

// Validation function for uploaded file
const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('Bạn chỉ có thể tải lên file JPG/PNG!');
        return Upload.LIST_IGNORE;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
        message.error('Ảnh phải nhỏ hơn 5MB!');
        return Upload.LIST_IGNORE;
    }
    return false;
};

export const TransportationPage = () => {
    const [transports, setTransports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addTransportModalVisible, setAddTransportModalVisible] = useState(false);
    const [deleteTransportModalVisible, setDeleteTransportModalVisible] = useState(false);
    const [selectedTransport, setSelectedTransport] = useState(null);
    const [form] = Form.useForm();
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const fetchTransports = useCallback(async () => {
        setLoading(true);
        try {
            const response = await TransportServices.getTransports();
            setTransports(response || []);
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

    const handleAddTransport = async (values) => {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('cost', values.cost);
            formData.append('typeTransport', values.typeTransport);
            formData.append('active', values.active);
            if (values.image && values.image.length > 0) {
                formData.append('image', values.image[0].originFileObj);
            }
            await TransportServices.addTransport(formData);
            message.success('Thêm phương tiện thành công!');
            setAddTransportModalVisible(false);
            setImage(null);
            form.resetFields();
            fetchTransports();
        } catch (error) {
            console.error('Error adding transport:', error);
            message.error('Không thể thêm phương tiện!');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteTransport = async (id) => {
        try {
            await TransportServices.deleteTransport(id); // Assuming this API exists
            message.success('Xóa phương tiện thành công!');
            fetchTransports();
        } catch (error) {
            console.error('Error deleting transport:', error);
            message.error('Không thể xóa phương tiện!');
        }
    };

    const handleImageChange = ({ fileList }) => {
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            if (file) {
                setImageLoading(true);
                getBase64(file, (url) => {
                    setImageLoading(false);
                    setImage(url);
                });
            }
        } else {
            setImage(null);
            setImageLoading(false);
        }
    };

    const columns = [
        {
            title: 'Mã phương tiện',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id.localeCompare(b.id),
            width: 150,
        },
        {
            title: 'Tên phương tiện',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name),
            filterSearch: true,
            onFilter: (value, record) => record.name.toLowerCase().includes(value.toLowerCase()),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Tìm theo tên`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={confirm}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={confirm}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Tìm
                        </Button>
                        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
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
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <Image
                    src={config.imageConfig.getImage(image)}
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
            sorter: (a, b) => a.typeTransport - b.typeTransport,
            render: (text) => transportTypes[text] || 'Không xác định',
            width: 150,
        },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            key: 'active',
            render: (active) => (active ? 'Không hoạt động' : 'Hoạt động'),
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
                        <Button
                            onClick={() => {
                                setSelectedTransport(record);
                                setDeleteTransportModalVisible(true);
                            }}
                            danger
                            icon={<DeleteOutlined />}
                        />
                    </Tooltip>
                    <Tooltip title="Xem chi tiết">
                        <Button icon={<EditOutlined />} />
                    </Tooltip>
                </Space>
            ),
            width: 120,
        },
    ];

    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Tải lên</div>
        </button>
    );

    const handleRefresh = () => {
        setLoading(true);
        message.success('Danh sách phương tiện đã được cập nhật!');
        fetchTransports();
    }
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
                                onClick={handleRefresh}
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
                onCancel={() => {
                    setAddTransportModalVisible(false);
                    setImage(null);
                }}
                title={<span className="text-lg font-semibold text-gray-800">Thêm phương tiện mới</span>}
                footer={null}
                width={600}
                className="rounded-lg shadow-lg"
                bodyStyle={{ padding: '24px', background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)' }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleAddTransport}
                    initialValues={{
                        cost: 0,
                        active: true,
                        typeTransport: 1, // Default to TRAIN
                    }}
                >
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            name="name"
                            label={<span className="text-gray-700 font-medium">Tên phương tiện</span>}
                            rules={[{ required: true, message: 'Vui lòng nhập tên phương tiện!' }]}
                            className="col-span-2"
                        >
                            <Input placeholder="Nhập tên phương tiện" className="rounded-md" />
                        </Form.Item>

                        <Form.Item
                            name="cost"
                            label={<span className="text-gray-700 font-medium">Giá (VND)</span>}
                            rules={[{ required: true, message: 'Vui lòng nhập giá!' }]}
                        >
                            <InputNumber
                                min={0}
                                step={10000}
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                parser={(value) => value.replace(/\$\s?|(,*)/g, '')}
                                className="w-full rounded-md"
                                placeholder="Nhập giá phương tiện"
                            />
                        </Form.Item>

                        <Form.Item
                            name="typeTransport"
                            label={<span className="text-gray-700 font-medium">Loại phương tiện</span>}
                            rules={[{ required: true, message: 'Vui lòng chọn loại phương tiện!' }]}
                        >
                            <Select placeholder="Chọn loại phương tiện">
                                {Object.entries(transportTypes).map(([value, label]) => (
                                    <Select.Option key={value} value={parseInt(value, 10)}>
                                        {label}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="active"
                            label={<span className="text-gray-700 font-medium">Trạng thái hoạt động</span>}
                            valuePropName="checked"
                            className="col-span-2"
                        >
                            <Switch checkedChildren="Hoạt động" unCheckedChildren="Không hoạt động" />
                        </Form.Item>

                        <Form.Item
                            name="image"
                            label={<span className="text-gray-700 font-medium">Ảnh phương tiện</span>}
                            rules={[{ required: true, message: 'Vui lòng tải lên ảnh phương tiện!' }]}
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e && e.fileList)}
                            className="col-span-2 flex justify-center"
                        >
                            <Upload
                                listType="picture-card"
                                showUploadList={false}
                                beforeUpload={beforeUpload}
                                onChange={handleImageChange}
                            >
                                {image ? (
                                    <img src={image} alt="transport" style={{
                                        width: '100%',
                                        height: '100%',
                                        borderRadius: '8px',
                                        objectFit: 'cover',
                                    }} />
                                ) : (
                                    uploadButton
                                )}
                            </Upload>
                        </Form.Item>
                    </div>

                    <Form.Item className="mt-6">
                        <Space className="flex justify-end">
                            <Button
                                onClick={() => {
                                    setAddTransportModalVisible(false);
                                    setImage(null);
                                }}
                                className="rounded-md border-gray-300"
                            >
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading} className="rounded-md">
                                Thêm phương tiện
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Delete Transport Confirmation Modal */}
            <Modal
                open={deleteTransportModalVisible}
                centered
                onCancel={() => setDeleteTransportModalVisible(false)}
                title={
                    <div className="flex items-center gap-2">
                        <ExclamationCircleOutlined className="text-red-500 text-xl" />
                        <span className="text-lg font-semibold text-gray-800">Xác nhận xóa phương tiện</span>
                    </div>
                }
                footer={null}
                width={400}
                className="rounded-lg shadow-lg"
                bodyStyle={{ padding: '20px', background: 'linear-gradient(to bottom right, #fef2f2, #fee2e2)' }}
            >
                <div className="flex flex-col items-center gap-4">
                    <p className="text-gray-700 text-center">
                        Bạn có chắc chắn muốn xóa phương tiện <strong>{selectedTransport?.name}</strong> không?
                    </p>
                    <Space>
                        <Button
                            onClick={() => setDeleteTransportModalVisible(false)}
                            className="rounded-md border-gray-300"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                handleDeleteTransport(selectedTransport.id);
                                setDeleteTransportModalVisible(false);
                            }}
                            className="rounded-md"
                        >
                            Xóa
                        </Button>
                    </Space>
                </div>
            </Modal>
        </>
    );
};