'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Smile, Hand, Activity, Scissors } from 'lucide-react';

const usageSpots = [
  {
    id: 'facial',
    icon: Smile,
    title: 'Facial Care',
    description: 'Apply it on the face morning and night to lock in moisture before makeup.',
    tag: 'Daily Must',
    position: 'top-right'
  },
  {
    id: 'hands',
    icon: Hand,
    title: 'Hands & Elbows',
    description: 'Apply the serum to hands and elbows to smooth skin and moisturize dry areas.',
    tag: 'Dryness Rescue',
    position: 'bottom-left'
  },
  {
    id: 'neck',
    icon: Activity,
    title: 'Neck & Shoulder',
    description: 'Gently massage upward along the neckline to maintain tone and skin elasticity.',
    tag: 'Firming',
    position: 'bottom-right'
  },
  {
    id: 'hair',
    icon: Scissors,
    title: 'Hair Ends & Cuticles',
    description: 'Rub 1 drop between fingertips to tame flyaways, repair split ends and soften nail beds.',
    tag: 'Gloss Boost',
    position: 'top-left'
  }
];

export default function SerumUsagesSection() {
  const [activeSpot, setActiveSpot] = useState<string>('facial');

  return (
    <section className="py-20 lg:py-28 bg-zinc-50/50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VERSATILE CARE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-4">
            Multiple <span className="italic font-serif font-normal text-pink-600">Usages</span>
          </h2>
          <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
            Discover the versatile benefits of our signature serum. Designed to nourish, hydrate, and revitalize your skin from head to toe.
          </p>
        </div>

        {/* Interactive Orbit Stage */}
        <div className="relative max-w-4xl mx-auto min-h-[480px] sm:min-h-[520px] flex items-center justify-center p-4">
          
          {/* Dashed circular orbit line */}
          <div className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full border-2 border-dashed border-pink-200 pointer-events-none animate-[spin_60s_linear_infinite]" />
          <div className="absolute w-80 h-80 sm:w-[440px] sm:h-[440px] rounded-full border border-pink-100 pointer-events-none" />

          {/* Center Serum Bottle Visual */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="relative z-10 w-48 sm:w-60 aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl shadow-pink-900/10 border-4 border-white bg-white flex flex-col items-center justify-center p-4"
          >
            <img
              src="https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop"
              alt="Glow Serum Hydrate and Radiate bottle"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-x-4 bottom-4 bg-white/90 backdrop-blur-md rounded-xl p-2.5 text-center shadow-md">
              <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 block">
                GLOW SERUM
              </span>
              <span className="text-xs font-serif font-bold text-zinc-900">Hydrate &amp; Radiate</span>
            </div>
          </motion.div>

          {/* 4 Surrounding Interactive Cards (Desktop/Tablet absolute positioning & responsive layout) */}
          <div className="hidden lg:block">
            {usageSpots.map((spot) => {
              const Icon = spot.icon;
              const isSelected = activeSpot === spot.id;
              
              let posClass = '';
              if (spot.position === 'top-right') posClass = 'top-4 right-0';
              if (spot.position === 'bottom-left') posClass = 'bottom-6 left-0';
              if (spot.position === 'bottom-right') posClass = 'bottom-6 right-0';
              if (spot.position === 'top-left') posClass = 'top-4 left-0';

              return (
                <motion.div
                  key={spot.id}
                  whileHover={{ scale: 1.04 }}
                  onClick={() => setActiveSpot(spot.id)}
                  className={`absolute ${posClass} w-72 p-4 rounded-2xl bg-white shadow-xl cursor-pointer transition-all duration-200 border ${
                    isSelected ? 'border-pink-500 ring-2 ring-pink-200 shadow-pink-900/10' : 'border-zinc-100 hover:border-pink-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-pink-500 text-white' : 'bg-pink-50 text-pink-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h4 className="font-serif font-bold text-zinc-900 text-sm">{spot.title}</h4>
                        <span className="text-[9px] font-semibold uppercase px-2 py-0.5 rounded-full bg-pink-50 text-pink-600">
                          {spot.tag}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-600 mt-1 leading-relaxed">{spot.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* Mobile/Tablet Grid Fallback */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden mt-8">
          {usageSpots.map((spot) => {
            const Icon = spot.icon;
            const isSelected = activeSpot === spot.id;
            return (
              <div
                key={spot.id}
                onClick={() => setActiveSpot(spot.id)}
                className={`p-4 rounded-2xl bg-white shadow-md border cursor-pointer ${
                  isSelected ? 'border-pink-500 ring-2 ring-pink-100' : 'border-zinc-100'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-zinc-900 text-sm">{spot.title}</h4>
                    <p className="text-xs text-zinc-600 mt-1">{spot.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
