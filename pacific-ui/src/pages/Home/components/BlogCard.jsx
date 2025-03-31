import React from 'react';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const BlogCards = ({ title, img, date, link }) => {
    const { t } = useTranslation();

    return (
        <div className="max-w-sm mx-auto max-h-full rounded-lg overflow-hidden shadow-lg relative">
            <img src={img} alt="Landscape" className="w-full h-48 object-cover" />
            <div className="absolute top-4 left-4 bg-red-600 text-white rounded-md px-2 py-1 text-center">{date}</div>
            <div className="bg-white p-5">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>

                <Link
                    to={link}
                    className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 inline-block text-center"
                >
                    {t("blog.blog6")}
                </Link>
            </div>
        </div>
    );
};

export default BlogCards;