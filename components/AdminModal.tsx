'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { UserInquiry } from '@/lib/types';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  LayoutDashboard,
  MessageSquare,
  Package,
  ShoppingBag,
  Settings,
  Trash2,
  CheckCircle2,
  Clock,
  Archive,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Save,
  Send,
  Plus
} from 'lucide-react';

export default function AdminModal() {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    inquiries,
    updateInquiryStatus,
    deleteInquiryItem,
    refreshInquiries,
    orders,
    updateOrderStatus,
    products,
    refreshProducts,
    settings,
    updateSiteSettings,
    addToast
  } = useStore();

  const [activeTab, setActiveTab] = useState<'inquiries' | 'orders' | 'products' | 'settings'>('inquiries');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryFilter, setInquiryFilter] = useState<'all' | 'new' | 'in_progress' | 'resolved' | 'archived'>('all');
  const [selectedInquiry, setSelectedInquiry] = useState<UserInquiry | null>(null);
  const [replyText, setReplyText] = useState('');

  // Settings State
  const [siteForm, setSiteForm] = useState({
    announcementText: settings.announcementText,
    announcementActive: settings.announcementActive,
    heroBadgeText: settings.heroBadgeText,
    heroTitle: settings.heroTitle,
    heroSubtitle: settings.heroSubtitle,
    promoDiscountPercent: settings.promoDiscountPercent,
    contactEmail: settings.contactEmail,
    contactPhone: settings.contactPhone,
    contactLocation: settings.contactLocation
  });

  if (!isAdminModalOpen) return null;

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.email.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.subject.toLowerCase().includes(inquirySearch.toLowerCase()) ||
      inq.message.toLowerCase().includes(inquirySearch.toLowerCase());
    const matchesFilter = inquiryFilter === 'all' || inq.status === inquiryFilter;
    return matchesSearch && matchesFilter;
  });

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateSiteSettings(siteForm);
  };

  const handleSendReply = async () => {
    if (!selectedInquiry) return;
    await updateInquiryStatus(selectedInquiry.id, 'resolved', replyText);
    setSelectedInquiry(null);
    setReplyText('');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden flex items-center justify-center p-2 sm:p-4 md:p-8">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAdminModalOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 10 }}
          className="relative w-full max-w-6xl h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-pink-100 flex flex-col"
        >
          {/* Top Bar */}
          <div className="px-6 py-4 border-b border-pink-100 bg-pink-50/60 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-pink-600 text-white flex items-center justify-center shadow-md">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-zinc-900 text-lg flex items-center gap-2">
                  <span>Glowora Admin & Content Control</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded-full uppercase">
                    Live Sync
                  </span>
                </h3>
                <p className="text-xs text-zinc-500">
                  Manage customer inquiries, live catalog products, customer orders, and site announcement banner.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  refreshInquiries();
                  refreshProducts();
                  addToast('info', 'Refreshed', 'Database synchronized.');
                }}
                className="p-2 rounded-xl bg-white border border-pink-100 text-zinc-600 hover:text-pink-600 hover:bg-pink-50 transition-colors"
                title="Refresh All Data"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsAdminModalOpen(false)}
                className="w-9 h-9 rounded-xl bg-white border border-pink-100 text-zinc-500 hover:text-zinc-900 flex items-center justify-center hover:bg-pink-50 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="px-6 border-b border-pink-100 bg-white flex gap-6 text-xs font-bold uppercase tracking-wider shrink-0">
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`py-3.5 flex items-center gap-2 relative transition-colors ${
                activeTab === 'inquiries' ? 'text-pink-600' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquiries ({inquiries.length})</span>
              {inquiries.filter((i) => i.status === 'new').length > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center">
                  {inquiries.filter((i) => i.status === 'new').length}
                </span>
              )}
              {activeTab === 'inquiries' && (
                <motion.div
                  layoutId="adminTabLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`py-3.5 flex items-center gap-2 relative transition-colors ${
                activeTab === 'orders' ? 'text-pink-600' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>Orders ({orders.length})</span>
              {activeTab === 'orders' && (
                <motion.div
                  layoutId="adminTabLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`py-3.5 flex items-center gap-2 relative transition-colors ${
                activeTab === 'products' ? 'text-pink-600' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Catalog Products ({products.length})</span>
              {activeTab === 'products' && (
                <motion.div
                  layoutId="adminTabLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600"
                />
              )}
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`py-3.5 flex items-center gap-2 relative transition-colors ${
                activeTab === 'settings' ? 'text-pink-600' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Site Configuration</span>
              {activeTab === 'settings' && (
                <motion.div
                  layoutId="adminTabLine"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600"
                />
              )}
            </button>
          </div>

          {/* Main Tab Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-pink-50/20">
            {/* INQUIRIES TAB */}
            {activeTab === 'inquiries' && (
              <div className="space-y-4">
                {/* Search & Filter Bar */}
                <div className="flex flex-col sm:flex-row gap-3 items-center justify-between bg-white p-3.5 rounded-2xl border border-pink-100 shadow-xs">
                  <div className="relative w-full sm:w-80">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search inquiries..."
                      value={inquirySearch}
                      onChange={(e) => setInquirySearch(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-pink-50/40 border border-pink-100 rounded-xl focus:outline-none focus:ring-1 focus:ring-pink-500"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
                    {(['all', 'new', 'in_progress', 'resolved', 'archived'] as const).map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setInquiryFilter(filter)}
                        className={`px-3 py-1.5 rounded-xl text-[11px] font-semibold capitalize whitespace-nowrap transition-colors ${
                          inquiryFilter === filter
                            ? 'bg-pink-600 text-white shadow-xs'
                            : 'bg-pink-50/60 text-zinc-600 hover:bg-pink-100'
                        }`}
                      >
                        {filter.replace('_', ' ')}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Inquiries Table / Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredInquiries.length === 0 ? (
                    <div className="col-span-full py-12 text-center text-zinc-400 text-xs">
                      No inquiries match your query.
                    </div>
                  ) : (
                    filteredInquiries.map((inq) => {
                      const statusColor =
                        inq.status === 'new'
                          ? 'bg-rose-100 text-rose-700 border-rose-200'
                          : inq.status === 'in_progress'
                          ? 'bg-amber-100 text-amber-700 border-amber-200'
                          : inq.status === 'resolved'
                          ? 'bg-emerald-100 text-emerald-700 border-emerald-200'
                          : 'bg-zinc-100 text-zinc-600 border-zinc-200';

                      return (
                        <div
                          key={inq.id}
                          className="bg-white p-5 rounded-2xl border border-pink-100 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
                        >
                          <div>
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${statusColor}`}>
                                {inq.status.replace('_', ' ')}
                              </span>
                              <span className="text-[10px] text-zinc-400">
                                {new Date(inq.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            <h4 className="font-bold text-zinc-900 text-sm mb-1">{inq.name}</h4>
                            <p className="text-xs text-pink-600 font-medium mb-2">{inq.serviceType}</p>
                            <p className="text-xs text-zinc-700 font-semibold mb-1 line-clamp-1">
                              {inq.subject}
                            </p>
                            <p className="text-xs text-zinc-500 line-clamp-3 mb-3 leading-relaxed">
                              {inq.message}
                            </p>

                            {inq.replySent && (
                              <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-100 text-[11px] text-emerald-800 mb-3">
                                <strong>Reply sent:</strong> {inq.replySent}
                              </div>
                            )}
                          </div>

                          {/* Quick Actions */}
                          <div className="pt-3 border-t border-pink-50 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => updateInquiryStatus(inq.id, 'new')}
                                title="Mark as New"
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-600 hover:bg-rose-50"
                              >
                                <Clock className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => updateInquiryStatus(inq.id, 'in_progress')}
                                title="Mark In Progress"
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-amber-600 hover:bg-amber-50"
                              >
                                <RefreshCw className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => updateInquiryStatus(inq.id, 'resolved')}
                                title="Mark Resolved"
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50"
                              >
                                <CheckCircle2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => updateInquiryStatus(inq.id, 'archived')}
                                title="Archive"
                                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100"
                              >
                                <Archive className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => {
                                  setSelectedInquiry(inq);
                                  setReplyText(inq.replySent || '');
                                }}
                                className="px-2.5 py-1 bg-pink-50 hover:bg-pink-100 text-pink-700 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1"
                              >
                                <Send className="w-3 h-3" />
                                <span>Reply</span>
                              </button>
                              <button
                                onClick={() => deleteInquiryItem(inq.id)}
                                className="p-1.5 rounded-lg text-zinc-300 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* ORDERS TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="bg-white p-12 rounded-3xl border border-pink-100 text-center">
                    <ShoppingBag className="w-12 h-12 text-pink-300 mx-auto mb-3" />
                    <h4 className="font-serif font-bold text-zinc-900 text-lg mb-1">
                      No customer orders yet
                    </h4>
                    <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                      When users complete a checkout from the Glowora store, live order notifications will appear here.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="bg-white p-5 rounded-2xl border border-pink-100 shadow-xs flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-zinc-900 text-sm">Order #{order.id}</span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700 uppercase">
                              {order.status}
                            </span>
                            <span className="text-xs text-zinc-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-zinc-600">
                            <strong>Customer:</strong> {order.customerName} ({order.customerEmail} • {order.customerPhone})
                          </p>
                          <p className="text-xs text-zinc-500">
                            <strong>Shipping Address:</strong> {order.shippingAddress}, {order.city}
                          </p>
                          <div className="flex flex-wrap gap-2 pt-1">
                            {order.items.map((item, i) => (
                              <span key={i} className="text-[11px] bg-pink-50 text-zinc-700 px-2 py-0.5 rounded-md border border-pink-100">
                                {item.quantity}x {item.productName} (${item.price})
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          <div className="text-right">
                            <p className="text-[10px] text-zinc-400 uppercase">Total Amount</p>
                            <p className="font-serif font-bold text-base text-pink-600">
                              ${order.totalAmount.toFixed(2)}
                            </p>
                            <p className="text-[10px] text-zinc-500">{order.paymentMethod}</p>
                          </div>

                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.id, e.target.value as any)}
                            className="bg-pink-50 border border-pink-200 text-xs font-semibold rounded-xl px-3 py-2 text-zinc-800 focus:outline-none"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* PRODUCTS TAB */}
            {activeTab === 'products' && (
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-2xl border border-pink-100 flex items-center justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-zinc-900 text-base">Active Store Catalog</h4>
                    <p className="text-xs text-zinc-500">Current skincare & beauty inventory</p>
                  </div>
                  <span className="text-xs bg-pink-100 text-pink-700 font-bold px-3 py-1 rounded-full">
                    {products.length} Products Live
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {products.map((prod) => (
                    <div
                      key={prod.id}
                      className="bg-white rounded-2xl border border-pink-100 p-4 flex flex-col justify-between shadow-xs"
                    >
                      <div>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-full h-36 object-cover rounded-xl bg-pink-50 mb-3"
                        />
                        <span className="text-[10px] font-bold text-pink-600 uppercase tracking-wider block">
                          {prod.category}
                        </span>
                        <h5 className="font-serif font-bold text-zinc-900 text-xs truncate mb-1">
                          {prod.name}
                        </h5>
                        <p className="text-[11px] text-zinc-500 line-clamp-2 mb-2">
                          {prod.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-pink-50">
                        <span className="font-serif font-bold text-sm text-zinc-900">
                          ${prod.price.toFixed(2)}
                        </span>
                        <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                          In Stock
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SETTINGS TAB */}
            {activeTab === 'settings' && (
              <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-3xl border border-pink-100 shadow-xs max-w-3xl mx-auto space-y-6">
                <div>
                  <h4 className="font-serif font-bold text-zinc-900 text-lg mb-1">
                    Storefront & Announcement Settings
                  </h4>
                  <p className="text-xs text-zinc-500">
                    Customize top banner alerts, hero headline text, promotional discounts, and owner contact information.
                  </p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Top Announcement Banner Text</label>
                    <input
                      type="text"
                      value={siteForm.announcementText}
                      onChange={(e) => setSiteForm({ ...siteForm, announcementText: e.target.value })}
                      className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Hero Badge Text</label>
                      <input
                        type="text"
                        value={siteForm.heroBadgeText}
                        onChange={(e) => setSiteForm({ ...siteForm, heroBadgeText: e.target.value })}
                        className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Hero Main Title</label>
                      <input
                        type="text"
                        value={siteForm.heroTitle}
                        onChange={(e) => setSiteForm({ ...siteForm, heroTitle: e.target.value })}
                        className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-700 mb-1">Hero Subtitle</label>
                    <textarea
                      rows={2}
                      value={siteForm.heroSubtitle}
                      onChange={(e) => setSiteForm({ ...siteForm, heroSubtitle: e.target.value })}
                      className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Contact Email</label>
                      <input
                        type="email"
                        value={siteForm.contactEmail}
                        onChange={(e) => setSiteForm({ ...siteForm, contactEmail: e.target.value })}
                        className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Contact Phone</label>
                      <input
                        type="text"
                        value={siteForm.contactPhone}
                        onChange={(e) => setSiteForm({ ...siteForm, contactPhone: e.target.value })}
                        className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-zinc-700 mb-1">Location</label>
                      <input
                        type="text"
                        value={siteForm.contactLocation}
                        onChange={(e) => setSiteForm({ ...siteForm, contactLocation: e.target.value })}
                        className="w-full bg-pink-50/40 border border-pink-200 rounded-xl px-3.5 py-2 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-pink-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-md transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Site Configuration</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Reply Modal Sub-Dialog */}
          {selectedInquiry && (
            <div className="fixed inset-0 z-60 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
              <div className="bg-white rounded-3xl p-6 max-w-lg w-full shadow-2xl border border-pink-100 space-y-4">
                <div className="flex items-center justify-between border-b border-pink-100 pb-3">
                  <div>
                    <h4 className="font-serif font-bold text-zinc-900 text-base">Reply to Inquiry</h4>
                    <p className="text-xs text-zinc-500">{selectedInquiry.name} ({selectedInquiry.email})</p>
                  </div>
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-3 bg-pink-50/50 rounded-xl text-xs text-zinc-700">
                  <p><strong>Subject:</strong> {selectedInquiry.subject}</p>
                  <p className="mt-1 text-zinc-600">{selectedInquiry.message}</p>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-700 mb-1">Your Response Note / Email Text</label>
                  <textarea
                    rows={4}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder="Type reply here..."
                    className="w-full bg-pink-50/40 border border-pink-200 rounded-xl p-3 text-xs focus:ring-1 focus:ring-pink-500 focus:outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    onClick={() => setSelectedInquiry(null)}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSendReply}
                    className="px-5 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Send & Resolve</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
