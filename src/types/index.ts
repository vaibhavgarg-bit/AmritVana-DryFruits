export type ProductCategory = 
  | 'almonds'
  | 'cashews'
  | 'walnuts'
  | 'pistachios'
  | 'raisins'
  | 'dates'
  | 'berries-seeds'
  | 'seeds'
  | 'makhana'
  | 'peanuts'
  | 'exotic-fruits'
  | 'saffron'
  | 'combos-gifts';

export type ProcessingType = 'raw' | 'slow-roasted' | 'salted' | 'flavoured' | 'organic';

export interface WeightOption {
  weight: string; // '100g', '250g', '500g', '1kg', '2kg'
  price: number;
  originalPrice: number;
  stock: number;
  sku: string;
}

export interface NutritionInfo {
  calories: number; // per 100g (kcal)
  protein: string; // e.g. "21g"
  carbs: string; // e.g. "22g"
  fat: string; // e.g. "50g"
  fiber: string; // e.g. "12g"
  sugar?: string;
  magnesium?: string;
  calcium?: string;
  iron?: string;
  omega3?: string;
  potassium?: string;
  zinc?: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  hindiName?: string;
  category: ProductCategory;
  subCategory: string; // e.g. 'Mamra', 'California', 'W180', 'Ajwa', etc.
  tagline: string;
  description: string;
  origin: string; // e.g. 'Kashmir, India', 'California, USA', 'Al-Madinah, Saudi Arabia'
  grade: string; // e.g. 'Royal Mamra Grade A+', 'Jumbo King W180', 'First Quality Akbari'
  rating: number;
  reviewCount: number;
  badge?: 'Best Seller' | 'Super Premium' | 'Flash Deal' | 'Organic' | 'Limited Harvest' | 'New' | 'Bespoke Blend' | string;
  images: string[];
  weightOptions: WeightOption[];
  defaultWeight?: string; // '500g'
  processing: ProcessingType;
  isSalted?: boolean;
  isOrganic?: boolean;
  isBestSeller?: boolean;
  isFeatured?: boolean;
  isDeal?: boolean;
  dealDiscountPercent?: number;
  benefits: string[];
  ayurvedicNote?: string;
  storageInstructions: string;
  shelfLife: string; // e.g. "12 Months from packing"
  ingredients: string;
  comboItems?: string[]; // If combo, list of items
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  selectedWeight: string;
  price: number;
  originalPrice: number;
  quantity: number;
}

export interface WishlistItem {
  id?: string;
  productId: string;
  product: Product;
  selectedWeight: string;
  addedAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'flat';
  discountValue: number;
  minOrderValue?: number;
  minOrderAmount?: number;
  maxDiscount?: number;
  maxDiscountAmount?: number;
  description: string;
  expiresAt: string;
}

export interface CustomerReview {
  id: string;
  productId: string;
  userName: string;
  userLocation: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  readTime: string;
  publishedDate: string;
  tags: string[];
  relatedProductIds?: string[];
}

export interface ShippingAddress {
  id?: string;
  fullName: string;
  phone: string;
  email?: string;
  addressLine1?: string;
  addressLine2?: string;
  streetAddress?: string;
  apartment?: string;
  landmark?: string;
  city: string;
  state?: string;
  pincode?: string;
  pinCode?: string;
  type?: 'Home' | 'Office' | 'Other' | string;
  isDefault?: boolean;
}

export type Address = ShippingAddress;

export interface Order {
  id: string;
  orderNumber?: string;
  createdAt: string;
  items: CartItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'cod';
  status?: 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | string;
  subtotal: number;
  tax?: number;
  discountAmount: number;
  shippingCost: number;
  grandTotal?: number;
  totalAmount?: number;
  trackingNumber: string;
  estimatedDelivery: string;
  appliedCoupon?: string;
  couponApplied?: any;
  deliveryMethod?: 'standard' | 'express';
  courierName?: string;
  timeline?: any[];
  paymentStatus?: 'paid' | 'pending';
  orderStatus?: string;
  giftWrap?: boolean;
  giftMessage?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  amritCoins?: number;
  loyaltyCoins?: number;
  membershipTier?: 'Silver' | 'Gold' | 'Royal' | string;
  memberTier?: 'Silver' | 'Gold' | 'Royal' | string;
  savedAddresses?: ShippingAddress[];
  addresses?: ShippingAddress[];
  referralCode?: string;
}

export type UserProfile = User;
