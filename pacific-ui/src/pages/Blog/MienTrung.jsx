import React, { useEffect, useState } from 'react';
import TravelSection from './components/TravelSection';
import { useTranslation } from 'react-i18next';

export const MienTrung = () => {
    const { t } = useTranslation();
    const [viewCount, setViewCount] = useState(0);
    const blogId = 'mien-trung';

    useEffect(() => {
        document.title = 'Địa Điểm Du Lịch Miền Bắc - Blog';

        // Tăng lượt xem tạm bằng localStorage
        const key = `blog-views-${blogId}`;
        let count = parseInt(localStorage.getItem(key)) || 0;
        count += 1;
        localStorage.setItem(key, count);
        setViewCount(count);
    }, []);

    const locations = [
    {
        title: t("blog.trung1"),
        images: ['/img/Blog/quang-binh.jpg', '/img/Blog/quang-binh1.jpg', '/img/Blog/quang-binh2.jpg', '/img/Blog/quang-binh3.jpg', '/img/Blog/quang-binh4.jpg'],
        description: t("blog.trung2")
    },
    {
        title: t("blog.trung3"),
        images: ['/img/Blog/co-do-hue.jpg', '/img/Blog/co-do-hue1.jpg', '/img/Blog/co-do-hue2.jpg'],
        description: t("blog.trung4")
    },
    {
        title: t("blog.trung5"),
        images: ['/img/Blog/da-nang.jpg', '/img/Blog/da-nang1.jpg', '/img/Blog/da-nang2.jpg', '/img/Blog/da-nang3.jpg'],
        description: t("blog.trung6")
    }
];

    return (
        <div>
            {/* Banner */}
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
                <img
                    src="/img/Blog/banner.jpg"
                    alt="Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white px-4">

                    </div>
                </div>
            </div>
            <TravelSection
                title= {t("blog.trung7")}
                subtitle= {t("blog.trung8")}
                viewCount={viewCount}
                date="24-04-2025"
                locations={locations}
            />
        </div>
    );
};