import { Link } from 'react-router-dom';
import config from '~/config';
import { Heart } from 'lucide-react';
import { useAuth } from '~/config/AuthContext';

export const WishlistCard = ({ data, wishlistId, onWishlistChange }) => {
    const { handleRemoveWishlist } = useAuth();

    return (
        <div className="relative border border-gray-200 hover:border-orange-600 hover:text-orange-400 rounded-lg hover:shadow-lg transition-all duration-300 max-h-44 w-full">
            <Link to={`${config.routes.tourDetail}${data.id}`} className="grid grid-cols-5 items-center h-full">
                <div className="col-span-1 p-2">
                    <img
                        src={config.imageConfig.getImage(data.thumbnail) || config.webConfig.defaultTour}
                        alt="TourLogo"
                        className="rounded-lg lg:w-full w-42 object-cover"
                    />
                </div>

                <div className="col-span-3 p-2 flex flex-col justify-between w-full">
                    <h2 className="text-lg font-bold line-clamp-1 text-orange-400 hover:text-orange-600 hover:underline">{data.title}</h2>
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
                className="absolute top-2 right-2 group p-1 rounded-full hover:bg-red-50 transition-all duration-200"
            >
                <Heart
                    size={24}
                    className="
                        fill-red-500
                        text-red-500
                        group-hover:scale-110
                        group-active:scale-90
                        transform
                        transition-transform
                        duration-200
                        ease-in-out
                    "
                />
                {/* Ripple effect */}
                <span className="
                    absolute
                    inset-0
                    rounded-full
                    bg-red-200
                    opacity-0
                    group-active:opacity-50
                    group-active:animate-[ripple_0.4s_ease-out]
                " />
            </button>
        </div>
    );
};