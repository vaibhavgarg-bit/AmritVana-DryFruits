import React from 'react';
import { 
  TreePine, 
  Wind, 
  ShieldCheck, 
  CheckCircle, 
  Truck, 
  HeartHandshake,
  Sparkles
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: TreePine,
      title: 'Direct Orchard Cold Harvest',
      desc: 'We skip middlemen and commission agents, partnering directly with heirloom orchards in Kashmir, San Joaquin Valley, Kerman, and Madinah.',
      tag: 'Orchard Direct'
    },
    {
      icon: Wind,
      title: 'Vacuum Nitrogen Flushing',
      desc: 'Each pouch and glass jar is sealed with medical-grade nitrogen to displace oxygen, retaining peak freshness and crunch for a full 12 months.',
      tag: 'Zero Oxidation'
    },
    {
      icon: ShieldCheck,
      title: 'Zero Chemical Bleach or Polish',
      desc: 'Commercial dry fruits are often chemically bleached for false shine. AmritVana products are 100% natural, unadulterated, and raw.',
      tag: '100% Pure'
    },
    {
      icon: CheckCircle,
      title: 'FSSAI Triple-Sorted Standard',
      desc: 'Our sorting facilities test for zero bitterness, kernel moisture levels below 4%, and strict size grade conformity (W180, Nonpareil 20/22).',
      tag: 'Certified Lab'
    },
    {
      icon: Truck,
      title: 'Cold-Chain Express Dispatch',
      desc: 'Stored in temperature and humidity-controlled warehouses at 15°C to protect delicate healthy oils before lightning-fast dispatch.',
      tag: 'Fast Delivery'
    },
    {
      icon: HeartHandshake,
      title: '100% Purity or Money-Back',
      desc: 'We stand by every single nut. If you are not completely spellbound by the quality and freshness, we offer instant replacement or refund.',
      tag: 'Buyer Promise'
    }
  ];

  return (
    <section className="py-20 bg-[#2D4628] text-white relative overflow-hidden border-b border-[#EEDCC6]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 bg-white/20 text-[#FDE68A] border border-white/20 px-4 py-1 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FDE68A]" />
            <span>THE AMRITVANA QUALITY PROMISE</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">
            Why Discerning Families Choose AmritVana
          </h2>
          <p className="text-xs sm:text-sm text-[#EEDCC6]/80 mt-2">
            The difference between ordinary grocery store dry fruits and AmritVana harvest is in the uncompromising natural standards we practice daily.
          </p>
        </div>

        {/* 6 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="bg-[#1E331B]/80 p-6 sm:p-7 rounded-3xl border border-[#EEDCC6]/20 hover:border-[#D97706]/60 hover:bg-[#1E331B] transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-[#2D4628] text-[#FDE68A] flex items-center justify-center group-hover:scale-110 group-hover:bg-[#D97706] group-hover:text-white transition-all border border-[#EEDCC6]/30">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-[#2D4628] text-[#FDE68A] border border-[#EEDCC6]/20">
                    {item.tag}
                  </span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-white group-hover:text-[#FDE68A] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-[#EEDCC6]/80 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
