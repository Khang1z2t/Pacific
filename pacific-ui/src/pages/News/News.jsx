import React, { useEffect } from 'react';

const locations = [
    {
        id: 1,
        title: 'Du Lịch Nội Mông',
        images: [
            '/img/Blog/noi-mong.jpg',
            '/img/Blog/noi-mong1.jpg',
            '/img/Blog/noi-mong2.jpg',
            '/img/Blog/noi-mong3.jpg',
            '/img/Blog/noi-mong4.jpg',
        ],
        description:
            'Công ty Cổ phần Du lịch Pacific vừa chính thức ra mắt tour du lịch mới là các chuyến charter bay thẳng khởi hành từ Hà Nội khám phá điểm du lịch Khu Tự trị Nội Mông Cổ, Trung Quốc. Nội Mông là một khu tự trị nằm ở phía Bắc Trung Quốc, có diện tích tới 1,2 triệu km². Với vị trí địa lý phía Bắc giáp Liên Bang Nga, Mông Cổ, phía Nam giáp tỉnh Cam Túc và Ninh Hạ, Nội Mông có sự giao thoa văn hóa đa dạng được thể hiện qua các lối sống thường nhật của những người dân bản địa, ẩm thực, âm nhạc... Tại đây, du khách có thể tìm thấy những trải nghiệm nơi thảo nguyên Mông Cổ như ngủ tại lều yurt giữa thảo nguyên bao la, chiêm ngưỡng những ngôi nhà mang hơi hướng phong cách kiến trúc Nga cổ kính, thưởng thức những món ngon đặc trưng kết hợp ẩm thực Trung Hoa và Mông Cổ. Theo thông tin từ Sở Văn hóa và Du lịch Khu tự trị Nội Mông, nơi đây đã đón tổng cộng 230 triệu khách du lịch trong năm 2023, cao gấp 2,49 lần so với năm 2022 và thu về 335 tỷ nhân dân tệ, gấp 3,18 lần so với năm trước. Đáng chú ý, theo tờ báo “Inner Mongolia Autonomous Region”, trong kỳ nghỉ lễ từ 1-5/5 vừa qua, Khu Tự trị Nội Mông Cổ đã đón 15,02 triệu lượt khách nội địa, đánh dấu mức tăng 1,36 lần so với năm 2023. Doanh thu tạo ra trong giai đoạn này đạt 10,64 tỷ nhân dân tệ, tăng gấp 1,77 lần so với năm ngoái. Để đạt được những con số ấn tượng như trên, chính quyền Nội Mông đã đưa ra 15 biện pháp nhằm thúc đẩy phục hồi và phát triển du lịch đồng thời thiết kế và triển khai 36 trải nghiệm du lịch phong phú để tăng mức độ phổ biến.',
    },
    {
        id: 2,
        title: 'Khám Phá Nội Mông',
        images: ['/img/Blog/noi-mong5.jpg', '/img/Blog/noi-mong6.jpg', '/img/Blog/noi-mong7.jpg'],
        description:
            'Hành trình tour được diễn ra vào mùa Hè, từ tháng Bảy đến tháng Tám. Đây là thời điểm đẹp nhất để du lịch Nội Mông vì thời tiết vô cùng mát mẻ và dễ chịu, tạo điều kiện thuận lợi cho các hoạt động khám phá ngoài trời. Đặc biệt, mùa Hè cũng là mùa của các lễ hội truyền thống nổi tiếng như Naadam, nơi du khách có thể chứng kiến các cuộc thi đấu cưỡi ngựa, bắn cung và đấu vật, cung cấp cái nhìn sâu sắc về văn hóa và truyền thống của người bản địa. Cũng theo Vietravel, đây là tour du lịch đặc sắc bao gồm các trải nghiệm phù hợp cho nhiều đối tượng khách, nhiều độ tuổi... từ rong ruổi trên yên ngựa, bắn cung, khám phá thảo nguyên bao la dành cho nam giới, đến vui chơi thả ga ở khu Disneyland phiên bản sa mạc Vọng Âm phù hợp với trẻ em và check in, thả dáng tại những điểm đến hấp dẫn như: Công viên Lanshan, phim trường Trấn Bắc Bảo Tây Bộ, thảo nguyên Ordos... dành cho phái đẹp. Không chỉ vậy, du khách còn được trải nghiệm lều du mục, chiêm ngưỡng khoảnh khắc bình minh và hoàng hôn diệu kỳ của tự nhiên, hay khám phá những nét đẹp văn hóa của người dân bản địa. Hành trình charter bay thẳng Nội Mông cũng là cơ hội khai thác du lịch song phương, tạo điều kiện thuận lợi cho doanh nghiệp du lịch hai bên kết nối, trao đổi, hợp tác kinh doanh, nghiên cứu xây dựng các chương trình du lịch mới, hấp dẫn, độc đáo để phục vụ du khách. Pacific Tour dự kiến sẽ tổ chức tổng 7 đoàn khởi hành du lịch Nội Mông khởi hành hàng tuần trong tháng 7,8/2024, tương đương với 350 du khách. Cụ thể, hành trình Nội Mông sẽ khởi hành vào các ngày 13,20,27/7; 3,10,17,24/8. Với mức giá từ 15,9-18,9 triệu đồng, sản phẩm Nội Mông 8 ngày 7 đêm sẽ đem đến cho khách hàng nhiều cung bậc cảm xúc trong quá trình trải nghiệm du lịch Hè.',
    },
];

export const News = () => {
    useEffect(() => {
        document.title = 'Địa Điểm Du Lịch Miền Bắc - Blog';
    }, []);

    return (
        <div className="bg-gray-100 py-10">
            {/* Container chính */}
            <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-lg">
                {/* Tiêu đề chính */}
                <h1 className="text-4xl font-bold text-orange-500 text-center">Khám phá Nội Mông (Trung Quốc)</h1>
                <h2 className="text-3xl font-semibold text-gray-700 text-center mt-4">
                    Vùng đất bí ẩn Nội Mông đang thôi thúc những đôi chân mê xê dịch bởi khung cảnh thiên nhiên hùng vĩ,
                    kết hợp đủ sa mạc, thảo nguyên, văn hoá đặc sắc đa dạng và người dân thân thiện, hiếu khách.
                </h2>

                {/* Danh sách địa điểm */}
                {locations.map((location) => (
                    <div key={location.id} className="mt-12">
                        {/* Tiêu đề địa điểm */}
                        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">
                            {location.id}. {location.title}
                        </h2>

                        {/* Hình ảnh địa điểm */}
                        <div className="flex flex-wrap justify-center gap-4">
                            {location.images.map((imgSrc, index) => (
                                <img
                                    key={index}
                                    src={imgSrc}
                                    alt={`${location.title} - Hình ${index + 1}`}
                                    className="w-full md:w-[45%] lg:w-[30%] h-auto object-cover rounded-lg shadow-md"
                                />
                            ))}
                        </div>

                        {/* Chú thích ảnh */}
                        <p className="text-gray-500 italic text-center mt-2">
                            {location.title} – Trải nghiệm cưỡi lạc đà trên sa mạc Vọng Âm tại Nội Mông luôn vô cùng hấp
                            dẫn đối với các du khách ưa trải nghiệm, khám phá.
                        </p>

                        {/* Mô tả địa điểm */}
                        <p className="text-gray-700 mt-4 text-justify leading-relaxed">{location.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
