'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Check, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function EssentialsKitBundleSection() {
  const { products, addToCart } = useStore();

  const bundleProduct =
    products.find((p) => p.id === 'prod-curated-essentials-bundle') || products[0];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-pink-50/50 via-white to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Basket with Skincare products */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-lg aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl bg-gradient-to-tr from-pink-100 to-rose-50 p-6 flex items-center justify-center border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=900&auto=format&fit=crop"
                alt="Curated Skincare Essentials Kit in Pink Basket"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute top-8 right-8 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-pink-600 font-bold text-xs shadow-md uppercase tracking-wider">
                Limited Edition Box
              </div>
            </div>
          </motion.div>

          {/* Right Column: Copy, Checked Points, Price Box, and CTA */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider mb-4">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>THE ULTIMATE BUNDLE</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-4">
              Curated <span className="italic font-serif font-normal text-pink-600">Essentials Kit</span>
            </h2>

            <p className="text-zinc-600 text-base leading-relaxed mb-8 font-light">
              Elevate your daily routine with our handpicked selection of premium skincare essentials. Everything you need for a radiant, healthy glow perfectly bundled in our signature basket.
            </p>

            {/* Checklist items in white cards */}
            <div className="space-y-3 w-full mb-8">
              {[
                'Complete skincare routine in one basket',
                'Dermatologically tested formulations',
                'Travel-friendly packaging',
                'Suitable for all skin types'
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3.5 rounded-2xl bg-white border border-pink-100 shadow-sm"
                >
                  <div className="w-5 h-5 rounded-full bg-pink-50 text-pink-600 border border-pink-200 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-zinc-800">{item}</span>
                </div>
              ))}
            </div>

            {/* Price Box and CTA Button */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                id="grab-kit-btn"
                onClick={() => bundleProduct && addToCart(bundleProduct)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm shadow-xl shadow-zinc-900/15 transition-all duration-200"
              >
                <span>Grab Your Kit Now</span>
                <ArrowRight className="w-4 h-4 text-pink-400" />
              </motion.button>

              {/* Price Tag Pill */}
              <div className="px-6 py-3.5 rounded-2xl bg-pink-50 border border-pink-200 flex flex-col justify-center">
                <span className="text-[10px] text-zinc-500 line-through">Value: $149.99</span>
                <span className="font-serif text-xl font-bold text-pink-600">$89.99</span>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
