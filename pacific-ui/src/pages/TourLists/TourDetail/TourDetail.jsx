import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Rate, Tag, Divider, Button, Row, Col } from 'antd';
// import { tours } from '../data/tours';
import DetailSection from '~/pages/TourLists/TourDetail/sections/DetailSection';
import "tailwindcss/tailwind.css";
import { CalendarSection } from '~/pages/TourLists/TourDetail/sections/CalendarSection/CalendarSection';
import { OtherToursList } from '~/pages/TourLists/TourDetail/sections/OtherTours/OtherToursList';
import config from '~/config';
import { Loading } from '~/component/ui/Loading';
import TourServices from '~/services/TourServices';
import TourDetailServices from '~/services/TourDetailServices';

export const TourDetail = () => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [tour, setTour] = useState({});
    const [tourDetail, setTourDetail] = useState([]);

    useEffect(() => {
        TourDetailServices.getTourDetailByTourId(id).then((res) => {
            setTourDetail(res.data[0]);
            setTour(res.data[0].tour);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        })
    }, [id]);

    if (loading) {
        return <Loading/>
    }
    if (!tourDetail) return <p className="text-center mt-10 text-gray-500">Tour not found!</p>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-5">
            <h1 className="text-3xl font-bold mb-4 container mx-auto">{tour.title}</h1>
            <DetailSection {...tourDetail}/>
            <Divider className={"my-8"}><p className={"font-bold uppercase text-orange-400 text-3xl"} align={"center"}>Lịch trình khởi hành</p></Divider>
            <CalendarSection {...tourDetail}/>
            <Divider className={"my-8"}><p className={"font-bold uppercase text-orange-400 text-3xl"} align={"center"}>Tour khác liên quan</p></Divider>
            <OtherToursList/>
        </div>
    );
};
