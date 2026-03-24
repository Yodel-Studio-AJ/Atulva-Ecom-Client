import axios from 'axios';
import type { HeroBanner, ApiResponse } from '../types/landing';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getHeroBanners = async (): Promise<ApiResponse<HeroBanner[]>> => {
    try {
        const response = await apiClient.get<ApiResponse<HeroBanner[]>>('/api/cms/hero-banners');
        return response.data;
    } catch (error) {
        console.error('Error fetching hero banners:', error);
        throw error;
    }
};
