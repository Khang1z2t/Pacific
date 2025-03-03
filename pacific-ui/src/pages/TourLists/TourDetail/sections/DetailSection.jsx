import React, { useState } from 'react';
import { Button, Card } from 'antd';
import { PhoneOutlined } from '@ant-design/icons';
import BookingServices from '~/services/BookingServices';
import { useNavigate } from 'react-router-dom';
import config from '~/config';


const DetailSection = ({...tour}) => {
    const imgItems = [
        {
            src: "/img/TourDetail/vietnam/2.jpg",
            alt: "Thumbnail 1"
        },
        {
            src: "/img/TourDetail/vietnam/3.jpg",
            alt: "Thumbnail 2"
        },
        {
            src: "/img/TourDetail/vietnam/4.jpg",
            alt: "Thumbnail 3"
        },
        {
            src: "/img/TourDetail/vietnam/5.jpg",
            alt: "Thumbnail 4"
        },
    ]
    const [quantity, setQuantity] =  useState('');
    const [orderInfo, setOrderInfo] = useState('');

    const price = tour.priceAdults;
    const navigate = useNavigate();

    // const BookTour = (price,quantity,orderInfo) => {
    //     let amount = quantity * price;
    //     BookingServices.checkOut(amount,orderInfo).then((res) => {
    //        window.location.href = res;
    //        console.log("redirect: ",res)
    //     }).catch((err) => {
    //         console.error(err);
    //     });
    // }

    return (
        <div className="flex justify-between px-8 py-6">
            {/* Left Section: Image Gallery and Title */}
            <div className="flex flex-col w-full">
                <div className="grid grid-cols-4 gap-2 mb-4">
                    <img src="/img/TourDetail/vietnam/1.jpg" alt="Main Tour" className="col-span-3 rounded-xl w-full h-full object-cover shadow-lg" />
                    <div className="flex flex-col gap-2">
                        {imgItems.map((img, index) => (
                            <img key={index} src={img.src} alt={img.alt} className="rounded-xl w-full h-full hover:cursor-pointer shadow-lg object-cover" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Section: Booking Info */}
            <Card className="max-w-sm p-4 shadow-xl ms-10 rounded-2xl">
                <h2 className="text-2xl font-semibold mb-4 text-red-600">Giá: {tour.priceAdults} / Khách</h2>
                <p className="bg-red-100 text-red-600 p-2 rounded mb-2">
                    Đặt ngay để nhận ưu đãi giờ chót tiết kiệm thêm 300K
                </p>
                <div className="space-y-2">
                    <p><strong>Mã tour:</strong> NDSGN841-017-270924XE-H</p>
                    <p><strong>Khởi hành:</strong> {tour.destination}</p>
                    <p><strong>Ngày khởi hành:</strong> {tour.createdAt}</p>
                    <p><strong>Thời gian:</strong> 3N2Đ</p>
                    <p><strong>Số chỗ còn:</strong> 9 chỗ</p>
                </div>
                <div className="flex space-x-4 mt-4">
                    <Button
                        onClick={() => navigate(config.routes.booking + `${tour.id}`)}
                        type="primary" className="bg-red-500 hover:bg-red-700 w-full">
                        Đặt tour
                    </Button>
                    <Button className="bg-blue-500 text-white hover:bg-blue-700 w-full">
                        Ngày khác
                    </Button>
                </div>
                <div className="mt-4">
                    <Button icon={<PhoneOutlined />} className="w-full bg-gray-100">
                        Gọi miễn phí qua internet
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default DetailSection;
