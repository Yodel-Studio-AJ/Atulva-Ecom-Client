import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyOrders } from '../apis/orderApi';
import type { Order } from '../types/order';
import { ORDER_STATUS_LABELS, ORDER_STATUS_COLORS } from '../types/order';

const OrdersPage = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [total, setTotal] = useState(0);
    const LIMIT = 10;

    useEffect(() => {
        setLoading(true);
        getMyOrders(page)
            .then(res => {
                setOrders(res.data.orders);
                setTotal(res.data.total);
            })
            .finally(() => setLoading(false));
    }, [page]);

    const fmt = (n: string | number) => `₹${Number(n).toFixed(2)}`;
    const totalPages = Math.ceil(total / LIMIT);

    return (
        <div className="max-w-3xl mx-auto px-4 py-8 font-poppins">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">My Orders</h1>

            {loading ? (
                <div className="space-y-4">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="h-24 bg-gray-100 rounded-xl animate-pulse" />
                    ))}
                </div>
            ) : orders.length === 0 ? (
                <div className="flex flex-col items-center justify-center gap-4 py-20">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-400 text-sm">You haven't placed any orders yet.</p>
                    <Link to="/" className="bg-gray-900 text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-700">
                        Start Shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map(order => {
                        const statusColor = ORDER_STATUS_COLORS[order.status];
                        const statusLabel = ORDER_STATUS_LABELS[order.status];
                        return (
                            <Link
                                key={order.id}
                                to={`/order-confirmation/${order.id}`}
                                className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-gray-300 transition-colors"
                            >
                                <div className="min-w-0">
                                    <p className="text-sm font-bold text-gray-900">{order.order_number}</p>
                                    <p className="text-xs text-gray-400 mt-0.5">
                                        {new Date(order.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </p>
                                    <p className="text-xs text-gray-500 mt-1">
                                        {order.delivery_address.city}, {order.delivery_address.state}
                                    </p>
                                </div>
                                <div className="flex flex-col items-end gap-1.5 shrink-0 ml-4">
                                    <span className="text-sm font-bold text-gray-900">{fmt(order.grand_total)}</span>
                                    <span
                                        className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full"
                                        style={{ backgroundColor: `${statusColor}20`, color: statusColor }}
                                    >
                                        {statusLabel}
                                    </span>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            )}

            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 mt-8">
                    <button
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40"
                    >
                        Previous
                    </button>
                    <span className="text-sm text-gray-500">{page} / {totalPages}</span>
                    <button
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="px-4 py-2 text-sm border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrdersPage;
