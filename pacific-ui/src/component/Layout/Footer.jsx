import React, { useEffect, useState } from 'react';
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const { t } = useTranslation();
    return (
        <footer
            className="bg-cover bg-center text-black"
            style={{ backgroundImage: "url('/img/bg_3.jpg')" }}
        >
            <div className="max-w-7xl mx-auto py-16 px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Về Chúng Tôi */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 uppercase">{t("footer.ti1")}</h3>
                    <p className="text-sm leading-relaxed opacity-80">
                        {t("footer.ti2")}
                    </p>
                    <div className="flex space-x-3 mt-6">
                        <a href="#" className="text-white bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition duration-300">
                            <FaTwitter className="w-4 h-4" />
                        </a>
                        <a href="#" className="text-white bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition duration-300">
                            <FaFacebookF className="w-4 h-4" />
                        </a>
                        <a href="#" className="text-white bg-orange-500 p-3 rounded-full hover:bg-orange-600 transition duration-300">
                            <FaInstagram className="w-4 h-4" />
                        </a>
                    </div>
                </div>

                {/* Thông Tin */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 uppercase">{t("footer.ti3")}</h3>
                    <ul className="space-y-3 text-sm opacity-90">
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">{t("footer.ti4")}</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">{t("footer.ti5")}</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">{t("footer.ti6")}</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">{t("footer.ti7")}</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">{t("footer.ti8")}</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">{t("footer.ti9")}</a></li>
                    </ul>
                </div>

                {/* Kinh Nghiệm */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 uppercase">{t("footer.ti10")}</h3>
                    <ul className="space-y-3 text-sm opacity-90">
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">{t("footer.ti11")}</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">{t("footer.ti12")}</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">{t("footer.ti13")}</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">{t("footer.ti14")}</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">{t("footer.ti15")}</a></li>
                        <li><a href="#" className="hover:text-orange-400 transition duration-300">{t("footer.ti16")}</a></li>
                    </ul>
                </div>

                {/* Có Câu Hỏi? */}
                <div>
                    <h3 className="text-xl font-semibold mb-4 uppercase">{t("footer.ti17")}</h3>
                    <address className="not-italic text-sm opacity-90 space-y-3">
                        <p>{t("footer.ti18")}</p>
                        <p>{t("footer.ti19")} <a href="tel:+8419001987" className="hover:text-orange-400 transition duration-300">+84 1900 1987</a></p>
                        <p>Email: <a href="mailto:cdfptpolytechnic@fpt.vn.com" className="hover:text-orange-400 transition duration-300">cdfptpolytechnic@fpt.vn.com</a></p>
                    </address>
                </div>
            </div>

            <div className="text-center text-black text-sm mt-12 border-t border-gray-600 pt-6 opacity-80">
                {t("footer.ti20")}
                <br /> {t("footer.ti21")}
            </div>
        </footer>
    );
};

export default Footer;
