'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Droplet, Heart, Sparkles, ArrowRight, Check, X } from 'lucide-react';

export default function GlowcareSecretSection() {
  const [isIngredientsModalOpen, setIsIngredientsModalOpen] = useState(false);

  const ingredientsList = [
    { name: 'Centella Asiatica', benefit: 'Calms inflammation and stimulates cellular collagen repair.' },
    { name: 'Triple Hyaluronic Acid', benefit: 'Delivers multi-depth hydration for plump, bouncy skin.' },
    { name: 'Niacinamide (Vitamin B3)', benefit: 'Brightens hyperpigmentation and tightens enlarged pores.' },
    { name: 'Cold-Pressed Argan & Jojoba', benefit: 'Nourishes lipid barrier with essential omega fatty acids.' },
    { name: 'Organic Fermented Peach', benefit: 'Natural AHA enzymes that gently smooth texture and tone.' }
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#fff0f4] via-[#fef7f9] to-[#fff5f7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Image with Floating Premium Quality Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-2xl shadow-pink-900/10 border-4 border-pink-50">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop"
                alt="Model with radiant complexion and refined styling"
                className="w-full h-full object-cover object-center"
              />

              {/* Floating "Premium Quality" Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-pink-100 flex items-center gap-3.5"
              >
                <div className="w-11 h-11 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 border border-pink-100">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-serif font-bold text-zinc-900 text-sm">
                    Premium Quality
                  </h5>
                  <p className="text-xs text-zinc-500 font-medium">Cruelty-free &amp; Organic</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Copy, Features & Action */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            {/* Pill */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE GLOWCARE SECRET</span>
            </div>

            {/* Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-6">
              Nourish Your Skin with <br />
              <span className="italic font-serif font-normal text-pink-600">
                Nature&apos;s Best
              </span>
            </h2>

            {/* Paragraph */}
            <p className="text-zinc-600 text-base sm:text-lg leading-relaxed mb-8 font-light">
              We believe that true beauty stems from healthy, nourished skin. Our products are meticulously crafted combining advanced dermatological science with pure, organic botanicals to bring out your natural glow.
            </p>

            {/* Feature Cards */}
            <div className="w-full space-y-4 mb-8">
              {/* Feature 1 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-pink-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-100">
                  <Droplet className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-zinc-900 text-sm">Deep Hydration Lock</h4>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-0.5 leading-relaxed">
                    Lock in moisture for a plump, youthful appearance all day long. Feel the refreshing difference instantly.
                  </p>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-50 border border-zinc-100 hover:border-pink-200 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 border border-pink-100">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-zinc-900 text-sm">Gentle on Skin</h4>
                  <p className="text-xs sm:text-sm text-zinc-600 mt-0.5 leading-relaxed">
                    Formulated without harsh chemicals, perfect for sensitive skin types, providing nourishment without irritation.
                  </p>
                </div>
              </div>
            </div>

            {/* Discover Ingredients CTA Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              id="discover-ingredients-btn"
              onClick={() => setIsIngredientsModalOpen(true)}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 text-white font-semibold text-sm shadow-lg shadow-zinc-900/10 transition-all duration-200"
            >
              <span>Discover Our Ingredients</span>
              <ArrowRight className="w-4 h-4 text-pink-400" />
            </motion.button>
          </motion.div>

        </div>
      </div>

      {/* Ingredients Modal */}
      <AnimatePresence>
        {isIngredientsModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-pink-100 relative"
            >
              <button
                onClick={() => setIsIngredientsModalOpen(false)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-600 p-2 rounded-full hover:bg-zinc-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2 text-pink-600 font-serif text-sm font-semibold mb-2">
                <Sparkles className="w-4 h-4" />
                <span>CLEAN BOTANICAL ACTIVES</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-2">
                Our Signature Formulation
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 mb-6 leading-relaxed">
                Every bottle from Glowora undergoes rigorous purity testing to ensure 0% parabens, 0% artificial fragrances, and 100% skin compatibility.
              </p>

              <div className="space-y-3 mb-6">
                {ingredientsList.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-pink-50/50 border border-pink-100/60">
                    <div className="w-5 h-5 rounded-full bg-pink-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-zinc-900">{item.name}</h5>
                      <p className="text-[11px] text-zinc-600 mt-0.5">{item.benefit}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsIngredientsModalOpen(false)}
                className="w-full py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold text-xs uppercase tracking-wider rounded-full shadow-md transition-colors"
              >
                Close Formulation Guide
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
