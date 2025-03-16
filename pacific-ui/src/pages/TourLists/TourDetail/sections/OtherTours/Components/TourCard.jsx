import React from "react";
import { Link } from "react-router-dom";
import { Rate, Tag } from 'antd';
import config from "~/config";

export const TourCard = ({data,onClick}) => {
    const handleClick = () => {
        window.scrollTo({ top:0, behavior: 'smooth' });
        onClick(data.id);
    }

    return (
        <Link
            to={config.routes.tourDetail + `${data.id}`}
            className="grid relative grid-cols-5 h-full items-center border shadow-md border-gray-300 bg-gray-50 p-2 rounded-lg hover:border-orange-600 hover:bg-orange-100 transition-all hover:cursor-pointer"
            style={{
                padding: "0",
            }}
            onClick={handleClick}
        >
            {/* Hình ảnh */}
            <div className="col-span-1 lg:mb-0 p-2">
                <img
                    src={config.imageConfig.getImage(data.thumbnail) || config.webConfig.defaultTour}
                    alt="tour-logo"
                    className="rounded-lg size-24"
                />
            </div>

            {/* Nội dung */}
            <div className="col-span-4 flex flex-col justify-between w-full">
                <h2 className="text-lg font-bold overflow-ellipsis overflow-hidden lg:whitespace-normal whitespace-nowrap hover:text-orange-400 transition-all">
                    {data.title}
                </h2>
                <p className="text-sm text-gray-500 line-clamp-2">{data.description}</p>
                <div className={"flex gap-2 flex-col w-fit"}>
                    <p className={"text-gray-500 font-semibold"}>{config.webConfig.getCurrency(data.maxPrice)}</p>
                    <span>
                        <Rate defaultValue={4} starSize={10} disabled/>
                    </span>
                </div>
            </div>
        </Link>
    );
};