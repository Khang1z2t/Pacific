import React, { useEffect, useState, useCallback, useMemo } from "react";
import {
    Space,
    Table,
    Tag,
    Switch,
    Modal,
    Button,
    Form,
    Input,
    Radio,
    Select,
    Upload,
    Row,
    Col,
    Dropdown,
    Menu,
    Image,
    DatePicker,
} from 'antd';
import { SearchOutlined, DownOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import config from '~/config';
import GuideService from '~/services/GuideService';
import dayjs from 'dayjs';

const Guide = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedGuide, setSelectedGuide] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    const [selectedSort, setSelectedSort] = useState("Sắp xếp theo");
    const navigate = useNavigate();
    const [guides, setGuides] = useState([]);
    const [loading, setLoading] = useState(false);

    const ITEM_PER_PAGE = 7;
    const [filteredGuides, setFilteredGuides] = useState([]);

    useEffect(() => {
        GuideService.getAllGuides().then((res) => {
            setGuides(res.data);
            setFilteredGuides(res.data);
        }).catch((err) => {
            console.error(err);
        });
        setCurrentPage(1);
    }, []);


    const handleCloseModal = () => {
        setModalVisible(false);
        setIsEditing(false);
        setSelectedGuide(null);
        form.resetFields();
    };


    const showDetails = (guide) => {
        if (!guide) return;
        setSelectedGuide(guide);
        form.setFieldsValue({
            ...guide,
            startDate: guide.startDate ? dayjs(guide.startDate, "YYYY-MM-DD HH:mm") : null,
            endDate: guide.endDate ? dayjs(guide.endDate, "YYYY-MM-DD HH:mm") : null,
        });
        setModalVisible(true);
    };


    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleAddGuide = () => navigate("/admin/add-guide");

    const handleSave = useCallback(async () => {
        if (!selectedGuide) {
            console.error("Không có selectedGuide");
            return;
        }

        try {
            const values = await form.validateFields();
            const updatedGuide = await GuideService.updateGuide(selectedGuide.id, values);

            if (updatedGuide) {
                setGuides(prevGuides =>
                    prevGuides.map(guide =>
                        guide.id === selectedGuide.id ? { ...guide, ...values } : guide
                    )
                );
                handleCloseModal();
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật guide:", error);
        }
    }, [selectedGuide, form]);


    const sortTypes = {
        "Email (A-Z)": "Email (A-Z)",
        "Email (Z-A)": "Email (Z-A)",
    };

    const handleSortChange = (type) => {
        setSelectedSort(type);
    }

    const menu = (
        <Menu onClick={(e) => handleSortChange(e.key)}>
            {Object.keys(sortTypes).map((key) => (
                <Menu.Item key={key}>{sortTypes[key]}</Menu.Item>
            ))}
        </Menu>
    );

    // Xử lý tìm kiếm và sắp xếp
    useEffect(() => {
        let newList = guides.filter(guide =>
            guide.email && guide.email.toLowerCase().includes(searchText.toLowerCase())
        );

        if (selectedSort === "Email (A-Z)") {
            newList.sort((a, b) => (a.email || "").localeCompare(b.email || ""));
        } else if (selectedSort === "Email (Z-A)") {
            newList.sort((a, b) => (b.email || "").localeCompare(a.email || ""));
        }

        setFilteredGuides(newList);
    }, [searchText, selectedSort, guides]);


    const handleSwitchChange = async (id, checked) => {
        const newStatus = checked ? "active" : "inactive";
        try {
            await GuideService.updateGuideStatus(id, newStatus);
            setGuides(prevGuides =>
                prevGuides.map(guide => (guide.id === id ? { ...guide, status: newStatus } : guide))
            );
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
    };


    const columns = [
        { title: "Họ", dataIndex: "firstName", key: "firstName" },
        { title: "Tên", dataIndex: "lastName", key: "lastName" },
        { title: "Kinh nghiệm", dataIndex: "experienceYears", key: "experienceYears" },
        { title: "Email", dataIndex: "email", key: "email" },
        { title: "SĐT", dataIndex: "phone", key: "phone" },
        { title: "Địa chỉ", dataIndex: "address", key: "address" },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => {
                const safeStatus = status ? status.toUpperCase() : "UNKNOWN";
                return (
                    <Tag color={status === "active" ? "green" : status === "pending" ? "gold" : "volcano"}>
                        {safeStatus}
                    </Tag>
                );
            },
        },
        {
            title: "Hành động",
            key: "action",
            render: (_, record) => (
                <Space size="middle">
                    <Button icon={<InfoCircleOutlined />} onClick={() => showDetails(record)} />
                    <Switch checked={record.status === "active"} onChange={(checked) => handleSwitchChange(record.id, checked)} />
                </Space>
            ),
        },
    ];

    return (
        <div className="container mx-auto p-2">
            <h2 className="text-2xl font-bold mb-4">HƯỚNG DẪN VIÊN</h2>

            <Space style={{ marginBottom: 16 }}>
                <Input
                    placeholder="Tìm kiếm"
                    prefix={<SearchOutlined />}
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Dropdown
                    overlay={
                        <Menu onClick={(e) => setSelectedSort(e.key)}>
                            {Object.keys(sortTypes).map((key) => (
                                <Menu.Item key={key}>{sortTypes[key]}</Menu.Item>
                            ))}
                        </Menu>
                    }
                    trigger={["click"]}
                >
                    <Button>
                        {sortTypes[selectedSort] || "Sắp xếp theo"} <DownOutlined />
                    </Button>
                </Dropdown>
            </Space>
            <Button type="primary" onClick={handleAddGuide} style={{ float: "right" }}>Thêm</Button>
            <Table
                dataSource={filteredGuides.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE)}
                columns={columns}
                pagination={{
                    current: currentPage,
                    pageSize: ITEM_PER_PAGE,
                    total: filteredGuides.length,
                    onChange: setCurrentPage,
                }}
                rowKey={(record) => record.id || record.key}
                loading={loading}
                size="large"
            />

            {/* Popup */}
            <Modal
                title="THÔNG TIN CHI TIẾT"
                open={modalVisible}
                onCancel={handleCloseModal}
                footer={[
                    isEditing ? (
                        <Button key="save" type="primary" onClick={handleSave}>
                            Lưu
                        </Button>
                    ) : (
                        <Button key="edit" type="default" onClick={handleEdit}>
                            Chỉnh sửa
                        </Button>
                    ),
                    <Button key="close" onClick={handleCloseModal}>
                        Đóng
                    </Button>,
                ]}
            >
                {selectedGuide && (
                    <Form form={form} layout="vertical">
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Họ" name="firstName">
                                    <Input readOnly />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Tên" name="lastName">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Kinh nghiệm" name="experienceYears">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Email" name="email">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="SĐT" name="phone">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Địa chỉ" name="address">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Trạng thái" name="status">
                                    <Select disabled={!isEditing}>
                                        <Select.Option value="active">Active</Select.Option>
                                        <Select.Option value="inactive">Inactive</Select.Option>
                                        <Select.Option value="pending">Pending</Select.Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Modal>
        </div>
    );
};

export default Guide;
