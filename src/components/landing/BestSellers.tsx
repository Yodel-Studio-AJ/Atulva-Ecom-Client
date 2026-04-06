import type { Product } from "@/types/landing";
import BestSellerProductCard from "./BestSellerProductCard";

interface BestSellersProps {
    products: Product[];
    isLoading: boolean;
}

export default function BestSellers({ products, isLoading }: BestSellersProps) {
    if (!isLoading && products.length === 0) return null;

    return (
        <section className="py-16 font-poppins mx-auto w-full max-w-7xl">
            <h2 className="text-2xl font-semibold text-[#444444] tracking-tight mb-5 font-poppins">
                Best Sellers
            </h2>

            {isLoading ? (
                <div className="flex gap-5">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-[248px] h-[331px] rounded-xl bg-neutral-100 shrink-0 animate-pulse" />
                    ))}
                </div>
            ) : (
                <div className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                    {products.map(product => (
                        <BestSellerProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </section>
    );
}
