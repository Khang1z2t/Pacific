import { WishlistCard } from '~/pages/Account/ProfileUI/sections/WishList/components/WishlistCard';
import { useEffect, useState, useMemo } from 'react';
import WishlistServices from '~/services/WishlistServices';
import TourServices from '~/services/TourServices';
import { Empty } from 'antd';

export const WishListIndex = () => {
    const [wishlist, setWishlist] = useState([]);
    const [tours, setTours] = useState([]);
    const [wishlistUpdate, setWishlistUpdate] = useState(0); // Biến để theo dõi khi nào cần cập nhật

    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        if (!accessToken) return;

        WishlistServices.getWishlist(accessToken)
            .then((res) => {
                setWishlist(res.data);
                console.log(res.data);
            })
            .catch((err) => console.error(err));
    }, [accessToken, wishlistUpdate]); // Cập nhật khi có thay đổi từ `wishlistUpdate`

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
        <div className="justify-center flex w-full h-[350px]">
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
