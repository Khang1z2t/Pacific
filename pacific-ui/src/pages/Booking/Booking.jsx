import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import config from '~/config';
import { Form, Input, DatePicker, Select, Radio, Button } from 'antd';
import { Loading } from '~/component/ui/Loading';
import { BookingInfo1 } from '~/pages/Booking/components/BookingInfo1';
import { BookingInfo2 } from '~/pages/Booking/components/BookingInfo2';
import { Success } from '~/pages/Booking/status/Success';

const { TextArea } = Input;

export const Booking = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [step, setStep] = useState(1);
    const [tour, setTour] = useState({});

    const navigate = useNavigate();
    useEffect(() => {
        // setTour(tours.find((tour) => tour.id === +id));
        config.getById(id).then((res) => {
            setTour(res.data);
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }).catch((err) => {
            console.error(err);
            setLoading(false);
        });
    }, [id]);
    useEffect(() => {
        if (step === 3) {
            setTimeout(() => {
                navigate('/');
            }, 5000);
        }
    }, [step, navigate]);
    if (loading) {
        return <Loading />;
    }


    return (
        <div className={"container mx-auto my-12"}>
            <p className={"text-gray-500"}>{step} /2 Bước</p>
            {step === 1 && <BookingInfo1 tourInfo={tour} setStep={setStep} />}
            {step === 2 && <BookingInfo2 tourInfo={tour} setStep={setStep} />}
            {step === 3 && <Success/>}
        </div>
    );
};