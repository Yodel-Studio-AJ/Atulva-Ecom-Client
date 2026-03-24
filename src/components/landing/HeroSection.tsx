import { useState, useEffect, useCallback } from "react";
import CarouselSlide from "./carousel/CarouselSlide";
import CarouselIndicators from "./carousel/CarouselIndicators";
import useLandingPageStore from "@/stores/landingPageStore";

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const { heroBanners, isHeroBannerLoading } = useLandingPageStore();


    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % heroBanners.length);
    }, [heroBanners.length]);

    useEffect(() => {
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide]);



    if (isHeroBannerLoading) {
        return (
            <div></div>
        )
    }


    return (
        <div className="relative h-[720px] w-full max-w-7xl mx-auto overflow-hidden">
            {heroBanners.map((slide, index) => (
                <CarouselSlide key={slide.id} slide={slide} isActive={index === currentSlide} />
            ))}

            <CarouselIndicators
                total={heroBanners.length}
                current={currentSlide}
                onClick={setCurrentSlide}
            />

        </div>
    );
}