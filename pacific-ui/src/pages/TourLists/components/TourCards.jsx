import { Link } from "react-router-dom";

export const TourCards = ({id, src, title, location, date, description, rate, price, ...props }) => {
    return (
        <Link
            to={`/tour-chi-tiet/${id}`}
            className={
                "w-72 max-h-full rounded-lg shadow-lg hover:scale-105 overflow-hidden transition-transform hover:cursor-pointer hover:border-orange-500 hover:border-2"
            }
        >
            <img
                alt={title}
                src={src}
                className={"w-full h-48 object-cover rounded-t-lg"}
            />
            <div className={"p-4"}>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                    <span>{location}</span>
                    <span>{date}</span>
                </div>
                <h3 className={"text-lg font-semibold text-gray-800 mb-2"}>{title}</h3>
                <p className={"text-sm text-gray-600 line-clamp-2 mb-4"}>{description}</p>
                <div className="flex justify-between items-center border-t pt-3">
                    <div className="flex items-center gap-1">
                        <span className="text-orange-500 text-sm">&#9733;</span>
                        <span className="text-gray-700 text-sm">{rate}</span>
                        <span className="text-gray-500 text-sm">(250)</span>
                    </div>
                    <p className="text-lg font-bold text-gray-800">{price} VNĐ</p>
                </div>
            </div>
        </Link>
    );
};