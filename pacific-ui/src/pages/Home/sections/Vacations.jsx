import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { Autoplay } from 'swiper/modules';
import { useTranslation } from 'react-i18next';
import { Card } from 'antd';

const carouselItems = [
    { title: 'Pháp', imageUrl: '/img/vacation/Paris.jpg' },
    { title: 'Mỹ', imageUrl: '/img/vacation/newyork.jpg' },
    { title: 'Nhật Bản - TOKYO', imageUrl: '/img/vacation/Tokyo.jpg' },
    { title: 'Anh Quốc', imageUrl: '/img/vacation/England.jpg' },
    { title: 'Hàn Quốc', imageUrl: '/img/vacation/Korea.jpg' },
    { title: 'Mexico', imageUrl: '/img/vacation/Mexico.jpg' },
    { title: 'Nhật Bản - OSAKA', imageUrl: '/img/vacation/Osaka.jpg' },
    { title: 'Sao Hỏa', imageUrl: '/img/vacation/Mars.jpg' },
    { title: 'Sao Mộc', imageUrl: '/img/vacation/Jupiter.jpg' },
];

const Vacations = () => {
    const { Meta } = Card;
    const { t } = useTranslation();
    const [swiper, setSwiper] = useState(null);

const carouselItems = [
    { title: 'Hà Nội', description: `8 ${t("vacation.va1")}`, imageUrl: '/img/vacation/des1.jpg' },
    { title: 'Huế', description: `2 ${t("vacation.va1")}`, imageUrl: '/img/vacation/des2.jpg' },
    { title: 'Thành phố Hồ Chí Minh', description: `5 ${t("vacation.va1")}`, imageUrl: '/img/vacation/des3.jpg' },
    { title: 'Cần Thơ', description: `5 ${t("vacation.va1")}`, imageUrl: '/img/vacation/des4.jpg' },
    { title: 'Hà Nội', description: `8 ${t("vacation.va1")}`, imageUrl: '/img/vacation/des1.jpg' },
    { title: 'Huế', description: `2 ${t("vacation.va1")}`, imageUrl: '/img/vacation/des2.jpg' },
    { title: 'Thành phố Hồ Chí Minh', description: `5 ${t("vacation.va1")}`, imageUrl: '/img/vacation/des3.jpg' },
    { title: 'Cần Thơ', description: `5 ${t("vacation.va1")}`, imageUrl: '/img/vacation/des4.jpg' },
    { title: 'Hà Nội', description: `8 ${t("vacation.va1")}`, imageUrl: '/img/vacation/des1.jpg' },
];

    return (
        <div className="container mx-auto max-w-7xl px-4 py-12">
            <Swiper
                onSwiper={setSwiper}
                spaceBetween={30}
                slidesPerView={1}
                navigation={false}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                loop={true}
                modules={[Autoplay]}
                className="mySwiper"
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                    },
                }}
            >
                {carouselItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                            {/* Image */}
                            <img
                                alt={item.title}
                                src={item.imageUrl}
                                className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Overlay */}
                            <div
                                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-300"></div>
                            {/* Text Content */}
                            <div
                                className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                <div
                                    className="bg-orange-500 text-sm px-3 py-1.5 rounded-full inline-block font-medium">
                                    {item.title}
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Navigation Buttons */}
            <div className="flex justify-center mt-8 space-x-6">
                <button
                    onClick={() => swiper?.slidePrev()}
                    className="bg-orange-500 text-white p-4 rounded-full hover:bg-orange-600 transform hover:scale-110 transition-all duration-300 shadow-md"
                >
                    <FaArrowLeft size={20} />
                </button>
                <button
                    onClick={() => swiper?.slideNext()}
                    className="bg-orange-500 text-white p-4 rounded-full hover:bg-orange-600 transform hover:scale-110 transition-all duration-300 shadow-md"
                >
                    <FaArrowRight size={20} />
                </button>
            </div>
        </div>
    );
};

export default Vacations;