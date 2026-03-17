import Banner from "@/components/basic/Banner";
import Header from "@/components/basic/Header";
import ClientTestimonialsSection from "@/components/landing/ClientTestimonials";
import PressBanner from "@/components/landing/EconomicTimesBanner";
import HeroSection from "@/components/landing/HeroSection";
import HomePromoBento from "@/components/landing/HomePromoBento";
import PopularSection from "@/components/landing/PopularSection";
import QuickAccessCategories from "@/components/landing/QuickAccessCategories";
import SpotlightSection from "@/components/landing/SpotlightSection";

const LandingPage = () => {
    return (
        <div className="flex flex-col">
            <Banner />
            <Header />
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