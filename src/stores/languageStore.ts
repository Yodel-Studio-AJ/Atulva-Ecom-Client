import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import i18n from '@/libs/i18n';

export type Language = 'english' | 'hindi' | 'bengali';

interface LanguageState {
  language: Language;
  setLanguage: (language: Language) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      language: 'english',
      setLanguage: (language) => {
        i18n.changeLanguage(language);
        set({ language });
      },
    }),
    {
      name: 'language-storage',
    }
  )
);
