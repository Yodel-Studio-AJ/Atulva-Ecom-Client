import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useCartStore from '../stores/cartStore';
import useCustomerStore from '../stores/customerStore';

const CartPage = () => {
    const navigate = useNavigate();
    const { customer } = useCustomerStore();
    const { cart, isLoading, error, fetchCart, updateItem, removeItem, clearItems, applyCode, removeCode, clearError } = useCartStore();
    const [discountInput, setDiscountInput] = useState('');

    useEffect(() => {
        if (customer) fetchCart();
    }, [customer, fetchCart]);

    const handleQtyChange = (productId: number, qty: number) => {
        if (qty < 1) return;
        updateItem(productId, qty);
    };

    const handleApplyDiscount = async () => {
        if (!discountInput.trim()) return;
        await applyCode(discountInput.trim().toUpperCase());
        setDiscountInput('');
    };

    const fmt = (n: number) => `₹${n.toFixed(2)}`;

    if (!customer) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-4 font-poppins">
                <p className="text-gray-600">Please login to view your cart.</p>
                <Link to="/login" state={{ from: { pathname: '/cart' } }} className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium">
                    Sign In
                </Link>
            </div>
        );
    }

    if (isLoading && !cart) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center font-poppins">
                <p className="text-gray-500 text-sm">Loading cart...</p>
            </div>
        );
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-4 font-poppins">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <p className="text-gray-500 text-sm">Your cart is empty</p>
                <Link to="/" className="bg-gray-900 text-white px-6 py-2 rounded-lg text-sm font-medium">
                    Continue Shopping
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 font-poppins">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-gray-900">My Cart</h1>
                <button onClick={() => clearItems()} className="text-xs text-red-500 hover:text-red-700">
                    Clear all
                </button>
            </div>

            {error && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center justify-between">
                    <span>{error}</span>
                    <button onClick={clearError} className="text-red-400 hover:text-red-600">✕</button>
                </div>
            )}

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Items */}
                <div className="flex-1 space-y-4">
                    {cart.items.map((item) => (
                        <div key={item.id} className="flex gap-4 p-4 border border-gray-100 rounded-xl">
                            <img
                                src={item.product.primary_image}
                                alt={item.product.name}
                                className="w-20 h-20 object-cover rounded-lg bg-gray-100 cursor-pointer"
                                onClick={() => navigate(`/product/${item.product.slug}`)}
                            />
                            <div className="flex-1 min-w-0">
                                <p
                                    className="text-sm font-medium text-gray-900 truncate cursor-pointer hover:underline"
                                    onClick={() => navigate(`/product/${item.product.slug}`)}
                                >
                                    {item.product.name}
                                </p>
                                {item.product.sku && (
                                    <p className="text-xs text-gray-400 mt-0.5">SKU: {item.product.sku}</p>
                                )}
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="text-sm font-semibold text-gray-900">{fmt(item.unit_price)}</span>
                                    {item.unit_mrp > item.unit_price && (
                                        <span className="text-xs text-gray-400 line-through">{fmt(item.unit_mrp)}</span>
                                    )}
                                </div>

                                <div className="flex items-center justify-between mt-3">
                                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => handleQtyChange(item.product_id, item.quantity - 1)}
                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-lg leading-none"
                                            disabled={isLoading}
                                        >
                                            −
                                        </button>
                                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQtyChange(item.product_id, item.quantity + 1)}
                                            className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-50 text-lg leading-none"
                                            disabled={isLoading}
                                        >
                                            +
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm font-semibold">{fmt(item.line_total)}</span>
                                        <button
                                            onClick={() => removeItem(item.product_id)}
                                            className="text-gray-300 hover:text-red-500"
                                            disabled={isLoading}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="lg:w-80 space-y-4">
                    {/* Discount code */}
                    <div className="p-4 border border-gray-100 rounded-xl">
                        <p className="text-sm font-medium text-gray-700 mb-3">Discount Code</p>
                        {cart.discount ? (
                            <div className="flex items-center justify-between bg-green-50 border border-green-200 rounded-lg px-3 py-2">
                                <div>
                                    <p className="text-xs font-semibold text-green-700">{cart.discount.code}</p>
                                    <p className="text-xs text-green-600">
                                        -{cart.discount.type === 'percentage' ? `${cart.discount.value}%` : fmt(cart.discount.value)} off
                                    </p>
                                </div>
                                <button onClick={() => removeCode()} className="text-green-500 hover:text-green-700 text-xs">
                                    Remove
                                </button>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={discountInput}
                                    onChange={(e) => setDiscountInput(e.target.value.toUpperCase())}
                                    placeholder="Enter code"
                                    className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                    onKeyDown={(e) => e.key === 'Enter' && handleApplyDiscount()}
                                />
                                <button
                                    onClick={handleApplyDiscount}
                                    disabled={isLoading || !discountInput.trim()}
                                    className="px-3 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700 disabled:opacity-50"
                                >
                                    Apply
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Price breakdown */}
                    <div className="p-4 border border-gray-100 rounded-xl space-y-3">
                        <p className="text-sm font-semibold text-gray-900 mb-1">Order Summary</p>

                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Subtotal ({cart.item_count} items)</span>
                            <span>{fmt(cart.total_before_discount)}</span>
                        </div>

                        {cart.discount && (
                            <div className="flex justify-between text-sm text-green-600">
                                <span>Discount ({cart.discount.code})</span>
                                <span>−{fmt(cart.discount.amount)}</span>
                            </div>
                        )}

                        {cart.tax_breakdown.map((tax) => (
                            <div key={tax.id} className="flex justify-between text-sm text-gray-500">
                                <span>{tax.name} ({tax.type === 'percentage' ? `${tax.value}%` : fmt(tax.value)})</span>
                                <span>{fmt(tax.amount)}</span>
                            </div>
                        ))}

                        <div className="flex justify-between text-sm text-gray-600">
                            <span>Delivery ({cart.delivery_charge.name})</span>
                            <span>{cart.delivery_charge.amount === 0 ? 'Free' : fmt(cart.delivery_charge.amount)}</span>
                        </div>

                        <hr className="border-gray-100" />

                        <div className="flex justify-between text-base font-bold text-gray-900">
                            <span>Total</span>
                            <span>{fmt(cart.grand_total)}</span>
                        </div>

                        <button
                            onClick={() => navigate('/checkout')}
                            className="w-full bg-gray-900 text-white py-3 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors mt-2"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
