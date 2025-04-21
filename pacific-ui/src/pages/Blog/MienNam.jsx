import React, { useEffect } from 'react';
import TravelSection from './components/TravelSection';
import { useTranslation } from 'react-i18next';

const locations = [
    {
        title: t("blog.nam1"),
        images: [
            '/img/Blog/ho-chi-minh1.jpg', '/img/Blog/ho-chi-minh2.jpg', '/img/Blog/ho-chi-minh3.jpg', '/img/Blog/ho-chi-minh.jpg'
        ],
        description: t("blog.nam2")
    },
    {
        title: t("blog.nam3"),
        images: ['/img/Blog/long-an.jpg', '/img/Blog/long-an1.jpg'],
        description: t("blog.nam4")
    },
    {
        title: t("blog.nam5"),
        images: ['/img/Blog/tien-giang1.jpg', '/img/Blog/tien-giang2.jpg', '/img/Blog/tien-giang3.jpg'],
        description: t("blog.nam6")
    },
    {
        title: t("blog.nam7"),
        images: ['/img/Blog/dong-thap1.jpg', '/img/Blog/dong-thap2.jpg', '/img/Blog/dong-thap3.jpg', '/img/Blog/dong-thap4.jpg', '/img/Blog/dong-thap5.jpg'],
        description:
            t("blog.nam8")
    },
    {
        title: t("blog.nam9"),
        images: ['/img/Blog/ben-tre1.jpg', '/img/Blog/ben-tre2.jpg', '/img/Blog/ben-tre3.jpg'],
        description:
            t("blog.nam10")
    }
];

export const MienNam = () => {
    const { t } = useTranslation();
    useEffect(() => {
        document.title = 'Địa Điểm Du Lịch Miền Nam - Blog';
    }, []);

    return (
        <div>
            {/* Banner */}
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
                <img
                    src="/img/Blog/ho-chi-minh2.jpg"
                    alt="Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h1 className="text-3xl md:text-5xl font-bold mb-2">
                            {t("blog.nam11")}
                        </h1>
                        {/*<p className="text-sm md:text-lg">*/}

                    </div>
                </div>
            </div>
        <TravelSection
            title= {t("blog.nam12")}
            subtitle= {t("blog.nam13")}
            locations={locations}
        />
        </div>
    );
};

