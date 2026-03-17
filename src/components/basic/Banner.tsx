import { useLanguageStore, type Language } from '@/stores/languageStore';
import React from 'react';

export interface BannerMessage {
  text: string;
  translations: Record<Language, string>;
}

const bannerMessages: BannerMessage[] = [
  {
    text: "Shop on our new international site and enjoy 10% off with code HOME10!",
    translations: {
      english: "Shop on our new international site and enjoy 10% off with code HOME10!",
      hindi: "हमारी नई अंतरराष्ट्रीय साइट पर खरीदारी करें और कोड HOME10 का उपयोग करके 10% की छूट पाएं!",
      bengali: "আমাদের নতুন আন্তর্জাতিক সাইটে কেনাকাটা করুন এবং HOME10 কোড ব্যবহার করে ১০% ছাড় পান!"
    }
  },
  {
    text: "Enjoy FREE Shipping on all orders above $99!",
    translations: {
      english: "Enjoy FREE Shipping on all orders above $99!",
      hindi: "$99 से अधिक के सभी ऑर्डर पर मुफ्त डिलीवरी का लाभ उठाएं!",
      bengali: "$99 এর বেশি অর্ডারে ফ্রি ডেলিভারি উপভোগ করুন!"
    }
  }
];

interface BannerProps {
  speed?: number;
}

const Banner: React.FC<BannerProps> = ({ speed = 20 }) => {
  const { language } = useLanguageStore();

  const lang = language?.toLowerCase();

  return (
    <div className="relative overflow-hidden w-full bg-banner py-4">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...Array(3)].map((_, setIndex) => (
          <div key={setIndex} className="flex shrink-0">
            {bannerMessages.map((item, index) => {
              const text =
                item.translations[lang as keyof typeof item.translations] ??
                item.text;

              return (
                <div
                  key={`${setIndex}-${index}`}
                  className="px-36 text-white text-lg"
                >
                  {text}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        .animate-scroll {
          animation: scroll ${speed}s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Banner;
