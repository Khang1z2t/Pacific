import React, { useEffect } from 'react';
import { Divider } from 'antd';

const locations = [
    {
        id: 1,
        title: 'Du Lịch Thủ Đô Hà Nội',
        img: '/img/Blog/ha-noi.jpg',
        description:
            'Hà Nội, thủ đô của Việt Nam, là một trong những điểm đến không thể bỏ qua ở miền Bắc. Với lịch sử hơn 1.000 năm, Hà Nội có nhiều điểm đặc sắc như Hoàng thành Thăng Long, Văn Miếu - Quốc Tử Giám, Hồ Gươm, Phố cổ Hà Nội, Chùa Một Cột. Đây cũng là thiên đường ẩm thực với những món như phở, bún chả, bánh mì, nem rán.',
    },
    {
        id: 2,
        title: 'Du Lịch Mộc Châu',
        img: '/img/Blog/moc-chau.jpg',
        description:
            'Mộc Châu là điểm đến lý tưởng cho những ai muốn tránh xa ồn ào thành phố. Với khí hậu mát mẻ quanh năm, Mộc Châu thu hút du khách bằng những đồi chè xanh mướt, vườn hoa cải trắng muốt và những món ngon đặc sản như bê chao, cá suối, nậm pịa.',
    },
    {
        id: 3,
        title: 'Du Lịch Sapa',
        img: '/img/Blog/sapa.png',
        description:
            "Sapa nổi tiếng với khung cảnh núi non tuyệt đẹp, khí hậu mát mẻ và bản sắc văn hóa độc đáo của các dân tộc thiểu số như H'Mông, Dao. Du khách có thể khám phá đỉnh Fansipan, thung lũng Mường Hoa, thưởng thức thắng cố, thịt trâu gác bếp.",
    },
    {
        id: 4,
        title: 'Du Lịch Ninh Bình',
        img: '/img/Blog/ninh-binh.jpg',
        description:
            'Ninh Bình sở hữu danh thắng Tràng An, Tam Cốc - Bích Động và Hang Múa. Đây là nơi lý tưởng để du khách thưởng thức cảnh sắc thiên nhiên và tham gia các hoạt động như chèo thuyền, leo núi. Đặc sản nổi bật của Ninh Bình gồm dê núi, cơm cháy, miến lươn.',
    },
    {
        id: 5,
        title: 'Du Lịch Hà Giang',
        img: '/img/Blog/ha-giang.jpg',
        description:
            'Hà Giang nổi tiếng với đèo Mã Pí Lèng, chợ phiên Đồng Văn, cao nguyên đá Đồng Văn. Đây là điểm đến tuyệt vời cho những ai yêu thích khám phá và muốn trải nghiệm văn hóa của các dân tộc vùng cao.',
    },
    {
        id: 6,
        title: 'Du Lịch Yên Bái',
        img: '/img/Blog/yen-bai.jpg',
        description:
            'Mù Cang Chải, Yên Bái, nổi tiếng với ruộng bậc thang tuyệt đẹp, đặc biệt vào mùa lúa chín. Du khách có thể tham gia lễ hội dù lượn trên đèo Khau Phạ để ngắm nhìn toàn cảnh vùng núi hùng vĩ.',
    },
];

export const MienBac = () => {
    useEffect(() => {
        document.title = 'Địa Điểm Du Lịch Miền Bắc - Blog';
    }, []);

    return (
        <div className="bg-gray-100 py-10">
            {/* Container chính */}
            <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                {/* Tiêu đề chính */}
                <h1 className="text-4xl font-bold text-orange-500 text-center">Top 6 Địa Điểm Không Thể Bỏ Lỡ</h1>
                <h2 className="text-3xl font-semibold text-gray-700 text-center mt-4">
                    Miền Bắc Việt Nam nổi tiếng với cảnh quan thiên nhiên tuyệt đẹp, văn hóa phong phú và nền ẩm thực
                    đặc sắc. Hãy cùng khám phá ngay những điểm đến tuyệt vời này!
                </h2>
                <Divider/>
                {/* Danh sách địa điểm */}
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
                                className="w-full md:w-[70%] lg:w-[60%] h-auto object-cover rounded-lg shadow-md"
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
