// src/pages/News.jsx
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import NewsCard from '~/pages/News/components/NewsCard';

export const News = () => {
    const { t } = useTranslation();

    // Dữ liệu tin tức
    const topNews = [
        {
            id: 1,
            title: t("news.top1") || "Top 10 điểm đến không thể bỏ qua khi du lịch Phú Quốc Hài (Đất Đỏ, Bà Rịa...)",
            featuredImage: '/img/Blog/noi-mong.jpg',
        },
        {
            id: 2,
            title: t("news.top2") || "Khám phá Cái Trường Trung Tâm - Tương ứng lịch sử và văn hóa ở Huế",
            featuredImage: '/img/Blog/noi-mong5.jpg',
        },
        {
            id: 3,
            title: t("news.top3") || "Lễ diều du lịch 30/4 tại TP.HCM 2025: Tất tần tật thông tin bạn cần biết",
            featuredImage: '/img/Blog/noi-mong6.jpg',
        },
        {
            id: 4,
            title: t("news.top4") || "Top 8 trung tâm thương mại mới ở Hồng Kông nổi tiếng hấp dẫn cho tín đồ...",
            featuredImage: '/img/Blog/noi-mong7.jpg',
        },
    ];

    const travelNews = [
        {
            id: 1,
            title: t("news.travel1") || "Du lịch Machu Picchu: Hành trình khám phá kỳ quan bị giấu ngày Andes",
            featuredImage: '/img/Blog/noi-mong1.jpg',
            excerpt: t("news.travelExcerpt1") || "Nằm ở miền giấu miền định dịu núi vùng vị của dãy Andes, Machu Picchu luôn là điểm đến mơ ước đối với bất kỳ ai yêu...",
        },
        {
            id: 2,
            title: t("news.travel2") || "Top 5 món ăn ở Peru khiến thực khách mê mẩn ngay từ lần thử đầu tiên",
            featuredImage: '/img/Blog/noi-mong2.jpg',
            excerpt: t("news.travelExcerpt2") || "Peru – vùng đất của nền văn minh cổ đại Inca, không chỉ hấp dẫn du khách bởi kỳ quan Machu Picchu...",
        },
        {
            id: 3,
            title: t("news.travel3") || "Top 5 lễ hội ở Peru: Những trải nghiệm sống động không thể bỏ lỡ",
            featuredImage: '/img/Blog/noi-mong3.jpg',
            excerpt: t("news.travelExcerpt3") || "Nghi lễ đầy màu sắc, những điệu múa truyền thống, âm nhạc sôi động – các lễ hội ở Peru, quyền năng sẽ nghi...",
        },
        {
            id: 4,
            title: t("news.travel4") || "Du lịch Cusco Peru: Hành trình khám phá thành phố cổ đại giấu lâu Andes",
            featuredImage: '/img/Blog/noi-mong4.jpg',
            excerpt: t("news.travelExcerpt4") || "Cusco – vùng đất của nền văn minh cổ đại Inca, không chỉ hấp dẫn du khách bởi kỳ quan Machu Picchu...",
        },
    ];

    const travelTips = [
        {
            id: 1,
            title: t("news.tips1") || "Top 4 lễ tăng và Dubai: Hành trình khám phá văn hóa và sự tương ứng",
            featuredImage: '/img/Blog/noi-mong5.jpg',
            excerpt: t("news.tipsExcerpt1") || "Dubai không chỉ nổi tiếng với những tòa nhà chọc trời, trung tâm mua sắm xa hoa mà còn nổi lực nghi lễ giấu...",
        },
        {
            id: 2,
            title: t("news.tips2") || "Top 3 sa mạc ở Trung Đông: Vẻ đẹp hoang sơ giữa thiên nhiên khắc nghiệt",
            featuredImage: '/img/Blog/noi-mong6.jpg',
            excerpt: t("news.tipsExcerpt2") || "Trung Đông nổi tiếng với những sa mạc rộng lớn, nơi chứa đựng vẻ đẹp hoang sơ và bí ẩn của thiên nhiên. Nhữ...",
        },
        {
            id: 3,
            title: t("news.tips3") || "Top 3 trải nghiệm du lịch ở Qatar: Những điều hấp dẫn đáng để bạn thử",
            featuredImage: '/img/Blog/noi-mong7.jpg',
            excerpt: t("news.tipsExcerpt3") || "Qatar, quốc gia có bề dày văn hóa và lịch sử lâu đời, đang ngày càng trở thành điểm đến yêu thích của du khách...",
        },
    ];

    useEffect(() => {
        document.title = t("news.pageTitle") || 'Tin Tức Du Lịch - Blog';
    }, [t]);

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            {/* Header */}
            <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between mb-8">
                    <div className="flex items-center space-x-3">
                        <span className="text-blue-600 font-medium text-sm uppercase tracking-wider">
                            {t("news.category") || "Du lịch /"}
                        </span>
                        <h1 className="text-4xl font-bold text-gray-900">
                            {t("news.title") || "Tin mới"}
                        </h1>
                    </div>
                    <div className="flex space-x-3">
                        <button className="px-5 py-2 bg-white text-gray-700 font-medium rounded-full shadow-sm hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
                            {t("news.tab1") || "Tin tức du lịch"}
                        </button>
                        <button className="px-5 py-2 bg-white text-gray-700 font-medium rounded-full shadow-sm hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
                            {t("news.tab2") || "Kinh nghiệm du lịch"}
                        </button>
                    </div>
                </div>
            </header>

            {/* Top News Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {topNews.map((article) => (
                        <NewsCard
                            key={article.id}
                            title={article.title}
                            featuredImage={article.featuredImage}
                            imageHeight="h-48"
                            titleSize="text-lg"
                            hoverEffect={true}
                        />
                    ))}
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10">
                {/* Travel News Section */}
                <section className="lg:w-2/3">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-6 uppercase tracking-wide">
                        {t("news.travelNews") || "TIN TỨC DU LỊCH"}
                    </h2>
                    <div className="space-y-8">
                        {travelNews.map((article) => (
                            <NewsCard
                                key={article.id}
                                title={article.title}
                                featuredImage={article.featuredImage}
                                excerpt={article.excerpt}
                                imageHeight="h-36"
                                titleSize="text-xl"
                                layout="horizontal"
                                hoverEffect={true}
                            />
                        ))}
                    </div>
                </section>

                {/* Travel Tips Section */}
                <section className="lg:w-1/3">
                    <h2 className="text-2xl font-semibold text-blue-600 mb-6 uppercase tracking-wide">
                        {t("news.travelTips") || "KINH NGHIỆM DU LỊCH"}
                    </h2>
                    <div className="space-y-6">
                        {travelTips.map((article) => (
                            <NewsCard
                                key={article.id}
                                title={article.title}
                                featuredImage={article.featuredImage}
                                excerpt={article.excerpt}
                                imageHeight="h-28"
                                titleSize="text-md"
                                layout="horizontal"
                                hoverEffect={true}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
};