'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem, UserInquiry, SiteSettings, Order } from '@/lib/types';
import { INITIAL_PRODUCTS, INITIAL_SITE_SETTINGS, INITIAL_INQUIRIES } from '@/lib/data';
import confetti from 'canvas-confetti';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'error';
  title: string;
  message: string;
}

interface StoreContextType {
  // Products
  products: Product[];
  isLoadingProducts: boolean;
  refreshProducts: () => Promise<void>;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartTotal: number;
  cartCount: number;
  discountCode: string;
  discountPercent: number;
  applyDiscountCode: (code: string) => boolean;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;

  // Modals & Panels
  isContactModalOpen: boolean;
  setIsContactModalOpen: (open: boolean) => void;
  contactPrefill: { subject?: string; serviceType?: string };
  openContactWithPrefill: (subject?: string, serviceType?: string) => void;

  isPortfolioModalOpen: boolean;
  setIsPortfolioModalOpen: (open: boolean) => void;

  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;

  isCheckoutModalOpen: boolean;
  setIsCheckoutModalOpen: (open: boolean) => void;

  // Inquiries (for real-time Admin + Client)
  inquiries: UserInquiry[];
  submitInquiry: (inquiryData: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    serviceType: UserInquiry['serviceType'];
    message: string;
  }) => Promise<{ success: boolean; message: string }>;
  updateInquiryStatus: (id: string, status: UserInquiry['status'], replyText?: string) => Promise<boolean>;
  deleteInquiryItem: (id: string) => Promise<boolean>;
  refreshInquiries: () => Promise<void>;

  // Orders
  orders: Order[];
  createOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>) => Promise<boolean>;
  updateOrderStatus: (id: string, status: Order['status']) => Promise<boolean>;

  // Site Settings
  settings: SiteSettings;
  updateSiteSettings: (newSettings: Partial<SiteSettings>) => Promise<boolean>;

  // Toasts
  toasts: ToastNotification[];
  addToast: (type: 'success' | 'info' | 'error', title: string, message: string) => void;
  removeToast: (id: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Cart
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  // Wishlist
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Modals
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactPrefill, setContactPrefill] = useState<{ subject?: string; serviceType?: string }>({});
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

  // Inquiries & Settings & Orders
  const [inquiries, setInquiries] = useState<UserInquiry[]>(INITIAL_INQUIRIES);
  const [orders, setOrders] = useState<Order[]>([]);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SITE_SETTINGS);

  // Toasts
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const addToast = useCallback((type: 'success' | 'info' | 'error', title: string, message: string) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Fetch live products
  const refreshProducts = useCallback(async () => {
    try {
      setIsLoadingProducts(true);
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setProducts(data.data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  // Fetch live inquiries
  const refreshInquiries = useCallback(async () => {
    try {
      const res = await fetch('/api/inquiries');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setInquiries(data.data);
        localStorage.setItem('glowora_local_inquiries', JSON.stringify(data.data));
      }
    } catch (err) {
      console.error('Error fetching inquiries:', err);
    }
  }, []);

  // Fetch orders
  const refreshOrders = useCallback(async () => {
    try {
      const res = await fetch('/api/orders');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setOrders(data.data);
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
    }
  }, []);

  // Fetch settings
  const refreshSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      const data = await res.json();
      if (data.success && data.data) {
        setSettings(data.data);
      }
    } catch (err) {
      console.error('Error fetching settings:', err);
    }
  }, []);

  // Load from local storage and initial APIs on mount
  useEffect(() => {
    let isMounted = true;

    const initData = async () => {
      try {
        const savedCart = localStorage.getItem('glowora_cart');
        if (savedCart && isMounted) {
          try {
            setCart(JSON.parse(savedCart));
          } catch (e) {}
        }

        const savedWishlist = localStorage.getItem('glowora_wishlist');
        if (savedWishlist && isMounted) {
          try {
            setWishlist(JSON.parse(savedWishlist));
          } catch (e) {}
        }

        const savedInquiries = localStorage.getItem('glowora_local_inquiries');
        if (savedInquiries && isMounted) {
          try {
            const parsed = JSON.parse(savedInquiries);
            if (Array.isArray(parsed) && parsed.length > 0) {
              setInquiries((prev) => {
                const combined = [...parsed];
                for (const item of prev) {
                  if (!combined.find((c) => c.id === item.id)) combined.push(item);
                }
                return combined;
              });
            }
          } catch (e) {}
        }
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }

      // Initial background sync
      refreshProducts();
      refreshInquiries();
      refreshOrders();
      refreshSettings();
    };

    initData();

    return () => {
      isMounted = false;
    };
  }, [refreshProducts, refreshInquiries, refreshOrders, refreshSettings]);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('glowora_cart', JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  // Sync wishlist to local storage
  useEffect(() => {
    try {
      localStorage.setItem('glowora_wishlist', JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  // Cart operations
  const addToCart = useCallback(
    (product: Product, quantity = 1) => {
      setCart((prev) => {
        const existing = prev.find((item) => item.product.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { product, quantity }];
      });
      addToast('success', 'Added to Cart 🛍️', `${product.name} has been added.`);
    },
    [addToast]
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateCartQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity <= 0) {
      setCart((prev) => prev.filter((item) => item.product.id !== productId));
    } else {
      setCart((prev) =>
        prev.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        )
      );
    }
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const applyDiscountCode = useCallback(
    (code: string): boolean => {
      const clean = code.trim().toUpperCase();
      if (clean === 'GLOW20' || clean === 'SAQIB20') {
        setDiscountCode(clean);
        setDiscountPercent(20);
        addToast('success', 'Coupon Applied! ✨', '20% off has been applied to your entire order.');
        return true;
      } else if (clean === 'GLOW30') {
        setDiscountCode(clean);
        setDiscountPercent(30);
        addToast('success', 'VIP Coupon Applied! 🌟', '30% off has been applied!');
        return true;
      } else {
        addToast('error', 'Invalid Coupon', 'Try using code GLOW20 for 20% discount.');
        return false;
      }
    },
    [addToast]
  );

  // Wishlist operations
  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        const exists = prev.some((item) => item.id === product.id);
        if (exists) {
          addToast('info', 'Removed from Wishlist', `${product.name} removed.`);
          return prev.filter((item) => item.id !== product.id);
        } else {
          addToast('success', 'Saved to Wishlist ❤️', `${product.name} saved.`);
          return [...prev, product];
        }
      });
    },
    [addToast]
  );

  const isInWishlist = useCallback(
    (productId: string) => {
      return wishlist.some((item) => item.id === productId);
    },
    [wishlist]
  );

  // Contact Modal helpers
  const openContactWithPrefill = useCallback((subject?: string, serviceType?: string) => {
    setContactPrefill({ subject, serviceType });
    setIsContactModalOpen(true);
  }, []);

  // Inquiries submission
  const submitInquiry = useCallback(
    async (inquiryData: {
      name: string;
      email: string;
      phone?: string;
      subject: string;
      serviceType: UserInquiry['serviceType'];
      message: string;
    }) => {
      try {
        const res = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(inquiryData)
        });
        const result = await res.json();
        if (result.success && result.data) {
          setInquiries((prev) => [result.data, ...prev]);
          try {
            const current = JSON.parse(localStorage.getItem('glowora_local_inquiries') || '[]');
            localStorage.setItem('glowora_local_inquiries', JSON.stringify([result.data, ...current]));
          } catch (e) {}
          confetti({
            particleCount: 50,
            spread: 60,
            origin: { y: 0.6 }
          });
          addToast('success', 'Inquiry Sent Successfully! 📬', 'Muhammad Saqib will respond shortly.');
          return { success: true, message: result.message };
        } else {
          addToast('error', 'Submission Error', result.error || 'Failed to submit inquiry.');
          return { success: false, message: result.error || 'Failed to submit' };
        }
      } catch (err) {
        addToast('error', 'Network Error', 'Please check your connection and retry.');
        return { success: false, message: 'Network connection issue' };
      }
    },
    [addToast]
  );

  const updateInquiryStatus = useCallback(
    async (id: string, status: UserInquiry['status'], replyText?: string): Promise<boolean> => {
      try {
        const res = await fetch('/api/inquiries', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, status, replySent: replyText })
        });
        const result = await res.json();
        if (result.success && result.data) {
          setInquiries((prev) =>
            prev.map((item) => (item.id === id ? result.data : item))
          );
          addToast('success', 'Status Updated', `Inquiry marked as ${status}.`);
          return true;
        }
        return false;
      } catch (err) {
        addToast('error', 'Update Failed', 'Could not sync update to server.');
        return false;
      }
    },
    [addToast]
  );

  const deleteInquiryItem = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        const res = await fetch(`/api/inquiries?id=${id}`, { method: 'DELETE' });
        const result = await res.json();
        if (result.success) {
          setInquiries((prev) => prev.filter((item) => item.id !== id));
          addToast('info', 'Inquiry Deleted', 'Item removed from database.');
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    },
    [addToast]
  );

  // Orders
  const createOrder = useCallback(
    async (orderData: Omit<Order, 'id' | 'createdAt' | 'status'>): Promise<boolean> => {
      try {
        const res = await fetch('/api/orders', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });
        const result = await res.json();
        if (result.success && result.data) {
          setOrders((prev) => [result.data, ...prev]);
          clearCart();
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.5 }
          });
          addToast('success', 'Order Confirmed! 🎉', `Order #${result.data.id} placed successfully.`);
          return true;
        }
        return false;
      } catch (err) {
        addToast('error', 'Checkout Error', 'Failed to submit order.');
        return false;
      }
    },
    [addToast, clearCart]
  );

  const updateOrderStatus = useCallback(
    async (id: string, status: Order['status']): Promise<boolean> => {
      try {
        const res = await fetch('/api/orders', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id, status })
        });
        const result = await res.json();
        if (result.success && result.data) {
          setOrders((prev) =>
            prev.map((item) => (item.id === id ? result.data : item))
          );
          addToast('success', 'Order Status Updated', `Order marked as ${status}.`);
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    },
    [addToast]
  );

  // Settings
  const updateSiteSettings = useCallback(
    async (newSettings: Partial<SiteSettings>): Promise<boolean> => {
      try {
        const res = await fetch('/api/settings', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newSettings)
        });
        const result = await res.json();
        if (result.success && result.data) {
          setSettings(result.data);
          addToast('success', 'Settings Saved', 'Site configuration updated live.');
          return true;
        }
        return false;
      } catch (err) {
        return false;
      }
    },
    [addToast]
  );

  // Derived calculations
  const rawSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const cartTotal = rawSubtotal * (1 - discountPercent / 100);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        products,
        isLoadingProducts,
        refreshProducts,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        quickViewProduct,
        setQuickViewProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
        cartCount,
        discountCode,
        discountPercent,
        applyDiscountCode,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isWishlistOpen,
        setIsWishlistOpen,
        isContactModalOpen,
        setIsContactModalOpen,
        contactPrefill,
        openContactWithPrefill,
        isPortfolioModalOpen,
        setIsPortfolioModalOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        isCheckoutModalOpen,
        setIsCheckoutModalOpen,
        inquiries,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiryItem,
        refreshInquiries,
        orders,
        createOrder,
        updateOrderStatus,
        settings,
        updateSiteSettings,
        toasts,
        addToast,
        removeToast
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
