import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  MapPin, 
  ArrowRight, 
  Package
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { ShippingAddress, Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    subtotal,
    discountAmount,
    shippingCost,
    grandTotal,
    appliedCoupon,
    isGiftWrap,
    formatPrice,
    navigate,
    createOrder,
    user,
    showToast,
  } = useShop();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1); // 1: Address, 2: Delivery, 3: Payment, 4: Confirmation
  const [deliverySpeed, setDeliverySpeed] = useState<'standard' | 'express'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');
  const [upiApp, setUpiApp] = useState<string>('gpay');
  const [upiId, setUpiId] = useState<string>('arjun.sharma@okaxis');
  
  // Card form state
  const [cardNumber, setCardNumber] = useState('4532 8901 2345 6789');
  const [cardExp, setCardExp] = useState('08/29');
  const [cardCvv, setCardCvv] = useState('789');

  // Address form state
  const [address, setAddress] = useState<ShippingAddress>({
    fullName: user?.name || 'Arjun Sharma',
    phone: user?.phone || '9876543210',
    email: user?.email || 'arjun.sharma@example.com',
    addressLine1: 'Flat 402, Royal Palms Residency, 12th Main Road',
    addressLine2: 'Indiranagar 2nd Stage',
    landmark: 'Near BDA Complex',
    city: 'Bengaluru',
    state: 'Karnataka',
    pincode: '560038',
  });

  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // If cart is empty and not on confirmation step, redirect
  if (cart.length === 0 && step !== 4) {
    return (
      <div className="bg-[#FDF8F3] min-h-screen py-16 text-center">
        <h2 className="font-serif text-2xl font-bold text-[#2D4628]">Your cart is empty</h2>
        <button
          onClick={() => navigate('shop')}
          className="mt-4 px-6 py-2.5 bg-[#2D4628] text-white rounded-full text-xs font-bold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.phone || !address.addressLine1 || !address.pincode) {
      showToast('Please fill in all mandatory address fields', 'warning');
      return;
    }
    setStep(2);
  };

  const handleDeliverySubmit = () => {
    setStep(3);
  };

  const handlePlaceOrder = () => {
    setIsProcessing(true);

    setTimeout(() => {
      const newOrder = createOrder({
        shippingAddress: address,
        paymentMethod: paymentMethod,
      });

      setConfirmedOrder(newOrder);
      setIsProcessing(false);
      setStep(4);

      // Trigger Celebration Confetti
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#2D4628', '#D97706', '#EEDCC6', '#1E331B'],
        });
      } catch (err) {
        // Safe fallback
      }
    }, 1200);
  };

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Step Indicator Header (Steps 1-3) */}
        {step < 4 && (
          <div className="max-w-3xl mx-auto mb-10">
            <div className="flex items-center justify-between relative">
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-[#EEDCC6] -z-0" />
              
              {/* Step 1 */}
              <div className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-colors ${
                  step >= 1 ? 'bg-[#2D4628] text-white ring-4 ring-[#EEDCC6]' : 'bg-[#EEDCC6]/60 text-[#2D4628]'
                }`}>
                  1
                </div>
                <span className="text-[11px] font-bold text-[#2D4628] mt-1.5">Shipping Address</span>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-colors ${
                  step >= 2 ? 'bg-[#2D4628] text-white ring-4 ring-[#EEDCC6]' : 'bg-[#EEDCC6]/60 text-[#2D4628]'
                }`}>
                  2
                </div>
                <span className="text-[11px] font-bold text-[#2D4628] mt-1.5">Delivery Speed</span>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center relative z-10">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs sm:text-sm transition-colors ${
                  step >= 3 ? 'bg-[#2D4628] text-white ring-4 ring-[#EEDCC6]' : 'bg-[#EEDCC6]/60 text-[#2D4628]'
                }`}>
                  3
                </div>
                <span className="text-[11px] font-bold text-[#2D4628] mt-1.5">Payment & Place</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Confirmed Order Success View */}
        {step === 4 && confirmedOrder && (
          <div className="max-w-3xl mx-auto bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#EEDCC6] shadow-2xl space-y-8 animate-in zoom-in-95 duration-300">
            
            {/* Header Success */}
            <div className="text-center space-y-3">
              <div className="w-20 h-20 bg-[#FAF5EE] text-[#2D4628] border border-[#EEDCC6] rounded-full flex items-center justify-center mx-auto text-4xl shadow-md">
                🎉
              </div>
              <h1 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2D4628]">
                Order Successfully Placed!
              </h1>
              <p className="text-xs sm:text-sm text-stone-600">
                Thank you, <strong className="text-[#2D4628]">{confirmedOrder.shippingAddress.fullName}</strong>. Your natural dry fruits are being freshly packed in vacuum pouches.
              </p>
              <div className="inline-flex items-center gap-2 bg-[#F5EFE7] border border-[#EEDCC6] text-[#2D4628] px-4 py-1.5 rounded-full text-xs font-mono font-bold">
                <span>Order ID: {confirmedOrder.id}</span>
              </div>
            </div>

            {/* Order Timeline Preview */}
            <div className="bg-[#FAF5EE] p-5 rounded-2xl border border-[#EEDCC6] space-y-3">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-[#2D4628]">Estimated Delivery:</span>
                <span className="text-[#2D4628] font-bold">{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-stone-500">
                <span>Tracking Number:</span>
                <span className="font-mono font-semibold text-[#2D4628]">{confirmedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-stone-500">
                <span>Delivery Address:</span>
                <span className="text-right truncate max-w-xs">{confirmedOrder.shippingAddress.addressLine1}, {confirmedOrder.shippingAddress.city} - {confirmedOrder.shippingAddress.pincode}</span>
              </div>
            </div>

            {/* Items Ordered List */}
            <div className="space-y-3">
              <h3 className="font-serif font-bold text-sm text-[#2D4628]">Items in this Package:</h3>
              <div className="divide-y divide-[#EEDCC6] border border-[#EEDCC6] rounded-2xl overflow-hidden">
                {confirmedOrder.items.map((item) => (
                  <div key={item.id} className="p-3.5 bg-white flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover bg-[#FAF5EE]" />
                      <div>
                        <span className="font-bold text-[#2D4628] block">{item.product.name}</span>
                        <span className="text-[11px] text-stone-500">{item.selectedWeight} × {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#2D4628] font-mono">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total Paid */}
            <div className="bg-[#FAF5EE] p-4 rounded-2xl border border-[#EEDCC6] flex justify-between items-center">
              <div>
                <span className="text-xs text-stone-600 block">Total Amount Paid ({confirmedOrder.paymentMethod.toUpperCase()})</span>
                <span className="text-[11px] text-[#2D4628] font-bold">100% Guaranteed Fresh Cold Harvest</span>
              </div>
              <span className="font-serif text-2xl font-black text-[#2D4628]">
                {formatPrice(confirmedOrder.grandTotal)}
              </span>
            </div>

            {/* Next Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => navigate('order-tracking', { orderId: confirmedOrder.id })}
                className="py-3.5 px-4 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Package className="w-4 h-4" /> Track Live Delivery Status
              </button>
              <button
                onClick={() => navigate('shop')}
                className="py-3.5 px-4 border border-[#EEDCC6] hover:bg-[#FAF5EE] text-[#2D4628] rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors"
              >
                Continue Shopping
              </button>
            </div>

          </div>
        )}

        {/* Steps 1, 2, 3 Active View */}
        {step < 4 && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Step Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Step 1: Shipping Address Form */}
              {step === 1 && (
                <form onSubmit={handleAddressSubmit} className="bg-white p-6 sm:p-8 rounded-[2rem] border border-[#EEDCC6] shadow-sm space-y-4 animate-in fade-in duration-200">
                  <h2 className="font-serif text-xl font-bold text-[#2D4628] flex items-center gap-2 pb-3 border-b border-[#EEDCC6]">
                    <MapPin className="w-5 h-5 text-[#2D4628]" />
                    <span>Enter Delivery Address</span>
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#2D4628] mb-1">Full Name *</label>
                      <input 
                        type="text" 
                        required
                        value={address.fullName}
                        onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                        className="w-full text-xs p-2.5 bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D4628] mb-1">Phone Number (For Delivery OTP) *</label>
                      <input 
                        type="tel" 
                        required
                        maxLength={10}
                        value={address.phone}
                        onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                        className="w-full text-xs p-2.5 bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D4628] mb-1">Email Address (For Invoices)</label>
                    <input 
                      type="email" 
                      value={address.email}
                      onChange={(e) => setAddress({ ...address, email: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2D4628] mb-1">Flat / House No. / Building / Street *</label>
                    <input 
                      type="text" 
                      required
                      value={address.addressLine1}
                      onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                      className="w-full text-xs p-2.5 bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#2D4628] mb-1">Area / Locality</label>
                      <input 
                        type="text" 
                        value={address.addressLine2}
                        onChange={(e) => setAddress({ ...address, addressLine2: e.target.value })}
                        className="w-full text-xs p-2.5 bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D4628] mb-1">City *</label>
                      <input 
                        type="text" 
                        required
                        value={address.city}
                        onChange={(e) => setAddress({ ...address, city: e.target.value })}
                        className="w-full text-xs p-2.5 bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden text-[#2D4628]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#2D4628] mb-1">PIN Code (6 digits) *</label>
                      <input 
                        type="text" 
                        required
                        maxLength={6}
                        value={address.pincode}
                        onChange={(e) => setAddress({ ...address, pincode: e.target.value.replace(/\D/g, '') })}
                        className="w-full text-xs p-2.5 bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl focus:border-[#2D4628] focus:outline-hidden font-mono text-[#2D4628]"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full mt-4 py-3.5 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
                  >
                    Continue to Delivery Options <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* Step 2: Delivery Speed Option */}
              {step === 2 && (
                <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-[#EEDCC6] shadow-sm space-y-5 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EEDCC6]">
                    <h2 className="font-serif text-xl font-bold text-[#2D4628] flex items-center gap-2">
                      <Truck className="w-5 h-5 text-[#2D4628]" />
                      <span>Select Delivery Speed</span>
                    </h2>
                    <button onClick={() => setStep(1)} className="text-xs text-[#D97706] font-bold hover:underline">
                      Edit Address
                    </button>
                  </div>

                  <div className="space-y-3">
                    <div 
                      onClick={() => setDeliverySpeed('express')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        deliverySpeed === 'express' 
                          ? 'bg-[#FAF5EE] border-[#2D4628] ring-2 ring-[#2D4628]' 
                          : 'bg-[#FAF5EE]/50 border-[#EEDCC6] hover:bg-[#FAF5EE]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white text-[#2D4628] border border-[#EEDCC6] flex items-center justify-center font-bold text-lg">
                          ⚡
                        </div>
                        <div>
                          <strong className="block text-xs sm:text-sm text-[#2D4628] font-bold">Cold-Chain Express Delivery (Recommended)</strong>
                          <span className="text-xs text-[#2D4628]/80 font-semibold">Delivered Tomorrow by 5:00 PM</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#2D4628]">
                        {shippingCost === 0 ? 'FREE' : '₹49'}
                      </span>
                    </div>

                    <div 
                      onClick={() => setDeliverySpeed('standard')}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                        deliverySpeed === 'standard' 
                          ? 'bg-[#FAF5EE] border-[#2D4628] ring-2 ring-[#2D4628]' 
                          : 'bg-[#FAF5EE]/50 border-[#EEDCC6] hover:bg-[#FAF5EE]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white text-[#2D4628] border border-[#EEDCC6] flex items-center justify-center font-bold text-lg">
                          📦
                        </div>
                        <div>
                          <strong className="block text-xs sm:text-sm text-[#2D4628] font-bold">Standard Insulated Shipping</strong>
                          <span className="text-xs text-stone-500">Delivered within 3-4 Business Days</span>
                        </div>
                      </div>
                      <span className="text-xs font-bold text-[#2D4628]">
                        {shippingCost === 0 ? 'FREE' : '₹49'}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3 pt-3">
                    <button
                      onClick={() => setStep(1)}
                      className="py-3 px-5 border border-[#EEDCC6] rounded-full text-xs font-bold text-[#2D4628]"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleDeliverySubmit}
                      className="flex-1 py-3.5 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
                    >
                      Proceed to Payment <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Payment Options & Place Order */}
              {step === 3 && (
                <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-[#EEDCC6] shadow-sm space-y-6 animate-in fade-in duration-200">
                  <div className="flex items-center justify-between pb-3 border-b border-[#EEDCC6]">
                    <h2 className="font-serif text-xl font-bold text-[#2D4628] flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-[#2D4628]" />
                      <span>Select Payment Method</span>
                    </h2>
                    <button onClick={() => setStep(2)} className="text-xs text-[#D97706] font-bold hover:underline">
                      Edit Delivery
                    </button>
                  </div>

                  {/* Payment Method Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {[
                      { id: 'upi', label: 'UPI / QR', icon: '📱' },
                      { id: 'card', label: 'Cards', icon: '💳' },
                      { id: 'netbanking', label: 'NetBanking', icon: '🏦' },
                      { id: 'cod', label: 'Cash on Del.', icon: '💵' },
                    ].map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id as any)}
                        className={`p-3 rounded-2xl text-center border transition-all ${
                          paymentMethod === method.id
                            ? 'bg-[#2D4628] text-white border-[#2D4628] ring-2 ring-[#2D4628] shadow-sm'
                            : 'bg-[#FAF5EE] border-[#EEDCC6] text-[#2D4628] hover:bg-[#F5EFE7]'
                        }`}
                      >
                        <span className="text-xl block mb-1">{method.icon}</span>
                        <span className="text-xs font-bold block">{method.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Method Details Form Simulation */}
                  {paymentMethod === 'upi' && (
                    <div className="bg-[#FAF5EE] p-5 rounded-2xl border border-[#EEDCC6] space-y-3">
                      <span className="text-xs font-bold text-[#2D4628] uppercase tracking-wider block">
                        Instant UPI Payment:
                      </span>
                      <div className="flex gap-2">
                        {['gpay', 'phonepe', 'paytm', 'bhim'].map((app) => (
                          <button
                            key={app}
                            onClick={() => setUpiApp(app)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase transition-all ${
                              upiApp === app
                                ? 'bg-[#2D4628] text-white shadow-xs'
                                : 'bg-white border border-[#EEDCC6] text-[#2D4628]'
                            }`}
                          >
                            {app}
                          </button>
                        ))}
                      </div>
                      <input 
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="Enter your UPI ID (e.g. mobile@okhdfcbank)"
                        className="w-full text-xs p-2.5 bg-white border border-[#EEDCC6] rounded-xl text-[#2D4628]"
                      />
                      <p className="text-[11px] text-stone-500">
                        ⚡ Instant authorization. Zero payment transaction fee.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="bg-[#FAF5EE] p-5 rounded-2xl border border-[#EEDCC6] space-y-3 text-xs">
                      <div>
                        <label className="block text-[#2D4628] font-bold mb-1">Card Number</label>
                        <input 
                          type="text" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full p-2.5 bg-white border border-[#EEDCC6] rounded-xl font-mono text-[#2D4628]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[#2D4628] font-bold mb-1">Expiry (MM/YY)</label>
                          <input 
                            type="text" 
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            className="w-full p-2.5 bg-white border border-[#EEDCC6] rounded-xl font-mono text-[#2D4628]"
                          />
                        </div>
                        <div>
                          <label className="block text-[#2D4628] font-bold mb-1">CVV</label>
                          <input 
                            type="password" 
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value)}
                            className="w-full p-2.5 bg-white border border-[#EEDCC6] rounded-xl font-mono text-[#2D4628]"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === 'cod' && (
                    <div className="bg-[#FAF5EE] p-4 rounded-2xl border border-[#EEDCC6] text-xs text-[#2D4628] space-y-1">
                      <strong>Cash on Delivery Available:</strong>
                      <p className="text-stone-600">Please keep exact change of {formatPrice(grandTotal)} ready at the time of delivery.</p>
                    </div>
                  )}

                  {/* Place Order CTA */}
                  <div className="pt-2">
                    <button
                      onClick={handlePlaceOrder}
                      disabled={isProcessing}
                      className="w-full py-4 bg-[#2D4628] hover:bg-[#1E331B] disabled:opacity-50 text-white font-bold rounded-full text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-[#2D4628]/20 active:scale-98 transition-all"
                    >
                      {isProcessing ? (
                        <span>Securing Order & Generating Invoice...</span>
                      ) : (
                        <>
                          <ShieldCheck className="w-5 h-5" /> Place Order ({formatPrice(grandTotal)})
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Right Column: Order Items Summary Sidebar (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-6 rounded-[2rem] border border-[#EEDCC6] shadow-xl space-y-4 sticky top-24">
                <h3 className="font-serif font-bold text-base text-[#2D4628] pb-3 border-b border-[#EEDCC6]">
                  Cart Review ({cart.reduce((s, i) => s + i.quantity, 0)} Items)
                </h3>

                {/* Items List */}
                <div className="space-y-3 max-h-60 overflow-y-auto divide-y divide-[#EEDCC6]/50">
                  {cart.map((item) => (
                    <div key={item.id} className="pt-2 first:pt-0 flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-10 rounded-xl object-cover shrink-0 bg-[#FAF5EE]" />
                        <div className="min-w-0">
                          <span className="font-bold text-[#2D4628] block truncate">{item.product.name}</span>
                          <span className="text-[11px] text-stone-500">{item.selectedWeight} × {item.quantity}</span>
                        </div>
                      </div>
                      <span className="font-bold text-[#2D4628] font-mono shrink-0">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 text-xs text-stone-600 pt-3 border-t border-[#EEDCC6]">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-semibold text-[#2D4628]">{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-[#D97706] font-semibold">
                      <span>Discount ({appliedCoupon?.code})</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shippingCost === 0 ? <strong className="text-[#2D4628]">FREE</strong> : formatPrice(shippingCost)}</span>
                  </div>
                  {isGiftWrap && (
                    <div className="flex justify-between text-[#2D4628] font-semibold">
                      <span>Luxury Gift Wrap</span>
                      <span>+₹99</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-3 border-t border-[#EEDCC6] text-sm font-bold text-[#2D4628]">
                    <span>Total Payable</span>
                    <span className="font-serif text-xl font-black text-[#2D4628]">{formatPrice(grandTotal)}</span>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF5EE] rounded-2xl border border-[#EEDCC6] text-[11px] text-stone-600 space-y-1">
                  <span className="font-bold text-[#2D4628] block">🌿 100% Pure & Unadulterated Guarantee</span>
                  <p>Every shipment is packaged in cold-storage sealed nitrogen barrier pouches.</p>
                </div>

              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
