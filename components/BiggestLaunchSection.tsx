'use client';

import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, ArrowRight, Star } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function BiggestLaunchSection() {
  const { setSelectedCategory } = useStore();

  const handleShopCollection = () => {
    setSelectedCategory('Skin Care');
    const el = document.getElementById('best-sellers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-20 lg:py-28 bg-[#fdfbf9] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Headline, Subtext, Social Proof, CTA */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider mb-4">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>OUR BIGGEST LAUNCH</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-6">
              Massive Results. <br />
              <span className="italic font-serif font-normal text-pink-600">
                Gentle Care.
              </span>
            </h2>

            <p className="text-zinc-600 text-base leading-relaxed mb-8 font-light">
              Experience skincare that makes an outsized difference. The new Elyra collection delivers deep hydration and a radiant glow in every drop. Because your skin deserves nothing but the absolute best.
            </p>

            {/* Social Proof with Avatars & Stars */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex -space-x-2.5">
                <img
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                  alt="Customer avatar"
                />
                <img
                  className="w-10 h-10 rounded-full border-2 border-white object-cover"
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
                  alt="Customer avatar"
                />
                <div className="w-10 h-10 rounded-full border-2 border-white bg-pink-600 text-white font-bold text-[10px] flex items-center justify-center">
                  10k+
                </div>
              </div>

              <div>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs font-semibold text-zinc-800">Happy Customers</p>
              </div>
            </div>

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              id="shop-elyra-collection-btn"
              onClick={handleShopCollection}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm shadow-xl shadow-zinc-900/15 transition-all duration-200"
            >
              <span>Shop The Collection</span>
              <ArrowRight className="w-4 h-4 text-pink-400" />
            </motion.button>
          </motion.div>

          {/* Right Column: Model with Oversized Elyra Tube Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative flex justify-center"
          >
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl bg-white border-4 border-white flex items-center justify-center p-4">
              <img
                src="https://images.unsplash.com/photo-1509967419530-da38b4704bc6?q=80&w=900&auto=format&fit=crop"
                alt="Elyra skincare collection editorial fashion shoot"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute bottom-8 left-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-pink-100 flex items-center justify-between">
                <div>
                  <h4 className="font-serif font-bold text-zinc-900 text-sm">Elyra Hydro-Infusion</h4>
                  <p className="text-[11px] text-zinc-500">72-hr barrier lock formula</p>
                </div>
                <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                  New Arrival
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
