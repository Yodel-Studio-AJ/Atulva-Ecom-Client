import { useState, useEffect, useCallback } from "react";
import CarouselSlide from "./carousel/CarouselSlide";
import CarouselIndicators from "./carousel/CarouselIndicators";
import { heroCarouselData } from "@/constants/heroCarouselData";

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % heroCarouselData.length);
    }, []);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);

    return (
        <div className="relative h-[720px] overflow-hidden">
            {heroCarouselData.map((slide, index) => (
                <CarouselSlide key={slide.id} slide={slide} isActive={index === currentSlide} />
            ))}

            <CarouselIndicators
                total={heroCarouselData.length}
                current={currentSlide}
                onClick={setCurrentSlide}
            />

        </div>
    );
}