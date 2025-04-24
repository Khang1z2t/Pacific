import { useCallback, useEffect, useState } from 'react';
import { Divider, message, Spin, Typography, Card } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import BlogServices from '~/services/BlogServices';
import config from '~/config';

const { Title, Text } = Typography;

const processImageURLs = (htmlString) => {
    const getImageURL = (imageId) => {
        return config.imageConfig.getImage(imageId);
    };

    if (!htmlString) return '';

    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, 'text/html');
    const images = doc.querySelectorAll('img');
    images.forEach((img) => {
        const src = img.getAttribute('src');
        const regex = /config\.imageConfig\.getImage\(['"]?([^'"]+)['"]?\)/;
        const match = src && src.match(regex);
        if (match && match[1]) {
            img.setAttribute('src', getImageURL(match[1]));
        }
    });

    return doc.body.innerHTML;
};

export const DetailNews = () => {
    const location = useLocation();
    const slug = location.pathname.replace(config.routes.news, '').replace(/^\/+/, '');
    const [blog, setBlog] = useState({});
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
        try {
            const [blogRes, blogsRes] = await Promise.all([
                BlogServices.getBySlug(slug),
                BlogServices.getAllBlogs(),
            ]);
            setBlog(blogRes.data);
            setBlogs(blogsRes.data);
        } catch (error) {
            console.error('Error fetching blog data:', error);
            message.error('Không thể tải bài viết.');
        } finally {
            setLoading(false);
        }
    }, [slug]);


    useEffect(() => {
        fetchData();
    }, [slug, fetchData]);

    const relatedBlogs = blogs
        .filter(
            (item) =>
                item.category?.id === blog.category?.id &&
                item.id !== blog.id,
        )
        .slice(0, 5); // Limit to 5 related posts

    return (
        <div className="bg-gray-50 min-h-screen">
            {/* Header */}
            <div className="bg-white shadow-md">
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <Title level={1} className="text-3xl sm:text-4xl font-bold text-gray-800 mb-3">
                        {blog.title}
                    </Title>
                    <Text type="secondary" className="text-sm sm:text-base">
                        Đăng ngày: {config.webConfig.convertLocalDateTime(blog.createdAt) || 'N/A'}
                    </Text>
                    <Text type="secondary" className="text-sm sm:text-base ml-4">
                        Tác giả: {blog.user?.username || 'N/A'}
                    </Text>
                    {blog.description && (
                        <Text className="block mt-2 text-gray-600 italic text-base sm:text-lg">
                            {blog.description}
                        </Text>
                    )}
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
                {/* Blog Content */}
                <div className="lg:w-2/3">
                    <Card className="shadow-md p-6">
                        {loading ? (
                            <Spin
                                size="large"
                                tip="Đang tải bài viết..."
                                className="flex items-center justify-center h-64"
                            />
                        ) : (
                            <>
                                <div
                                    className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                                    dangerouslySetInnerHTML={{ __html: processImageURLs(blog.content) }}
                                />
                                <Divider />
                                <div className="mt-6">
                                    <Title level={4} className="text-xl font-semibold text-gray-800">
                                        Chia sẻ bài viết
                                    </Title>
                                    <div className="flex gap-4 mt-2">
                                        <a
                                            href="#"
                                            className="text-blue-600 hover:text-blue-800 flex items-center gap-2"
                                        >
                                            <i className="fab fa-facebook-f" /> Facebook
                                        </a>
                                        <a
                                            href="#"
                                            className="text-blue-400 hover:text-blue-600 flex items-center gap-2"
                                        >
                                            <i className="fab fa-twitter" /> Twitter
                                        </a>
                                        <button
                                            onClick={() => {
                                                navigator.clipboard.writeText(`${window.location.origin}${config.routes.news}${blog.slug}`);
                                                message.success('Sao chép liên kết thành công!');
                                            }}
                                            className="text-green-600 hover:text-green-800 flex items-center gap-2"
                                        >
                                            <i className="fas fa-link" /> Sao chép liên kết
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="lg:w-1/3 sticky top-16 lg:top-0 lg:ml-8">
                    <Card className="shadow-md p-6">
                        <Title level={4} className="text-2xl uppercase font-semibold text-gray-800 mb-4">
                            Bài viết liên quan
                        </Title>
                        <Divider />
                        <div className="space-y-4">
                            {relatedBlogs.length === 0 ? (
                                <span>Không có bài viết liên quan.</span>
                            ) : (
                                relatedBlogs.map((item) => (
                                    <div
                                        className={'flex items-center border rounded-lg p-2 border-gray-200 transition-all hover:cursor-pointer hover:border-orange-500 hover:bg-orange-50 gap-4'}
                                        key={item.id}>
                                        <Link to={`${config.routes.news}${item.slug}`}
                                              className="flex items-center gap-4">
                                            <img
                                                src={config.imageConfig.getImage(item.thumbnail)}
                                                alt={item.title}
                                                className="w-16 h-16 rounded-md object-cover"
                                            />
                                            <div>
                                                <Text className="text-gray-800 font-semibold hover:text-blue-600">
                                                    {item.metaTitle}
                                                </Text>
                                                <Text
                                                    className="block line-clamp-2 max-h-12 overflow-ellipsis overflow-hidden text-gray-500 text-sm">
                                                    {item.metaDescription}
                                                </Text>
                                            </div>
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
};