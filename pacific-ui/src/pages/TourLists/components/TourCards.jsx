import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import config from '~/config';
import AnimatedContent from '~/component/Animation/AnimatedUI/AnimatedContent';
import { Rate } from 'antd';

export const TourCards = ({ data }) => {



    return (
        <Link
            to={config.routes.tourDetail + `${data.id}`}
            className={
                'w-72 max-h-full rounded-lg shadow-lg hover:scale-105 overflow-hidden transition-transform hover:cursor-pointer hover:border-orange-500 hover:border-2'
            }
        >
            <img
                alt={data.title}
                src={config.imageConfig.getImage(data.thumbnail) || config.webConfig.defaultTour}
                className={'w-full max-h-48 object-cover rounded-t-lg'}
            />
            <div className={'p-4'}>
                <h3 className={'text-lg font-semibold overflow-ellipsis text-gray-800 mb-2'}>{data.title}</h3>
                <p className={'text-sm text-gray-600 line-clamp-2 mb-4'}>{data.description}</p>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span className={"font-semibold"}>{data.duration} Ngày {data.duration-1} đêm</span>
                </div>
                <div className="flex justify-between items-center border-t pt-3">
                    <div className="flex items-center gap-1">
                        <Rate allowHalf disabled defaultValue={data.ratingAvg} />
                    </div>

                    <p className="text-lg font-bold text-gray-800">{config.webConfig.getCurrency(data.maxPrice)}</p>
                </div>
            </div>
        </Link>
    );
};