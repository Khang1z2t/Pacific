import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Space, Table, Tag, Switch, Modal, Button, Form, Input, Select, Upload, Row, Col, Dropdown, Menu, Image,
} from 'antd';
import { SearchOutlined, DownOutlined, InfoCircleOutlined, UploadOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import config from '~/config';
import TourService from '~/services/TourService';
import tour from '~/pages/Admin/Tour';

const Tour = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [modalVisible, setModalVisible] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedTour, setSelectedTour] = useState(null);
    const [form] = Form.useForm();
    const [searchText, setSearchText] = useState("");
    const [selectedSort, setSelectedSort] = useState("Sắp xếp theo");
    const navigate = useNavigate();
    const [tours, setTours] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState(selectedTour?.image || ""); // Lưu ảnh preview
    const ITEM_PER_PAGE = 7;
    const [filteredTours, setFilteredTours] = useState([]);


    useEffect(() => {
        TourService.getAllTours().then((res) => {
            setTours(res.data);
            setFilteredTours(res.data);
        }).catch((err) => {
            console.error(err);
        });
        setCurrentPage(1);
    }, []);


    const handleCloseModal = () => {
        setModalVisible(false);
        setIsEditing(false);
        setSelectedTour(null);
        form.resetFields();
    };

    const showDetails = (record) => {
        setSelectedTour(record);
        setModalVisible(true);
        form.setFieldsValue(record);
    };

    const handleEdit = () => {
        setIsEditing(true);
    };


    const handleSave = useCallback(async () => {
        if (!selectedTour) {
            console.error("Không có selectedTour");
            return;
        }

        try {
            const values = await form.validateFields();
            const updatedTour = await TourService.updateTour(selectedTour.id, values);

            if (updatedTour) {
                setTours(prevTours =>
                    prevTours.map(tour =>
                        tour.id === selectedTour.id ? { ...tour, ...values } : tour
                    )
                );
                handleCloseModal();
            }
        } catch (error) {
            console.error("Lỗi khi cập nhật tour:", error);
        }
    }, [selectedTour, form]);


    const sortTypes = {
        "Tên tour (A-Z)": "Tên tour (A-Z)",
        "Tên tour (Z-A)": "Tên tour (Z-A)",
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
        let newList = tours.filter(user =>
            tour.title.toLowerCase().includes(searchText.toLowerCase())
        );

        if (selectedSort === "Tên tour (A-Z)") {
            newList.sort((a, b) => a.title.localeCompare(b.title));
        } else if (selectedSort === "Tên tour (Z-A)") {
            newList.sort((a, b) => b.title.localeCompare(a.title));
        }

        setFilteredTours(newList);
    }, [searchText, selectedSort, tours]);

    const handleSwitchChange = async (id, checked) => {
        const newStatus = checked ? "active" : "inactive";
        try {
            await TourService.updateTourStatus(id, newStatus);
            setTours(prevTours =>
                prevTours.map(tour => (tour.id === id ? { ...tour, status: newStatus } : tour))
            );
        } catch (error) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
        }
    };

    const handleAddTour = async () => {
        try {
            const response = await TourService.addTourDetail();
            console.log("Thêm tour thành công:", response);
        } catch (error) {
            console.error("Lỗi khi thêm tour:", error);
        }
    };


    const columns = [
        { title: "Tên tour", dataIndex: "title", key: "title" },
        { title: "Hình ảnh", dataIndex: "avatarUrl", render: (value) => (
                <Image.PreviewGroup
                >
                    <Image width={100} src={`${config.imageConfig.getAvatar(value)}`} />
                </Image.PreviewGroup>
            ) },
        { title: "Category", dataIndex: "category", key: "category" },
        { title: "Số ngày", dataIndex: "duration", key: "duration" },
        { title: "Điểm đến", dataIndex: "destination", key: "destination" },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (status) => (
                <Tag color={status === "active" ? "green" : status === "pending" ? "gold" : "volcano"}>
                    {status.toUpperCase()}
                </Tag>
            ),
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
            <h2 className="text-2xl font-bold mb-4">QUẢN LÝ TOUR</h2>

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
            <Button type="primary" onClick={handleAddTour} style={{ float: "right" }}>Thêm</Button>
            <Table
                dataSource={filteredTours.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE)}
                columns={columns}
                pagination={{
                    current: currentPage,
                    pageSize: ITEM_PER_PAGE,
                    total: filteredTours.length,
                    onChange: setCurrentPage,
                }}
                rowKey={(record) => record.id || record.key}
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
                {selectedTour && (
                    <Form form={form} layout="vertical" initialValues={selectedTour}>
                        {/* Ảnh đại diện */}
                        <Form.Item label="Ảnh đại diện" name="image">
                            {/*<Upload*/}
                            {/*    listType="picture-card"*/}
                            {/*    showUploadList={false} // Không hiển thị danh sách file*/}
                            {/*    beforeUpload={() => false} // Không upload tự động lên server*/}
                            {/*    maxCount={1} // Chỉ cho phép chọn 1 ảnh*/}
                            {/*    onChange={handleUpload} // Gọi khi có ảnh mới*/}
                            {/*>*/}
                            {/*    {imagePreview ? (*/}
                            {/*        <img src={imagePreview} alt="avatar" style={{ width: "100%" }} />*/}
                            {/*    ) : (*/}
                            {/*        <UploadOutlined />*/}
                            {/*    )}*/}
                            {/*</Upload>*/}
                        </Form.Item>

                        {/* Thông tin tour */}
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Tên tour" name="title">
                                    <Input readOnly />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Category" name="category">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Điểm đến" name="destination">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Số ngày" name="duration">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item label="Mô tả" name="destination">
                                    <Input disabled={!isEditing} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Hướng dẫn viên" name="ratingAvg">
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

export default Tour;
