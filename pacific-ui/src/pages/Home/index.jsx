import { useEffect } from 'react';
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
import { AboutLogin } from '~/pages/Home/sections/AboutLogin';
import { useAuth } from '~/config/AuthContext';
import { VouchersPage } from '~/pages/Home/sections/VouchersPage';

function Home() {
    const { currentUser } = useAuth();
    const { t } = useTranslation();

    useEffect(() => {
        document.title = 'Pacific - Hành trình khám phá mọi nơi.';
    }, []);

    return (
        <FadeContent
            blur={true}
            duration={1000}
            easing="ease-out"
            initialOpacity={0}
        >
            <AnimatedHomeBanner />
            <div className={'container mx-auto'}>
                <VouchersPage/>
                <TravelCardLists />
                <Vacations />
                <AboutSection />
                <TourLists />
                <ComboTour />
                <Divider className={'font-bold uppercase'}
                         style={{
                             borderColor: '#7cb305',
                         }}
                         orientation="center">
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-800 bg-clip-text text-transparent bg-gradient-to-r from-green-500 to-lime-500">
                        {t("index.ind5")}</h2>
                    <p className={"text-sm sm:text-lg text-gray-600 mt-2"}>{t("index.ind6")}</p>
                </Divider>
                <BlogSection />
                {currentUser ? null : <AboutLogin />}
            </div>
        </FadeContent>
    );
}

export default Home;