import { useEffect, useState } from 'react';
import { Divider, message, Spin } from 'antd';
import { useLocation, useParams } from 'react-router-dom';
import BlogServices from '~/services/BlogServices';
import config from '~/config';

export const DetailNews = () => {
    const location = useLocation();
    const slug = location.pathname.replace(config.routes.news, '').replace(/^\/+/, '');
    const [blog, setBlog] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchBlog = async () => {
        try {
            const response = await BlogServices.getBySlug(slug);
            setBlog(response.data);
        } catch (err) {
            console.error(err);
            message.error('Có lỗi xảy ra khi tải bài viết');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlog();
    }, [slug]);

    return (
        <>
            <div className="bg-gray-100 justify-center p-6 mx-auto flex w-full flex-col items-center">
                {loading ? (
                    <Spin
                        size="large"
                        tip="Đang tải bài viết..."
                        className="flex items-center justify-center h-screen"
                        style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
                    />
                ) : (
                    <div className="bg-white shadow-md rounded-lg p-6 max-w-2xl w-full">
                        <h1 className="text-2xl font-bold mb-4">{blog.title}</h1>
                        <Divider />
                        <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                    </div>
                )}
            </div>
        </>
    );
};