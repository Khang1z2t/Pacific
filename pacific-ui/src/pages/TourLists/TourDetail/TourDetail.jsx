import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Rate, Tag, Divider, Button, Row, Col } from 'antd';
import { tours } from '../data/tours';
import DetailSection from '~/pages/TourLists/TourDetail/sections/DetailSection';
import "tailwindcss/tailwind.css";
import { CalendarSection } from '~/pages/TourLists/TourDetail/sections/CalendarSection/CalendarSection';

export const TourDetail = () => {
    const { id } = useParams();
    const [tour, setTour] = useState({});

    useEffect(() => {
        setTour(tours.find((tour) => tour.id === +id));
    }, [id]);

    if (!tour) return <p className="text-center mt-10 text-gray-500">Tour not found!</p>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-5">
            <h1 className="text-3xl font-bold mb-4 container mx-auto">{tour.title}</h1>
            <DetailSection {...tour}/>
            <Divider className={"my-8"}><p className={"font-bold uppercase text-orange-400 text-3xl"} align={"center"}>Lịch trình khởi hành</p></Divider>
            <CalendarSection {...tour}/>
        </div>
    );
};
