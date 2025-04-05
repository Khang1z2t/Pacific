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
    Row, Col,
} from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import VoucherServices from '~/services/VoucherServices';
import CategoryServices from '~/services/CategoryServices'; // Import CategoryServices
import config from '~/config';
import moment from 'moment';


const { Title } = Typography;
const { Option } = Select;

export const VoucherPage = () => {
    const [form] = Form.useForm();
    const [vouchers, setVouchers] = useState([]);
    const [categories, setCategories] = useState([]); // State để lưu danh sách danh mục
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

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
        if (open) {
            fetchCategories(); // Tải danh sách danh mục khi mở Modal
        }
    }, [open]);

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
            sorter: (a, b) => a.codeVoucher.localeCompare(b.codeVoucher),
            sortDirections: ['ascend', 'descend'],
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
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
            sorter: (a, b) => a.title.localeCompare(b.title),
            sortDirections: ['ascend', 'descend'],
            filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => record.title.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Giá trị',
            dataIndex: 'discountValue',
            key: 'discountValue',
            width: 100,
            render: (text) => {
                return `${text} %`;
            },
            sorter: (a, b) => a.discountValue - b.discountValue,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'startDate',
            key: 'startDate',
            width: 150,
            render: (text) => {
                return `${config.webConfig.convertDateNoTime(text)}`;
            },
            sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
        },
        {
            title: 'Thời gian kết thúc',
            dataIndex: 'endDate',
            key: 'endDate',
            width: 150,
            render: (text) => {
                return `${config.webConfig.convertDateNoTime(text)}`;
            },
            sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
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
            const response = await VoucherServices.addVoucher({
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

    return (
        <>
            <div className={'bg-white p-4 rounded shadow-lg'}>
                <Table
                    columns={columns}
                    dataSource={vouchers}
                    pagination={{
                        pageSize: 10,
                        total: vouchers.length,
                    }}
                    rowKey="voucherCode"
                    bordered
                    title={() => (
                        <div className={'flex justify-between items-center'}>
                            <Title level={4}>Danh sách voucher</Title>
                            <div className={"flex gap-2"}>
                                <Button onClick={() => setOpen(!open)} type="primary">Thêm voucher</Button>
                                <Button onClick={fetchVouchers} icon={<ReloadOutlined />} type="default">Làm mới</Button>
                            </div>
                        </div>
                    )}
                    loading={loading}
                />
            </div>
            <Modal
                open={open}
                onCancel={() => setOpen(false)}
                title={'Thêm voucher'}
                width={800}
                footer={null}
            >
                <Form form={form} onFinish={handleAddVoucher} layout={'vertical'}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Tên voucher"
                                name="title"
                                rules={[{ required: true, message: 'Vui lòng nhập tên voucher!' }]}
                            >
                                <Input placeholder="Nhập tên voucher" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Mã voucher"
                                name="codeVoucher"
                                rules={[{ required: true, message: 'Vui lòng nhập mã voucher!' }]}
                            >
                                <Input placeholder="Nhập mã voucher" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Giá trị giảm giá (%)"
                                name="discountValue"
                                rules={[{ required: true, message: 'Vui lòng nhập giá trị giảm giá!' }]}
                            >
                                <InputNumber min={0} max={100} style={{ width: '100%' }}
                                             placeholder="Nhập giá trị giảm giá" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Số lượng"
                                name="quantity"
                                rules={[{ required: true, message: 'Vui lòng nhập số lượng!' }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập số lượng" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Giới hạn sử dụng mỗi người"
                                name="userLimit"
                                rules={[{ required: true, message: 'Vui lòng nhập giới hạn sử dụng!' }]}
                            >
                                <InputNumber min={0} style={{ width: '100%' }} placeholder="Nhập giới hạn sử dụng" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Giá trị đơn hàng tối thiểu (VNĐ)"
                                name="minOrderValue"
                                rules={[{ required: true, message: 'Vui lòng nhập giá trị đơn hàng tối thiểu!' }]}
                            >
                                <InputNumber formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                             min={0} style={{ width: '100%' }}
                                             placeholder="Nhập giá trị đơn hàng tối thiểu" />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Số tiền giảm tối đa (VNĐ)"
                                name="maxDiscountAmount"
                                rules={[{ required: true, message: 'Vui lòng nhập số tiền giảm tối đa!' }]}
                            >
                                <InputNumber formatter={value => `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                             min={0} style={{ width: '100%' }} placeholder="Nhập số tiền giảm tối đa" />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Chỉ áp dụng cho người dùng lần đầu"
                                name="firstTimeUserOnly"
                                valuePropName="checked"
                            >
                                <Switch />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Trạng thái"
                                name="status"
                                rules={[{ required: true, message: 'Vui lòng chọn trạng thái!' }]}
                            >
                                <Select placeholder="Chọn trạng thái">
                                    <Option value="ACTIVE">Hoạt động</Option>
                                    <Option value="INACTIVE">Không hoạt động</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="Áp dụng cho"
                                name="applyTo"
                                rules={[{ required: true, message: 'Vui lòng chọn đối tượng áp dụng!' }]}
                            >
                                <Select placeholder="Chọn đối tượng áp dụng">
                                    <Option value="ALL">Tất cả</Option>
                                    <Option value="TOUR">Tour cụ thể</Option>
                                    <Option value="CATEGORY">Danh mục cụ thể</Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.applyTo !== currentValues.applyTo}
                    >
                        {({ getFieldValue }) =>
                            getFieldValue('applyTo') === 'TOUR' ? (
                                <Form.Item
                                    label="ID Tour"
                                    name="tourId"
                                    rules={[{ required: true, message: 'Vui lòng nhập ID tour!' }]}
                                >
                                    <Input placeholder="Nhập ID tour" />
                                </Form.Item>
                            ) : getFieldValue('applyTo') === 'CATEGORY' ? (
                                <Form.Item
                                    label="Danh mục"
                                    name="categoryId"
                                    rules={[{ required: true, message: 'Vui lòng chọn danh mục!' }]}
                                >
                                    <Select placeholder="Chọn danh mục" loading={categories.length === 0}>
                                        {categories.map(category => (
                                            <Option key={category.id} value={category.id}>
                                                {category.title}
                                            </Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            ) : null
                        }
                    </Form.Item>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item
                                label="Thời gian bắt đầu"
                                name="startDate"
                                rules={[{ required: true, message: 'Vui lòng chọn thời gian bắt đầu!' }]}
                            >
                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DDTHH:mm:ss"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                            <Form.Item
                                label="Thời gian kết thúc"
                                name="endDate"
                                rules={[{ required: true, message: 'Vui lòng chọn thời gian kết thúc!' }]}
                            >
                                <DatePicker
                                    showTime
                                    format="YYYY-MM-DDTHH:mm:ss"
                                    style={{ width: '100%' }}
                                />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Form.Item>
                        <Space>
                            <Button type="primary" htmlType="submit" loading={loading}>
                                Thêm voucher
                            </Button>
                            <Button onClick={() => setOpen(false)}>
                                Hủy
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default VoucherPage;