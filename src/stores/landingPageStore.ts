import { create } from 'zustand';
import type { HeroBanner } from '../types/landing';
import { getHeroBanners } from '../apis/landingPageApi';

interface LandingPageState {
    heroBanners: HeroBanner[];
    isHeroBannerLoading: boolean;
    error: string | null;
    fetchHeroBanners: () => Promise<void>;
}

const useLandingPageStore = create<LandingPageState>((set) => ({
    heroBanners: [],
    isHeroBannerLoading: false,
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
}));

export default useLandingPageStore;
