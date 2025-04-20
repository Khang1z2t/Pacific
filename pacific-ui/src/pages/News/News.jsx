// src/pages/News.jsx
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import NewsCard from '~/pages/News/components/NewsCard';
import { motion } from 'framer-motion';
import { Divider, Pagination } from 'antd';

export const News = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('news'); // 'news' or 'tips'
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 4;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                when: 'beforeChildren',
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: 'easeOut' },
        },
    };

    // Dữ liệu tin tức
    const topNews = [
        {
            id: 1,
            title: t("news.top1") || "Top 10 điểm đến không thể bỏ qua khi du lịch Phú Quốc Hài (Đất Đỏ, Bà Rịa...)",
            featuredImage: '/img/Blog/noi-mong.jpg',
            date: '15/05/2023',
            link: '/news/1'
        },
        {
            id: 2,
            title: t("news.top2") || "Khám phá Cái Trường Trung Tâm - Tương ứng lịch sử và văn hóa ở Huế",
            featuredImage: '/img/Blog/noi-mong5.jpg',
            date: '22/06/2023',
            link: '/news/2'
        },
        {
            id: 3,
            title: t("news.top3") || "Lễ diều du lịch 30/4 tại TP.HCM 2025: Tất tần tật thông tin bạn cần biết",
            featuredImage: '/img/Blog/noi-mong6.jpg',
            date: '30/07/2023',
            link: '/news/3'
        },
        {
            id: 4,
            title: t("news.top4") || "Top 8 trung tâm thương mại mới ở Hồng Kông nổi tiếng hấp dẫn cho tín đồ...",
            featuredImage: '/img/Blog/noi-mong7.jpg',
            date: '12/08/2023',
            link: '/news/4'
        },
    ];

    const travelNews = [
        {
            id: 1,
            title: t("news.travel1") || "Du lịch Machu Picchu: Hành trình khám phá kỳ quan bị giấu ngày Andes",
            featuredImage: '/img/Blog/noi-mong1.jpg',
            excerpt: t("news.travelExcerpt1") || "Nằm ở miền giấu miền định dịu núi vùng vị của dãy Andes, Machu Picchu luôn là điểm đến mơ ước đối với bất kỳ ai yêu...",
            date: '05/09/2023',
            link: '/news/travel/1'
        },
        {
            id: 2,
            title: t("news.travel2") || "Top 5 món ăn ở Peru khiến thực khách mê mẩn ngay từ lần thử đầu tiên",
            featuredImage: '/img/Blog/noi-mong2.jpg',
            excerpt: t("news.travelExcerpt2") || "Peru – vùng đất của nền văn minh cổ đại Inca, không chỉ hấp dẫn du khách bởi kỳ quan Machu Picchu...",
            date: '18/09/2023',
            link: '/news/travel/2'
        },
        {
            id: 3,
            title: t("news.travel3") || "Top 5 lễ hội ở Peru: Những trải nghiệm sống động không thể bỏ lỡ",
            featuredImage: '/img/Blog/noi-mong3.jpg',
            excerpt: t("news.travelExcerpt3") || "Nghi lễ đầy màu sắc, những điệu múa truyền thống, âm nhạc sôi động – các lễ hội ở Peru, quyền năng sẽ nghi...",
            date: '25/09/2023',
            link: '/news/travel/3'
        },
        {
            id: 4,
            title: t("news.travel4") || "Du lịch Cusco Peru: Hành trình khám phá thành phố cổ đại giấu lâu Andes",
            featuredImage: '/img/Blog/noi-mong4.jpg',
            excerpt: t("news.travelExcerpt4") || "Cusco – vùng đất của nền văn minh cổ đại Inca, không chỉ hấp dẫn du khách bởi kỳ quan Machu Picchu...",
            date: '02/10/2023',
            link: '/news/travel/4'
        },
        {
            id: 5,
            title: "Khám phá ẩm thực đường phố Hà Nội: Hành trình vị giác khó quên",
            featuredImage: '/img/Blog/noi-mong.jpg',
            excerpt: "Hà Nội nổi tiếng với nền ẩm thực đường phố phong phú và đa dạng. Từ phở, bún chả đến bánh mì, mỗi món ăn đều mang đậm bản sắc...",
            date: '10/10/2023',
            link: '/news/travel/5'
        },
        {
            id: 6,
            title: "Du lịch Sapa mùa đông: Trải nghiệm tuyết rơi hiếm có ở Việt Nam",
            featuredImage: '/img/Blog/noi-mong5.jpg',
            excerpt: "Sapa vào mùa đông mang một vẻ đẹp hoàn toàn khác biệt. Những thửa ruộng bậc thang phủ đầy tuyết trắng, những ngôi nhà nhỏ ẩn mình...",
            date: '15/10/2023',
            link: '/news/travel/6'
        },
    ];

    const travelTips = [
        {
            id: 1,
            title: t("news.tips1") || "Top 4 lễ tăng và Dubai: Hành trình khám phá văn hóa và sự tương ứng",
            featuredImage: '/img/Blog/noi-mong5.jpg',
            excerpt: t("news.tipsExcerpt1") || "Dubai không chỉ nổi tiếng với những tòa nhà chọc trời, trung tâm mua sắm xa hoa mà còn nổi lực nghi lễ giấu...",
            date: '08/08/2023',
            link: '/news/tips/1'
        },
        {
            id: 2,
            title: t("news.tips2") || "Top 3 sa mạc ở Trung Đông: Vẻ đẹp hoang sơ giữa thiên nhiên khắc nghiệt",
            featuredImage: '/img/Blog/noi-mong6.jpg',
            excerpt: t("news.tipsExcerpt2") || "Trung Đông nổi tiếng với những sa mạc rộng lớn, nơi chứa đựng vẻ đẹp hoang sơ và bí ẩn của thiên nhiên. Nhữ...",
            date: '15/09/2023',
            link: '/news/tips/2'
        },
        {
            id: 3,
            title: t("news.tips3") || "Top 3 trải nghiệm du lịch ở Qatar: Những điều hấp dẫn đáng để bạn thử",
            featuredImage: '/img/Blog/noi-mong7.jpg',
            excerpt: t("news.tipsExcerpt3") || "Qatar, quốc gia có bề dày văn hóa và lịch sử lâu đời, đang ngày càng trở thành điểm đến yêu thích của du khách...",
            date: '22/09/2023',
            link: '/news/tips/3'
        },
        {
            id: 4,
            title: "Kinh nghiệm du lịch tiết kiệm cho sinh viên: Khám phá thế giới với ngân sách hạn chế",
            featuredImage: '/img/Blog/noi-mong1.jpg',
            excerpt: "Du lịch không nhất thiết phải tốn kém. Với những mẹo nhỏ và kế hoạch hợp lý, sinh viên vẫn có thể khám phá nhiều điểm đến...",
            date: '01/10/2023',
            link: '/news/tips/4'
        },
        {
            id: 5,
            title: "Cẩm nang an toàn khi du lịch một mình: Những điều cần lưu ý",
            featuredImage: '/img/Blog/noi-mong2.jpg',
            excerpt: "Du lịch một mình mang đến sự tự do và những trải nghiệm độc đáo, nhưng cũng đi kèm với những rủi ro. Bài viết này sẽ cung cấp...",
            date: '10/10/2023',
            link: '/news/tips/5'
        },
    ];

    // Get current items based on active tab and pagination
    const getCurrentItems = () => {
        const items = activeTab === 'news' ? travelNews : travelTips;
        const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
        const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
        return items.slice(indexOfFirstItem, indexOfLastItem);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 500, behavior: 'smooth' });
    };

    useEffect(() => {
        document.title = t("news.pageTitle") || 'Tin Tức Du Lịch - Blog';
        // Reset to page 1 when tab changes
        setCurrentPage(1);
    }, [t, activeTab]);

    return (
        <div className="bg-gray-100 min-h-screen py-10">
            {/* Header */}
            <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4"
                >
                    <div className="flex items-center space-x-3">
                        <span className="text-blue-600 font-medium text-sm uppercase tracking-wider">
                            {t("news.category") || "Du lịch /"}
                        </span>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400">
                            {t("news.title") || "Tin mới"}
                        </h1>
                    </div>
                    <div className="flex space-x-3">
                        <button 
                            className={`px-5 py-2 font-medium rounded-full shadow-sm transition-all duration-300 ${
                                activeTab === 'news' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                            onClick={() => setActiveTab('news')}
                        >
                            {t("news.tab1") || "Tin tức du lịch"}
                        </button>
                        <button 
                            className={`px-5 py-2 font-medium rounded-full shadow-sm transition-all duration-300 ${
                                activeTab === 'tips' 
                                    ? 'bg-blue-600 text-white' 
                                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                            }`}
                            onClick={() => setActiveTab('tips')}
                        >
                            {t("news.tab2") || "Kinh nghiệm du lịch"}
                        </button>
                    </div>
                </motion.div>
            </header>

            {/* Top News Section */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mb-8"
                >
                    <Divider className="font-bold uppercase"
                        style={{ borderColor: '#3b82f6' }}
                        orientation="center">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                            {t("news.featuredNews") || "Tin nổi bật"}
                        </h2>
                    </Divider>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {topNews.map((article) => (
                        <motion.div key={article.id} variants={itemVariants}>
                            <NewsCard
                                title={article.title}
                                featuredImage={article.featuredImage}
                                imageHeight="h-48"
                                titleSize="text-lg"
                                hoverEffect={true}
                                date={article.date}
                                link={article.link}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-10">
                {/* Main Content Section */}
                <section className="lg:w-2/3">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl font-semibold text-blue-600 mb-6 uppercase tracking-wide border-b-2 border-blue-200 pb-2">
                            {activeTab === 'news' 
                                ? (t("news.travelNews") || "TIN TỨC DU LỊCH")
                                : (t("news.travelTips") || "KINH NGHIỆM DU LỊCH")
                            }
                        </h2>
                    </motion.div>
                    
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="space-y-8"
                    >
                        {getCurrentItems().map((article) => (
                            <motion.div key={article.id} variants={itemVariants}>
                                <NewsCard
                                    title={article.title}
                                    featuredImage={article.featuredImage}
                                    excerpt={article.excerpt}
                                    imageHeight="h-36"
                                    titleSize="text-xl"
                                    layout="horizontal"
                                    hoverEffect={true}
                                    date={article.date}
                                    link={article.link}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Pagination */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mt-8 flex justify-center"
                    >
                        <Pagination
                            current={currentPage}
                            total={activeTab === 'news' ? travelNews.length : travelTips.length}
                            pageSize={ITEMS_PER_PAGE}
                            onChange={handlePageChange}
                            showSizeChanger={false}
                        />
                    </motion.div>
                </section>

                {/* Sidebar */}
                <section className="lg:w-1/3">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                {t("news.popularPosts") || "Bài viết phổ biến"}
                            </h3>
                            <div className="space-y-4">
                                {topNews.slice(0, 3).map((article) => (
                                    <div key={article.id} className="flex gap-3 items-center">
                                        <img 
                                            src={article.featuredImage} 
                                            alt={article.title}
                                            className="w-16 h-16 object-cover rounded-lg"
                                        />
                                        <div>
                                            <h4 className="text-sm font-medium text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors duration-200">
                                                {article.title}
                                            </h4>
                                            <p className="text-xs text-gray-500 mt-1">{article.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="bg-white rounded-xl shadow-md p-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                                {t("news.categories") || "Danh mục"}
                            </h3>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                        {t("news.category1") || "Du lịch trong nước"}
                                    </span>
                                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                                        24
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                        {t("news.category2") || "Du lịch nước ngoài"}
                                    </span>
                                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                                        18
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                        {t("news.category3") || "Ẩm thực"}
                                    </span>
                                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                                        12
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                                    <span className="text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                        {t("news.category4") || "Khách sạn & Nghỉ dưỡng"}
                                    </span>
                                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                                        9
                                    </span>
                                </div>
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-700 hover:text-blue-600 transition-colors duration-200 cursor-pointer">
                                        {t("news.category5") || "Mẹo du lịch"}
                                    </span>
                                    <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full">
                                        15
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </section>
            </main>
        </div>
    );
};