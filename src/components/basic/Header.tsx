import React, { useState, useEffect, useRef } from 'react';
import { Globe } from 'lucide-react';
import { useLanguageStore, type Language } from '@/stores/languageStore';

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguageStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const languages = [
    { code: 'english' as Language, label: 'English', native: 'English' },
    { code: 'hindi' as Language, label: 'Hindi', native: 'हिंदी' },
    { code: 'bengali' as Language, label: 'Bengali', native: 'বাংলা' },
  ];

  const currentLanguage = languages.find((lang) => lang.code === language);

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setIsOpen(false);
  };

  return (
    <header className="w-full bg-white border-b border-gray-800 py-4 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="text-black text-xl font-semibold">
          Logo
        </div>

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            <Globe size={18} />
            <span>{currentLanguage?.native}</span>
          </button>

          {isOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg overflow-hidden z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={`w-full px-4 py-3 text-left hover:bg-gray-700 transition-colors ${language === lang.code
                    ? 'bg-gray-700 text-white'
                    : 'text-gray-300'
                    }`}
                >
                  <div className="font-medium">{lang.native}</div>
                  <div className="text-sm text-gray-400">{lang.label}</div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
