import { create } from 'zustand';
import type { CartSummary } from '../types/customer';
import { getCart, addToCart, updateCartItem, removeFromCart, clearCart, applyDiscount, removeDiscount } from '../apis/customerApi';

interface CartState {
    cart: CartSummary | null;
    isLoading: boolean;
    error: string | null;
    fetchCart: () => Promise<void>;
    addItem: (productId: number, quantity?: number) => Promise<void>;
    updateItem: (productId: number, quantity: number) => Promise<void>;
    removeItem: (productId: number) => Promise<void>;
    clearItems: () => Promise<void>;
    applyCode: (code: string) => Promise<void>;
    removeCode: () => Promise<void>;
    clearError: () => void;
    resetCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
    cart: null,
    isLoading: false,
    error: null,

    fetchCart: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await getCart();
            if (res.success) set({ cart: res.data, isLoading: false });
            else set({ isLoading: false });
        } catch {
            set({ isLoading: false });
        }
    },

    addItem: async (productId, quantity = 1) => {
        set({ isLoading: true, error: null });
        try {
            const res = await addToCart(productId, quantity);
            if (res.success) set({ cart: res.data, isLoading: false });
            else set({ error: res.message || 'Failed to add item', isLoading: false });
        } catch (err) {
            set({ error: err instanceof Error ? err.message : 'Failed to add item', isLoading: false });
            throw err;
        }
    },

    updateItem: async (productId, quantity) => {
        set({ isLoading: true, error: null });
        try {
            const res = await updateCartItem(productId, quantity);
            if (res.success) set({ cart: res.data, isLoading: false });
            else set({ error: res.message || 'Failed to update item', isLoading: false });
        } catch (err) {
            set({ error: err instanceof Error ? err.message : 'Failed to update item', isLoading: false });
        }
    },

    removeItem: async (productId) => {
        set({ isLoading: true, error: null });
        try {
            const res = await removeFromCart(productId);
            if (res.success) set({ cart: res.data, isLoading: false });
            else set({ isLoading: false });
        } catch {
            set({ isLoading: false });
        }
    },

    clearItems: async () => {
        set({ isLoading: true });
        try {
            const res = await clearCart();
            if (res.success) set({ cart: res.data, isLoading: false });
            else set({ isLoading: false });
        } catch {
            set({ isLoading: false });
        }
    },

    applyCode: async (code) => {
        set({ isLoading: true, error: null });
        try {
            const res = await applyDiscount(code);
            if (res.success) set({ cart: res.data, isLoading: false });
            else set({ error: res.message || 'Invalid discount code', isLoading: false });
        } catch (err) {
            set({ error: err instanceof Error ? err.message : 'Failed to apply discount', isLoading: false });
        }
    },

    removeCode: async () => {
        set({ isLoading: true, error: null });
        try {
            const res = await removeDiscount();
            if (res.success) set({ cart: res.data, isLoading: false });
            else set({ isLoading: false });
        } catch {
            set({ isLoading: false });
        }
    },

    clearError: () => set({ error: null }),
    resetCart: () => set({ cart: null }),
}));

export default useCartStore;
