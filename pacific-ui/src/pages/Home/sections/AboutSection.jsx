import { useNavigate } from 'react-router-dom';
import config from '~/config';

import { useTranslation } from 'react-i18next';

export const AboutSection = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <>
            <div className={"hidden lg:block"}>
                <div className={"relative h-screen bg-center bg-cover rounded-3xl"}
                     style={{ backgroundImage: "url('/img/about/aboutbg.jpg')" }}>
                    <img src={"/img/about/about.jpg"}
                         className={"w-96 h-fit border-[9px] border-white absolute left-72 -bottom-[30rem] transform -translate-x-1/2 -translate-y-1/2"}
                         alt={"About"} />
                </div>
                <div className={"container mx-auto py-8 px-40"}>
                    <div className={"ms-96 grid grid-cols-1 md:grid-cols-2"}>
                        <div className={"text-balance"}>
                            <h2 className={"text-5xl font-bold mb-4 text-orange-500"}>{t("aboutUs.ab1")}</h2>
                            <p className={"text-xl font-bold"}>
                                {t("aboutUs.ab2")}
                            </p>
                            <p className={"text-md font-bold pt-4"}>
                                {t("aboutUs.ab3")}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate(config.routes.tourTrongNuoc)}
                        className={"mx-96 mt-5 text-4xl bg-orange-600 font-bold text-white p-4 rounded-full shadow-xl hover:bg-orange-800"}>
                        {t("aboutUs.ab4")}
                    </button>
                </div>
            </div>
            <div className={"block lg:hidden"}>
                <div className={"container bg-gray-100 rounded-lg mx-auto py-8 px-4"}>
                    <div className={"grid grid-cols-1"}>
                        <div className={"text-center"}>
                            <h2 className={"text-5xl font-bold mb-4 text-orange-500"}>{t("aboutUs.ab1")}</h2>
                            <p className={"text-xl font-bold"}>
                                {t("aboutUs.ab2")}
                            </p>
                            <p className={"text-md font-bold pt-4"}>
                                {t("aboutUs.ab3")}
                            </p>
                        </div>
                    </div>
                    <button
                        className={"mx-auto justify-center items-center container mt-5 text-4xl bg-orange-600 font-bold text-white p-4 rounded-full shadow-xl hover:bg-orange-800"}>
                        {t("aboutUs.ab4")}
                    </button>
                </div>
            </div>
        </>
    );
};