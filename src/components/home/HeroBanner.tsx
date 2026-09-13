import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Truck, Award, Gift } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { IMAGES } from '../../assets/images';

export const HeroBanner: React.FC = () => {
  const { navigate } = useShop();

  return (
    <div className="relative bg-[#2D4628] text-white overflow-hidden border-b border-[#EEDCC6]/30">
      
      {/* Background Decorative Graphic */}
      <div className="absolute right-0 top-0 w-1/2 h-full opacity-10 flex items-center justify-center text-[180px] select-none pointer-events-none">
        🥜
      </div>
      <div className="absolute -left-20 -bottom-20 w-96 h-96 bg-[#1E331B] rounded-full blur-3xl opacity-40 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 lg:py-24 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/20 text-[#FAF5EE] text-xs sm:text-sm font-semibold backdrop-blur-xs">
              <span className="bg-[#D97706] text-white text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full">
                PREMIUM QUALITY
              </span>
              <span>Direct from Mountain Orchards</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              Naturally Sourced,<br />
              <span className="text-[#FDE68A]">Purely Good.</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-white/85 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Experience the crunch of health with our hand-picked Kashmiri Mamra Almonds (50%+ natural oil content), W180 Jumbo Cashews, and sacred Madinah Ajwa Dates. Unadulterated purity in every bite.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => navigate('shop')}
                className="bg-[#D97706] hover:bg-[#B45309] text-white px-8 py-3.5 rounded-full font-bold shadow-lg shadow-black/15 flex items-center gap-2 transition-all active:scale-95"
              >
                Shop Collection <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('combos')}
                className="bg-white/15 hover:bg-white/25 text-white border border-white/25 px-6 py-3.5 rounded-full font-bold flex items-center gap-2 backdrop-blur-xs transition-all"
              >
                <Gift className="w-4 h-4 text-[#FDE68A]" /> Gift Hampers
              </button>
            </div>

            {/* Quick Trust Badges */}
            <div className="pt-6 border-t border-white/20 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 text-center lg:text-left">
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#FDE68A]">50%+</span>
                <span className="text-[11px] text-white/75 uppercase tracking-wider">Mamra Natural Oils</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#FDE68A]">100%</span>
                <span className="text-[11px] text-white/75 uppercase tracking-wider">Zero Chemicals</span>
              </div>
              <div>
                <span className="block font-serif text-xl sm:text-2xl font-bold text-[#FDE68A]">4.9 ★</span>
                <span className="text-[11px] text-white/75 uppercase tracking-wider">50k+ Happy Patrons</span>
              </div>
            </div>

          </div>

          {/* Right Visual Image & Feature Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Banner Image Container */}
              <div className="relative rounded-[2rem] overflow-hidden border border-[#EEDCC6]/40 bg-[#1E331B] shadow-2xl">
                <img 
                  src={IMAGES.heroBanner} 
                  alt="AmritVana Premium Dry Fruits" 
                  className="w-full h-80 sm:h-96 object-cover hover:scale-105 transition-transform duration-700"
                />

                {/* Floating Overlay Badge 1 */}
                <div className="absolute bottom-4 left-4 right-4 bg-[#1E331B]/90 backdrop-blur-md p-4 rounded-2xl border border-[#EEDCC6]/30 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#D97706]/20 text-[#FDE68A] flex items-center justify-center text-xl">
                      🌿
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">Nitrogen Sealed Freshness</h4>
                      <p className="text-[11px] text-white/70">Crunch & aroma preserved naturally</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-[#A7F3D0] bg-[#2D4628] px-2.5 py-1 rounded-full border border-[#A7F3D0]/30">
                    FSSAI Certified
                  </span>
                </div>

                {/* Floating Top Tag */}
                <div className="absolute top-4 right-4 bg-[#D97706] text-white text-xs font-bold px-3.5 py-1 rounded-full shadow-md">
                  Royal Grade A+
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>
  );
};
