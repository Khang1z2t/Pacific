import { Form, Input, InputNumber, message, Modal, Select, Switch } from 'antd';
import React, { useEffect, useState } from 'react';
import TourServices from '~/services/TourServices';

const { TextArea } = Input;

export const EditTour = ({ editModalVisible, setEditModalVisible, category, destination, setLoading, tourData }) => {
    const [form] = Form.useForm();
    const [selectedDestination, setSelectedDestination] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    // Đặt giá trị ban đầu cho form và selectedDestination khi modal mở
    useEffect(() => {
        if (editModalVisible && tourData) {
            form.setFieldsValue({
                title: tourData.title,
                description: tourData.description,
                duration: tourData.duration,
                status: tourData.status,
                active: tourData.active,
                categoryId: tourData.categoryId,
                destinationId: tourData.destinationId,
            });
            console.log('tourData', tourData);
            console.log('destination', destination);
            // Cập nhật selectedDestination dựa trên tourData.destination (id)
            const initialDestination = destination.find((dest) => dest.id === tourData.destinationId);
            setSelectedDestination(initialDestination || null);
        }
    }, [editModalVisible, tourData, destination, form]);

    // Xử lý khi chọn destination
    const handleDestinationChange = (value) => {
        const selected = destination.find((dest) => dest.id === value);
        setSelectedDestination(selected || null);
    };

    // Xử lý submit form
    const handleOk = async () => {
        try {
            setSubmitting(true);
            const values = await form.validateFields();
            const formData = new FormData();

            // Thêm các trường vào FormData
            formData.append('title', values.title);
            formData.append('description', values.description);
            formData.append('duration', values.duration);
            formData.append('status', values.status);
            formData.append('active', values.active);
            formData.append('categoryId', values.categoryId);
            formData.append('destinationId', values.destinationId);

            // Gọi API updateTour
            await TourServices.updateTour(tourData.id, formData);
            message.success('Cập nhật tour thành công!');
            setLoading(true); // Trigger reload danh sách tour
            setEditModalVisible(false); // Đóng modal
        } catch (error) {
            console.error('Error updating tour:', error);
            message.error(`Cập nhật tour thất bại: ${error.message || 'Có lỗi xảy ra'}`);
        } finally {
            setSubmitting(false);
        }
    };

    // Xử lý đóng modal
    const handleCancel = () => {
        setEditModalVisible(false);
        setSelectedDestination(null);
        form.resetFields(); // Reset form khi đóng
    };

    return (
        <Modal
            title={<span className="text-xl font-bold text-gray-800">Chỉnh sửa tour</span>}
            open={editModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText="Lưu"
            cancelText="Đóng"
            okButtonProps={{ loading: submitting }}
            width={900}
            bodyStyle={{ padding: '24px' }}
            className="rounded-lg"
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={{
                    title: '',
                    description: '',
                    duration: 1,
                    status: 'PUBLISHED',
                    active: true,
                    categoryId: '',
                    destinationId: '',
                }}
            >
                <div className="space-y-6">
                    {/* Nhóm thông tin cơ bản */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Thông tin cơ bản</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                                name="title"
                                label={<span className="font-medium text-gray-700">Tên tour</span>}
                                rules={[{ required: true, message: 'Vui lòng nhập tên tour!' }]}
                            >
                                <Input placeholder="Nhập tên tour" className="rounded-md" />
                            </Form.Item>

                            <Form.Item
                                name="duration"
                                label={<span className="font-medium text-gray-700">Thời gian (ngày)</span>}
                                rules={[{ required: true, message: 'Vui lòng nhập thời gian tour!' }]}
                            >
                                <InputNumber min={1} max={30} className="w-full rounded-md" />
                            </Form.Item>
                        </div>

                        <Form.Item
                            name="description"
                            label={<span className="font-medium text-gray-700">Mô tả</span>}
                            rules={[{ required: true, message: 'Vui lòng nhập mô tả tour!' }]}
                        >
                            <TextArea
                                rows={4}
                                placeholder="Nhập mô tả tour"
                                className="rounded-md"
                            />
                        </Form.Item>
                    </div>

                    {/* Nhóm trạng thái */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Trạng thái</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item
                                name="status"
                                label={<span className="font-medium text-gray-700">Trạng thái bán</span>}
                                rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                            >
                                <Select placeholder="Chọn trạng thái"
                                        className="rounded-md"
                                        options={[
                                            { value: 'PUBLISHED', label: 'Đang bán' },
                                            { value: 'DRAFT', label: 'Ngừng bán' },
                                        ]}
                                />
                            </Form.Item>

                            <Form.Item
                                name="active"
                                label={<span className="font-medium text-gray-700">Ẩn/Hiện tour</span>}
                                valuePropName="checked"
                            >
                                <Switch checkedChildren="Hiện" unCheckedChildren="Ẩn" />
                            </Form.Item>
                        </div>
                    </div>

                    {/* Nhóm danh mục và điểm đến */}
                    <div className="bg-white p-4 rounded-lg shadow-sm">
                        <h3 className="text-lg font-semibold text-gray-700 mb-4">Danh mục & Điểm đến</h3>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <Form.Item
                                name="categoryId"
                                label={<span className="font-medium text-gray-700">Danh mục</span>}
                                rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                            >
                                <Select
                                    placeholder="Chọn danh mục"
                                    className="rounded-md"
                                    showSearch
                                    options={category}
                                    fieldNames={{ value: 'id', label: 'title' }}
                                    filterOption={(input, option) =>
                                        option.label.toLowerCase().includes(input.toLowerCase())
                                    }
                                    optionFilterProp="label"
                                />
                            </Form.Item>
                        </div>

                        <div className="space-y-4">
                            <Form.Item
                                name="destinationId"
                                label={<span className="font-medium text-gray-700">Điểm đến</span>}
                                rules={[{ required: true, message: 'Vui lòng chọn điểm đến!' }]}
                            >
                                <Select
                                    showSearch
                                    options={destination.map((dest) => ({
                                        value: dest.id,
                                        label: `${dest.city} - ${dest.country} - ${dest.name}`,
                                    }))}
                                    placeholder="Chọn điểm đến"
                                    onChange={handleDestinationChange}
                                    filterOption={(input, option) =>
                                        option.label.toLowerCase().includes(input.toLowerCase())
                                    }
                                    notFoundContent="Không có điểm đến nào"
                                    className="rounded-md"
                                />
                            </Form.Item>

                            {selectedDestination ? (
                                <div className="bg-gray-50 p-4 rounded-lg space-y-4">
                                    <h3 className="text-lg font-semibold text-gray-700">Thông tin điểm đến</h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <Form.Item label="Quốc gia">
                                            <Input
                                                disabled
                                                value={selectedDestination.country || ''}
                                                placeholder="Quốc gia"
                                                className="bg-white rounded-md"
                                            />
                                        </Form.Item>
                                        <Form.Item label="Thành phố">
                                            <Input
                                                disabled
                                                value={selectedDestination.city || ''}
                                                placeholder="Thành phố"
                                                className="bg-white rounded-md"
                                            />
                                        </Form.Item>
                                        <Form.Item label="Địa chỉ đầy đủ">
                                            <Input
                                                disabled
                                                value={selectedDestination.fullAddress || ''}
                                                placeholder="Địa chỉ đầy đủ"
                                                className="bg-white rounded-md"
                                            />
                                        </Form.Item>
                                        <Form.Item label="Khu vực">
                                            <Input
                                                disabled
                                                value={selectedDestination.region ? 'Ngoài nước' : 'Trong nước'}
                                                placeholder="Khu vực"
                                                className="bg-white rounded-md"
                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-red-500">Điểm đến không hợp lệ hoặc chưa được chọn</div>
                            )}
                        </div>
                    </div>
                </div>
            </Form>
        </Modal>
    );
};