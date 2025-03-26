import { useEffect, useState } from 'react';
import { Divider } from 'antd';
import { TravelCards } from '~/pages/Home/components/TravelCards';
import { TravelCardLists } from '~/pages/Home/sections/TravelCardLists';
import Vacations from '~/pages/Home/sections/Vacations';
import { AboutSection } from '~/pages/Home/sections/AboutSection';
import { TourLists } from '~/pages/Home/sections/TourLists';
import { AnimatedHomeBanner } from '~/pages/Home/components/AnimatedHomeBanner/AnimatedHomeBanner';
import FadeContent from '~/component/Animation/AnimatedUI/FadeContent';
import { BlogSection } from '~/pages/Home/sections/BlogSection';
import { ComboTour } from '~/pages/Home/sections/ComboTour';
import { useTranslation } from 'react-i18next';

function Home() {
    const { t, i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = useState(i18n.language);

    useEffect(() => {
        setSelectedLang(i18n.language);
    }, [i18n.language]);

    useEffect(() => {
        document.title = 'Pacific - Hành trình khám phá mọi nơi.';
    }, []);

    const FloatBtnItems = [
        {
            icon: 'fas fa-link',
            href: '#link1',
        },
        {
            icon: 'fas fa-comments',
            href: '#link2',
        },
        {
            icon: 'fas fa-envelope',
            href: '#link3',
        },
    ];
    const CardItems = [
        {
            src: '/img/cards/card1.jpg',
            title: 'Hawaii',
        },
        {
            src: '/img/cards/card2.jpg',
            title: 'Paris',
        },
        {
            src: '/img/cards/card3.jpg',
            title: 'Japan',
        },
        {
            src: '/img/cards/card4.jpg',
            title: 'Korea',
        },
    ];

    return (
        <FadeContent
            blur={true}
            duration={1000}
            easing="ease-out"
            initialOpacity={0}
        >
            <AnimatedHomeBanner />
            <div className={'container mx-auto py-12'}>
                <Divider className={'font-bold uppercase'}
                         style={{
                             borderColor: '#7cb305',
                         }}
                         orientation="center">
                    <h2 className={'lg:text-3xl text-md'}>{t("index.ind1")}</h2>
                    <p className={'lg:text-xl text-sm'}>{t("index.ind2")}</p>
                </Divider>
                <TravelCardLists />
                <Divider className={'font-bold uppercase'}
                         style={{
                             borderColor: '#7cb305',
                         }}
                         orientation="center">
                    <h2 className={'lg:text-3xl text-md'}>{t("index.ind3")}</h2>
                    <p className={'lg:text-xl text-sm'}>{t("index.ind4")}</p>
                </Divider>
                <Vacations />
                <AboutSection />
                <TourLists />
                <ComboTour />
                <Divider className={'font-bold uppercase'}
                         style={{
                             borderColor: '#7cb305',
                         }}
                         orientation="center">
                    <h2 className={'lg:text-3xl text-md'}>{t("index.ind5")}</h2>
                    <p className={'lg:text-xl text-sm'}>{t("index.ind6")}</p>
                </Divider>
                <BlogSection />
            </div>
        </FadeContent>
    );
}

export default Home;