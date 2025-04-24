import React from 'react';
import { useTranslation } from 'react-i18next';

const TravelSection = ({ title, subtitle, viewCount, date, locations = [] }) => {
    const { t } = useTranslation();

    return (
        <div className="bg-gray-100 py-10">
            <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg">

                {/* Tiêu đề – căn giữa */}
                <h1 className="text-4xl font-bold text-orange-500 text-center">{title}</h1>
                <h2 className="text-3xl font-semibold text-gray-700 text-center mt-4">{subtitle}</h2>

                {/* View và ngày đăng – căn trái, cách tiêu đề một đoạn */}
                <div className="text-gray-500 text-sm flex gap-4 mt-6 mb-4 justify-center md:justify-start md:pl-2">
                    <span>📅 {date}</span>
                    <span>👁️ {viewCount} {t('blog.view')}</span>
                </div>

                {locations.map((location, index) => (
                    <div key={index} className="mt-12">
                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                            {index + 1}. {location.title}
                        </h2>

                        {/* Ảnh địa điểm */}
                        <div className="flex flex-wrap justify-center gap-4">
                            {(location.images || []).map((img, imgIndex) => (
                                <img
                                    key={imgIndex}
                                    src={img}
                                    alt={`${location.title} - ${imgIndex + 1}`}
                                    className="w-full md:w-[45%] lg:w-[30%] h-auto object-cover rounded-lg shadow-md"
                                />
                            ))}
                        </div>

                        {/* Chú thích */}
                        <p className="text-gray-500 italic text-center mt-2">
                            {location.caption || `${location.title} – ${t('blog.travel')}`}
                        </p>

                        {/* Mô tả */}
                        <p className="text-gray-700 mt-4 text-justify leading-relaxed">{location.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TravelSection;
