import { message, Modal, Table } from 'antd';

import { useState } from 'react';

export const PaymentHistory = () => {
    const [openModal, setOpenModal] = useState(false);

    const handleSave = () => {
        message.success('Lưu thành công!',1)
        setOpenModal(false);
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
            key: 'amount',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Action',
            key: 'action',
            render: () => (
                <button onClick={() => setOpenModal(true)}
                        className={'text-blue-500 hover:text-blue-700 hover:underline font-semibold text-sm text-center block w-full'}>
                    Chỉnh sửa
                </button>
            ),
        },
    ];

    const data = [
        {
            key: '1',
            id: '1',
            date: '2021-10-10',
            amount: 100000,
            status: 'Success',
        },
        {
            key: '2',
            id: '2',
            date: '2021-10-11',
            amount: 200000,
            status: 'Success',
        },
        {
            key: '3',
            id: '3',
            date: '2021-10-12',
            amount: 300000,
            status: 'Success',
        },
    ];


    return (
        <div className={'container mx-auto justify-center p-4'}>
            <Table columns={columns} dataSource={data} pagination={true} />
            <Modal title={'Edit Payment'} visible={openModal} onCancel={() => setOpenModal(false)} footer={null}>
                <div className={'flex flex-col gap-4'}>
                    <div>
                        <label htmlFor="date">Date</label>
                        <input type="date" id="date" className={'w-full p-2 border border-gray-300 rounded-md'} />
                    </div>
                    <div>
                        <label htmlFor="amount">Amount</label>
                        <input type="number" id="amount" className={'w-full p-2 border border-gray-300 rounded-md'} />
                    </div>
                    <div>
                        <label htmlFor="status">Status</label>
                        <select id="status" className={'w-full p-2 border border-gray-300 rounded-md'}>
                            <option value="success">Success</option>
                            <option value="failed">Failed</option>
                        </select>
                    </div>
                    <button
                        onClick={handleSave}
                        className={'bg-blue-500 text-white p-2 rounded-md'}>Save</button>
                </div>
            </Modal>
        </div>
    );
};