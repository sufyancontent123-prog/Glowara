'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Star } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function PromoBanner1() {
  const { applyDiscountCode } = useStore();

  const scrollToShop = () => {
    applyDiscountCode('GLOW20');
    const el = document.getElementById('best-sellers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-r from-pink-100 via-rose-100 to-pink-200 border border-pink-200/80 p-8 sm:p-12 lg:p-16 shadow-xl shadow-pink-900/5"
      >
        {/* Subtle Background Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/40 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
          
          {/* Left Text */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/80 border border-pink-200 text-pink-600 text-xs font-bold uppercase tracking-wider mb-4 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Glow Every Day</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-4">
              Skincare That <br />
              <span className="italic font-serif font-normal text-pink-600">Loves</span> You Back
            </h2>

            <p className="text-zinc-700 text-sm sm:text-base mb-8 max-w-md leading-relaxed">
              Flat 20% off on our best-selling products with code <strong className="text-pink-700">GLOW20</strong>. Limited time offer!
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              id="promo-banner-shop-btn"
              onClick={scrollToShop}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm shadow-lg shadow-zinc-900/20 transition-all duration-200"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 text-pink-400" />
            </motion.button>
          </div>

          {/* Right Product Image & Trust Metrics */}
          <div className="lg:col-span-6 relative flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-lg border-2 border-white">
              <img
                src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop"
                alt="Aura Rosé serum and Lumina Glow cream"
                className="w-full h-64 sm:h-72 object-cover"
              />
            </div>

            {/* Metric Floating Badges */}
            <div className="flex flex-row sm:flex-col gap-4 w-full sm:w-auto shrink-0 justify-center">
              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-pink-100 shadow-sm text-center sm:text-left min-w-[130px]">
                <h4 className="font-serif text-2xl font-bold text-zinc-900">10K+</h4>
                <p className="text-xs text-zinc-500 font-medium">Happy Customers</p>
              </div>

              <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-pink-100 shadow-sm text-center sm:text-left min-w-[130px]">
                <div className="flex items-center justify-center sm:justify-start gap-1 mb-1 text-pink-500">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-pink-500" />
                  ))}
                </div>
                <h4 className="font-serif text-xl font-bold text-zinc-900">4.8</h4>
                <p className="text-xs text-zinc-500 font-medium">Average Rating</p>
              </div>
            </div>

          </div>

        </div>
      </motion.div>
    </section>
  );
}
