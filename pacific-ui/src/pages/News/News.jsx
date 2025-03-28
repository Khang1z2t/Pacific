import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const News = () => {
    const { t } = useTranslation();
    const locations = [
        {
            title: t("news.ti1"),
                images: [
                '/img/Blog/noi-mong.jpg',
                '/img/Blog/noi-mong1.jpg',
                '/img/Blog/noi-mong2.jpg',
                '/img/Blog/noi-mong3.jpg',
                '/img/Blog/noi-mong4.jpg',
            ],
            description:
                t("news.ti2"),
        },
        {
            title: t("news.ti3"),
            images: ['/img/Blog/noi-mong5.jpg', '/img/Blog/noi-mong6.jpg', '/img/Blog/noi-mong7.jpg'],
            description:
                t("news.ti4"),
        },
    ];

    useEffect(() => {
        document.title = 'Địa Điểm Du Lịch Miền Bắc - Blog';
    }, []);

    return (
        <div className="bg-gray-100 py-10">
            <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-4xl font-bold text-orange-500 text-center">{t("news.ti5")}</h1>
                <h2 className="text-3xl font-semibold text-gray-700 text-center mt-4">
                    {t("news.ti6")}
                </h2>

                {/* Danh sách địa điểm */}
                {locations.map((location, index) => (
                    <div key={index} className="mt-12">

                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                            {location.title}
                        </h2>

                        <div className="flex flex-wrap justify-center gap-4">
                            {location.images.map((imgSrc, imgIndex) => (
                                <img
                                    key={imgIndex}
                                    src={imgSrc}
                                    alt={`${location.title} - Hình ${imgIndex + 1}`}
                                    className="w-full md:w-[45%] lg:w-[30%] h-auto object-cover rounded-lg shadow-md"
                                />
                            ))}
                        </div>

                        {/* Chú thích ảnh */}
                        <p className="text-gray-500 italic text-center mt-2">
                            {location.title} – {t("news.ti7")}
                        </p>

                        {/* Mô tả địa điểm */}
                        <p className="text-gray-700 mt-4 text-justify leading-relaxed">{location.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
