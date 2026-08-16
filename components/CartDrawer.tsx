'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, Plus, Minus, ArrowRight, ShoppingBag, Sparkles, Tag } from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    cartTotal,
    cartCount,
    discountCode,
    discountPercent,
    applyDiscountCode,
    setIsCheckoutModalOpen
  } = useStore();

  const [promoInput, setPromoInput] = React.useState('');

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyDiscountCode(promoInput);
      setPromoInput('');
    }
  };

  const rawSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const discountAmount = (rawSubtotal * discountPercent) / 100;
  const isFreeShipping = cartTotal >= 50;
  const freeShippingThreshold = 50;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const shippingProgress = Math.min(100, (cartTotal / freeShippingThreshold) * 100);

  return (
    <AnimatePresence>
      {isCartOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
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
              {/* Top Header */}
              <div className="p-6 border-b border-pink-100 bg-pink-50/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center">
                    <ShoppingBag className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-zinc-900 text-lg">
                      Your Shopping Bag
                    </h3>
                    <p className="text-xs text-zinc-500">{cartCount} {cartCount === 1 ? 'item' : 'items'}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="text-xs text-zinc-400 hover:text-rose-600 transition-colors p-1"
                      title="Clear entire cart"
                    >
                      Clear
                    </button>
                  )}
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="w-8 h-8 rounded-full bg-white text-zinc-400 hover:text-zinc-700 flex items-center justify-center border border-pink-100 hover:bg-pink-50 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Free Shipping Progress Bar */}
              <div className="px-6 py-3 bg-pink-50/80 border-b border-pink-100">
                <div className="flex items-center justify-between text-xs mb-1.5">
                  {isFreeShipping ? (
                    <span className="font-semibold text-emerald-700 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" />
                      Unlocked FREE Express Delivery!
                    </span>
                  ) : (
                    <span className="text-zinc-600">
                      Add <strong className="text-pink-600">${amountToFreeShipping.toFixed(2)}</strong> more for <strong>FREE Shipping</strong>
                    </span>
                  )}
                  <span className="text-[10px] font-bold text-pink-600">{Math.round(shippingProgress)}%</span>
                </div>
                <div className="w-full h-1.5 bg-pink-200/60 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-rose-500 transition-all duration-500 rounded-full"
                    style={{ width: `${shippingProgress}%` }}
                  />
                </div>
              </div>

              {/* Cart Items List */}
              <div className="flex-1 overflow-y-auto p-6 divide-y divide-pink-50">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center p-6">
                    <div className="w-20 h-20 rounded-full bg-pink-50 flex items-center justify-center text-pink-400 mb-4">
                      <ShoppingBag className="w-10 h-10" />
                    </div>
                    <h4 className="font-serif font-bold text-zinc-900 text-lg mb-2">
                      Your bag is empty
                    </h4>
                    <p className="text-xs sm:text-sm text-zinc-500 max-w-xs mb-6 leading-relaxed">
                      Discover our dermatologist-tested serums, botanical creams, and daily glow essentials.
                    </p>
                    <button
                      onClick={() => setIsCartOpen(false)}
                      className="px-6 py-3 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  cart.map((item) => (
                    <div key={item.product.id} className="py-4 flex gap-4 items-start">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-16 h-16 rounded-xl object-cover bg-pink-50 shrink-0 border border-pink-100"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-serif font-semibold text-zinc-900 text-sm truncate">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-zinc-400 mb-2">{item.product.volume || item.product.category}</p>

                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center gap-1 bg-pink-50/80 border border-pink-100 rounded-lg p-0.5">
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-zinc-600 hover:bg-white hover:text-pink-600 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-6 text-center text-xs font-bold text-zinc-800">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                              className="w-6 h-6 rounded flex items-center justify-center text-zinc-600 hover:bg-white hover:text-pink-600 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <span className="font-serif font-bold text-zinc-900 text-sm">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-zinc-300 hover:text-rose-500 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))
                )}
              </div>

              {/* Bottom Footer Details */}
              {cart.length > 0 && (
                <div className="p-6 border-t border-pink-100 bg-pink-50/30 space-y-4">
                  {/* Coupon Code Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        value={promoInput}
                        onChange={(e) => setPromoInput(e.target.value)}
                        placeholder="Discount code (e.g. GLOW20)"
                        className="w-full bg-white text-xs rounded-xl pl-8 pr-3 py-2.5 border border-pink-200 focus:outline-none focus:ring-1 focus:ring-pink-500 uppercase tracking-wider"
                      />
                      <Tag className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    </div>
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
                    >
                      Apply
                    </button>
                  </form>

                  {/* Summary Breakdown */}
                  <div className="space-y-1.5 text-xs text-zinc-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-zinc-800">${rawSubtotal.toFixed(2)}</span>
                    </div>

                    {discountPercent > 0 && (
                      <div className="flex justify-between text-emerald-600 font-medium">
                        <span>Discount ({discountCode} - {discountPercent}%)</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span className="font-semibold text-zinc-800">
                        {isFreeShipping ? 'FREE' : '$4.99'}
                      </span>
                    </div>

                    <div className="flex justify-between pt-2 border-t border-pink-100 text-sm font-serif font-bold text-zinc-900">
                      <span>Estimated Total</span>
                      <span className="text-pink-600 text-base">
                        ${(cartTotal + (isFreeShipping ? 0 : 4.99)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    id="cart-proceed-checkout-btn"
                    onClick={() => {
                      setIsCartOpen(false);
                      setIsCheckoutModalOpen(true);
                    }}
                    className="w-full py-3.5 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-pink-900/10 transition-all duration-200"
                  >
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-center text-zinc-400">
                    🔒 Guaranteed 256-bit Secure Checkout • 100% Authentic
                  </p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
