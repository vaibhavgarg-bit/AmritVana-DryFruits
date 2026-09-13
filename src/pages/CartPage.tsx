import React, { useState } from 'react';
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  Truck, 
  Gift, 
  Tag, 
  Check, 
  AlertCircle, 
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    subtotal,
    discountAmount,
    shippingCost,
    grandTotal,
    freeShippingRemaining,
    formatPrice,
    navigate,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    isGiftWrap,
    setGiftOptions,
    giftMessage,
  } = useShop();

  const [couponCodeInput, setCouponCodeInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [giftMsgInput, setGiftMsgInput] = useState(giftMessage);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCodeInput.trim()) return;
    const res = applyCoupon(couponCodeInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponCodeInput('');
    }
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / 999) * 100));

  if (cart.length === 0) {
    return (
      <div className="bg-[#FDF8F3] min-h-screen py-16 flex items-center justify-center px-4">
        <div className="bg-white rounded-[2.5rem] p-12 sm:p-16 text-center border border-[#EEDCC6] shadow-xl max-w-lg w-full space-y-5">
          <div className="w-20 h-20 bg-[#F5EFE7] text-[#2D4628] rounded-full flex items-center justify-center mx-auto text-3xl border border-[#EEDCC6]">
            🛒
          </div>
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#2D4628]">Your Cart is Currently Empty</h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 leading-relaxed">
              Explore our farm-fresh royal dry fruits, crunchy roasted mixes, and festive keepsake gift boxes!
            </p>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="px-8 py-4 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95"
          >
            Start Shopping Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-[#2D4628] font-bold">Shopping Cart</span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b border-[#EEDCC6] mb-8 gap-4">
          <div>
            <h1 className="font-serif text-3xl font-bold text-[#2D4628]">
              Shopping Cart ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
            </h1>
            <p className="text-xs text-stone-600 mt-0.5">
              Review your items, apply coupons, and choose gift packaging options.
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-xs text-rose-700 hover:underline font-semibold flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Clear Cart
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-[#FAF5EE] border border-[#EEDCC6] rounded-2xl p-4 mb-8">
          <div className="flex items-center justify-between text-xs sm:text-sm mb-2">
            <span className="font-semibold text-[#2D4628] flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#2D4628]" />
              {freeShippingRemaining === 0 ? (
                <strong className="text-[#2D4628]">🎉 Congratulations! You have unlocked FREE Express Delivery!</strong>
              ) : (
                <span>Add <strong className="text-[#D97706] font-bold">{formatPrice(freeShippingRemaining)}</strong> more to unlock <strong>FREE Express Shipping</strong></span>
              )}
            </span>
            <span className="font-bold text-[#2D4628]">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-[#EEDCC6]/50 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-[#2D4628] h-full rounded-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Cart Items List (8 Cols) */}
          <div className="lg:col-span-8 space-y-4">
            {cart.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-5 sm:p-6 border border-[#EEDCC6] shadow-xs flex flex-col sm:flex-row gap-5 items-start sm:items-center justify-between"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name} 
                    className="w-20 h-20 rounded-2xl object-cover border border-[#EEDCC6] bg-[#FAF5EE] shrink-0" 
                  />
                  <div className="min-w-0">
                    <h3 
                      onClick={() => navigate('product-detail', { slug: item.product.slug })}
                      className="font-serif font-bold text-sm sm:text-base text-[#2D4628] hover:text-[#D97706] cursor-pointer truncate"
                    >
                      {item.product.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-bold text-[#2D4628] bg-[#F5EFE7] border border-[#EEDCC6] px-2.5 py-0.5 rounded-full">
                        {item.selectedWeight}
                      </span>
                      <span className="text-xs text-stone-500 font-mono">
                        {formatPrice(item.price)} each
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-[#EEDCC6]/40">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-[#EEDCC6] rounded-full bg-[#FAF5EE]">
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 px-3 text-[#2D4628] hover:bg-[#EEDCC6] transition-colors rounded-l-full font-bold"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2.5 text-xs font-bold text-[#2D4628] min-w-[24px] text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 px-3 text-[#2D4628] hover:bg-[#EEDCC6] transition-colors rounded-r-full font-bold"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Total item price */}
                  <div className="text-right min-w-[80px]">
                    <span className="font-serif font-bold text-base text-[#2D4628] block">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    {item.originalPrice > item.price && (
                      <span className="text-[11px] text-stone-400 line-through">
                        {formatPrice(item.originalPrice * item.quantity)}
                      </span>
                    )}
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Luxury Gift Option Box */}
            <div className="bg-[#FAF5EE] rounded-3xl p-5 border border-[#EEDCC6] space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-white text-[#2D4628] border border-[#EEDCC6] flex items-center justify-center">
                    <Gift className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="text-xs sm:text-sm font-bold text-[#2D4628] block">
                      Add Luxury Gift Wrapping & Greeting Card (+₹99)
                    </strong>
                    <span className="text-xs text-stone-500">
                      Artisanal gold-foil keepsake box with personalized message ribbon
                    </span>
                  </div>
                </div>
                <input 
                  type="checkbox"
                  checked={isGiftWrap}
                  onChange={(e) => setGiftOptions(e.target.checked, giftMsgInput)}
                  className="w-5 h-5 rounded text-[#2D4628] focus:ring-[#2D4628]"
                />
              </label>

              {isGiftWrap && (
                <div className="pt-2 border-t border-[#EEDCC6]">
                  <label className="block text-xs font-bold text-[#2D4628] mb-1">
                    Custom Message on Greeting Card:
                  </label>
                  <input 
                    type="text"
                    value={giftMsgInput}
                    onChange={(e) => {
                      setGiftMsgInput(e.target.value);
                      setGiftOptions(true, e.target.value);
                    }}
                    placeholder="e.g. Happy Diwali to Sharma Family! With warm wishes, Aditya"
                    className="w-full text-xs p-2.5 bg-white border border-[#EEDCC6] rounded-xl focus:outline-hidden text-[#2D4628]"
                  />
                </div>
              )}
            </div>

          </div>

          {/* Right Column: Order Summary & Checkout (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#EEDCC6] shadow-xl space-y-5 sticky top-24">
              
              <h2 className="font-serif text-lg font-bold text-[#2D4628] pb-3 border-b border-[#EEDCC6]">
                Order Summary
              </h2>

              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="bg-[#FAF5EE] border border-[#EEDCC6] rounded-2xl p-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2D4628]" />
                    <div>
                      <span className="font-mono font-bold text-[#2D4628]">{appliedCoupon.code}</span>
                      <span className="text-[#D97706] ml-1">(-{formatPrice(discountAmount)})</span>
                    </div>
                  </div>
                  <button onClick={removeCoupon} className="text-rose-600 font-bold hover:underline">
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
                      <input 
                        type="text"
                        value={couponCodeInput}
                        onChange={(e) => setCouponCodeInput(e.target.value)}
                        placeholder="Coupon (e.g. AMRIT15)"
                        className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF5EE] border border-[#EEDCC6] rounded-full font-mono uppercase focus:outline-hidden focus:border-[#2D4628] text-[#2D4628]"
                      />
                    </div>
                    <button 
                      type="submit"
                      className="px-4 py-2 bg-[#2D4628] text-white rounded-full text-xs font-bold hover:bg-[#1E331B] transition-colors"
                    >
                      Apply
                    </button>
                  </div>
                  {couponError && (
                    <p className="text-[11px] text-rose-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {couponError}
                    </p>
                  )}
                </form>
              )}

              {/* Breakdown */}
              <div className="space-y-2.5 text-xs text-stone-600 pt-2 border-t border-[#EEDCC6]">
                <div className="flex justify-between">
                  <span>Cart Subtotal</span>
                  <span className="font-semibold text-[#2D4628]">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#D97706] font-semibold">
                    <span>Coupon Discount ({appliedCoupon?.code})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{shippingCost === 0 ? <strong className="text-[#2D4628] font-bold">FREE</strong> : formatPrice(shippingCost)}</span>
                </div>
                {isGiftWrap && (
                  <div className="flex justify-between text-[#2D4628] font-semibold">
                    <span>Luxury Gift Wrap</span>
                    <span>+₹99</span>
                  </div>
                )}
                <div className="flex justify-between pt-3 border-t border-[#EEDCC6] text-sm font-bold text-[#2D4628]">
                  <span>Grand Total</span>
                  <span className="font-serif text-xl font-black text-[#2D4628]">
                    {formatPrice(grandTotal)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => navigate('checkout')}
                className="w-full py-4 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#2D4628]/20 active:scale-98 transition-all"
              >
                Proceed to Checkout ({formatPrice(grandTotal)}) <ArrowRight className="w-4 h-4" />
              </button>

              {/* Trust Badges */}
              <div className="pt-2 text-center text-[11px] text-stone-500 space-y-1">
                <p className="flex items-center justify-center gap-1 text-[#2D4628]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2D4628]" /> 100% Secure Payment Guarantee
                </p>
                <p>Accepting UPI, RuPay, Visa, Mastercard, NetBanking & COD</p>
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
