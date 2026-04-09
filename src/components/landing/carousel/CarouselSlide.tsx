
import { useNavigate } from "react-router-dom";
import type { HeroBanner } from "@/types/landing";
import { renderTextWithLineBreaks } from "@/utils/textHelpers";

interface Props {
    slide: HeroBanner;
    isActive: boolean;
}

export default function CarouselSlide({ slide, isActive }: Props) {
    const navigate = useNavigate();

    const handleCta = () => {
        if (!slide.cta_button_url) return;
        if (slide.cta_button_url.startsWith('http')) {
            window.open(slide.cta_button_url, '_blank', 'noopener noreferrer');
        } else {
            navigate(slide.cta_button_url);
        }
    };

    return (
        <div
            className={`absolute inset-0 transition-opacity duration-700 ${isActive ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
        >
            <div className="absolute inset-0">
                <img src={slide.image_url} alt={slide.title} className="w-full h-full object-cover rounded-xl" />
                {/* <div className="absolute inset-0 bg-black/40" /> */}
            </div>

            <div className="relative h-full flex items-center">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div
                        className={`max-w-2xl transform transition-all duration-700 ${isActive ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                            }`}
                    >
                        {
                            slide.subtitle &&
                            <div className="text-xl text-amber-200 font-serif mb-4">{renderTextWithLineBreaks(slide.subtitle)}</div>
                        }
                        <h1 className="text-5xl lg:text-6xl 2xl:text-7xl font-serif text-white mb-6"
                            style={{
                                color: slide.text_color
                            }}
                        >
                            {renderTextWithLineBreaks(slide.title)}
                        </h1>
                        <p className="text-2xl text-gray-200 mb-8"
                            style={{
                                color: slide.text_color
                            }}
                        >
                            {renderTextWithLineBreaks(slide.headtext)}
                        </p>
                        <button
                            onClick={handleCta}
                            className="group flex items-center gap-2 px-6 py-2 hover:bg-white hover:text-gray-900 transition-all rounded-full"
                            style={{
                                color: slide.cta_button_text_color,
                                backgroundColor: slide.cta_button_color
                            }}
                        >
                            {slide.cta_button_text}
                            {/* <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /> */}
                        </button>


                    </div>
                </div>
            </div>
        </div>
    );
}