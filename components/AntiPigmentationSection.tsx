'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Sun, Shield, Layers } from 'lucide-react';
import { useStore } from '@/context/StoreContext';

export default function AntiPigmentationSection() {
  const { products, addToCart, setQuickViewProduct } = useStore();

  const antiPigmentProduct =
    products.find((p) => p.id === 'prod-anti-pigmentation') || products[0];

  return (
    <section className="py-20 lg:py-28 bg-[#faf7f5] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Product Bottle Spotlight */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex flex-col items-center lg:items-start"
          >
            <div className="text-left w-full mb-8">
              <span className="font-serif tracking-[0.25em] text-xs font-bold text-zinc-500 uppercase block mb-1">
                ANTI PIGMENTATION
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-amber-700 uppercase tracking-wide border-b-2 border-amber-600/40 pb-2 inline-block">
                SERUM
              </h2>
            </div>

            <div className="relative w-64 sm:w-72 aspect-[3/4] rounded-3xl bg-white p-4 shadow-xl border border-amber-100 flex flex-col items-center justify-center mb-6">
              <img
                src="https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop"
                alt="Catalyst Anti Pigmentation Serum bottle"
                className="w-full h-full object-cover rounded-2xl"
              />
              <div className="absolute top-3 right-3 bg-amber-50 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-200">
                GLOWPLEX 8
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-amber-100/80 shadow-sm w-full max-w-sm">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
                <Sun className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-zinc-800">
                Helps reduce pigmentation &amp; sun spots
              </span>
            </div>

            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setQuickViewProduct(antiPigmentProduct)}
                className="px-6 py-3 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-bold uppercase tracking-wider transition-colors"
              >
                View Formulation
              </button>
              <button
                onClick={() => addToCart(antiPigmentProduct)}
                className="px-6 py-3 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
              >
                Add To Cart (${antiPigmentProduct.price.toFixed(2)})
              </button>
            </div>
          </motion.div>

          {/* Right Column: 3 Detail Image Arc Collage */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Detail 1: Freckles & Tone */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-lg aspect-[3/4] border-2 border-white group">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop"
                  alt="Targeting dark spots and hyperpigmentation"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 p-3 text-white">
                  <p className="text-xs font-bold">Kojic Acid 2%</p>
                  <p className="text-[10px] text-zinc-300">Inhibits melanin excess</p>
                </div>
              </div>

              {/* Detail 2: Dropper Close-up */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-lg aspect-[3/4] border-2 border-white group">
                <img
                  src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=600&auto=format&fit=crop"
                  alt="Serum droplet absorption"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 p-3 text-white">
                  <p className="text-xs font-bold">Alpha Arbutin 2%</p>
                  <p className="text-[10px] text-zinc-300">Evens patchy complexion</p>
                </div>
              </div>

              {/* Detail 3: Radiant Result */}
              <div className="relative rounded-[2rem] overflow-hidden shadow-lg aspect-[3/4] border-2 border-white group">
                <img
                  src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop"
                  alt="Clear radiant finish"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 p-3 text-white">
                  <p className="text-xs font-bold">Tranexamic Acid</p>
                  <p className="text-[10px] text-zinc-300">Clinical brightening</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
