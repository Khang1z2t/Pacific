import React, { useState, useEffect, useCallback } from 'react';
import {
    Button,
    Image,
    Rate,
    Table,
    Typography,
    message,
    Tooltip,
    Space,
    Modal,
    Form,
    Input,
    InputNumber,
    Upload,
} from 'antd';
import { RefreshCwIcon } from 'lucide-react';
import HotelServices from '~/services/HotelServices';
import config from '~/config';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    LoadingOutlined,
    SearchOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';

const { Title } = Typography;

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
        return Upload.LIST_IGNORE; // Prevent upload
    }
    const isLt5M = file.size / 1024 / 1024 < 5; // Limit to 5MB
    if (!isLt5M) {
        message.error('Ảnh phải nhỏ hơn 5MB!');
        return Upload.LIST_IGNORE; // Prevent upload
    }
    return false; // Prevent automatic upload, handle manually in form submission
};

export const HotelPage = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(false);
    const [addHotelModalVisible, setAddHotelModalVisible] = useState(false);
    const [editHotelModalVisible, setEditHotelModalVisible] = useState(false);
    const [selectedHotel, setSelectedHotel] = useState(null);
    const [deleteHotelModalVisible, setDeleteHotelModalVisible] = useState(false);
    const [form] = Form.useForm(); // Form instance for managing form state
    const [image, setimage] = useState(null); // State for image preview
    const [imageLoading, setImageLoading] = useState(false); // State for image upload loading

    const fetchHotels = useCallback(async () => {
        setLoading(true);
        try {
            const response = await HotelServices.getAllHotels();
            setHotels(response.data || []);
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
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('rating', values.rating);
            formData.append('cost', values.cost);
            formData.append('typeHotel', values.typeHotel);
            if (values.image && values.image.length > 0) {
                formData.append('image', values.image[0].originFileObj); // Use the first file in fileList
            }
            await HotelServices.createHotel(formData); // Assuming this handles FormData
            message.success('Thêm khách sạn thành công!');
            setAddHotelModalVisible(false);
            setimage(null); // Reset image preview
            form.resetFields(); // Reset form after submission
            fetchHotels(); // Refresh hotel list
        } catch (error) {
            console.error('Error adding hotel:', error);
            message.error('Không thể thêm khách sạn!');
        } finally {
            setLoading(false);
        }
    };

    // Handle image upload change for preview
    const handleImageChange = ({ fileList }) => {
        if (fileList.length > 0) {
            const file = fileList[0].originFileObj;
            if (file) {
                setImageLoading(true);
                getBase64(file, (url) => {
                    setImageLoading(false);
                    setimage(url);
                });
            }
        } else {
            setimage(null);
            setImageLoading(false);
        }
    };
    const handleDeleteHotel = async (id) => {
        try {
            await HotelServices.deleteHotel(id);
            message.success('Xóa khách sạn thành công!');
            fetchHotels();
        } catch (error) {
            console.error('Error deleting hotel:', error);
            message.error('Không thể xóa khách sạn!');
        }
    };

    const handleEditHotel = async (values) => {
        setLoading(true);
        try {
            // const formData = new FormData();
            // formData.append('name', values.name);
            // formData.append('rating', values.rating);
            // formData.append('cost', values.cost);
            // formData.append('typeHotel', values.typeHotel);
            // if (values.image && values.image.length > 0) {
            //     formData.append('image', values.image[0].originFileObj); // Use the first file in fileList
            // }
            const body = {
                name: values.name,
                rating: values.rating,
                cost: values.cost,
                typeHotel: values.typeHotel,
            }
            await HotelServices.updateHotel(selectedHotel.id, body); // Assuming this handles FormData
            message.success('Cập nhật khách sạn thành công!');
            setEditHotelModalVisible(false);
            setimage(null); // Reset image preview
            form.resetFields(); // Reset form after submission
            fetchHotels(); // Refresh hotel list
        } catch (error) {
            console.error('Error updating hotel:', error);
            message.error('Không thể cập nhật khách sạn!');
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
            filterIcon: filtered => (
                <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
            ),
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
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
                <Image
                    src={config.imageConfig.getImage(image)}
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
                        <Button
                            onClick={() => {
                                setSelectedHotel(record);
                                setDeleteHotelModalVisible(true);
                            }}
                            danger
                            icon={<DeleteOutlined />} />
                    </Tooltip>
                    <Tooltip title="Xem chi tiết">
                        <Button
                            onClick={() => {
                                setSelectedHotel(record);
                                form.setFieldsValue({
                                    name: record.name,
                                    rating: record.rating,
                                    cost: record.cost,
                                    typeHotel: record.typeHotel,
                                });
                                setEditHotelModalVisible(true);
                            }}
                            icon={<EditOutlined />} />
                    </Tooltip>
                </Space>
            ),
            width: 120,
        },
    ];

    // Upload button UI
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {imageLoading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    );

    const handleRefresh = () => {
        setLoading(true);
        message.success('Danh sách khách sạn đã được cập nhật!',1);
        fetchHotels();
    }
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
                                onClick={handleRefresh}
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
                onCancel={() => {
                    setAddHotelModalVisible(false);
                    setimage(null); // Reset image preview on cancel
                }}
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
                        name="image"
                        label="Ảnh khách sạn"
                        rules={[{ required: true, message: 'Vui lòng tải lên ảnh khách sạn!' }]}
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e && e.fileList;
                        }}
                    >
                        <Upload
                            listType="picture-card"
                            showUploadList={false}
                            beforeUpload={beforeUpload}
                            onChange={handleImageChange}
                        >
                            {image ? (
                                <img src={image} alt="hotel"
                                     style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                uploadButton
                            )}
                        </Upload>
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Thêm khách sạn
                            </Button>
                            <Button
                                onClick={() => {
                                    setAddHotelModalVisible(false);
                                    setimage(null);
                                }}
                            >
                                Hủy
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Delete Hotel Confirmation Modal */}
            <Modal
                open={deleteHotelModalVisible}
                centered
                onCancel={() => setDeleteHotelModalVisible(false)}
                title={
                    <div className="flex items-center gap-2">
                        <ExclamationCircleOutlined className="text-red-500 text-xl" />
                        <span className="text-lg font-semibold text-gray-800">Xác nhận xóa khách sạn</span>
                    </div>
                }
                footer={null}
                width={400}
                className="rounded-lg shadow-lg"
                bodyStyle={{ padding: '20px', background: 'linear-gradient(to bottom right, #fef2f2, #fee2e2)' }}
            >
                <div className="flex flex-col items-center gap-4">
                    <p className="text-gray-700 text-center">
                        Bạn có chắc chắn muốn xóa khách sạn <strong>{selectedHotel?.name}</strong> không?
                    </p>
                    <Space>
                        <Button
                            onClick={() => setDeleteHotelModalVisible(false)}
                            className="rounded-md border-gray-300"
                        >
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                handleDeleteHotel(selectedHotel.id);
                                setDeleteHotelModalVisible(false);
                            }}
                            className="rounded-md"
                        >
                            Xóa
                        </Button>
                    </Space>
                </div>
            </Modal>

            {/* Edit Hotel Modal */}
            <Modal
                open={editHotelModalVisible}
                onCancel={() => {
                    setEditHotelModalVisible(false);
                    setimage(null); // Reset image preview on cancel
                }}
                title="Chỉnh sửa khách sạn"
                footer={null}
                width={800}
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={handleEditHotel}
                    initialValues={{
                        name: selectedHotel?.name,
                        rating: selectedHotel?.rating,
                        cost: selectedHotel?.cost,
                        typeHotel: selectedHotel?.typeHotel,
                    }}
                >
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
                        name="image"
                        label="Ảnh khách sạn"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e && e.fileList;
                        }}
                    >
                        {/*<Upload*/}
                        {/*    listType="picture-card"*/}
                        {/*    showUploadList={false}*/}
                        {/*    beforeUpload={beforeUpload}*/}
                        {/*    onChange={handleImageChange}*/}
                        {/*    fileList={selectedHotel?.image ? [{ originFileObj: selectedHotel?.image }] : []} // Show current image if available*/}
                        {/*>*/}
                        {/*    {selectedHotel?.image ? (*/}
                        {/*        <img src={config.imageConfig.getImage(selectedHotel?.image)} alt="hotel"*/}
                        {/*             style={{ width: '100%', height: '100%', objectFit: 'cover' }} />*/}
                        {/*    ) : (*/}
                        {/*        uploadButton*/}
                        {/*    )}*/}
                        {/*</Upload>*/}
                        <Image
                            src={config.imageConfig.getImage(selectedHotel?.image)}
                            alt="Hotel"
                            width={100}
                            height={100}
                            className="object-cover rounded-md"
                            preview
                            style={{ marginBottom: 16 }}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Cập nhật khách sạn
                            </Button>
                            <Button
                                onClick={() => {
                                    setEditHotelModalVisible(false);
                                    setimage(null);
                                }}
                            >
                                Hủy
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};