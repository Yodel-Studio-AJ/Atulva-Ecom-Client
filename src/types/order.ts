export interface OrderItem {
    id: number;
    order_id: number;
    product_id: number | null;
    product_name: string;
    product_sku: string | null;
    product_image: string | null;
    quantity: number;
    unit_price: string;
    unit_mrp: string;
    line_total: string;
    created_at: string;
}

export interface Order {
    id: number;
    order_number: string;
    customer_id: number;
    delivery_address: {
        name: string;
        address_line_1: string;
        address_line_2?: string;
        landmark?: string;
        pin: string;
        city: string;
        state: string;
        country: string;
        is_default: boolean;
    };
    subtotal: string;
    discount_amount: string;
    discount_code: string | null;
    tax_amount: string;
    tax_breakdown: { id: number; name: string; type: string; value: number; amount: number }[];
    delivery_charge: string;
    grand_total: string;
    status: OrderStatus;
    payment_method: string;
    razorpay_order_id: string | null;
    razorpay_payment_id: string | null;
    payment_status: 'pending' | 'paid' | 'failed';
    notes: string | null;
    created_at: string;
    updated_at: string;
    items?: OrderItem[];
}

export type OrderStatus =
    | 'payment_pending'
    | 'placed'
    | 'confirmed'
    | 'packed'
    | 'dispatched'
    | 'out_for_delivery'
    | 'delivered'
    | 'canceled'
    | 'refunded';

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
    payment_pending: 'Payment Pending',
    placed: 'Order Placed',
    confirmed: 'Confirmed',
    packed: 'Packed',
    dispatched: 'Dispatched',
    out_for_delivery: 'Out for Delivery',
    delivered: 'Delivered',
    canceled: 'Canceled',
    refunded: 'Refunded',
};

export const ORDER_STATUS_COLORS: Record<OrderStatus, string> = {
    payment_pending: '#f59e0b',
    placed: '#3b82f6',
    confirmed: '#8b5cf6',
    packed: '#06b6d4',
    dispatched: '#f97316',
    out_for_delivery: '#84cc16',
    delivered: '#22c55e',
    canceled: '#ef4444',
    refunded: '#6b7280',
};
