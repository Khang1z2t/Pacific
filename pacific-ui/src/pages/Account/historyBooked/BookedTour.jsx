import { Card, Divider } from "antd";
import { BookedTourCard } from "~/pages/Account/historyBooked/components/BookedTourCard";

const tourInfos = [
    {
        id: 1,
        title: "Tour Đà Nẵng",
        quantity: 10,
        bookingStatus: "Đã thanh toán",
        paymentMethod: "Chuyển khoản",
        createAt: "20/10/2021",
        totalAmount: "10.000.000 VND"
    },
    {
        id: 2,
        title: "Tour Hà Nội",
        quantity: 5,
        bookingStatus: "Đã thanh toán",
        paymentMethod: "Chuyển khoản",
        createAt: "20/10/2021",
        totalAmount: "5.000.000 VND"
    },
    {
        id: 3,
        title: "Tour Sài Gòn",
        quantity: 2,
        bookingStatus: "Chưa thanh toán",
        paymentMethod: "Chuyển khoản",
        createAt: "20/10/2021",
        totalAmount: "2.000.000 VND"
    }
];

export const BookedTour = () => {
    return (
        <div className="container mx-auto px-4 py-14 bg-gray-100">
            <h2 className="text-4xl text-center font-bold text-orange-400">Thông tin tour đã đặt</h2>
            <Divider className="w-1/4 mx-auto my-4" />
            <div className="flex justify-center mt-16">
                <div className="w-full md:w-3/4">
                    <div className="flex flex-col gap-4">
                        {tourInfos.map((item) => (
                            <BookedTourCard key={item.id} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
