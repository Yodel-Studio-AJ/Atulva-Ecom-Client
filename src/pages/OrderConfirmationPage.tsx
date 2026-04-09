import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getMyOrder } from '../apis/orderApi';
import type { Order } from '../types/order';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../types/order';

const OrderConfirmationPage = () => {
    const { id } = useParams<{ id: string }>();
    const [order, setOrder] = useState<Order | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!id) return;
        getMyOrder(parseInt(id))
            .then(res => setOrder(res.data))
            .catch(() => setOrder(null))
            .finally(() => setLoading(false));
    }, [id]);

    const fmt = (n: string | number) => `₹${Number(n).toFixed(2)}`;

    if (loading) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex items-center justify-center font-poppins">
                <p className="text-gray-400 text-sm">Loading order...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-4 font-poppins">
                <p className="text-gray-500">Order not found.</p>
                <Link to="/" className="text-sm text-gray-900 font-medium hover:underline">Go Home</Link>
            </div>
        );
    }

    const statusColor = ORDER_STATUS_COLORS[order.status];
    const statusLabel = ORDER_STATUS_LABELS[order.status];

    return (
        <div className="max-w-2xl mx-auto px-4 py-10 font-poppins">
            {/* Success header */}
            <div className="text-center mb-8">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                </div>
                <h1 className="text-2xl font-bold text-gray-900 mb-1">Order Placed!</h1>
                <p className="text-sm text-gray-500">Thank you for your order. We'll get it to you soon.</p>
            </div>

            {/* Order info */}
            <div className="p-5 border border-gray-100 rounded-2xl space-y-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-xs text-gray-400">Order Number</p>
                        <p className="text-sm font-bold text-gray-900">{order.order_number}</p>
                    </div>
                    <span
                        className="text-xs font-semibold px-3 py-1 rounded-full"
                        style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                    >
                        {statusLabel}
                    </span>
                </div>

                <hr className="border-gray-100" />

                {/* Items */}
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Items</p>
                    <div className="space-y-3">
                        {order.items?.map((item) => (
                            <div key={item.id} className="flex items-center gap-3">
                                {item.product_image && (
                                    <img src={item.product_image} alt={item.product_name} className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0" />
                                )}
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm text-gray-800 truncate">{item.product_name}</p>
                                    {item.product_sku && <p className="text-xs text-gray-400">SKU: {item.product_sku}</p>}
                                    <p className="text-xs text-gray-400">Qty: {item.quantity} × {fmt(item.unit_price)}</p>
                                </div>
                                <span className="text-sm font-medium text-gray-900 shrink-0">{fmt(item.line_total)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Price breakdown */}
                <div className="space-y-1.5 text-sm">
                    <div className="flex justify-between text-gray-500">
                        <span>Subtotal</span><span>{fmt(order.subtotal)}</span>
                    </div>
                    {Number(order.discount_amount) > 0 && (
                        <div className="flex justify-between text-green-600">
                            <span>Discount {order.discount_code && `(${order.discount_code})`}</span>
                            <span>−{fmt(order.discount_amount)}</span>
                        </div>
                    )}
                    {order.tax_breakdown?.map((tax, i) => (
                        <div key={i} className="flex justify-between text-gray-400 text-xs">
                            <span>{tax.name}</span><span>{fmt(tax.amount)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between text-gray-500">
                        <span>Delivery</span>
                        <span>{Number(order.delivery_charge) === 0 ? 'Free' : fmt(order.delivery_charge)}</span>
                    </div>
                    <hr className="border-gray-100" />
                    <div className="flex justify-between font-bold text-gray-900">
                        <span>Total Paid</span><span>{fmt(order.grand_total)}</span>
                    </div>
                </div>

                <hr className="border-gray-100" />

                {/* Delivery address */}
                <div>
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Delivery To</p>
                    <p className="text-sm font-semibold text-gray-800">{order.delivery_address.name}</p>
                    <p className="text-xs text-gray-500">
                        {order.delivery_address.address_line_1}
                        {order.delivery_address.address_line_2 && `, ${order.delivery_address.address_line_2}`}
                        {order.delivery_address.landmark && `, Near ${order.delivery_address.landmark}`}
                    </p>
                    <p className="text-xs text-gray-500">
                        {order.delivery_address.city}, {order.delivery_address.state} – {order.delivery_address.pin}
                    </p>
                    <p className="text-xs text-gray-500">{order.delivery_address.country}</p>
                </div>
            </div>

            <div className="flex gap-3 mt-6">
                <Link to="/orders" className="flex-1 text-center py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    My Orders
                </Link>
                <Link to="/" className="flex-1 text-center py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-700 transition-colors">
                    Continue Shopping
                </Link>
            </div>
        </div>
    );
};

export default OrderConfirmationPage;
