import { message, Pagination } from 'antd';
import { useEffect, useState } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import routes from '~/config/routes';
import BlogCards from '~/pages/Home/components/BlogCard';
import Particles from '~/component/Animation/AnimatedUI/Background/Particles';
import { useTranslation } from 'react-i18next';

export const BlogSection = () => {
    const { t } = useTranslation();
    const BlogCardItems = [
        {
            img: '/img/BlogCards/blog_1.jpg',
            title: t("blog.blog1"),
            date: '10/10/2021',
            link: `${routes.blogMienBac}`,
        },
        {
            img: '/img/BlogCards/blog_2.jpg',
            title: t("blog.blog2"),
            date: '10/10/2021',
            link: `${routes.blogMienTrung}`,
        },
        {
            img: '/img/BlogCards/blog_3.jpg',
            title: t("blog.blog3"),
            date: '10/10/2021',
            link: `${routes.blogMienNam}`,
        },
        {
            img: '/img/BlogCards/blog_4.jpg',
            title: t("blog.blog1"),
            date: '10/10/2021',
            link: `${routes.blogMienBac}`,
        },
        {
            img: '/img/BlogCards/blog_5.jpg',
            title: t("blog.blog2"),
            date: '10/10/2021',
            link: `${routes.blogMienTrung}`,
        },
        {
            img: '/img/BlogCards/blog_6.jpg',
            title: t("blog.blog3"),
            date: '10/10/2021',
            link: `${routes.blogMienNam}`,
        },
        {
            img: '/img/BlogCards/blog_4.jpg',
            title: t("blog.blog1"),
            date: '10/10/2021',
            link: `${routes.blogMienBac}`,
        },
        {
            img: '/img/BlogCards/blog_5.jpg',
            title: t("blog.blog2"),
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
            .then(() => message.success(t("blog.blog4"), 2.5))
            .then(() => message.info(t("blog.blog5"), 2.5));
    };
    return (
        <section className="py-20 relative">
            <div className="max-w-7xl mx-auto px-4">
                <Particles
                    particleColors={['#d66e03', '#e8874c']}
                    particleCount={200}
                    particleSpread={10}
                    speed={0.1}
                    particleBaseSize={100}
                    moveParticlesOnHover={false}
                    alphaParticles={false}
                    disableRotation={false}
                    className={"-z-10 absolute top-0 left-0 w-full h-full object-cover"}/>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {pageItem.map((item, index) => (
                        <BlogCards key={index} title={item.title} img={item.img} date={item.date} link={item.link} />
                    ))}
                </div>
                {isLastPage ? (
                    <div className={'text-center mt-8 gap-4'}>
                        <button
                            onClick={() => {
                                setCurrentPage(1);
                            }}
                            className="bg-orange-500 text-white px-4 py-2 rounded-full hover:bg-orange-600 me-2"
                        >
                            <FontAwesomeIcon icon={faArrowLeft} />
                        </button>
                        <button
                            onClick={success}
                            className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600"
                        >
                            {t("blog.blog6")}
                        </button>
                        {contextHolder}
                    </div>
                ) : (
                    <Pagination
                        defaultCurrent={1}
                        total={BlogCardItems.length}
                        align={'center'}
                        pageSize={ITEM_PER_PAGE}
                        onChange={onPageChange}
                        className="mt-8 text-center"
                    />
                )}
            </div>
        </section>
    );
};