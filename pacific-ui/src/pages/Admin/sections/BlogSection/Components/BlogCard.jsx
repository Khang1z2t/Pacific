import React from 'react';
import { Button, Card, message, Popover, Tooltip } from 'antd';
import { ShareAltOutlined, EyeOutlined } from '@ant-design/icons';
import config from '~/config';
import { Link } from 'react-router-dom';
import { FaBookmark, FaFacebookF, FaLink, FaShareAlt, FaTwitter } from 'react-icons/fa';

export const BlogCard = ({ blog }) => {
    const handleShare = () => {
        // Tạm thời dùng navigator.share nếu hỗ trợ, nếu không thì copy URL
        if (navigator.share) {
            let url = `${window.location.origin}/news/${blog.slug}`;
            navigator.share({
                title: blog.title,
                text: blog.metaDescription,
                url,
            }).catch(console.error);
        } else {
            navigator.clipboard.writeText(`${window.location.origin}/news/${blog.slug}`);
            alert('Đã sao chép link bài viết!');
        }
    };
    const shareUrl = `${window.location.origin}${config.routes.news}${blog.slug}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        message.success('Sao chép thành công!');
    };
    const shareContent = (
        <div className="flex flex-col space-y-2 min-w-[120px]">
            <button
                className="flex items-center space-x-2 hover:text-blue-600"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank')}
            >
                <FaFacebookF /> <span>Facebook</span>
            </button>
            <button
                className="flex items-center space-x-2 hover:text-blue-400"
                onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`, '_blank')}
            >
                <FaTwitter /> <span>Twitter</span>
            </button>
            <button
                className="flex items-center space-x-2 hover:text-green-600"
                onClick={handleCopy}
            >
                <FaLink /> <span>Sao chép link</span>
            </button>
        </div>
    );
    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1">
            <Link to={`${config.routes.news}${blog.slug}`} className="block">
                <div className="relative h-48 overflow-hidden">
                    <img
                        src={config.imageConfig.getImage(blog.thumbnail) || config.webConfig.banner1}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                        <p className="text-orange-700 p-1 rounded-lg w-fit bg-orange-200 text-sm">
                            {config.webConfig.convertDateNoTime(blog.createdAt)}
                        </p>
                    </div>
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2">{blog.title}</h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">{blog.metaDescription}</p>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-500 text-xs">Tác giả: {blog.user.username}</p>
                        <div className="flex justify-end px-4 py-2 bg-gray-50 border-t border-gray-100">
                            <button className="text-gray-500 hover:text-orange-600 p-1 transition-colors duration-200"
                                    title="Lưu bài viết">
                                <FaBookmark />
                            </button>
                            <Popover content={shareContent} trigger="click" placement="topRight">
                                <button
                                    className="text-gray-500 hover:text-orange-600 p-1 ml-3 transition-colors duration-200"
                                    title="Chia sẻ"
                                    type="button"
                                >
                                    <FaShareAlt />
                                </button>
                            </Popover>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};