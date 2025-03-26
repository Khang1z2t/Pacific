import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Input } from 'antd';
import { Loading } from '~/component/ui/Loading';
import { BookingInfo1 } from '~/pages/Booking/components/BookingInfo1';
import TourDetailServices from '~/services/TourDetailServices';

const { TextArea } = Input;

export const Booking = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);
    const [tour, setTour] = useState([]);

    const navigate = useNavigate();
    useEffect(() => {
        TourDetailServices.getTourDetailById(id).then((res) => {
            setTour(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return <Loading />;
    }


    return (
        <div className={"container mx-auto px-6 my-12"}>
            <p className={"text-gray-500"}>{step < 2 && (
                <p className={"text-gray-500"}>Bước {step} / 2</p>
            )}</p>
            {step === 1 && <BookingInfo1 data={tour} setStep={setStep} />}
            {/*{step === 2 && <BookingInfo2 tourInfo={tour} setStep={setStep} />}*/}
            {/*{step === 2 && <Success/>}*/}
        </div>
    );
};