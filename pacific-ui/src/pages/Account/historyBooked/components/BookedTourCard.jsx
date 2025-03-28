import { Button, Card, Image, message, Modal, Table, QRCode } from 'antd';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import config from '~/config';

export const BookedTourCard = ({ data, tour }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const columns = [
        { title: 'Họ và tên', dataIndex: 'fullName', key: 'fullName' },
        { title: 'Số điện thoại', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'Email', dataIndex: 'email', key: 'email' },
        {
            title: 'Ngày sinh',
            dataIndex: 'birthday',
            key: 'birthday',
            render: (text) => (text ? config.webConfig.convertDateNoTime(text) : 'N/A'),
        },
        { title: 'Nhóm tuổi', dataIndex: 'ageGroup', key: 'ageGroup' },
        {
            title: 'Giá/Người',
            dataIndex: 'price',
            key: 'price',
            render: (text) => config.webConfig.getCurrency(text),
        },
    ];


    if (!tour) {
        return (
            <Card className="w-full rounded-lg shadow-lg border-2">
                <p className="text-lg font-bold text-gray-500">Không tìm thấy thông tin tour</p>
            </Card>
        );
    }

    return (
        <>
            <Card
                className="w-full rounded-lg shadow-lg hover:cursor-pointer hover:shadow-xl hover:border-orange-600 border-2 transition-all duration-500"
            >
                <div className="flex justify-between gap-4">
                    <div>
                        <p className="text-lg font-bold">Tên tour: {tour.title || 'N/A'}</p>
                        <p className="text-lg font-bold">
                            Ngày đi: {tour.duration ? `${tour.duration}N${tour.duration - 1}Đ` : 'N/A'}
                        </p>
                        <p className="text-lg font-bold">Số người: {data.totalNumber || 0}</p>
                        <p className="text-lg font-bold">
                            Tổng tiền: {config.webConfig.getCurrency(data.totalAmount || 0)}
                        </p>
                    </div>
                    <div className={data.status === 'SUCCESS' ? 'text-green-500' : 'text-red-500'}>
                        <p className="text-lg font-bold">
                            Trạng thái: {data.status === 'SUCCESS' ? 'Thành công' :
                            data.status === 'PENDING' ? 'Đang chờ thanh toán' :
                                data.status || 'N/A'}
                        </p>
                        <p className="text-lg font-bold">
                            Phương thức thanh toán: {data.paymentMethod || 'N/A'}
                        </p>
                    </div>
                    <div>
                        <QRCode
                            value={config.webConfig.getTourDetailQrUrl(tour.id)} // Use the new function
                            size={128}
                            level="H"
                            includeMargin={true}
                        />
                    </div>
                </div>
                <div className="flex py-2">
                    <Button className="w-1/2" type="primary" onClick={showModal}>
                        Chi tiết
                    </Button>
                </div>
            </Card>

            <Modal
                title="Chi tiết tour"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="cancel" onClick={handleCancel}>
                        Đóng
                    </Button>,
                    <Button
                        key="view"
                        type="primary"
                        onClick={() => navigate(config.routes.tourDetail + tour.id)}
                        disabled={!tour.id}
                    >
                        Xem chi tiết
                    </Button>,
                ]}
            >
                <div className="flex flex-col items-center text-center">
                    <Image
                        src={config.imageConfig.getImage(tour.thumbnail) || config.webConfig.defaultTour}
                        alt={tour.title || 'Tour'}
                        width={200}
                        height={200}
                        className="w-full h-48 object-cover rounded-lg mb-4"
                    />
                    <p className="text-xl font-semibold">{tour.title || 'N/A'}</p>
                    <p className="text-lg text-gray-600">Số lượng người lớn: {data.adultNum || 0}</p>
                    <p className="text-lg text-gray-600">Số lượng trẻ em: {data.childrenNum || 0}</p>
                    <p className="text-lg text-gray-600">
                        Tổng tiền: {config.webConfig.getCurrency(data.totalAmount || 0)}
                    </p>
                </div>
                <Table
                    columns={columns}
                    dataSource={data.details || []}
                    pagination={false}
                    rowKey="id"
                />
            </Modal>
        </>
    );
};