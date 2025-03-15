import { message, Pagination } from 'antd';
import { useState } from 'react';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import routes from '~/config/routes';
import BlogCards from '~/pages/Home/components/BlogCard';

export const BlogSection = () => {
    const BlogCardItems = [
        {
            img: '/img/BlogCards/blog_1.jpg',
            title: 'Địa Điểm Phổ Biến Nhất Khu Vực Miền Bắc',
            date: '10/10/2021',
            link: `${routes.blogMienBac}`,
        },
        {
            img: '/img/BlogCards/blog_2.jpg',
            title: 'Địa Điểm Phổ Biến Nhất Khu Vựa Miền Trung',
            date: '10/10/2021',
            link: `${routes.blogMienTrung}`,
        },
        {
            img: '/img/BlogCards/blog_3.jpg',
            title: 'Địa Điểm Phổ Biến Nhất Khu Vực Miền Nam',
            date: '10/10/2021',
            link: `${routes.blogMienNam}`,
        },
        {
            img: '/img/BlogCards/blog_4.jpg',
            title: 'Địa Điểm Phổ Biến Nhất Khu Vực Miền Bắc',
            date: '10/10/2021',
            link: `${routes.blogMienBac}`,
        },
        {
            img: '/img/BlogCards/blog_5.jpg',
            title: 'Địa Điểm Phổ Biến Nhất Khu Vực Miền Trung',
            date: '10/10/2021',
            link: `${routes.blogMienTrung}`,
        },
        {
            img: '/img/BlogCards/blog_6.jpg',
            title: 'Địa Điểm Phổ Biến Nhất Khu Vực Miền Nam',
            date: '10/10/2021',
            link: `${routes.blogMienNam}`,
        },
        {
            img: '/img/BlogCards/blog_4.jpg',
            title: 'Địa Điểm Phổ Biến Nhất Khu Vực Miền Bắc',
            date: '10/10/2021',
            link: `${routes.blogMienBac}`,
        },
        {
            img: '/img/BlogCards/blog_5.jpg',
            title: 'Địa Điểm Phổ Biến Nhất Khu Vực Miền Nam',
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
                content: 'Đang test...',
                duration: 2.5,
            })
            .then(() => message.success('Tải thành công!', 2.5))
            .then(() => message.info('Mời bạn đọc thêm bài viết.', 2.5));
    };
    return (
        <section className="py-20 bg-gray-100">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-semibold">Bài Viết Mới Nhất</h2>
                    <p className="text-gray-500 mt-2">Cập nhật những bài viết mới nhất từ chúng tôi.</p>
                </div>
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
                            Xem thêm
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