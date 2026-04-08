export interface Customer {
    id: number;
    name: string;
    email: string;
    phone?: string;
    is_active: boolean;
    created_at: string;
}

export interface Address {
    id: number;
    customer_id: number;
    name: string;
    address_line_1: string;
    address_line_2?: string;
    landmark?: string;
    pin: string;
    city: string;
    state: string;
    country: string;
    is_default: boolean;
}

export interface CartProduct {
    id: number;
    name: string;
    slug: string;
    primary_image: string;
    sku?: string;
    weight?: string;
}

export interface CartItemDetail {
    id: number;
    product_id: number;
    product: CartProduct;
    quantity: number;
    unit_price: number;
    unit_mrp: number;
    line_total: number;
}

export interface TaxLine {
    id: number;
    name: string;
    type: string;
    value: number;
    amount: number;
}

export interface CartSummary {
    cart_id: number;
    items: CartItemDetail[];
    total_before_discount: number;
    discount: { name: string; code: string; type: string; value: number; amount: number } | null;
    total_after_discount: number;
    tax_breakdown: TaxLine[];
    total_tax: number;
    delivery_charge: { name: string; slab: string; amount: number };
    grand_total: number;
    item_count: number;
}
