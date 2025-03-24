import React, { useEffect, useState } from 'react';
import { Table, Modal, Button, Divider, Tooltip, Card, Input } from 'antd';
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

export default function HistoryPayment({ data }) {
    const [visible, setVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [orderInfo, setOrderInfo] = useState(null);
    const [tourDetail, setTourDetail] = useState({});
    const [status, setStatus] = useState('Completed');
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
            const decodedOrderInfo = atob(record.note);
            const pastedData = JSON.parse(decodedOrderInfo);
            setOrderInfo(pastedData);

            TourDetailServices.getTourDetailById(pastedData.tourId).then((res) => {
                setTourDetail(res.data);
            }).catch((err) => {
                console.error(err);
            });
        } catch (err) {
            console.log(err);
            setOrderInfo(null);
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
                        <div className={"grid grid-cols-2 gap-3"}>
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
                                <p>{selectedTransaction.status ? "Thành công" : "Thất bại"}</p>
                            </div>
                        </div>
                        <Card className={'shadow-lg'}>
                            {orderInfo && (
                                <>
                                    <div className={'grid grid-cols-2 gap-4'}>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Tên Người dùng</label>
                                            <p>{orderInfo.name}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Email</
                                                label>
                                            <p>{orderInfo.email}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Số điện thoại</label>
                                            <p>{orderInfo.phone}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Tổng tiền</label>
                                            <p>{config.webConfig.getCurrency(orderInfo.totalPrice)}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Hình thức thanh toán</label>
                                            <p>{orderInfo.paymentMethod}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Ghi chú</label>
                                            <p>{orderInfo.note || 'Không có ghi chú'}</p>
                                        </div>
                                    </div>
                                    <Divider
                                        orientation="center"
                                        style={{ borderColor: "#7cb305" }}
                                    />
                                    <div className={"grid grid-cols-2 gap-4"}>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Mã tour</label>
                                            <p>{tourDetail.id}</p>
                                        </div>
                                        <div className="flex flex-col gap-2">
                                            <label className="font-semibold text-black">Ngày khởi hành</label>
                                            <p>{moment(tourDetail.startDate).format("DD/MM/YYYY")}</p>
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
