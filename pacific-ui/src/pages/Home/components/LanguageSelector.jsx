import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
    { code: 'vi', lang: 'Việt Nam' },
    { code: 'en', lang: 'English' },
    { code: 'zh', lang: 'Chinese' },
    { code: 'ja', lang: 'Japanese' },
    { code: 'ko', lang: 'Korean' },
];

const LanguageSelector = () => {
    const { i18n } = useTranslation();

    const changeLanguage = (lng) => {
        i18n.changeLanguage(lng);
    };

    useEffect(() => {
        document.body.dir = i18n.dir();
    }, [i18n,i18n.language]);

    return (
        <div className="flex gap-2">
            {languages.map((lng) => (
                <button
                    key={lng.code}
                    className={`px-3 py-1 rounded border ${
                        lng.code === i18n.language ? 'bg-blue-500 text-white' : 'bg-gray-200'
                    }`}
                    onClick={() => changeLanguage(lng.code)}
                >
                    {lng.lang}
                </button>
            ))}
        </div>
    );
};

export default LanguageSelector;

