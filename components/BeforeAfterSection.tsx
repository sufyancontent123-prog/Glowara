'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Check } from 'lucide-react';

export default function BeforeAfterSection() {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      handleMove(e.clientX);
    }
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-[#fff5f7] via-[#fef4f7] to-[#fff0f4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Text & Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 flex flex-col items-start"
          >
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>VISIBLE RESULTS</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight mb-6">
              See The <br />
              <span className="italic font-serif font-normal text-pink-600">
                Difference
              </span> In 14 Days
            </h2>

            <p className="text-zinc-600 text-base leading-relaxed mb-8 font-light">
              Our advanced formulas work deep within the skin&apos;s surface to restore your natural radiance. Real customers, real results. Experience a visible reduction in blemishes, enhanced hydration, and a smoother, glowing complexion.
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-4 w-full mb-8">
              <div className="p-5 rounded-2xl bg-white border border-pink-100 shadow-sm">
                <h4 className="font-serif text-3xl sm:text-4xl font-bold text-pink-600 mb-1">
                  98%
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 font-medium">
                  Saw improved hydration
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-pink-100 shadow-sm">
                <h4 className="font-serif text-3xl sm:text-4xl font-bold text-pink-600 mb-1">
                  92%
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 font-medium">
                  Noticed a brighter tone
                </p>
              </div>
            </div>

            {/* Checklist */}
            <div className="space-y-3 w-full">
              {[
                'Evens out skin texture and tone',
                'Deeply hydrates and plumps the skin',
                'Reduces the appearance of fine lines'
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-pink-50 text-pink-600 border border-pink-200 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="text-sm font-medium text-zinc-700">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Interactive Before/After Split Slider */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 relative"
          >
            <div
              ref={containerRef}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onMouseMove={handleMouseMove}
              onTouchMove={handleTouchMove}
              className="relative aspect-[4/3] sm:aspect-[16/11] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white select-none cursor-ew-resize"
            >
              {/* After Image (Background) */}
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=900&auto=format&fit=crop"
                alt="After 14 days radiant glowing skin"
                className="absolute inset-0 w-full h-full object-cover filter brightness-105 saturate-110"
              />

              {/* Before Image (Clipped Overlay with CSS clip-path) */}
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=900&auto=format&fit=crop"
                alt="Before skin condition"
                className="absolute inset-0 w-full h-full object-cover filter contrast-90 brightness-95"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              />

              {/* Top Pill Badges */}
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-zinc-800 text-xs font-bold uppercase tracking-wider shadow-md">
                  BEFORE
                </span>
              </div>

              <div className="absolute top-4 right-4 z-20">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  AFTER 14 DAYS
                </span>
              </div>

              {/* Draggable Divider Bar */}
              <div
                className="absolute top-0 bottom-0 z-20 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                style={{ left: `${sliderPosition}%` }}
              >
                <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white text-pink-600 shadow-xl border-2 border-pink-200 flex items-center justify-center font-bold text-xs">
                  ⇄
                </div>
              </div>

              {/* Bottom Instruction */}
              <div className="absolute bottom-4 inset-x-0 flex justify-center z-20 pointer-events-none">
                <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-white text-[11px] font-medium">
                  Drag slider to compare transformation
                </span>
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
