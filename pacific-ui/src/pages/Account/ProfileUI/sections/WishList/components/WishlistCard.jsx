import { Link } from 'react-router-dom';
import config from '~/config';
import { message } from 'antd';
import { Heart } from 'lucide-react';
import WishlistServices from '~/services/WishlistServices';
import { useAuth } from '~/config/AuthContext';

export const WishlistCard = ({ data, wishlistId, onWishlistChange }) => {
    const { handleRemoveWishlist } = useAuth();

    return (
        <div className="relative border border-gray-200 hover:border-orange-600 hover:text-orange-400 rounded-lg hover:shadow-lg transition-all max-h-44 w-full">
            <Link to={`${config.routes.tourDetail}${data.id}`} className="grid grid-cols-5 items-center h-full">
                <div className="col-span-1 p-2">
                    <img
                        src={config.imageConfig.getImage(data.thumbnail) || config.webConfig.defaultTour}
                        alt="TourLogo"
                        className="rounded-lg lg:w-full w-42"
                    />
                </div>

                <div className="col-span-2 p-2 flex flex-col justify-between w-full">
                    <h2 className="text-lg font-bold truncate">{data.title}</h2>
                    <p className="text-gray-500 line-clamp-2">{data.description}</p>
                    <div className="flex gap-2 my-2 flex-wrap">
                        <span className="font-semibold">{data.duration} Ngày {data.duration - 1} đêm</span>
                    </div>
                    <div className="flex gap-2 my-2 flex-wrap">
                        <p className="text-lg font-bold text-gray-800">{config.webConfig.getCurrency(data.maxPrice)}</p>
                    </div>
                </div>
            </Link>

            <button
                onClick={() => handleRemoveWishlist(wishlistId, onWishlistChange)}
                className="absolute top-2 right-2 text-red-500 hover:fill-red-500 transition-all"
            >
                <Heart size={24} />
            </button>
        </div>
    );
};
