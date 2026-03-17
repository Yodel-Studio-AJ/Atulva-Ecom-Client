import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from '@/locales/en/translation.json';
import hiTranslation from '@/locales/hi/translation.json';
import bnTranslation from '@/locales/bn/translation.json';

const resources = {
  english: {
    translation: enTranslation,
  },
  hindi: {
    translation: hiTranslation,
  },
  bengali: {
    translation: bnTranslation,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'english',
    fallbackLng: 'english',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
