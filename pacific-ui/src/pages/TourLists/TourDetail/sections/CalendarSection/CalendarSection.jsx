import React, { useState } from 'react';
import { Button, Card, Divider, Menu, Slider, Tabs, Timeline } from 'antd';
import clsx from 'clsx';
import { CardInfo } from '~/pages/TourLists/TourDetail/sections/CalendarSection/Components/CardInfo';
import PriceInfo from '~/pages/TourLists/TourDetail/sections/CalendarSection/Components/PriceInfo';
import { Timelines } from '~/pages/TourLists/TourDetail/sections/CalendarSection/Components/Timelines';
import { TourDescription } from '~/pages/TourLists/TourDetail/sections/CalendarSection/Components/TourDescription';
import { ReviewSection } from '~/pages/TourLists/TourDetail/sections/CalendarSection/Components/ReviewSection';
import { LocationDetails } from '~/pages/TourLists/TourDetail/sections/CalendarSection/Components/LocationDetails';

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
        <div className="flex h-full p-4">
            {/* Custom Tabs */}

            {/*<Divider*/}
            {/*    style={{*/}
            {/*        borderColor: '#656565',*/}
            {/*    }}*/}
            {/*    className="h-28"*/}
            {/*    type="vertical"*/}
            {/*/>*/}
            {/* Main Content */}
            <div className="w-4/5 px-4">
                <Card className="">
                    <div className={'flex gap-4 items-center'}>
                        <button className={"w-36 h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition-all text-xl uppercase font-semibold flex items-center justify-center"}>
                            27/9/2024
                        </button>
                        <button className={"w-36 h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition-all text-xl uppercase font-semibold  flex items-center justify-center"}>
                            22/9/2024
                        </button>
                        <button className={"w-36 h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition-all text-xl uppercase font-semibold  flex items-center justify-center"}>
                            22/9/2024
                        </button>
                        <button className={"w-36 h-12 bg-blue-500 text-white rounded-lg hover:bg-blue-800 transition-all text-xl uppercase font-semibold  flex items-center justify-center"}>
                            22/9/2024
                        </button>
                    </div>
                    <Divider/>
                    <TourDescription/>
                    <Divider/>
                    <div className={''}>
                        <Timelines/>
                    </div>
                    <ReviewSection/>
                    <LocationDetails/>
                </Card>
            </div>
            {/*SIDE CONTENT*/}
            <div className="w-1/5 bg-gray-50">
                <div className="flex flex-col rounded-2xl shadow-lg">
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
                <Card className={'rounded-2xl h-fit shadow-lg mt-4'}>
                    <CardInfo title={'Giá tour'}>
                        {currentData.map((data, index) => (
                            <PriceInfo key={index} {...data} />
                        ))}
                    </CardInfo>
                </Card>
            </div>
        </div>
    );
};