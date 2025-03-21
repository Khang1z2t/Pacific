import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Row, Col, message, Upload, DatePicker } from 'antd';
import { useNavigate } from "react-router-dom";
import TourDetailService from '~/services/TourDetailService';
import { UploadOutlined } from '@ant-design/icons';

const AddTourDetail = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedTourDetail, setSelectedTourDetail] = useState(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [tourDetails, setTourDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredTourDetails, setFilteredTourDetails] = useState([]);

    useEffect(() => {
        TourDetailService.getAllTourDetails()
            .then((res) => {
                setTourDetails(res.data);
                setFilteredTourDetails(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
        setCurrentPage(1);
    }, []);

    const handleAddTourDetail = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const values = await form.validateFields();
            console.log("Dữ liệu form gửi đi:", values);

            const isTitleExists = tourDetails.some((guide) => guide.title === values.title);

            if (isTitleExists) {
                message.error("Tour đã tồn tại, vui lòng nhập tour khác!");
                setLoading(false);
                return;
            }

            const newTourDetailData = {
                ...values,
                startDate: values.startDate ? values.startDate.format("YYYY-MM-DD") : null,
                endDate: values.endDate ? values.endDate.format("YYYY-MM-DD") : null,
                image: selectedTourDetail?.image || null,
            };

            console.log("Gửi API với dữ liệu:", newTourDetailData);

            const response = await TourDetailService.addTourDetail(newTourDetailData);

            if (response && response.data && response.data.id) {
                message.success("Thêm chi tiết tour thành công!");
                form.resetFields();

                setTimeout(() => {
                    navigate("/admin");
                }, 1000);
            } else {
                console.error("API phản hồi không hợp lệ:", response);
                message.error("API không trả về dữ liệu hợp lệ!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm chi tiết tour:", error);

            if (error.response && error.response.data && error.response.data.message) {
                message.error(`Lỗi từ server: ${error.response.data.message}`);
            } else {
                message.error("Đã xảy ra lỗi, vui lòng thử lại!");
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">THÊM CHI TIẾT TOUR</h2>
            <Form form={form} layout="vertical">
                <Row gutter={[16, 32]}>
                    <Col span={12}>
                        <Form.Item label="Tên tour" name="title" rules={[{ required: true, message: "Vui lòng nhập tên tour!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Mô tả" name="description" rules={[{ required: true, message: "Vui lòng nhập mô tả tour!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 32]}>
                    <Col span={12}>
                        <Form.Item label="Số lượng" name="quantity" rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Hành trình" name="itineraries" rules={[{ required: true, message: "Vui lòng nhập hành trình!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 32]}>
                    <Col span={12}>
                        <Form.Item label="Phương tiện" name="transportId" rules={[{ required: true, message: "Vui lòng nhập tên phương tiện!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Khách sạn" name="hotelId" rules={[{ required: true, message: "Vui lòng nhập tên khách sạn!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 32]}>
                    <Col span={12}>
                        <Form.Item label="Giá người lớn" name="priceAdults" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Giá trẻ em" name="priceChildren" rules={[{ required: true, message: "Vui lòng nhập giá!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={16}>
                    <Col span={12}>
                        <Form.Item label="Ngày đi" name="startDate" rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}>
                            <DatePicker format="DD/MM/YYYY" disabled />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Ngày về" name="endDate" rules={[{ required: true, message: "Vui lòng chọn ngày!" }]}>
                            <DatePicker format="DD/MM/YYYY" disabled />
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

                <Form.Item label="Trạng thái" name="status" rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}>
                    <Select>
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="inactive">Inactive</Select.Option>
                        <Select.Option value="pending">Pending</Select.Option>
                    </Select>
                </Form.Item>
                <Button type="primary" onClick={handleAddTourDetail} loading={loading} style={{ marginRight: "10px" }}>
                    {loading ? "Đang lưu..." : "Lưu"}
                </Button>
                <Button onClick={() => navigate("/admin")}>Hủy</Button>
            </Form>
        </div>
    );
};

export default AddTourDetail;
