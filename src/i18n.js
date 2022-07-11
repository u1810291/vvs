import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';
import ENUM_EN from './assets/i18n/enum/en.json';

const detection_settings = {
    order: ['localStorage', 'navigator'],
    caches: ['localStorage']
};

export const t = (key, config) => {
    return i18n.t(key, config);
};

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'lt',
    debug: false,
    detection: detection_settings,
    interpolation: {
      escapeValue: false
    }
  })

i18n.addResourceBundle('en', 'enum', ENUM_EN);

export default i18n
