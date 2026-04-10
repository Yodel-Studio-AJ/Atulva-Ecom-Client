import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/basic/Navbar';
import Footer from '../components/basic/Footer';
import MapSection from '../components/basic/MapSection';
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
            <Navbar />
            <main>
                <Outlet />
            </main>
            <MapSection />
            <Footer />
        </div>
    );
};

export default ClientLayout;
