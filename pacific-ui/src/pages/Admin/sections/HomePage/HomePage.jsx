import { StatusCard } from '~/pages/Admin/components/StatusCard';
import { ChartCard } from '~/pages/Admin/components/ChartCard';
import { StatisticSection } from '~/pages/Admin/sections/HomePage/Sections/StatisticSection';
import { StatisticTourSection } from '~/pages/Admin/sections/HomePage/Sections/StatisticTourSection';
import { useEffect, useState } from 'react';
import AdminServices from '~/services/AdminServices';
import Orb from '~/component/Animation/Orb';
import { Card, Input, Button, Spin, message } from 'antd';
import AiServices from '~/services/AiServices';

export const HomePage = () => {
    const [revenueData, setRevenueData] = useState({});
    const [chartData, setChartData] = useState([]);
    const [aiQuery, setAiQuery] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState([]); // Lưu lịch sử chat

    // Danh sách gợi ý câu hỏi
    const suggestions = [
        'Tour nào rẻ nhất?',
        'Gợi ý tour ở Đà Nẵng?',
        'Tour phù hợp gia đình?',
        'Tour khởi hành tháng này?',
    ];

    useEffect(() => {
        AdminServices.getBookingYearlyStats()
            .then((res) => {
                setRevenueData({
                    totalRevenue: res.data.totalRevenue,
                    revenueChange: res.data.revenueChange,
                    change: res.data.change,
                });
                setChartData(
                    res.data.monthlyRevenues.map((item) => ({
                        name: `Tháng ${item.month}`,
                        value: item.revenue,
                    })),
                );
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    const handleAiQuery = async () => {
        if (!aiQuery.trim()) {
            message.warning('Vui lòng nhập câu hỏi!');
            return;
        }
        setIsLoading(true);
        try {
            const res = await AiServices.askAi(aiQuery);
            const newChat = { query: aiQuery, response: res };
            setChatHistory([...chatHistory, newChat]); // Thêm vào lịch sử
            setAiResponse(res);
            message.success('Đã nhận câu trả lời!');
        } catch (err) {
            const errorResponse = 'Lỗi khi xử lý câu hỏi. Vui lòng thử lại.';
            setChatHistory([...chatHistory, { query: aiQuery, response: errorResponse }]);
            setAiResponse(errorResponse);
            message.error('Có lỗi xảy ra!');
        } finally {
            setIsLoading(false);
            setAiQuery('');
        }
    };

    // Xử lý khi chọn gợi ý
    const handleSuggestionClick = (suggestion) => {
        setAiQuery(suggestion);
    };

    return (
        <div className={'space-y-4'}>
            <div className={'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'}>
                <StatusCard
                    title="Tổng doanh thu năm nay"
                    totalAmount={revenueData.totalRevenue || 0}
                    change={revenueData.change || { value: 0, type: 'neutral' }}
                />
                <ChartCard
                    title="Doanh thu theo tháng"
                    totalAmount={revenueData.totalRevenue || 0}
                    change={revenueData.change || { value: 0, type: 'neutral' }}
                    chartData={chartData}
                />
                <Card
                    className="w-full shadow-lg border border-gray-100 hover:shadow-xl transition-shadow relative"
                    style={{ borderRadius: '8px', background: '#fff', minHeight: '400px' }}
                >
                    <Orb
                        hoverIntensity={0.5}
                        rotateOnHover={true}
                        hue={isLoading ? 180 : 0}
                        forceHoverState={isLoading}
                        className={`absolute top-0 left-0 w-full h-full opacity-30 ${isLoading ? 'animate-pulse scale-105' : ''}`}
                    />
                    <div className="relative z-10 p-4 flex flex-col h-full">
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Hỏi về Tour</h3>

                        {/* Gợi ý câu hỏi */}
                        <div className="flex flex-wrap gap-2 mb-3">
                            {suggestions.map((suggestion, index) => (
                                <Button
                                    key={index}
                                    type="text"
                                    className="text-blue-500 hover:bg-blue-50 rounded-full px-3 py-1 text-sm"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </Button>
                            ))}
                        </div>

                        {/* Lịch sử chat */}
                        <div className="flex-1 overflow-y-auto mb-4 p-2 bg-gray-50 rounded-lg border border-gray-100"
                             style={{ maxHeight: '200px' }}>
                            {chatHistory.length > 0 ? (
                                chatHistory.map((chat, index) => (
                                    <div key={index} className="mb-3">
                                        <p className="text-sm text-gray-600 font-medium">Hỏi: {chat.query}</p>
                                        <p className="text-sm text-gray-700 bg-white p-2 rounded-lg shadow-sm overflow-y-auto"
                                           style={{ maxHeight: '100px' }}>
                                            Trả lời: {chat.response}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-gray-500 italic">Chưa có câu hỏi nào. Hãy thử một gợi ý!</p>
                            )}
                            {isLoading && (
                                <div className="flex justify-center">
                                    <Spin tip="Gemini đang xử lý..." />
                                </div>
                            )}
                        </div>

                        {/* Khung nhập câu hỏi */}
                        <div className="flex gap-2">
                            <Input
                                value={aiQuery}
                                onChange={(e) => setAiQuery(e.target.value)}
                                placeholder="VD: Gợi ý tour ở Đà Nẵng?"
                                onPressEnter={handleAiQuery}
                                className="border-gray-200 focus:ring-blue-500"
                            />
                            <Button
                                type="primary"
                                onClick={handleAiQuery}
                                disabled={isLoading || !aiQuery.trim()}
                                className="bg-blue-500 hover:bg-blue-600"
                            >
                                Hỏi
                            </Button>
                        </div>
                    </div>
                </Card>
            </div>
            <StatisticSection />
            <StatisticTourSection />
        </div>
    );
};