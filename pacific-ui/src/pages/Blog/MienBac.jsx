import React, { useEffect } from 'react';
import TravelSection from './components/TravelSection';

const locations = [
    {
        title: 'Hà Nội',
        images: [
            '/img/Blog/ha-noi.jpg',
            '/img/Blog/ha-noi1.jpg',
            '/img/Blog/ha-noi2.jpg',
            '/img/Blog/ha-noi3.jpg',
            '/img/Blog/ha-noi4.jpg',
        ],
        description:
            'Thời gian lý tưởng nhất để du lịch Hà Nội là vào mùa thu từ tháng 8 đến tháng 11 và mùa xuân từ tháng 3 đến tháng 4. Không ít người cho rằng mùa thu là lúc tiết trời đẹp nhất trong năm ở Hà Nội, với bầu trời xanh trong, gió heo may se se lạnh, lá vàng rơi, mùi hoa sữa thoảng... Mùa xuân về tiết trời ấm áp, đường phố như thay áo mới khi cây cối đâm chồi nảy lộc, muôn hoa đua nở',
    },
    {
        title: 'Yên Bái',
        images: ['/img/Blog/yen-bai.jpg', '/img/Blog/yen-bai1.jpg', '/img/Blog/yen-bai2.jpg'],
        description:
            'Tỉnh Yên Bái nằm ở phía Tây Bắc, cách Hà Nội khoảng 160 km, giáp các tỉnh Tuyên Quang, Phú Thọ, Lai Châu, Sơn La, Lào Cai và Hà Giang. Yên Bái gồm thành phố Yên Bái, thị xã Nghĩa Lộ và 7 huyện gồm Yên Bình, Lục Yên, Văn Chấn, Văn Yên, Trấn Yên, Trạm Tấu và Mù Cang Chải.\n' +
            '\n' +
            'Nhắc đến du lịch Yên Bái, nổi bật nhất là những thửa ruộng bậc thang, mùa vàng, mùa đổ nước. Ngoài ra Yên Bái còn nổi tiếng bởi những đỉnh núi, suối nước nóng, những ngôi làng cổ và nhiều món ăn đặc sắc',
    },
    {
        title: 'Sapa',
        images: ['/img/Blog/sapa.png', '/img/Blog/sapa1.png', '/img/Blog/sapa2.png', '/img/Blog/sapa3.png', '/img/Blog/sapa4.png'],
        description:
            'Sapa - một cái tên đã trở thành biểu tượng cho vẻ đẹp của núi rừng Tây Bắc, luôn là điểm đến khiến bao trái tim phải thổn thức. Từ đỉnh Fansipan hùng vĩ vươn mình giữa mây trời, đến những bản làng yên bình ẩn mình dưới thung lũng, mỗi góc nhỏ của Sapa đều mang trong mình một câu chuyện, một vẻ đẹp riêng khiến du khách phải say đắm.',
    },
];

export const MienBac = () => {
    useEffect(() => {
        document.title = 'Địa Điểm Du Lịch Miền Bắc - Blog';
    }, []);

    return (
        <TravelSection
            title="Top 6 Địa Điểm Không Thể Bỏ Lỡ Khi Du Lịch Miền Bắc"
            subtitle="Miền Bắc Việt Nam nổi tiếng với cảnh quan thiên nhiên tuyệt đẹp, văn hóa phong phú và nền ẩm thực đặc sắc."
            locations={locations}
        />
    );
};
