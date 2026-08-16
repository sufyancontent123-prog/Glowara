'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, LayoutGrid, Leaf } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function HeroSection() {
  const { settings } = useStore();

  const scrollToShop = () => {
    const el = document.getElementById('best-sellers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    const el = document.getElementById('shop-by-category-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-br from-pink-500 via-rose-500 to-pink-600 text-white min-h-[580px] lg:min-h-[640px] flex items-center">
      {/* Background Decorative Ambient Circles & Petal Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-white/20 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] rounded-full bg-pink-300/30 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-rose-400/40 blur-2xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text & CTA Column */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Top Pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs sm:text-sm font-medium mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
              <span>{settings.heroBadgeText}</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] tracking-tight text-white mb-6">
              Beauty &amp; Wellness <br />
              <span className="italic font-normal font-serif text-pink-100">
                for a Better You
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg text-pink-50 max-w-xl mb-10 leading-relaxed font-light">
              {settings.heroSubtitle}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                id="hero-shop-now-btn"
                onClick={scrollToShop}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-semibold text-sm shadow-xl shadow-pink-900/20 border border-white/20 transition-all duration-200"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                id="hero-explore-categories-btn"
                onClick={scrollToCategories}
                className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-pink-700 hover:bg-pink-50 font-semibold text-sm shadow-lg shadow-black/5 transition-all duration-200"
              >
                <span>Explore Categories</span>
                <LayoutGrid className="w-4 h-4 text-pink-500" />
              </motion.button>
            </div>
          </motion.div>

          {/* Right Visual Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative flex justify-center items-center"
          >
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden p-2 bg-gradient-to-b from-white/30 to-white/10 backdrop-blur-md shadow-2xl border border-white/30">
              <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=900&auto=format&fit=crop"
                  alt="Radiant glowing beauty model"
                  className="w-full h-full object-cover object-center"
                />
                
                {/* Overlay soft glow gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-pink-950/40 via-transparent to-transparent" />

                {/* Floating Botanical Badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute right-4 top-1/3 bg-white text-zinc-900 rounded-full w-24 h-24 p-3 shadow-xl border border-pink-100 flex flex-col items-center justify-center text-center z-20"
                >
                  <Leaf className="w-5 h-5 text-emerald-600 mb-0.5" />
                  <span className="text-[11px] font-extrabold uppercase tracking-tight text-zinc-900 leading-tight">
                    100%
                  </span>
                  <span className="text-[8px] font-semibold text-zinc-500 uppercase tracking-tighter leading-none">
                    Original Products
                  </span>
                </motion.div>

                {/* Floating Bottom Sparkle Pill */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-white/50 text-zinc-900 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-zinc-900">Dermatologist Tested</p>
                      <p className="text-[10px] text-zinc-500">Pure botanicals &amp; active vitamins</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full">
                    ★ 4.9
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
