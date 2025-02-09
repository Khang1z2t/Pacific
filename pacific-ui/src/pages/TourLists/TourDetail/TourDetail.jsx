import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Rate, Tag, Divider, Button, Row, Col } from 'antd';
import { EnvironmentOutlined, CalendarOutlined, DollarOutlined } from '@ant-design/icons';
import { tours } from '../data/tours';
import "tailwindcss/tailwind.css";

export const TourDetail = () => {
    const { id } = useParams();
    const [tour, setTour] = useState({});

    useEffect(() => {
        setTour(tours.find((tour) => tour.id === +id));
    }, [id]);

    if (!tour) return <p className="text-center mt-10 text-gray-500">Tour not found!</p>;

    return (
        <div className="min-h-screen bg-gray-50 py-10 px-5">
            <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">Chi Tiết Tour Du Lịch</h1>
            <div className="max-w-6xl mx-auto bg-white shadow-lg rounded-2xl overflow-hidden">
                <Row gutter={32}>
                    <Col xs={24} md={12}>
                        <img alt={tour.title} src={tour.src} className="w-full h-96 object-cover rounded-l-xl" />
                    </Col>
                    <Col xs={24} md={12} className="p-8">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">{tour.title}</h2>
                        <div className="flex items-center space-x-4 mb-4">
                            <Tag color="blue" icon={<EnvironmentOutlined />}>{tour.location}</Tag>
                            <Tag color="green" icon={<CalendarOutlined />}>{tour.date}</Tag>
                        </div>
                        <Divider />
                        <p className="text-gray-700 text-lg mb-4 leading-relaxed">{tour.description}</p>
                        <div className="flex items-center justify-between mb-6">
                            <Rate value={tour.rate} disabled className="text-yellow-500" />
                            <p className="text-2xl text-green-600 font-semibold flex items-center">
                                <DollarOutlined className="mr-1" /> {tour.price}
                            </p>
                        </div>
                        <Button type="primary" size="large" className="w-full bg-blue-600 hover:bg-blue-700 rounded-xl">
                            Đặt Tour Ngay
                        </Button>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
