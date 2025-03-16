import { useState } from "react";
import {Table, Modal, Button, Divider} from "antd";

const historyData = [
    {
        key: "1",
        transactionId: "TXN12345",
        date: "2024-02-19",
        amount: "$50",
        status: "Completed",
        details: "Thanh toán tiền phòng tháng 2."
    },
    {
        key: "2",
        transactionId: "TXN67890",
        date: "2024-01-19",
        amount: "$50",
        status: "Sắp khởi hành",
        details: "Thanh toán tiền phòng tháng 1."
    }
];

export default function HistoryPayment() {
    const [visible, setVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);
    const [status, setStatus] = useState("Completed");
    const columns = [
        {
            title: "Mã giao dịch",
            dataIndex: "transactionId",
            key: "transactionId"
        },
        {
            title: "Ngày",
            dataIndex: "date",
            key: "date"
        },
        {
            title: "Số tiền",
            dataIndex: "amount",
            key: "amount"
        },
        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status"
        },
        {
            title: "Hành động",
            key: "action",
            render: (record) => (
                <>
                    {record.status === "Completed" ? (
                        <div className={"flex flex-row"}>
                            <Button type="link" onClick={() => showDetails(record)}>
                                Xem chi tiết
                            </Button>
                            <span>/</span>
                            <Button type="link" onClick={() => showDetails(record)}>
                                Đánh giá
                            </Button>
                        </div>
                    ) : (
                        <Button type="link" onClick={() => showDetails(record)}>
                            Xem chi tiết
                        </Button>
                    )}
                </>
            )
        }
    ];

    const showDetails = (record) => {
        setSelectedTransaction(record);
        setVisible(true);
    };

    return (
        <div className="container mx-auto">
            <Table columns={columns} dataSource={historyData} pagination={true} />
            <Modal
                title="Chi tiết thanh toán"
                visible={visible}
                onCancel={() => setVisible(false)}
                footer={null}
            >
                {selectedTransaction && (
                    <div>
                        <p><strong>Mã giao dịch:</strong> {selectedTransaction.transactionId}</p>
                        <p><strong>Ngày:</strong> {selectedTransaction.date}</p>
                        <p><strong>Số tiền:</strong> {selectedTransaction.amount}</p>
                        <p><strong>Trạng thái:</strong> {selectedTransaction.status}</p>
                        <p><strong>Chi tiết:</strong> {selectedTransaction.details}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
}
