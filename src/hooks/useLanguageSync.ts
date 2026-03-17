import { useEffect } from 'react';
import i18n from '@/libs/i18n';
import { useLanguageStore } from '@/stores/languageStore';

export const useLanguageSync = () => {
  const language = useLanguageStore((state) => state.language);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);
};
