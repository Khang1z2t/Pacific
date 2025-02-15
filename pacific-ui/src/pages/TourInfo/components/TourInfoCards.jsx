import {Card} from "antd";

export const TourInfoCards = ({title, quantity, bookingStatus, paymentMethod, createAt, totalAmount}) => {
    return (
        <Card className={"w-full rounded-lg shadow-lg col-span-2 hover:cursor-pointer hover:shadow-xl hover:border-orange-600 border-2 transition-all duration-500"}>
            <div className={"flex justify-between gap-4"}>
                <div>
                    <p className={"text-lg font-bold"}>Tên tour:{title}</p>
                    <p className={"text-lg font-bold"}>Ngày tạo: {createAt}</p>
                    <p className={"text-lg font-bold"}>Số người: {quantity}</p>
                    <p className={"text-lg font-bold"}>Tổng tiền: {totalAmount}</p>
                </div>
                <div>
                    <p className={"text-lg"}>Hà Nội - Sapa - Hạ Long</p>
                    <p className={"text-lg"}>20/10/2021</p>
                    <p className={"text-lg"}>2</p>
                    <p className={"text-lg"}>5.000.000 VND</p>
                </div>
            </div>
        </Card>
    )
}