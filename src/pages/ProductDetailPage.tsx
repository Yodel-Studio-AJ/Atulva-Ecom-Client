import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductBySlug, getSimilarProducts } from '@/apis/landingPageApi';
import type { Product } from '@/types/landing';
import BestSellerProductCard from '@/components/landing/BestSellerProductCard';
import useCustomerStore from '@/stores/customerStore';
import useCartStore from '@/stores/cartStore';
import LoginPromptModal from '@/components/basic/LoginPromptModal';

export default function ProductDetailPage() {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const { customer } = useCustomerStore();
    const { cart, addItem, updateItem, removeItem, isLoading: cartLoading } = useCartStore();

    const [product, setProduct] = useState<Product | null>(null);
    const [similar, setSimilar] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState('');
    const [activeTab, setActiveTab] = useState<'details' | 'ingredients' | 'nutrition'>('details');
    const [showLoginModal, setShowLoginModal] = useState(false);

    useEffect(() => {
        if (!slug) return;
        setLoading(true);
        getProductBySlug(slug).then(res => {
            if (res.success && res.data) {
                setProduct(res.data);
                setActiveImage(res.data.primary_image);
                getSimilarProducts({
                    category: res.data.category,
                    sub_category: res.data.sub_category,
                    tags: res.data.tags,
                    excludeSlug: slug,
                }).then(sim => setSimilar(sim.data || []));
            }
        }).finally(() => setLoading(false));
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center font-poppins">
                <div className="w-10 h-10 border-2 border-black border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center font-poppins gap-4">
                <p className="text-xl font-medium text-gray-500">Product not found</p>
                <button onClick={() => navigate('/')} className="underline text-sm text-black">Back to home</button>
            </div>
        );
    }

    const cartItem = cart?.items.find((i) => i.product_id === product?.id);
    const quantity = cartItem?.quantity ?? 0;

    const handleAddToCart = () => {
        if (!customer) { setShowLoginModal(true); return; }
        addItem(product!.id);
    };

    const handleIncrease = () => updateItem(product!.id, quantity + 1);
    const handleDecrease = () => {
        if (quantity <= 1) removeItem(product!.id);
        else updateItem(product!.id, quantity - 1);
    };

    const allImages = [
        product.primary_image,
        ...(product.secondary_image ? [product.secondary_image] : []),
        ...(product.images?.map(i => i.url) || []),
    ];

    const price = product.discounted_price || product.price;
    const hasDiscount = !!product.discounted_price;
    const inStock = (product.stock ?? 1) > 0;

    return (
        <div className="min-h-screen bg-white font-poppins">
            {showLoginModal && (
                <LoginPromptModal
                    onClose={() => setShowLoginModal(false)}
                    redirectAfter={`/product/${slug}`}
                />
            )}
            <div className="max-w-7xl mx-auto px-6 py-10">

                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-xs text-gray-400 mb-8 font-poppins">
                    <button onClick={() => navigate('/')} className="hover:text-black transition-colors">Home</button>
                    <span>/</span>
                    <span className="text-gray-400">{product.category}</span>
                    {product.sub_category && <><span>/</span><span className="text-gray-400">{product.sub_category}</span></>}
                    <span>/</span>
                    <span className="text-black">{product.name}</span>
                </nav>

                {/* Main Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">

                    {/* Images */}
                    <div className="flex gap-4">
                        {/* Thumbnails */}
                        {allImages.length > 1 && (
                            <div className="flex flex-col gap-3">
                                {allImages.map((img, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setActiveImage(img)}
                                        className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors ${activeImage === img ? 'border-black' : 'border-transparent'}`}
                                    >
                                        <img src={img} alt="" className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                        {/* Main Image */}
                        <div className="flex-1 aspect-[3/4] rounded-2xl overflow-hidden bg-neutral-100">
                            <img src={activeImage} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* Info */}
                    <div className="flex flex-col font-poppins">
                        {product.brand && (
                            <span className="text-xs text-gray-400 uppercase tracking-widest mb-2 font-poppins">{product.brand}</span>
                        )}
                        <h1 className="text-3xl font-semibold text-black leading-tight mb-3 font-poppins">{product.name}</h1>

                        {/* Rating */}
                        {product.ratings_count && product.ratings_count > 0 ? (
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex">
                                    {[1, 2, 3, 4, 5].map(s => (
                                        <span key={s} className={`text-sm ${s <= Math.round(Number(product.ratings_average)) ? 'text-yellow-400' : 'text-gray-200'}`}>★</span>
                                    ))}
                                </div>
                                <span className="text-xs text-gray-400 font-poppins">({product.ratings_count} reviews)</span>
                            </div>
                        ) : null}

                        {/* Price */}
                        <div className="flex items-baseline gap-3 mb-5">
                            <span className="text-2xl font-bold text-black font-poppins">₹{price}</span>
                            {hasDiscount && (
                                <>
                                    <span className="text-base text-gray-400 line-through font-poppins">₹{product.price}</span>
                                    <span className="text-sm font-semibold text-green-600 font-poppins">{Math.round(Number(product.discount_percentage))}% off</span>
                                </>
                            )}
                        </div>

                        {/* Tags */}
                        {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-5">
                                {product.tags.map(tag => (
                                    <span key={tag} className="text-xs px-3 py-1 rounded-full bg-neutral-100 text-gray-500 font-poppins">{tag}</span>
                                ))}
                            </div>
                        )}

                        {/* Meta */}
                        <div className="flex flex-col gap-2 mb-6 text-sm font-poppins">
                            {product.weight && (
                                <div className="flex gap-2"><span className="text-gray-400 w-28">Weight</span><span className="text-black">{product.weight}</span></div>
                            )}
                            {product.shelf_life && (
                                <div className="flex gap-2"><span className="text-gray-400 w-28">Shelf Life</span><span className="text-black">{product.shelf_life}</span></div>
                            )}
                            {product.country_of_origin && (
                                <div className="flex gap-2"><span className="text-gray-400 w-28">Origin</span><span className="text-black">{product.country_of_origin}</span></div>
                            )}
                            {product.sku && (
                                <div className="flex gap-2"><span className="text-gray-400 w-28">SKU</span><span className="text-black">{product.sku}</span></div>
                            )}
                        </div>

                        {/* Stock */}
                        <div className="mb-6">
                            <span className={`text-xs font-semibold px-3 py-1 rounded-full font-poppins ${inStock ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>
                                {inStock ? 'In Stock' : 'Out of Stock'}
                            </span>
                        </div>

                        {/* CTA */}
                        <div className="flex gap-3 mb-8">
                            {quantity > 0 ? (
                                <div className="flex-1 flex items-center justify-between bg-black text-white rounded-xl overflow-hidden h-[52px]">
                                    <button
                                        onClick={handleDecrease}
                                        disabled={cartLoading}
                                        className="w-14 h-full flex items-center justify-center text-2xl leading-none hover:bg-white/10 transition-colors disabled:opacity-50"
                                    >
                                        −
                                    </button>
                                    <span className="text-base font-semibold">{quantity}</span>
                                    <button
                                        onClick={handleIncrease}
                                        disabled={cartLoading}
                                        className="w-14 h-full flex items-center justify-center text-2xl leading-none hover:bg-white/10 transition-colors disabled:opacity-50"
                                    >
                                        +
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={handleAddToCart}
                                    disabled={!inStock || cartLoading}
                                    className="flex-1 py-3.5 bg-black text-white text-sm font-semibold font-poppins rounded-xl tracking-wide hover:bg-neutral-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                                >
                                    Add to Cart
                                </button>
                            )}
                            {product.amazon_link && (
                                <a
                                    href={product.amazon_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 py-3.5 border border-black text-black text-sm font-semibold font-poppins rounded-xl tracking-wide hover:bg-neutral-50 transition-colors text-center"
                                >
                                    Buy on Amazon
                                </a>
                            )}
                        </div>

                        {/* Description short */}
                        <p className="text-sm text-gray-500 leading-relaxed font-poppins">{product.description}</p>

                        {/* Key Features */}
                        {product.key_features && product.key_features.length > 0 && (
                            <ul className="mt-5 flex flex-col gap-2">
                                {product.key_features.map((f, i) => (
                                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600 font-poppins">
                                        <span className="mt-0.5 w-4 h-4 rounded-full bg-black text-white text-[10px] flex items-center justify-center shrink-0">✓</span>
                                        {f}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                </div>

                {/* Detail Tabs */}
                {(product.detailed_description || product.ingredients?.length || product.nutrition_info) && (
                    <div className="mb-20">
                        <div className="flex border-b border-neutral-200 mb-6 gap-8">
                            {[
                                { key: 'details', label: 'Details' },
                                ...(product.ingredients?.length ? [{ key: 'ingredients', label: 'Ingredients' }] : []),
                                ...(product.nutrition_info && Object.values(product.nutrition_info).some(Boolean) ? [{ key: 'nutrition', label: 'Nutrition' }] : []),
                            ].map(tab => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key as any)}
                                    className={`pb-3 text-sm font-medium font-poppins transition-colors border-b-2 -mb-px ${activeTab === tab.key ? 'border-black text-black' : 'border-transparent text-gray-400 hover:text-black'}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>

                        {activeTab === 'details' && product.detailed_description && (
                            <p className="text-sm text-gray-600 leading-relaxed max-w-2xl font-poppins">{product.detailed_description}</p>
                        )}

                        {activeTab === 'ingredients' && product.ingredients && (
                            <div className="flex flex-wrap gap-2 max-w-2xl">
                                {product.ingredients.map((ing, i) => (
                                    <span key={i} className="text-sm px-3 py-1.5 bg-neutral-100 rounded-lg text-gray-600 font-poppins">{ing}</span>
                                ))}
                            </div>
                        )}

                        {activeTab === 'nutrition' && product.nutrition_info && (
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
                                {[
                                    { label: 'Calories', value: product.nutrition_info.calories },
                                    { label: 'Fat', value: product.nutrition_info.fat },
                                    { label: 'Carbs', value: product.nutrition_info.carbs },
                                    { label: 'Protein', value: product.nutrition_info.protein },
                                ].filter(n => n.value).map(n => (
                                    <div key={n.label} className="bg-neutral-50 rounded-xl p-4 text-center">
                                        <p className="text-xl font-bold text-black font-poppins">{n.value}</p>
                                        <p className="text-xs text-gray-400 mt-1 font-poppins">{n.label}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {/* Similar Items */}
                {similar.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-semibold text-black mb-6 font-poppins">Similar Items</h2>
                        <div className="flex gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                            {similar.map(p => (
                                <div key={p.id} onClick={() => { navigate(`/product/${p.slug}`); window.scrollTo(0, 0); }}>
                                    <BestSellerProductCard product={p} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
