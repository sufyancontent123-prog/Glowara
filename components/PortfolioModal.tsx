'use client';

import React from 'react';
import { useStore } from '@/context/StoreContext';
import { SAQIB_PORTFOLIO_DATA } from '@/lib/data';
import { motion, AnimatePresence } from 'motion/react';
import { X, Code2, Sparkles, MapPin, Mail, Phone, ExternalLink, CheckCircle2, Award, Laptop, Send } from 'lucide-react';

export default function PortfolioModal() {
  const { isPortfolioModalOpen, setIsPortfolioModalOpen, openContactWithPrefill } = useStore();

  if (!isPortfolioModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsPortfolioModalOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-pink-100 max-h-[90vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={() => setIsPortfolioModalOpen(false)}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/80 hover:bg-white text-zinc-600 hover:text-zinc-900 flex items-center justify-center shadow-md border border-pink-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Header Banner */}
          <div className="bg-gradient-to-r from-pink-600 via-rose-600 to-pink-700 text-white p-6 sm:p-8 relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Creator & Developer Profile</span>
                </div>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-white">
                  {SAQIB_PORTFOLIO_DATA.name}
                </h2>
                <p className="text-pink-100 text-sm font-medium">
                  {SAQIB_PORTFOLIO_DATA.brandName} • {SAQIB_PORTFOLIO_DATA.role}
                </p>
                <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-pink-100">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {SAQIB_PORTFOLIO_DATA.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5" /> {SAQIB_PORTFOLIO_DATA.phone}
                  </span>
                  <span className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5" /> {SAQIB_PORTFOLIO_DATA.email}
                  </span>
                </div>
              </div>

              <button
                onClick={() => {
                  setIsPortfolioModalOpen(false);
                  openContactWithPrefill('Hire Saqib for Custom Website / App Project', 'Website Development');
                }}
                className="px-6 py-2.5 rounded-full bg-white text-pink-700 hover:bg-pink-50 font-bold text-xs uppercase tracking-wider shadow-lg transition-transform active:scale-95 flex items-center gap-1.5 shrink-0"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Hire / Collaborate</span>
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 overflow-y-auto space-y-8">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {SAQIB_PORTFOLIO_DATA.stats.map((stat, i) => (
                <div key={i} className="bg-pink-50/60 border border-pink-100 rounded-2xl p-4 text-center">
                  <p className="font-serif font-bold text-2xl text-pink-600">{stat.value}</p>
                  <p className="text-xs text-zinc-600 font-medium mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Skills & Tech Stack */}
            <div>
              <h3 className="font-serif font-bold text-lg text-zinc-900 mb-3 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-pink-600" />
                <span>Technical Capabilities & Mastery</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {SAQIB_PORTFOLIO_DATA.skills.map((skillGroup, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-pink-100 shadow-xs">
                    <h4 className="font-bold text-xs uppercase tracking-wider text-pink-700 mb-2">
                      {skillGroup.category}
                    </h4>
                    <div className="flex flex-wrap gap-1.5">
                      {skillGroup.items.map((item, itemIdx) => (
                        <span
                          key={itemIdx}
                          className="bg-pink-50/80 text-zinc-700 text-[11px] px-2 py-0.5 rounded-md font-medium"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h3 className="font-serif font-bold text-lg text-zinc-900 mb-3 flex items-center gap-2">
                <Laptop className="w-5 h-5 text-pink-600" />
                <span>Featured Engineering Work</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {SAQIB_PORTFOLIO_DATA.featuredProjects.map((proj, pIdx) => (
                  <div
                    key={pIdx}
                    className="p-5 rounded-2xl bg-pink-50/40 border border-pink-100 flex flex-col justify-between hover:border-pink-300 transition-colors"
                  >
                    <div>
                      <span className="text-[10px] font-bold text-pink-600 uppercase tracking-widest block mb-1">
                        {proj.category}
                      </span>
                      <h4 className="font-serif font-bold text-base text-zinc-900 mb-2">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                        {proj.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 pt-2 border-t border-pink-100/60">
                      {proj.tech.map((t, tIdx) => (
                        <span
                          key={tIdx}
                          className="bg-white text-zinc-600 text-[10px] px-2 py-0.5 rounded-md border border-pink-100 font-medium"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to action */}
            <div className="bg-gradient-to-r from-pink-50 via-rose-50 to-pink-50 p-6 rounded-2xl border border-pink-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
              <div>
                <h4 className="font-serif font-bold text-base text-zinc-900">
                  Ready to build something extraordinary?
                </h4>
                <p className="text-xs text-zinc-600 mt-1">
                  Connect with Muhammad Saqib for web development, custom AI solutions, or full-stack architectural design.
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <a
                  href={`https://wa.me/923478936242?text=${encodeURIComponent('Hi Muhammad Saqib, I visited Glowora and would like to discuss a project with Saqib Visuals.')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  WhatsApp
                </a>
                <button
                  onClick={() => {
                    setIsPortfolioModalOpen(false);
                    openContactWithPrefill('Inquiry for Saqib Visuals', 'Website Development');
                  }}
                  className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-full text-xs font-bold uppercase tracking-wider transition-colors"
                >
                  Message
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
