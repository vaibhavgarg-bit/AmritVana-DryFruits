import React from 'react';
import { ArrowRight } from 'lucide-react';
import { CATEGORIES_META } from '../../data/products';
import { useShop } from '../../context/ShopContext';

export const CategoryGrid: React.FC = () => {
  const { navigate } = useShop();

  return (
    <section className="py-16 bg-[#FDF8F3] border-b border-[#EEDCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 text-center sm:text-left">
          <div>
            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs font-bold uppercase tracking-widest text-[#D97706] mb-1">
              <span>Nourishment From Mountain & Desert Orchards</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D4628]">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => navigate('shop')}
            className="text-xs sm:text-sm font-bold text-[#D97706] hover:text-[#B45309] flex items-center gap-1.5 hover:underline"
          >
            View All Categories →
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {CATEGORIES_META.map((cat) => (
            <div
              key={cat.id}
              onClick={() => navigate('category', { categoryId: cat.id })}
              className="bg-white rounded-3xl p-5 border border-[#EEDCC6] hover:border-[#D97706]/70 hover:shadow-xl transition-all duration-300 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-[#F5EFE7] mb-4">
                  <img 
                    src={cat.image} 
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500" 
                  />
                  <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-base shadow-xs text-[#2D4628]">
                    {cat.icon}
                  </div>
                </div>

                <div className="flex items-baseline justify-between gap-1">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-[#2D4628] group-hover:text-[#D97706] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-xs text-stone-500 font-medium">({cat.hindiName})</span>
                </div>

                <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed">
                  {cat.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EEDCC6]/60 flex items-center justify-between text-xs">
                <span className="text-stone-600 font-medium">
                  Starting at <strong className="text-[#2D4628] font-bold">₹{cat.startingPrice}</strong>
                </span>
                <span className="text-[#D97706] font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  Explore <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
