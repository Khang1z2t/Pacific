import React from 'react';
import { Button, Tooltip, Popover, message } from 'antd';
import {
    FaEye,
    FaShareAlt,
    FaBookmark,
    FaFacebookF,
    FaTwitter,
    FaLink,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import config from '~/config';

export const BlogCard = ({ blog }) => {
    // Calculate share URL
    const shareUrl = `${window.location.origin}${config.routes.news}${blog.slug}`;

    // Handle copy link
    const handleCopy = () => {
        navigator.clipboard.writeText(shareUrl);
        message.success('Sao chép liên kết thành công!');
    };

    // Handle save blog (to be implemented with API)
    const handleSave = () => {
        message.info('Đã lưu bài viết!'); // Temporary feedback
    };

    // Share content for Popover
    const shareContent = (
        <div className="flex flex-col space-y-2 min-w-[120px]">
            <button
                className="flex items-center space-x-2 hover:text-blue-600"
                onClick={() =>
                    window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                        '_blank',
                    )
                }
            >
                <FaFacebookF /> <span>Facebook</span>
            </button>
            <button
                className="flex items-center space-x-2 hover:text-blue-400"
                onClick={() =>
                    window.open(
                        `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`,
                        '_blank',
                    )
                }
            >
                <FaTwitter /> <span>Twitter</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-green-600" onClick={handleCopy}>
                <FaLink /> <span>Sao chép liên kết</span>
            </button>
        </div>
    );

    return (
        <div
            className="bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:transform hover:-translate-y-1">
            {/* Blog Content */}
            <Link to={`${config.routes.news}${blog.slug}`} className="block" style={{ height: '100%' }} exact="true">
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
                    {blog.category && (
                        <div
                            className="absolute top-0 left-0 bg-gradient-to-r from-orange-600 to-orange-400 text-white text-xs px-3 py-1 rounded-br-lg">
                            {blog.category.name}
                        </div>
                    )}
                </div>
                <div className="p-4">
                    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-orange-600 transition-colors duration-300">
                        {blog.title}
                    </h2>
                    <p className="text-gray-600 text-sm line-clamp-3 mb-3">{blog.metaDescription}</p>
                    <p className="text-gray-500 text-xs">
                        Tác giả: {blog.user?.firstName || blog.user?.username}
                    </p>
                </div>
            </Link>

            {/* Action Buttons */}
            <div className="flex justify-between items-center p-3 border-t border-gray-100 bg-gray-50">
                <div className="flex items-center space-x-4 text-gray-500">
                    <Tooltip title="Lượt xem">
                        <div className="flex items-center space-x-1">
                            <FaEye className="text-orange-500" />
                            <span className="text-xs">{blog.viewCount || 0}</span>
                        </div>
                    </Tooltip>
                </div>
                <div className="flex items-center space-x-2">
                    <Tooltip title="Chia sẻ">
                        <Popover content={shareContent} trigger="click" placement="topRight">
                            <button
                                className="text-gray-500 hover:text-orange-600 p-1 transition-colors duration-200"
                                type="button"
                            >
                                <FaShareAlt />
                            </button>
                        </Popover>
                    </Tooltip>
                    <Tooltip title="Lưu bài viết">
                        <button
                            className="text-gray-500 hover:text-orange-600 p-1 transition-colors duration-200"
                            onClick={handleSave}
                            type="button"
                        >
                            <FaBookmark />
                        </button>
                    </Tooltip>
                </div>
            </div>
        </div>
    );
};