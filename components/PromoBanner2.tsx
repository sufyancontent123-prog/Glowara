'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Gift, ArrowRight } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function PromoBanner2() {
  const { applyDiscountCode } = useStore();

  const handleSaleClick = () => {
    applyDiscountCode('GLOW30');
    const el = document.getElementById('best-sellers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-rose-500 via-pink-500 to-pink-600 text-white p-8 sm:p-12 shadow-xl shadow-pink-900/10"
      >
        {/* Background product bottle cluster */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          
          <div className="md:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-xs rounded-2xl overflow-hidden shadow-xl border-2 border-white/40">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=700&auto=format&fit=crop"
                alt="Luxury skincare collection bottles"
                className="w-full h-48 sm:h-56 object-cover"
              />
            </div>
          </div>

          <div className="md:col-span-7 flex flex-col items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-4">
              <Gift className="w-3.5 h-3.5" />
              <span>Limited Time Offer</span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-3">
              Up to 30% OFF
            </h3>

            <p className="text-pink-100 text-sm sm:text-base font-light mb-6">
              On Top Beauty &amp; Wellness Brands. Applies automatically at checkout with code <strong className="text-white">GLOW30</strong>.
            </p>

            <button
              onClick={handleSaleClick}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-white hover:bg-pink-50 text-pink-700 font-bold text-xs uppercase tracking-wider shadow-lg transition-all"
            >
              <span>Shop the Sale</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
