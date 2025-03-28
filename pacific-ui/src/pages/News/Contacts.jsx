import React from 'react';
import { useTranslation } from 'react-i18next';


const Contacts = () => {
    const { t } = useTranslation();
    return (
        <div className="font-sans">
            {/* Thông tin liên hệ */}
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold text-gray-800 mb-8">{t("contact.ti1")}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { icon: "fa-map-marker", color: "text-blue-500", title: t("contact.ti2"), content: t("contact.ti3") },
                            { icon: "fa-phone", color: "text-green-500", title: t("contact.ti4"), content: "+84 1900 1987", link: "tel://1234567920" },
                            { icon: "fa-paper-plane", color: "text-red-500", title: "Email", content: "fptpoly@fpt.vn.com", link: "mailto:fptpoly@fpt.vn.com" },
                            { icon: "fa-globe", color: "text-yellow-500", title: "Website", content: "Pacific.vn.com", link: "#" },
                        ].map((item, index) => (
                            <div key={index} className="p-6 bg-white shadow-xl rounded-lg transform hover:scale-105 transition duration-300">
                                <div className={`text-5xl ${item.color} mb-3`}>
                                    <i className={`fa ${item.icon}`}></i>
                                </div>
                                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                                {item.link ? (
                                    <p><a href={item.link} className="text-blue-600 hover:underline">{item.content}</a></p>
                                ) : (
                                    <p>{item.content}</p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Form liên hệ */}
            <section className="py-16">
                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 shadow-xl rounded-lg">
                        <h3 className="text-2xl font-bold mb-6">{t("contact.ti5")}</h3>
                        <form>
                            <input type="text" placeholder={t("contact.ti6")} className="w-full p-4 border rounded mb-4 focus:ring-2 focus:ring-blue-400" />
                            <input type="email" placeholder={t("contact.ti7")} className="w-full p-4 border rounded mb-4 focus:ring-2 focus:ring-blue-400" />
                            <input type="text" placeholder={t("contact.ti8")} className="w-full p-4 border rounded mb-4 focus:ring-2 focus:ring-blue-400" />
                            <textarea placeholder={t("contact.ti9")} className="w-full p-4 border rounded mb-4 focus:ring-2 focus:ring-blue-400" rows="4"></textarea>
                            <button type="submit" className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 transition duration-300">{t("contact.ti10")}</button>
                        </form>
                    </div>
                    <div className="bg-white p-8 shadow-xl rounded-lg">
                        <div id="map" className="h-64 bg-gray-300 rounded-lg"></div>
                    </div>
                </div>
            </section>
                        {/* Phần giới thiệu công ty */}
                        <section className="relative bg-cover bg-center py-24 text-white text-center mt-10" style={{ backgroundImage: "url('/img/vacation/des4.jpg')" }}>
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10 px-6">
                    <h2 className="text-5xl font-bold mb-4">{t("contact.ti11")}</h2>
                    <p className="text-lg mb-6">{t("contact.ti12")}</p>
                    <a href="#" className="inline-block bg-yellow-500 text-black py-3 px-8 rounded-lg text-lg font-semibold hover:bg-yellow-600 transition duration-300">{t("contact.ti13")}</a>
                </div>
            </section>
        </div>
        
    );
};
export default Contacts;