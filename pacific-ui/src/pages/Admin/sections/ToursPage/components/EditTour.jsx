import { Form, Input, InputNumber, message, Modal, Select, Switch } from 'antd';
import React, { useEffect } from 'react';
import TourServices from '~/services/TourServices';

const { Option } = Select;
const { TextArea } = Input;

export const EditTour = ({ editModalVisible, setEditModalVisible, category, destination, setLoading, tourData }) => {
    const [form] = Form.useForm();
    // Đặt giá trị ban đầu cho form khi modal mở
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
        }
    }, [editModalVisible, tourData, form]);

    // Xử lý submit form
    const handleOk = async () => {
        try {
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
            message.error('Cập nhật tour thất bại!');
        }
    };

    // Xử lý đóng modal
    const handleCancel = () => {
        setEditModalVisible(false);
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
            width={800}
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
                    status: 'ACTIVE',
                    active: true,
                    categoryId: '',
                    destinationId: '',
                }}
            >
                <Form.Item
                    name="title"
                    label={<span className="font-medium text-gray-700">Tên tour</span>}
                    rules={[{ required: true, message: 'Vui lòng nhập tên tour!' }]}
                >
                    <Input placeholder="Nhập tên tour" className="rounded-md" />
                </Form.Item>

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

                <Form.Item
                    name="duration"
                    label={<span className="font-medium text-gray-700">Thời gian (ngày)</span>}
                    rules={[{ required: true, message: 'Vui lòng nhập thời gian tour!' }]}
                >
                    <InputNumber min={1} max={30} className="w-full rounded-md" />
                </Form.Item>

                <Form.Item
                    name="status"
                    label={<span className="font-medium text-gray-700">Trạng thái bán</span>}
                    rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                >
                    <Select placeholder="Chọn trạng thái" className="rounded-md">
                        <Option value="ACTIVE">Đang bán</Option>
                        <Option value="DRAFT">Hết tour</Option>
                    </Select>
                </Form.Item>

                <Form.Item
                    name="active"
                    label={<span className="font-medium text-gray-700">Ẩn/Hiện tour</span>}
                    valuePropName="checked"
                >
                    <Switch checkedChildren="Hiện" unCheckedChildren="Ẩn" />
                </Form.Item>

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

                <Form.Item
                    name="destinationId"
                    label={<span className="font-medium text-gray-700">Điểm đến</span>}
                    rules={[{ required: true, message: 'Vui lòng chọn điểm đến!' }]}
                >
                    <Select placeholder="Chọn điểm đến" className="rounded-md"
                            showSearch
                            options={destination}
                            fieldNames={{ value: 'id', label: 'country' }}
                            filterOption={(input, option) =>
                                option.label.toLowerCase().includes(input.toLowerCase())
                            }
                            optionFilterProp="label" />
                </Form.Item>
            </Form>
        </Modal>
    );
};