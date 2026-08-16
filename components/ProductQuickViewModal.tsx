'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, Heart, ShoppingBag, Check, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';

export default function ProductQuickViewModal() {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useStore();

  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'benefits' | 'ingredients' | 'usage'>('benefits');

  if (!quickViewProduct) return null;

  const inWishlist = isInWishlist(quickViewProduct.id);

  const handleClose = () => {
    setQuickViewProduct(null);
    setQuantity(1);
    setActiveTab('benefits');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-pink-100 flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/80 hover:bg-white text-zinc-600 hover:text-zinc-900 flex items-center justify-center shadow-md border border-pink-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Column - Product Image */}
          <div className="md:w-1/2 relative bg-gradient-to-br from-pink-50 via-rose-50/50 to-pink-100/40 p-8 flex items-center justify-center overflow-hidden">
            {quickViewProduct.tag && (
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-pink-600 text-white font-bold text-[10px] uppercase tracking-widest rounded-full shadow-sm">
                {quickViewProduct.tag}
              </div>
            )}

            <div className="relative group w-full max-w-xs aspect-square flex items-center justify-center">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </div>

          {/* Right Column - Product Details */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div>
              {/* Category & Badge */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-pink-600 uppercase tracking-widest">
                  {quickViewProduct.category}
                </span>
                {quickViewProduct.volume && (
                  <span className="text-xs text-zinc-500 font-medium bg-pink-50 px-2.5 py-0.5 rounded-full border border-pink-100">
                    {quickViewProduct.volume}
                  </span>
                )}
              </div>

              {/* Title */}
              <h2 className="font-serif font-bold text-zinc-900 text-2xl mb-2 leading-tight">
                {quickViewProduct.name}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(quickViewProduct.rating)
                          ? 'fill-amber-400'
                          : 'fill-zinc-200 text-zinc-200'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs font-bold text-zinc-800">{quickViewProduct.rating}</span>
                <span className="text-xs text-zinc-400">({quickViewProduct.reviewsCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4">
                <span className="font-serif font-bold text-2xl text-zinc-900">
                  ${quickViewProduct.price.toFixed(2)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-zinc-400 line-through">
                    ${quickViewProduct.originalPrice.toFixed(2)}
                  </span>
                )}
                {quickViewProduct.originalPrice && (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                    Save ${(quickViewProduct.originalPrice - quickViewProduct.price).toFixed(2)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-zinc-600 text-xs sm:text-sm leading-relaxed mb-6">
                {quickViewProduct.description}
              </p>

              {/* Tab navigation */}
              <div className="border-b border-pink-100 flex gap-4 text-xs font-bold uppercase tracking-wider mb-3">
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'benefits'
                      ? 'text-pink-600'
                      : 'text-zinc-400 hover:text-zinc-700'
                  }`}
                >
                  Key Benefits
                  {activeTab === 'benefits' && (
                    <motion.div
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('ingredients')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'ingredients'
                      ? 'text-pink-600'
                      : 'text-zinc-400 hover:text-zinc-700'
                  }`}
                >
                  Actives & Formula
                  {activeTab === 'ingredients' && (
                    <motion.div
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600"
                    />
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('usage')}
                  className={`pb-2 transition-colors relative ${
                    activeTab === 'usage'
                      ? 'text-pink-600'
                      : 'text-zinc-400 hover:text-zinc-700'
                  }`}
                >
                  How To Use
                  {activeTab === 'usage' && (
                    <motion.div
                      layoutId="tabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600"
                    />
                  )}
                </button>
              </div>

              {/* Tab content */}
              <div className="min-h-[70px] text-xs text-zinc-600 mb-6">
                {activeTab === 'benefits' && (
                  <ul className="space-y-1.5">
                    {quickViewProduct.benefits?.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                        <span>{benefit}</span>
                      </li>
                    )) || <li>Formulated for maximum gentle hydration and luminous natural glow.</li>}
                  </ul>
                )}

                {activeTab === 'ingredients' && (
                  <div className="flex flex-wrap gap-1.5">
                    {quickViewProduct.ingredients?.map((ing, i) => (
                      <span
                        key={i}
                        className="bg-pink-50 text-zinc-700 px-2.5 py-1 rounded-lg text-[11px] font-medium border border-pink-100"
                      >
                        {ing}
                      </span>
                    )) || <span>Clinical Grade Botanical Actives</span>}
                  </div>
                )}

                {activeTab === 'usage' && (
                  <p className="leading-relaxed">
                    {quickViewProduct.howToUse ||
                      'Apply 2-3 drops to cleansed skin morning and evening. Follow with moisturizer and daytime sunscreen.'}
                  </p>
                )}
              </div>
            </div>

            {/* Actions & Quantity */}
            <div className="space-y-4 pt-4 border-t border-pink-100">
              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-pink-200 rounded-full px-3 py-1.5 bg-pink-50/50">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="text-zinc-600 hover:text-pink-600 font-bold px-1"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-zinc-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="text-zinc-600 hover:text-pink-600 font-bold px-1"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={() => {
                    addToCart(quickViewProduct, quantity);
                    handleClose();
                  }}
                  className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-pink-900/10 transition-transform active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag • ${(quickViewProduct.price * quantity).toFixed(2)}</span>
                </button>

                {/* Wishlist toggle */}
                <button
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`p-3 rounded-full border transition-colors ${
                    inWishlist
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'border-pink-200 hover:bg-pink-50 text-zinc-400'
                  }`}
                  title={inWishlist ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-600' : ''}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-[10px] text-zinc-500 border-t border-pink-50">
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                  <span>100% Authentic</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                  <span>Free Shipping &gt;$50</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-pink-600 shrink-0" />
                  <span>30-Day Returns</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
