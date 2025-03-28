import { WishlistCard } from '~/pages/Account/ProfileUI/sections/WishList/components/WishlistCard';
import { useEffect, useMemo, useState } from 'react';
import TourServices from '~/services/TourServices';
import { Empty, Skeleton } from 'antd';
import { useAuth } from '~/config/AuthContext';

export const WishListIndex = () => {
    const { wishlist, setWishlist, getWishlist } = useAuth();
    const accessToken = localStorage.getItem('accessToken');

    const [tours, setTours] = useState([]);
    const [wishlistUpdate, setWishlistUpdate] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (accessToken) {
            setLoading(true);
            getWishlist(accessToken)
                .then(() => {
                    setLoading(false);
                }).catch((err) => {
                console.error(err);
                setLoading(false);
            });
        }
    }, [accessToken, wishlistUpdate]);

    useEffect(() => {
        TourServices.getAllTour()
            .then((res) => {
                setTours(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
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
                {loading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            active
                            avatar={{ shape: 'square', size: 'large' }}
                            paragraph={{ rows: 2 }}
                            title
                            className="p-4 bg-white rounded-lg shadow-md"
                        />
                    ))
                ) : wishlist.length > 0 ? (
                    wishlist.map((wish, index) => {
                        const tour = tourMap[wish.tourId];
                        return tour ? (
                            <WishlistCard
                                key={wish.id || index}
                                data={tour}
                                wishlistId={wish.id}
                                onWishlistChange={() => setWishlistUpdate((prev) => prev + 1)}
                            />
                        ) : null;
                    })
                ) : (
                    <div className="p-2 py-36 col-span-2 w-full max-h-screen justify-center flex">
                        <Empty description="Danh sách yêu thích trống" image="/img/a.gif" />
                    </div>
                )}
            </div>
        </div>
    );
};
