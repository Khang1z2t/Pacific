import React, { useEffect } from 'react';
import TravelSection from './components/TravelSection';

const locations = [
    {
        title: 'Đồng Hới - Quảng Bình',
        images: ['/img/Blog/quang-binh.jpg'],
        description:
            'Quảng Bình chắc chắn sẽ là điểm đến không thể bỏ qua cho những ai yêu thích khám phá...',
    },
    {
        title: 'Cố đô Huế',
        images: ['/img/Blog/co-do-hue.jpg'],
        description:
            'Huế nổi tiếng với Đại Nội, chùa Thiên Mụ, và những nét đẹp cổ kính mộng mơ...',
    },
    {
        title: 'Đà Nẵng',
        images: ['/img/Blog/da-nang.jpg'],
        description:
            'Thành phố đáng sống nhất Việt Nam với cầu Rồng, bãi biển Mỹ Khê và ẩm thực tuyệt vời...',
    },
];

export const MienTrung = () => {
    useEffect(() => {
        document.title = 'Địa Điểm Du Lịch Miền Trung - Blog';
    }, []);

    return (
        <TravelSection
            title="Địa Điểm Du Lịch Miền Trung Nổi Tiếng Tuyệt Vời"
            subtitle="Miền Trung hiện ra với vẻ đẹp mơ màng, hoài cổ nhưng cũng đầy bất ngờ thú vị."
            locations={locations}
        />
    );
};
