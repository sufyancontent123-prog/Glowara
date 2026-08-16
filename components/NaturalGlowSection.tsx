'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function NaturalGlowSection() {
  const { products, addToCart, setQuickViewProduct } = useStore();

  const peachSerum = products.find((p) => p.id === 'prod-peach-70-serum') || products[0];

  const handleShopSerum = () => {
    if (peachSerum) {
      setQuickViewProduct(peachSerum);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Floating 70% Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-pink-900/10 border-4 border-pink-50">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=900&auto=format&fit=crop"
                alt="Model using Peach 70 Niacin Serum"
                className="w-full h-full object-cover"
              />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-pink-100 flex items-center gap-3.5"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-100 text-pink-600 font-extrabold text-sm flex items-center justify-center shrink-0 border border-pink-200">
                  70%
                </div>
                <div>
                  <h5 className="font-serif font-bold text-zinc-900 text-sm">
                    Peach Extract
                  </h5>
                  <p className="text-xs text-zinc-500 font-medium">Maximum Efficacy</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Copy, Checkmarks & Action */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DEEP HYDRATION</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-6">
              Unlock Your <br />
              <span className="italic font-serif font-normal text-pink-600">
                Natural Glow
              </span>
            </h2>

            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed mb-8 font-light">
              Experience the transformative power of our Peach 70 Niacin Serum. Formulated with premium natural ingredients, it instantly revitalizes dull skin, leaving you with a radiant, glass-skin finish that lasts all day.
            </p>

            {/* Checklist */}
            <div className="space-y-3.5 mb-8 w-full">
              {[
                '70% Natural Peach Extract for deep nourishment',
                'Niacinamide (Vitamin B3) for a brighter complexion',
                'Lightweight texture for instant absorption',
                'Dermatologist tested for all skin types'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-pink-50 text-pink-600 border border-pink-200 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-zinc-700">{item}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                id="shop-peach-serum-btn"
                onClick={handleShopSerum}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm shadow-lg shadow-zinc-900/15 transition-all duration-200"
              >
                <span>Shop This Serum</span>
                <ArrowRight className="w-4 h-4 text-pink-400" />
              </motion.button>

              <button
                onClick={() => peachSerum && addToCart(peachSerum)}
                className="px-6 py-4 rounded-full bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold text-sm transition-colors border border-pink-200"
              >
                Quick Add (${peachSerum.price.toFixed(2)})
              </button>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
