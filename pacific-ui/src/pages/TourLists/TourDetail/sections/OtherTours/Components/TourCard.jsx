import React from "react";
import { Link } from "react-router-dom";
import { Tag } from "antd";

export const TourCard = ({title,href,image,tag1,tag2}) => {
    return (
        <Link
            to={href}
            className="grid relative grid-cols-5 h-full items-center border border-orange-300 bg-orange-50 p-2 rounded-lg hover:border-orange-600 hover:bg-orange-100 transition-all hover:cursor-pointer"
            style={{
                padding: "0",
            }}
        >
            {/* Hình ảnh */}
            <div className="col-span-1 lg:mb-0 p-2">
                <img
                    src={image || "https://via.placeholder.com/150"}
                    alt="company-logo"
                    className="rounded-lg lg:w-full w-42"
                />
            </div>

            {/* Nội dung */}
            <div className="col-span-4 flex flex-col justify-between w-full">
                <h2 className="text-lg font-bold overflow-ellipsis overflow-hidden lg:whitespace-normal whitespace-nowrap hover:text-orange-400 transition-all">
                    {title}
                </h2>
                <div className={"flex gap-2 flex-col w-fit p-3"}>
                    <Tag color="blue">{tag1}</Tag>
                    <Tag color="green">{tag2}</Tag>
                </div>
            </div>
        </Link>
    );
};