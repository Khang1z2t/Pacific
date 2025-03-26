import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import axiosInstance from '~/config/axiosConfig';

// Lấy từ localStorage
const savedLanguage = localStorage.getItem("selectedLanguage") || "vi";

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .use(Backend)
    .init({
        debug: true,
        fallbackLng: "vi",
        returnObjects: true,
        lng: savedLanguage,
    });

// Hàm đổi ngôn ngữ
const changeLanguage = async (lang) => {
    await i18n.changeLanguage(lang);
    localStorage.setItem("selectedLanguage", lang);
    axiosInstance.defaults.headers["Accept-Language"] = lang;
};

export { changeLanguage };
export default i18n;
