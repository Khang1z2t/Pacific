import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Divider } from 'antd';
import 'tailwindcss/tailwind.css';
import { CalendarSection } from '~/pages/TourLists/TourDetail/sections/CalendarSection/CalendarSection';
import { OtherToursList } from '~/pages/TourLists/TourDetail/sections/OtherTours/OtherToursList';
import { Loading } from '~/component/ui/Loading';
import TourServices from '~/services/TourServices';
import config from '~/config';

export const TourDetail = () => {
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const [tour, setTour] = useState({});

    useEffect(() => {
        TourServices.getById(id).then((res) => {
            setTour(res.data);
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
    if (!tour) return config.routes.home;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-5">
            <h1 className="text-3xl font-bold mb-4 container mx-auto">{tour.title}</h1>
            {/*<DetailSection {...tour}/>*/}
            <CalendarSection data={tour}/>
            <Divider className={"my-8"}><p className={"font-bold uppercase text-orange-400 text-3xl"} align={"center"}>Tour khác liên quan</p></Divider>
            <OtherToursList/>
        </div>
    );
};
