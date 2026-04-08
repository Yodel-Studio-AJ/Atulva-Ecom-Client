import axios from 'axios';
import type { Customer, Address, CartSummary } from '../types/customer';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const client = axios.create({ baseURL: API_BASE_URL });

// Attach token to every request
client.interceptors.request.use((config) => {
    const token = localStorage.getItem('customer_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const registerCustomer = (data: { name: string; email: string; password: string; phone?: string }) =>
    client.post('/customer/register', data).then(r => r.data);

export const loginCustomer = (data: { email: string; password: string }) =>
    client.post('/customer/login', data).then(r => r.data);

export const getCustomerMe = (): Promise<{ success: boolean; data: Customer }> =>
    client.get('/customer/get-me').then(r => r.data);

export const updateCustomerProfile = (data: { name?: string; phone?: string }) =>
    client.put('/customer/update-profile', data).then(r => r.data);

// ─── Cart ─────────────────────────────────────────────────────────────────────
export const getCart = (): Promise<{ success: boolean; data: CartSummary }> =>
    client.get('/customer/cart').then(r => r.data);

export const addToCart = (productId: number, quantity = 1) =>
    client.post(`/customer/cart/add/${productId}`, { quantity }).then(r => r.data);

export const updateCartItem = (productId: number, quantity: number) =>
    client.put(`/customer/cart/update/${productId}`, { quantity }).then(r => r.data);

export const removeFromCart = (productId: number) =>
    client.delete(`/customer/cart/remove/${productId}`).then(r => r.data);

export const clearCart = () =>
    client.delete('/customer/cart/clear').then(r => r.data);

export const applyDiscount = (code: string) =>
    client.post('/customer/cart/apply-discount', { code }).then(r => r.data);

export const removeDiscount = () =>
    client.delete('/customer/cart/remove-discount').then(r => r.data);

// ─── Addresses ────────────────────────────────────────────────────────────────
export const getAddresses = (): Promise<{ success: boolean; data: Address[] }> =>
    client.get('/customer/addresses').then(r => r.data);

export const addAddress = (data: Omit<Address, 'id' | 'customer_id'>) =>
    client.post('/customer/addresses', data).then(r => r.data);

export const updateAddress = (id: number, data: Partial<Omit<Address, 'id' | 'customer_id'>>) =>
    client.put(`/customer/addresses/${id}`, data).then(r => r.data);

export const deleteAddress = (id: number) =>
    client.delete(`/customer/addresses/${id}`).then(r => r.data);

export const setDefaultAddress = (id: number) =>
    client.patch(`/customer/addresses/${id}/set-default`).then(r => r.data);
