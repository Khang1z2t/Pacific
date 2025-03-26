import { Card, Divider } from 'antd';
import { FaHotel, FaInfoCircle, FaPlaneDeparture } from 'react-icons/fa';
import { BiSolidUserDetail } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import config from '~/config';
import HotelServices from '~/services/HotelServices';
import TransportServices from '~/services/TransportServices';
import { useNavigate } from 'react-router-dom';

export const TourInfoCard = ({ data, detailData, adults, children, totalPrice, voucher }) => {
    const [hotel, setHotel] = useState({});
    const [transport, setTransport] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (detailData?.hotelId) {
            HotelServices.getHotelById(detailData.hotelId).then((res) => {
                setHotel(res);
            }).catch((err) => {
                console.error(err);
            });
        }
        if (detailData?.transportId) {
            TransportServices.getTransportById(detailData.transportId).then((res) => {
                setTransport(res);
            }).catch((err) => {
                console.error(err);
            });
        }
    }, [detailData.hotelId, detailData.transportId]);
    return (
        <Card className="w-[500px] h-fit sticky top-24 transition-all p-4 shadow-lg border rounded-xl">
            {/* Tiêu đề */}
            <h2 className="text-lg font-bold uppercase">Tóm Tắt Chuyến Đi</h2>

            {/* Hình ảnh + Thông tin tour */}
            <div className="flex gap-3 mt-2">
                <img
                    src={config.imageConfig.getImage(data.thumbnail)}
                    alt="Tour Image"
                    className="rounded-md object-cover w-28 h-20"
                />
                <div className="flex-1">
                    <p
                        onClick={() => navigate(config.routes.tourDetail + data.id)}
                        className="text-sm font-semibold line-clamp-1 hover:text-indigo-500 transition-all uppercase hover:underline cursor-pointer">
                        {data.title}
                    </p>
                    <p className="text-xs text-gray-500">Mã tour: <span
                        className="font-bold">{data.id}</span>
                    </p>
                    <p className={'text-xs text-gray-500 line-clamp-3'}>
                        {data.description}
                    </p>
                </div>
            </div>

            {/* Thông tin khởi hành */}
            <div className="mt-3 text-sm">
                <p><strong>Khởi hành:</strong> <span
                    className="text-blue-500 font-semibold">{data.destination}</span></p>
                <p><strong>Thời gian:</strong> <span
                    className="text-blue-500 font-semibold">{data.duration}N{data.duration - 1}Đ</span></p>
            </div>

            <Divider />

            {/* Thông tin chuyến bay */}
            <div className="text-sm">
                <h3 className="text-lg font-bold flex items-center gap-2"><FaInfoCircle
                    className={'text-indigo-500'} /> Thông tin chuyến đi</h3>
                <p><strong>Ngày đi:</strong> {config.webConfig.convertDateNoTime(detailData.startDate)}</p>
                <p><strong>Ngày về:</strong> {config.webConfig.convertDateNoTime(detailData.endDate)}</p>
                <h3 className="text-lg font-bold flex items-center gap-2"><FaHotel
                    className={'text-orange-400'} /> Thông tin khách sạn</h3>
                <p><strong>Khách sạn:</strong> {hotel.name}</p>
                <p><strong>Giá:</strong> {config.webConfig.getCurrency(hotel.cost)}</p>
                <h3 className="text-lg font-bold flex items-center gap-2"><FaPlaneDeparture
                    className={'text-orange-400'} /> Thông tin phương tiện</h3>
                <p><strong>Phương tiện:</strong> {transport.name}</p>
                <p><strong>Giá:</strong> {config.webConfig.getCurrency(transport.cost)}</p>
            </div>

            <Divider />

            {/* Khách hàng & phụ thu */}
            <div className="text-sm">
                <h3 className="text-lg font-bold flex items-center gap-2"><BiSolidUserDetail
                    className={'text-orange-400'} /> Khách hàng + Phụ
                    thu</h3>
                <p><strong>Người lớn:</strong> {adults || 1} - {config.webConfig.getCurrency(detailData.priceAdults)}/Người
                </p>
                {children > 0 && (
                    <p><strong>Trẻ em:</strong> {children} - {config.webConfig.getCurrency(detailData.priceChildren)}/Người
                    </p>
                )}
                <p className="text-red-500 text-lg font-bold text-right">{config.webConfig.getCurrency(totalPrice)}</p>
            </div>
            <span className={'text-xs text-red-500 mt-2'}>
                * Giá trên đã bao gồm các phụ thu: giá dịch vụ, giá vé máy bay, giá khách sạn, giá ăn uống, giá vận chuyển, giá phí tham quan, giá phí hướng dẫn viên, giá phí bảo hiểm, giá phí visa, giá phí phục vụ, giá phí khác.
            </span>

            <Divider />

            {/* Tổng tiền */}
            <div className="text-right">
                <p className="text-lg font-bold">Tổng tiền cần thanh toán:</p>
                <p className="text-xl font-bold text-red-500">
                    {voucher.includes('Pacific') ?
                        <>
                            {config.webConfig.getCurrency(totalPrice - totalPrice * 0.9)}
                            <span className={'text-xs text-green-500'}> (-90%)</span>
                        </> : config.webConfig.getCurrency(totalPrice)}
                </p>
            </div>
        </Card>
    );
};