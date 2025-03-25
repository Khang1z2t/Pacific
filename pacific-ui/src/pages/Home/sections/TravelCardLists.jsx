import TravelCards from '~/pages/Home/components/TravelCards';


export const TravelCardLists = () => {
    const travelCardsData = [
        {
            imageSrc: '/img/cards/card1.jpg',
            title: 'Hoạt động ngoài trời',
            description: 'Các hoạt động thú vị như dù lượn, leo núi sẽ mang đến cho bạn trải nghiệm khó quên.',
            altText: 'Travel 1',
        },
        {
            imageSrc: '/img/cards/card2.jpg',
            title: 'Hoạt động ngoài trời',
            description: 'Các hoạt động thú vị như dù lượn, leo núi sẽ mang đến cho bạn trải nghiệm khó quên.',
            altText: 'Travel 2',
        },
        {
            imageSrc: '/img/cards/card3.jpg',
            title: 'Hoạt động ngoài trời',
            description: 'Các hoạt động thú vị như dù lượn, leo núi sẽ mang đến cho bạn trải nghiệm khó quên.',
            altText: 'Travel 3',
        },
        {
            imageSrc: '/img/cards/card4.jpg',
            title: 'Hoạt động ngoài trời',
            description: 'Các hoạt động thú vị như dù lượn, leo núi sẽ mang đến cho bạn trải nghiệm khó quên.',
            altText: 'Travel 4',
        },
    ];
    return (
        <div className="flex flex-col lg:flex-row items-start gap-10 px-10 py-20 bg-white">
            {/* Grid hình ảnh */}
            <TravelCards cards={travelCardsData} />
            {/* Phần Text */}
            <div className="flex-1 text-balance lg:text-left">
                <h1 className="text-5xl font-bold text-orange-500 mb-6">
                    Đã đến lúc bắt đầu cuộc phiêu lưu của chính mình
                </h1>
                <h2 className="mb-4">Hãy bắt đầu hành trình khám phá quê hương</h2>
                <p className={'mb-2'}>Một con sông nhỏ uốn lượn qua ngôi làng này, mang đến nguồn
                    nước trong lành và cuộc sống êm đềm. Đây là một miền đất thanh
                    bình, nơi bạn có thể tận hưởng những món ăn đậm chất quê hương
                    trong khung cảnh yên tĩnh và thoải mái.</p>
                <p className={'mb-2'}>Xa xa, phía sau những dãy núi trùng điệp, có một vùng đất
                    nơi các câu chuyện cổ tích trở thành hiện thực. Người dân ở đó
                    sống chậm rãi và bình yên, tại những làng chài ven biển, nơi dòng
                    sông đổ ra biển Đông bao la, mang theo hy vọng và bình an.</p>
                <p className={'mb-12'}>Con sông hiền hòa chảy qua, cung cấp nguồn sống dồi dào cho
                    người dân nơi đây, tạo nên cuộc sống giản dị và yên bình.</p>
                <button
                    className="bg-orange-500 border-orange-500 hover:bg-orange-600 w-3/5  p-2 rounded-lg"
                >
                    Đặt Tour
                </button>
            </div>
        </div>
    )
        ;
};