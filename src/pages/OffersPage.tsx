import React, { useState } from 'react';
import { Tag, Flame, Copy, Check, ArrowRight } from 'lucide-react';
import { COUPONS } from '../data/coupons';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useShop } from '../context/ShopContext';

export const OffersPage: React.FC = () => {
  const { applyCoupon, showToast, navigate } = useShop();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const dealProducts = PRODUCTS.filter((p) => p.isDeal || p.badge);

  const handleApply = (code: string) => {
    applyCoupon(code);
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    showToast(`Coupon ${code} copied & applied to your cart!`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-[#2D4628] font-bold">Deals & Offers</span>
        </div>

        {/* Hero Header */}
        <div className="bg-[#2D4628] rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl border border-[#EEDCC6]/30 mb-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#1E331B] text-[#FDE68A] border border-[#EEDCC6]/30 px-3.5 py-1 rounded-full text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-[#FDE68A]" />
              <span>FESTIVAL & HARVEST SAVINGS HUB</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Exclusive Offers & Discount Coupons
            </h1>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Unlock extraordinary savings on royal Kashmiri Mamra, King Cashews, Medjool Dates, and curated gift boxes. Apply active coupon codes directly to your checkout.
            </p>
          </div>
        </div>

        {/* Active Coupons Grid */}
        <div className="mb-14">
          <div className="flex items-center gap-2 mb-6">
            <Tag className="w-5 h-5 text-[#2D4628]" />
            <h2 className="font-serif text-2xl font-bold text-[#2D4628]">
              Active Promo Coupons
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {COUPONS.map((coupon) => (
              <div
                key={coupon.code}
                className="bg-white rounded-[2rem] p-6 border border-[#EEDCC6] shadow-sm hover:shadow-xl hover:border-[#2D4628] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#EEDCC6]/60">
                    <span className="font-mono text-base font-extrabold text-[#2D4628] bg-[#FAF5EE] border border-[#EEDCC6] px-3 py-1 rounded-xl">
                      {coupon.code}
                    </span>
                    <span className="text-xs font-bold text-[#D97706] bg-[#FAF5EE] border border-[#EEDCC6] px-2.5 py-1 rounded-full">
                      {coupon.discountType === 'percentage' ? `${coupon.discountValue}% OFF` : `₹${coupon.discountValue} FLAT OFF`}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 font-medium mt-3">
                    {coupon.description}
                  </p>

                  <div className="mt-3 space-y-1 text-[11px] text-stone-500">
                    <div>Min. Cart Value: <strong>₹{coupon.minOrderValue || 499}</strong></div>
                    {coupon.maxDiscount && <div>Max Discount: <strong>₹{coupon.maxDiscount}</strong></div>}
                  </div>
                </div>

                <div className="pt-4 mt-4 border-t border-[#EEDCC6]/60 flex items-center justify-between">
                  <span className="text-[10px] text-stone-400">Expires: {coupon.expiresAt}</span>
                  <button
                    onClick={() => handleApply(coupon.code)}
                    className="px-4 py-2 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    {copiedCode === coupon.code ? (
                      <>
                        <Check className="w-3.5 h-3.5" /> Applied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" /> Apply Code
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flash Sale Products */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#2D4628]">
                Discounted Dry Fruit Deals
              </h2>
              <p className="text-xs text-stone-600">Up to 25% off regular prices with free nitrogen pouch</p>
            </div>
            <button
              onClick={() => navigate('shop')}
              className="text-xs font-bold text-[#D97706] hover:underline flex items-center gap-1"
            >
              Shop All <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {dealProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
