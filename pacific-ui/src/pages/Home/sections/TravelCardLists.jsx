import TravelCards from '~/pages/Home/components/TravelCards';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';

export const TravelCardLists = () => {
    const { t, i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = useState(i18n.language);

    useEffect(() => {
        setSelectedLang(i18n.language);
    }, [i18n.language]);

    const travelCardsData = [
        {
            imageSrc: '/img/cards/card1.jpg',
            title: t("travelCard.ti1"),
            description: t("travelCard.de1"),
            altText: 'Travel 1',
        },
        {
            imageSrc: '/img/cards/card2.jpg',
            title: t("travelCard.ti1"),
            description: t("travelCard.de1"),
            altText: 'Travel 2',
        },
        {
            imageSrc: '/img/cards/card3.jpg',
            title: t("travelCard.ti1"),
            description: t("travelCard.de1"),
            altText: 'Travel 3',
        },
        {
            imageSrc: '/img/cards/card4.jpg',
            title: t("travelCard.ti1"),
            description: t("travelCard.de1"),
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
                    {t("travelCard.ti2")}
                </h1>
                <h2 className="mb-4">{t("travelCard.ti3")}</h2>
                <p className={'mb-2'}>{t("travelCard.de2")}</p>
                <p className={'mb-2'}>{t("travelCard.de3")}.</p>
                <p className={'mb-12'}>{t("travelCard.de4")}</p>
                <button
                    className="bg-orange-500 border-orange-500 hover:bg-orange-600 w-3/5  p-2 rounded-lg"
                >
                    {t("travelCard.ti4")}
                </button>
            </div>
        </div>
    )
        ;
};