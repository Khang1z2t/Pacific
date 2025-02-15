import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Card } from 'antd';
const { Meta } = Card;

const carouselItems = [
    { title: 'Hà Nội', description: '8 Chuyến đi', imageUrl: '/img/vacation/des1.jpg' },
    { title: 'Huế', description: '2 Chuyến đi', imageUrl: '/img/vacation/des2.jpg' },
    { title: 'Thành phố Hồ Chí Minh', description: '5 Chuyến đi', imageUrl: '/img/vacation/des3.jpg' },
    { title: 'Cần Thơ', description: '5 Chuyến đi', imageUrl: '/img/vacation/des4.jpg' },
    { title: 'Cần Thơ', description: '5 Chuyến đi', imageUrl: '/img/vacation/des4.jpg' },
    { title: 'Cần Thơ', description: '5 Chuyến đi', imageUrl: '/img/vacation/des4.jpg' },
    { title: 'Cần Thơ', description: '5 Chuyến đi', imageUrl: '/img/vacation/des4.jpg' },
    { title: 'Cần Thơ', description: '5 Chuyến đi', imageUrl: '/img/vacation/des4.jpg' },
    { title: 'Cần Thơ', description: '5 Chuyến đi', imageUrl: '/img/vacation/des4.jpg' },
    // Add more items if needed
];

const Vacations = () => {
    const [swiper, setSwiper] = useState(null);

    return (
        <div className="container mx-auto p-4">
            <Swiper
                onSwiper={setSwiper}
                spaceBetween={20}
                slidesPerView={1}
                navigation={false}
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
                    1280: {
                        slidesPerView: 4,
                    },
                }}
            >
                
                {carouselItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative group">
                            {/* Image */}
                            <img
                                alt={item.title}
                                src={item.imageUrl}
                                className="w-full h-72 object-cover rounded-lg shadow-lg"
                            />
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-lg"></div>
                            {/* Text Content */}
                            <div className="absolute bottom-4 left-4 text-white">
                                <div className="bg-orange-500 text-sm px-2 py-1 rounded-md inline-block mb-2">
                                    {item.title}
                                </div>
                                <h3 className="text-lg font-semibold">{item.description}</h3>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-6 space-x-4">
                <button
                    onClick={() => swiper?.slidePrev()}
                    className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition"
                >
                    <FaArrowLeft />
                </button>
                <button
                    onClick={() => swiper?.slideNext()}
                    className="bg-orange-500 text-white p-3 rounded-full hover:bg-orange-600 transition"
                >
                    <FaArrowRight />
                </button>
            </div>
        </div>
    );
};

export default Vacations;
