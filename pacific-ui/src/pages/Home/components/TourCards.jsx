import { Card, Rate } from 'antd';
import { useEffect, useState } from 'react';
import config from '~/config';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { message } from 'antd';
import WishlistServices from '~/services/WishlistServices';
import { useAuth } from '~/config/AuthContext';

export const TourCards = ({ data }) => {
    const { handleAddToWishlist } = useAuth();

    return (
        <div
            className={
                'w-72 h-[446px] rounded-lg shadow-lg hover:scale-105 overflow-hidden transition-transform hover:cursor-pointer hover:border-orange-500 hover:border-2'
            }
        >
            <Link to={config.routes.tourDetail + `${data.id}`}>
                <img
                    alt={data.title}
                    src={`${config.imageConfig.getImage(data.thumbnail)}`}
                    className={'w-full h-48 object-cover rounded-t-lg'}
                />
                <div className={'p-4'}>
                    <h3 className={'text-lg font-semibold overflow-ellipsis text-gray-800 mb-2 line-clamp-2'}>{data.title}</h3>
                    <p className={'text-sm text-gray-600 line-clamp-2 mb-4'}>{data.description}</p>
                    <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span className={'font-semibold'}>{data.duration} Ngày {data.duration - 1} đêm</span>
                    </div>
                </div>
                <div className="flex flex-col justify-start border-t p-3">
                    <Rate disabled defaultValue={4} />
                    <div className={'flex flex-wrap gap-2 items-center'}>
                        <p className="text-lg font-bold text-gray-800">{config.webConfig.getCurrency(data.maxPrice)}</p>
                    </div>
                </div>
            </Link>
            <div className={'flex justify-end items-end -mt-14 p-4'}>
                <Heart
                    onClick={() => handleAddToWishlist(data.id)}
                    className={'text-red-500 transition-all hover:cursor-pointer hover:fill-red-500'}
                    size={24}
                />
            </div>
        </div>
    );
};
  