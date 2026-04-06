import axios from 'axios';
import type { HeroBanner, Product, ApiResponse } from '../types/landing';

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

export const getFeaturedProducts = async (): Promise<ApiResponse<Product[]>> => {
    try {
        const response = await apiClient.get<ApiResponse<Product[]>>('/public/products?is_featured=true');
        return response.data;
    } catch (error) {
        console.error('Error fetching featured products:', error);
        throw error;
    }
};

export const getProductBySlug = async (slug: string): Promise<ApiResponse<Product>> => {
    try {
        const response = await apiClient.get<ApiResponse<Product>>(`/public/products/${slug}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching product:', error);
        throw error;
    }
};

export const getSimilarProducts = async (params: {
    category: string;
    sub_category?: string;
    tags?: string[];
    excludeSlug: string;
}): Promise<ApiResponse<Product[]>> => {
    try {
        const query = new URLSearchParams({ category: params.category });
        if (params.sub_category) query.set('sub_category', params.sub_category);
        if (params.tags?.length) query.set('tags', params.tags.join(','));
        const response = await apiClient.get<ApiResponse<Product[]>>(`/public/products?${query.toString()}&limit=8`);
        const filtered = (response.data.data || []).filter(p => p.slug !== params.excludeSlug);
        return { ...response.data, data: filtered };
    } catch (error) {
        console.error('Error fetching similar products:', error);
        throw error;
    }
};
