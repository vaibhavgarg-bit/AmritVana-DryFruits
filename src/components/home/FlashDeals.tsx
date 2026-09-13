import React, { useState, useEffect } from 'react';
import { Flame, Tag, ArrowRight, Copy, Check } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { COUPONS } from '../../data/coupons';
import { ProductCard } from '../common/ProductCard';
import { useShop } from '../../context/ShopContext';

export const FlashDeals: React.FC = () => {
  const { navigate, showToast, applyCoupon } = useShop();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // Dynamic Countdown Timer (hours, minutes, seconds)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else {
          return { hours: 23, minutes: 59, seconds: 59 };
        }
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dealProducts = PRODUCTS.filter((p) => p.isDeal || p.badge === 'Best Seller').slice(0, 4);

  const handleCopyCoupon = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    showToast(`Coupon ${code} copied & applied to your cart!`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="py-16 bg-[#2D4628] text-white relative overflow-hidden border-b border-[#EEDCC6]/20">
      
      {/* Decorative Natural Ambient Glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#1E331B] rounded-full blur-3xl pointer-events-none opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Deal Header with Countdown */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-12 p-6 sm:p-8 bg-[#1E331B]/80 rounded-[2rem] border border-[#EEDCC6]/20 backdrop-blur-md">
          
          <div className="space-y-2 text-center lg:text-left">
            <div className="inline-flex items-center gap-1.5 bg-[#D97706]/30 text-[#FDE68A] border border-[#D97706]/40 px-3.5 py-1 rounded-full text-xs font-bold">
              <Flame className="w-4 h-4 text-[#FBBF24] animate-pulse" />
              <span>LIMITED HARVEST FLASH SALE</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-white">
              Deals & Pure Harvest Hampers
            </h2>
            <p className="text-xs sm:text-sm text-[#EEDCC6]/80">
              Save up to 25% on export-grade Kashmiri Mamra Almonds, W180 King Cashews, and Royal Boxes.
            </p>
          </div>

          {/* Countdown Clock Display */}
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FDE68A] hidden sm:inline mr-1">
              🔥 Offer Ends In:
            </span>

            {/* Hours */}
            <div className="bg-[#2D4628] border border-[#EEDCC6]/30 rounded-2xl p-2.5 sm:p-3 min-w-[58px] text-center">
              <span className="font-serif text-xl sm:text-2xl font-black text-[#FDE68A]">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="block text-[9px] uppercase font-bold text-[#EEDCC6]/70">Hours</span>
            </div>
            <span className="text-xl font-bold text-[#D97706]">:</span>

            {/* Minutes */}
            <div className="bg-[#2D4628] border border-[#EEDCC6]/30 rounded-2xl p-2.5 sm:p-3 min-w-[58px] text-center">
              <span className="font-serif text-xl sm:text-2xl font-black text-[#FDE68A]">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="block text-[9px] uppercase font-bold text-[#EEDCC6]/70">Mins</span>
            </div>
            <span className="text-xl font-bold text-[#D97706]">:</span>

            {/* Seconds */}
            <div className="bg-[#2D4628] border border-[#EEDCC6]/30 rounded-2xl p-2.5 sm:p-3 min-w-[58px] text-center">
              <span className="font-serif text-xl sm:text-2xl font-black text-[#FDE68A]">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="block text-[9px] uppercase font-bold text-[#EEDCC6]/70">Secs</span>
            </div>
          </div>

        </div>

        {/* Coupons Banner Strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {COUPONS.slice(0, 3).map((coupon) => (
            <div
              key={coupon.code}
              className="bg-[#1E331B]/80 border border-[#EEDCC6]/20 p-4 rounded-2xl flex items-center justify-between gap-3 hover:border-[#D97706]/50 transition-colors"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#D97706] shrink-0" />
                  <span className="font-mono font-bold text-sm text-[#FDE68A] uppercase">{coupon.code}</span>
                </div>
                <p className="text-[11px] text-[#EEDCC6]/80 mt-1 truncate">{coupon.description}</p>
              </div>

              <button
                onClick={() => handleCopyCoupon(coupon.code)}
                className="px-3.5 py-1.5 bg-[#D97706] hover:bg-[#B45309] text-white text-xs font-bold rounded-full transition-colors flex items-center gap-1 shrink-0 shadow-xs"
              >
                {copiedCode === coupon.code ? (
                  <>
                    <Check className="w-3.5 h-3.5" /> Applied
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" /> Apply
                  </>
                )}
              </button>
            </div>
          ))}
        </div>

        {/* Flash Deals Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {dealProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Explore all deals */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('offers')}
            className="text-xs sm:text-sm font-bold text-[#FDE68A] hover:text-white inline-flex items-center gap-1.5 hover:underline"
          >
            View All Festival Offers & Combo Discounts →
          </button>
        </div>

      </div>
    </section>
  );
};
