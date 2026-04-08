import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '@/apis/landingPageApi';
import type { Product } from '@/types/landing';
import type { ProductQueryParams } from '@/apis/landingPageApi';
import BestSellerProductCard from '@/components/landing/BestSellerProductCard';

const PAGE_SIZE = 24;

const SORT_OPTIONS = [
    { value: 'newest',     label: 'Newest' },
    { value: 'price_asc',  label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
    { value: 'popular',    label: 'Most Popular' },
];

export default function ProductsPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    // Derive state from URL params
    const searchQ    = searchParams.get('search') || '';
    const categoryQ  = searchParams.get('category') || '';
    const sortQ      = (searchParams.get('sort') || 'newest') as ProductQueryParams['sort'];
    const minPriceQ  = searchParams.get('min_price') ? Number(searchParams.get('min_price')) : undefined;
    const maxPriceQ  = searchParams.get('max_price') ? Number(searchParams.get('max_price')) : undefined;
    const pageQ      = Number(searchParams.get('page') || 1);

    const [products, setProducts] = useState<Product[]>([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(true);
    const [filtersOpen, setFiltersOpen] = useState(false);

    // Local filter draft (applied on "Apply")
    const [draftMinPrice, setDraftMinPrice] = useState(minPriceQ?.toString() || '');
    const [draftMaxPrice, setDraftMaxPrice] = useState(maxPriceQ?.toString() || '');

    // Search input — only commits to URL on button click or Enter
    const [searchInput, setSearchInput] = useState(searchQ);

    const setParam = (key: string, value: string | undefined) => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (value) next.set(key, value);
            else next.delete(key);
            next.delete('page'); // reset page on filter change
            return next;
        });
    };

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        try {
            const res = await getProducts({
                search: searchQ || undefined,
                category: categoryQ || undefined,
                sort: sortQ,
                min_price: minPriceQ,
                max_price: maxPriceQ,
                limit: PAGE_SIZE,
                offset: (pageQ - 1) * PAGE_SIZE,
            });
            setProducts(res.data || []);
            setTotal(res.total || 0);
        } catch {
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, [searchQ, categoryQ, sortQ, minPriceQ, maxPriceQ, pageQ]);

    useEffect(() => { fetchProducts(); }, [fetchProducts]);

    const commitSearch = () => {
        setParam('search', searchInput.trim() || undefined);
    };

    const applyPriceFilter = () => {
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            if (draftMinPrice) next.set('min_price', draftMinPrice); else next.delete('min_price');
            if (draftMaxPrice) next.set('max_price', draftMaxPrice); else next.delete('max_price');
            next.delete('page');
            return next;
        });
        setFiltersOpen(false);
    };

    const clearFilters = () => {
        setDraftMinPrice('');
        setDraftMaxPrice('');
        setSearchParams(prev => {
            const next = new URLSearchParams(prev);
            next.delete('category');
            next.delete('min_price');
            next.delete('max_price');
            next.delete('page');
            return next;
        });
    };

    const totalPages = Math.ceil(total / PAGE_SIZE);
    const hasActiveFilters = categoryQ || minPriceQ || maxPriceQ;

    return (
        <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 font-poppins">

            {/* ── Top bar ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-1 w-full flex items-center gap-2">
                    <div className="relative flex-1">
                        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                        </svg>
                        <input
                            type="text"
                            value={searchInput}
                            onChange={e => setSearchInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && commitSearch()}
                            placeholder="Search products…"
                            className="w-full pl-10 pr-9 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        />
                        {searchInput && (
                            <button
                                onClick={() => { setSearchInput(''); setParam('search', undefined); }}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >✕</button>
                        )}
                    </div>
                    <button
                        onClick={commitSearch}
                        className="shrink-0 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
                    >
                        Search
                    </button>
                </div>

                {/* Sort */}
                <select
                    value={sortQ}
                    onChange={e => setParam('sort', e.target.value)}
                    className="shrink-0 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                >
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>

                {/* Filter toggle */}
                <button
                    onClick={() => setFiltersOpen(v => !v)}
                    className={`shrink-0 flex items-center gap-2 px-4 py-2.5 border rounded-xl text-sm font-medium transition-colors ${hasActiveFilters ? 'bg-gray-900 text-white border-gray-900' : 'border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h18M7 8h10M11 12h4" />
                    </svg>
                    Filters {hasActiveFilters ? '•' : ''}
                </button>
            </div>

            {/* ── Filter panel ── */}
            {filtersOpen && (
                <div className="mb-6 p-5 border border-gray-100 rounded-2xl bg-gray-50">
                    <div className="flex flex-wrap gap-6">
                        {/* Price range */}
                        <div className="flex flex-col gap-2 min-w-[180px]">
                            <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">Price Range (₹)</p>
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={draftMinPrice}
                                    onChange={e => setDraftMinPrice(e.target.value)}
                                    className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                                />
                                <span className="text-gray-400 text-sm">–</span>
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={draftMaxPrice}
                                    onChange={e => setDraftMaxPrice(e.target.value)}
                                    className="w-24 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 bg-white"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 mt-5">
                        <button
                            onClick={applyPriceFilter}
                            className="px-5 py-2 bg-gray-900 text-white text-sm rounded-lg hover:bg-gray-700"
                        >
                            Apply
                        </button>
                        {hasActiveFilters && (
                            <button onClick={clearFilters} className="text-sm text-gray-500 hover:text-gray-900">
                                Clear all
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Active filter chips */}
            {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-5">
                    {categoryQ && (
                        <span className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                            {categoryQ}
                            <button onClick={() => setParam('category', undefined)} className="text-gray-400 hover:text-gray-700">✕</button>
                        </span>
                    )}
                    {(minPriceQ || maxPriceQ) && (
                        <span className="flex items-center gap-1.5 text-xs bg-gray-100 text-gray-700 px-3 py-1.5 rounded-full">
                            {minPriceQ ? `₹${minPriceQ}` : '₹0'} – {maxPriceQ ? `₹${maxPriceQ}` : '∞'}
                            <button onClick={() => {
                                setDraftMinPrice(''); setDraftMaxPrice('');
                                setSearchParams(prev => { const n = new URLSearchParams(prev); n.delete('min_price'); n.delete('max_price'); return n; });
                            }} className="text-gray-400 hover:text-gray-700">✕</button>
                        </span>
                    )}
                </div>
            )}

            {/* ── Results header ── */}
            <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-gray-500">
                    {loading ? 'Loading…' : (
                        searchQ
                            ? `${total} result${total !== 1 ? 's' : ''} for "${searchQ}"`
                            : `${total} product${total !== 1 ? 's' : ''}`
                    )}
                </p>
            </div>

            {/* ── Grid ── */}
            {loading ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                    {Array.from({ length: 10 }).map((_, i) => (
                        <div key={i} className="animate-pulse">
                            <div className="w-full aspect-[3/4] rounded-xl bg-gray-100 mb-3" />
                            <div className="h-3 bg-gray-100 rounded w-3/4 mb-2" />
                            <div className="h-3 bg-gray-100 rounded w-1/2" />
                        </div>
                    ))}
                </div>
            ) : products.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-24 gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-14 w-14 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                    </svg>
                    <p className="text-gray-500 text-sm">No products found</p>
                    {hasActiveFilters && (
                        <button onClick={clearFilters} className="text-sm text-gray-900 underline">Clear filters</button>
                    )}
                </div>
            ) : (
                <div className="flex flex-wrap gap-5">
                    {products.map(p => <BestSellerProductCard key={p.id} product={p} />)}
                </div>
            )}

            {/* ── Pagination ── */}
            {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                    <button
                        disabled={pageQ <= 1}
                        onClick={() => setParam('page', String(pageQ - 1))}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        ← Prev
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                        .filter(p => p === 1 || p === totalPages || Math.abs(p - pageQ) <= 2)
                        .reduce<(number | '...')[]>((acc, p, idx, arr) => {
                            if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push('...');
                            acc.push(p);
                            return acc;
                        }, [])
                        .map((p, i) => p === '...' ? (
                            <span key={`ellipsis-${i}`} className="px-2 text-gray-400 text-sm">…</span>
                        ) : (
                            <button
                                key={p}
                                onClick={() => setParam('page', String(p))}
                                className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${pageQ === p ? 'bg-gray-900 text-white' : 'border border-gray-200 text-gray-700 hover:bg-gray-50'}`}
                            >
                                {p}
                            </button>
                        ))}

                    <button
                        disabled={pageQ >= totalPages}
                        onClick={() => setParam('page', String(pageQ + 1))}
                        className="px-4 py-2 border border-gray-200 rounded-lg text-sm hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                        Next →
                    </button>
                </div>
            )}
        </div>
    );
}
