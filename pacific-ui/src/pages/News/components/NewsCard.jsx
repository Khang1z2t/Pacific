// src/components/NewsCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const NewsCard = ({ 
    title, 
    featuredImage, 
    excerpt, 
    imageHeight, 
    titleSize, 
    layout = 'vertical', 
    hoverEffect = false,
    date = '10/10/2023',
    link = '#'
}) => {
    const { t } = useTranslation();

    return (
        <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
            className={`bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 group relative ${
                hoverEffect ? 'hover:shadow-xl' : ''
            }`}
        >
            {layout === 'vertical' ? (
                // Layout dọc (dùng cho Top News)
                <div>
                    <div className="overflow-hidden">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            src={featuredImage}
                            alt={title}
                            className={`w-full ${imageHeight} object-cover rounded-t-xl`}
                        />
                    </div>

                    {/* Date badge */}
                    <motion.div 
                        initial={{ opacity: 0.8 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute top-3 left-3 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-lg px-3 py-1 text-sm shadow-md"
                    >
                        {date}
                    </motion.div>

                    <div className="p-4 border-t-2 border-blue-500">
                        <h3
                            className={`${titleSize} font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 mb-2`}
                        >
                            {title}
                        </h3>

                        <div className="mt-3 flex justify-between items-center">
                            <Link
                                to={link}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                            >
                                <motion.span 
                                    initial={{ x: 0 }}
                                    whileHover={{ x: 3 }}
                                    className="inline-block"
                                >
                                    {t("news.readMore") || "Đọc thêm"} →
                                </motion.span>
                            </Link>
                        </div>
                    </div>
                </div>
            ) : (
                // Layout ngang (dùng cho Travel News và Travel Tips)
                <div className="flex gap-4">
                    <div className="w-1/3 overflow-hidden">
                        <motion.img
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.5 }}
                            src={featuredImage}
                            alt={title}
                            className={`w-full ${imageHeight} object-cover rounded-lg`}
                        />
                    </div>
                    <div className="w-2/3 py-2 relative">
                        {/* Date badge */}
                        <div className="text-blue-600 text-xs font-medium mb-1">
                            {date}
                        </div>

                        <h3
                            className={`${titleSize} font-semibold text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200`}
                        >
                            {title}
                        </h3>
                        {excerpt && (
                            <p className="text-gray-600 mt-1 text-sm line-clamp-2">{excerpt}</p>
                        )}

                        <div className="mt-2">
                            <Link
                                to={link}
                                className="text-blue-600 hover:text-blue-800 font-medium text-sm flex items-center"
                            >
                                <motion.span 
                                    initial={{ x: 0 }}
                                    whileHover={{ x: 3 }}
                                    className="inline-block"
                                >
                                    {t("news.readMore") || "Đọc thêm"} →
                                </motion.span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default NewsCard;
