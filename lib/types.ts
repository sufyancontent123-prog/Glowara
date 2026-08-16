export type ProductCategory =
  | 'All'
  | 'Skin Care'
  | 'Hair Care'
  | 'Body Care'
  | 'Makeup'
  | 'Health & Wellness'
  | 'Sensitive Skin'
  | 'Serums'
  | 'Moisturizers'
  | 'Cleansers';

export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory?: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  tag?: 'Bestseller' | 'New' | 'Top Rated' | 'Sale' | '20% OFF' | '70% Peach Extract';
  image: string;
  volume: string;
  description: string;
  ingredients?: string[];
  benefits?: string[];
  howToUse?: string;
  inStock: boolean;
  featured?: boolean;
  isSensitiveCare?: boolean;
}

export type InquiryStatus = 'new' | 'in_progress' | 'resolved' | 'archived';
export type InquiryPriority = 'normal' | 'high' | 'urgent';

export interface UserInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  serviceType: 'Skincare Consultation' | 'Order Question' | 'Website Development' | 'AI Solution' | 'UI/UX Design' | 'General Inquiry';
  message: string;
  status: InquiryStatus;
  priority: InquiryPriority;
  createdAt: string;
  adminNotes?: string;
  replySent?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  items: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
  totalAmount: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'Cash on Delivery' | 'Credit Card' | 'JazzCash / EasyPaisa';
  createdAt: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Saqib Visuals' | 'Skincare & Orders' | 'Development Services';
}

export interface CategoryInfo {
  id: string;
  name: string;
  productsCount: string;
  image: string;
  description: string;
}

export interface SiteSettings {
  announcementText: string;
  announcementActive: boolean;
  heroBadgeText: string;
  heroTitle: string;
  heroSubtitle: string;
  promoDiscountPercent: number;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
}
