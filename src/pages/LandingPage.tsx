import { useEffect } from 'react';
import Navbar from '@/components/basic/Navbar';
import MapSection from '@/components/basic/MapSection';
import Footer from '@/components/basic/Footer';
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
import OurStorySection from '@/components/landing/OurStorySection';

const LandingPage = () => {
    const { fetchHeroBanners, fetchFeaturedProducts, featuredProducts, isFeaturedProductsLoading, isHeroBannerLoading } = useLandingPageStore();

    useEffect(() => {
        fetchHeroBanners();
        fetchFeaturedProducts();
    }, [fetchHeroBanners, fetchFeaturedProducts]);

    if (isHeroBannerLoading) {
        return (
            <>
                <div className="h-screen w-screen flex items-center justify-center bg-gray-50">
                    <div className="flex flex-col items-center gap-4">
                        <img src="/images/logo.png" alt="Altuva" className="h-16 object-contain animate-pulse" />
                        <div className="flex gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.3s]" />
                            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:-0.15s]" />
                            <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" />
                        </div>
                    </div>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="flex flex-col">
                {/* <Header /> */}
                <HeroSection />
                <QuickAccessCategories />
                <BestSellers products={featuredProducts} isLoading={isFeaturedProductsLoading} />
                <WhyChooseUs />
                <HomePromoBento />
                <PopularSection />
                <ShowcaseTea />
                {/* <OrganicHealthBanner /> */}
                {/* <div className='h-20'></div> */}
                <OurStorySection />
                <SpotlightSection />
                <PressBanner />
                <ClientTestimonialsSection />
            </div>
            <MapSection />
            <Footer />
        </>
    )
}

export default LandingPage