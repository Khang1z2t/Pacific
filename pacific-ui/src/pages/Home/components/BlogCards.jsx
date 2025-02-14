import React from 'react';

const BlogCards = ({title,img,date}) => {
    return (
        <div className="max-w-sm mx-auto max-h-full rounded-lg overflow-hidden shadow-lg relative">
            <img
                src={img}
                alt="Landscape"
                className="w-full h-48 object-cover"
            />
            <div className="absolute top-4 left-4 bg-red-600 text-white rounded-md px-2 py-1 text-center">
                {date}
            </div>
            <div className="bg-white p-5">
                <h3 className="text-lg font-semibold mb-2">{title}</h3>
                <button className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600">
                    Đọc thêm
                </button>
            </div>
        </div>
    );
};

export default BlogCards;
