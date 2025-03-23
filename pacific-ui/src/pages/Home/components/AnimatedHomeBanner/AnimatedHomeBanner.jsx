import BlurText from '~/component/Animation/AnimatedUI/BlurText';
import { useTranslation } from 'react-i18next';
import LanguageSelector from '~/pages/Home/components/LanguageSelector';

export const AnimatedHomeBanner = () => {

    const {t} = useTranslation();

    const {text1, text2} = t("description");

    return (
        <div className="relative h-[500px] bg-cover bg-center"
             style={{ backgroundImage: 'url(\'/img/banner/3.jpg\')' }}>
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Nội dung */}
            <div
                className="relative z-10 flex flex-col items-center justify-center text-center h-full text-white px-4">
                {/*<LanguageSelector />*/}
                <BlurText text={t("welcome")}
                          animateBy="words"
                          direction={'top'}
                          delay={150}
                          className={'uppercase text-3xl md:text-5xl font-bold mb-4'} />
                <BlurText
                    animateBy="words"
                    text={text1}
                    delay={180}
                    className={'uppercase text-xl md:text-2xl font-semibold mb-6'} />
                <BlurText
                    animateBy="words"
                    text={text2}
                    delay={200}
                    className={'uppercase text-md md:text-lg max-w-2xl'} />
            </div>
        </div>
    );
};