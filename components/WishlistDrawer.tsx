'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setQuickViewProduct
  } = useStore();

  return (
    <AnimatePresence>
      {isWishlistOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsWishlistOpen(false)}
            className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-pink-100"
            >
              {/* Header */}
              <div className="p-6 border-b border-pink-100 bg-pink-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                    <Heart className="w-4 h-4 fill-pink-600" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-zinc-900 text-lg">
                      Saved Favorites
                    </h3>
                    <p className="text-xs text-zinc-500">{wishlist.length} items saved</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="w-8 h-8 rounded-full bg-white text-zinc-400 hover:text-zinc-700 flex items-center justify-center border border-pink-100 hover:bg-pink-50 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-pink-50">
                {wishlist.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 mb-4">
                      <Heart className="w-10 h-10" />
                    </div>
                    <h4 className="font-serif font-bold text-zinc-900 text-lg mb-2">
                      No saved items yet
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-500 max-w-xs mb-6 leading-relaxed">
                      Tap the heart icon on any serum, cleanser, or moisturizer to save it to your wishlist.
                    </p>
                    <button
                      onClick={() => setIsWishlistOpen(false)}
                      className="px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                    >
                      Explore Products
                    </button>
                  </div>
                ) : (
                  wishlist.map((product) => (
                    <div key={product.id} className="py-4 flex gap-4 items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        onClick={() => {
                          setQuickViewProduct(product);
                          setIsWishlistOpen(false);
                        }}
                        className="w-16 h-16 rounded-xl object-cover bg-pink-50 shrink-0 border border-pink-100 cursor-pointer hover:opacity-90 transition-opacity"
                      />
                      <div className="flex-1 min-w-0">
                        <h4
                          onClick={() => {
                            setQuickViewProduct(product);
                            setIsWishlistOpen(false);
                          }}
                          className="font-serif font-semibold text-zinc-900 text-sm truncate cursor-pointer hover:text-pink-600 transition-colors"
                        >
                          {product.name}
                        </h4>
                        <p className="text-xs text-zinc-400 mb-1">{product.category}</p>
                        <span className="font-serif font-bold text-zinc-900 text-sm">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            addToCart(product, 1);
                          }}
                          className="p-2 rounded-lg bg-pink-50 hover:bg-pink-600 text-pink-600 hover:text-white transition-colors"
                          title="Move to bag"
                        >
                          <ShoppingBag className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="p-2 rounded-lg bg-pink-50 hover:bg-rose-50 text-zinc-400 hover:text-rose-500 transition-colors"
                          title="Remove from favorites"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom */}
              {wishlist.length > 0 && (
                <div className="p-6 border-t border-pink-100 bg-pink-50/30">
                  <button
                    onClick={() => {
                      wishlist.forEach((p) => addToCart(p, 1));
                      setIsWishlistOpen(false);
                    }}
                    className="w-full py-3.5 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add All to Cart</span>
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
