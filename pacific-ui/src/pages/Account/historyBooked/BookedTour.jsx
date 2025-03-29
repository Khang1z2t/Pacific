import { message, Pagination, Skeleton, Tabs } from 'antd';
import { BookedTourCard } from '~/pages/Account/historyBooked/components/BookedTourCard';
import { useEffect, useState } from 'react';
import BookingServices from '~/services/BookingServices';
import TourServices from '~/services/TourServices';

export const BookedTour = () => {
    const ITEM_PER_PAGE = 3;
    const token = localStorage.getItem('accessToken');
    const [currentPage, setCurrentPage] = useState({
        PENDING: 1,
        CONFIRMED: 1,
        FAILED: 1,
        COMPLETED: 1,
    });
    const [tourInfo, setTourInfo] = useState([]);
    const [tours, setTours] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookingsAndTours = async () => {
            try {
                setLoading(true);
                const bookingRes = await BookingServices.getBookingList(token);
                setTourInfo(bookingRes.data);

                const tourPromises = bookingRes.data.map(booking =>
                    TourServices.getTourByTourDetailId(booking.tourDetailId)
                        .then(res => ({ [booking.tourDetailId]: res.data }))
                        .catch(err => {
                            console.error(err);
                            return { [booking.tourDetailId]: null };
                        }),
                );

                const tourResults = await Promise.all(tourPromises);
                const toursData = tourResults.reduce((acc, curr) => ({ ...acc, ...curr }), {});
                setTours(toursData);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
                message.error('Có lỗi xảy ra! Vui lòng báo cáo với quản trị viên.', 1);
            }
        };

        fetchBookingsAndTours();
    }, [token]);

    // CALL BACK REVIEW
    const handleUpdateBooking = (updatedBooking) => {
        setTourInfo((prev) =>
            prev.map((booking) =>
                booking.id === updatedBooking.id ? updatedBooking : booking,
            ),
        );
    };

    const filterToursByStatus = (status) => {
        return tourInfo.filter(item => item.status === status);
    };

    const getPageItems = (status) => {
        const filteredItems = filterToursByStatus(status);
        const startIndex = (currentPage[status] - 1) * ITEM_PER_PAGE;
        const endIndex = startIndex + ITEM_PER_PAGE;
        return filteredItems.slice(startIndex, endIndex);
    };

    const onPageChange = (status, page) => {
        setLoading(true);
        setCurrentPage(prev => ({
            ...prev,
            [status]: page,
        }));
        setTimeout(() => {
            setLoading(false);
        }, 400);
    };

    const renderTabContent = (status) => {
        const pageItems = getPageItems(status);
        const totalItems = filterToursByStatus(status).length;

        return (
            <div className="space-y-4">
                <div className="flex flex-col gap-4">
                    {loading ? (
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
                    ) : pageItems.length > 0 ? (
                        pageItems.map((item, index) => (
                            <BookedTourCard
                                key={item.id || index}
                                data={item}
                                tour={tours[item.tourDetailId]}
                                onUpdateBooking={handleUpdateBooking}
                            />
                        ))
                    ) : (
                        <div className="text-center py-4">Không có dữ liệu</div>
                    )}
                </div>
                {totalItems > 0 && (
                    <Pagination
                        align="center"
                        onChange={(page) => onPageChange(status, page)}
                        pageSize={ITEM_PER_PAGE}
                        current={currentPage[status]}
                        total={totalItems}
                    />
                )}
            </div>
        );
    };

    const tabItems = [
        {
            key: 'PENDING',
            label: 'Đang chờ',
            children: renderTabContent('PENDING'),
        },
        {
            key: 'CONFIRMED',
            label: 'Đã xác nhận',
            children: renderTabContent('CONFIRMED'),
        },
        {
            key: 'FAILED',
            label: 'Thất bại',
            children: renderTabContent('FAILED'),
        },
        {
            key: 'ONGOING',
            label: 'Tour đang đi',
            children: renderTabContent('ONGOING'),
        },
        {
            key: 'COMPLETED',
            label: 'Đã hoàn thành tour',
            children: renderTabContent('COMPLETED'),
        },
    ];

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-center">
                <div className="w-full">
                    <Tabs defaultActiveKey="PENDING" items={tabItems} />
                </div>
            </div>
        </div>
    );
};