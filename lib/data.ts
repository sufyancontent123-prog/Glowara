import { Product, CategoryInfo, FAQItem, UserInquiry, SiteSettings } from './types';

export const INITIAL_CATEGORIES: CategoryInfo[] = [
  {
    id: 'skin-care',
    name: 'Skin Care',
    productsCount: '120+ Products',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    description: 'Cleanse, hydrate and protect with clinical-grade active ingredients.'
  },
  {
    id: 'hair-care',
    name: 'Hair Care',
    productsCount: '95+ Products',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop',
    description: 'Deep nourishing shampoos, keratin treatments, and botanical oils.'
  },
  {
    id: 'body-care',
    name: 'Body Care',
    productsCount: '80+ Products',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
    description: 'Luxurious bath salts, softening lotions, and hydrating body scrubs.'
  },
  {
    id: 'makeup',
    name: 'Makeup',
    productsCount: '150+ Products',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?q=80&w=800&auto=format&fit=crop',
    description: 'Vibrant matte lipsticks, lightweight foundations, and glow balms.'
  },
  {
    id: 'health-wellness',
    name: 'Health & Wellness',
    productsCount: '90+ Products',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop',
    description: 'Holistic wellness formulas, aromatherapy, and daily vitality boosters.'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // Sensitive Skin Showcase
  {
    id: 'prod-cetaphil-sun',
    name: 'Cetaphil Sun SPF 50+ Light Gel',
    category: 'Sensitive Skin',
    subcategory: 'Sun Care',
    price: 22.00,
    originalPrice: 28.00,
    rating: 4.2,
    reviewsCount: 696,
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop',
    volume: '50ml',
    description: 'Very high SPF 50+ protection against UVA and UVB rays. Lightweight gel formula that is quickly absorbed with no white cast.',
    ingredients: ['Cellular Protection Complex', 'Vitamin E', 'Glycerin', 'Broad Spectrum Filters'],
    benefits: ['Non-comedogenic', 'Water resistant', 'Fragrance-free', 'Suitable for sensitive & reactive skin'],
    howToUse: 'Apply generously to face and neck 20 minutes before sun exposure. Reapply every 2 hours.',
    inStock: true,
    featured: true,
    isSensitiveCare: true
  },
  {
    id: 'prod-daily-exfoliating',
    name: 'Daily Exfoliating Cleanser',
    category: 'Sensitive Skin',
    subcategory: 'Cleansers',
    price: 16.50,
    originalPrice: 21.00,
    rating: 4.4,
    reviewsCount: 19063,
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1556228722-d0b5d03a5be6?q=80&w=800&auto=format&fit=crop',
    volume: '178ml',
    description: 'Gently buffs away dead skin cells without stripping natural hydration. Packed with soothing micro-exfoliants.',
    ingredients: ['Hydrating Glycerin', 'Vitamin B5', 'Bamboo Micro-beads', 'Aloe Vera Leaf Extract'],
    benefits: ['Maintains skin natural pH', 'Non-irritating', 'Hypoallergenic', 'Dermatologist tested'],
    howToUse: 'Massage gently over damp face using circular motions. Rinse thoroughly with lukewarm water.',
    inStock: true,
    featured: true,
    isSensitiveCare: true
  },
  {
    id: 'prod-advanced-relief',
    name: 'Advanced Relief Lotion',
    category: 'Sensitive Skin',
    subcategory: 'Moisturizers',
    price: 18.00,
    originalPrice: 24.00,
    rating: 4.7,
    reviewsCount: 2800,
    tag: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1608248597359-561330366a5a?q=80&w=800&auto=format&fit=crop',
    volume: '237ml',
    description: 'Continuous 48-hour moisture barrier repair for intensely dry, irritated, or compromised skin.',
    ingredients: ['Ceramide NP', 'Hyaluronic Acid', 'Shea Butter', 'Colloidal Oatmeal'],
    benefits: ['Calms itchy sensation', 'Restores lipid barrier', 'Fast absorbing', 'Steroid-free'],
    howToUse: 'Apply liberally to affected areas as often as needed throughout the day.',
    inStock: true,
    featured: true,
    isSensitiveCare: true
  },

  // Star Featured Hero Items
  {
    id: 'prod-peach-70-serum',
    name: 'Peach 70 Niacin Serum',
    category: 'Skin Care',
    subcategory: 'Serums',
    price: 24.99,
    originalPrice: 32.00,
    rating: 4.9,
    reviewsCount: 1420,
    tag: '70% Peach Extract',
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop',
    volume: '30ml',
    description: 'Formulated with 70% fermented peach extract and 5% niacinamide to restore dull tone, refine pores, and deliver instant glass-skin radiance.',
    ingredients: ['70% Prunus Persica Extract', '5% Niacinamide', 'Triple Hyaluronic Acid', 'Alpha-Arbutin', 'Desert Yeast Oil'],
    benefits: ['Deep hydration for glass skin', 'Reduces dark spots & blemish marks', 'Instant absorption with non-sticky finish', 'Enhances makeup adherence'],
    howToUse: 'Dispense 2-3 drops onto clean skin morning and evening. Gently pat into face and neck until absorbed.',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-anti-pigmentation',
    name: 'Catalyst Anti Pigmentation Serum',
    category: 'Skin Care',
    subcategory: 'Serums',
    price: 28.50,
    originalPrice: 38.00,
    rating: 4.8,
    reviewsCount: 890,
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?q=80&w=800&auto=format&fit=crop',
    volume: '30ml',
    description: 'Targeted brightening formula with concentrated Kojic Acid, Alpha Arbutin and Tranexamic Acid to correct hyperpigmentation and sun damage.',
    ingredients: ['Kojic Acid 2%', 'Alpha Arbutin 2%', 'Tranexamic Acid 3%', 'Licorice Root Extract'],
    benefits: ['Fades stubborn dark spots', 'Evens patchy skin tone', 'Accelerates skin renewal', 'Antioxidant defense'],
    howToUse: 'Apply 3 drops onto targeted areas or full face before heavier creams. Always use SPF in daytime.',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-curated-essentials-bundle',
    name: 'Curated Essentials Skincare Kit',
    category: 'Skin Care',
    subcategory: 'Bundles',
    price: 89.99,
    originalPrice: 149.99,
    rating: 5.0,
    reviewsCount: 3120,
    tag: 'Sale',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    volume: 'Full 5-Piece Routine Kit',
    description: 'Elevate your daily routine with our handpicked selection of premium skincare essentials bundled in a signature luxury tote.',
    ingredients: ['Cleansing Milk 100ml', 'Hydrating Essence Toner 100ml', 'Glow Serum 30ml', 'Barrier Cream 50ml', 'SPF Shield 50ml'],
    benefits: ['Complete morning & night regimen', 'Save $60 over individual prices', 'Dermatologist tested', 'Travel-friendly packaging'],
    howToUse: 'Follow steps 1 to 5 printed on the bundle guide inside the package.',
    inStock: true,
    featured: true
  },

  // Best Sellers Grid
  {
    id: 'prod-vitamin-c-serum',
    name: 'Vitamin C Face Serum',
    category: 'Skin Care',
    subcategory: 'Serums',
    price: 24.99,
    originalPrice: 34.00,
    rating: 4.8,
    reviewsCount: 2310,
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1608248597359-561330366a5a?q=80&w=800&auto=format&fit=crop',
    volume: '30ml',
    description: 'Pure 15% L-Ascorbic Acid infused with Ferulic Acid and Vitamin E for luminous glow and antioxidant defense against urban pollution.',
    ingredients: ['15% L-Ascorbic Acid', '1% Vitamin E', '0.5% Ferulic Acid', 'Hyaluronic Acid'],
    benefits: ['Boosts collagen synthesis', 'Protects against UV damage', 'Brightens complexions', 'Smooths fine lines'],
    howToUse: 'Apply 3-4 drops to cleansed face in the morning before moisturizer and sunscreen.',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-hydrating-face-cream',
    name: 'Hydrating Face Cream',
    category: 'Skin Care',
    subcategory: 'Moisturizers',
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.7,
    reviewsCount: 1845,
    tag: 'Sale',
    image: 'https://images.unsplash.com/photo-1567928815104-b63795123d57?q=80&w=800&auto=format&fit=crop',
    volume: '50g',
    description: 'Velvety rich barrier repair cream with multi-molecular hyaluronic acid and botanical squalane that locks in moisture for 72 hours.',
    ingredients: ['Centella Asiatica', 'Plant-derived Squalane', 'Hyaluronic Acid', 'Shea Butter'],
    benefits: ['Intense hydration', 'Non-greasy finish', 'Soothes redness', 'Plumps skin texture'],
    howToUse: 'Smooth a dime-sized amount over face and neck as the final step in your routine.',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-keratin-shampoo',
    name: 'Keratin Nourishing Shampoo',
    category: 'Hair Care',
    subcategory: 'Cleansers',
    price: 15.99,
    originalPrice: 22.99,
    rating: 4.6,
    reviewsCount: 940,
    tag: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=800&auto=format&fit=crop',
    volume: '200ml',
    description: 'Sulfate-free keratin restorative shampoo designed to rebuild damaged strands, eliminate frizz, and add mirror-like shine.',
    ingredients: ['Hydrolyzed Keratin', 'Bamboo Fiber Extract', 'Argan Oil', 'Biotin'],
    benefits: ['Repairs heat and color damage', 'Sulfate-free & color safe', 'Volumizes fine strands', 'Reduces breakage by 80%'],
    howToUse: 'Lather into wet hair, massage scalp for 2 minutes, and rinse thoroughly.',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-aloe-vera-gel',
    name: 'Organic Aloe Vera Soothing Gel',
    category: 'Body Care',
    subcategory: 'Moisturizers',
    price: 12.99,
    originalPrice: 18.99,
    rating: 4.9,
    reviewsCount: 3100,
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop',
    volume: '150ml',
    description: '99% pure cold-pressed organic aloe vera that instantly cools irritated skin, relieves sunburns, and hydrates after shaving.',
    ingredients: ['99% Organic Aloe Barbadensis Leaf Juice', 'Cucumber Extract', 'Allantoin', 'Green Tea'],
    benefits: ['Instant cooling relief', 'Multi-purpose for face, body and hair', 'Oil-free soothing', 'Non-sticky fast absorption'],
    howToUse: 'Apply freely onto dry, heated, or sensitive skin as needed.',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-matte-lipstick',
    name: 'Velvet Matte Long-Wear Lipstick',
    category: 'Makeup',
    subcategory: 'Lips',
    price: 9.99,
    originalPrice: 14.99,
    rating: 4.5,
    reviewsCount: 1650,
    tag: 'Sale',
    image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=800&auto=format&fit=crop',
    volume: '4.2g',
    description: 'High-pigment, comfortable matte formula enriched with nourishing jojoba oil that lasts up to 12 hours without flaking.',
    ingredients: ['Jojoba Seed Oil', 'Vitamin E', 'Natural Mineral Pigments', 'Candelilla Wax'],
    benefits: ['12-hour transfer-resistant wear', 'Creamy glide-on application', 'Non-drying velvet finish', 'Cruelty-free & vegan'],
    howToUse: 'Glide directly across lips from the center outward. Layer for intensified coverage.',
    inStock: true,
    featured: false
  },
  {
    id: 'prod-niacinamide-zinc',
    name: 'Niacinamide 10% + Zinc 1% Serum',
    category: 'Skin Care',
    subcategory: 'Serums',
    price: 21.99,
    originalPrice: 28.00,
    rating: 4.8,
    reviewsCount: 184,
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1608248597359-561330366a5a?q=80&w=800&auto=format&fit=crop',
    volume: '30ml',
    description: 'High-potency mineral blemish formula that regulates sebum activity, shrinks enlarged pores, and calms redness.',
    ingredients: ['10% Niacinamide', '1% Zinc PCA', 'Tamarindus Indica Seed Gum', 'Isoceteth-20'],
    benefits: ['Controls excess shine', 'Minimizes pore appearance', 'Clears congestion', 'Balances skin oiliness'],
    howToUse: 'Apply a few drops across the entire face morning and evening before heavier creams.',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-rose-water-toner',
    name: 'Pure Rose Water Facial Toner',
    category: 'Skin Care',
    subcategory: 'Cleansers',
    price: 14.99,
    originalPrice: 19.99,
    rating: 4.9,
    reviewsCount: 142,
    tag: 'New',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop',
    volume: '100ml',
    description: 'Steam-distilled from organic Damask rose petals to rebalance skin pH, refresh tired complexions, and prep pores for serums.',
    ingredients: ['100% Rosa Damascena Flower Distillate', 'Vegetable Glycerin', 'Rosemary Leaf Extract'],
    benefits: ['Instantly hydrates & refreshes', 'Refines pores', 'Anti-inflammatory botanicals', 'Delicate natural aroma'],
    howToUse: 'Mist directly onto face with closed eyes or apply with a cotton pad after cleansing.',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-tea-tree-wash',
    name: 'Tea Tree Purifying Face Wash',
    category: 'Skin Care',
    subcategory: 'Cleansers',
    price: 16.99,
    originalPrice: 24.00,
    rating: 4.7,
    reviewsCount: 95,
    tag: 'Top Rated',
    image: 'https://images.unsplash.com/photo-1556228722-d0b5d03a5be6?q=80&w=800&auto=format&fit=crop',
    volume: '120ml',
    description: 'Foaming gel cleanser powered by Australian tea tree oil and salicylic acid to deep clean pores and prevent breakouts without irritation.',
    ingredients: ['Melaleuca Alternifolia (Tea Tree) Leaf Oil', 'Salicylic Acid 1%', 'Eucalyptus Oil', 'Witch Hazel'],
    benefits: ['Fights acne-causing bacteria', 'Removes waterproof impurities', 'Refreshes congested pores', 'Soothes inflammation'],
    howToUse: 'Lather into hands with water, massage over face for 60 seconds, and rinse.',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-argan-hair-oil',
    name: 'Moroccan Argan Hair Nourishing Oil',
    category: 'Hair Care',
    subcategory: 'Serums',
    price: 22.99,
    originalPrice: 32.00,
    rating: 4.9,
    reviewsCount: 203,
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1527799820374-dcf8d9d4a388?q=80&w=800&auto=format&fit=crop',
    volume: '50ml',
    description: '100% cold-pressed organic Moroccan argan oil packed with fatty acids and vitamin E to tame flyaways, mend split ends, and add glossy softness.',
    ingredients: ['Pure Argania Spinosa Kernel Oil', 'Sweet Almond Oil', 'Rosehip Oil'],
    benefits: ['Thermal heat protection up to 450°F', 'Tames frizz without weighing down', 'Intense luster & softness', 'Promotes healthy scalp'],
    howToUse: 'Work 1-2 pumps through towel-dried or dry hair focusing on mid-lengths to ends.',
    inStock: true,
    featured: true
  },
  {
    id: 'prod-lavender-bath-salt',
    name: 'Organic Lavender Detox Bath Salt',
    category: 'Body Care',
    subcategory: 'Body Care',
    price: 18.99,
    originalPrice: 26.00,
    rating: 4.8,
    reviewsCount: 88,
    tag: 'Sale',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=800&auto=format&fit=crop',
    volume: '300g',
    description: 'Hand-harvested Dead Sea salts infused with pure French lavender essential oil and dried botanicals for tranquil stress relief and deep muscle relaxation.',
    ingredients: ['Dead Sea Mineral Salt', 'Epsom Salt (Magnesium Sulfate)', 'French Lavender Oil', 'Dried Chamomile Flowers'],
    benefits: ['Relieves tired muscles & tension', 'Softens rough skin', 'Promotes restful sleep', 'Aromatherapeutic calm'],
    howToUse: 'Add 2-3 generous scoops into warm running bathwater and soak for 20 minutes.',
    inStock: true,
    featured: true
  }
];

export const INITIAL_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Saqib Visuals',
    question: 'What is Saqib Visuals?',
    answer: 'Saqib Visuals is the creative brand of Muhammad Saqib, specializing in Full-Stack Web Development, AI-powered solutions, UI/UX architecture, and digital content creation.'
  },
  {
    id: 'faq-2',
    category: 'Saqib Visuals',
    question: 'What services do you offer?',
    answer: 'I offer a wide range of services including modern web development (Next.js, React, Tailwind CSS), mobile app development, UI/UX design, custom AI integration, database architecture, graphic design, and video editing.'
  },
  {
    id: 'faq-3',
    category: 'Saqib Visuals',
    question: 'Where are you based?',
    answer: 'I am based in Faisalabad, Pakistan, but I work with clients globally to deliver premium digital solutions, customized software, and high-converting e-commerce web experiences.'
  },
  {
    id: 'faq-4',
    category: 'Skincare & Orders',
    question: 'How fast is delivery & what are the shipping rates?',
    answer: 'We offer free delivery on all orders over $50. Standard delivery takes 2–4 business days within major metro areas. All packages are insured and tracked.'
  },
  {
    id: 'faq-5',
    category: 'Skincare & Orders',
    question: 'Are all Glowora beauty products 100% original and dermatologically tested?',
    answer: 'Yes! Every product in our collection is 100% authentic, cruelty-free, and formulated with dermatologically tested botanical and clinical actives suitable for sensitive skin.'
  },
  {
    id: 'faq-6',
    category: 'Development Services',
    question: 'Can Muhammad Saqib build custom e-commerce and web apps for my business?',
    answer: 'Absolutely! Whether you need a high-speed e-commerce storefront like Glowora, a SaaS platform, a mobile application, or custom AI workflows, reach out directly through our contact form or WhatsApp (+92 347 8936242).'
  }
];

export const INITIAL_INQUIRIES: UserInquiry[] = [
  {
    id: 'inq-101',
    name: 'Ayesha Khan',
    email: 'ayesha.k@example.com',
    phone: '+92 300 1234567',
    subject: 'Skin Care Routine for Dry Sensitive Skin',
    serviceType: 'Skincare Consultation',
    message: 'Hello, I have very sensitive skin prone to redness. Which serum from your collection would you recommend between Peach 70 and Catalyst Anti-Pigmentation?',
    status: 'new',
    priority: 'normal',
    createdAt: '2026-08-15T08:30:00Z',
    adminNotes: 'Customer interested in Peach 70 and gentle care products.'
  },
  {
    id: 'inq-102',
    name: 'David Miller',
    email: 'david.miller@techflow.io',
    phone: '+1 415 890 1234',
    subject: 'Custom Next.js E-commerce Project',
    serviceType: 'Website Development',
    message: 'Hi Saqib, I loved the UI and fluid animations of Glowora! We are looking to build a multi-brand beauty storefront and would love to discuss a contract with Saqib Visuals.',
    status: 'in_progress',
    priority: 'high',
    createdAt: '2026-08-14T14:20:00Z',
    adminNotes: 'Initial portfolio review sent. Scheduled discovery call.'
  },
  {
    id: 'inq-103',
    name: 'Zainab Fatima',
    email: 'zainab.f@gmail.com',
    phone: '+92 321 9876543',
    subject: 'Bulk Order Inquiry for Salon in Lahore',
    serviceType: 'Order Question',
    message: 'We run a premier beauty salon and want to order 20 units of the Curated Essentials Skincare Kit and 30 bottles of Peach 70 Niacin Serum. Do you provide wholesale pricing?',
    status: 'resolved',
    priority: 'urgent',
    createdAt: '2026-08-13T10:15:00Z',
    adminNotes: 'Wholesale catalog & 25% bulk quote shared via email.',
    replySent: 'Wholesale quotation sent with delivery within 48 hours.'
  }
];

export const INITIAL_SITE_SETTINGS: SiteSettings = {
  announcementText: '✨ Radiate Confidence Every Day • Free Worldwide Shipping on orders over $50 • Use Code: GLOW20',
  announcementActive: true,
  heroBadgeText: 'Radiate Confidence Every Day',
  heroTitle: 'Beauty & Wellness',
  heroSubtitle: 'Discover premium health & beauty products formulated to nourish your skin, hair & body from the inside out.',
  promoDiscountPercent: 20,
  contactEmail: 'mrsaqib242242@gmail.com',
  contactPhone: '+92 347 8936242',
  contactLocation: 'Faisalabad, Pakistan'
};

export const SAQIB_PORTFOLIO_DATA = {
  name: 'Muhammad Saqib',
  brandName: 'Saqib Visuals',
  role: 'Senior Full-Stack & AI Solutions Engineer',
  tagline: 'Turning ideas into modern digital experiences through technology, creativity, and innovation.',
  location: 'Faisalabad, Pakistan',
  phone: '+92 347 8936242',
  email: 'mrsaqib242242@gmail.com',
  stats: [
    { label: 'Projects Completed', value: '85+' },
    { label: 'Global Clients', value: '40+' },
    { label: 'Client Satisfaction', value: '99.4%' },
    { label: 'Years Experience', value: '5+' }
  ],
  skills: [
    { category: 'Frontend', items: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vue.js'] },
    { category: 'Backend & Cloud', items: ['Node.js', 'Express', 'PostgreSQL', 'Firestore / Firebase', 'REST / GraphQL', 'Cloud Run'] },
    { category: 'AI & Intelligence', items: ['Gemini API', 'LLM Integration', 'LangChain', 'Prompt Architecture', 'RAG Pipelines'] },
    { category: 'Design & Creative', items: ['UI/UX Prototyping', 'Figma', 'Graphic Design', 'Motion Design', 'Video Editing'] }
  ],
  featuredProjects: [
    {
      title: 'Glowora Skincare & Beauty Commerce',
      category: 'Full-Stack E-Commerce',
      description: 'Modern luxury beauty storefront with dynamic product catalog, interactive before/after sliders, cart & real-time admin content portal.',
      tech: ['Next.js', 'TypeScript', 'Tailwind CSS', 'REST API']
    },
    {
      title: 'AI Studio Smart Assistant Platform',
      category: 'AI Application',
      description: 'Enterprise AI dashboard leveraging Gemini models for real-time document analysis, multi-modal chat, and automated content generation.',
      tech: ['Next.js', 'Google GenAI SDK', 'Tailwind CSS']
    },
    {
      title: 'NexGen Cloud Asset Manager',
      category: 'SaaS Platform',
      description: 'High-performance digital asset pipeline with secure permissions, analytics visualization, and real-time collaboration.',
      tech: ['React', 'Node.js', 'PostgreSQL', 'Tailwind']
    }
  ]
};
