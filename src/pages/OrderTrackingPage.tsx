import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Search, 
  CheckCircle2, 
  Truck, 
  MapPin
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';

export const OrderTrackingPage: React.FC = () => {
  const { orders, viewParams, formatPrice, navigate, showToast } = useShop();
  
  const [searchCode, setSearchCode] = useState<string>(viewParams?.orderId || '');
  const [searchedOrder, setSearchedOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (viewParams?.orderId) {
      const match = orders.find((o) => o.id === viewParams.orderId || o.trackingNumber === viewParams.orderId);
      if (match) setSearchedOrder(match);
    } else if (orders.length > 0) {
      setSearchedOrder(orders[0]);
    }
  }, [viewParams, orders]);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchCode.trim()) {
      showToast('Please enter an Order ID or Tracking Number', 'warning');
      return;
    }

    const match = orders.find(
      (o) => o.id.toLowerCase() === searchCode.trim().toLowerCase() ||
             o.trackingNumber.toLowerCase() === searchCode.trim().toLowerCase()
    );

    if (match) {
      setSearchedOrder(match);
      showToast('Order details found!', 'success');
    } else {
      showToast('No active shipment found with this ID. Showing demo tracking status.', 'info');
      // Fallback demo order
      if (orders.length > 0) {
        setSearchedOrder(orders[0]);
      }
    }
  };

  const currentOrder = searchedOrder || orders[0];

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-[#2D4628] font-bold">Track Shipment</span>
        </div>

        {/* Page Title */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D4628]">
            Real-Time Order & Cold-Chain Tracker
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Track your freshly harvested dry fruit packages from Srinagar/Bengaluru hubs straight to your doorstep.
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 sm:p-6 rounded-[2rem] border border-[#EEDCC6] shadow-md mb-10">
          <form onSubmit={handleTrackSubmit} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-stone-400 absolute left-4 top-3.5" />
              <input 
                type="text"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
                placeholder="Enter Order ID (e.g. ORD-98241) or Tracking Number (AV-TRK-74892)"
                className="w-full pl-11 pr-4 py-3 text-xs sm:text-sm bg-[#FAF5EE] border border-[#EEDCC6] rounded-full focus:outline-hidden focus:border-[#2D4628] font-mono text-[#2D4628]"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs sm:text-sm font-bold shadow-md transition-colors shrink-0"
            >
              Track Package
            </button>
          </form>
        </div>

        {/* Order Details View */}
        {currentOrder ? (
          <div className="bg-white rounded-[2.5rem] border border-[#EEDCC6] shadow-xl overflow-hidden space-y-8 p-6 sm:p-10">
            
            {/* Status Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#EEDCC6]">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-serif font-bold text-xl text-[#2D4628]">Order #{currentOrder.id}</span>
                  <span className="bg-[#FAF5EE] border border-[#EEDCC6] text-[#2D4628] text-xs font-bold px-3 py-0.5 rounded-full capitalize">
                    {currentOrder.status}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Placed on {currentOrder.createdAt} • Cold-Chain Insulated Shipping
                </p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs text-stone-500 block">Estimated Arrival:</span>
                <span className="font-bold text-[#2D4628] text-sm sm:text-base">
                  {currentOrder.estimatedDelivery}
                </span>
              </div>
            </div>

            {/* Visual Step Timeline */}
            <div>
              <h3 className="font-serif font-bold text-sm text-[#2D4628] mb-6">Shipment Journey:</h3>
              <div className="relative">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 relative">
                  
                  {/* Step 1: Order Confirmed */}
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="w-10 h-10 rounded-2xl bg-[#2D4628] text-white flex items-center justify-center font-bold mb-2 shadow-md">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <strong className="text-xs font-bold text-[#2D4628] block">Order Placed</strong>
                    <span className="text-[11px] text-stone-500">Harvest batch reserved & verified</span>
                  </div>

                  {/* Step 2: Nitrogen Packing */}
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="w-10 h-10 rounded-2xl bg-[#2D4628] text-white flex items-center justify-center font-bold mb-2 shadow-md">
                      <Package className="w-5 h-5" />
                    </div>
                    <strong className="text-xs font-bold text-[#2D4628] block">Nitrogen Sealed</strong>
                    <span className="text-[11px] text-stone-500">Airtight food-grade packaging</span>
                  </div>

                  {/* Step 3: In Transit */}
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                    <div className="w-10 h-10 rounded-2xl bg-[#D97706] text-white flex items-center justify-center font-bold mb-2 shadow-md animate-pulse">
                      <Truck className="w-5 h-5" />
                    </div>
                    <strong className="text-xs font-bold text-[#2D4628] block">Out for Delivery</strong>
                    <span className="text-[11px] text-stone-500">In temperature controlled van</span>
                  </div>

                  {/* Step 4: Delivered */}
                  <div className="flex flex-col items-center sm:items-start text-center sm:text-left opacity-50">
                    <div className="w-10 h-10 rounded-2xl bg-[#EEDCC6] text-[#2D4628] flex items-center justify-center font-bold mb-2">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <strong className="text-xs font-bold text-[#2D4628] block">Delivered</strong>
                    <span className="text-[11px] text-stone-500">Doorstep delivery with OTP</span>
                  </div>

                </div>
              </div>
            </div>

            {/* Delivery Courier Partner Details */}
            <div className="bg-[#FAF5EE] p-5 rounded-2xl border border-[#EEDCC6] grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-stone-500 block">Tracking AWB:</span>
                <span className="font-mono font-bold text-[#2D4628]">{currentOrder.trackingNumber}</span>
              </div>
              <div>
                <span className="text-stone-500 block">Delivery Hero:</span>
                <span className="font-semibold text-[#2D4628]">Ramesh Kumar (+91 98801 23411)</span>
              </div>
              <div>
                <span className="text-stone-500 block">Delivery Address:</span>
                <span className="font-medium text-stone-700">{currentOrder.shippingAddress.addressLine1}, {currentOrder.shippingAddress.city}</span>
              </div>
            </div>

            {/* Items Included */}
            <div className="space-y-3">
              <h4 className="font-serif font-bold text-sm text-[#2D4628]">Package Contents:</h4>
              <div className="divide-y divide-[#EEDCC6] border border-[#EEDCC6] rounded-2xl overflow-hidden">
                {currentOrder.items.map((item) => (
                  <div key={item.id} className="p-3.5 flex items-center justify-between text-xs bg-white">
                    <div className="flex items-center gap-3">
                      <img src={item.product.images[0]} alt={item.product.name} className="w-10 h-10 rounded-xl object-cover bg-[#FAF5EE]" />
                      <div>
                        <span className="font-bold text-[#2D4628] block">{item.product.name}</span>
                        <span className="text-[11px] text-stone-500">{item.selectedWeight} × {item.quantity}</span>
                      </div>
                    </div>
                    <span className="font-mono font-bold text-[#2D4628]">{formatPrice(item.price * item.quantity)}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EEDCC6]">
            <p className="text-xs text-stone-500">No active tracking records available yet.</p>
          </div>
        )}

      </div>
    </div>
  );
};
