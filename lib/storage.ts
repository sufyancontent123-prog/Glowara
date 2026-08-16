import { Product, UserInquiry, SiteSettings, Order } from './types';
import { INITIAL_PRODUCTS, INITIAL_INQUIRIES, INITIAL_SITE_SETTINGS } from './data';

// Server-side in-memory store preserved across warm module invocations
interface GlobalStore {
  products: Product[];
  inquiries: UserInquiry[];
  settings: SiteSettings;
  orders: Order[];
}

declare global {
  var __GLOWORA_STORE__: GlobalStore | undefined;
}

function getStore(): GlobalStore {
  if (!globalThis.__GLOWORA_STORE__) {
    globalThis.__GLOWORA_STORE__ = {
      products: [...INITIAL_PRODUCTS],
      inquiries: [...INITIAL_INQUIRIES],
      settings: { ...INITIAL_SITE_SETTINGS },
      orders: [
        {
          id: 'ord-5001',
          customerName: 'Sana Tariq',
          customerEmail: 'sana.tariq@gmail.com',
          customerPhone: '+92 300 4567890',
          shippingAddress: 'House 42, Gulberg III',
          city: 'Lahore',
          items: [
            {
              productId: 'prod-peach-70-serum',
              productName: 'Peach 70 Niacin Serum',
              price: 24.99,
              quantity: 2,
              image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop'
            }
          ],
          totalAmount: 49.98,
          status: 'Shipped',
          paymentMethod: 'Cash on Delivery',
          createdAt: '2026-08-15T06:10:00Z'
        }
      ]
    };
  }
  return globalThis.__GLOWORA_STORE__;
}

export const serverDb = {
  // Inquiries
  getInquiries: (): UserInquiry[] => {
    return [...getStore().inquiries];
  },
  addInquiry: (inquiry: Omit<UserInquiry, 'id' | 'createdAt' | 'status' | 'priority'> & Partial<UserInquiry>): UserInquiry => {
    const store = getStore();
    const newInquiry: UserInquiry = {
      id: `inq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone || '',
      subject: inquiry.subject,
      serviceType: inquiry.serviceType || 'General Inquiry',
      message: inquiry.message,
      status: inquiry.status || 'new',
      priority: inquiry.priority || 'normal',
      createdAt: new Date().toISOString(),
      adminNotes: inquiry.adminNotes || '',
      replySent: inquiry.replySent || ''
    };
    store.inquiries.unshift(newInquiry);
    return newInquiry;
  },
  updateInquiry: (id: string, updates: Partial<UserInquiry>): UserInquiry | null => {
    const store = getStore();
    const index = store.inquiries.findIndex((i) => i.id === id);
    if (index === -1) return null;
    store.inquiries[index] = { ...store.inquiries[index], ...updates };
    return store.inquiries[index];
  },
  deleteInquiry: (id: string): boolean => {
    const store = getStore();
    const initialLen = store.inquiries.length;
    store.inquiries = store.inquiries.filter((i) => i.id !== id);
    return store.inquiries.length < initialLen;
  },

  // Products
  getProducts: (): Product[] => {
    return [...getStore().products];
  },
  addProduct: (product: Omit<Product, 'id'> & { id?: string }): Product => {
    const store = getStore();
    const newProduct: Product = {
      ...product,
      id: product.id || `prod-${Date.now()}`
    };
    store.products.unshift(newProduct);
    return newProduct;
  },
  updateProduct: (id: string, updates: Partial<Product>): Product | null => {
    const store = getStore();
    const index = store.products.findIndex((p) => p.id === id);
    if (index === -1) return null;
    store.products[index] = { ...store.products[index], ...updates };
    return store.products[index];
  },
  deleteProduct: (id: string): boolean => {
    const store = getStore();
    const initialLen = store.products.length;
    store.products = store.products.filter((p) => p.id !== id);
    return store.products.length < initialLen;
  },

  // Orders
  getOrders: (): Order[] => {
    return [...getStore().orders];
  },
  addOrder: (orderData: Omit<Order, 'id' | 'createdAt' | 'status'> & { status?: Order['status'] }): Order => {
    const store = getStore();
    const newOrder: Order = {
      id: `ord-${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString(),
      status: orderData.status || 'Pending',
      ...orderData
    };
    store.orders.unshift(newOrder);
    return newOrder;
  },
  updateOrder: (id: string, status: Order['status']): Order | null => {
    const store = getStore();
    const index = store.orders.findIndex((o) => o.id === id);
    if (index === -1) return null;
    store.orders[index] = { ...store.orders[index], status };
    return store.orders[index];
  },

  // Settings
  getSettings: (): SiteSettings => {
    return { ...getStore().settings };
  },
  updateSettings: (updates: Partial<SiteSettings>): SiteSettings => {
    const store = getStore();
    store.settings = { ...store.settings, ...updates };
    return { ...store.settings };
  }
};
