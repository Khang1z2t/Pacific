import React, { useEffect } from 'react';
import TravelSection from './components/TravelSection';

const locations = [
    {
        id: 1,
        title: 'Thành Phố Hồ Chí Minh',
        img: [
            '/img/Blog/ho-chi-minh2.jpg',
            '/img/Blog/ho-chi-minh3.jpg',
        ],
        description:
            'Thành phố Hồ Chí Minh là thành phố đông đúc, sầm uất nhất miền Nam nói riêng và cả nước nói chung. Thành phố Hồ Chí Minh ở trung tâm Đông Nam Bộ, nơi đây lưu giữ nhiều công trình kiến trúc độc đáo, khu vui chơi, trung tâm mua sắm sầm uất. Do vậy, Thành phố Hồ Chí Minh luôn là sự lựa chọn hàng đầu của du khách đến tham quan. Thời điểm lý tưởng tham quan Thành phố Hồ Chí Minh là vào mùa khô từ tháng 12 đến tháng 4 năm sau. Bạn có thể đến tham quan những địa điểm nổi tiếng như: Nhà thờ Đức Bà, Dinh Độc Lập, Nhà hát Lớn,...',
    },
    {
        id: 2,
        title: 'Tây Ninh',
        img: [
            '/img/Blog/tay-ninh1.jpg',
        ],
        description:
            'Cách trung tâm Thành phố Hồ Chí Minh 100km, Tây Ninh có nhiều địa điểm tham quan hấp dẫn như: Núi Bà Đen, Hồ Dầu Tiếng, Tòa Thánh Tây Ninh,... Cũng như thành phố Hồ Chí Minh, thời điểm thích hợp tham quan Tây Ninh là vào mùa khô từ tháng 12 đến tháng 4 năm sau.',
    },
    {
        id: 3,
        title: 'Bình Dương',
        img: [
            '/img/Blog/binh-duong2.jpg',
        ],
        description:
            'Bình Dương cách Sài Gòn chỉ khoảng 30 phút đi xe và đặc biệt Bình Dương cũng không thua kém Sài Gòn với nhiều địa điểm tham quan hấp dẫn, khu vui chơi nhộn nhịp như: Phố đêm Bạch Đằng, chợ đêm Thủ Dầu Một, hồ Bình An, công viên Thành Phố Mới Bình Dương, chùa Bà Thiên Hậu, chùa Hội Khánh,...',
    },
    {
        id: 4,
        title: 'Bình Phước',
        img: [
            '/img/Blog/binh-phuoc2.jpg',
        ],
        description:
            'Bình Phước là một tỉnh thuộc vùng Đông Nam Bộ. Tuy chưa được nhiều người biết nhưng Bình Phước có nhiều địa điểm hoang sơ, mang nét đẹp riêng như Vườn Quốc Gia Bù Gia Mập, Núi Bà Rá, Trảng cỏ Bù Lạch,...và đặc biệt Bình Phước chỉ cách Sài Gòn từ 2-3h đi xe.',
    },
    {
        id: 5,
        title: 'Đồng Tháp',
        img: [
            '/img/Blog/dong-thap.jpg',
        ],
        description:
            'Qua câu ca dao trên ta có thể thấy, Đồng Tháp nổi tiếng với những cánh đồng hoa sen bát ngát, nét bình yên của khung cảnh làng quê thanh bình, nơi đây cũng nổi tiếng với Làng hoa Sa Đéc, Khu Du lịch Xẻo Quýt, vườn quốc gia Tràm Chim, nhà cổ Huỳnh Thủy Lê, chùa Lá Sen, khu du lịch sinh thái Gáo Giồng, khu di tích Lăng cụ phó bảng Nguyễn Sinh Sắc,...với những di tích lịch sử, vẻ đẹp hoang sơ của thiên nhiên nơi đây và ngoài ra Đồng Tháp còn nhiều điểm nổi tiếng, hấp dẫn.',
    },
    {
        id: 6,
        title: 'Bến Tre',
        img: [
            '/img/Blog/ben-tre1.jpg',
            '/img/Blog/ben-tre2.jpg',
            '/img/Blog/ben-tre3.jpg',
        ],
        description:
            'Bến Tre không chỉ khiến bạn bị thu hút bởi vẻ đẹp sông nước hiền hòa mà nơi đây còn có những nét văn hóa, ẩm thực độc đáo. Đến đây, du khách sẽ được trải nghiệm sự bình yên miền sông nước, rợm bóng dừa mát rượi với những địa điểm tham quan độc đáo như: Cồn Phụng, Cồn Quy, khu du lịch Lan Vương, cù lao Minh, khu du lịch Làng Bè, di tích Đạo Dừa...',
    },
    {
        id: 7,
        title: 'Long An',
        img: [
            '/img/Blog/long-an.jpg',
        ],
        description:
            'Long An chỉ cách Sài Gòn 35km, Long An mang nét sông nước dân dã đặc trưng của Đồng bằng Sông Cửu Long. Nơi đây có những cánh rừng tràm, những khu du lịch với các kiến trúc hiện đại như công viên 7 kỳ quan, những di tích cách mạng, làng nổi Tân Lập, nhà cổ trăm cột, công viên nước Rio Long An, làng cổ Phước Lộc Thọ,...',
    },
    {
        id: 8,
        title: 'Tiền Giang',
        img: [
            '/img/Blog/tien-giang1.jpg',
            '/img/Blog/tien-giang2.jpg',
            '/img/Blog/tien-giang3.jpg',
        ],
        description:
            'Được thiên nhiên ưu ái ban tặng khí hậu ấm áp quanh năm, Tiền Giang không chỉ nổi tiếng với vựa lúa lớn nhất nước mà nơi đây còn nhiều điểm tham quan hấp, thu hút nhiều người đến check in như Chùa Vĩnh Tràng, Cù Lao Thái Sơn, chợ nổi Cái Bè, trại rắn Đồng Tâm, chùa Sắc Tứ Linh Thứu, thiền viện Trúc Lâm Chánh Giác,... mang đậm văn hóa của miền Tây sông nước.',
    },
];

export const MienNam = () => {
    useEffect(() => {
        document.title = 'Địa Điểm Du Lịch Miền Nam - Blog';
    }, []);

    return (
        <div>
            {/* Banner */}
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden">
                <img
                    src="/img/Blog/banner.jpg"
                    alt="Miền Nam Banner"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className="text-center text-white px-4">
                        <h1 className="text-3xl md:text-5xl font-bold mb-2">
                            Vùng đất sôi động, hiếu khách và đậm đà bản sắc.
                        </h1>
                        {/*<p className="text-sm md:text-lg">*/}

                        {/*</p>*/}
                    </div>
                </div>
            </div>

            {/* Travel Section */}
            <TravelSection
                title="Địa Điểm Du Lịch Nổi Tiếng Miền Nam Tuyệt Vời"
                subtitle="Miền Nam - nổi tiếng với thành phố mang tên Bác."
                locations={locations}
            />
        </div>
    );
};
