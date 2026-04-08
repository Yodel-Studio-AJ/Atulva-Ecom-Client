import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Customer } from '../types/customer';
import { loginCustomer, registerCustomer, getCustomerMe, updateCustomerProfile } from '../apis/customerApi';

interface CustomerState {
    customer: Customer | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    _hasHydrated: boolean;
    setHasHydrated: (val: boolean) => void;
    login: (email: string, password: string) => Promise<void>;
    register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<void>;
    logout: () => void;
    fetchMe: () => Promise<void>;
    updateProfile: (data: { name?: string; phone?: string }) => Promise<void>;
    clearError: () => void;
}

const useCustomerStore = create<CustomerState>()(
    persist(
        (set, get) => ({
            customer: null,
            token: null,
            isLoading: false,
            error: null,
            _hasHydrated: false,

            setHasHydrated: (val) => set({ _hasHydrated: val }),

            login: async (email, password) => {
                set({ isLoading: true, error: null });
                try {
                    const res = await loginCustomer({ email, password });
                    if (res.success) {
                        const { token, customer } = res.data;
                        localStorage.setItem('customer_token', token);
                        set({ token, customer, isLoading: false });
                    } else {
                        set({ error: res.message || 'Login failed', isLoading: false });
                    }
                } catch (err) {
                    set({ error: err instanceof Error ? err.message : 'Login failed', isLoading: false });
                    throw err;
                }
            },

            register: async (data) => {
                set({ isLoading: true, error: null });
                try {
                    const res = await registerCustomer(data);
                    if (res.success) {
                        const { token, customer } = res.data;
                        localStorage.setItem('customer_token', token);
                        set({ token, customer, isLoading: false });
                    } else {
                        set({ error: res.message || 'Registration failed', isLoading: false });
                    }
                } catch (err) {
                    set({ error: err instanceof Error ? err.message : 'Registration failed', isLoading: false });
                    throw err;
                }
            },

            logout: () => {
                localStorage.removeItem('customer_token');
                set({ customer: null, token: null });
            },

            fetchMe: async () => {
                const token = get().token;
                if (!token) return;
                try {
                    const res = await getCustomerMe();
                    if (res.success) set({ customer: res.data });
                } catch {
                    set({ customer: null, token: null });
                    localStorage.removeItem('customer_token');
                }
            },

            updateProfile: async (data) => {
                set({ isLoading: true, error: null });
                try {
                    const res = await updateCustomerProfile(data);
                    if (res.success) set({ customer: res.data, isLoading: false });
                    else set({ error: res.message || 'Update failed', isLoading: false });
                } catch (err) {
                    set({ error: err instanceof Error ? err.message : 'Update failed', isLoading: false });
                }
            },

            clearError: () => set({ error: null }),
        }),
        {
            name: 'customer-storage',
            partialize: (state) => ({ token: state.token, customer: state.customer }),
            onRehydrateStorage: () => (state) => {
                state?.setHasHydrated(true);
            },
        }
    )
);

export default useCustomerStore;
