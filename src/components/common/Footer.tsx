import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Leaf, 
  Wind, 
  Award, 
  Mail, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
  Youtube
} from 'lucide-react';
import { useShop, AppView } from '../../context/ShopContext';
import { CATEGORIES_META } from '../../data/products';

export const Footer: React.FC = () => {
  const { navigate, showToast } = useShop();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'warning');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed to AmritVana VIP Circle! Check your inbox for 10% coupon 🎉', 'success');
    setNewsletterEmail('');
  };

  const handleNav = (view: AppView, params?: Record<string, any>) => {
    navigate(view, params);
  };

  return (
    <footer className="bg-[#1E331B] text-[#FDF8F3] font-sans border-t border-[#EEDCC6]/30">
      
      {/* 4 Brand Pillars Banner */}
      <div className="bg-[#2D4628] border-b border-[#EEDCC6]/20 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex items-center gap-4 bg-[#1E331B]/60 p-4 rounded-3xl border border-[#EEDCC6]/20">
            <div className="w-12 h-12 rounded-2xl bg-[#D97706]/20 text-[#D97706] flex items-center justify-center shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% Naturally Sourced</h4>
              <p className="text-xs text-[#EEDCC6]/80">Direct from orchards in Kashmir, California & Iran</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#1E331B]/60 p-4 rounded-3xl border border-[#EEDCC6]/20">
            <div className="w-12 h-12 rounded-2xl bg-[#10B981]/20 text-[#A7F3D0] flex items-center justify-center shrink-0">
              <Wind className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Nitrogen-Flushed Packs</h4>
              <p className="text-xs text-[#EEDCC6]/80">Locks natural oils, aroma & crunch for 12 months</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#1E331B]/60 p-4 rounded-3xl border border-[#EEDCC6]/20">
            <div className="w-12 h-12 rounded-2xl bg-[#D97706]/20 text-[#D97706] flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">Zero Chemical Polish</h4>
              <p className="text-xs text-[#EEDCC6]/80">Unbleached, unadulterated pure raw kernels</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-[#1E331B]/60 p-4 rounded-3xl border border-[#EEDCC6]/20">
            <div className="w-12 h-12 rounded-2xl bg-[#F59E0B]/20 text-[#FDE68A] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">FSSAI Lab Certified</h4>
              <p className="text-xs text-[#EEDCC6]/80">Triple sorting grade assurance on every harvest</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
              <div className="w-10 h-10 rounded-full bg-[#2D4628] border border-[#EEDCC6]/30 flex items-center justify-center text-white font-serif text-xl font-bold">
                A
              </div>
              <span className="font-serif text-2xl font-bold text-white tracking-tight">
                Amrit<span className="text-[#D97706]">Vana</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#EEDCC6]/80 leading-relaxed">
              Experience the natural crunch of wellness. Pure, sun-drenched Mamra almonds, king jumbo cashews, organic dates, and royal nut blends delivered with pristine farm-level freshness.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <p className="text-xs font-bold text-[#D97706] uppercase tracking-wider mb-2">
                Join the Natural Wellness Circle
              </p>
              <form onSubmit={handleSubscribe} className="flex max-w-md bg-[#2D4628]/80 p-1 rounded-full border border-[#EEDCC6]/30">
                <input 
                  type="email" 
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="w-full bg-transparent px-4 py-2 text-xs text-white placeholder-[#EEDCC6]/50 focus:outline-hidden"
                />
                <button 
                  type="submit"
                  className="bg-[#D97706] hover:bg-[#B45309] text-white font-bold px-5 py-2 rounded-full text-xs flex items-center gap-1.5 transition-colors shrink-0 shadow-md"
                >
                  Join <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
              {subscribed && (
                <p className="text-[11px] text-[#A7F3D0] mt-2 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Thank you for subscribing! Your 10% coupon is on its way.
                </p>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Explore</h4>
            <ul className="space-y-2 text-xs text-[#EEDCC6]/80">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-white transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => handleNav('shop')} className="hover:text-white transition-colors">Shop All Harvests</button>
              </li>
              <li>
                <button onClick={() => handleNav('combos')} className="hover:text-white transition-colors">Combos & Hampers</button>
              </li>
              <li>
                <button onClick={() => handleNav('custom-mix')} className="hover:text-white transition-colors">Custom Mix Jar Builder</button>
              </li>
              <li>
                <button onClick={() => handleNav('offers')} className="hover:text-white transition-colors">Deals & Offers</button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-white transition-colors">Our Story & Sourcing</button>
              </li>
              <li>
                <button onClick={() => handleNav('blog')} className="hover:text-white transition-colors">Nutrition Guides</button>
              </li>
              <li>
                <button onClick={() => handleNav('order-tracking')} className="hover:text-white transition-colors">Track Order</button>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Varieties</h4>
            <ul className="space-y-2 text-xs text-[#EEDCC6]/80">
              {CATEGORIES_META.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button 
                    onClick={() => handleNav('category', { categoryId: cat.id })}
                    className="hover:text-white transition-colors flex items-center gap-1.5"
                  >
                    <span>{cat.icon}</span> {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button 
                  onClick={() => handleNav('category', { categoryId: 'combos-gifts' })}
                  className="hover:text-white transition-colors flex items-center gap-1.5 font-semibold text-[#D97706]"
                >
                  <span>🎁</span> Wooden Gift Chests
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Contact */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Contact Desk</h4>
            <div className="space-y-2.5 text-xs text-[#EEDCC6]/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#D97706] shrink-0 mt-0.5" />
                <span>
                  AmritVana Orchards & Roastery, Srinagar, J&K / Indiranagar, Bengaluru, India
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#D97706] shrink-0" />
                <span>care@amritvana.com</span>
              </div>
              <div className="pt-2">
                <p className="text-[11px] text-[#EEDCC6]/60">
                  FSSAI Lic: <span className="text-white font-mono">10022011000842</span>
                </p>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-2.5 pt-2">
                <a href="#" className="w-8 h-8 rounded-full bg-[#2D4628] hover:bg-[#D97706] hover:text-white flex items-center justify-center text-[#FDF8F3] transition-colors border border-[#EEDCC6]/20">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-[#2D4628] hover:bg-[#D97706] hover:text-white flex items-center justify-center text-[#FDF8F3] transition-colors border border-[#EEDCC6]/20">
                  <Facebook className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-[#2D4628] hover:bg-[#D97706] hover:text-white flex items-center justify-center text-[#FDF8F3] transition-colors border border-[#EEDCC6]/20">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-[#2D4628] hover:bg-[#D97706] hover:text-white flex items-center justify-center text-[#FDF8F3] transition-colors border border-[#EEDCC6]/20">
                  <Youtube className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Payment Badges */}
        <div className="border-t border-[#EEDCC6]/20 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#EEDCC6]/70 uppercase tracking-wider">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span>© {new Date().getFullYear()} AmritVana - Fresh • Premium • Naturally Good</span>
            <span className="hidden sm:inline">•</span>
            <button onClick={() => handleNav('contact')} className="hover:text-white">Shipping Policy</button>
            <button onClick={() => handleNav('contact')} className="hover:text-white">Return Policy</button>
            <button onClick={() => handleNav('contact')} className="hover:text-white">Privacy Policy</button>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-[#EEDCC6] bg-[#2D4628]/80 px-3.5 py-1.5 rounded-full border border-[#EEDCC6]/20">
            <span className="font-bold text-[#D97706]">100% Secure:</span>
            <span>UPI • Cards • NetBanking • COD</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
