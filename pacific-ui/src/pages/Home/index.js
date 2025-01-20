import { useEffect } from 'react';
import { FloatButton } from '~/component/ui/FloatButton';
import { Divider } from 'antd';
import { TravelCards } from '~/pages/Home/components/TravelCards';
import { TravelCardLists } from '~/pages/Home/sections/TravelCardLists';
import Vacations from '~/pages/Home/sections/Vacations';
import { AboutSection } from '~/pages/Home/sections/AboutSection';

function Home() {
    useEffect(() => {
        document.title = "Home";
    }, []);
    const FloatBtnItems = [
        {
            icon: "fas fa-link",
            href: "#link1"
        },
        {
            icon: "fas fa-comments",
            href: "#link2"
        },
        {
            icon: "fas fa-envelope",
            href: "#link3"
        }
    ]
    const CardItems = [
        {
            src: "/img/cards/card1.jpg",
            title: "Hawaii"
        },
        {
            src: "/img/cards/card2.jpg",
            title: "Paris"
        },
        {
            src: "/img/cards/card3.jpg",
            title: "Japan"
        },
        {
            src: "/img/cards/card4.jpg",
            title: "Korea"
        }
    ]
    return (
        <div>
            <div className="relative h-screen bg-cover bg-center"
                 style={{ backgroundImage: "url('/img/banner/3.jpg')" }}>
                {/* Overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>

                {/* Nội dung */}
                <div
                    className="relative z-10 flex flex-col items-center justify-center text-center h-full text-white px-4">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        WELCOME TO PACIFIC TOUR
                    </h1>
                    <h2 className="text-2xl md:text-3xl font-semibold mb-6">
                        Khám phá những địa điểm yêu thích của bạn cùng với chúng tôi.
                    </h2>
                    <p className="text-lg md:text-xl max-w-2xl">
                        Du lịch đến mọi nơi trên thế giới mà không phải đi lòng vòng.
                    </p>
                </div>

                {/* Sidebar Icon */}
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2 space-y-4">
                    {FloatBtnItems.map((item, index) => (
                        <FloatButton key={index} icon={item.icon} href={item.href} />
                    ))}
                </div>

                {/* Play Button */}
                <div className="absolute bottom-8 right-8">
                    <button className="bg-white text-black p-4 rounded-full shadow-lg hover:bg-gray-200">
                        <i className="fas fa-play"></i>
                    </button>
                </div>
            </div>
            <div className={"container mx-auto py-12"}>
                <Divider className={"font-bold uppercase text-2xl"}
                         style={{
                            borderColor: '#7cb305',
                        }}
                         orientation="center">Cùng khám phá với pacific
                </Divider>
                <TravelCardLists/>
                <Divider className={"font-bold uppercase text-2xl"}
                            style={{
                                borderColor: '#7cb305',
                            }}
                            orientation="center">Lựa chọn điểm đến của chính mình
                </Divider>
                <Vacations/>
                <AboutSection/>
            </div>
        </div>
    );
}

export default Home;