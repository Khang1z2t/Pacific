import React, { useEffect, useState } from 'react';
import { Space, Table, Tag, Switch, Button, Form, Input, Dropdown, Menu, Modal, Row, Col, message, DatePicker, InputNumber,
} from 'antd';
import { SearchOutlined, DownOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import VoucherServices from '~/services/VoucherServices';

const ITEM_PER_PAGE = 7;
const sortTypes = {
    nameAsc: "Tên A-Z",
    nameDesc: "Tên Z-A",
    dateAsc: "Ngày bắt đầu ↑",
    dateDesc: "Ngày bắt đầu ↓",
};

const Voucher = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    const [selectedSort, setSelectedSort] = useState("");
    const navigate = useNavigate();

    const [vouchers, setVouchers] = useState([]);
    const [filteredVouchers, setFilteredVouchers] = useState([]);
    const [loading, setLoading] = useState(false);

    const [modalVisible, setModalVisible] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    useEffect(() => {
        VoucherServices.getAllVouchers().then((res) => {
            setVouchers(res.data);
            setFilteredVouchers(res.data);
        }).catch((err) => {
            console.error(err);
        });
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        setFilteredVouchers(
            vouchers.filter(voucher =>
                voucher.nameVoucher?.toLowerCase().includes(searchText.toLowerCase())
            )
        );
    }, [searchText, vouchers]);

    const sortedVouchers = [...filteredVouchers].sort((a, b) => {
        if (selectedSort === "nameAsc") return a.nameVoucher.localeCompare(b.nameVoucher);
        if (selectedSort === "nameDesc") return b.nameVoucher.localeCompare(a.nameVoucher);
        if (selectedSort === "dateAsc") return new Date(a.startDate) - new Date(b.startDate);
        if (selectedSort === "dateDesc") return new Date(b.startDate) - new Date(a.startDate);
        return 0;
    });

    const handleOpenModal = (voucher = null) => {
        setIsAdding(!voucher);
        setSelectedVoucher(voucher);
        setModalVisible(true);

        if (voucher) {
            form.setFieldsValue({
                ...voucher,
                startDate: dayjs(voucher.startDate),
                endDate: dayjs(voucher.endDate),
            });
        } else {
            form.resetFields();
        }
    };

    const handleCloseModal = () => {
        setModalVisible(false);
        setSelectedVoucher(null);
    };

    const handleSave = async () => {
        try {
            const values = await form.validateFields();
            console.log("🟡 Giá trị trước khi format:", values);
            values.startDate = values.startDate ? values.startDate.format("YYYY-MM-DD") : null;
            values.endDate = values.endDate ? values.endDate.format("YYYY-MM-DD") : null;
            console.log("✅ Giá trị sau khi format:", values);
            if (!selectedVoucher || !selectedVoucher.id) {
                message.error("Không tìm thấy voucher để cập nhật.");
                return;
            }
            const response = await VoucherServices.updateVoucher(selectedVoucher.id, values);
            console.log("Phản hồi từ server:", response);
            if (response.code === 200) {
                message.success("Cập nhật thành công!");

                // Sau khi cập nhật thành công, gọi lại API để tải lại dữ liệu
                VoucherServices.getAllVouchers().then((res) => {
                    setVouchers(res.data);
                    setFilteredVouchers(res.data);
                }).catch((err) => {
                    console.error(err);
                });
            } else {
                message.error(`Cập nhật thất bại: ${response.message}`);
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật voucher:", error);
            message.error("Cập nhật thất bại! Vui lòng thử lại.");
        }
    };

    const handleAdd = () => navigate("/admin/add-voucher");

    const handleDelete = async (id) => {
        try {
            await VoucherServices.deleteVoucher(id);
            setVouchers(prev => prev.filter(voucher => voucher.id !== id));
            setFilteredVouchers(prev => prev.filter(voucher => voucher.id !== id));
            VoucherServices.getAllVouchers().then((res) => {
                setVouchers(res.data);
                setFilteredVouchers(res.data);
            }).catch((err) => {
                console.error(err);
            });
        } catch (error) {
            console.error("Lỗi khi xóa voucher:", error);
        }
    };

    const handleSwitchChange = async (id, checked) => {
        const newStatus = checked ? "active" : "inactive";
        try {
            await VoucherServices.updateVoucherStatus(id, newStatus);
            setVouchers(prev =>
                prev.map(voucher => (voucher.id === id ? { ...voucher, status: newStatus } : voucher))
            );
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
    };

    const columns = [
        { title: "Tên voucher", dataIndex: "nameVoucher", key: "nameVoucher" },
        { title: "Mã voucher", dataIndex: "codeVoucher", key: "codeVoucher" },
        { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
        { title: "Discount", dataIndex: "discount", key: "discount", render: (text) => `${text}%` },
        {
            title: "Ngày bắt đầu",
            dataIndex: "startDate",
            key: "startDate",
            render: (text) => {
                return text ? dayjs(text).format("DD/MM/YYYY") : "N/A";
            }
        },
        {
            title: "Ngày kết thúc",
            dataIndex: "endDate",
            key: "endDate",
            render: (text) => {
                return text ? dayjs(text).format("DD/MM/YYYY") : "N/A";
            }
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "active" ? "green" : status === "pending" ? "gold" : "volcano"}>
                    {status ? status.toUpperCase() : "UNKNOWN"}
                </Tag>
            ),
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} type="link" onClick={() => handleOpenModal(record)}></Button>
                    <Button icon={<DeleteOutlined />} danger onClick={() => handleDelete(record.id)}></Button>
                    <Switch checked={record.status === "active"} onChange={(checked) => handleSwitchChange(record.id, checked)} />
                </Space>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-2">
            <h2 className="text-2xl font-bold mb-4">QUẢN LÝ VOUCHER</h2>
            <Space style={{ marginBottom: 16 }}>
                <Input placeholder="Tìm kiếm" prefix={<SearchOutlined />} value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                <Dropdown overlay={<Menu onClick={(e) => setSelectedSort(e.key)}>{Object.keys(sortTypes).map((key) => (<Menu.Item key={key}>{sortTypes[key]}</Menu.Item>))}</Menu>} trigger={["click"]}>
                    <Button>{sortTypes[selectedSort] || "Sắp xếp theo"} <DownOutlined /></Button>
                </Dropdown>
            </Space>
            <Button type="primary" onClick={() => handleAdd()} style={{ float: "right" }}>Thêm</Button>
            <Table dataSource={sortedVouchers.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE)} columns={columns}
                   pagination={{ current: currentPage, pageSize: ITEM_PER_PAGE, total: sortedVouchers.length, onChange: setCurrentPage }} rowKey="id" loading={loading} size="large" />

            {/* Popup Modal */}
            <Modal
                title="CHỈNH SỬA VOUCHER"
                open={modalVisible}
                onCancel={handleCloseModal}
                footer={[
                    <Button key="save" type="primary" onClick={handleSave}>
                        Cập nhật
                    </Button>,
                    <Button key="close" onClick={handleCloseModal}>
                        Đóng
                    </Button>,
                ]}
            >
            <Form form={form} layout="vertical">
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Tên Voucher" name="nameVoucher" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Mã Voucher" name="codeVoucher" rules={[{ required: true }]}>
                                <Input />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="Số lượng" name="quantity" rules={[{ required: true }]}>
                                <InputNumber min={1} />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="Giảm giá (%)" name="discount" rules={[{ required: true }]}>
                                <InputNumber min={1} />
                            </Form.Item>
                        </Col>
                    </Row>

                    <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Ngày bắt đầu" name="startDate" rules={[{ required: true }]}>
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Ngày kết thúc" name="endDate" rules={[{ required: true }]}>
                            <DatePicker format="YYYY-MM-DD" />
                        </Form.Item>
                    </Col>
                    </Row>
                </Form>
            </Modal>
        </div>
    );
};

export default Voucher;
