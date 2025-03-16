import React, { useEffect } from 'react';
import { Divider } from 'antd';

const locations = [
    {
        id: 1,
        title: 'Đồng Hới - Quảng Bình',
        img: '/img/Blog/quang-binh.jpg',
        description:
            'Quảng Bình chắc chắn sẽ là điểm đến không thể bỏ qua cho những ai yêu thích khám phá, tìm hiểu về văn hóa và lịch sử Việt Nam.  là một trong những địa điểm du lịch nổi tiếng và hấp dẫn tại Quảng Bình. Kỳ quan đệ nhất động thuộc khu bảo tồn Phong Nha - Kẻ Bàng, . Động Phong Nha không chỉ là một kỳ quan động vật học, địa chất, mà còn là một bảo vật của nền văn hóa dân tộc Việt Nam.',
    },
    {
        id: 2,
        title: 'Cố đô Huế',
        img: '/img/Blog/co-do-hue.jpg',
        description:
            'Cố đô Huế, Đại Nội, lăng Tự Đức, chùa Thiên Mụ, làng hương Thủy Xuân, v.v. Bạn đừng ngần ngại khám phá  trong ngày để thả mình vào thành phố mộng mơ, hay trải nghiệm Huế qua  để khám phá sự phong phú của ẩm thực miền Trung.',
    },
    {
        id: 3,
        title: 'Đà Nẵng',
        img: '/img/Blog/da-nang.jpg',
        description:
            'Đà Nẵng còn có nhiều điểm đến khác như, cầu Rồng, cầu Trần Thị Lý, cầu Sông Hàn và . Bạn cũng có thể khám phá  tại các chợ đêm như, thưởng thức các món ăn đường phố và mua sắm đồ lưu niệm với mức giá hợp lý.',
    },
    {
        id: 4,
        title: 'Phố Cổ Hội An',
        img: '/img/Blog/hoi-an.jpg',
        description:
            'Phố cổ Hội An là sự kết hợp hoàn hảo giữa lãng mạn của phố cổ và thư thái của biển xanh. Với kiến trúc cổ kính, những con đường vàng nhỏ xinh và những cửa hàng độc đáo, Hội An đã trở thành điểm đến lý tưởng cho những ai muốn tìm kiếm một trải nghiệm du lịch đầy hoài cổ. Đến với nơi đây, bạn có thể tham quan những di sản văn hóa độc đáo như  - một công trình kiến trúc đặc biệt mang đậm phong cách Nhật Bản, đạp xe ở con đường đầy hoa ở phố cổ, đi thuyền  cầu bình an và may mắn.',
    },
    {
        id: 5,
        title: 'Du Lịch Hà Giang',
        img: '/img/Blog/ha-giang1.jpg',
        description:
            'Hà Giang nổi tiếng với đèo Mã Pí Lèng, chợ phiên Đồng Văn, cao nguyên đá Đồng Văn. Đây là điểm đến tuyệt vời cho những ai yêu thích khám phá và muốn trải nghiệm văn hóa của các dân tộc vùng cao.',
    },
    {
        id: 6,
        title: 'Bãi Biển Mỹ Khê',
        img: '/img/Blog/bai-bien-my-khe.jpg',
        description:
            'Bãi biển Mỹ Khê được mệnh danh là một trong những bãi biển đẹp nhất Việt Nam. Nằm giữa thành phố Đà Nẵng và bán đảo Sơn Trà, Mỹ Khê là nơi được bao bọc bởi cát trắng tinh khôi và nước biển trong xanh, tạo thành một cảnh quan tuyệt đẹp đầy mê hoặc. Mỹ Khê là một điểm đến lý tưởng cho những du khách yêu thích các hoạt động thể thao trên biển như lướt sóng, chèo thuyền kayak, chơi thể thao cát, hay thậm chí là một buổi tắm nắng thư giãn. ',
    },
];

export const MienTrung = () => {
    useEffect(() => {
        document.title = 'Địa Điểm Du Lịch Miền Trung - Blog';
    }, []);

    return (
        <div className="bg-gray-100 py-10">
            {/* Tiêu đề bài viết */}
            <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                <h1 className="text-4xl font-bold text-orange-500 text-center">
                    Địa Điểm Du Lịch Miền Trung Nổi Tiếng Tuyệt Vời
                </h1>
                <h2 className="text-3x2 font-bold text-gray-700 text-center mt-4">
                    Miền Trung Việt Nam hiện ra với vẻ đẹp mơ màng, trong trẻo nhưng cũng ôm ấp nhiều bất ngờ thú vị. Du
                    lịch miền Trung có gì vui? Cùng tìm hiểu những địa điểm du lịch miền Trung cực HOT nhé!
                </h2>
                <Divider/>
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
