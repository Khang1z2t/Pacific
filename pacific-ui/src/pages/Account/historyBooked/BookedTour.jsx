import { message, Pagination, Skeleton } from 'antd';
import { BookedTourCard } from '~/pages/Account/historyBooked/components/BookedTourCard';
import { useEffect, useState } from 'react';
import BookingServices from '~/services/BookingServices';
import TourServices from '~/services/TourServices';


export const BookedTour = () => {
    const ITEM_PER_PAGE = 3;
    const token = localStorage.getItem('accessToken');
    const [currentPage, setCurrentPage] = useState(1);
    const [tourInfo, setTourInfo] = useState([]);
    const [tours, setTours] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookingsAndTours = async () => {
            try {
                setLoading(true);
                const bookingRes = await BookingServices.getBookingList(token);
                setTourInfo(bookingRes.data);

                // Fetch tour details for each booking
                const tourPromises = bookingRes.data.map(booking =>
                    TourServices.getTourByTourDetailId(booking.tourDetailId)
                        .then(res => ({ [booking.tourDetailId]: res.data }))
                        .catch(err => {
                            console.error(err);
                            return { [booking.tourDetailId]: null };
                        }),
                );

                const tourResults = await Promise.all(tourPromises);
                // Combine all tour results into one object
                const toursData = tourResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                setTours(toursData);
                setLoading(false);
                setCurrentPage(1);
            } catch (err) {
                console.error(err);
                setLoading(false);
                message.error('Có lỗi xảy ra! Vui lòng báo cáo với quản trị viên.', 1);
            }
        };

        fetchBookingsAndTours();
    }, [token]);

    const onChange = (page) => {
        setLoading(true);
        setCurrentPage(page);
        setTimeout(() => {
            setLoading(false);
        }, 400);
    };
    const pageItems = tourInfo.slice((currentPage - 1) * ITEM_PER_PAGE, currentPage * ITEM_PER_PAGE);

    return (
        <div className="container mx-auto px-4 ">
            <div className="flex justify-center">
                <div className="w-full space-y-4">
                    <div className="flex flex-col gap-4">
                        {loading ? (
                            // Skeleton loading state
                            Array.from({ length: ITEM_PER_PAGE }).map((_, index) => (
                                <Skeleton
                                    key={index}
                                    active
                                    avatar={{ shape: 'square', size: 'large' }}
                                    paragraph={{ rows: 4 }}
                                    title={false}
                                    className="p-4 bg-white rounded-lg shadow-lg border-2"
                                />
                            ))
                        ) : (
                            pageItems.map((item, index) => (
                                <BookedTourCard
                                    key={item.id || index}
                                    data={item}
                                    tour={tours[item.tourDetailId]}
                                />
                            ))
                        )}
                    </div>
                    <Pagination align="center"
                                onChange={(page) => onChange(page)}
                                pageSize={ITEM_PER_PAGE}
                                defaultCurrent={1} current={currentPage} total={tourInfo.length} />
                </div>
            </div>
        </div>
    );
};
