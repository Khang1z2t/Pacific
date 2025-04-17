import React, { useCallback, useEffect, useState } from 'react';
import {
    Button,
    Card,
    Divider,
    Image,
    Input,
    message,
    Modal,
    Rate,
    Space,
    Switch,
    Table,
    Tooltip,
    Typography,
} from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import TourServices from '~/services/TourServices';
import config from '~/config';
import { AddTour } from '~/pages/Admin/sections/ToursPage/components/AddTour';
import { EditTour } from '~/pages/Admin/sections/ToursPage/components/EditTour';
import { AddTourDetail } from '~/pages/Admin/sections/ToursPage/components/AddTourDetail';
import CategoryServices from '~/services/CategoryServices';
import { RefreshCwIcon } from 'lucide-react';
import DestinationServices from '~/services/DestinationServices';

const { Title } = Typography;
const { Text } = Typography;

const TourList = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [tours, setTours] = useState([]);
    const [tourDetail, setTourDetail] = useState({});
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addDetailModalVisible, setAddDetailModalVisible] = useState(false);
    const [category, setCategory] = useState([]);
    const [destination, setDestination] = useState([]);
    const [selectedTour, setSelectedTour] = useState(null);

    // Hàm fetch dữ liệu dùng Promise.all
    const fetchData = useCallback(async () => {
        try {
            const [categoryRes, destinationRes, tourRes] = await Promise.all([
                CategoryServices.getCategories(),
                DestinationServices.getAll(),
                TourServices.getAllTour({
                    title: null,
                    minPrice: null,
                    maxPrice: null,
                    categoryId: null,
                    startDate: null,
                    endDate: null,
                }),
            ]);
            setCategory(categoryRes || []);
            setDestination(destinationRes || []);
            setTours(tourRes.data || []);
        } catch (error) {
            console.error('Error fetching data:', error);
            message.error('Không thể tải dữ liệu!');
        } finally {
            setLoading(false);
        }
    }, []);

    // Load dữ liệu khi component mount hoặc loading thay đổi
    useEffect(() => {
        fetchData();
    }, [fetchData, loading]);

    // Memoize handler cho chi tiết tour
    const handleCheckDetail = useCallback(async (id) => {
        try {
            const res = await TourServices.getById(id);
            setTourDetail(res.data || {});
            setDetailModalVisible(true);
        } catch (error) {
            console.error('Error fetching tour detail:', error);
            message.error('Không thể tải chi tiết tour!');
        }
    }, []);


    // Memoize handler ẩn/hiện tour
    const handleHideTour = useCallback(async (id, active) => {
        try {
            await TourServices.HideTour(id, active);
            setTours((prev) =>
                prev.map((item) =>
                    item.id === id ? { ...item, active } : item,
                ),
            );
            message.success('Thay đổi trạng thái thành công!');
        } catch (error) {
            console.error('Error hiding tour:', error);
            message.error('Thay đổi trạng thái thất bại!');
        }
    }, []);

    // Cấu hình columns cho table
    const columns = [
        {
            title: 'Tên tour',
            dataIndex: 'title',
            key: 'title',
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Tìm kiếm tour"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button type="primary" onClick={() => confirm()} icon={<SearchOutlined />} size="small"
                                style={{ width: 90 }}>
                            Tìm
                        </Button>
                        <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            onFilter: (value, record) => record.title.toLowerCase().includes(value.toLowerCase()),
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a.title.length - b.title.length,
        },
        {
            title: 'Giá tour',
            dataIndex: 'maxPrice',
            key: 'maxPrice',
            render: (maxPrice) => `${config.webConfig.getCurrency(maxPrice)}`,
            filters: [
                { text: 'Dưới 5 triệu', value: [0, 5000000] },
                { text: '5 - 10 triệu', value: [5000000, 10000000] },
                { text: '10 - 20 triệu', value: [10000000, 20000000] },
                { text: 'Trên 20 triệu', value: [20000000, Infinity] },
            ],
            onFilter: (value, record) => {
                const [min, max] = value;
                return record.maxPrice >= min && record.maxPrice <= max;
            },
        },
        {
            title: 'Điểm đến',
            dataIndex: 'destinationId',
            key: 'destinationId',
            render: (destinationId) => (
                <Text className="font-semibold">
                    {destination.find((item) => item.id === destinationId)?.name || destinationId}
                </Text>
            ),
            filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        placeholder="Tìm kiếm điểm đến"
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => confirm()}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button type="primary" onClick={() => confirm()} icon={<SearchOutlined />} size="small"
                                style={{ width: 90 }}>
                            Tìm
                        </Button>
                        <Button onClick={() => clearFilters()} size="small" style={{ width: 90 }}>
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
            onFilter: (value, record) => destination.find((item) => item.id === record.destinationId)?.name.toLowerCase().includes(value.toLowerCase()),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
            render: (e) => (
                <Text
                    className={`text-${e === 'PUBLISHED' ? 'green' : 'red'}-500 bg-orange-100 p-1 rounded-lg border border-orange-200 font-semibold`}>
                    {e === 'PUBLISHED' ? 'Đang bán' : 'Ngừng bán'}
                </Text>
            ),
            filters: [
                { text: 'Đang bán', value: 'PUBLISHED' },
                { text: 'Ngừng bán', value: 'DRAFT' },
            ],
            onFilter: (value, record) => record.status === value,
        },
        {
            title: 'Ẩn/Hiện tour',
            key: 'active',
            render: (record) => (
                <Switch
                    checked={record.active}
                    loading={loading}
                    onClick={(checked) => handleHideTour(record.id, checked)}
                />
            ),
        },
        {
            title: 'Chi tiết tour',
            key: 'id',
            render: (record) => (
                <Button onClick={() => handleCheckDetail(record.id)}>Xem chi tiết</Button>
            ),
        },
        {
            title: 'Thao tác',
            key: 'actions',
            render: (record) => (
                <Space>
                    <Tooltip placement={'top'} title={'Chỉnh sửa tour'}>
                        <Button icon={<EditOutlined />} onClick={() => {
                            setEditModalVisible(true);
                            setSelectedTour(record);
                        }} />
                    </Tooltip>
                    <Tooltip placement="top" title="Xóa tour">
                        <Button
                            icon={<DeleteOutlined />}
                            danger
                            onClick={() => message.warning('Đang phát triển')}
                        />
                    </Tooltip>
                    <Tooltip placement="top" title="Thêm chi tiết tour">
                        <Button
                            icon={<PlusOutlined />}
                            onClick={() => {
                                setSelectedTour(record);
                                setAddDetailModalVisible(true);
                            }}
                        />
                    </Tooltip>
                </Space>
            ),
        },
    ];

    const detailColumns = [
        {
            title: 'Mã tour chi tiết',
            dataIndex: 'id',
            key: 'id',
            render: (id) => (
                <Tooltip title={"Bấm vào để sao chép"} placement={'bottom'}>
                    <Text className="font-semibold text-blue-500 cursor-pointer"
                          onClick={() => {
                              navigator.clipboard.writeText(id);
                              message.success('Đã sao chép mã tour chi tiết vào clipboard');
                          }}>
                        Mã tour chi tiết
                    </Text>
                </Tooltip>
            ),
        },
        {
            title: 'Giá tour người lớn',
            dataIndex: 'priceAdults',
            key: 'priceAdults',
            render: (price) => `${config.webConfig.getCurrency(price)}`,
        },
        {
            title: 'Giá tour trẻ em',
            dataIndex: 'priceChildren',
            key: 'priceChildren',
            render: (price) => `${config.webConfig.getCurrency(price)}`,
        },
        {
            title: 'Mã Hotel',
            dataIndex: 'hotelId',
            key: 'hotelId',
            render: (hotelId) => (
                <Tooltip title={"Bấm vào để sao chép"} placement={'bottom'}>
                    <Text className="font-semibold text-blue-500 cursor-pointer"
                          onClick={() => {
                              navigator.clipboard.writeText(hotelId);
                              message.success('Đã sao chép mã hotel vào clipboard');
                          }}>
                        Mã hotel
                    </Text>
                </Tooltip>
            ),
        },
        {
            title: 'Mã phương tiện',
            dataIndex: 'transportId',
            key: 'transportId',
            render: (transportId) => (
                <Tooltip title={"Bấm vào để sao chép"} placement={'bottom'}>
                    <Text className="font-semibold text-blue-500 cursor-pointer"
                          onClick={() => {
                              navigator.clipboard.writeText(transportId);
                              message.success('Đã sao chép mã phương tiện vào clipboard');
                          }}>
                        Mã phương tiện
                    </Text>
                </Tooltip>
            ),
        },
        {
            title: 'Ngày khởi hành',
            dataIndex: 'startDate',
            key: 'startDate',
            render: (e) => `${config.webConfig.convertDate(e?.startDate)}`,
        },
        { title: 'Số lượng tour', dataIndex: 'quantity', key: 'quantity' },
        {
            title: 'Trạng thái',
            dataIndex: 'active',
            key: 'active',
            render: (status) => <Switch checked={status} disabled />,
        },
    ];

    return (
        <div className="bg-white p-4 rounded shadow-lg">
            <div className={'flex flex-col gap-4'}>
                <Title level={2}>QUẢN LÝ TOUR</Title>
                <Space>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>
                        Thêm
                    </Button>
                    <Button
                        type={'text'}
                        icon={<RefreshCwIcon />}
                        onClick={() => {
                            setLoading(true);
                            fetchData();
                        }}
                        loading={loading}
                        className={'border border-gray-300 rounded-md p-2'}
                    >
                        Làm mới
                    </Button>
                </Space>
                <Card
                    className="bg-indigo-50 border border-blue-700 shadow-md w-full md:w-1/2 rounded-lg p-1"
                    bodyStyle={{ padding: '16px' }}
                >
                    <Text strong className="text-red-500 text-lg">
                        Lưu ý:
                    </Text>
                    <Text className="text-gray-800 leading-relaxed">
                        {' '}"Trạng thái" là <Text strong>DRAFT</Text> là tour đã hết, <Text strong>PUBLISHED</Text> là
                        tour
                        đang được bán.
                        Khi tour có Tour chi tiết đầy đủ thì trạng thái tour sẽ chuyển sang <Text
                        strong>PUBLISHED</Text>.
                        <br />
                        "Ẩn/Hiện" là trạng thái tour đang được sử dụng hay không.
                    </Text>
                </Card>
            </div>
            <Table
                columns={columns}
                dataSource={tours}
                loading={loading}
                pagination={{ pageSize: 5 }}
                rowKey="id"
            />
            <Modal
                title="Chi tiết tour"
                width={950}
                okText="Lưu"
                cancelText="Đóng"
                open={detailModalVisible}
                onOk={() => setDetailModalVisible(false)}
                onCancel={() => setDetailModalVisible(false)}
            >
                <div className="p-4 space-y-2 w-full">
                    <div className="items-start flex gap-4">
                        <div className="flex flex-wrap gap-4">
                            <Image
                                src={config.imageConfig.getImage(tourDetail.thumbnail)}
                                width={200}
                                height={200}
                                title="Thumbnail"
                            />
                        </div>
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">{tourDetail.title}</h2>
                        <h3 className="text-md text-gray-500 line-clamp-3">{tourDetail.description}</h3>
                        <Rate defaultValue={tourDetail.ratingAvg} disabled />
                    </div>
                    <Divider />
                    <h3 className="text-lg font-semibold">Thông tin cơ bản</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="gap-2 mb-4 items-center">
                            <p><span
                                className="font-semibold">Điểm đến:</span> {destination.find((item) => item.id === tourDetail.destinationId)?.name || tourDetail.destinationId}
                            </p>
                            <p><span
                                className="font-semibold">Thời gian:</span> {tourDetail.duration} ngày {tourDetail.duration - 1} đêm
                            </p>
                            <p><span
                                className="font-semibold">Giá:</span> {config.webConfig.getCurrency(tourDetail.maxPrice)}
                            </p>
                        </div>
                        <div className="gap-2 mb-4 items-center">
                            <p><span
                                className="font-semibold">Trạng thái (Ẩn/Hiện):</span> {tourDetail.active ? 'Đang được sử dụng' : 'Đang được ẩn'}
                            </p>
                            <p><span
                                className="font-semibold">Trạng thái bán:</span> {tourDetail.status === 'PUBLISHED' ? 'Đang được bán' : 'Đã hết tour'}
                            </p>
                        </div>
                    </div>
                    <Divider />
                    <div>
                        <h3 className="text-lg font-semibold">Thông tin nâng cao</h3>
                        <Table
                            pagination={{ pageSize: 3 }}
                            columns={detailColumns}
                            dataSource={tourDetail.detail || []}
                            rowKey="id"
                        />
                    </div>
                </div>
            </Modal>
            <AddTour
                destination={destination}
                category={category}
                setLoading={(loading) => setLoading(!loading)}
                setModalVisible={setModalVisible}
                modalVisible={modalVisible}
            />
            <EditTour
                tourData={selectedTour}
                destination={destination}
                category={category}
                setLoading={(setLoading) => setLoading(!setLoading)}
                setEditModalVisible={setEditModalVisible}
                editModalVisible={editModalVisible}
            />
            <AddTourDetail
                tour={selectedTour}
                setAddDetailModalVisible={setAddDetailModalVisible}
                addDetailModalVisible={addDetailModalVisible}
            />
        </div>
    );
};

export default TourList;