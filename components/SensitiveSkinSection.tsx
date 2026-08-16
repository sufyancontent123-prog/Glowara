'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart, Share2, Star, ShoppingBag } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function SensitiveSkinSection() {
  const { products, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct, addToast } = useStore();

  const sensitiveProducts = products.filter((p) => p.isSensitiveCare);

  const handleShare = (name: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('info', 'Link Copied', `Share link for ${name} copied to clipboard!`);
    }
  };

  return (
    <section id="sensitive-skin-section" className="py-20 lg:py-24 bg-gradient-to-b from-[#fff5f7] via-[#fef4f7] to-[#fff0f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DERMATOLOGIST RECOMMENDED</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900">
              Gentle Care for <span className="italic font-serif font-normal text-pink-600">Sensitive Skin</span>
            </h2>
            <p className="text-zinc-600 text-sm mt-1 max-w-xl">
              Clinically proven formulas that defend against the 5 signs of skin sensitivity. Defend your skin&apos;s natural moisture barrier with our top picks.
            </p>
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('best-sellers-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700 uppercase tracking-wider group shrink-0"
          >
            <span>Shop All Clinical</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Products Grid matching screenshot card design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {sensitiveProducts.map((product, idx) => {
            const isWish = isInWishlist(product.id);
            // Dynamic subtle header pastel background
            const bgHeaderClass =
              idx === 0
                ? 'bg-amber-50/90'
                : idx === 1
                ? 'bg-sky-50/90'
                : 'bg-emerald-50/90';

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg border border-zinc-100 flex flex-col justify-between hover:shadow-xl transition-all duration-300 group"
              >
                {/* Upper Card: Pastel Header + Product Visual */}
                <div className={`relative p-6 ${bgHeaderClass} flex flex-col items-center justify-center min-h-[220px]`}>
                  {/* Top Badges */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-white/90 text-zinc-900 text-[11px] font-bold shadow-sm">
                      {product.tag}
                    </span>
                  </div>

                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <button
                      onClick={() => handleShare(product.name)}
                      className="w-8 h-8 rounded-full bg-white/90 hover:bg-white text-zinc-600 hover:text-zinc-900 flex items-center justify-center shadow-sm transition-colors"
                      title="Share product"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleWishlist(product)}
                      className={`w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-sm transition-colors ${
                        isWish ? 'text-pink-600' : 'text-zinc-600 hover:text-pink-600'
                      }`}
                      title="Save to wishlist"
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWish ? 'fill-pink-600' : ''}`} />
                    </button>
                  </div>

                  {/* Product Bottle */}
                  <div
                    onClick={() => setQuickViewProduct(product)}
                    className="cursor-pointer w-32 h-36 relative flex items-center justify-center group-hover:scale-105 transition-transform duration-300"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain drop-shadow-md"
                    />
                  </div>

                  {/* Rating Pill below image */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs text-zinc-600 bg-white/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
                    <span className="font-bold text-zinc-900">{product.rating}</span>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? 'fill-amber-400 text-amber-400'
                              : 'text-zinc-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-[10px] text-zinc-400">({product.reviewsCount})</span>
                  </div>
                </div>

                {/* Lower Card: Info & Action */}
                <div className="p-6 flex flex-col flex-1 justify-between bg-white">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 block mb-1">
                      {product.subcategory || product.category}
                    </span>
                    <h4
                      onClick={() => setQuickViewProduct(product)}
                      className="font-serif font-bold text-zinc-900 text-base sm:text-lg cursor-pointer hover:text-pink-600 transition-colors line-clamp-1 mb-2"
                    >
                      {product.name}
                    </h4>
                    <p className="text-xs text-zinc-500 line-clamp-2 leading-relaxed mb-4">
                      {product.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <div>
                      <span className="font-serif text-xl font-bold text-zinc-900">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs text-zinc-400 line-through ml-2">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-semibold shadow-md transition-colors"
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
