import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaArrowLeft, FaArrowRight, FaGlobeAmericas } from 'react-icons/fa';
import { Card } from 'antd';
const { Meta } = Card;
const Vacations = () => {
    const carouselItems = [
        { title: 'Product 1', description: 'Description 1', imageUrl: '/img/vacation/des1.jpg' },
        { title: 'Product 2', description: 'Description 2', imageUrl: '/img/vacation/des2.jpg' },
        { title: 'Product 3', description: 'Description 3', imageUrl: '/img/vacation/des3.jpg' },
        { title: 'Product 3', description: 'Description 3', imageUrl: '/img/vacation/des4.jpg' },
        { title: 'Product 3', description: 'Description 3', imageUrl: '/img/vacation/des5.jpg' },
        { title: 'Product 3', description: 'Description 3', imageUrl: '/img/vacation/des6.jpg' },
        // Thêm nhiều sản phẩm vào đây
    ];
    const [swiper, setSwiper] = useState(null);
    return (
        <div className="container mx-auto p-4">
            <Swiper
                onSwiper={setSwiper}
                spaceBetween={30}
                slidesPerView={4}
                navigation={false}  // Tắt các nút điều hướng mặc định của Swiper
                pagination={{ clickable: true }}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                }}
            >
                {carouselItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        <Card
                            hoverable
                            cover={<img alt={item.title} className="object-cover" src={item.imageUrl} />}
                            className="rounded-lg shadow-lg w-[300px]"
                        >
                            <Meta title={item.title} description={item.description} />
                        </Card>
                    </SwiperSlide>
                ))}
            </Swiper>

            <div className="flex justify-center mt-4 space-x-4">
                <button
                    onClick={() => swiper?.slidePrev()}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                >
                    <FaArrowLeft />
                </button>
                <button
                    onClick={() => swiper?.slideNext()}
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition"
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};
export default Vacations;