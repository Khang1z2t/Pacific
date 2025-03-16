import React, { useEffect } from 'react';
import { Divider } from 'antd';

const locations = [
    {
        id: 1,
        title: 'Thành Phố Hồ Chí Minh',
        img: '/img/Blog/ho-chi-minh.jpg',
        description:
            'Thành phố Hồ Chí Minh là thành phố đông đúc, sầm uất nhất miền Nam nói riêng và cả nước nói chung. Thành phố Hồ Chí Minh ở trung tâm Đông Nam Bộ, nơi đây lưu giữ nhiều công trình kiến trúc độc đáo, khu vui chơi, trung tâm mua sắm sầm uất. Do vậy, Thành phố Hồ Chí Minh luôn là sự lựa chọn hàng đầu của du khách đến tham quan. Thời điểm lý tưởng tham quan Thành phố Hồ Chí Minh là vào mùa khô từ tháng 12 đến tháng 4 năm sau. Bạn có thể đến tham quan những địa điểm nổi tiếng như: Nhà thờ Đức Bà, Dinh Độc Lập, Nhà hát Lớn,...',
    },
    {
        id: 2,
        title: 'Tây Ninh',
        img: '/img/Blog/tay-ninh.jpg',
        description:
            'Cách trung tâm Thành phố Hồ Chí Minh 100km, Tây Ninh có nhiều địa điểm tham quan hấp dẫn như: Núi Bà Đen, Hồ Dầu Tiếng, Tòa Thánh Tây Ninh,... Cũng như thành phố Hồ Chí Minh, thời điểm thích hợp tham quan Tây Ninh là vào mùa khô từ tháng 12 đến tháng 4 năm sau.',
    },
    {
        id: 3,
        title: 'Bình Dương',
        img: '/img/Blog/binh-duong.jpg',
        description:
            'Bình Dương cách Sài Gòn chỉ khoảng 30 phút đi xe và đặc biệt Bình Dương cũng không thua kém Sài Gòn với nhiều địa điểm tham quan hấp dẫn, khu vui chơi nhộn nhịp như: Phố đêm Bạch Đằng, chợ đêm Thủ Dầu Một, hồ Bình An, công viên Thành Phố Mới Bình Dương, chùa Bà Thiên Hậu, chùa Hội Khánh,...',
    },
    {
        id: 4,
        title: 'Bình Phước',
        img: '/img/Blog/binh-phuoc.jpg',
        description:
            'Bình Phước là một tỉnh thuộc vùng Đông Nam Bộ. Tuy chưa được nhiều người biết nhưng Bình Phước có nhiều địa điểm hoang sơ, mang nét đẹp riêng như Vườn Quốc Gia Bù Gia Mập, Núi Bà Rá, Trảng cỏ Bù Lạch,...và đặc biệt Bình Phước chỉ cách Sài Gòn từ 2-3h đi xe.',
    },
    {
        id: 5,
        title: 'Đồng Tháp',
        img: '/img/Blog/dong-thap.jpg',
        description:
            'Qua câu ca dao trên ta có thể thấy, Đồng Tháp nổi tiếng với những cánh đồng hoa sen bát ngát, nét bình yên của khung cảnh làng quê thanh bình, nơi đây cũng nổi tiếng với Làng hoa Sa Đéc, Khu Du lịch Xẻo Quýt, vườn quốc gia Tràm Chim, nhà cổ Huỳnh Thủy Lê, chùa Lá Sen, khu du lịch sinh thái Gáo Giồng, khu di tích Lăng cụ phó bảng Nguyễn Sinh Sắc,...với những di tích lịch sử, vẻ đẹp hoang sơ của thiên nhiên nơi đây và ngoài ra Đồng Tháp còn nhiều điểm nổi tiếng, hấp dẫn.',
    },
    {
        id: 6,
        title: 'Bến Tre',
        img: '/img/Blog/ben-tre.jpg',
        description:
            'Bến Tre không chỉ khiến bạn bị thu hút bởi vẻ đẹp sông nước hiền hòa mà nơi đây còn có những nét văn hóa, ẩm thực độc đáo. Đến đây, du khách sẽ được trải nghiệm sự bình yên miền sông nước, rợm bóng dừa mát rượi với những địa điểm tham quan độc đáo như: Cồn Phụng, Cồn Quy, khu du lịch Lan Vương, cù lao Minh, khu du lịch Làng Bè, di tích Đạo Dừa...',
    },
    {
        id: 7,
        title: 'Long An',
        img: '/img/Blog/long-an.jpg',
        description:
            'Long An chỉ cách Sài Gòn 35km, Long An mang nét sông nước dân dã đặc trưng của Đồng bằng Sông Cửu Long. Nơi đây có những cánh rừng tràm, những khu du lịch với các kiến trúc hiện đại như công viên 7 kỳ quan, những di tích cách mạng, làng nổi Tân Lập, nhà cổ trăm cột, công viên nước Rio Long An, làng cổ Phước Lộc Thọ,...',
    },
    {
        id: 8,
        title: 'Tiền Giang',
        img: '/img/Blog/tien-giang.jpg',
        description:
            'Được thiên nhiên ưu ái ban tặng khí hậu ấm áp quanh năm, Tiền Giang không chỉ nổi tiếng với vựa lúa lớn nhất nước mà nơi đây còn nhiều điểm tham quan hấp, thu hút nhiều người đến check in như Chùa Vĩnh Tràng, Cù Lao Thái Sơn, chợ nổi Cái Bè, trại rắn Đồng Tâm, chùa Sắc Tứ Linh Thứu, thiền viện Trúc Lâm Chánh Giác,... mang đậm văn hóa của miền Tây sông nước.',
    },
];

export const MienNam = () => {
    useEffect(() => {
        document.title = 'Địa Điểm Du Lịch Miền Nam - Blog';
    }, []);

    return (
        <div className="bg-gray-100 py-10">

            {/* Tiêu đề bài viết */}
            <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-4xl font-bold text-orange-500 text-center">
                    Địa điểm "check-in" miền Nam đẹp lý tưởng nhất, không nên bỏ lỡ
                </h1>
                <h2 className="text-3x2 font-bold text-gray-700 text-center mt-4">
                    Miền Nam Việt Nam với địa hình chủ yếu đồng bằng, có nhiều cảnh đẹp, điểm du lịch lý tưởng, phù hợp
                    đi phượt. Cùng bỏ túi ngay các địa điểm này nhé!
                </h2>
                <Divider />
                {locations.map((location) => (
                    <div key={location.id} className="mt-12">
                        {/* Tiêu đề địa điểm */}
                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                            {location.id}. {location.title}
                        </h2>

                        {/* Hình ảnh địa điểm */}
                        <div className="flex justify-center">
                            <img
                                src={location.img}
                                alt={location.title}
                                className="w-[80%] md:w-[70%] lg:w-[60%] h-auto object-cover rounded-lg shadow-md"
                            />
                        </div>

                        {/* Chú thích ảnh */}
                        <p className="text-gray-500 italic text-center mt-2">
                            {location.title} – điểm đến hấp dẫn với vẻ đẹp tự nhiên và văn hóa đặc sắc.
                        </p>

                        {/* Mô tả địa điểm */}
                        <p className="text-gray-700 mt-4 text-justify leading-relaxed">{location.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
