import { Card, Divider, Pagination } from 'antd';
import { BookedTourCard } from '~/pages/Account/historyBooked/components/BookedTourCard';

const tourInfos = [
    {
        id: 1,
        title: 'Tour Đà Nẵng',
        quantity: 10,
        bookingStatus: 'Đã thanh toán',
        paymentMethod: 'Chuyển khoản',
        createAt: '20/10/2021',
        totalAmount: '10.000.000 VND',
    },
    {
        id: 2,
        title: 'Tour Hà Nội',
        quantity: 5,
        bookingStatus: 'Đã thanh toán',
        paymentMethod: 'Chuyển khoản',
        createAt: '20/10/2021',
        totalAmount: '5.000.000 VND',
    },
    {
        id: 3,
        title: 'Tour Sài Gòn',
        quantity: 2,
        bookingStatus: 'Chưa thanh toán',
        paymentMethod: 'Chuyển khoản',
        createAt: '20/10/2021',
        totalAmount: '2.000.000 VND',
    },
];

export const BookedTour = ({ data }) => {
    return (
        <div className="container mx-auto px-4 ">
            <div className="flex justify-center">
                <div className="w-full space-y-4">
                    <div className="flex flex-col gap-4 overflow-y-scroll overflow-hidden max-h-[500px]">
                        {tourInfos.map((item) => (
                            <BookedTourCard key={item.id} {...item} />
                        ))}
                    </div>
                    <Pagination align="center" defaultCurrent={1} total={50} />
                </div>
            </div>
        </div>
    );
};
