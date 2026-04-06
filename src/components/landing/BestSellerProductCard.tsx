import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/types/landing";

interface BestSellerProductCardProps {
    product: Product;
}

export default function BestSellerProductCard({ product }: BestSellerProductCardProps) {
    const navigate = useNavigate();
    const [hovered, setHovered] = useState(false);
    const price = product.discounted_price || product.price;
    const hasDiscount = !!product.discounted_price;
    const showSecondary = hovered && !!product.secondary_image;

    return (
        <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            className="w-[248px] shrink-0 cursor-pointer font-poppins"
            onClick={() => navigate(`/product/${product.slug}`)}
        >
            {/* Image */}
            <div className="w-[248px] h-[331px] rounded-lg overflow-hidden relative">
                <img
                    src={product.primary_image}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                    style={{ opacity: showSecondary ? 0 : 1 }}
                />
                {product.secondary_image && (
                    <img
                        src={product.secondary_image}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
                        style={{ opacity: showSecondary ? 1 : 0 }}
                    />
                )}
                {hasDiscount && product.discount_percentage && Number(product.discount_percentage) > 0 && (
                    <div className="absolute top-3 left-3 bg-black text-white text-[11px] font-semibold font-poppins px-3 py-1 rounded-full">
                        {Math.round(Number(product.discount_percentage))}% OFF
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="pt-2.5 px-1 font-poppins">
                <div className="flex flex-col mb-2">
                    <p className="text-black text-base font-medium font-poppins leading-snug truncate">
                        {product.name}
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="text-[#898989] text-base font-poppins">₹{price}</span>
                        {hasDiscount && (
                            <span className="text-gray-400 text-xs font-poppins line-through">₹{product.price}</span>
                        )}
                    </div>
                </div>
                <button
                    onClick={(e) => e.stopPropagation()}
                    className="w-full py-2.5 bg-black text-white text-xs font-semibold font-poppins rounded-lg tracking-wide hover:bg-neutral-800 transition-colors"
                >
                    Add to Cart
                </button>
            </div>
        </div>
    );
}
