'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/context/StoreContext';
import { UserInquiry } from '@/lib/types';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Mail, Phone, MapPin, Sparkles, MessageSquare, CheckCircle2 } from 'lucide-react';

export default function ContactModal() {
  const {
    isContactModalOpen,
    setIsContactModalOpen,
    contactPrefill,
    submitInquiry
  } = useStore();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: contactPrefill.subject || '',
    serviceType: (contactPrefill.serviceType as UserInquiry['serviceType']) || 'Skincare Consultation',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Sync prefill on open when changed
  useEffect(() => {
    if (contactPrefill.subject || contactPrefill.serviceType) {
      const timer = setTimeout(() => {
        setFormData((prev) => ({
          ...prev,
          subject: contactPrefill.subject || prev.subject,
          serviceType: (contactPrefill.serviceType as UserInquiry['serviceType']) || prev.serviceType
        }));
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [contactPrefill]);

  if (!isContactModalOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    const result = await submitInquiry({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      subject: formData.subject || 'General Inquiry',
      serviceType: formData.serviceType,
      message: formData.message
    });

    setIsSubmitting(false);
    if (result.success) {
      setSubmitted(true);
    }
  };

  const handleClose = () => {
    setIsContactModalOpen(false);
    setSubmitted(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-10 flex items-center justify-center">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-pink-100 flex flex-col md:flex-row"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-pink-50 hover:bg-pink-100 text-zinc-600 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Left Column: Direct Info */}
          <div className="md:w-5/12 bg-gradient-to-br from-pink-600 to-rose-700 text-white p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 text-xs font-semibold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Direct Contact</span>
              </div>

              <h3 className="font-serif font-bold text-2xl mb-2 text-white">
                Get In Touch
              </h3>
              <p className="text-pink-100 text-xs sm:text-sm leading-relaxed mb-6">
                Have skincare questions, want a custom routine consultation, or looking to build a high-performance web platform with Muhammad Saqib?
              </p>

              <div className="space-y-4 text-xs text-pink-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-pink-200">WhatsApp / Call</p>
                    <p className="font-semibold text-white">+92 347 8936242</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-pink-200">Direct Email</p>
                    <p className="font-semibold text-white">mrsaqib242242@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-[10px] text-pink-200">Base Location</p>
                    <p className="font-semibold text-white">Faisalabad, Pakistan</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-white/20 text-[11px] text-pink-200">
              ⚡ Real-time database sync: Your inquiry is recorded directly into our management panel.
            </div>
          </div>

          {/* Right Column: Dynamic Form */}
          <div className="md:w-7/12 p-6 sm:p-8">
            {submitted ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-8">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-serif font-bold text-2xl text-zinc-900 mb-2">
                  Message Sent!
                </h4>
                <p className="text-xs sm:text-sm text-zinc-600 max-w-sm mb-6 leading-relaxed">
                  Thank you for reaching out. Your message has been safely saved. Muhammad Saqib will reply directly to your email or WhatsApp.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider shadow-md transition-colors"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-pink-600" />
                  <h4 className="font-serif font-bold text-lg text-zinc-900">Send an Inquiry</h4>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Your Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sara Ali"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="you@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+92 300 0000000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Inquiry Category</label>
                    <select
                      value={formData.serviceType}
                      onChange={(e) => setFormData({ ...formData, serviceType: e.target.value as any })}
                      className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                    >
                      <option value="Skincare Consultation">Skincare Consultation</option>
                      <option value="Order Question">Order Question</option>
                      <option value="Website Development">Website Development</option>
                      <option value="AI Solution">AI Solution</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="Brief description of your query"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-zinc-700 mb-1">Your Message *</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Tell us what you need..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-pink-900/10 transition-transform active:scale-95 disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending...' : 'Send Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
