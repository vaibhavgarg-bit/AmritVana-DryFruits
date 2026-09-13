import React, { useState } from 'react';
import { PRODUCTS, CATEGORIES_META } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useShop } from '../context/ShopContext';
import { ProductCategory } from '../types';

export const CategoryPage: React.FC = () => {
  const { viewParams, navigate } = useShop();
  const categoryId = (viewParams?.categoryId || 'almonds') as ProductCategory;

  const currentCategory = CATEGORIES_META.find((c) => c.id === categoryId) || CATEGORIES_META[0];
  const categoryProducts = PRODUCTS.filter((p) => p.category === categoryId);

  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');

  const filteredProducts = categoryProducts.filter((p) => {
    if (activeSubcategory === 'all') return true;
    const subLower = activeSubcategory.toLowerCase();
    const prodSubLower = p.subCategory.toLowerCase();
    const prodNameLower = p.name.toLowerCase();
    return prodSubLower.includes(subLower) || subLower.includes(prodSubLower) || prodNameLower.includes(subLower);
  });

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <button onClick={() => navigate('shop')} className="hover:underline">Categories</button>
          <span>/</span>
          <span className="text-[#2D4628] font-bold capitalize">{currentCategory.name}</span>
        </div>

        {/* Category Hero & Buying Guide Banner */}
        <div className="bg-[#2D4628] rounded-[2.5rem] p-6 sm:p-10 lg:p-12 text-white shadow-xl border border-[#EEDCC6]/30 mb-12 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 bg-[#1E331B] text-[#FDE68A] border border-[#EEDCC6]/30 px-3.5 py-1 rounded-full text-xs font-bold">
                <span className="text-base">{currentCategory.icon}</span>
                <span>ORIGIN & GRADING DIRECTORY</span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
                {currentCategory.name} Collection ({currentCategory.hindiName})
              </h1>

              <p className="text-xs sm:text-sm text-stone-200 max-w-2xl leading-relaxed">
                {currentCategory.description} All batches are nitrogen-sealed upon harvesting to lock in volatile essential oils and crunch.
              </p>

              {/* Sub-varieties pills */}
              <div className="pt-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#FDE68A] block mb-2">
                  Explore Varieties in this Family:
                </span>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveSubcategory('all')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                      activeSubcategory === 'all'
                        ? 'bg-[#D97706] text-white shadow-md'
                        : 'bg-[#1E331B] text-stone-200 border border-[#EEDCC6]/30 hover:bg-[#1E331B]/70'
                    }`}
                  >
                    All ({categoryProducts.length})
                  </button>
                  {currentCategory.subcategories.map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setActiveSubcategory(sub)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                        activeSubcategory === sub
                          ? 'bg-[#D97706] text-white shadow-md'
                          : 'bg-[#1E331B] text-stone-200 border border-[#EEDCC6]/30 hover:bg-[#1E331B]/70'
                      }`}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right category image */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="relative w-48 h-48 sm:w-60 sm:h-60 rounded-3xl overflow-hidden border-2 border-[#EEDCC6]/40 shadow-2xl bg-white">
                <img 
                  src={currentCategory.image} 
                  alt={currentCategory.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1E331B]/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-center">
                  <span className="text-[11px] font-bold text-[#FDE68A]">
                    Starting at ₹{currentCategory.startingPrice}
                  </span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Other category switch bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 mr-2">
            Switch Category:
          </span>
          {CATEGORIES_META.map((cat) => (
            <button
              key={cat.id}
              onClick={() => navigate('category', { categoryId: cat.id })}
              className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all flex items-center gap-1.5 ${
                categoryId === cat.id
                  ? 'bg-[#2D4628] text-white shadow-sm'
                  : 'bg-white border border-[#EEDCC6] text-[#2D4628] hover:bg-[#F5EFE7]'
              }`}
            >
              <span>{cat.icon}</span> {cat.name}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <div className="mb-6 flex justify-between items-center text-xs text-stone-500">
          <span>Found <strong>{filteredProducts.length}</strong> harvests in {currentCategory.name}</span>
          <button onClick={() => navigate('shop')} className="text-[#D97706] font-bold hover:underline">
            View All Store Products →
          </button>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-[#EEDCC6] space-y-3">
            <p className="text-sm font-bold text-[#2D4628]">No products matching "{activeSubcategory}"</p>
            <button
              onClick={() => setActiveSubcategory('all')}
              className="px-5 py-2.5 bg-[#2D4628] text-white rounded-full text-xs font-bold"
            >
              View All {currentCategory.name}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
