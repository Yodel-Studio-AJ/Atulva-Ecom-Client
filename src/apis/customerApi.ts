import apiClient from '../utils/apiClient';
import type { Customer, Address, CartSummary } from '../types/customer';

// ─── Auth ─────────────────────────────────────────────────────────────────────
export const registerCustomer = (data: { name: string; email: string; password: string; phone?: string }) =>
    apiClient.post('/customer/register', data).then(r => r.data);

export const loginCustomer = (data: { email: string; password: string }) =>
    apiClient.post('/customer/login', data).then(r => r.data);

export const getCustomerMe = (): Promise<{ success: boolean; data: Customer }> =>
    apiClient.get('/customer/get-me').then(r => r.data);

export const updateCustomerProfile = (data: { name?: string; phone?: string }) =>
    apiClient.put('/customer/update-profile', data).then(r => r.data);

// ─── Cart ─────────────────────────────────────────────────────────────────────
export const getCart = (): Promise<{ success: boolean; data: CartSummary }> =>
    apiClient.get('/customer/cart').then(r => r.data);

export const addToCart = (productId: number, quantity = 1) =>
    apiClient.post(`/customer/cart/add/${productId}`, { quantity }).then(r => r.data);

export const updateCartItem = (productId: number, quantity: number) =>
    apiClient.put(`/customer/cart/update/${productId}`, { quantity }).then(r => r.data);

export const removeFromCart = (productId: number) =>
    apiClient.delete(`/customer/cart/remove/${productId}`).then(r => r.data);

export const clearCart = () =>
    apiClient.delete('/customer/cart/clear').then(r => r.data);

export const applyDiscount = (code: string) =>
    apiClient.post('/customer/cart/apply-discount', { code }).then(r => r.data);

export const removeDiscount = () =>
    apiClient.delete('/customer/cart/remove-discount').then(r => r.data);

// ─── Addresses ────────────────────────────────────────────────────────────────
export const getAddresses = (): Promise<{ success: boolean; data: Address[] }> =>
    apiClient.get('/customer/addresses').then(r => r.data);

export const addAddress = (data: Omit<Address, 'id' | 'customer_id'>) =>
    apiClient.post('/customer/addresses', data).then(r => r.data);

export const updateAddress = (id: number, data: Partial<Omit<Address, 'id' | 'customer_id'>>) =>
    apiClient.put(`/customer/addresses/${id}`, data).then(r => r.data);

export const deleteAddress = (id: number) =>
    apiClient.delete(`/customer/addresses/${id}`).then(r => r.data);

export const setDefaultAddress = (id: number) =>
    apiClient.patch(`/customer/addresses/${id}/set-default`).then(r => r.data);
