import { Button } from 'antd';
import TravelCards from '~/pages/Home/components/TravelCards';

export const TravelCardLists = () => {
    const travelCardsData = [
        {
            imageSrc: '/img/cards/card1.jpg',
            iconSrc: '/img/cards/card1.jpg',
            altText: 'Travel 1',
        },
        {
            imageSrc: '/img/cards/card2.jpg',
            iconSrc: '/img/cards/card2.jpg',
            altText: 'Travel 2',
        },
        {
            imageSrc: '/img/cards/card3.jpg',
            iconSrc: '/img/cards/card3.jpg',
            altText: 'Travel 3',
        },
        {
            imageSrc: '/img/cards/card4.jpg',
            iconSrc: '/img/cards/card4.jpg',
            altText: 'Travel 4',
        },
    ];
    return (
        <div className="flex flex-col lg:flex-row items-start gap-10 px-10 py-20 bg-white">
            {/* Grid hình ảnh */}
            <TravelCards cards={travelCardsData} />

            {/* Phần Text */}
            <div className="flex-1 mt-24 text-balance lg:text-left">
                <h1 className="text-5xl font-bold text-gray-800 mb-6">
                    Đã đến lúc bắt đầu cuộc phiêu lưu của chính mình
                </h1>
                <p className="text-lg text-gray-600 leading-relaxed mb-6">
                    “Bao nhiêu cung đường mới đủ cho con tim <br />
                    Vì những chặng đường chưa bao giờ là đủ <br />
                    Vì cuộc đời là những chuyến đi xa <br />
                    Vì cuộc cười là những chuyến xe xa!” <br />
                    <span className="font-semibold">— Thiên Ân —</span>
                </p>
                <button
                    className="bg-orange-500 border-orange-500 hover:bg-orange-600 w-3/5  p-2 rounded-lg"
                >
                    Đặt Tour
                </button>
            </div>
        </div>
    );
};