import React from 'react';
import { Gift, CheckCircle2, Heart } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useShop } from '../context/ShopContext';

export const CombosPage: React.FC = () => {
  const { navigate, addToCart, formatPrice, toggleWishlist, isInWishlist } = useShop();

  const comboProducts = PRODUCTS.filter((p) => p.category === 'combos-gifts');

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-[#2D4628] font-bold">Combos & Festive Gift Hampers</span>
        </div>

        {/* Hero Header */}
        <div className="bg-[#2D4628] rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl border border-[#EEDCC6]/30 mb-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4 relative z-10">
            <div className="inline-flex items-center gap-2 bg-[#1E331B] text-[#FDE68A] border border-[#EEDCC6]/30 px-3.5 py-1 rounded-full text-xs font-bold">
              <Gift className="w-3.5 h-3.5 text-[#FDE68A]" />
              <span>ROYAL GIFTING & FAMILY HEALTH CURATIONS</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Exquisite Dry Fruit Combos & Gift Hampers
            </h1>

            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Crafted in handcrafted walnut-finish wooden chests and royal keepsake magnetic boxes. Sourced fresh from the latest cold harvest, nitrogen-sealed for 12-month crisp freshness.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 text-xs text-[#FDE68A]">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FDE68A]" /> Free Custom Calligraphy Greeting Card
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#FDE68A]" /> Corporate & Bulk Discounts Available
              </span>
            </div>
          </div>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {comboProducts.map((combo) => {
            const defaultOpt = combo.weightOptions[0];
            const isWishlisted = isInWishlist(combo.id);

            return (
              <div
                key={combo.id}
                className="bg-white rounded-[2rem] border border-[#EEDCC6] overflow-hidden hover:shadow-xl hover:border-[#2D4628] transition-all duration-300 flex flex-col justify-between"
              >
                <div className="grid grid-cols-1 sm:grid-cols-12 gap-0">
                  
                  {/* Left Box Image (5 Cols) */}
                  <div className="sm:col-span-5 relative aspect-square sm:aspect-auto overflow-hidden bg-[#FAF5EE]">
                    <img 
                      src={combo.images[0]} 
                      alt={combo.name} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3 bg-[#2D4628] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                      {combo.subCategory}
                    </div>
                    <button
                      onClick={() => toggleWishlist(combo, defaultOpt.weight)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-xs transition-colors ${
                        isWishlisted ? 'bg-[#D97706] text-white' : 'bg-white/90 text-[#2D4628] hover:text-[#D97706] border border-[#EEDCC6]'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                    </button>
                  </div>

                  {/* Right Box Info (7 Cols) */}
                  <div className="sm:col-span-7 p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-[#D97706] font-semibold mb-1">
                        <span>{combo.origin}</span>
                        <span className="bg-[#FAF5EE] border border-[#EEDCC6] text-[#2D4628] px-2.5 py-0.5 rounded-full text-[11px] font-bold">
                          ⭐ {combo.rating} ({combo.reviewCount})
                        </span>
                      </div>

                      <h2 
                        onClick={() => navigate('product-detail', { slug: combo.slug })}
                        className="font-serif text-lg sm:text-xl font-bold text-[#2D4628] hover:text-[#D97706] cursor-pointer transition-colors"
                      >
                        {combo.name}
                      </h2>
                      <p className="text-xs text-stone-600 mt-1">
                        {combo.tagline}
                      </p>

                      {/* Inside the box checklist */}
                      {combo.comboItems && (
                        <div className="mt-4 pt-3 border-t border-[#EEDCC6]/50 space-y-1.5 bg-[#FAF5EE] p-3 rounded-2xl border border-[#EEDCC6]/50">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4628] block">
                            Box Contents Included:
                          </span>
                          {combo.comboItems.map((item, idx) => (
                            <div key={idx} className="flex items-center gap-1.5 text-xs text-[#2D4628]">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4628] shrink-0" />
                              <span className="truncate">{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Pricing & Add Button */}
                    <div className="pt-5 mt-4 border-t border-[#EEDCC6]/50 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-500 block uppercase">Hamper Price</span>
                        <div className="flex items-baseline gap-2">
                          <span className="font-serif text-2xl font-black text-[#2D4628]">
                            {formatPrice(defaultOpt.price)}
                          </span>
                          {defaultOpt.originalPrice > defaultOpt.price && (
                            <span className="text-xs text-stone-400 line-through">
                              {formatPrice(defaultOpt.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => addToCart(combo, defaultOpt.weight, 1)}
                          className="px-5 py-2.5 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs font-bold shadow-md transition-all active:scale-95"
                        >
                          Add Hamper
                        </button>
                      </div>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Corporate & Bulk Gifting Banner */}
        <div className="mt-14 bg-[#2D4628] rounded-[2.5rem] p-8 sm:p-10 border border-[#EEDCC6]/30 text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl font-bold text-white">
              Corporate & Wedding Bulk Orders
            </h3>
            <p className="text-xs sm:text-sm text-stone-200 max-w-xl">
              Looking for customized branding, personalized laser-engraved wooden boxes, or bulk festive distribution for your company or family wedding?
            </p>
          </div>

          <button
            onClick={() => navigate('contact')}
            className="px-6 py-3.5 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-full text-xs sm:text-sm transition-colors shrink-0 shadow-lg"
          >
            Inquire Bulk Gifting Rates →
          </button>
        </div>

      </div>
    </div>
  );
};
