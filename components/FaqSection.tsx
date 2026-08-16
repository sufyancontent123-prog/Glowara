'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight, HelpCircle } from 'lucide-react';
import { INITIAL_FAQS } from '@/lib/data';
import { useStore } from '@/context/StoreContext';

export default function FaqSection() {
  const { openContactWithPrefill } = useStore();
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const filteredFaqs = INITIAL_FAQS.filter(
    (faq) => activeCategory === 'All' || faq.category === activeCategory
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faqs-section" className="py-20 lg:py-28 bg-gradient-to-b from-[#fff0f4] via-[#fef7f9] to-[#fff5f7]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-50 border border-pink-100 text-pink-600 text-xs font-bold uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>QUICK ANSWERS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-zinc-900 leading-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-500 text-sm mt-2">
            Everything you need to know about Glowora skincare and Saqib Visuals digital services
          </p>
        </div>

        {/* Category Pill Filters */}
        <div className="flex items-center justify-center gap-2 mb-8 flex-wrap">
          {['All', 'Saqib Visuals', 'Skincare & Orders', 'Development Services'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                activeCategory === cat
                  ? 'bg-pink-600 text-white shadow-sm'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Accordion Cards */}
        <div className="space-y-4 mb-8">
          {filteredFaqs.map((faq) => {
            const isOpen = openFaqId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-3xl transition-all duration-200 border ${
                  isOpen
                    ? 'bg-white border-pink-200 shadow-lg shadow-pink-900/5'
                    : 'bg-white border-zinc-100 shadow-sm hover:border-zinc-200'
                }`}
              >
                <button
                  id={`faq-btn-${faq.id}`}
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none"
                >
                  <h4 className="font-serif font-bold text-zinc-900 text-base sm:text-lg">
                    {faq.question}
                  </h4>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-pink-100 text-pink-600' : 'bg-zinc-100 text-zinc-500'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 text-zinc-600 text-sm sm:text-base leading-relaxed border-t border-zinc-50 font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Bottom Contact Trigger */}
        <div className="text-center pt-4">
          <button
            onClick={() => openContactWithPrefill('General Support FAQ Inquiry', 'General Inquiry')}
            className="inline-flex items-center gap-2 text-xs font-bold text-pink-600 hover:text-pink-700 uppercase tracking-wider group"
          >
            <span>Have more questions? View All FAQs or Contact Us</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}
