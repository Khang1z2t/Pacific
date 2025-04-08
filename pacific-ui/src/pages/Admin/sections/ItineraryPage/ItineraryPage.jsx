import React, { useState, useEffect } from 'react';
import { Select, Button, Table, Modal, Form, Input, InputNumber, Space, Tooltip, Tabs } from 'antd';
import ItineraryServices from '~/services/ItineraryServices';
import TourServices from '~/services/TourServices';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TabPane } = Tabs;

export const ItineraryPage = () => {
    const [tours, setTours] = useState([]); // Danh sách tours
    const [selectedTour, setSelectedTour] = useState(null); // Tour được chọn
    const [itineraries, setItineraries] = useState([]); // Danh sách lịch trình
    const [editModalVisible, setEditModalVisible] = useState(false); // Trạng thái modal chỉnh sửa
    const [editItinerary, setEditItinerary] = useState(null); // Lịch trình được chọn để chỉnh sửa
    const [isModalOpen, setIsModalOpen] = useState(false); // Trạng thái modal thêm
    const [form] = Form.useForm(); // Form thêm lịch trình
    const [editForm] = Form.useForm(); // Form chỉnh sửa lịch trình

    // Lấy danh sách tours khi component mount
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await TourServices.getAllTour({});
                setTours(response.data);
            } catch (error) {
                console.error('Failed to fetch tours:', error);
            }
        };
        fetchTours();
    }, []);

    // Lấy danh sách lịch trình khi chọn tour
    useEffect(() => {
        if (selectedTour) {
            const fetchItineraries = async () => {
                try {
                    const response = await ItineraryServices.getByTourId(selectedTour.id);
                    setItineraries(response.data);
                } catch (error) {
                    console.error('Failed to fetch itineraries:', error);
                }
            };
            fetchItineraries();
        }
    }, [selectedTour]);

    // Xử lý khi chọn tour
    const handleTourChange = (value) => {
        const tour = tours.find(t => t.id === value);
        setSelectedTour(tour);
    };

    // Mở modal thêm lịch trình
    const showModal = () => {
        if (!selectedTour) {
            alert('Vui lòng chọn một tour trước!');
            return;
        }
        setIsModalOpen(true);
        const initialDays = Array.from({ length: selectedTour.duration }, (_, i) => ({
            dayNumber: i + 1,
            title: '',
            notes: '',
        }));
        form.setFieldsValue({ days: initialDays });
    };

    // Xử lý khi submit form thêm lịch trình
    const handleAddItinerary = async (values) => {
        try {
            const response = await ItineraryServices.AddItinerary(selectedTour.id, values);
            setItineraries(response.data);
            setIsModalOpen(false);
            form.resetFields();
        } catch (error) {
            console.error('Failed to add itinerary:', error);
        }
    };

    // Mở modal chỉnh sửa lịch trình
    const showEditModal = (record) => {
        setEditItinerary(record);
        setEditModalVisible(true);
        editForm.setFieldsValue({
            dayNumber: record.dayNumber,
            title: record.title,
            notes: record.notes,
        });
    };

    // Xử lý khi submit form chỉnh sửa lịch trình
    const handleEditItinerary = async (values) => {
        try {
            // Giả sử bạn có API update itinerary, thay đổi theo API thực tế của bạn
            const updatedItinerary = { ...editItinerary, ...values };
            // Gọi API update (nếu có), tạm thời giả lập cập nhật local
            const updatedItineraries = itineraries.map(item =>
                item.id === updatedItinerary.id ? updatedItinerary : item,
            );
            setItineraries(updatedItineraries);
            setEditModalVisible(false);
            editForm.resetFields();
        } catch (error) {
            console.error('Failed to edit itinerary:', error);
        }
    };

    // Cột cho Table
    const columns = [
        { title: 'Ngày', dataIndex: 'dayNumber', key: 'dayNumber' },
        { title: 'Tiêu đề', dataIndex: 'title', key: 'title' },
        {
            title: 'Mô tả',
            dataIndex: 'notes',
            key: 'notes',
            render: text => <div dangerouslySetInnerHTML={{ __html: text }} />,
        },
        {
            title: 'Thao tác',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Tooltip title="Chỉnh sửa lịch trình">
                        <Button
                            icon={<EditOutlined />}
                            type="text"
                            onClick={() => showEditModal(record)}
                        />
                    </Tooltip>
                    <Tooltip title="Xóa lịch trình">
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => console.log('Xóa lịch trình:', record)} // Thêm logic xóa nếu có API
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Quản lý Lịch trình</h1>
                <Space>
                    <Select
                        placeholder="Chọn tour"
                        style={{ width: 300 }}
                        options={tours}
                        fieldNames={{ label: 'title', value: 'id' }}
                        optionFilterProp="title"
                        showSearch
                        onChange={handleTourChange}
                        value={selectedTour?.id}
                    />
                    <Button type="primary" onClick={showModal}>
                        Thêm lịch trình
                    </Button>
                </Space>
            </div>

            {/* Table hiển thị lịch trình */}
            <Table
                columns={columns}
                dataSource={itineraries}
                rowKey="id"
                pagination={false}
                locale={{ emptyText: 'Chưa có lịch trình nào' }}
            />

            {/* Modal thêm lịch trình */}
            <Modal
                title={`Thêm lịch trình cho tour ${selectedTour?.title}`}
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                footer={null}
                width={700}
            >
                <Form form={form} onFinish={handleAddItinerary} layout="vertical">
                    <Form.List name="days">
                        {(fields) => (
                            <Tabs defaultActiveKey="0" tabPosition="left">
                                {fields.map((field, index) => (
                                    <TabPane tab={`Ngày ${index + 1}`} key={index}>
                                        <Form.Item name={[field.name, 'dayNumber']} hidden>
                                            <InputNumber />
                                        </Form.Item>
                                        <Form.Item
                                            label="Tiêu đề"
                                            name={[field.name, 'title']}
                                            rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                        <Form.Item
                                            label="Ghi chú"
                                            name={[field.name, 'notes']}
                                            rules={[{ required: true, message: 'Vui lòng nhập ghi chú' }]}
                                        >
                                            <Input.TextArea rows={4} />
                                        </Form.Item>
                                    </TabPane>
                                ))}
                                <TabPane tab="Lưu" key="save">
                                    <Button type="primary" htmlType="submit">
                                        Lưu lịch trình
                                    </Button>
                                </TabPane>
                            </Tabs>
                        )}
                    </Form.List>
                </Form>
            </Modal>

            {/* Modal chỉnh sửa lịch trình */}
            <Modal
                title={`Chỉnh sửa lịch trình - Ngày ${editItinerary?.dayNumber}`}
                open={editModalVisible}
                onCancel={() => setEditModalVisible(false)}
                footer={null}
            >
                <Form form={editForm} onFinish={handleEditItinerary} layout="vertical">
                    <Form.Item name="dayNumber" hidden>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item
                        label="Tiêu đề"
                        name="title"
                        rules={[{ required: true, message: 'Vui lòng nhập tiêu đề' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Ghi chú"
                        name="notes"
                        rules={[{ required: true, message: 'Vui lòng nhập ghi chú' }]}
                    >
                        <Input.TextArea rows={4} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Cập nhật
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};