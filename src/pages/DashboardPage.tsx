import React, { useState } from 'react';
import { 
  User, 
  Package, 
  MapPin, 
  Coins, 
  LogOut, 
  Truck, 
  RotateCcw
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const DashboardPage: React.FC = () => {
  const { user, orders, logout, navigate, formatPrice, showToast, addToCart } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'wallet' | 'profile'>('orders');

  if (!user) {
    navigate('auth');
    return null;
  }

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach((item) => {
      addToCart(item.product, item.selectedWeight, item.quantity);
    });
    showToast('Items from past order added to your cart!', 'success');
    navigate('cart');
  };

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-[#2D4628] font-bold">My Account</span>
        </div>

        {/* User Profile Header Card */}
        <div className="bg-[#2D4628] rounded-[2.5rem] p-6 sm:p-8 text-white shadow-xl border border-[#EEDCC6]/30 mb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-[#1E331B] border border-[#EEDCC6]/30 text-[#FDE68A] flex items-center justify-center font-serif text-2xl font-bold">
              {user.name[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-xl sm:text-2xl font-bold text-white">{user.name}</h1>
                <span className="bg-[#1E331B] text-[#FDE68A] border border-[#EEDCC6]/30 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                  {user.membershipTier} Member
                </span>
              </div>
              <p className="text-xs text-stone-200 mt-0.5">{user.email} • {user.phone}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-[#1E331B] p-3 rounded-2xl border border-[#EEDCC6]/30 text-center min-w-[120px]">
              <span className="text-[10px] uppercase font-bold text-stone-300 block">Amrit Coins</span>
              <span className="font-serif font-black text-[#FDE68A] text-lg sm:text-xl">
                🪙 {user.amritCoins}
              </span>
            </div>

            <button
              onClick={logout}
              className="p-3 rounded-full bg-[#1E331B] hover:bg-rose-900 text-stone-200 hover:text-white border border-[#EEDCC6]/30 transition-colors text-xs font-bold flex items-center gap-1.5"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" /> <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {/* Dashboard Navigation Tabs */}
        <div className="flex bg-white p-1.5 rounded-full border border-[#EEDCC6] shadow-xs mb-8 gap-2 overflow-x-auto no-scrollbar">
          {[
            { id: 'orders', label: `My Orders (${orders.length})`, icon: Package },
            { id: 'addresses', label: `Saved Addresses (${user.savedAddresses.length})`, icon: MapPin },
            { id: 'wallet', label: 'Amrit Coins & Rewards', icon: Coins },
            { id: 'profile', label: 'Profile Details', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#2D4628] text-white shadow-sm'
                    : 'text-[#2D4628] hover:text-[#1E331B] hover:bg-[#FAF5EE]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Orders History */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            {orders.length === 0 ? (
              <div className="bg-white rounded-[2rem] p-12 text-center border border-[#EEDCC6] space-y-3">
                <p className="text-sm font-bold text-[#2D4628]">No orders placed yet.</p>
                <button
                  onClick={() => navigate('shop')}
                  className="px-6 py-2.5 bg-[#2D4628] text-white rounded-full text-xs font-bold"
                >
                  Explore Marketplace
                </button>
              </div>
            ) : (
              orders.map((order) => (
                <div 
                  key={order.id}
                  className="bg-white rounded-[2rem] p-6 border border-[#EEDCC6] shadow-sm space-y-4"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-[#EEDCC6]/50 gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#2D4628]">Order #{order.id}</span>
                        <span className="text-xs font-bold bg-[#FAF5EE] text-[#2D4628] border border-[#EEDCC6] px-2.5 py-0.5 rounded-full capitalize">
                          {order.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-0.5">Placed on {order.createdAt}</p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs text-stone-500 block">Total Amount Paid</span>
                      <span className="font-serif font-black text-base text-[#2D4628]">
                        {formatPrice(order.grandTotal)}
                      </span>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="divide-y divide-[#EEDCC6]/40">
                    {order.items.map((item) => (
                      <div key={item.id} className="py-2.5 first:pt-0 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-3">
                          <img src={item.product.images[0]} alt={item.product.name} className="w-12 h-12 rounded-xl object-cover bg-[#FAF5EE]" />
                          <div>
                            <span className="font-bold text-[#2D4628] block">{item.product.name}</span>
                            <span className="text-[11px] text-stone-500">{item.selectedWeight} × {item.quantity}</span>
                          </div>
                        </div>
                        <span className="font-bold text-[#2D4628] font-mono">{formatPrice(item.price * item.quantity)}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Actions */}
                  <div className="pt-3 border-t border-[#EEDCC6]/50 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-stone-500">
                      <Truck className="w-4 h-4 text-[#2D4628]" />
                      <span>{order.estimatedDelivery}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => navigate('order-tracking', { orderId: order.id })}
                        className="px-4 py-2 bg-[#FAF5EE] hover:bg-[#F5EFE7] text-[#2D4628] border border-[#EEDCC6] rounded-full font-bold transition-colors"
                      >
                        Track Status
                      </button>
                      <button
                        onClick={() => handleReorder(order)}
                        className="px-4 py-2 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full font-bold transition-colors flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Re-Order
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Tab 2: Saved Addresses */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {user.savedAddresses.map((addr) => (
              <div key={addr.id} className="bg-white p-6 rounded-[2rem] border border-[#EEDCC6] shadow-sm space-y-2 relative">
                {addr.isDefault && (
                  <span className="absolute top-4 right-4 bg-[#FAF5EE] text-[#2D4628] border border-[#EEDCC6] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    Default Delivery Address
                  </span>
                )}
                <strong className="text-sm font-bold text-[#2D4628] block">{addr.fullName}</strong>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {addr.addressLine1}, {addr.addressLine2 && `${addr.addressLine2}, `}{addr.city} - {addr.pincode}
                </p>
                <p className="text-xs text-stone-500">Phone: {addr.phone}</p>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Amrit Coins Wallet */}
        {activeTab === 'wallet' && (
          <div className="bg-white rounded-[2.5rem] p-8 border border-[#EEDCC6] shadow-sm space-y-6 max-w-2xl">
            <div className="flex items-center gap-4 bg-[#FAF5EE] p-5 rounded-2xl border border-[#EEDCC6]">
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 text-[#D97706] flex items-center justify-center text-3xl">
                🪙
              </div>
              <div>
                <span className="text-xs text-[#2D4628] font-bold uppercase tracking-wider block">Available Balance</span>
                <span className="font-serif text-3xl font-black text-[#2D4628]">{user.amritCoins} Amrit Coins</span>
                <p className="text-xs text-stone-500 mt-0.5">1 Coin = ₹1.00 Discount on future purchases</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D4628]">How to Earn Amrit Coins:</h4>
              <ul className="text-xs text-stone-600 space-y-2 list-disc pl-5">
                <li>Earn 5% cashback in Amrit Coins on every order placed.</li>
                <li>Earn 50 coins for writing a verified product review.</li>
                <li>Earn 100 coins for referring friends & family.</li>
              </ul>
            </div>
          </div>
        )}

        {/* Tab 4: Profile Details */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-[2.5rem] p-8 border border-[#EEDCC6] shadow-sm space-y-4 max-w-xl text-xs">
            <h3 className="font-serif font-bold text-base text-[#2D4628] pb-2 border-b border-[#EEDCC6]/50">Personal Information</h3>
            <div>
              <span className="text-stone-500 block mb-1">Full Name</span>
              <span className="font-bold text-[#2D4628] text-sm">{user.name}</span>
            </div>
            <div>
              <span className="text-stone-500 block mb-1">Registered Email</span>
              <span className="font-bold text-[#2D4628] text-sm">{user.email}</span>
            </div>
            <div>
              <span className="text-stone-500 block mb-1">Phone Number</span>
              <span className="font-bold text-[#2D4628] text-sm font-mono">{user.phone}</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
