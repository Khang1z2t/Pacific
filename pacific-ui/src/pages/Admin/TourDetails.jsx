import React, { useCallback, useEffect, useState } from 'react';
import {
    Button,
    Col,
    DatePicker,
    Dropdown,
    Form,
    Image,
    Input,
    Menu,
    Modal,
    Row,
    Select,
    Space,
    Switch,
    Table,
    Tag,
    Upload,
} from 'antd';
import { DownOutlined, InfoCircleOutlined, SearchOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import TourDetailService from '~/services/TourDetailService';
import tourDetail from '~/pages/Admin/TourDetails';

const TourDetails = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedTourDetail, setSelectedTourDetail] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    const [selectedSort, setSelectedSort] = useState("Sắp xếp theo");
    const navigate = useNavigate();
    const [tourDetails, setTourDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredTourDetails, setFilteredTourDetails] = useState([]);
    const ITEM_PER_PAGE = 7;

    useEffect(() => {
        setLoading(true);
        TourDetailService.getAllTourDetails()
            .then((res) => {
                setTourDetails(res.data);
            })
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    const handleCloseModal = () => {
        setModalVisible(false);
        setIsEditing(false);
        setSelectedTourDetail(null);
        form.resetFields();
    };

    const showDetails = (record) => {
        setSelectedTourDetail(record);
        setModalVisible(true);
        form.setFieldsValue(record);
    };

    const sortTypes = {
        "Tên tour (A-Z)": "Tên tour (A-Z)",
        "Tên tour (Z-A)": "Tên tour (Z-A)",
    };

    const handleAddTourDetail = () => navigate("/admin/add-tour-detail");

    const handleEdit = () => setIsEditing(true);

    const handleSave = useCallback(async () => {
        try {
            const values = await form.validateFields();
            await TourDetailService.updateTourDetail(selectedTourDetail.id, values);
            setTourDetails((prev) => prev.map((tour) => (tourDetail.id === selectedTourDetail.id ? { ...tourDetail, ...values } : tourDetail)));
            handleCloseModal();
        } catch (error) {
            console.error("Lỗi khi cập nhật chi tiết tour:", error);
        }
    }, [selectedTourDetail, form]);

    const handleSwitchChange = async (id, checked) => {
        try {
            await TourDetailService.updateTourDetailStatus(id, checked ? "active" : "inactive");
            setTourDetails((prev) => prev.map((tour) => (tourDetail.id === id ? { ...tourDetail, status: checked ? "active" : "inactive" } : tourDetail)));
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
    };

    const columns = [
        { title: "Tên tour", dataIndex: "title", key: "title" },
        { title: "Hình ảnh", dataIndex: "avatarUrl", render: (value) => <Image width={100} src={config.imageConfig.getAvatar(value)} /> },
        { title: "Số lượng", dataIndex: "quantity", key: "quantity" },
        { title: "Mô tả", dataIndex: "description", key: "description" },
        { title: "Giá người lớn", dataIndex: "priceAdults", key: "priceAdults" },
        { title: "Giá trẻ em", dataIndex: "priceChildren", key: "priceChildren" },
        { title: "Ngày đi", dataIndex: "startDate", key: "startDate" },
        { title: "Ngày về", dataIndex: "endDate", key: "endDate" },
        { title: "Trạng thái", dataIndex: "status", key: "status", render: (status) => <Tag color={status === "active" ? "green" : "volcano"}>{status.toUpperCase()}</Tag> },
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
            <h2 className="text-2xl font-bold mb-4">QUẢN LÝ CHI TIẾT TOUR</h2>

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
            <Button type="primary" onClick={handleAddTourDetail} style={{ float: "right" }}>Thêm</Button>
            <Table
                dataSource={filteredTourDetails.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE)}
                columns={columns}
                pagination={{
                    current: currentPage,
                    pageSize: ITEM_PER_PAGE,
                    total: filteredTourDetails.length,
                    onChange: setCurrentPage,
                }}
                rowKey={(record) => record.id}
                loading={loading}
                size="large"
            />
            {/* Popup */}
            <Modal
                title="Thông tin chi tiết tour"
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
                {selectedTourDetail && (
                    <Form form={form} layout="vertical" initialValues={selectedTourDetail}>
                        {/* Thông tin tour */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Tên tour" name="title">
                                    <Input readOnly />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Mô tả" name="description">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Số lượng" name="quantity">
                                    <Input readOnly />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Hành trình" name="itineraries">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Phương tiện" name="transportId"> // show name phương tiện
                                    <Input readOnly />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Khách sạn" name="hotelId"> // show name khách sạn
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item name="banner" label="Banner *" valuePropName="fileList">
                                    <Upload beforeUpload={() => false} listType="picture">
                                        <Button icon={<UploadOutlined />}>Choose a picture</Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item name="images" label="Hình ảnh *" valuePropName="fileList">
                                    <Upload
                                        multiple
                                        listType="picture"
                                        beforeUpload={() => false}
                                        onChange={({ fileList }) => form.setFieldsValue({ images: fileList })}
                                    >
                                        <Button icon={<UploadOutlined />}>Tải lên nhiều hình ảnh</Button>
                                    </Upload>
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Giá người lớn" name="priceAdults">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Giá trẻ em" name="priceChildren">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Ngày đi" name="startDate">
                                    <DatePicker format="DD/MM/YYYY" disabled />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Ngày về" name="endDate">
                                    <DatePicker format="DD/MM/YYYY" disabled />
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

export default TourDetails;
