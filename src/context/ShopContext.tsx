import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Product, 
  CartItem, 
  WishlistItem, 
  Coupon, 
  Order, 
  UserProfile, 
  ProductCategory,
  Address
} from '../types';
import { PRODUCTS } from '../data/products';
import { COUPONS } from '../data/coupons';

export type AppView = 
  | 'home'
  | 'shop'
  | 'category'
  | 'product-detail'
  | 'combos'
  | 'offers'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'order-tracking'
  | 'about'
  | 'blog'
  | 'blog-post'
  | 'contact'
  | 'auth'
  | 'dashboard'
  | 'custom-mix';

export interface Toast {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface ShopContextType {
  // Navigation
  currentView: AppView;
  viewParams: Record<string, any>;
  navigate: (view: AppView, params?: Record<string, any>) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, selectedWeight?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  taxAmount: number;
  grandTotal: number;
  freeShippingRemaining: number;
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;

  // Coupons & Gifting
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  isGiftWrap: boolean;
  giftMessage: string;
  setGiftOptions: (enabled: boolean, message?: string) => void;

  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product, weight?: string) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  moveToCartFromWishlist: (item: WishlistItem) => void;

  // Quick View & Search Modals
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // User & Orders
  user: UserProfile | null;
  login: (emailOrPhone: string, password?: string) => { success: boolean; message?: string };
  register: (name: string, email: string, password?: string, phone?: string) => { success: boolean; message?: string };
  logout: () => void;
  orders: Order[];
  currentOrder: Order | null;
  placeOrder: (orderData: Partial<Order>) => Order;
  createOrder: (orderData: Partial<Order>) => Order;
  savedAddresses: Address[];
  addSavedAddress: (address: Omit<Address, 'id'>) => void;
  selectedDeliveryPincode: string;
  setDeliveryPincode: (pin: string) => void;

  // Toasts
  toasts: Toast[];
  showToast: (message: string, type?: Toast['type']) => void;
  removeToast: (id: string) => void;

  // Helpers
  formatPrice: (amount: number) => string;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const INITIAL_SAMPLE_ORDERS: Order[] = [
  {
    id: 'ord-101',
    orderNumber: 'AV-2026-89421',
    createdAt: '18 Aug 2026, 11:30 AM',
    items: [
      {
        id: 'almond-mamra-kashmiri-500g',
        productId: 'almond-mamra-kashmiri',
        product: PRODUCTS[0],
        selectedWeight: '500g',
        price: 1890,
        originalPrice: 2299,
        quantity: 1,
      },
      {
        id: 'cashew-w180-king-jumbo-500g',
        productId: 'cashew-w180-king-jumbo',
        product: PRODUCTS[4],
        selectedWeight: '500g',
        price: 1040,
        originalPrice: 1250,
        quantity: 1,
      }
    ],
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Vaibhav Garg',
      phone: '+91 98765 43210',
      streetAddress: 'Flat 402, Royal Palms Heights, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560038',
      type: 'Home',
      isDefault: true,
    },
    deliveryMethod: 'express',
    shippingCost: 0,
    discountAmount: 439,
    giftWrap: true,
    giftMessage: 'Wishing you vibrant health & prosperity! - Vaibhav',
    subtotal: 2930,
    tax: 124,
    totalAmount: 2615,
    paymentMethod: 'upi',
    paymentStatus: 'paid',
    orderStatus: 'out_for_delivery',
    estimatedDelivery: 'Today by 4:00 PM',
    trackingNumber: 'BD-883192039IN',
    courierName: 'BlueDart Air Express',
    timeline: [
      { status: 'placed', title: 'Order Placed', description: 'Order received & payment confirmed via UPI', time: '18 Aug, 11:30 AM', completed: true },
      { status: 'confirmed', title: 'Quality Inspection', description: 'Triple nitrogen seal & purity check passed', time: '18 Aug, 02:15 PM', completed: true },
      { status: 'packed', title: 'Packed & Dispatched', description: 'Dispatched from Kashmir Hub Warehouse', time: '19 Aug, 08:30 AM', completed: true },
      { status: 'shipped', title: 'In Transit', description: 'Arrived at Bengaluru Airport Sort Facility', time: '19 Aug, 09:45 PM', completed: true },
      { status: 'out_for_delivery', title: 'Out For Delivery', description: 'Delivery executive Ramesh Kumar is on the way (PIN: 4891)', time: '20 Aug, 09:15 AM', completed: true },
      { status: 'delivered', title: 'Delivered', description: 'Package handed over with safety OTP', time: 'Expected 20 Aug, 04:00 PM', completed: false },
    ]
  },
  {
    id: 'ord-102',
    orderNumber: 'AV-2026-77312',
    createdAt: '12 Aug 2026, 04:20 PM',
    items: [
      {
        id: 'combo-royal-5-in-1-treasure-1kg (5x200g)',
        productId: 'combo-royal-5-in-1-treasure',
        product: PRODUCTS[16],
        selectedWeight: '1kg (5x200g)',
        price: 2199,
        originalPrice: 2799,
        quantity: 1,
      }
    ],
    shippingAddress: {
      id: 'addr-1',
      fullName: 'Vaibhav Garg',
      phone: '+91 98765 43210',
      streetAddress: 'Flat 402, Royal Palms Heights, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      pinCode: '560038',
      type: 'Home',
      isDefault: true,
    },
    deliveryMethod: 'standard',
    shippingCost: 0,
    discountAmount: 300,
    giftWrap: true,
    giftMessage: 'Happy Festive Season from AmritVana!',
    subtotal: 2199,
    tax: 95,
    totalAmount: 1994,
    paymentMethod: 'card',
    paymentStatus: 'paid',
    orderStatus: 'delivered',
    estimatedDelivery: 'Delivered on 15 Aug',
    trackingNumber: 'DLH-992104882',
    courierName: 'Delhivery Express',
    timeline: [
      { status: 'placed', title: 'Order Placed', description: 'Order received & verified', time: '12 Aug, 04:20 PM', completed: true },
      { status: 'confirmed', title: 'Quality Verification', description: 'Handcrafted Wooden Hamper prepared', time: '12 Aug, 06:10 PM', completed: true },
      { status: 'packed', title: 'Packed & Dispatched', description: 'Dispatched from Central Warehouse', time: '13 Aug, 10:00 AM', completed: true },
      { status: 'shipped', title: 'In Transit', description: 'Arrived at Bengaluru Facility', time: '14 Aug, 07:30 PM', completed: true },
      { status: 'out_for_delivery', title: 'Out For Delivery', description: 'Courier out for delivery', time: '15 Aug, 10:00 AM', completed: true },
      { status: 'delivered', title: 'Delivered', description: 'Delivered to recipient. Signature captured.', time: '15 Aug, 02:40 PM', completed: true },
    ]
  }
];

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Navigation
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [viewParams, setViewParams] = useState<Record<string, any>>({});

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('amritvana_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial cart item for a lively feel
    return [
      {
        id: 'almond-mamra-kashmiri-500g',
        productId: 'almond-mamra-kashmiri',
        product: PRODUCTS[0],
        selectedWeight: '500g',
        price: 1890,
        originalPrice: 2299,
        quantity: 1,
      },
      {
        id: 'cashew-w180-king-jumbo-500g',
        productId: 'cashew-w180-king-jumbo',
        product: PRODUCTS[4],
        selectedWeight: '500g',
        price: 1040,
        originalPrice: 1250,
        quantity: 1,
      }
    ];
  });

  // Wishlist
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem('amritvana_wishlist');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return [
      {
        productId: 'dates-ajwa-al-madinah',
        product: PRODUCTS[11],
        selectedWeight: '500g',
        addedAt: 'Yesterday',
      },
      {
        productId: 'walnut-kashmiri-snow-white-halves',
        product: PRODUCTS[6],
        selectedWeight: '500g',
        addedAt: '3 days ago',
      }
    ];
  });

  // User
  const [user, setUser] = useState<UserProfile | null>(() => {
    return {
      id: 'usr-1',
      name: 'Vaibhav Garg',
      email: 'vaibhavgarg0011@gmail.com',
      phone: '+91 98765 43210',
      loyaltyCoins: 420,
      referralCode: 'AMRIT-VAIBHAV',
      memberTier: 'Gold',
      addresses: [
        {
          id: 'addr-1',
          fullName: 'Vaibhav Garg',
          phone: '+91 98765 43210',
          streetAddress: 'Flat 402, Royal Palms Heights, 12th Main Road, Indiranagar',
          city: 'Bengaluru',
          state: 'Karnataka',
          pinCode: '560038',
          type: 'Home',
          isDefault: true,
        },
        {
          id: 'addr-2',
          fullName: 'Vaibhav Garg (Work)',
          phone: '+91 98765 43210',
          streetAddress: 'Tech Park Tower 3, Floor 6, Outer Ring Road, Bellandur',
          city: 'Bengaluru',
          state: 'Karnataka',
          pinCode: '560103',
          type: 'Office',
          isDefault: false,
        }
      ]
    };
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('amritvana_orders');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_SAMPLE_ORDERS;
  });

  const [currentOrder, setCurrentOrder] = useState<Order | null>(INITIAL_SAMPLE_ORDERS[0]);

  // Saved Addresses
  const [savedAddresses, setSavedAddresses] = useState<Address[]>(() => {
    return user?.addresses || [
      {
        id: 'addr-1',
        fullName: 'Vaibhav Garg',
        phone: '+91 98765 43210',
        streetAddress: 'Flat 402, Royal Palms Heights, Indiranagar',
        city: 'Bengaluru',
        state: 'Karnataka',
        pinCode: '560038',
        type: 'Home',
        isDefault: true,
      }
    ];
  });

  // Coupons & Gifting
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(COUPONS[0]); // AMRIT15 default
  const [isGiftWrap, setIsGiftWrap] = useState<boolean>(false);
  const [giftMessage, setGiftMessage] = useState<string>('');

  // Modals & UI States
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState<boolean>(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDeliveryPincode, setDeliveryPincode] = useState<string>('560038');

  // Toasts
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('amritvana_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('amritvana_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem('amritvana_orders', JSON.stringify(orders));
    } catch (e) {
      console.error(e);
    }
  }, [orders]);

  // Toast Helper
  const showToast = (message: string, type: Toast['type'] = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Navigation Helper
  const navigate = (view: AppView, params: Record<string, any> = {}) => {
    setCurrentView(view);
    setViewParams(params);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cart operations
  const addToCart = (product: Product, selectedWeight?: string, quantity: number = 1) => {
    const weight = selectedWeight || product.defaultWeight;
    const weightOption = product.weightOptions.find((w) => w.weight === weight) || product.weightOptions[0];
    const itemId = `${product.id}-${weight}`;

    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === itemId);
      if (existing) {
        return prevCart.map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            productId: product.id,
            product,
            selectedWeight: weight,
            price: weightOption.price,
            originalPrice: weightOption.originalPrice,
            quantity,
          }
        ];
      }
    });

    showToast(`Added ${quantity}x ${product.name} (${weight}) to cart!`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let discountAmount = 0;
  if (appliedCoupon && subtotal >= appliedCoupon.minOrderValue) {
    if (appliedCoupon.discountType === 'percentage') {
      discountAmount = Math.round((subtotal * appliedCoupon.discountValue) / 100);
    } else {
      discountAmount = appliedCoupon.discountValue;
    }
  }

  // Free shipping threshold is ₹999 or if FREESHIP coupon
  const isFreeShipEligible = subtotal >= 999 || (appliedCoupon?.code === 'FREESHIP' && subtotal >= 499);
  const shippingCost = subtotal > 0 && !isFreeShipEligible ? 70 : 0;
  const freeShippingRemaining = Math.max(0, 999 - subtotal);
  const giftWrapCost = isGiftWrap ? 99 : 0;
  const taxableAmount = Math.max(0, subtotal - discountAmount);
  const taxAmount = Math.round(taxableAmount * 0.05); // 5% GST on packaged food
  const grandTotal = taxableAmount + shippingCost + taxAmount + giftWrapCost;

  // Coupon
  const applyCoupon = (code: string) => {
    const found = COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      return { success: false, message: 'Invalid coupon code. Try AMRIT15 or ROYALCOMBO' };
    }
    if (subtotal < found.minOrderValue) {
      return { 
        success: false, 
        message: `Minimum order value for ${found.code} is ₹${found.minOrderValue}. Add ₹${found.minOrderValue - subtotal} more.` 
      };
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully!`, 'success');
    return { success: true, message: 'Coupon applied successfully!' };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  const setGiftOptions = (enabled: boolean, message: string = '') => {
    setIsGiftWrap(enabled);
    if (message) setGiftMessage(message);
    if (enabled) {
      showToast('Luxury Gift Packaging added (+₹99)', 'success');
    }
  };

  // Wishlist
  const toggleWishlist = (product: Product, weight?: string) => {
    const exists = wishlist.some((item) => item.productId === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.productId !== product.id));
      showToast(`Removed ${product.name} from Wishlist`, 'info');
    } else {
      setWishlist((prev) => [
        ...prev,
        {
          productId: product.id,
          product,
          selectedWeight: weight || product.defaultWeight,
          addedAt: 'Just now',
        }
      ]);
      showToast(`Saved ${product.name} to Wishlist ❤️`, 'success');
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.productId === productId);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.productId !== productId));
    showToast('Removed from wishlist', 'info');
  };

  const moveToCartFromWishlist = (item: WishlistItem) => {
    addToCart(item.product, item.selectedWeight, 1);
    removeFromWishlist(item.productId);
  };

  // Quick View
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Address
  const addSavedAddress = (addressData: Omit<Address, 'id'>) => {
    const newAddress: Address = {
      ...addressData,
      id: `addr-${Date.now()}`,
    };
    setSavedAddresses((prev) => [newAddress, ...prev]);
    showToast('Delivery address saved!', 'success');
  };

  // Orders
  const placeOrder = (orderData: Partial<Order>): Order => {
    const orderNumber = `AV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const createdDateStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) + ', ' + 
      now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: createdDateStr,
      items: [...cart],
      shippingAddress: orderData.shippingAddress || savedAddresses[0],
      deliveryMethod: orderData.deliveryMethod || 'standard',
      shippingCost: orderData.shippingCost ?? shippingCost,
      couponApplied: appliedCoupon || undefined,
      discountAmount,
      giftWrap: isGiftWrap,
      giftMessage: giftMessage || undefined,
      subtotal,
      tax: taxAmount,
      totalAmount: grandTotal,
      paymentMethod: orderData.paymentMethod || 'upi',
      paymentStatus: 'paid',
      orderStatus: 'placed',
      estimatedDelivery: orderData.deliveryMethod === 'express' ? 'Tomorrow by 5 PM' : '3-4 Business Days',
      trackingNumber: `AV-EXP-${Math.floor(10000000 + Math.random() * 90000000)}`,
      courierName: orderData.deliveryMethod === 'express' ? 'BlueDart Air Cargo' : 'Delhivery Surface',
      timeline: [
        { status: 'placed', title: 'Order Placed', description: 'Order received and verified successfully', time: createdDateStr, completed: true },
        { status: 'confirmed', title: 'Quality Sorting & Weight Check', description: 'Harvest vacuum nitrogen seal in progress', time: 'Pending', completed: false },
        { status: 'packed', title: 'Packaging Completed', description: 'Dispatched to primary sorting facility', time: 'Pending', completed: false },
        { status: 'shipped', title: 'Handed to Courier Partner', description: 'Waybill & tracking active', time: 'Pending', completed: false },
        { status: 'out_for_delivery', title: 'Out for Delivery', description: 'Delivery agent assigned', time: 'Pending', completed: false },
        { status: 'delivered', title: 'Delivered', description: 'Delivered to customer address', time: 'Pending', completed: false },
      ],
      ...orderData,
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCurrentOrder(newOrder);
    clearCart();
    
    // Reward coins
    if (user) {
      const currentCoins = user.loyaltyCoins || user.amritCoins || 0;
      const updatedCoins = currentCoins + Math.round(grandTotal * 0.05);
      setUser({
        ...user,
        loyaltyCoins: updatedCoins,
        amritCoins: updatedCoins,
      });
    }

    return newOrder;
  };

  const createOrder = placeOrder;

  // User auth mock
  const login = (emailOrPhone: string, _password?: string) => {
    const defaultUser: UserProfile = {
      id: 'usr-1',
      name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Vaibhav Garg',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'vaibhavgarg0011@gmail.com',
      phone: emailOrPhone.startsWith('+') ? emailOrPhone : '+91 98765 43210',
      loyaltyCoins: 420,
      amritCoins: 420,
      referralCode: 'AMRIT-GIFT100',
      memberTier: 'Gold',
      membershipTier: 'Gold',
      addresses: savedAddresses,
      savedAddresses: savedAddresses,
    };
    setUser(defaultUser);
    showToast(`Welcome back, ${defaultUser.name}!`, 'success');
    return { success: true, message: 'Logged in successfully' };
  };

  const register = (name: string, email: string, _password?: string, phone?: string) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name,
      email,
      phone: phone || '+91 98765 43210',
      loyaltyCoins: 100, // Welcome bonus
      amritCoins: 100,
      referralCode: `AMRIT-${name.toUpperCase().replace(/\s+/g, '')}`,
      memberTier: 'Silver',
      membershipTier: 'Silver',
      addresses: savedAddresses,
      savedAddresses: savedAddresses,
    };
    setUser(newUser);
    showToast(`Account created! 100 Welcome Amrit Coins added 🪙`, 'success');
    return { success: true, message: 'Account registered successfully' };
  };

  const logout = () => {
    setUser(null);
    showToast('Logged out successfully', 'info');
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <ShopContext.Provider
      value={{
        currentView,
        viewParams,
        navigate,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        subtotal,
        discountAmount,
        shippingCost,
        taxAmount,
        grandTotal,
        freeShippingRemaining,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        isGiftWrap,
        giftMessage,
        setGiftOptions,
        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        moveToCartFromWishlist,
        quickViewProduct,
        openQuickView,
        closeQuickView,
        isSearchModalOpen,
        setIsSearchModalOpen,
        searchQuery,
        setSearchQuery,
        user,
        login,
        register,
        logout,
        orders,
        currentOrder,
        placeOrder,
        createOrder,
        savedAddresses,
        addSavedAddress,
        selectedDeliveryPincode,
        setDeliveryPincode,
        toasts,
        showToast,
        removeToast,
        formatPrice,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
