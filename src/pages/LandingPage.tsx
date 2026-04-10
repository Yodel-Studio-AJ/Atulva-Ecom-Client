import { useEffect } from 'react';
// import Header from "@/components/basic/Header";
import ClientTestimonialsSection from "@/components/landing/ClientTestimonials";
import PressBanner from "@/components/landing/EconomicTimesBanner";
import HeroSection from "@/components/landing/HeroSection";
import HomePromoBento from "@/components/landing/HomePromoBento";
import PopularSection from "@/components/landing/PopularSection";
import QuickAccessCategories from "@/components/landing/QuickAccessCategories";
import SpotlightSection from "@/components/landing/SpotlightSection";
import BestSellers from "@/components/landing/BestSellers";
import useLandingPageStore from '../stores/landingPageStore';
import WhyChooseUs from '@/components/landing/WhyChooseUs';
import ShowcaseTea from '@/components/landing/ShowcaseTea';
import OrganicHealthBanner from '@/components/landing/OrganicHealthBanner';
import OurStorySection from '@/components/landing/OurStorySection';

const LandingPage = () => {
    const { fetchHeroBanners, fetchFeaturedProducts, featuredProducts, isFeaturedProductsLoading } = useLandingPageStore();

    useEffect(() => {
        fetchHeroBanners();
        fetchFeaturedProducts();
    }, [fetchHeroBanners, fetchFeaturedProducts]);

    return (
        <div className="flex flex-col">
            {/* <Header /> */}
            <HeroSection />
            <QuickAccessCategories />
            <BestSellers products={featuredProducts} isLoading={isFeaturedProductsLoading} />
            <WhyChooseUs />
            <HomePromoBento />
            <PopularSection />
            <ShowcaseTea />
            <OrganicHealthBanner />
            <OurStorySection />
            <SpotlightSection />
            <PressBanner />
            <ClientTestimonialsSection />
        </div>
    )
}

export default LandingPage