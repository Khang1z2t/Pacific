// src/components/NewsCard.jsx
import React from 'react';

const NewsCard = ({ title, featuredImage, excerpt, imageHeight, titleSize, layout = 'vertical', hoverEffect = false }) => {
    return (
        <div
            className={`bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-300 ${
                hoverEffect ? 'hover:shadow-lg hover:-translate-y-1' : ''
            }`}
        >
            {layout === 'vertical' ? (
                // Layout dọc (dùng cho Top News)
                <div>
                    <img
                        src={featuredImage}
                        alt={title}
                        className={`w-full ${imageHeight} object-cover rounded-t-xl`}
                    />
                    <div className="p-4">
                        <h3
                            className={`${titleSize} font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors duration-200`}
                        >
                            {title}
                        </h3>
                    </div>
                </div>
            ) : (
                // Layout ngang (dùng cho Travel News và Travel Tips)
                <div className="flex gap-4">
                    <div className="w-1/3">
                        <img
                            src={featuredImage}
                            alt={title}
                            className={`w-full ${imageHeight} object-cover rounded-lg`}
                        />
                    </div>
                    <div className="w-2/3 py-2">
                        <h3
                            className={`${titleSize} font-semibold text-gray-800 line-clamp-2 hover:text-blue-600 transition-colors duration-200`}
                        >
                            {title}
                        </h3>
                        {excerpt && (
                            <p className="text-gray-600 mt-1 text-sm line-clamp-2">{excerpt}</p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsCard;