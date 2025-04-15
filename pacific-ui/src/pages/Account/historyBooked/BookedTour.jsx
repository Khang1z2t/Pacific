import {message, Pagination, Skeleton, Tabs} from 'antd';
import {BookedTourCard} from '~/pages/Account/historyBooked/components/BookedTourCard';
import {useEffect, useState} from 'react';
import BookingServices from '~/services/BookingServices';
import TourServices from '~/services/TourServices';
import VoucherServices from '~/services/VoucherServices';

export const BookedTour = () => {
    const ITEM_PER_PAGE = 3;
    const token = localStorage.getItem('accessToken');
    const [currentPage, setCurrentPage] = useState({
        PENDING: 1,
        PAID: 1,
        CANCELLED: 1,
        REFUND_REQUESTED: 1,
        EXPIRED: 1,
        ON_GOING: 1,
        COMPLETED: 1,
        ON_HOLD: 1
    });
    const [tourInfo, setTourInfo] = useState([]);
    const [tours, setTours] = useState({});
    const [loading, setLoading] = useState(true);
    const [vouchers, setVouchers] = useState({});

    const fetchBookingsAndTours = async () => {
        try {
            setLoading(true);
            const bookingRes = await BookingServices.getBookingList(token);
            setTourInfo(bookingRes.data);

            const tourPromises = bookingRes.data.map(booking =>
                TourServices.getTourByTourDetailId(booking.tourDetailId)
                    .then(res => ({[booking.tourDetailId]: res.data}))
                    .catch(err => {
                        console.error(err);
                        return {[booking.tourDetailId]: null};
                    }),
            );

            const tourResults = await Promise.all(tourPromises);
            const toursData = tourResults.reduce((acc, curr) => ({...acc, ...curr}), {});
            setTours(toursData);
            const voucherPromises = bookingRes.data
                .filter((booking) => booking.voucherId) // Chỉ lấy những booking có voucherId
                .map((booking) =>
                    VoucherServices.getById(booking.voucherId)
                        .then((res) => ({[booking.voucherId]: res.data}))
                        .catch((err) => {
                            console.error('Error fetching voucher:', err);
                            return {[booking.voucherId]: null}; // Fallback khi lỗi
                        }),
                );

            const voucherResults = await Promise.all(voucherPromises);
            const vouchersData = voucherResults.reduce((acc, curr) => ({...acc, ...curr}), {});
            setVouchers(vouchersData);

            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
            message.error('Có lỗi xảy ra! Vui lòng báo cáo với quản trị viên.', 1);
        }
    };

    useEffect(() => {

        fetchBookingsAndTours().then(r => r);
    }, [token]);

    // CALL BACK REVIEW
    const handleUpdateBooking = (updatedBooking) => {
        setTourInfo((prev) =>
            prev.map((booking) =>
                booking.id === updatedBooking.id ? updatedBooking : booking,
            ),
        );
    };

    const filterToursByStatus = (statuses) => {
        if (Array.isArray(statuses)) {
            return tourInfo.filter((booking) => statuses.includes(booking.status));
        }
        return tourInfo.filter((booking) => booking.status === statuses);
    };

    const getPageItems = (statuses) => {
        const tabKey = Array.isArray(statuses) ? statuses.join('_') : statuses;
        const current = currentPage[tabKey] || 1; // Trang hiện tại của tab
        const startIndex = (current - 1) * ITEM_PER_PAGE;
        const endIndex = startIndex + ITEM_PER_PAGE;

        const filteredItems = filterToursByStatus(statuses);
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

    const renderTabContent = (statuses) => {
        // Tạo key duy nhất cho tab (dùng để lưu currentPage)
        const tabKey = Array.isArray(statuses) ? statuses.join('_') : statuses;

        // Lấy dữ liệu cho nhiều trạng thái
        const pageItems = getPageItems(statuses);
        const totalItems = filterToursByStatus(statuses).length;

        return (
            <div className="space-y-4">
                <div className="flex flex-col gap-4">
                    {loading ? (
                        Array.from({length: ITEM_PER_PAGE}).map((_, index) => (
                            <Skeleton
                                key={index}
                                active
                                avatar={{shape: 'square', size: 'large'}}
                                paragraph={{rows: 4}}
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
                                voucher={vouchers[item.voucherId] || null}
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
                        onChange={(page) => onPageChange(tabKey, page)}
                        pageSize={ITEM_PER_PAGE}
                        current={currentPage[tabKey]}
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
            key: 'PAID',
            label: 'Đã trả tiền',
            children: renderTabContent('PAID'),
        },
        {
            key: 'ON_GOING',
            label: 'Tour đang đi',
            children: renderTabContent('ON_GOING'),
        },
        {
            key: 'COMPLETED',
            label: 'Đã hoàn thành tour',
            children: renderTabContent('COMPLETED'),
        },
        {
            key: 'ON_HOLD',
            label: 'Chờ hoàn tiền',
            children: renderTabContent('ON_HOLD'),
        },
        {
            key: 'CANCELLED',
            label: 'Đã hủy',
            children: renderTabContent('CANCELLED'),
        },
        {
            key: 'EXPIRED',
            label: 'Hết hạn',
            children: renderTabContent('EXPIRED'),
        },
        {
            key: 'REFUND_REQUESTED',
            label: 'Yêu cầu hoàn tiền',
            children: renderTabContent('REFUND_REQUESTED'),
        }
    ];

    return (
        <div className="container mx-auto px-4">
            <div className="flex justify-center">
                <div className="w-full">
                    <Tabs defaultActiveKey="PENDING" items={tabItems}/>
                </div>
            </div>
        </div>
    );
};