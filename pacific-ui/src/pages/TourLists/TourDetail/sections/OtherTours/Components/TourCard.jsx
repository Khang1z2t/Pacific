import React from 'react';
import { Link } from 'react-router-dom';
import { Rate } from 'antd';
import config from '~/config';
import { useAuth } from '~/config/AuthContext';
import { Heart } from 'lucide-react';

export const TourCard = ({ data, onClick}) => {
    const { handleAddToWishlist, wishlist } = useAuth();
    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onClick(data.id);
    };

    const isInWishlist = wishlist.some((item) => item.tourId === data.id);

    return (
        <div className={"relative"}>
            <Link to={config.routes.tourDetail + `${data.id}`}
                  className="grid  grid-cols-5 h-full items-center border shadow-md border-gray-300 bg-gray-50 p-2 rounded-lg hover:border-orange-600 hover:bg-orange-100 transition-all hover:cursor-pointer"
                  style={{
                      padding: '0',
                  }}
                  onClick={handleClick}>
                {/* Hình ảnh */}
                <div className="col-span-1 lg:mb-0 p-2">
                    <img
                        src={config.imageConfig.getImage(data.thumbnail) || config.webConfig.defaultTour}
                        alt="tour-logo"
                        className="rounded-lg size-24"
                    />
                </div>

                {/* Nội dung */}
                <div className="col-span-4 flex flex-col justify-between w-full">
                    <h2 className="text-lg font-bold line-clamp-1 overflow-ellipsis overflow-hidden lg:whitespace-normal whitespace-nowrap hover:text-orange-400 transition-all">
                        {data.title}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2">{data.description}</p>
                    <div className={'flex gap-2 flex-col w-fit'}>
                        <p className={'text-red-500 font-semibold'}>{config.webConfig.getCurrency(data.maxPrice)}</p>
                        <span>
                        <Rate allowHalf defaultValue={data.ratingAvg} starSize={10} disabled />
                    </span>
                    </div>
                </div>
            </Link>
            <Heart
                onClick={(e) => {
                    e.preventDefault(); // Ngăn hành vi mặc định của Link
                    handleAddToWishlist(data.id); // Gọi hàm thêm/xóa khỏi wishlist
                }}
                className={`absolute bottom-2 right-2 transition-all hover:cursor-pointer ${
                    isInWishlist ? 'text-red-500 fill-red-500' : 'text-red-500 hover:fill-red-500'
                }`}
                size={24} // Kích thước của icon (tùy chỉnh nếu cần)
            />
        </div>
    );
};