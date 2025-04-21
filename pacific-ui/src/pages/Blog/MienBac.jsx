import React, { useEffect } from 'react';
import TravelSection from './components/TravelSection';
import { useTranslation } from 'react-i18next';

const locations = [
    {
        title: t("blog.bac1"),
        images: [
            '/img/Blog/ha-noi.jpg',
            '/img/Blog/ha-noi1.jpg',
            '/img/Blog/ha-noi2.jpg',
            '/img/Blog/ha-noi3.jpg',
            '/img/Blog/ha-noi4.jpg',
        ],
        description: t("blog.bac2")
    },
    {
        title: t("blog.bac3"),
        images: ['/img/Blog/yen-bai.jpg', '/img/Blog/yen-bai1.jpg', '/img/Blog/yen-bai2.jpg'],
        description: t("blog.bac4")
    },
    {
        title: t("blog.bac5"),
        images: ['/img/Blog/sapa.png', '/img/Blog/sapa1.png', '/img/Blog/sapa2.png', '/img/Blog/sapa3.png', '/img/Blog/sapa4.png'],
        description: t("blog.bac6")
    },
];

export const MienBac = () => {
    const { t } = useTranslation();
    useEffect(() => {
        document.title = 'Địa Điểm Du Lịch Miền Bắc - Blog';
    }, []);

    return (
        <TravelSection
            title= {t("blog.bac7")}
            subtitle= {t("blog.bac8")}
            locations={locations}
        />
    );
};
