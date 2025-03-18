import React, { useState, useEffect } from 'react';
import {
    Table,
    Button,
    Switch,
    Typography,
    Space,
    Input,
    Modal,
    Form,
    Select,
    Image,
    Divider,
    Rate,
    Tooltip,
    Upload, message,
} from 'antd';
import { SearchOutlined, PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import TourServices from '~/services/TourServices';
import { prices } from '~/pages/TourLists/data/prices';
import config from '~/config';
import { AddTour } from '~/pages/Admin/sections/ToursPage/components/AddTour';
import { EditTour } from '~/pages/Admin/sections/ToursPage/components/EditTour';
import { AddTourDetail } from '~/pages/Admin/sections/ToursPage/components/AddTourDetail';
import TourDetailServices from '~/services/TourDetailServices';
import { setActive } from '@material-tailwind/react/components/Tabs/TabsContext';


const { Title } = Typography;

const TourList = () => {
    const [modalVisible, setModalVisible] = useState(false);

    const [loading, setLoading] = useState(false);
    const [detailModalVisible, setDetailModalVisible] = useState(false);
    const [tours, setTours] = useState([]);
    const [tourDetail, setTourDetail] = useState([]);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addDetailModalVisible, setAddDetailModalVisible] = useState(false);
    const [active, setActive] = useState(null);

    // add tourDetail
    const [id, setId] = useState(null);

    useEffect(() => {
        TourServices.getAllTour().then((res) => {
            setTours(res.data);
            setLoading(false);
        });
    }, [loading]);

    const handleCheckDetail = async (id) => {
        await TourServices.getById(id).then((res) => {
            setTourDetail(res.data);
        }).catch((err) => {
            console.log(err);
        });
        setDetailModalVisible(true);
    };
    const handleOpenAddTourDetail = (key) => {
        setId(key);
        setAddDetailModalVisible(true);
    };

    const handleHideTour = async (id) => {
        await TourServices.HideTour(id).then((res) => {
            console.log(res);
            setActive(res);
            setLoading(!loading);
            message.success('Ẩn tour thành công');
        }).catch((err) => {
            console.log(err);
            message.error('Ẩn tour thất bại');
        });
        console.log(id)
    };
    //
    const columns = [
        // { title: 'ID', dataIndex: 'id', key: 'id' },
        { title: 'Tên tour', dataIndex: 'title', key: 'title' },
        {
            title: 'Giá tour',
            dataIndex: 'maxPrice',
            key: 'maxPrice',
            render: (maxPrice) => `${config.webConfig.getCurrency(maxPrice)}`,
        },
        { title: 'Điểm đến', dataIndex: 'destination', key: 'destination' },
        {
            title: 'Trạng thái', dataIndex: 'status', key: 'status', render: (e) => {
                return (
                    <Switch checked={e === 'PUBLISHED'} />
                );
            },
        },
        {
            title: 'Ẩn/Hiện tour', key: 'active', render: (e) => {
                return (
                    <Switch value={e.active} onClick={() => handleHideTour(e.id)} />
                );
            },
        },
        {
            title: 'Chi tiết tour', key: 'id', render: (e) => {
                return (
                    <Button onClick={() => {
                        handleCheckDetail(e.id);
                    }}>Xem chi tiết</Button>
                );
            },
        },
        {
            title: 'Thao tác', key: 'actions', render: (e) => {
                return (
                    <Space>
                        <Button icon={<EditOutlined />} onClick={() => setEditModalVisible(true)} />
                        <Tooltip placement={'top'} title={'Xóa tour'}>
                            <Button icon={<DeleteOutlined />} danger onClick={() => {
                                message.warning('Dang phat trien');
                            }} />
                        </Tooltip>
                        <Tooltip placement="top" title={'Thêm chi tiết tour'}>
                            <Button icon={<PlusOutlined />} onClick={() => handleOpenAddTourDetail(e.id)}></Button>
                        </Tooltip>
                    </Space>
                );
            },
        },
    ];

    const detailColumns =
        [
            { title: 'ID', dataIndex: 'id', key: 'id' },
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
            { title: 'Mã Hotel', dataIndex: 'hotelId', key: 'hotelId' },
            { title: 'Mã phương tiện', dataIndex: 'transportId', key: 'transportId' },
            {
                title: 'Ngày khởi hành',
                dataIndex: 'startDate',
                key: 'startDate',
                render: (e) => `${config.webConfig.convertDate(e.startDate)}`,
            },
            { title: 'Số lượng tour', dataIndex: 'quantity', key: 'quantity' },
            {
                title: 'Trạng thái', dataIndex: 'active', key: 'active', render: (status) => {
                    return (
                        <Switch checked={status} />
                    );
                },
            },
        ];

    // Edit Tour

    return (
        <div className={'bg-white p-4 rounded shadow-lg'}>
            <Title level={2}>QUẢN LÝ TOUR</Title>
            <div className={'mb-2 w-full flex gap-4 items-center flex-wrap'}>
                <Input rootClassName={'w-fit'} placeholder="Tìm kieê" prefix={<SearchOutlined />} />
                <Select className={'w-fit'}
                        placeholder={'Chọn giá'}
                        options={prices}
                />
                <Button type="primary" icon={<PlusOutlined />} onClick={() => setModalVisible(true)}>Thêm</Button>
            </div>
            <Table
                columns={columns}
                dataSource={tours}
                loading={loading}
                pagination={{ pageSize: 5 }}
                rowKey="id"
            />


            <Modal title={'Chi tiết tour'}
                   width={850}
                   okText={'Lưu'}
                   cancelText={'Đóng'}
                   open={detailModalVisible}
                   onOk={() => setDetailModalVisible(false)}
                   onCancel={() => setDetailModalVisible(false)}
            >
                <div className={'p-4 space-y-2 w-full'}>
                    <div className={'items-start flex gap-4'}>
                        <div className={'flex flex-wrap gap-4'}>
                            <Image src={config.imageConfig.getImage(tourDetail.thumbnail)} width={200} height={200}
                                   title={'ThumbNail'} />

                            {/*{tourDetail.images.map((image, index) => (*/}
                            {/*    <Image key={index} src={config.imageConfig.getImage(image)} width={200} height={200} />*/}
                            {/*))}*/}
                        </div>
                    </div>
                    <div>
                        <h2 className={'text-xl font-semibold'}>{tourDetail.title}</h2>
                        <h3 className={'text-md text-gray-500 line-clamp-3'}>{tourDetail.description}</h3>
                        <Rate defaultValue={tourDetail.ratingAvg} disabled />
                    </div>
                    <Divider />
                    <div className={'gap-2 mb-4 items-center'}>
                        <h3 className={'text-lg font-semibold'}>Thông tin cơ bản</h3>
                        <p><span className={'font-semibold'}>Điểm đến:</span> {tourDetail.destination}</p>
                        <p><span
                            className={'font-semibold'}>Thời gian:</span> {tourDetail.duration} ngày {tourDetail.duration - 1} đêm
                        </p>
                        <p><span
                            className={'font-semibold'}>Giá:</span> {config.webConfig.getCurrency(tourDetail.maxPrice)}
                        </p>
                    </div>
                    <Divider />
                    <div className={''}>
                        <h3 className={'text-lg font-semibold'}>Thông tin nâng cao</h3>
                        <Table pagination={{ pageSize: 3 }} columns={detailColumns} dataSource={tourDetail.detail} />
                    </div>
                </div>
            </Modal>
            <AddTour setLoading={() => {
                setLoading(!loading);
            }} setModalVisible={setModalVisible} modalVisible={modalVisible} />
            <EditTour setEditModalVisible={setEditModalVisible} editModalVisible={editModalVisible} />
            <AddTourDetail tourId={id} setAddDetailModalVisible={setAddDetailModalVisible}
                           addDetailModalVisible={addDetailModalVisible} />
        </div>
    );
};

export default TourList;
