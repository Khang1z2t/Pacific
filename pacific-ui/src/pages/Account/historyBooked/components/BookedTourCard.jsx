import { Button, Card, Modal } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

export const BookedTourCard = ({ id, title, quantity, bookingStatus, paymentMethod, createAt, totalAmount }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
    const handleViewDetail = () => navigate(`/tour-chi-tiet/${id}`);

    return (
        <>
            {/* Card hiển thị danh sách tour */}
            <Card
                className="w-full justify-center rounded-lg shadow-lg hover:cursor-pointer hover:shadow-xl hover:border-orange-600 border-2 transition-all duration-500"
            >
                <div className="flex flex-1 justify-between gap-4">
                    <div>

                        <p className="text-lg font-bold">Tên tour: {title}</p>
                        <p className="text-lg font-bold">Ngày tạo: {createAt}</p>
                        <p className="text-lg font-bold">Số người: {quantity}</p>
                        <p className="text-lg font-bold">Tổng tiền: {totalAmount}</p>
                    </div>
                    <div className={bookingStatus === "Đã thanh toán" ? "text-green-500" : "text-red-500"}>
                        <p className="text-lg font-bold">Trạng thái: {bookingStatus}</p>
                        <p className="text-lg font-bold">Phương thức thanh toán: {paymentMethod}</p>
                    </div>
                    <div className={""}>
                        <img src={config.imageConfig.getImage(config.webConfig.defaultQrCode)} alt={"QRCODE"} className={"aspect-square size-32"}/>
                    </div>
                </div>
                <div className={"flex py-2 flex-1"}>
                    <Button className={"w-1/2"} type="primary" onClick={showModal}>
                        Chi tiết
                    </Button>
                </div>
            </Card>

            {/* Modal hiển thị chi tiết tour */}
            <Modal
                title="Chi tiết tour"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Đóng
                    </Button>,
                    <Button key="view" type="primary" onClick={handleViewDetail}>
                        Xem chi tiết
                    </Button>,
                ]}
            >
                <div className="flex flex-col items-center text-center">
                    {/* Ảnh chính của tour */}
                    <img
                        src={`/images/tour-${id}.jpg`}
                        alt={title}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <p className="text-xl font-semibold">{title}</p>
                    <p className="text-lg text-gray-600">Số người đã đặt: {quantity}</p>
                    <p className="text-lg text-gray-600">Tổng tiền: {totalAmount}</p>
                    <p className="text-lg text-gray-600">Mã hóa đơn: HD{id}</p>
                </div>
            </Modal>
        </>
    );
};
