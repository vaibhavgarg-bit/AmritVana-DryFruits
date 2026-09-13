import React from 'react';
import { Sliders, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export const CustomMixPromo: React.FC = () => {
  const { navigate } = useShop();

  return (
    <section className="py-16 bg-[#FAF5EE] border-b border-[#EEDCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2D4628] rounded-[2.5rem] p-8 sm:p-12 lg:p-14 text-white relative overflow-hidden shadow-2xl border border-[#EEDCC6]/30">
          
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#1E331B] rounded-full blur-3xl pointer-events-none opacity-40" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/20 text-[#FDE68A] border border-white/20 px-3.5 py-1 rounded-full text-xs font-bold">
                <Sliders className="w-3.5 h-3.5 text-[#FDE68A]" />
                <span>INTERACTIVE NUT LAB</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-snug">
                Design Your Own <br />
                <span className="text-[#FDE68A]">
                  Custom Nut & Berry Jar
                </span>
              </h2>

              <p className="text-xs sm:text-sm text-white/85 max-w-xl leading-relaxed">
                Why settle for pre-packaged mixes? Pick your favorite nuts, dried berries, and super seeds with custom weight ratios, select roasting style (Pink Salt, Raw, Masala), and get your name printed on the luxury glass jar!
              </p>

              {/* Feature bullet list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FDE68A] shrink-0" />
                  <span>Choose from 10+ raw harvest ingredients</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FDE68A] shrink-0" />
                  <span>Live calorie & protein calculator</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FDE68A] shrink-0" />
                  <span>Custom label with your name</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#FDE68A] shrink-0" />
                  <span>Nitrogen sealed in airtight glass jar</span>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4">
                <button
                  onClick={() => navigate('custom-mix')}
                  className="px-8 py-4 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-full text-xs sm:text-sm flex items-center justify-center sm:justify-start gap-2 shadow-xl transition-all active:scale-95 mx-auto lg:mx-0"
                >
                  <Sliders className="w-4 h-4" /> Launch Custom Mix Builder <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Right Jar Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative bg-[#1E331B]/80 p-6 rounded-3xl border border-[#EEDCC6]/20 backdrop-blur-md max-w-xs text-center space-y-4 shadow-xl">
                <div className="w-20 h-20 mx-auto bg-[#2D4628] text-[#FDE68A] rounded-full flex items-center justify-center text-3xl border border-[#EEDCC6]/30 animate-bounce">
                  🏺
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-white">Daily Vitality Jar</h4>
                  <p className="text-[11px] text-[#FDE68A] font-mono mt-0.5">500g Custom Roasted Glass Jar</p>
                </div>

                <div className="space-y-1.5 text-left text-xs bg-[#2D4628]/60 p-3 rounded-2xl border border-[#EEDCC6]/20">
                  <div className="flex justify-between">
                    <span className="text-[#EEDCC6]/80">Kashmiri Mamra:</span>
                    <span className="font-bold text-[#FDE68A]">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#EEDCC6]/80">W180 Cashews:</span>
                    <span className="font-bold text-[#FDE68A]">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#EEDCC6]/80">Wild Cranberries:</span>
                    <span className="font-bold text-[#FDE68A]">20%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#EEDCC6]/80">Pumpkin & Chia Seeds:</span>
                    <span className="font-bold text-[#FDE68A]">20%</span>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-xs border-t border-[#EEDCC6]/20">
                  <span className="text-[#EEDCC6]/80">Calculated Nutrition:</span>
                  <span className="font-bold text-[#A7F3D0]">22g Protein / 100g</span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
