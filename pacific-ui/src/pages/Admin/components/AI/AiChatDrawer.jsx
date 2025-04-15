import { useEffect, useState } from 'react';
import Orb from '~/component/Animation/Orb';
import { Input, Button, Spin, message, Drawer } from 'antd';
import AiServices from '~/services/AiServices';
import DestinationServices from '~/services/DestinationServices';

const AiChatDrawer = ({ open, onClose }) => {
    const [aiQuery, setAiQuery] = useState('');
    const [aiResponse, setAiResponse] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [chatHistory, setChatHistory] = useState(() => {
        const saved = localStorage.getItem('userChatHistory');
        return saved ? JSON.parse(saved) : [];
    });
    const [suggestions, setSuggestions] = useState([
        'Tour nào giá rẻ?',
        'Tour cho cặp đôi?',
        'Tôi có booking nào?',
    ]);
    const [orbHue, setOrbHue] = useState(270); // Màu tím mặc định

    useEffect(() => {
            DestinationServices.then((res) => {
                const dynamicSuggestions = res.data.map((dest) => `Tour đi ${dest.city}?`);
                setSuggestions([
                    'Tour nào giá rẻ?',
                    ...dynamicSuggestions.slice(0, 3),
                    'Tour cho cặp đôi?',
                    'Tôi có booking nào?',
                    'Tour nào được đặt nhiều?',
                    'Chi tiết tour Đà Nẵng 3N2Đ?',
                ]);
            })
            .catch((err) => {
                console.error('Lỗi khi lấy top destinations:', err);
                setSuggestions([
                    'Tour nào giá rẻ?',
                    'Tour đi Đà Lạt?',
                    'Tour đi Đà Nẵng?',
                    'Tour đi Hà Nội?',
                    'Tour cho cặp đôi?',
                    'Tôi có booking nào?',
                    'Tour nào được đặt nhiều?',
                    'Chi tiết tour Đà Nẵng 3N2Đ?',
                ]);
            });
    }, []);

    useEffect(() => {
        localStorage.setItem('userChatHistory', JSON.stringify(chatHistory));
    }, [chatHistory]);

    const handleAiQuery = async () => {
        if (!aiQuery.trim()) {
            message.warning('Vui lòng nhập câu hỏi!');
            return;
        }
        setIsLoading(true);
        try {
            const responseText = await AiServices.askAi(aiQuery);
            const newChat = { query: aiQuery, response: responseText };
            setChatHistory([...chatHistory, newChat]);
            setAiResponse(responseText);
            setOrbHue(Math.floor(Math.random() * 360));
            if (responseText.includes('không có tour') || responseText.includes('Chưa có dữ liệu')) {
                message.warning('Hiện tại không có dữ liệu tour. Hãy thử câu hỏi khác!');
            } else if (responseText.includes('dữ liệu nội bộ')) {
                message.warning('Câu hỏi này không phù hợp. Hãy hỏi về tour du lịch!');
            } else {
                message.success('Câu trả lời đã sẵn sàng!');
            }
        } catch (err) {
            const errorResponse = 'Lỗi khi xử lý câu hỏi. Vui lòng thử lại.';
            setChatHistory([...chatHistory, { query: aiQuery, response: errorResponse }]);
            setAiResponse(errorResponse);
            setOrbHue(0);
            message.error('Có lỗi xảy ra!');
        } finally {
            setIsLoading(false);
            setAiQuery('');
        }
    };

    const handleSuggestionClick = (suggestion) => {
        setAiQuery(suggestion);
    };

    const clearChatHistory = () => {
        setChatHistory([]);
        localStorage.removeItem('userChatHistory');
        setAiResponse('');
        message.success('Đã xóa lịch sử chat!');
    };

    // Hàm render trả lời dạng chuỗi, giữ nguyên gạch đầu dòng
    const renderResponse = (response) => {
        const lines = response.split('\n');
        return lines.map((line, index) => (
            <div key={index} className={line.startsWith('- ') ? 'ml-2' : ''}>
                {line}
            </div>
        ));
    };

    return (
        <Drawer
            title="Trò chuyện với AI Du lịch"
            placement="right"
            onClose={onClose}
            open={open}
            width={400}
            closeIcon={<Button type="text" className="text-gray-500">Đóng</Button>}
            styles={{
                body: { padding: '16px', background: '#fff' },
                header: { borderBottom: '1px solid #f0f0f0', padding: '16px' },
            }}
        >
            <div className="relative flex flex-col h-full">
                <Orb
                    hoverIntensity={0.5}
                    rotateOnHover={true}
                    hue={isLoading ? 180 : orbHue}
                    forceHoverState={isLoading}
                    className={`absolute top-0 left-0 w-full h-full opacity-20 ${isLoading ? 'animate-pulse scale-105' : ''}`}
                />
                <div className="relative z-10 flex flex-col h-full">
                    <p className="text-sm text-gray-500 mb-4">Hỏi về tour du lịch, chúng tôi sẽ gợi ý ngay!</p>

                    <Button
                        type="text"
                        className="text-red-500 mb-4 self-start"
                        onClick={clearChatHistory}
                    >
                        Xóa lịch sử chat
                    </Button>

                    <div className="flex flex-wrap gap-2 mb-4">
                        {suggestions.map((suggestion, index) => (
                            <Button
                                key={index}
                                type="text"
                                className="text-purple-500 hover:bg-purple-50 rounded-full px-3 py-1 text-sm"
                                onClick={() => handleSuggestionClick(suggestion)}
                            >
                                {suggestion}
                            </Button>
                        ))}
                    </div>

                    <div className="flex-1 overflow-y-auto mb-4 p-3 bg-gray-50 rounded-lg border border-gray-100">
                        {chatHistory.length > 0 ? (
                            chatHistory.map((chat, index) => (
                                <div key={index} className="mb-4">
                                    <p className="text-sm text-gray-600 font-medium mb-1">
                                        Bạn hỏi: {chat.query}
                                    </p>
                                    <div className="text-sm text-gray-700 bg-white p-3 rounded-lg shadow-sm">
                                        <p className="font-medium mb-1">Trả lời:</p>
                                        {renderResponse(chat.response)}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-gray-500 italic">Hãy hỏi gì đó hoặc chọn một gợi ý!</p>
                        )}
                        {isLoading && (
                            <div className="flex justify-center">
                                <Spin tip="Đang tìm câu trả lời..." />
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        <Input
                            value={aiQuery}
                            onChange={(e) => setAiQuery(e.target.value)}
                            placeholder="VD: Tour đi Đà Lạt giá bao nhiêu?"
                            onPressEnter={handleAiQuery}
                            className="border-gray-200 focus:ring-purple-500"
                        />
                        <Button
                            type="primary"
                            onClick={handleAiQuery}
                            disabled={isLoading || !aiQuery.trim()}
                            className="bg-purple-500 hover:bg-purple-600"
                        >
                            Hỏi
                        </Button>
                    </div>
                </div>
            </div>
        </Drawer>
    );
};

export default AiChatDrawer;