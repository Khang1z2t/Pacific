import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Modal, Select, Space, Table, Tooltip } from 'antd';
import config from '~/config';
import { PlusOutlined } from '@ant-design/icons';
import AdminServices from '~/services/AdminServices';
import TourServices from '~/services/TourServices';

export const StatisticTourSection = () => {
    const [open, setOpen] = useState(false);
    const [tours, setTours] = useState([]);
    const [bookingCount, setBookingCount] = useState([]); // Dữ liệu cho Table
    const [selectData, setSelectData] = useState([]); // Dữ liệu cho Select
    const [selectedTourId, setSelectedTourId] = useState(''); // Lưu tourId được chọn
    const [modalData, setModalData] = useState({ tourId: '', tourDetailId: '' }); // Lưu dữ liệu cho Modal

    // Lấy danh sách tour để điền vào Select
    useEffect(() => {
        const fetchTours = async () => {
            try {
                const response = await TourServices.getAllTour({
                    title: null,
                    minPrice: null,
                    maxPrice: null,
                    categoryId: null,
                    startDate: null,
                    endDate: null,
                });
                setTours(response.data);
                const tourOptions = response.data.map((tour) => ({
                    value: tour.id,
                    label: tour.title,
                }));
                setSelectData(tourOptions);
            } catch (error) {
                console.error('Error fetching tours:', error);
            }
        };
        fetchTours();
    }, []);

    // Gọi API bookingCountData khi selectedTourId thay đổi
    useEffect(() => {
        if (selectedTourId) {
            const fetchBookingCount = async () => {
                try {
                    const response = await AdminServices.getBookingCount({ tourId: selectedTourId });
                    // Thêm key cho mỗi item để Table hoạt động đúng
                    const dataWithKey = response.data.map((item, index) => ({
                        ...item,
                        key: index.toString(),
                    }));
                    setBookingCount(dataWithKey);
                } catch (error) {
                    console.error('Error fetching booking count:', error);
                }
            };
            fetchBookingCount();
        }
    }, [selectedTourId]);

    // Xử lý khi người dùng chọn tour từ Select
    const handleSelectChange = (value) => {
        setSelectedTourId(value);
        setBookingCount([]);
    };
    const handleOpenModal = (record) => {
        setModalData({
            tourId: record.tourID, // Lấy tourID từ row
            tourDetailId: record.tourDetailId, // Lấy tourDetailId từ row
        });
        setOpen(true); // Mở Modal
    };
    // Cấu hình columns cho Table
    const columns = [
        {
            title: 'Tên tour',
            dataIndex: 'tourTitle',
            showSorterTooltip: { target: 'full-header' },
            onFilter: (value, record) => record.tourTitle.toLowerCase().includes(value.toLowerCase()),
            sorter: (a, b) => a.tourTitle.localeCompare(b.tourTitle),
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Số lượng đặt tour',
            dataIndex: 'bookingCount',
            defaultSortOrder: 'descend',
            showSorterTooltip: { target: 'full-header' },
            onFilter: (value, record) => record.bookingCount.toString().includes(value),
            sorter: (a, b) => a.bookingCount - b.bookingCount,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Ngày bắt đầu tour',
            dataIndex: 'startDate',
            render: (text) => `${config.webConfig.convertDateNoTime(text)}`,
            sorter: (a, b) => new Date(a.startDate) - new Date(b.startDate),
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Ngày kết thúc tour',
            dataIndex: 'endDate',
            render: (text) => `${config.webConfig.convertDateNoTime(text)}`,
            sorter: (a, b) => new Date(a.endDate) - new Date(b.endDate),
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Tổng tiền tour',
            dataIndex: 'totalAmount',
            render: (text) => `${config.webConfig.getCurrency(text)}`,
            showSorterTooltip: { target: 'full-header' },
            onFilter: (value, record) => record.totalAmount.toString().includes(value),
            sorter: (a, b) => a.totalAmount - b.totalAmount,
            sortDirections: ['ascend', 'descend'],
        },
        {
            title: 'Mã booking',
            dataIndex: 'bookingNo', // Sửa từ totalAmount thành bookingNo
        },
        {
            title: 'Chi tiết',
            render: (_, record) => (
                <Space>
                    <Tooltip placement="top" title={'Xem chi tiết tour'}>
                        <Button
                            icon={<PlusOutlined />}
                            onClick={() => handleOpenModal(record)} // Gọi hàm với dữ liệu row
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };

    return (
        <Card className="p-4">
            {/* Tiêu đề */}
            <div className="flex flex-col gap-4 mb-4">
                <h3 className="text-xl font-bold uppercase text-orange-400">Danh sách tour bán chạy</h3>
                <Divider />
                <div className="flex flex-col gap-2">
                    <label className="text-md font-bold">Chọn tourId để tìm</label>
                    <Select
                        className="w-3/4"
                        placeholder="Chọn tourId"
                        showSearch
                        allowClear
                        filterSort={(optionA, optionB) =>
                            optionA.label.toLowerCase().localeCompare(optionB.label.toLowerCase())
                        }
                        options={selectData}
                        onChange={handleSelectChange}
                        filterOption={(input, option) =>
                            option.label.toLowerCase().includes(input.toLowerCase())
                        }
                    />
                </div>
            </div>

            {/* Bảng dữ liệu */}
            <Table
                columns={columns}
                dataSource={bookingCount} // Dữ liệu từ API
                onChange={onChange}
                showSorterTooltip={{ target: 'sorter-icon' }}
            />
            <Modal
                footer={null}
                open={open}
                onCancel={() => setOpen(false)}
                title={<p className="text-lg font-bold text-orange-400 uppercase">Xem chi tiết tour</p>}
                className="rounded-lg"
            >
                <div className="flex flex-col gap-2">
                    <p className="text-gray-700">
                        <span className="font-bold">Mã tour:</span> {modalData.tourId}
                    </p>
                    <p className="text-gray-700">
                        <span className="font-bold">Mã chi tiết tour:</span> {modalData.tourDetailId}
                    </p>
                </div>
            </Modal>
        </Card>
    );
};