import React, { useState } from 'react';
import TabPane from 'antd/es/tabs/TabPane';
import { Card, Divider, Menu, Slider, Tabs } from 'antd';
import clsx from 'clsx';
import { Bus } from 'lucide-react';
import { BusCard } from '~/pages/TourLists/TourDetail/sections/CalendarSection/Components/BusCard';
import { CardInfo } from '~/pages/TourLists/TourDetail/sections/CalendarSection/Components/CardInfo';
import PriceInfo from '~/pages/TourLists/TourDetail/sections/CalendarSection/Components/PriceInfo';

export const CalendarSection = ({ ...tour }) => {
    const [currentTab, setCurrentTab] = useState('9/2024');
    const tourData = {
        '9/2024': [
            {
                date: '27/09/2024',
                returnDate: '30/09/2024',
                adultPrice: '3,290,000 đ',
                childPrice: '1,645,000 đ',
                singleRoomSurcharge: '700,000 đ',
            },
            {
                date: '29/09/2024',
                returnDate: '02/10/2024',
                adultPrice: '3,290,000 đ',
                childPrice: '1,645,000 đ',
                singleRoomSurcharge: '700,000 đ',
            },
        ],
        '10/2024': [
            {
                date: '04/10/2024',
                returnDate: '07/10/2024',
                adultPrice: '3,290,000 đ',
                childPrice: '1,645,000 đ',
                singleRoomSurcharge: '700,000 đ',
            },
            {
                date: '06/10/2024',
                returnDate: '09/10/2024',
                adultPrice: '3,290,000 đ',
                childPrice: '1,645,000 đ',
                singleRoomSurcharge: '700,000 đ',
            },
        ],
        '11/2024': [
            {
                date: '01/11/2024',
                returnDate: '04/11/2024',
                adultPrice: '3,290,000 đ',
                childPrice: '1,645,000 đ',
                singleRoomSurcharge: '700,000 đ',
            },
            {
                date: '03/11/2024',
                returnDate: '06/11/2024',
                adultPrice: '3,290,000 đ',
                childPrice: '1,645,000 đ',
                singleRoomSurcharge: '700,000 đ',
            },
        ],
        '12/2024': [
            {
                date: '01/12/2024',
                returnDate: '04/12/2024',
                adultPrice: '3,290,000 đ',
                childPrice: '1,645,000 đ',
                singleRoomSurcharge: '700,000 đ',
            },
            {
                date: '03/12/2024',
                returnDate: '06/12/2024',
                adultPrice: '3,290,000 đ',
                childPrice: '1,645,000 đ',
                singleRoomSurcharge: '700,000 đ',
            },
        ],
    };

    const handleTabChange = (key) => {
        setCurrentTab(key);
    };

    const currentData = tourData[currentTab];

    return (
        <div className="flex h-screen">
            {/* Custom Tabs */}
            <div className="w-1/5 bg-gray-50">
                <div className="flex flex-col">
                    {Object.keys(tourData).map((month) => (
                        <button
                            key={month}
                            className={clsx(
                                'px-4 py-3 text-left text-lg font-medium transition-all rounded-lg',
                                month === currentTab
                                    ? 'bg-blue-700 text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-blue-100',
                            )}
                            onClick={() => handleTabChange(month)}
                        >
                            {month}
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Content */}
            <div className="w-4/5 px-4">
                <Card className="rounded-2xl shadow-lg">
                    <CardInfo title={"Phương tiện di chuyển"} children1={<BusCard {...currentData} />} />
                    <CardInfo title={"Giá vé"} children1={<PriceInfo child={(
                        <>
                            <div>
                                <p>Người lớn</p>
                                <p className="text-red-500 font-bold">{currentData.adultPrice}</p>
                                <p className="text-sm text-gray-500">(Từ 12 tuổi trở lên)</p>
                            </div>
                            <div>
                                <p>Trẻ em</p>
                                <p className="text-red-500 font-bold">{currentData.childPrice}</p>
                                <p className="text-sm text-gray-500">(Từ 5 - 11 tuổi)</p>
                            </div>
                            <div>
                                <p>Trẻ nhỏ</p>
                                <p className="text-red-500 font-bold">0 đ</p>
                                <p className="text-sm text-gray-500">(Từ 2 - 4 tuổi)</p>
                            </div>
                        </>
                    )} {...currentData}/>} children2={<PriceInfo child={(
                        <>
                            <div>
                                <p>Trẻ em</p>
                                <p className="text-red-500 font-bold">{currentData.childPrice}</p>
                                <p className="text-sm text-gray-500">(Từ 5 - 11 tuổi)</p>
                            </div>
                            <div>
                                <p>Trẻ nhỏ</p>
                                <p className="text-red-500 font-bold">0 đ</p>
                                <p className="text-sm text-gray-500">(Từ 2 - 4 tuổi)</p>
                            </div>
                        </>
                    )} {...currentData} />} />
                </Card>
            </div>
        </div>
    );
};