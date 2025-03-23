import { WishlistCard } from '~/pages/Account/ProfileUI/sections/WishList/components/WishlistCard';
import { useEffect, useState, useMemo } from 'react';
import WishlistServices from '~/services/WishlistServices';
import TourServices from '~/services/TourServices';
import { Empty } from 'antd';
import { useAuth } from '~/config/AuthContext';

export const WishListIndex = () => {
    const {wishlist, setWishlist, getWishlist} = useAuth();
    const accessToken = localStorage.getItem('accessToken');

    const [tours, setTours] = useState([]);
    const [wishlistUpdate, setWishlistUpdate] = useState(0);

    useEffect(() => {
        if(accessToken){
            getWishlist(accessToken);
        }
    }, [accessToken, wishlistUpdate]);

    useEffect(() => {
        TourServices.getAllTour()
            .then((res) => {
                setTours(res.data);
                console.log(res.data);
            })
            .catch((err) => console.error(err));
    }, []);

    const tourMap = useMemo(() => {
        return tours.reduce((acc, tour) => {
            acc[tour.id] = tour;
            return acc;
        }, {});
    }, [tours]);

    return (
        <div className="justify-center flex w-full min-h-[350px]">
            <div className="grid grid-cols-2 gap-4">
                {wishlist.length > 0 &&
                    wishlist.map((wish, index) => {
                        const tour = tourMap[wish.tourId];
                        return tour ? (
                            <WishlistCard
                                key={index}
                                data={tour}
                                wishlistId={wish.id}
                                onWishlistChange={() => setWishlistUpdate((prev) => prev + 1)}
                            />
                        ) : null;
                    })}
                {wishlist.length === 0 && (
                    <div className={"p-2 py-36 col-span-4 w-full max-h-screen justify-center flex"}>
                        <Empty description={"Danh sách yêu thích trống"} image={"/img/a.gif"} />
                    </div>
                )}
            </div>
        </div>
    );
};
