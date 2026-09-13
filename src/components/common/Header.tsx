import React, { useState } from 'react';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ChevronDown, 
  Sparkles, 
  Truck, 
  PhoneCall, 
  Flame, 
  ShieldCheck, 
  Package, 
  Sliders, 
  LogOut, 
  Gift 
} from 'lucide-react';
import { useShop, AppView } from '../../context/ShopContext';
import { CATEGORIES_META } from '../../data/products';

export const Header: React.FC = () => {
  const { 
    currentView, 
    navigate, 
    cartCount, 
    wishlist, 
    setIsCartDrawerOpen, 
    setIsSearchModalOpen,
    user,
    logout
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const handleNav = (view: AppView, params?: Record<string, any>) => {
    navigate(view, params);
    setIsMobileMenuOpen(false);
    setIsCategoryDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-xs border-b border-[#EEDCC6] transition-all duration-300">
      {/* Top Announcement & Trust Bar */}
      <div className="bg-[#2D4628] text-[#FDF8F3] text-xs py-2 px-4 border-b border-[#233820]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2 text-center sm:text-left">
          <div className="flex items-center gap-2 font-medium">
            <span className="bg-[#D97706]/30 text-[#FDE68A] px-2.5 py-0.5 rounded-full text-[11px] font-semibold flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#FBBF24]" /> FRESH HARVEST 2026
            </span>
            <span className="hidden md:inline text-[#FAF5EE]/90">
              Get flat 15% OFF above ₹999 with coupon <span className="font-bold text-[#FBBF24] underline underline-offset-2">AMRIT15</span>
            </span>
          </div>

          <div className="flex items-center gap-4 text-[#FDF8F3]/80 text-[11px]">
            <button 
              type="button" 
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer" 
              onClick={() => handleNav('order-tracking')}
            >
              <Package className="w-3.5 h-3.5 text-[#D97706]" /> Track Order
            </button>
            <span className="hidden sm:inline text-[#EEDCC6]/40">•</span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-[#A7F3D0]" /> Free Delivery over ₹999
            </span>
            <span className="hidden sm:inline text-[#EEDCC6]/40">•</span>
            <span className="flex items-center gap-1 hover:text-white">
              <PhoneCall className="w-3 h-3 text-[#D97706]" /> +91 98765 43210
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Mobile Menu Toggle */}
          <button 
            type="button" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
            className="lg:hidden p-2 text-[#2D4628] hover:text-[#D97706] rounded-xl focus:outline-hidden hover:bg-[#F5EFE7] transition-colors"
            aria-label="Toggle Navigation"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Logo / Brand - Natural Tones Theme */}
          <div 
            onClick={() => handleNav('home')} 
            className="cursor-pointer flex items-center gap-3 group select-none"
          >
            <div className="w-10 h-10 bg-[#2D4628] rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform duration-300">
              <span className="text-white font-serif text-xl font-bold">A</span>
            </div>
            <div>
              <span className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-[#2D4628] group-hover:text-[#D97706] transition-colors">
                AmritVana
              </span>
              <span className="block text-[10px] tracking-[0.25em] uppercase font-bold text-[#D97706] -mt-1 font-sans">
                Naturally Pure Dry Fruits
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-3 text-[#2D4628] font-medium text-sm">
            <button 
              onClick={() => handleNav('home')}
              className={`px-3.5 py-2 rounded-full transition-all ${
                currentView === 'home' 
                  ? 'text-[#D97706] font-bold bg-[#F5EFE7]' 
                  : 'hover:text-[#D97706] hover:bg-[#FDF8F3]'
              }`}
            >
              Home
            </button>

            <button 
              onClick={() => handleNav('shop')}
              className={`px-3.5 py-2 rounded-full transition-all ${
                currentView === 'shop' 
                  ? 'text-[#D97706] font-bold bg-[#F5EFE7]' 
                  : 'hover:text-[#D97706] hover:bg-[#FDF8F3]'
              }`}
            >
              Shop
            </button>

            {/* Categories Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsCategoryDropdownOpen(true)}
              onMouseLeave={() => setIsCategoryDropdownOpen(false)}
            >
              <button 
                onClick={() => handleNav('shop')}
                className={`flex items-center gap-1 px-3.5 py-2 rounded-full transition-all ${
                  currentView === 'category' 
                    ? 'text-[#D97706] font-bold bg-[#F5EFE7]' 
                    : 'hover:text-[#D97706] hover:bg-[#FDF8F3]'
                }`}
              >
                Categories <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {/* Mega Dropdown Menu */}
              {isCategoryDropdownOpen && (
                <div className="absolute top-full left-0 w-[580px] max-h-[80vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border border-[#EEDCC6] p-6 grid grid-cols-2 gap-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="col-span-2 pb-2 mb-1 border-b border-[#EEDCC6] flex items-center justify-between sticky top-0 bg-white/95 backdrop-blur-xs z-10">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#2D4628]">Explore Dry Fruit Harvests</span>
                    <span 
                      onClick={() => handleNav('shop')} 
                      className="text-xs font-semibold text-[#D97706] hover:underline cursor-pointer"
                    >
                      View All Products →
                    </span>
                  </div>

                  {CATEGORIES_META.map((cat) => (
                    <div 
                      key={cat.id} 
                      onClick={() => handleNav('category', { categoryId: cat.id })}
                      className="flex items-center gap-3 p-2.5 rounded-2xl hover:bg-[#F5EFE7] cursor-pointer transition-colors group border border-transparent hover:border-[#EEDCC6]"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#F5EFE7] flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                        {cat.icon}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-[#2D4628] group-hover:text-[#D97706] truncate">{cat.name}</h4>
                          <span className="text-[10px] text-stone-500">({cat.hindiName})</span>
                        </div>
                        <p className="text-[11px] text-stone-600 truncate">{cat.tagline}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <button 
              onClick={() => handleNav('combos')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all ${
                currentView === 'combos' 
                  ? 'text-[#D97706] font-bold bg-[#F5EFE7]' 
                  : 'hover:text-[#D97706] hover:bg-[#FDF8F3]'
              }`}
            >
              <Gift className="w-3.5 h-3.5 text-[#D97706]" /> Combos
            </button>

            <button 
              onClick={() => handleNav('custom-mix')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full transition-all ${
                currentView === 'custom-mix' 
                  ? 'text-[#D97706] font-bold bg-[#F5EFE7]' 
                  : 'hover:text-[#D97706] hover:bg-[#FDF8F3]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5 text-[#2D4628]" /> Custom Mix
            </button>

            <button 
              onClick={() => handleNav('offers')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-full font-semibold transition-all ${
                currentView === 'offers' 
                  ? 'text-[#D97706] font-bold bg-[#F5EFE7]' 
                  : 'text-[#D97706] hover:bg-[#F5EFE7]'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-[#D97706] animate-pulse" /> Deals
            </button>

            <button 
              onClick={() => handleNav('about')}
              className={`px-3.5 py-2 rounded-full transition-all ${
                currentView === 'about' 
                  ? 'text-[#D97706] font-bold bg-[#F5EFE7]' 
                  : 'hover:text-[#D97706] hover:bg-[#FDF8F3]'
              }`}
            >
              About
            </button>

            <button 
              onClick={() => handleNav('blog')}
              className={`px-3.5 py-2 rounded-full transition-all ${
                currentView === 'blog' 
                  ? 'text-[#D97706] font-bold bg-[#F5EFE7]' 
                  : 'hover:text-[#D97706] hover:bg-[#FDF8F3]'
              }`}
            >
              Blog
            </button>
          </nav>

          {/* Action Buttons: Search, Wishlist, Cart, Profile */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Search Trigger (Natural Theme pill style) */}
            <button 
              onClick={() => setIsSearchModalOpen(true)}
              className="relative px-3 sm:px-4 py-2 bg-[#F5EFE7] hover:bg-[#EEDCC6]/50 rounded-full flex items-center gap-2 border border-transparent hover:border-[#EEDCC6] transition-all text-[#2D4628]"
              title="Search dry fruits, almonds, cashews..."
              aria-label="Search"
            >
              <Search className="w-4 h-4 opacity-70" />
              <span className="hidden md:inline text-xs opacity-75 font-medium">Search nuts...</span>
            </button>

            {/* Wishlist */}
            <button 
              onClick={() => handleNav('wishlist')}
              className="p-2.5 text-[#2D4628] hover:text-[#D97706] hover:bg-[#F5EFE7] rounded-full transition-colors relative"
              title="View Wishlist"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-[#D97706] text-white rounded-full text-[10px] font-bold flex items-center justify-center shadow-xs animate-in zoom-in-50">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Drawer Trigger */}
            <button 
              onClick={() => setIsCartDrawerOpen(true)}
              className="flex items-center gap-2 py-2 px-3.5 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full transition-all shadow-md hover:shadow-lg active:scale-95 group"
              title="View Cart"
              aria-label="Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 text-[#FDF8F3] group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-[#D97706] text-white rounded-full text-[10px] font-black flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline font-bold text-xs text-[#FDF8F3]">
                Cart
              </span>
            </button>

            {/* User Account / Profile */}
            <div className="relative">
              {user ? (
                <button
                  onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                  className="flex items-center gap-1.5 p-1.5 sm:px-3 sm:py-1.5 rounded-full border border-[#EEDCC6] hover:border-[#2D4628] bg-[#F5EFE7] transition-colors text-xs font-semibold text-[#2D4628]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#2D4628] text-white flex items-center justify-center font-bold text-[10px]">
                    {user.name.charAt(0)}
                  </div>
                  <span className="hidden md:inline max-w-[80px] truncate">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-3 h-3 text-[#2D4628]/60" />
                </button>
              ) : (
                <button
                  onClick={() => handleNav('auth')}
                  className="p-2 sm:py-2 sm:px-3.5 rounded-full border border-[#EEDCC6] hover:border-[#2D4628] text-[#2D4628] hover:bg-[#F5EFE7] text-xs font-semibold flex items-center gap-1.5 transition-colors"
                >
                  <User className="w-4 h-4 text-[#2D4628]" />
                  <span className="hidden sm:inline">Sign In</span>
                </button>
              )}

              {/* User Dropdown Menu */}
              {user && isUserDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-60 bg-white rounded-3xl shadow-2xl border border-[#EEDCC6] py-3 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setIsUserDropdownOpen(false)}
                >
                  <div className="px-4 py-2 border-b border-[#EEDCC6]">
                    <p className="text-xs font-bold text-[#2D4628] truncate">{user.name}</p>
                    <p className="text-[11px] text-stone-500 truncate">{user.email}</p>
                    <div className="mt-2 flex items-center justify-between text-[11px] font-semibold text-[#2D4628] bg-[#F5EFE7] px-2.5 py-1 rounded-xl">
                      <span>{user.membershipTier || 'Member'}</span>
                      <span className="text-[#D97706]">🪙 {user.amritCoins || 0} Coins</span>
                    </div>
                  </div>

                  <div className="py-2 text-xs text-[#2D4628]">
                    <button 
                      onClick={() => { setIsUserDropdownOpen(false); handleNav('dashboard'); }}
                      className="w-full text-left px-4 py-2 hover:bg-[#F5EFE7] flex items-center gap-2 font-medium"
                    >
                      <Package className="w-3.5 h-3.5 text-[#2D4628]" /> My Orders & Invoices
                    </button>
                    <button 
                      onClick={() => { setIsUserDropdownOpen(false); handleNav('wishlist'); }}
                      className="w-full text-left px-4 py-2 hover:bg-[#F5EFE7] flex items-center gap-2 font-medium"
                    >
                      <Heart className="w-3.5 h-3.5 text-[#D97706]" /> My Wishlist ({wishlist.length})
                    </button>
                  </div>

                  <div className="border-t border-[#EEDCC6] pt-1">
                    <button 
                      onClick={() => { setIsUserDropdownOpen(false); logout(); }}
                      className="w-full text-left px-4 py-2 hover:bg-rose-50 text-rose-700 text-xs font-semibold flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5" /> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[110px] bg-stone-900/60 backdrop-blur-xs z-50">
          <div className="bg-white w-full max-h-[85vh] overflow-y-auto p-6 rounded-b-[2rem] shadow-2xl border-b border-[#EEDCC6] animate-in slide-in-from-top-4 duration-300">
            <div className="flex flex-col space-y-3">
              <button 
                onClick={() => handleNav('home')} 
                className="text-left py-2.5 px-3 rounded-2xl font-bold text-[#2D4628] hover:bg-[#F5EFE7]"
              >
                Home
              </button>
              <button 
                onClick={() => handleNav('shop')} 
                className="text-left py-2.5 px-3 rounded-2xl font-bold text-[#2D4628] hover:bg-[#F5EFE7]"
              >
                Shop All Dry Fruits
              </button>
              <button 
                onClick={() => handleNav('combos')} 
                className="text-left py-2.5 px-3 rounded-2xl font-bold text-[#2D4628] hover:bg-[#F5EFE7] flex items-center gap-2"
              >
                <Gift className="w-4 h-4 text-[#D97706]" /> Curated Combos & Hampers
              </button>
              <button 
                onClick={() => handleNav('custom-mix')} 
                className="text-left py-2.5 px-3 rounded-2xl font-bold text-[#2D4628] hover:bg-[#F5EFE7] flex items-center gap-2"
              >
                <Sliders className="w-4 h-4 text-[#2D4628]" /> Build Custom Nut Jar
              </button>
              <button 
                onClick={() => handleNav('offers')} 
                className="text-left py-2.5 px-3 rounded-2xl font-bold text-[#D97706] hover:bg-[#F5EFE7] flex items-center gap-2"
              >
                <Flame className="w-4 h-4 text-[#D97706]" /> Deals & Offers
              </button>

              <div className="border-t border-[#EEDCC6] my-2 pt-2">
                <p className="text-xs font-bold text-stone-500 uppercase tracking-wider px-3 mb-2">Shop By Categories</p>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORIES_META.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleNav('category', { categoryId: c.id })}
                      className="text-left p-2.5 rounded-xl bg-[#F5EFE7] hover:bg-[#EEDCC6] text-xs font-medium text-[#2D4628] flex items-center gap-2 border border-[#EEDCC6]/50"
                    >
                      <span>{c.icon}</span> {c.name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="border-t border-[#EEDCC6] my-2 pt-2 flex flex-col space-y-2 text-sm text-[#2D4628]">
                <button onClick={() => handleNav('about')} className="text-left py-1.5 px-3">About AmritVana</button>
                <button onClick={() => handleNav('blog')} className="text-left py-1.5 px-3">Health Blog & Sourcing</button>
                <button onClick={() => handleNav('order-tracking')} className="text-left py-1.5 px-3">Track Live Order</button>
                <button onClick={() => handleNav('contact')} className="text-left py-1.5 px-3">Customer Support</button>
              </div>

              {user ? (
                <div className="border-t border-[#EEDCC6] pt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-[#2D4628]">{user.name}</p>
                    <p className="text-[11px] text-stone-500">{user.email}</p>
                  </div>
                  <button onClick={logout} className="text-xs font-semibold text-rose-700">Log Out</button>
                </div>
              ) : (
                <button 
                  onClick={() => handleNav('auth')}
                  className="w-full py-3.5 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full font-bold text-sm shadow-md"
                >
                  Login / Create Account
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
