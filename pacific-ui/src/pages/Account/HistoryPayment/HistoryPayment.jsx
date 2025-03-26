import React, { useState } from 'react';
import { Button, Card, Divider, Modal, Table, Tooltip } from 'antd';
import config from '~/config';
import { PlusOutlined } from '@ant-design/icons';
import TourDetailServices from '~/services/TourDetailServices';
import moment from 'moment';

const historyData = [
    {
        key: '1',
        transactionId: 'TXN12345',
        date: '2024-02-19',
        amount: '$50',
        status: 'Completed',
        details: 'Thanh toán tiền phòng tháng 2.',
    },
    {
        key: '2',
        transactionId: 'TXN67890',
        date: '2024-01-19',
        amount: '$50',
        status: 'Sắp khởi hành',
        details: 'Thanh toán tiền phòng tháng 1.',
    },
];

export default function HistoryPayment({ data, booking }) {
    const [visible, setVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [tourDetail, setTourDetail] = useState({});
    const columns = [
        {
            title: 'Mã giao dịch',
            dataIndex: 'transactionId',
            key: 'transactionId',
        },
        {
            title: 'Ngày',
            dataIndex: 'createdAt',
            key: 'createdAt',
            render: (date) => config.webConfig.convertDateNoTime(date),
        },
        {
            title: 'Số tiền',
            dataIndex: 'totalAmount',
            key: 'totalAmount',
            render: (price) => config.webConfig.getCurrency(price),
        },
        {
            title: 'Trạng thái',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Chi tiết',
            key: 'action',
            render: (record) => (
                <Tooltip placement="top" title={'Xem chi tiết hóa đơn'}>
                    <Button icon={<PlusOutlined />} onClick={() => showDetails(record)}></Button>
                </Tooltip>
            ),
        },
    ];

    const showDetails = async (record) => {
        setSelectedTransaction(record);
        try {
            TourDetailServices.getTourDetailById(booking.tourDetailId).then((res) => {
                setTourDetail(res.data);
            }).catch((err) => {
                console.error(err);
            });
        } catch (err) {
            console.log(err);
        }

        setVisible(true);
    };

    return (
        <div className="container mx-auto">
            <Table columns={columns} dataSource={data} pagination={true} />
            <Modal
                width={800}
                title="Chi tiết thanh toán"
                open={visible}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                {selectedTransaction && (
                    <div>
                        <div className={'grid grid-cols-2 gap-3'}>
                            <div>
                                <label className="font-semibold text-black">Mã giao dịch</label>
                                <p>{selectedTransaction.transactionId}</p>
                            </div>
                            <div>
                                <label className="font-semibold text-black">Ngày</label>
                                <p>{config.webConfig.convertDateNoTime(selectedTransaction.createdAt)}</p>
                            </div>
                            <div>
                                <label className="font-semibold text-black">Số tiền</label>
                                <p>{config.webConfig.getCurrency(selectedTransaction.totalAmount)}</p>
                            </div>
                            <div>
                                <label className="font-semibold text-black">Trạng thái</label>
                                <p>{selectedTransaction.status ? 'Thành công' : 'Thất bại'}</p>
                            </div>
                        </div>
                        <Card className={'shadow-lg'}>
                            {booking && (
                                <>
                                    <div className={'grid grid-cols-2 gap-4'}>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Số lượng người lớn</label>
                                            <p>{booking.adultNum}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Số lượng trẻ em</
                                                label>
                                            <p>{booking.adultNum}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Số điện thoại</label>
                                            <p>{booking.phone}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Tổng tiền</label>
                                            <p>{config.webConfig.getCurrency(booking.totalAmount)}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Hình thức thanh toán</label>
                                            <p>{booking.paymentMethod}</p>
                                        </div>
                                    </div>
                                    <Divider
                                        orientation="center"
                                        style={{ borderColor: '#7cb305' }}
                                    />
                                    <div className={'grid grid-cols-2 gap-4'}>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Mã tour</label>
                                            <p>{tourDetail.id}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Ngày khởi hành</label>
                                            <p>{moment(tourDetail.startDate).format('DD/MM/YYYY')}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Người lớn</label>
                                            <p>{config.webConfig.getCurrency(tourDetail.priceAdults)}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Trẻ em</label>
                                            <p>{config.webConfig.getCurrency(tourDetail.priceChildren)}</p>
                                        </div>
                                    </div>
                                </>
                            )}
                        </Card>
                    </div>
                )}
            </Modal>
        </div>
    );
}
