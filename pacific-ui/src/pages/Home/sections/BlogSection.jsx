import { message, Pagination, Typography, Divider } from 'antd';
import { useState } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import routes from '~/config/routes';
import BlogCards from '~/pages/Home/components/BlogCard';
import Particles from '~/component/Animation/AnimatedUI/Background/Particles';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const { Title, Text } = Typography;

export const BlogSection = () => {
    const { t } = useTranslation();
    const BlogCardItems = [
        {
            img: '/img/BlogCards/blog_1.jpg',
            title: t('blog.blog1'),
            date: '10/10/2021',
            link: `${routes.blogMienBac}`,
        },
        {
            img: '/img/BlogCards/blog_2.jpg',
            title: t('blog.blog2'),
            date: '10/10/2021',
            link: `${routes.blogMienTrung}`,
        },
        {
            img: '/img/BlogCards/blog_3.jpg',
            title: t('blog.blog3'),
            date: '10/10/2021',
            link: `${routes.blogMienNam}`,
        },
        {
            img: '/img/BlogCards/blog_4.jpg',
            title: t('blog.blog1'),
            date: '10/10/2021',
            link: `${routes.blogMienBac}`,
        },
        {
            img: '/img/BlogCards/blog_5.jpg',
            title: t('blog.blog2'),
            date: '10/10/2021',
            link: `${routes.blogMienTrung}`,
        },
        {
            img: '/img/BlogCards/blog_6.jpg',
            title: t('blog.blog3'),
            date: '10/10/2021',
            link: `${routes.blogMienNam}`,
        },
        {
            img: '/img/BlogCards/blog_4.jpg',
            title: t('blog.blog1'),
            date: '10/10/2021',
            link: `${routes.blogMienBac}`,
        },
        {
            img: '/img/BlogCards/blog_5.jpg',
            title: t('blog.blog2'),
            date: '10/10/2021',
            link: `${routes.blogMienNam}`,
        },
    ];
    const ITEM_PER_PAGE = 3;
    const [currentPage, setCurrentPage] = useState(1);
    const pageItem = BlogCardItems.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);
    const onPageChange = (page) => {
        setCurrentPage(page);
    };
    const isLastPage = currentPage === Math.ceil(BlogCardItems.length / ITEM_PER_PAGE);
    const [messageApi, contextHolder] = message.useMessage();

    const success = () => {
        messageApi
            .open({
                type: 'loading',
                content: 'Loading...',
                duration: 2.5,
            })
            .then(() => message.success(t('blog.blog4'), 2.5))
            .then(() => message.info(t('blog.blog5'), 2.5));
    };
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

    return (
        <section className="py-24 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <Particles
                    particleColors={['#d66e03', '#e8874c']}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={false}
                    alphaParticles={false}
                    disableRotation={false}
                    className="-z-10 absolute top-0 left-0 w-full h-full object-cover" />

                {/* Section Header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="text-center mb-16"
                >
                    <Divider className={'font-bold uppercase'}
                             style={{
                                 borderColor: '#7cb305',
                             }}
                             orientation="center">
                        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-lime-500">
                            {t('index.ind5')}</h2>
                        <p className={'text-sm sm:text-lg text-gray-600 mt-2'}>{t('index.ind6')}</p>
                    </Divider>
                </motion.div>

                {/* Blog Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
                >
                    {pageItem.map((item, index) => (
                        <motion.div key={index} variants={itemVariants}>
                            <BlogCards title={item.title} img={item.img} date={item.date} link={item.link} />
                        </motion.div>
                    ))}
                </motion.div>

                {/* Pagination or Load More */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="mt-16"
                >
                    {isLastPage ? (
                        <div className="text-center flex justify-center items-center space-x-4">
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: -5 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => {
                                    setCurrentPage(1);
                                }}
                                className="bg-gradient-to-r from-orange-600 to-orange-400 text-white p-3 rounded-full hover:shadow-lg transition-all duration-300"
                            >
                                <FontAwesomeIcon icon={faArrowLeft} />
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={success}
                                className="bg-gradient-to-r from-orange-600 to-orange-400 text-white px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                            >
                                {t('blog.blog6')}
                            </motion.button>
                            {contextHolder}
                        </div>
                    ) : (
                        <Pagination
                            defaultCurrent={1}
                            total={BlogCardItems.length}
                            align="center"
                            pageSize={ITEM_PER_PAGE}
                            onChange={onPageChange}
                            className="mt-8 text-center"
                            itemRender={(page, type, originalElement) => {
                                if (type === 'page') {
                                    return (
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {originalElement}
                                        </motion.div>
                                    );
                                }
                                return originalElement;
                            }}
                        />
                    )}
                </motion.div>
            </div>
        </section>
    );
};
