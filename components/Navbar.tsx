'use client';

import React, { useState } from 'react';
import { useStore } from '@/context/StoreContext';
import { Search, Heart, ShoppingBag, Box, ShieldCheck, Sparkles, X, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Navbar() {
  const {
    cartCount,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen,
    setIsPortfolioModalOpen,
    setIsContactModalOpen,
    setIsAdminModalOpen,
    searchQuery,
    setSearchQuery,
    settings,
    products,
    setQuickViewProduct
  } = useStore();

  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Filter products for the live search dropdown
  const searchResults = searchQuery.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const elem = document.getElementById(id);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-pink-100 shadow-[0_2px_15px_rgba(244,114,182,0.06)]">
      {/* Top Announcement Bar */}
      {settings.announcementActive && (
        <div
          id="announcement-bar"
          className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white text-xs font-medium py-1.5 px-4 text-center tracking-wide flex items-center justify-center gap-2"
        >
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>{settings.announcementText}</span>
        </div>
      )}

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <button
              id="brand-logo"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center gap-2.5 group text-left focus:outline-none"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-500 via-pink-400 to-rose-400 flex items-center justify-center text-white font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform duration-200">
                G
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-2xl font-bold tracking-tight text-zinc-900 group-hover:text-pink-600 transition-colors">
                  Glowora
                </span>
                <span className="text-[10px] uppercase font-semibold tracking-wider text-pink-500">
                  Beauty & Wellness
                </span>
              </div>
            </button>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-7">
              <button
                id="nav-link-home"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-sm font-bold uppercase tracking-wider text-pink-600 border-b-2 border-pink-500 pb-1 hover:text-pink-700 transition-colors"
              >
                HOME
              </button>
              <button
                id="nav-link-about"
                onClick={() => setIsPortfolioModalOpen(true)}
                className="text-sm font-semibold uppercase tracking-wider text-zinc-700 hover:text-pink-600 transition-colors"
              >
                ABOUT SAQIB
              </button>
              <button
                id="nav-link-shop"
                onClick={() => scrollToSection('best-sellers-section')}
                className="text-sm font-semibold uppercase tracking-wider text-zinc-700 hover:text-pink-600 transition-colors"
              >
                SHOP
              </button>
              <button
                id="nav-link-contact"
                onClick={() => setIsContactModalOpen(true)}
                className="text-sm font-semibold uppercase tracking-wider text-zinc-700 hover:text-pink-600 transition-colors"
              >
                CONTACT
              </button>
              <button
                id="nav-link-faqs"
                onClick={() => scrollToSection('faqs-section')}
                className="text-sm font-semibold uppercase tracking-wider text-zinc-700 hover:text-pink-600 transition-colors"
              >
                FAQS
              </button>
            </nav>
          </div>

          {/* Search Bar with Live Results */}
          <div className="relative flex-1 max-w-md hidden md:block">
            <div className="relative">
              <input
                id="global-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchDropdownOpen(true);
                }}
                onFocus={() => setIsSearchDropdownOpen(true)}
                placeholder="Search products, serums, creams..."
                className="w-full bg-zinc-100/80 hover:bg-zinc-100 focus:bg-white text-zinc-800 text-sm rounded-full pl-11 pr-10 py-2.5 border border-zinc-200/80 focus:border-pink-400 focus:ring-2 focus:ring-pink-100 transition-all outline-none"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 p-1"
                  aria-label="Clear search"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Live Search Dropdown */}
            <AnimatePresence>
              {isSearchDropdownOpen && searchQuery.trim().length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-zinc-200 overflow-hidden z-50 p-2 max-h-96 overflow-y-auto"
                >
                  <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-100 text-xs text-zinc-500 font-medium">
                    <span>Search Results ({searchResults.length})</span>
                    <button
                      onClick={() => setIsSearchDropdownOpen(false)}
                      className="text-zinc-400 hover:text-zinc-600"
                    >
                      Close
                    </button>
                  </div>
                  {searchResults.length === 0 ? (
                    <div className="p-6 text-center text-zinc-500 text-sm">
                      No products found for &ldquo;{searchQuery}&rdquo;
                    </div>
                  ) : (
                    <div className="divide-y divide-zinc-50">
                      {searchResults.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => {
                            setQuickViewProduct(product);
                            setIsSearchDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-pink-50/60 text-left transition-colors group"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-12 h-12 rounded-lg object-cover bg-pink-50 shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h5 className="text-sm font-semibold text-zinc-900 truncate group-hover:text-pink-600">
                              {product.name}
                            </h5>
                            <p className="text-xs text-zinc-500 flex items-center gap-2">
                              <span>{product.category}</span>
                              <span>•</span>
                              <span className="font-bold text-zinc-800">${product.price.toFixed(2)}</span>
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Wishlist Button */}
            <button
              id="header-wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2.5 text-zinc-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
              title="Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 bg-pink-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              id="header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 text-zinc-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors"
              title="Shopping Cart"
              aria-label="Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-gradient-to-r from-pink-500 to-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Quick Order Lookup / Track */}
            <button
              id="header-orders-btn"
              onClick={() => setIsContactModalOpen(true)}
              className="p-2.5 text-zinc-600 hover:text-pink-600 hover:bg-pink-50 rounded-full transition-colors hidden sm:block"
              title="Track Order / Support"
              aria-label="Order Tracking"
            >
              <Box className="w-5 h-5" />
            </button>

            {/* Portfolio CTA button */}
            <button
              id="header-portfolio-btn"
              onClick={() => setIsPortfolioModalOpen(true)}
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white bg-zinc-900 hover:bg-zinc-800 rounded-full shadow-sm hover:shadow transition-all duration-200"
            >
              <span>Portfolio</span>
            </button>

            {/* Admin Panel Quick Access */}
            <button
              id="header-admin-portal-btn"
              onClick={() => setIsAdminModalOpen(true)}
              className="inline-flex items-center gap-1 px-3 py-2 text-xs font-semibold text-pink-700 bg-pink-50 hover:bg-pink-100 border border-pink-200 rounded-full transition-colors"
              title="Admin Content & Inquiries Management"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-pink-600" />
              <span className="hidden md:inline">Admin</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-zinc-600 hover:text-pink-600 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden py-4 border-t border-zinc-100 flex flex-col gap-3 pb-6"
          >
            <div className="relative mb-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full bg-zinc-100 text-sm rounded-full pl-10 pr-4 py-2 border border-zinc-200"
              />
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
            <button
              onClick={() => scrollToSection('hero-section')}
              className="text-left font-semibold text-zinc-800 py-2 border-b border-zinc-50"
            >
              Home
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsPortfolioModalOpen(true);
              }}
              className="text-left font-semibold text-zinc-800 py-2 border-b border-zinc-50"
            >
              About Muhammad Saqib
            </button>
            <button
              onClick={() => scrollToSection('best-sellers-section')}
              className="text-left font-semibold text-zinc-800 py-2 border-b border-zinc-50"
            >
              Best Sellers
            </button>
            <button
              onClick={() => scrollToSection('sensitive-skin-section')}
              className="text-left font-semibold text-zinc-800 py-2 border-b border-zinc-50"
            >
              Sensitive Skin Care
            </button>
            <button
              onClick={() => scrollToSection('faqs-section')}
              className="text-left font-semibold text-zinc-800 py-2 border-b border-zinc-50"
            >
              FAQs
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsContactModalOpen(true);
              }}
              className="text-left font-semibold text-pink-600 py-2 border-b border-zinc-50"
            >
              Contact Us / Inquire
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsAdminModalOpen(true);
              }}
              className="text-left font-semibold text-zinc-700 py-2"
            >
              Admin Management Panel
            </button>
          </motion.div>
        )}
      </div>
    </header>
  );
}
