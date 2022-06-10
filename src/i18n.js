import i18n from "i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from 'react-i18next';

const detection_settings = {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
};

export const t = (key, config) => {
    return i18n.t(key, config);
};

i18n.use(Backend).use(LanguageDetector).use(initReactI18next).init({
    fallbackLng: 'lt',
    debug: true,
    detection: detection_settings,
    interpolation: {
        escapeValue: false
    }
})

export default i18n