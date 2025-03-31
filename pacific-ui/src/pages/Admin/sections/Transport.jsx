import React, { useCallback, useEffect, useState } from 'react';
import {
    Button,
    Form,
    Image as AntImage,
    Input,
    InputNumber,
    message,
    Modal,
    Select,
    Space,
    Spin,
    Switch,
    Table,
    Tag,
    Upload,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import TransportServices from '~/services/TransportServices';

const { Option } = Select;

const Transport = () => {
    const [form] = Form.useForm();
    const [state, setState] = useState({
        transports: [],
        filteredTransports: [],
        searchText: "",
        modalVisible: false,
        isAdding: false,
        selectedTransport: null,
        imageUrl: "",
        file: null,
        loading: false,
    });

    const transportTypes = ['xe máy', 'ô tô', 'xe đạp', 'máy bay', 'tàu thủy'];

    const fetchTransports = useCallback(async () => {
        try {
            setState(prev => ({ ...prev, loading: true }));
            const response = await TransportServices.getTransports();
            const activeTransports = response
                .filter(t => !t.deleteAt)
                .map(t => ({
                    id: t.id,
                    name: t.name,
                    cost: t.cost || 0,
                    typeTransport: t.typeTransport,
                    active: t.active || false,
                    imageURL: t.imageURL || t.imageUrl || "",
                }));
            setState(prev => ({
                ...prev,
                transports: activeTransports,
                filteredTransports: activeTransports,
                loading: false,
            }));
        } catch (error) {
            message.error(error.message || "Lỗi tải dữ liệu phương tiện!");
            setState(prev => ({ ...prev, loading: false }));
        }
    }, []);

    useEffect(() => {
        fetchTransports();
    }, [fetchTransports]);

    useEffect(() => {
        if (!state.transports.length) return;

        const filtered = state.transports.filter(t =>
            (t.name?.toLowerCase() || "").includes(state.searchText.toLowerCase()) ||
            (t.typeTransport?.toLowerCase() || "").includes(state.searchText.toLowerCase())
        );
        setState(prev => ({ ...prev, filteredTransports: filtered }));
    }, [state.searchText, state.transports]);

    const handleOpenModal = (transport = null) => {
        form.resetFields();
        setState(prev => ({
            ...prev,
            isAdding: !transport,
            selectedTransport: transport,
            modalVisible: true,
            imageUrl: transport?.imageURL || "",
            file: null,
        }));

        if (transport) {
            form.setFieldsValue({
                name: transport.name,
                cost: transport.cost,
                typeTransport: transport.typeTransport,
                status: transport.active ? "active" : "inactive",
            });
        }
    };

    const handleCloseModal = () => {
        if (state.imageUrl && state.imageUrl.startsWith("blob:")) {
            URL.revokeObjectURL(state.imageUrl);
        }
        setState(prev => ({
            ...prev,
            modalVisible: false,
            selectedTransport: null,
            imageUrl: "",
            file: null,
        }));
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            setState(prev => ({ ...prev, loading: true }));

            let imageUrl = state.selectedTransport?.imageURL || ""; // Giữ ảnh cũ nếu không có ảnh mới
            if (state.file) {
                // Nếu có ảnh mới, tải lên trước và lấy URL
                imageUrl = await TransportServices.uploadTransportImage(
                    state.isAdding ? null : state.selectedTransport.id,
                    state.file
                );
            }

            const transportData = {
                name: values.name,
                cost: Number(values.cost),
                typeTransport: values.typeTransport,
                active: values.status === "active",
                imageURL: imageUrl, // Luôn gửi imageURL, kể cả giá trị cũ
            };

            let result;
            if (state.isAdding) {
                result = await TransportServices.addTransport(transportData);
                if (state.file && !imageUrl) {
                    imageUrl = await TransportServices.uploadTransportImage(result.id, state.file);
                    result.imageURL = imageUrl;
                }
                message.success("Thêm phương tiện thành công!");
            } else {
                result = await TransportServices.updateTransport(state.selectedTransport.id, transportData);
                message.success("Cập nhật phương tiện thành công!");
            }

            await fetchTransports();
            handleCloseModal();
        } catch (error) {
            message.error(error.message || "Lỗi khi lưu dữ liệu!");
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    const handleDelete = async (id) => {
        Modal.confirm({
            title: "Xác nhận xóa",
            content: "Bạn có chắc chắn muốn xóa phương tiện này?",
            onOk: async () => {
                try {
                    setState(prev => ({ ...prev, loading: true }));
                    await TransportServices.deleteTransport(id);
                    message.success("Xóa phương tiện thành công!");
                    await fetchTransports();
                } catch (error) {
                    message.error(error.message || "Lỗi khi xóa phương tiện!");
                } finally {
                    setState(prev => ({ ...prev, loading: false }));
                }
            },
        });
    };

    const handleSwitchChange = async (id, checked) => {
        try {
            setState(prev => ({
                ...prev,
                loading: true,
                transports: prev.transports.map(t =>
                    t.id === id ? { ...t, active: checked } : t
                ),
                filteredTransports: prev.filteredTransports.map(t =>
                    t.id === id ? { ...t, active: checked } : t
                ),
            }));

            await TransportServices.updateTransportStatus(id);
            message.success("Cập nhật trạng thái thành công!");
        } catch (error) {
            setState(prev => ({
                ...prev,
                transports: prev.transports.map(t =>
                    t.id === id ? { ...t, active: !checked } : t
                ),
                filteredTransports: prev.filteredTransports.map(t =>
                    t.id === id ? { ...t, active: !checked } : t
                ),
            }));
            message.error(error.message || "Lỗi khi cập nhật trạng thái!");
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    const handleImageUpload = ({ file }) => {
        if (!file.type.startsWith("image/")) {
            message.error("Chỉ được upload file ảnh!");
            return;
        }
        if (file.size / 1024 / 1024 >= 2) {
            message.error("Ảnh phải nhỏ hơn 2MB!");
            return;
        }

        setState(prev => ({
            ...prev,
            imageUrl: URL.createObjectURL(file),
            file,
        }));
    };

    const columns = [
        {
            title: "Hình ảnh",
            dataIndex: "imageURL",
            render: (imageURL) => (
                <AntImage
                    src={imageURL || "/placeholder-transport.jpg"}
                    alt="Phương tiện"
                    width={80}
                    height={50}
                    style={{ objectFit: "cover", borderRadius: 4 }}
                    fallback="/placeholder-transport.jpg"
                    preview={!!imageURL}
                />
            ),
        },
        {
            title: "Tên phương tiện",
            dataIndex: "name",
            sorter: (a, b) => a.name.localeCompare(b.name),
        },
        {
            title: "Chi phí",
            dataIndex: "cost",
            render: (cost) => (cost ? `${new Intl.NumberFormat("vi-VN").format(cost)} VNĐ` : "0 VNĐ"),
            sorter: (a, b) => a.cost - b.cost,
        },
        {
            title: "Loại phương tiện",
            dataIndex: "typeTransport",
            filters: transportTypes.map(type => ({ text: type, value: type })),
            onFilter: (value, record) => record.typeTransport === value,
        },
        {
            title: "Trạng thái",
            dataIndex: "active",
            render: (active) => (
                <Tag color={active ? "green" : "red"}>
                    {active ? "HOẠT ĐỘNG" : "NGỪNG HOẠT ĐỘNG"}
                </Tag>
            ),
            filters: [
                { text: "Hoạt động", value: true },
                { text: "Ngừng hoạt động", value: false },
            ],
            onFilter: (value, record) => record.active === value,
        },
        {
            title: "Hành động",
            render: (_, record) => (
                <Space>
                    <Button icon={<EditOutlined />} onClick={() => handleOpenModal(record)} type="text" />
                    <Button icon={<DeleteOutlined />} onClick={() => handleDelete(record.id)} danger type="text" />
                    <Switch checked={record.active} onChange={(checked) => handleSwitchChange(record.id, checked)} />
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <h1>Danh sách phương tiện</h1>
                <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()}>
                    Thêm phương tiện
                </Button>
            </div>

            <Input
                placeholder="Tìm kiếm theo tên hoặc loại phương tiện..."
                prefix={<SearchOutlined />}
                value={state.searchText}
                onChange={(e) => setState(prev => ({ ...prev, searchText: e.target.value }))}
                style={{ width: 300, marginBottom: 16 }}
                allowClear
            />

            <Spin spinning={state.loading}>
                <Table
                    columns={columns}
                    dataSource={state.filteredTransports}
                    rowKey="id"
                    bordered
                    scroll={{ x: "max-content" }}
                />
            </Spin>

            <Modal
                title={state.isAdding ? "Thêm phương tiện mới" : "Chỉnh sửa phương tiện"}
                open={state.modalVisible}
                onCancel={handleCloseModal}
                onOk={handleSave}
                okText={state.isAdding ? "Thêm" : "Lưu"}
                cancelText="Hủy"
                width={700}
                destroyOnClose
                confirmLoading={state.loading}
            >
                <Form form={form} layout="vertical" initialValues={{ status: "active" }}>
                    <Form.Item
                        name="name"
                        label="Tên phương tiện"
                        rules={[{ required: true, message: "Vui lòng nhập tên phương tiện!" }]}
                    >
                        <Input placeholder="Nhập tên phương tiện" />
                    </Form.Item>

                    <Form.Item
                        name="cost"
                        label="Chi phí (VNĐ)"
                        rules={[{ required: true, message: "Vui lòng nhập chi phí!" }]}
                    >
                        <InputNumber
                            style={{ width: "100%" }}
                            min={0}
                            formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                            parser={value => value.replace(/\$\s?|(,*)/g, "")}
                            placeholder="Nhập chi phí"
                        />
                    </Form.Item>

                    <Form.Item
                        name="typeTransport"
                        label="Loại phương tiện"
                        rules={[{ required: true, message: "Vui lòng chọn loại phương tiện!" }]}
                    >
                        <Select placeholder="Chọn loại phương tiện">
                            {transportTypes.map(type => (
                                <Option key={type} value={type}>{type}</Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item name="status" label="Trạng thái">
                        <Select>
                            <Option value="active">Hoạt động</Option>
                            <Option value="inactive">Ngừng hoạt động</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="Hình ảnh">
                        <Upload
                            name="image"
                            listType="picture-card"
                            showUploadList={false}
                            customRequest={handleImageUpload}
                            beforeUpload={() => false}
                            accept="image/*"
                        >
                            {state.imageUrl ? (
                                <img
                                    src={state.imageUrl}
                                    alt="Ảnh phương tiện"
                                    style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }}
                                />
                            ) : (
                                <div>
                                    <UploadOutlined />
                                    <div style={{ marginTop: 8 }}>Tải ảnh lên</div>
                                </div>
                            )}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default Transport;