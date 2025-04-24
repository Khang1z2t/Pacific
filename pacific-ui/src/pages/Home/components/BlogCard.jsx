import config from '~/config';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import React from 'react';

const BlogCard = ({ blog }) => {

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="bg-white rounded-xl overflow-hidden shadow-lg relative group h-full flex flex-col"
        >
            <Link to={`${config.routes.news}${blog.slug}`} className="block flex-grow">
                {/* Image Section */}
                <div className="overflow-hidden">
                    <motion.img
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                        src={config.imageConfig.getImage(blog.thumbnail) || config.webConfig.banner1}
                        alt={blog.title}
                        className="w-full h-48 sm:h-52 object-cover transition-all duration-500 ease-in-out"
                    />
                </div>

                {/* Date and Category Overlay */}
                <motion.div
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                    className="absolute top-4 left-4 bg-gradient-to-r from-orange-600 to-orange-400 text-white rounded-lg px-3 py-1.5 text-xs shadow-md"
                >
                    {config.webConfig.convertDateNoTime(blog.createdAt)}
                </motion.div>
                {blog.category && (
                    <div
                        className="absolute top-4 right-4 bg-green-500 text-white rounded-lg px-3 py-1.5 text-xs shadow-md">
                        {blog.category.name}
                    </div>
                )}

                {/* Content Section */}
                <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 line-clamp-2 mb-3 h-14">
                        {blog.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4 flex-grow">
                        {blog.metaDescription}
                    </p>
                    <div className="flex items-center space-x-2 mt-auto">
                        <div
                            className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                            {blog.user?.avatar ? (
                                <img
                                    src={blog.user.avatar}
                                    alt={blog.user?.firstName || blog.user?.username}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <span className="text-gray-500 text-xs font-bold">
                                    {(blog.user?.firstName?.[0] || blog.user?.username?.[0] || 'U').toUpperCase()}
                                </span>
                            )}
                        </div>
                        <span className="text-gray-700 text-sm font-medium">
                            {blog.user?.firstName} {blog.user?.lastName || blog.user?.username}
                        </span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};