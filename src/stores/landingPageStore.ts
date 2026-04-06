import { create } from 'zustand';
import type { HeroBanner, Product } from '../types/landing';
import { getHeroBanners, getFeaturedProducts } from '../apis/landingPageApi';

interface LandingPageState {
    heroBanners: HeroBanner[];
    isHeroBannerLoading: boolean;
    featuredProducts: Product[];
    isFeaturedProductsLoading: boolean;
    error: string | null;
    fetchHeroBanners: () => Promise<void>;
    fetchFeaturedProducts: () => Promise<void>;
}

const useLandingPageStore = create<LandingPageState>((set) => ({
    heroBanners: [],
    isHeroBannerLoading: false,
    featuredProducts: [],
    isFeaturedProductsLoading: false,
    error: null,

    fetchHeroBanners: async () => {
        set({ isHeroBannerLoading: true, error: null });
        try {
            const response = await getHeroBanners();
            if (response.success && response.data) {
                set({ heroBanners: response.data, isHeroBannerLoading: false });
            } else {
                set({ error: 'Failed to fetch hero banners', isHeroBannerLoading: false });
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to fetch hero banners';
            set({ error: errorMessage, isHeroBannerLoading: false });
        }
    },

    fetchFeaturedProducts: async () => {
        set({ isFeaturedProductsLoading: true });
        try {
            const response = await getFeaturedProducts();
            if (response.success && response.data) {
                set({ featuredProducts: response.data, isFeaturedProductsLoading: false });
            } else {
                set({ isFeaturedProductsLoading: false });
            }
        } catch {
            set({ isFeaturedProductsLoading: false });
        }
    },
}));

export default useLandingPageStore;
