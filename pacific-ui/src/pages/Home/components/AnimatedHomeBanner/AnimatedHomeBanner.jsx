import BlurText from '~/component/Animation/AnimatedUI/BlurText';
import { useEffect, useState } from 'react';
import TranslationService from '~/services/TranslationService';
import { useTranslation } from "react-i18next";

export const AnimatedHomeBanner = () => {
    const [translations, setTranslations] = useState({
        welcome: '',
        welcome1: '',
        welcome2: ''
    });

    const supportedLanguages = ["vi", "en", "ko", "ja", "zh"];

    const { i18n } = useTranslation();
    const lang = supportedLanguages.includes(i18n.language) ? i18n.language : "vi";


    useEffect(() => {
        const fetchTranslations = async () => {
            const data = await TranslationService(i18n.language);
            console.log("Fetched translations:", data); // Debug dữ liệu API
            if (data) {
                setTranslations({
                    welcome: data.welcome || "",
                    welcome1: data.welcome1 || "",
                    welcome2: data.welcome2 || ""
                });
            }
        };
        fetchTranslations();
    }, [i18n.language]);


    return (
        <div className="relative h-[500px] bg-cover bg-center"
             style={{ backgroundImage: 'url(\'/img/banner/3.jpg\')' }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Nội dung */}
            <div
                className="relative z-10 flex flex-col items-center justify-center text-center h-full text-white px-4">
                {/*<LanguageSelector />*/}
                <BlurText text={translations.welcome || "Chào mừng bạn đến với công ty du lịch Pacific."}
                          animateBy="words"
                          direction={'top'}
                          delay={150}
                          className={'uppercase text-3xl md:text-5xl font-bold mb-4'} />
                <BlurText
                    animateBy="words"
                    text={translations.welcome1 || "Chúng tôi là công ty du lịch Pacific."}
                    delay={180}
                    className={'uppercase text-xl md:text-2xl font-semibold mb-6'} />
                <BlurText
                    animateBy="words"
                    text={translations.welcome2 || "Du lịch đến mọi nơi trên thế giới mà không phải đi lòng vòng."}
                    delay={200}
                    className={'uppercase text-md md:text-lg max-w-2xl'} />
            </div>
        </div>
    );
};