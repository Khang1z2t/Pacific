import {
    Button,
    DatePicker,
    Form,
    Input,
    Modal,
    Space,
    Table,
    Typography,
    message,
    InputNumber,
    Switch,
    Select,
    Row,
    Col,
    Tooltip,
} from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    ReloadOutlined,
    SearchOutlined,
    ExclamationCircleOutlined,
} from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import VoucherServices from '~/services/VoucherServices';
import CategoryServices from '~/services/CategoryServices';
import config from '~/config';
import moment from 'moment';
import { FaCheckCircle } from 'react-icons/fa';

const { Title } = Typography;
const { Option } = Select;

export const VoucherPage = () => {
    const [form] = Form.useForm();
    const [vouchers, setVouchers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [isDeleteMode, setIsDeleteMode] = useState(false);

    const fetchVouchers = async () => {
        setLoading(true);
        try {
            const response = await VoucherServices.getAllVouchers();
            setVouchers(response.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const response = await CategoryServices.getCategories();
            setCategories(response);
        } catch (err) {
            console.error('Error fetching categories:', err);
            message.error('Không thể tải danh sách danh mục!');
        }
    };

    useEffect(() => {
        fetchVouchers();
    }, []);

    useEffect(() => {
        if (open || isEditMode) {
            fetchCategories();
        }
    }, [open, isEditMode]);

    const handleEdit = (record) => {
        setSelectedVoucher(record);
        setIsEditMode(true);
        form.setFieldsValue({
            title: record.title,
            codeVoucher: record.codeVoucher,
            discountValue: record.discountValue,
            quantity: record.quantity,
            userLimit: record.userLimit,
            minOrderValue: record.minOrderValue,
            maxDiscountAmount: record.maxDiscountAmount,
            firstTimeUserOnly: record.firstTimeUserOnly,
            status: record.status,
            startDate: moment(record.startDate),
            endDate: moment(record.endDate),
            applyTo: record.applyTo,
            tourId: record.tourId,
            categoryId: record.categoryId,
        });
    };

    const handleActiveVoucher = async (id) => {
        try {
            setLoading(true);
            await VoucherServices.updateVoucherStatus(id, 'ACTIVE'); // Truyền status trực tiếp
            message.success('Kích hoạt voucher thành công!');
            fetchVouchers();
        } catch (error) {
            console.error(error);
            message.error('Có lỗi xảy ra khi kích hoạt voucher!');
        } finally {
            setLoading(false);
        }
    };

    const columns = [
        {
            title: 'Mã voucher',
            dataIndex: 'codeVoucher',
            key: 'codeVoucher',
            width: 200,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Tìm mã voucher`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={confirm}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button type="primary" onClick={confirm} icon={<SearchOutlined />} size="small"
                                style={{ width: 90 }}>
                            Tìm
                        </Button>
                        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            sorter: (a, b) => a.codeVoucher.localeCompare(b.codeVoucher),
            sortDirections: ['ascend', 'descend'],
            filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => record.codeVoucher.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Tên voucher',
            dataIndex: 'title',
            key: 'title',
            width: 200,
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder={`Tìm tên voucher`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={confirm}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button type="primary" onClick={confirm} icon={<SearchOutlined />} size="small"
                                style={{ width: 90 }}>
                            Tìm
                        </Button>
                        <Button onClick={clearFilters} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortDirections: ['ascend', 'descend'],
            filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => record.title.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Giá trị',
            dataIndex: 'discountValue',
            key: 'discountValue',
            width: 100,
            render: (text) => `${text} %`,
            sorter: (a, b) => a.discountValue - b.discountValue,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            width: 150,
            render: (text) => `${config.webConfig.convertDateNoTime(text)}`,
            sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
            width: 150,
            render: (text) => `${config.webConfig.convertDateNoTime(text)}`,
            sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            width: 150,
            render: (text) => (
                <span style={{ color: text === 'ACTIVE' ? 'green' : 'red' }}>
          {text === 'ACTIVE' ? 'Hoạt động' : 'Không hoạt động'}
        </span>
            ),
        },
        {
            title: 'Hành động',
            key: 'action',
            width: 150,
            render: (text, record) => (
                <Space>
                    <Tooltip title="Xóa Voucher">
                        <Button
                            onClick={() => {
                                setSelectedVoucher(record);
                                setIsDeleteMode(true);
                            }}
                            danger
                            icon={<DeleteOutlined />}
                        />
                    </Tooltip>
                    <Tooltip title="Chỉnh sửa voucher">
                        <Button onClick={() => handleEdit(record)} icon={<EditOutlined />} />
                    </Tooltip>
                    <Tooltip title={'Kích hoạt voucher'}>
                        <Button icon={<FaCheckCircle color={'green'} />}
                                disabled={record.status === 'ACTIVE'}
                                onClick={() => handleActiveVoucher(record?.id)}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const handleAddVoucher = async (values) => {
        const {
            title,
            codeVoucher,
            discountValue,
            quantity,
            userLimit,
            minOrderValue,
            maxDiscountAmount,
            firstTimeUserOnly,
            status,
            startDate,
            endDate,
            applyTo,
            tourId,
            categoryId,
        } = values;
        try {
            setLoading(true);
            await VoucherServices.addVoucher({
                title: title || '',
                codeVoucher: codeVoucher || '',
                discountValue: discountValue || 0,
                quantity: quantity || 0,
                userLimit: userLimit || 0,
                minOrderValue: minOrderValue || 0,
                maxDiscountAmount: maxDiscountAmount || 0,
                firstTimeUserOnly: firstTimeUserOnly || true,
                status: status || 'ACTIVE',
                startDate: startDate ? startDate.format('YYYY-MM-DDTHH:mm:ss') : null,
                endDate: endDate ? endDate.format('YYYY-MM-DDTHH:mm:ss') : null,
                applyTo: applyTo || 'ALL',
                tourId: tourId || null,
                categoryId: categoryId || null,
            });
            message.success('Thêm voucher thành công!');
            fetchVouchers();
            setOpen(false);
            form.resetFields();
        } catch (error) {
            console.error(error);
            message.error('Có lỗi xảy ra khi thêm voucher!');
        } finally {
            setLoading(false);
        }
    };

    const handleEditVoucher = async (values) => {
        try {
            setLoading(true);
            await VoucherServices.updateVoucher(selectedVoucher.id, {
                title: values.title || '',
                codeVoucher: values.codeVoucher || '',
                discountValue: values.discountValue || 0,
                quantity: values.quantity || 0,
                userLimit: values.userLimit || 0,
                minOrderValue: values.minOrderValue || 0,
                maxDiscountAmount: values.maxDiscountAmount || 0,
                firstTimeUserOnly: values.firstTimeUserOnly || true,
                status: values.status || 'ACTIVE',
                startDate: values.startDate ? values.startDate.format('YYYY-MM-DDTHH:mm:ss') : null,
                endDate: values.endDate ? values.endDate.format('YYYY-MM-DDTHH:mm:ss') : null,
                applyTo: values.applyTo || 'ALL',
                tourId: values.tourId || null,
                categoryId: values.categoryId || null,
            });
            message.success('Cập nhật voucher thành công!');
            fetchVouchers();
            setIsEditMode(false);
            form.resetFields();
        } catch (error) {
            console.error(error);
            message.error('Có lỗi xảy ra khi cập nhật voucher!');
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteVoucher = async (id) => {
        try {
            setLoading(true);
            await VoucherServices.deleteVoucher(id);
            message.success('Xóa voucher thành công!');
            fetchVouchers();
        } catch (error) {
            console.error(error);
            message.error('Có lỗi xảy ra khi xóa voucher!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen font-sans">
                <div className="bg-white p-4 rounded shadow-lg">
                    <Table
                        columns={columns}
                        dataSource={vouchers}
                        pagination={{
                            pageSize: 10,
                            total: vouchers.length,
                        }}
                        rowKey="id"
                        bordered
                        title={() => (
                            <div className="flex justify-between items-center">
                                <Title level={4}>Danh sách voucher</Title>
                                <div className="flex gap-2">
                                    <Button onClick={() => setOpen(true)} type="primary">
                                        Thêm voucher
                                    </Button>
                                    <Button onClick={fetchVouchers} icon={<ReloadOutlined />} type="default">
                                        Làm mới
                                    </Button>
                                </div>
                            </div>
                        )}
                        loading={loading}
                    />
                </div>
            </div>

            {/* Add Voucher Modal */}
            <Modal
                open={open}
                onCancel={() => {
                    setOpen(false);
                    form.resetFields();
                }}
                title={<span className="text-lg font-semibold text-gray-800">Thêm voucher mới</span>}
                footer={null}
                width={800}
                className="rounded-lg shadow-lg"
                bodyStyle={{ padding: '24px', background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)' }}
            >
                <Form form={form} onFinish={handleAddVoucher} layout="vertical">
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Tên voucher</span>}
                            name="title"
                            rules={[{ required: true, message: 'Vui lòng nhập tên voucher!' }]}
                            className="col-span-2"
                        >
                            <Input placeholder="Nhập tên voucher" className="rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Mã voucher</span>}
                            name="codeVoucher"
                            rules={[{ required: true, message: 'Vui lòng nhập mã voucher!' }]}
                        >
                            <Input placeholder="Nhập mã voucher" className="rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Giá trị giảm giá (%)</span>}
                            name="discountValue"
                            rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm giá!' }]}
                        >
                            <InputNumber min={0} max={100} className="w-full rounded-md"
                                         placeholder="Nhập giá trị giảm giá" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Số lượng</span>}
                            name="quantity"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                        >
                            <InputNumber min={0} className="w-full rounded-md" placeholder="Nhập số lượng" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Giới hạn sử dụng mỗi người</span>}
                            name="userLimit"
                            rules={[{ required: true, message: 'Vui lòng nhập giới hạn sử dụng!' }]}
                        >
                            <InputNumber min={0} className="w-full rounded-md" placeholder="Nhập giới hạn sử dụng" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Giá trị đơn hàng tối thiểu (VNĐ)</span>}
                            name="minOrderValue"
                            rules={[{ required: true, message: 'Vui lòng nhập giá trị đơn hàng tối thiểu!' }]}
                        >
                            <InputNumber
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                min={0}
                                className="w-full rounded-md"
                                placeholder="Nhập giá trị đơn hàng tối thiểu"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Số tiền giảm tối đa (VNĐ)</span>}
                            name="maxDiscountAmount"
                            rules={[{ required: true, message: 'Vui lòng nhập số tiền giảm tối đa!' }]}
                        >
                            <InputNumber
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                min={0}
                                className="w-full rounded-md"
                                placeholder="Nhập số tiền giảm tối đa"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Thời gian bắt đầu</span>}
                            name="startDate"
                            rules={[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu!' }]}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" className="w-full rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Thời gian kết thúc</span>}
                            name="endDate"
                            rules={[{ required: true, message: 'Vui lòng chọn thời gian kết thúc!' }]}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" className="w-full rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label={<span
                                className="text-gray-700 font-medium">Chỉ áp dụng cho người dùng lần đầu</span>}
                            name="firstTimeUserOnly"
                            valuePropName="checked"
                        >
                            <Switch checkedChildren="Có" unCheckedChildren="Không" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Trạng thái</span>}
                            name="status"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                        >
                            <Select placeholder="Chọn trạng thái" className="rounded-md">
                                <Option value="ACTIVE">Hoạt động</Option>
                                <Option value="INACTIVE">Không hoạt động</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Áp dụng cho</span>}
                            name="applyTo"
                            rules={[{ required: true, message: 'Vui lòng chọn đối tượng áp dụng!' }]}
                        >
                            <Select placeholder="Chọn đối tượng áp dụng" className="rounded-md">
                                <Option value="ALL">Tất cả</Option>
                                <Option value="TOUR">Tour cụ thể</Option>
                                <Option value="CATEGORY">Danh mục cụ thể</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.applyTo !== currentValues.applyTo}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('applyTo') === 'TOUR' ? (
                                    <Form.Item
                                        label={<span className="text-gray-700 font-medium">ID Tour</span>}
                                        name="tourId"
                                        rules={[{ required: true, message: 'Vui lòng nhập ID tour!' }]}
                                        className="col-span-2"
                                    >
                                        <Input placeholder="Nhập ID tour" className="rounded-md" />
                                    </Form.Item>
                                ) : getFieldValue('applyTo') === 'CATEGORY' ? (
                                    <Form.Item
                                        label={<span className="text-gray-700 font-medium">Danh mục</span>}
                                        name="categoryId"
                                        rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                                        className="col-span-2"
                                    >
                                        <Select placeholder="Chọn danh mục" loading={categories.length === 0}
                                                className="rounded-md">
                                            {categories.map((category) => (
                                                <Option key={category.id} value={category.id}>
                                                    {category.title}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                ) : null
                            }
                        </Form.Item>
                    </div>

                    <Form.Item className="mt-6">
                        <Space className="flex justify-end">
                            <Button
                                onClick={() => {
                                    setOpen(false);
                                    form.resetFields();
                                }}
                                className="rounded-md border-gray-300"
                            >
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading} className="rounded-md">
                                Thêm voucher
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>

            {/* Delete Voucher Modal */}
            <Modal
                open={isDeleteMode}
                centered
                onCancel={() => setIsDeleteMode(false)}
                title={
                    <div className="flex items-center gap-2">
                        <ExclamationCircleOutlined className="text-red-500 text-xl" />
                        <span className="text-lg font-semibold text-gray-800">Xác nhận xóa voucher</span>
                    </div>
                }
                footer={null}
                width={400}
                className="rounded-lg shadow-lg"
                bodyStyle={{ padding: '20px', background: 'linear-gradient(to bottom right, #fef2f2, #fee2e2)' }}
            >
                <div className="flex flex-col items-center gap-4">
                    <p className="text-gray-700 text-center">
                        Bạn có chắc chắn muốn xóa voucher <strong>{selectedVoucher?.title}</strong> không?
                    </p>
                    <Space>
                        <Button onClick={() => setIsDeleteMode(false)} className="rounded-md border-gray-300">
                            Hủy
                        </Button>
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                handleDeleteVoucher(selectedVoucher.id);
                                setIsDeleteMode(false);
                            }}
                            className="rounded-md"
                        >
                            Xóa
                        </Button>
                    </Space>
                </div>
            </Modal>

            {/* Edit Voucher Modal */}
            <Modal
                open={isEditMode}
                onCancel={() => {
                    setIsEditMode(false);
                    form.resetFields();
                }}
                title={<span className="text-lg font-semibold text-gray-800">Chỉnh sửa voucher</span>}
                footer={null}
                width={800}
                className="rounded-lg shadow-lg"
                bodyStyle={{ padding: '24px', background: 'linear-gradient(to bottom right, #f9fafb, #f3f4f6)' }}
            >
                <Form form={form} onFinish={handleEditVoucher} layout="vertical">
                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Tên voucher</span>}
                            name="title"
                            rules={[{ required: true, message: 'Vui lòng nhập tên voucher!' }]}
                            className="col-span-2"
                        >
                            <Input placeholder="Nhập tên voucher" className="rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Mã voucher</span>}
                            name="codeVoucher"
                            rules={[{ required: true, message: 'Vui lòng nhập mã voucher!' }]}
                        >
                            <Input placeholder="Nhập mã voucher" className="rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Giá trị giảm giá (%)</span>}
                            name="discountValue"
                            rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm giá!' }]}
                        >
                            <InputNumber min={0} max={100} className="w-full rounded-md"
                                         placeholder="Nhập giá trị giảm giá" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Số lượng</span>}
                            name="quantity"
                            rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                        >
                            <InputNumber min={0} className="w-full rounded-md" placeholder="Nhập số lượng" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Giới hạn sử dụng mỗi người</span>}
                            name="userLimit"
                            rules={[{ required: true, message: 'Vui lòng nhập giới hạn sử dụng!' }]}
                        >
                            <InputNumber min={0} className="w-full rounded-md" placeholder="Nhập giới hạn sử dụng" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Giá trị đơn hàng tối thiểu (VNĐ)</span>}
                            name="minOrderValue"
                            rules={[{ required: true, message: 'Vui lòng nhập giá trị đơn hàng tối thiểu!' }]}
                        >
                            <InputNumber
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                min={0}
                                className="w-full rounded-md"
                                placeholder="Nhập giá trị đơn hàng tối thiểu"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Số tiền giảm tối đa (VNĐ)</span>}
                            name="maxDiscountAmount"
                            rules={[{ required: true, message: 'Vui lòng nhập số tiền giảm tối đa!' }]}
                        >
                            <InputNumber
                                formatter={(value) => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                min={0}
                                className="w-full rounded-md"
                                placeholder="Nhập số tiền giảm tối đa"
                            />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Thời gian bắt đầu</span>}
                            name="startDate"
                            rules={[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu!' }]}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" className="w-full rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Thời gian kết thúc</span>}
                            name="endDate"
                            rules={[{ required: true, message: 'Vui lòng chọn thời gian kết thúc!' }]}
                        >
                            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" className="w-full rounded-md" />
                        </Form.Item>

                        <Form.Item
                            label={<span
                                className="text-gray-700 font-medium">Chỉ áp dụng cho người dùng lần đầu</span>}
                            name="firstTimeUserOnly"
                            valuePropName="checked"
                        >
                            <Switch checkedChildren="Có" unCheckedChildren="Không" />
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Trạng thái</span>}
                            name="status"
                            rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                        >
                            <Select placeholder="Chọn trạng thái" className="rounded-md">
                                <Option value="ACTIVE">Hoạt động</Option>
                                <Option value="INACTIVE">Không hoạt động</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={<span className="text-gray-700 font-medium">Áp dụng cho</span>}
                            name="applyTo"
                            rules={[{ required: true, message: 'Vui lòng chọn đối tượng áp dụng!' }]}
                        >
                            <Select placeholder="Chọn đối tượng áp dụng" className="rounded-md">
                                <Option value="ALL">Tất cả</Option>
                                <Option value="TOUR">Tour cụ thể</Option>
                                <Option value="CATEGORY">Danh mục cụ thể</Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => prevValues.applyTo !== currentValues.applyTo}
                        >
                            {({ getFieldValue }) =>
                                getFieldValue('applyTo') === 'TOUR' ? (
                                    <Form.Item
                                        label={<span className="text-gray-700 font-medium">ID Tour</span>}
                                        name="tourId"
                                        rules={[{ required: true, message: 'Vui lòng nhập ID tour!' }]}
                                        className="col-span-2"
                                    >
                                        <Input placeholder="Nhập ID tour" className="rounded-md" />
                                    </Form.Item>
                                ) : getFieldValue('applyTo') === 'CATEGORY' ? (
                                    <Form.Item
                                        label={<span className="text-gray-700 font-medium">Danh mục</span>}
                                        name="categoryId"
                                        rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                                        className="col-span-2"
                                    >
                                        <Select placeholder="Chọn danh mục" loading={categories.length === 0}
                                                className="rounded-md">
                                            {categories.map((category) => (
                                                <Option key={category.id} value={category.id}>
                                                    {category.title}
                                                </Option>
                                            ))}
                                        </Select>
                                    </Form.Item>
                                ) : null
                            }
                        </Form.Item>
                    </div>

                    <Form.Item className="mt-6">
                        <Space className="flex justify-end">
                            <Button
                                onClick={() => {
                                    setIsEditMode(false);
                                    form.resetFields();
                                }}
                                className="rounded-md border-gray-300"
                            >
                                Hủy
                            </Button>
                            <Button type="primary" htmlType="submit" loading={loading} className="rounded-md">
                                Cập nhật voucher
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default VoucherPage;