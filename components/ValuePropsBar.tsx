'use client';

import React from 'react';
import { ShieldCheck, UserCheck, Truck, RefreshCw } from 'lucide-react';
import { motion } from 'motion/react';

const valueProps = [
  {
    icon: ShieldCheck,
    title: '100% Original',
    description: 'Authentic & trusted brands'
  },
  {
    icon: UserCheck,
    title: 'Expert Approved',
    description: 'Dermatologically tested'
  },
  {
    icon: Truck,
    title: 'Fast Delivery',
    description: 'At your doorstep'
  },
  {
    icon: RefreshCw,
    title: 'Easy Returns',
    description: 'Hassle-free returns'
  }
];

export default function ValuePropsBar() {
  return (
    <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl shadow-xl shadow-pink-900/5 border border-pink-100 p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-pink-50">
          {valueProps.map((prop, idx) => {
            const Icon = prop.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className={`flex items-center gap-4 ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6' : ''}`}
              >
                <div className="w-12 h-12 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center shrink-0 shadow-sm border border-pink-100">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-zinc-900 text-sm sm:text-base leading-snug">
                    {prop.title}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-0.5">{prop.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
