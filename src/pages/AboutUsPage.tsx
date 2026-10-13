import React from 'react';
import { 
  Sparkles, 
  ArrowRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { IMAGES } from '../assets/images';

export const AboutUsPage: React.FC = () => {
  const { navigate } = useShop();

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-[#2D4628] font-bold">About AmritVana</span>
        </div>

        {/* Hero Banner */}
        <div className="bg-[#2D4628] rounded-[2.5rem] p-8 sm:p-14 text-white shadow-2xl border border-[#EEDCC6]/30 mb-14 relative overflow-hidden text-center sm:text-left">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#1E331B] text-[#FDE68A] border border-[#EEDCC6]/30 px-3.5 py-1 rounded-full text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#FDE68A]" />
              <span>THE AMRITVANA HERITAGE & MISSION</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-white leading-tight">
              Rooted in Nature.<br />
              Refined by Pure Tradition.
            </h1>

            <p className="text-xs sm:text-base text-stone-200 leading-relaxed max-w-2xl font-normal">
              AmritVana was born with a singular, uncompromising purpose: to bring unadulterated, unpolished, and high-oil-content dry fruits from heirloom mountain orchards directly into modern homes.
            </p>
          </div>
        </div>

        {/* The Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
              Why We Started
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D4628] leading-snug">
              Rescuing the Purity of India's Traditional Morning Fuel
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              For generations, Indian households began their mornings with soaked Mamra almonds, walnuts, and dates. But modern commercial supply chains replaced rich Himalayan kernels with chemically bleached, sulfur-treated, and oil-extracted nuts stripped of their natural nutrition.
            </p>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              At AmritVana, we made a pact: <strong>Zero chemical polishing. Zero added glucose. Direct orchard sourcing. Nitrogen-flushed packaging.</strong> Every single kernel you taste is as alive and potent as the day it was plucked from the branch.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="bg-white p-4 rounded-2xl border border-[#EEDCC6]">
                <span className="font-serif text-2xl font-black text-[#2D4628]">50,000+</span>
                <span className="text-xs text-stone-500 block mt-1">Families Nourished Daily</span>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-[#EEDCC6]">
                <span className="font-serif text-2xl font-black text-[#2D4628]">100%</span>
                <span className="text-xs text-stone-500 block mt-1">Lab Tested Purity</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-[#EEDCC6] aspect-4/3">
              <img 
                src={IMAGES.kashmirOrchards} 
                alt="AmritVana Mountain Orchards"
                className="w-full h-full object-cover" 
              />
            </div>
          </div>
        </div>

        {/* Sourcing Map & Global Origins */}
        <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 border border-[#EEDCC6] shadow-md mb-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">Direct From The Source</span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D4628] mt-1">
              Where Our Dry Fruits Come From
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              We travel to the highest altitude valleys and traditional growing regions to curate the world's most prized harvests.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { region: 'Kashmir Valley, India', crop: 'Mamra Almonds & Snow-White Walnuts', icon: '🏔️', desc: 'Snow-melt fed orchards yielding up to 50% natural oil' },
              { region: 'San Joaquin Valley, California', crop: 'Nonpareil Jumbo Almonds', icon: '☀️', desc: 'Sweet, thin-shelled uniform crunchy kernels' },
              { region: 'Madinah Al-Munawwarah', crop: 'Authentic Ajwa Holy Dates', icon: '🌴', desc: 'Sourced directly from registered Madinah date groves' },
              { region: 'Kerman & Rafsanjan, Iran', crop: 'Royal Akbari & Jumbo Pistachios', icon: '🟢', desc: 'Naturally sun-opened shells with emerald green kernels' },
            ].map((loc, idx) => (
              <div key={idx} className="bg-[#FAF5EE] p-5 rounded-2xl border border-[#EEDCC6] space-y-2">
                <span className="text-3xl block">{loc.icon}</span>
                <strong className="text-xs sm:text-sm font-bold text-[#2D4628] block">{loc.region}</strong>
                <span className="text-xs font-semibold text-[#D97706] block">{loc.crop}</span>
                <p className="text-[11px] text-stone-600 leading-relaxed">{loc.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="bg-[#2D4628] rounded-[2.5rem] p-8 sm:p-12 text-center text-white border border-[#EEDCC6]/30 space-y-4">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
            Taste the Authentic Difference Today
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl mx-auto">
            Experience what real, cold-harvested dry fruits taste like. Vacuum nitrogen packed and delivered straight to your home.
          </p>
          <button
            onClick={() => navigate('shop')}
            className="px-8 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-full text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg transition-all"
          >
            Explore Catalog <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
