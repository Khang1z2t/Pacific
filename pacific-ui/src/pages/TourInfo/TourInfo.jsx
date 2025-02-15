import {Card, Divider} from "antd";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import config from "~/config";
import {TourInfoCards} from "~/pages/TourInfo/components/TourInfoCards";

export const TourInfo = () => {
    const tourInfos = [
        {
            id:1,
            title: "Tour Đà Nẵng",
            quantity: 10,
            bookingStatus: "Đã thanh toán",
            paymentMethod: "Chuyển khoản",
            createAt: "20/10/2021",
            totalAmount: "10.000.000 VND"
        },
        {
            id:2,
            title: "Tour Hà Nội",
            quantity: 5,
            bookingStatus: "Đã thanh toán",
            paymentMethod: "Chuyển khoản",
            createAt: "20/10/2021",
            totalAmount: "5.000.000 VND"
        },
        {
            id:3,
            title: "Tour Sài Gòn",
            quantity: 2,
            bookingStatus: "Đã thanh toán",
            paymentMethod: "Chuyển khoản",
            createAt: "20/10/2021",
            totalAmount: "2.000.000 VND"
        }
    ]

    return (
        <div className={"container mx-auto justify-center px-4 py-14 bg-gray-100"}>
            <h2 className={"text-4xl text-center font-bold text-orange-400"}>Thông tin tour đã đặt</h2>
            <Divider className={"w-1/4 mx-auto my-4"}/>
            <div className={"flex justify-center mx-auto mt-16 uppercase"}>
                <div className={"booked-list w-1/2 justify-center flex"}>
                    <div className={"grid  w-full grid-cols-1 md:grid-cols-2 gap-4"}>
                        {tourInfos.map((item, index) => (
                        <TourInfoCards key={index} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}