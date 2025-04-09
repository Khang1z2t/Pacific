import React, { useEffect, useState } from 'react';
import { Card, Col, Collapse, message, Row, Typography } from 'antd';
import { motion } from 'framer-motion';
import {
    FaMapMarkedAlt,
    FaUtensils,
    FaUsers,
    FaClock,
    FaBus,
    FaTags,
} from 'react-icons/fa';
import ItineraryServices from '~/services/ItineraryServices';

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

export const ItinerarySection = ({ data }) => {
    const [itineraryDetails, setItineraryDetails] = useState([]);

    // Gọi API để lấy danh sách lịch trình
    useEffect(() => {
        const fetchItineraryDetails = async () => {
            try {
                const response = await ItineraryServices.getByTourId(data.id);
                console.log('Fetched itinerary details:', response.data);
                // Sắp xếp theo dayNumber tăng dần
                const sortedDetails = Array.isArray(response.data)
                    ? response.data.sort((a, b) => a.dayNumber - b.dayNumber)
                    : [];
                setItineraryDetails(sortedDetails);
            } catch (err) {
                console.error('Failed to fetch itinerary details:', err);
                message.error('Không thể tải lịch trình', 1);
                setItineraryDetails([]);
            }
        };

        if (data?.id) {
            fetchItineraryDetails();
        }
    }, [data?.id]); // Chạy lại khi data.id thay đổi

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

                {/* Phần lịch trình */}
                <div className="py-8 bg-gray-50">
                    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
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
                                LỊCH TRÌNH
                            </Title>
                        </motion.div>

                        <Collapse
                            accordion
                            expandIconPosition="end"
                            className="bg-white rounded-lg shadow-md"
                            expandIcon={({ isActive }) => (
                                <span className="text-blue-500 text-lg">
                                    {isActive ? '↑' : '↓'}
                                </span>
                            )}
                        >
                            {itineraryDetails.length > 0 ? (
                                itineraryDetails.map((item) => (
                                    <Panel
                                        header={
                                            <div className="flex items-center justify-between">
                                                <Title level={4} className="text-gray-800 mb-0">
                                                    Ngày {item.dayNumber}: {item.title}
                                                </Title>
                                            </div>
                                        }
                                        key={item.id} // Dùng id từ API làm key
                                        className="border-b border-gray-200"
                                    >
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            variants={fadeInUp}
                                        >
                                            <Paragraph className="text-gray-600">
                                                <div dangerouslySetInnerHTML={{ __html: item.notes }} />
                                            </Paragraph>
                                        </motion.div>
                                    </Panel>
                                ))
                            ) : (
                                <Panel
                                    header={
                                        <Title level={4} className="text-gray-800 mb-0">
                                            Không có lịch trình
                                        </Title>
                                    }
                                    key="no-data"
                                >
                                    <Paragraph className="text-gray-500 italic">
                                        Chưa có thông tin lịch trình cho tour này.
                                    </Paragraph>
                                </Panel>
                            )}
                        </Collapse>
                    </div>
                </div>
            </div>
        </div>
    );
};