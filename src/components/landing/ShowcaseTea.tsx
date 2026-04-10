import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface TeaProduct {
    name: string;
    img: string;
    category: string;
    product_id: number;
    slug: string;
}

const categories = ['All', 'Caffeine Free', 'Infusions', 'Mocktail', 'Masala'];

const products: TeaProduct[] = [
    { name: 'Hibiscus Tea', img: 'https://res.cloudinary.com/ddkuoffft/image/upload/q_auto/f_auto/v1775800224/tea_goofmj.png', category: 'Caffeine Free', product_id: 1, slug: 'hibiscus-tea' },
    { name: 'Mango Ginger Tea', img: 'https://res.cloudinary.com/ddkuoffft/image/upload/q_auto/f_auto/v1775800224/tea_goofmj.png', category: 'Infusions', product_id: 2, slug: 'mango-ginger-tea' },
    { name: 'Orange Hibiscus Tea', img: 'https://res.cloudinary.com/ddkuoffft/image/upload/q_auto/f_auto/v1775800224/tea_goofmj.png', category: 'Caffeine Free', product_id: 3, slug: 'orange-hibiscus-tea' },
    { name: 'Ashwagandha Tea', img: 'https://res.cloudinary.com/ddkuoffft/image/upload/q_auto/f_auto/v1775800224/tea_goofmj.png', category: 'Infusions', product_id: 4, slug: 'ashwagandha-tea' },
    { name: 'Masala Tea', img: 'https://res.cloudinary.com/ddkuoffft/image/upload/q_auto/f_auto/v1775800224/tea_goofmj.png', category: 'Masala', product_id: 5, slug: 'masala-tea' },
    { name: 'Berry Burst Tea', img: 'https://res.cloudinary.com/ddkuoffft/image/upload/q_auto/f_auto/v1775800224/tea_goofmj.png', category: 'Mocktail', product_id: 6, slug: 'berry-burst-tea' },
];

export default function ShowcaseTea() {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('All');
    const [centerIndex, setCenterIndex] = useState(0);
    // track direction so items slide in from the correct side
    const [direction, setDirection] = useState(1); // 1 = right, -1 = left

    const filtered = activeCategory === 'All'
        ? products
        : products.filter(p => p.category === activeCategory);

    const handleCategoryChange = (cat: string) => {
        setActiveCategory(cat);
        setCenterIndex(0);
    };

    const prev = () => {
        setDirection(-1);
        setCenterIndex(i => (i - 1 + filtered.length) % filtered.length);
    };
    const next = () => {
        setDirection(1);
        setCenterIndex(i => (i + 1) % filtered.length);
    };

    // Build circular visible window: 5 slots centred on centerIndex
    const SLOTS = Math.min(filtered.length, 5);
    const halfSlots = Math.floor(SLOTS / 2);
    const visible = Array.from({ length: SLOTS }, (_, i) => {
        const offset = i - halfSlots; // -2,-1,0,1,2
        const idx = ((centerIndex + offset) % filtered.length + filtered.length) % filtered.length;
        return { item: filtered[idx], offset };
    });

    return (
        <section className="relative overflow-hidden font-poppins">
            {/* Mountain bg */}
            <img
                src="/bg/mountain.png"
                alt=""
                className="absolute bottom-0 left-0 w-full object-cover object-top z-0 pointer-events-none"
            />

            {/* Girl illustration */}
            <img
                src="/bg/girl.png"
                alt=""
                className="absolute -bottom-20 left-0 h-[320px] md:h-[420px] object-contain z-20 pointer-events-none"
            />

            <img
                src="/bg/house.png"
                alt=""
                className="absolute -bottom-28 right-0 h-[320px] md:h-[320px] object-contain z-20 pointer-events-none"
            />

            <div className="relative max-w-7xl mx-auto px-6 py-10 z-10">
                {/* Heading */}
                <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4 leading-tight">
                    Himalayan Herbal
                </h2>

                {/* Category pills */}
                <div className="flex flex-wrap gap-2 mb-10">
                    {categories.map(cat => (
                        <motion.button
                            key={cat}
                            onClick={() => handleCategoryChange(cat)}
                            whileTap={{ scale: 0.92 }}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-colors duration-200 ${activeCategory === cat
                                ? 'bg-gray-900 text-white border-gray-900'
                                : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
                                }`}
                        >
                            {cat.toUpperCase()}
                        </motion.button>
                    ))}
                </div>

                {/* Product stage */}
                <div className="relative flex items-end justify-center gap-2 md:gap-6 min-h-[300px] md:min-h-[380px]">

                    {/* Left arrow */}
                    <motion.button
                        onClick={prev}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>

                    {/* Products */}
                    <AnimatePresence mode="popLayout" initial={false}>
                        {visible.map(({ item, offset }) => {
                            const isFeatured = offset === 0;
                            const dist = Math.abs(offset);
                            const targetOpacity = dist === 0 ? 1 : dist === 1 ? 0.72 : 0.42;
                            const targetScale = dist === 0 ? 1 : dist === 1 ? 0.82 : 0.65;
                            const zIndex = dist === 0 ? 20 : dist === 1 ? 10 : 5;

                            return (
                                <motion.div
                                    key={item.slug}
                                    layout
                                    initial={{
                                        opacity: 0,
                                        scale: targetScale * 0.7,
                                        x: direction * 120,
                                    }}
                                    animate={{
                                        opacity: targetOpacity,
                                        scale: targetScale,
                                        x: 0,
                                    }}
                                    exit={{
                                        opacity: 0,
                                        scale: targetScale * 0.7,
                                        x: direction * -120,
                                    }}
                                    transition={{ type: 'spring', stiffness: 260, damping: 28 }}
                                    onClick={() => navigate(`/product/${item.slug}`)}
                                    className="flex flex-col items-center cursor-pointer"
                                    style={{ zIndex, transformOrigin: 'bottom center', flexShrink: 0 }}
                                    whileHover={isFeatured ? { scale: 1.05, transition: { type: 'spring', stiffness: 400, damping: 20 } } : {}}
                                >
                                    <motion.img
                                        src={item.img}
                                        alt={item.name}
                                        className="h-[200px] md:h-[280px] object-contain drop-shadow-2xl"
                                        onError={(e) => {
                                            (e.target as HTMLImageElement).src = 'https://placehold.co/160x280?text=Tea';
                                        }}
                                    />

                                    <AnimatePresence mode="wait">
                                        {isFeatured && (
                                            <motion.div
                                                key={item.slug + '-label'}
                                                initial={{ opacity: 0, y: 8 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -8 }}
                                                transition={{ duration: 0.25 }}
                                                className="mt-4 text-center"
                                            >
                                                <p className="text-black font-semibold text-sm md:text-base">{item.name}</p>
                                                <span className="inline-block mt-1.5 text-[11px] text-neutral-700 border border-white/30 rounded-full px-3 py-0.5 shadow-md">
                                                    {item.category}
                                                </span>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>

                    {/* Right arrow */}
                    <motion.button
                        onClick={next}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-9 h-9 md:w-11 md:h-11 rounded-full bg-white shadow-md flex items-center justify-center text-gray-700"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </div>

                {/* Dot indicators */}
                {filtered.length > 1 && (
                    <div className="flex justify-center gap-1.5 mt-6">
                        {filtered.map((_, i) => (
                            <motion.button
                                key={i}
                                onClick={() => {
                                    setDirection(i > centerIndex ? 1 : -1);
                                    setCenterIndex(i);
                                }}
                                animate={{
                                    width: i === centerIndex ? 20 : 8,
                                    backgroundColor: i === centerIndex ? '#ffffff' : 'rgba(255,255,255,0.4)',
                                }}
                                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                                className="h-2 rounded-full"
                            />
                        ))}
                    </div>
                )}

                {/* CTA */}
                <div className="flex justify-center mt-8">
                    <motion.button
                        onClick={() => navigate('/products')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-orange-400 hover:bg-orange-500 text-white font-semibold px-8 py-2.5 rounded-full shadow-lg text-sm"
                    >
                        SHOP ALL TEAS
                    </motion.button>
                </div>
            </div>
        </section>
    );
}
