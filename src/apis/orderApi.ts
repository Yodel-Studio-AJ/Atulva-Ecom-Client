import apiClient from '../utils/apiClient';
import type { Order } from '../types/order';

export const initiateOrder = (address_id: number) =>
    apiClient.post('/customer/orders/initiate', { address_id }).then(r => r.data as {
        success: boolean;
        data: { razorpay_order_id: string; amount: number; currency: string; key_id: string };
    });

export const verifyOrder = (payload: {
    address_id: number;
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}) =>
    apiClient.post('/customer/orders/verify', payload).then(r => r.data as { success: boolean; data: Order });

export const getMyOrders = (page = 1) =>
    apiClient.get(`/customer/orders?page=${page}`).then(r => r.data as {
        success: boolean;
        data: { orders: Order[]; total: number; page: number; limit: number };
    });

export const getMyOrder = (id: number) =>
    apiClient.get(`/customer/orders/${id}`).then(r => r.data as { success: boolean; data: Order });
