import { Slider } from 'antd';
import { Bus } from 'lucide-react';
import React from 'react';

export const BusCard = ({date, returnDate, adultPrice, childPrice, singleRoomSurcharge}) => {
    return (
        <div className={'flex flex-col'}>
            <p className={'text-md font-bold'}>Ngày đi: {date}</p>
            <div className="relative w-[26rem] mt-2">
                {/* Thông tin trên slider */}
                <div className="flex justify-between mb-2 text-gray-600">
                    <span>05:30</span>
                    <span>00:00</span>
                </div>

                {/* Thanh slider */}
                <Slider
                    range
                    value={[0, 100]}
                    disabled
                />

                {/* Biểu tượng xe bus */}
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                >
                    <Bus className="text-black w-6 h-6" />
                </div>

                {/* Thông tin bên dưới */}
                <div className="flex justify-between text-sm">
                    <span>TP. Hồ Chí Minh</span>
                    <span>Châu Đốc</span>
                </div>
            </div>
        </div>
    );
};