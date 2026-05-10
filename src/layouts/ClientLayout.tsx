import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useCustomerStore from '../stores/customerStore';
import useCartStore from '../stores/cartStore';

const ClientLayout = () => {
    const { customer, _hasHydrated } = useCustomerStore();
    const { fetchCart } = useCartStore();

    useEffect(() => {
        if (_hasHydrated && customer) fetchCart();
    }, [_hasHydrated, customer, fetchCart]);

    return (
        <div className="min-h-screen bg-white font-poppins">
            <Outlet />
        </div>
    );
};

export default ClientLayout;
