import React from 'react';
import { Gift, CheckCircle2, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { useShop } from '../../context/ShopContext';

export const CuratedCombos: React.FC = () => {
  const { navigate, addToCart, formatPrice } = useShop();

  const comboProducts = PRODUCTS.filter((p) => p.category === 'combos-gifts');

  return (
    <section className="py-16 sm:py-20 bg-[#FDF8F3] border-b border-[#EEDCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-[#F5EFE7] border border-[#EEDCC6] text-[#2D4628] px-4 py-1 rounded-full text-xs font-bold mb-3">
            <Gift className="w-3.5 h-3.5 text-[#D97706]" />
            <span>EXQUISITE CURATIONS & GIFT CHESTS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D4628]">
            Royal Dry Fruit Combos & Gift Hampers
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Hand-assembled in artisanal wooden boxes and keepsake magnetic chests. Perfect for daily family vitality, festive gifting, and corporate celebrations.
          </p>
        </div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {comboProducts.map((combo) => {
            const defaultOpt = combo.weightOptions[0];
            return (
              <div 
                key={combo.id}
                onClick={() => navigate('product-detail', { slug: combo.slug })}
                className="bg-white rounded-3xl border border-[#EEDCC6] overflow-hidden hover:shadow-2xl hover:border-[#D97706]/70 transition-all duration-300 flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  {/* Image */}
                  <div className="relative aspect-4/3 overflow-hidden bg-[#F5EFE7]">
                    <img 
                      src={combo.images[0]} 
                      alt={combo.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
                    />
                    <div className="absolute top-3 left-3 bg-[#2D4628] text-white text-[10px] font-bold px-3 py-0.5 rounded-full backdrop-blur-xs">
                      {combo.subCategory}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-serif text-base font-bold text-[#2D4628] group-hover:text-[#D97706] transition-colors line-clamp-1">
                      {combo.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 mt-1">
                      {combo.tagline}
                    </p>

                    {/* What's Inside Checklist */}
                    {combo.comboItems && (
                      <div className="mt-4 pt-3 border-t border-[#EEDCC6]/50 space-y-1.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4628] block">
                          What's Inside Box:
                        </span>
                        {combo.comboItems.slice(0, 3).map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1.5 text-xs text-stone-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4628] shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                        {combo.comboItems.length > 3 && (
                          <span className="text-[11px] text-[#D97706] font-semibold block">
                            + {combo.comboItems.length - 3} more dry fruit delicacies
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer price & button */}
                <div className="p-5 pt-0">
                  <div className="pt-3 border-t border-[#EEDCC6]/50 flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-stone-400 block">Box Price</span>
                      <span className="font-serif text-lg font-bold text-[#2D4628]">
                        {formatPrice(defaultOpt.price)}
                      </span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(combo, defaultOpt.weight, 1);
                      }}
                      className="px-4 py-2 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs font-bold shadow-sm transition-colors"
                    >
                      Add Box
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* View all combos button */}
        <div className="mt-10 text-center">
          <button
            onClick={() => navigate('combos')}
            className="px-8 py-3.5 bg-[#2D4628] hover:bg-[#1E331B] text-white font-bold rounded-full text-xs sm:text-sm inline-flex items-center gap-2 shadow-md transition-all active:scale-95"
          >
            Explore Custom Gift Boxes & Hampers <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
