import { useEffect } from 'react';
// import Header from "@/components/basic/Header";
import ClientTestimonialsSection from "@/components/landing/ClientTestimonials";
import PressBanner from "@/components/landing/EconomicTimesBanner";
import HeroSection from "@/components/landing/HeroSection";
import HomePromoBento from "@/components/landing/HomePromoBento";
import PopularSection from "@/components/landing/PopularSection";
import QuickAccessCategories from "@/components/landing/QuickAccessCategories";
import SpotlightSection from "@/components/landing/SpotlightSection";
import useLandingPageStore from '../stores/landingPageStore';

const LandingPage = () => {
    const { fetchHeroBanners } = useLandingPageStore();

    useEffect(() => {
        fetchHeroBanners();
    }, [fetchHeroBanners]);

    return (
        <div className="flex flex-col p-6">
            {/* <Header /> */}
            <HeroSection />
            <QuickAccessCategories />
            <HomePromoBento />
            <PopularSection />
            <SpotlightSection />
            <PressBanner />
            <ClientTestimonialsSection />
            LandingPage
        </div>
    )
}

export default LandingPage