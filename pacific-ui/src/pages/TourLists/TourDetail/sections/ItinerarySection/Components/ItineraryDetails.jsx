import React from 'react';
import { Collapse, Typography } from 'antd';
import { motion } from 'framer-motion';
import { FaUtensils } from 'react-icons/fa'; // Icon cho bữa ăn

const { Title, Paragraph } = Typography;
const { Panel } = Collapse;

export const ItineraryDetails = () => {
    const itineraryDetails = [
        {
            day: 'Ngày 1: TP. Hồ Chí Minh - Phú Quốc',
            meals: '02 bữa ăn (trưa, chiều)',
            details: [
                'Quý khách tập trung tại Sân bay Tân Sơn Nhất, ga đi Trong Nước, hướng dẫn viên hỗ trợ làm thủ tục đáp chuyến bay đi Phú Quốc. Xe đón đoàn tại sân bay đưa Quý Khách Khởi hành tham quan:',
                {
                    title: 'Dinh Cậu',
                    description:
                        'Biểu tượng văn hóa và tín ngưỡng của đảo Phú Quốc. Nơi ngư dân địa phương gửi gắm niềm tin cho một chuyến ra khơi đánh bắt đầy ắp cá khi trở về.',
                },
                {
                    title: 'Chùa Sư Muôn (Hùng Long Tự)',
                    description:
                        'Ngôi chùa có kiến trúc dân gian, nằm trên triền núi, mát mẻ, hướng ra biển, xung quanh cây cối xanh tốt. Đến đây du khách cảm nhận vẻ đẹp thanh tịnh, bình yên và cả nguy hiểm su su ẩn lạnh và hạnh phúc đến với gia đình.',
                },
                {
                    title: 'Tắm biển Bãi Sao',
                    description:
                        'Nằm ở phía Nam Đảo – một bãi biển dịu êm, bãi cát dài tinh lành và nguyên sơ nổi đảo xanh. Tại đây Quý khách sẽ thả sức cảm thấy yên bình, thư thái và đùa giỡn nhực cước sóng chân lành khi hoa mình cùng thiên nhiên.',
                },
            ],
            note: 'Buổi tối, Quý khách tự do dạo chợ Đêm Phú Quốc thưởng thức hải sản (chi phí tự túc).',
            additional: 'Nghỉ đêm tại Phú Quốc',
        },
        {
            day: 'Ngày 2: Phú Quốc - Hòn Thơm - Trải nghiệm cáp treo vượt biển - Công viên nước Aquatopia - Thị trấn Hoàng Hôn',
            meals: '03 bữa ăn (sáng, trưa, chiều)',
            details: [],
            note: '',
            additional: '',
        },
        {
            day: 'Ngày 3: Phú Quốc - TP. Hồ Chí Minh',
            meals: '',
            details: [],
            note: '',
            additional: '',
        },
    ];

    // Animation variants
    const fadeInUp = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    };

    return (
        <div className="py-8 bg-gray-50">
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
                        LỊCH TRÌNH
                    </Title>
                </motion.div>

                {/* Collapse cho từng ngày */}
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
                    {itineraryDetails.map((item, index) => (
                        <Panel
                            header={
                                <div className="flex items-center justify-between">
                                    <Title level={4} className="text-gray-800 mb-0">
                                        {item.day}
                                    </Title>
                                    {item.meals && (
                                        <div className="flex items-center text-gray-600">
                                            <FaUtensils className="mr-2" />
                                            <span>{item.meals}</span>
                                        </div>
                                    )}
                                </div>
                            }
                            key={index}
                            className="border-b border-gray-200"
                        >
                            <motion.div
                                initial="hidden"
                                animate="visible"
                                variants={fadeInUp}
                            >
                                {item.details.length > 0 ? (
                                    <>
                                        {item.details.map((detail, idx) => (
                                            <div key={idx} className="mb-4">
                                                {typeof detail === 'string' ? (
                                                    <Paragraph className="text-gray-700">
                                                        {detail}
                                                    </Paragraph>
                                                ) : (
                                                    <>
                                                        <Paragraph className="text-gray-700 font-semibold">
                                                            • {detail.title}:
                                                        </Paragraph>
                                                        <Paragraph className="text-gray-600 ml-4">
                                                            {detail.description}
                                                        </Paragraph>
                                                    </>
                                                )}
                                            </div>
                                        ))}
                                        {item.note && (
                                            <Paragraph className="text-gray-700 italic">
                                                {item.note}
                                            </Paragraph>
                                        )}
                                        {item.additional && (
                                            <Paragraph className="text-gray-700 font-semibold">
                                                {item.additional}
                                            </Paragraph>
                                        )}
                                    </>
                                ) : (
                                    <Paragraph className="text-gray-500 italic">
                                        Chưa có thông tin chi tiết cho ngày này.
                                    </Paragraph>
                                )}
                            </motion.div>
                        </Panel>
                    ))}
                </Collapse>
            </div>
        </div>
    );
};