import React from 'react';
import { Card, Col, Row, Typography } from 'antd';
import { motion } from 'framer-motion'; // Thêm animation
import {
    FaMapMarkedAlt,
    FaUtensils,
    FaUsers,
    FaClock,
    FaBus,
    FaTags,
} from 'react-icons/fa';
import { ItineraryDetails } from '~/pages/TourLists/TourDetail/sections/ItinerarySection/Components/ItineraryDetails'; // Icon cho từng mục

const { Title, Paragraph } = Typography;

export const ItinerarySection = () => {
    const itineraryData = [
        {
            icon: <FaMapMarkedAlt className="text-blue-400 text-2xl" />,
            title: 'Điểm tham quan',
            description: 'Phú Quốc, Hòn Thơm, Cầu Hôn, Bãi Sao',
        },
        {
            icon: <FaUtensils className="text-blue-400 text-2xl" />,
            title: 'Ẩm thực',
            description: 'Theo thực đơn',
        },
        {
            icon: <FaUsers className="text-blue-400 text-2xl" />,
            title: 'Đội tư vấn thích hợp',
            description: 'Người lớn tuổi, Cặp đôi, Gia đình nhiều thế hệ, Thanh niên',
        },
        {
            icon: <FaClock className="text-blue-400 text-2xl" />,
            title: 'Thời gian lý tưởng',
            description: 'Quanh năm',
        },
        {
            icon: <FaBus className="text-blue-400 text-2xl" />,
            title: 'Phương tiện',
            description: 'Máy bay, Xe du lịch',
        },
        {
            icon: <FaTags className="text-blue-400 text-2xl" />,
            title: 'Khuyến mãi',
            description: 'Đã bao gồm ưu đãi trong giá tour',
        },
    ];

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="py-8">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Tiêu đề */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={fadeInUp}
                    className="text-center mb-8"
                >
                    <Title
                        level={2}
                        className="text-3xl md:text-4xl font-bold text-gray-800"
                    >
                        THÔNG TIN THÊM VỀ CHUYẾN ĐI
                    </Title>
                </motion.div>

                {/* Danh sách thông tin */}
                <Row gutter={[24, 24]} className="mt-6">
                    {itineraryData.map((item, index) => (
                        <Col xs={24} sm={12} md={8} key={index}>
                            <motion.div
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true }}
                                variants={fadeInUp}
                            >
                                <Card
                                    className="border-none duration-300"
                                    bodyStyle={{ padding: '16px' }}
                                >
                                    <div className="flex items-start space-x-4">
                                        <div>{item.icon}</div>
                                        <div>
                                            <Paragraph className="text-lg font-bold text-gray-800">
                                                {item.title}
                                            </Paragraph>
                                            <Paragraph className="text-black-600 text-md font-semibold">
                                                {item.description}
                                            </Paragraph>
                                        </div>
                                    </div>
                                </Card>
                            </motion.div>
                        </Col>
                    ))}
                </Row>

                <ItineraryDetails/>
            </div>
        </div>
    );
};