import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Truck, 
  Gift, 
  Tag, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    removeFromCart,
    updateCartQuantity,
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

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');
  const [showGiftInput, setShowGiftInput] = useState(isGiftWrap);
  const [customGiftMsg, setCustomGiftMsg] = useState(giftMessage);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponError('');
      setCouponInput('');
    }
  };

  const handleProceedCheckout = () => {
    setIsCartDrawerOpen(false);
    navigate('checkout');
  };

  const handleViewFullCart = () => {
    setIsCartDrawerOpen(false);
    navigate('cart');
  };

  const freeShippingProgress = Math.min(100, Math.round((subtotal / 999) * 100));

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1E331B]/60 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDF8F3] shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300 border-l border-[#EEDCC6]">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-[#EEDCC6] flex items-center justify-between bg-[#F5EFE7]">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#2D4628]" />
              <h2 className="font-serif font-bold text-lg text-[#2D4628]">Your Cart</h2>
              <span className="bg-[#2D4628] text-white text-xs font-bold px-2 py-0.5 rounded-full">
                {cart.reduce((s, i) => s + i.quantity, 0)}
              </span>
            </div>
            <button 
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-stone-400 hover:text-[#2D4628] hover:bg-[#EEDCC6] rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-[#FAF5EE] px-5 py-3 border-b border-[#EEDCC6]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-[#2D4628] flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-[#2D4628]" />
                {freeShippingRemaining === 0 ? (
                  <span className="text-[#2D4628] font-bold">🎉 FREE Express Delivery Unlocked!</span>
                ) : (
                  <span>Add <strong className="text-[#D97706]">{formatPrice(freeShippingRemaining)}</strong> more for <strong>FREE Delivery</strong></span>
                )}
              </span>
              <span className="text-[11px] font-bold text-[#2D4628]">{freeShippingProgress}%</span>
            </div>
            <div className="w-full bg-[#EEDCC6] h-2 rounded-full overflow-hidden">
              <div 
                className="bg-[#2D4628] h-full rounded-full transition-all duration-500"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4 divide-y divide-[#EEDCC6]/60">
            {cart.length === 0 ? (
              <div className="text-center py-12 px-4 space-y-4">
                <div className="w-16 h-16 bg-[#F5EFE7] text-[#2D4628] rounded-full flex items-center justify-center mx-auto text-2xl border border-[#EEDCC6]">
                  🌰
                </div>
                <div>
                  <h3 className="font-bold text-[#2D4628] text-base">Your cart is empty</h3>
                  <p className="text-xs text-stone-500 mt-1">Explore our farm-fresh dry fruits and gift boxes!</p>
                </div>
                <button
                  onClick={() => { setIsCartDrawerOpen(false); navigate('shop'); }}
                  className="px-6 py-2.5 bg-[#2D4628] text-white rounded-full text-xs font-bold hover:bg-[#1E331B] transition-colors shadow-sm"
                >
                  Start Shopping Now
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="pt-4 first:pt-0 flex gap-3 group">
                  <img 
                    src={item.product.images[0]} 
                    alt={item.product.name}
                    className="w-18 h-18 rounded-2xl object-cover border border-[#EEDCC6] shrink-0 bg-white" 
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-xs font-bold text-[#2D4628] line-clamp-1 leading-snug">{item.product.name}</h4>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-stone-400 hover:text-rose-600 p-1 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-semibold text-[#2D4628] bg-[#F5EFE7] px-2.5 py-0.5 rounded-full border border-[#EEDCC6]">
                        {item.selectedWeight}
                      </span>
                      <span className="text-[11px] text-stone-500 font-mono">
                        {formatPrice(item.price)} each
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-[#EEDCC6] rounded-full bg-[#F5EFE7]">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="p-1 px-2.5 text-[#2D4628] hover:bg-[#EEDCC6] transition-colors rounded-l-full"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-[#2D4628] min-w-[20px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="p-1 px-2.5 text-[#2D4628] hover:bg-[#EEDCC6] transition-colors rounded-r-full"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-[#2D4628]">
                          {formatPrice(item.price * item.quantity)}
                        </span>
                        {item.originalPrice > item.price && (
                          <span className="block text-[10px] text-stone-400 line-through">
                            {formatPrice(item.originalPrice * item.quantity)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer / Summary (if items exist) */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#EEDCC6] bg-[#FAF5EE] space-y-3">
              
              {/* Coupon Form */}
              {appliedCoupon ? (
                <div className="bg-[#F5EFE7] border border-[#2D4628]/30 rounded-2xl p-2.5 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#2D4628]" />
                    <div>
                      <span className="font-bold text-[#2D4628] font-mono">{appliedCoupon.code}</span>
                      <span className="text-[#D97706] ml-1">(-{formatPrice(discountAmount)})</span>
                    </div>
                  </div>
                  <button 
                    onClick={removeCoupon}
                    className="text-[11px] font-semibold text-rose-700 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-2.5" />
                    <input 
                      type="text"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      placeholder="Coupon Code (AMRIT15)"
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-[#EEDCC6] rounded-full uppercase font-mono placeholder:normal-case focus:outline-hidden focus:border-[#2D4628]"
                    />
                  </div>
                  <button 
                    type="submit"
                    className="px-4 py-2 bg-[#2D4628] text-white text-xs font-bold rounded-full hover:bg-[#1E331B] transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-600 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" /> {couponError}
                </p>
              )}

              {/* Gift Packaging Checkbox */}
              <div className="bg-[#F5EFE7] border border-[#EEDCC6] rounded-2xl p-3">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#D97706]" />
                    <span className="text-xs font-semibold text-[#2D4628]">Add Wooden Gift Box & Note (+₹99)</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={isGiftWrap}
                    onChange={(e) => {
                      setShowGiftInput(e.target.checked);
                      setGiftOptions(e.target.checked, customGiftMsg);
                    }}
                    className="rounded text-[#2D4628] focus:ring-[#2D4628]"
                  />
                </label>
                {showGiftInput && isGiftWrap && (
                  <div className="mt-2 pt-2 border-t border-[#EEDCC6]">
                    <input 
                      type="text" 
                      placeholder="Greeting card message (e.g. Best Wishes - Arjun)"
                      value={customGiftMsg}
                      onChange={(e) => {
                        setCustomGiftMsg(e.target.value);
                        setGiftOptions(true, e.target.value);
                      }}
                      className="w-full text-xs p-2 bg-white border border-[#EEDCC6] rounded-xl focus:outline-hidden"
                    />
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs pt-1 text-stone-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#2D4628]">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#D97706]">
                    <span>Discount</span>
                    <span className="font-semibold">-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{shippingCost === 0 ? <strong className="text-[#2D4628] font-bold">FREE</strong> : formatPrice(shippingCost)}</span>
                </div>
                {isGiftWrap && (
                  <div className="flex justify-between text-[#2D4628]">
                    <span>Luxury Gift Wrap</span>
                    <span>+₹99</span>
                  </div>
                )}
                <div className="flex justify-between border-t border-[#EEDCC6] pt-2 text-sm font-bold text-[#2D4628]">
                  <span>Total Amount</span>
                  <span className="text-[#2D4628] font-serif text-base">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button
                  onClick={handleViewFullCart}
                  className="py-2.5 px-3 border border-[#EEDCC6] bg-white hover:bg-[#F5EFE7] text-[#2D4628] rounded-full text-xs font-bold text-center transition-colors"
                >
                  View Full Cart
                </button>
                <button
                  onClick={handleProceedCheckout}
                  className="py-2.5 px-3 bg-[#D97706] hover:bg-[#B45309] text-white rounded-full text-xs font-bold text-center transition-all flex items-center justify-center gap-1.5 shadow-md active:scale-95"
                >
                  Checkout <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
