'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Heart, Share2, Star, ShoppingBag, Eye } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

const filterCategories = [
  'All',
  'Skin Care',
  'Hair Care',
  'Body Care',
  'Makeup',
  'Health & Wellness'
];

export default function BestSellersSection() {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    addToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<string>('All');

  const filteredProducts = products.filter((p) => {
    if (activeTab === 'All') return true;
    return p.category.toLowerCase() === activeTab.toLowerCase();
  });

  const handleShare = (name: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('info', 'Link Copied', `Link for ${name} copied to clipboard!`);
    }
  };

  return (
    <section id="best-sellers-section" className="py-20 lg:py-24 bg-gradient-to-b from-[#fff0f4] via-[#fef7f9] to-[#fff5f7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900">
              Best Sellers
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Our community&apos;s most-loved essentials for everyday glow
            </p>
          </div>

          <button
            onClick={() => setActiveTab('All')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700 uppercase tracking-wider group"
          >
            <span>View All Products</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {filterCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all duration-200 ${
                activeTab === cat
                  ? 'bg-pink-600 text-white shadow-md shadow-pink-600/20'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200/80 hover:text-zinc-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {filteredProducts.map((product, idx) => {
            const isWish = isInWishlist(product.id);

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (idx % 5) * 0.06 }}
                className="group flex flex-col justify-between bg-white rounded-3xl p-3 border border-zinc-100 shadow-sm hover:shadow-xl hover:border-pink-200 transition-all duration-300 relative"
              >
                {/* Product Image Container */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-pink-50/50 mb-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />

                  {/* Top Right Action Icons */}
                  <div className="absolute top-2.5 right-2.5 flex flex-col gap-1.5 z-10">
                    <button
                      onClick={() => handleShare(product.name)}
                      className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-zinc-600 hover:text-zinc-900 flex items-center justify-center shadow-sm transition-colors"
                      title="Share product"
                    >
                      <Share2 className="w-3 h-3" />
                    </button>

                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`w-7 h-7 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-sm transition-colors ${
                        isWish ? 'text-pink-600' : 'text-zinc-600 hover:text-pink-600'
                      }`}
                      title="Add to wishlist"
                    >
                      <Heart className={`w-3 h-3 ${isWish ? 'fill-pink-600' : ''}`} />
                    </button>

                    <button
                      onClick={() => setQuickViewProduct(product)}
                      className="w-7 h-7 rounded-full bg-white/90 hover:bg-white text-zinc-600 hover:text-pink-600 flex items-center justify-center shadow-sm transition-colors"
                      title="Quick view"
                    >
                      <Eye className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Tag badge */}
                  {product.tag && (
                    <div className="absolute bottom-2.5 left-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-white/90 text-zinc-900 text-[10px] font-bold shadow-sm">
                        {product.tag}
                      </span>
                    </div>
                  )}
                </div>

                {/* Product Details */}
                <div className="px-1 flex flex-col flex-1 justify-between">
                  <div>
                    <h4
                      onClick={() => setQuickViewProduct(product)}
                      className="font-serif font-bold text-zinc-900 text-sm hover:text-pink-600 transition-colors cursor-pointer line-clamp-1 mb-0.5"
                    >
                      {product.name}
                    </h4>

                    <p className="text-[11px] text-zinc-400 font-medium mb-1.5">{product.volume}</p>

                    {/* Star Ratings */}
                    <div className="flex items-center gap-1 mb-3">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-zinc-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[10px] text-zinc-400">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Price & Add to Cart */}
                  <div className="pt-2">
                    <div className="flex items-baseline gap-1.5 mb-3">
                      <span className="font-serif font-bold text-base text-zinc-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-zinc-400 line-through">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="w-full py-2.5 px-3 rounded-full bg-pink-50 hover:bg-pink-600 text-pink-600 hover:text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-200 group-hover:shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
