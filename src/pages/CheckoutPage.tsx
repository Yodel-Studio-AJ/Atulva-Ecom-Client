import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useCartStore from '../stores/cartStore';
import useCustomerStore from '../stores/customerStore';
import { getAddresses } from '../apis/customerApi';
import type { Address } from '../types/customer';

const CheckoutPage = () => {
    const navigate = useNavigate();
    const { customer } = useCustomerStore();
    const { cart, fetchCart } = useCartStore();

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [selectedId, setSelectedId] = useState<number | null>(null);
    const [loadingAddr, setLoadingAddr] = useState(true);

    useEffect(() => {
        if (!customer) { navigate('/login'); return; }
        if (!cart) fetchCart();
        setLoadingAddr(true);
        getAddresses()
            .then((res) => {
                if (res.success) {
                    setAddresses(res.data);
                    const def = res.data.find((a) => a.is_default);
                    if (def) setSelectedId(def.id);
                    else if (res.data.length > 0) setSelectedId(res.data[0].id);
                }
            })
            .finally(() => setLoadingAddr(false));
    }, [customer]);

    const fmt = (n: number) => `₹${n.toFixed(2)}`;

    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-4 font-poppins">
                <p className="text-gray-500 text-sm">Your cart is empty.</p>
                <Link to="/" className="text-sm text-gray-900 font-medium hover:underline">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto px-4 py-8 font-poppins">
            <button onClick={() => navigate('/cart')} className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-900 mb-6 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Cart
            </button>

            <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

            <div className="flex flex-col lg:flex-row gap-8">

                {/* Address selection */}
                <div className="flex-1">
                    <h2 className="text-base font-semibold text-gray-900 mb-4">Delivery Address</h2>

                    {loadingAddr ? (
                        <p className="text-sm text-gray-400">Loading addresses...</p>
                    ) : addresses.length === 0 ? (
                        /* ── No addresses ── */
                        <div className="flex flex-col items-center justify-center text-center gap-4 p-8 border-2 border-dashed border-gray-200 rounded-2xl">
                            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-gray-800 mb-1">No saved addresses</p>
                                <p className="text-xs text-gray-400 mb-4">Add a delivery address to continue with checkout.</p>
                                <Link
                                    to="/profile"
                                    state={{ scrollToAddresses: true }}
                                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
                                >
                                    + Add Address
                                </Link>
                            </div>
                        </div>
                    ) : (
                        /* ── Address list ── */
                        <div className="space-y-3">
                            {addresses.map((addr) => (
                                <label
                                    key={addr.id}
                                    className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-colors ${selectedId === addr.id ? 'border-gray-900 bg-gray-50' : 'border-gray-100 hover:border-gray-300'}`}
                                >
                                    <input
                                        type="radio"
                                        name="address"
                                        value={addr.id}
                                        checked={selectedId === addr.id}
                                        onChange={() => setSelectedId(addr.id)}
                                        className="mt-1 accent-gray-900"
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-0.5">
                                            <p className="text-sm font-semibold text-gray-900">{addr.name}</p>
                                            {addr.is_default && (
                                                <span className="text-[10px] bg-gray-900 text-white px-2 py-0.5 rounded-full">Default</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-500">
                                            {addr.address_line_1}
                                            {addr.address_line_2 && `, ${addr.address_line_2}`}
                                            {addr.landmark && `, Near ${addr.landmark}`}
                                        </p>
                                        <p className="text-xs text-gray-500">{addr.city}, {addr.state} – {addr.pin}</p>
                                        <p className="text-xs text-gray-500">{addr.country}</p>
                                    </div>
                                </label>
                            ))}

                            <Link
                                to="/profile"
                                state={{ scrollToAddresses: true }}
                                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mt-2 transition-colors"
                            >
                                <span className="text-lg leading-none">+</span> Add new address
                            </Link>
                        </div>
                    )}
                </div>

                {/* Order summary */}
                <div className="lg:w-80 space-y-4">
                    <div className="p-5 border border-gray-100 rounded-xl space-y-3">
                        <p className="text-sm font-semibold text-gray-900 mb-1">Order Summary</p>

                        <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                            {cart.items.map((item) => (
                                <div key={item.id} className="flex items-center gap-3">
                                    <img src={item.product.primary_image} alt={item.product.name} className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xs text-gray-700 truncate">{item.product.name}</p>
                                        <p className="text-xs text-gray-400">Qty: {item.quantity}</p>
                                    </div>
                                    <span className="text-xs font-medium text-gray-900 shrink-0">{fmt(item.line_total)}</span>
                                </div>
                            ))}
                        </div>

                        <hr className="border-gray-100" />

                        <div className="space-y-1.5 text-sm">
                            <div className="flex justify-between text-gray-500">
                                <span>Subtotal</span>
                                <span>{fmt(cart.total_before_discount)}</span>
                            </div>
                            {cart.discount && (
                                <div className="flex justify-between text-green-600">
                                    <span>Discount ({cart.discount.code})</span>
                                    <span>−{fmt(cart.discount.amount)}</span>
                                </div>
                            )}
                            {cart.tax_breakdown.map((tax) => (
                                <div key={tax.id} className="flex justify-between text-gray-400 text-xs">
                                    <span>{tax.name}</span>
                                    <span>{fmt(tax.amount)}</span>
                                </div>
                            ))}
                            <div className="flex justify-between text-gray-500">
                                <span>Delivery</span>
                                <span>{cart.delivery_charge.amount === 0 ? 'Free' : fmt(cart.delivery_charge.amount)}</span>
                            </div>
                        </div>

                        <hr className="border-gray-100" />

                        <div className="flex justify-between text-base font-bold text-gray-900">
                            <span>Total</span>
                            <span>{fmt(cart.grand_total)}</span>
                        </div>

                        <button
                            disabled={addresses.length === 0 || !selectedId}
                            className="w-full bg-gray-900 text-white py-3 rounded-xl text-sm font-semibold hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors mt-1"
                        >
                            Place Order
                        </button>

                        {addresses.length === 0 && (
                            <p className="text-xs text-center text-gray-400">Add a delivery address to place your order.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
