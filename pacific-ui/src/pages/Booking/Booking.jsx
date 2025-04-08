import { useNavigate, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Steps } from 'antd'; // Thêm Steps từ Ant Design
import { Loading } from '~/component/ui/Loading';
import { BookingInfo1 } from '~/pages/Booking/components/BookingInfo1';
import TourDetailServices from '~/services/TourDetailServices';

export const Booking = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [tour, setTour] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        TourDetailServices.getTourDetailById(id)
            .then((res) => {
                setTour(res.data);
                setTimeout(() => {
                    setLoading(false);
                }, 1000);
            })
            .catch((err) => {
                console.error(err);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className={'container mx-auto px-6 my-12'}>
            <h1 className="text-3xl font-semibold text-orange-600 mb-6 text-center">Quy trình đặt tour</h1>

            {/* Steps ngang ở trên đầu */}
            <Steps
                status={'process'}
                progressDot
                size="default"
                current={1} // Bước hiện tại là 0 (Thông tin đặt tour)
                className="mb-8 w-full flex justify-center items-center gap-4"
                items={[
                    {
                        title: 'Chọn tour',
                        description: 'Chọn tour bạn muốn đặt',
                    },
                    {
                        title: 'Thông tin đặt tour',
                        description: 'Điền thông tin khách hàng và tour',
                    },
                    {
                        title: 'Hoàn tất thanh toán',
                        description: 'Xác nhận và thanh toán tour',
                    },
                ]}
            />

            {/* Nội dung chính */}
            <div className="w-full">
                <BookingInfo1 data={tour} />
            </div>
        </div>
    );
};