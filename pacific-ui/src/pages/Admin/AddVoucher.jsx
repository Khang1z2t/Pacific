import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Row, Col, message, DatePicker } from 'antd';
import { useNavigate } from "react-router-dom";
import VoucherService from '~/services/VoucherService';

const AddVoucher = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [vouchers, setVouchers] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAllVouchers();
    }, []);

    const fetchAllVouchers = async () => {
        try {
            const res = await VoucherService.getAllVouchers();
            setVouchers(res.data);
        } catch (err) {
            console.error("Lỗi khi lấy danh sách voucher:", err);
        }
    };

    const handleAddVoucher = async () => {
        if (loading) return;
        setLoading(true);

        try {
            const values = await form.validateFields();
            console.log("Dữ liệu form gửi đi:", values);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const startDate = values.startDate?.toDate();
            const endDate = values.endDate?.toDate();
            if (!startDate || !endDate) {
                message.error("Vui lòng chọn ngày bắt đầu và ngày kết thúc!");
                setLoading(false);
                return;
            }
            if (startDate < today) {
                message.error("Ngày bắt đầu phải là hôm nay hoặc trong tương lai!");
                setLoading(false);
                return;
            }
            if (endDate < startDate) {
                message.error("Ngày kết thúc phải lớn hơn hoặc bằng ngày bắt đầu!");
                setLoading(false);
                return;
            }
            if (vouchers.some(v => v.nameVoucher === values.nameVoucher)) {
                message.error("Tên voucher đã tồn tại, vui lòng nhập tên khác!");
                setLoading(false);
                return;
            }
            if (vouchers.some(v => v.codeVoucher === values.codeVoucher)) {
                message.error("Mã voucher đã tồn tại, vui lòng nhập mã khác!");
                setLoading(false);
                return;
            }
            if (values.discount <= 0 || values.quantity <= 0) {
                message.error("Giá trị discount và số lượng phải lớn hơn 0!");
                setLoading(false);
                return;
            }
            const newVoucherData = {
                ...values,
                startDate: values.startDate.format("YYYY-MM-DD"),
                endDate: values.endDate.format("YYYY-MM-DD"),
            };
            console.log("Gửi API với dữ liệu:", newVoucherData);

            // Gọi API thêm voucher
            const response = await VoucherService.addVoucher(newVoucherData);
            if (response?.data?.id) {
                message.success("Thêm voucher thành công!");
                form.resetFields();

                // Cập nhật DS
                setVouchers(prevVouchers => [response.data, ...prevVouchers]);
                navigate("/admin");
            } else {
                console.error("API phản hồi không hợp lệ:", response);
                message.error("API không trả về dữ liệu hợp lệ!");
            }
        } catch (error) {
            console.error("Lỗi khi thêm voucher:", error);
            message.error(error.response?.data?.message || "Đã xảy ra lỗi, vui lòng thử lại!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">THÊM VOUCHER</h2>
            <Form form={form} layout="vertical">
                <Row gutter={[16, 32]}>
                    <Col span={12}>
                        <Form.Item label="Tên voucher" name="nameVoucher" rules={[{ required: true, message: "Vui lòng nhập tên voucher!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Mã voucher" name="codeVoucher" rules={[{ required: true, message: "Vui lòng nhập mã voucher!" }]}>
                            <Input />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={[16, 32]}>
                    <Col span={12}>
                        <Form.Item label="Discount (%)" name="discount" rules={[{ required: true, message: "Vui lòng nhập discount!" }]}>
                            <Input type="number" min={0} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="Số lượng" name="quantity" rules={[{ required: true, message: "Vui lòng nhập số lượng!"}]}>
                            <Input type="number" min={0} />
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
                <Form.Item label="Trạng thái" name="status" rules={[{ required: true, message: "Vui lòng chọn trạng thái!" }]}>
                    <Select>
                        <Select.Option value="active">Active</Select.Option>
                        <Select.Option value="inactive">Inactive</Select.Option>
                        <Select.Option value="pending">Pending</Select.Option>
                    </Select>
                </Form.Item>
                <Button type="primary" onClick={handleAddVoucher} loading={loading} style={{ marginRight: "10px" }}>
                    {loading ? "Đang lưu..." : "Lưu"}
                </Button>
                <Button onClick={() => navigate("/admin")}>Hủy</Button>
            </Form>
        </div>
    );
};

export default AddVoucher;
