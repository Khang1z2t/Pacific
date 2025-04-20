import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const BlogCards = ({ title, img, date, link }) => {
    const { t } = useTranslation();

    return (
        <motion.div 
            whileHover={{ y: -8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="max-w-sm mx-auto h-full rounded-xl overflow-hidden shadow-lg relative group"
        >
            <div className="overflow-hidden">
                <motion.img 
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    src={img} 
                    alt={title} 
                    className="w-full h-52 object-cover transition-all duration-500 ease-in-out" 
                />
            </div>

            <motion.div 
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                className="absolute top-4 left-4 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg px-3 py-1.5 text-center shadow-md"
            >
                {date}
            </motion.div>

            <div className="bg-white p-6 border-t-4 border-orange-500">
                <h3 className="text-xl font-bold mb-3 text-gray-800 line-clamp-2 h-14">{title}</h3>

                <div className="mt-4 flex justify-between items-center">
                    <Link
                        to={link}
                        className="group-hover:bg-gradient-to-r group-hover:from-orange-600 group-hover:to-orange-400 bg-orange-500 text-white px-5 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 inline-block text-center font-medium"
                    >
                        <motion.span 
                            initial={{ x: 0 }}
                            whileHover={{ x: 5 }}
                            className="inline-block"
                        >
                            {t("blog.blog6")} →
                        </motion.span>
                    </Link>

                    <motion.div 
                        whileHover={{ rotate: 15 }}
                        className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-500"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default BlogCards;
