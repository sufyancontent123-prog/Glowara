'use client';

import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { INITIAL_CATEGORIES } from '@/lib/data';
import { useStore } from '@/context/StoreContext';

export default function ShopByCategorySection() {
  const { setSelectedCategory } = useStore();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const el = document.getElementById('best-sellers-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="shop-by-category-section" className="py-20 lg:py-24 bg-gradient-to-b from-[#fff5f7] via-[#fef7f9] to-[#fff0f4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title & Link */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900">
              Shop by Category
            </h2>
            <p className="text-zinc-500 text-sm mt-1">
              Curated collections for every step of your self-care ritual
            </p>
          </div>

          <button
            onClick={() => handleCategoryClick('All')}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 hover:text-pink-700 uppercase tracking-wider group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 5 Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {INITIAL_CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -6 }}
              onClick={() => handleCategoryClick(cat.name)}
              className="cursor-pointer group flex flex-col items-center text-center"
            >
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-300 border border-pink-100 bg-pink-50 mb-3.5">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3 justify-center">
                  <span className="text-[11px] font-bold text-white uppercase tracking-wider bg-pink-600/90 px-2.5 py-1 rounded-full backdrop-blur-sm">
                    Explore
                  </span>
                </div>
              </div>

              <h4 className="font-serif font-bold text-zinc-900 text-base group-hover:text-pink-600 transition-colors">
                {cat.name}
              </h4>
              <p className="text-xs text-zinc-500 mt-0.5">{cat.productsCount}</p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
