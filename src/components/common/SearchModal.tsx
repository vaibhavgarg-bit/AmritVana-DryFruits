import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, Star, Tag } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCTS, CATEGORIES_META } from '../../data/products';
import { Product } from '../../types';

export const SearchModal: React.FC = () => {
  const { isSearchModalOpen, setIsSearchModalOpen, navigate, formatPrice } = useShop();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredResults, setFilteredResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchModalOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setSearchTerm('');
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredResults([]);
      return;
    }

    const query = searchTerm.toLowerCase();
    const results = PRODUCTS.filter((p) => {
      return (
        p.name.toLowerCase().includes(query) ||
        (p.hindiName && p.hindiName.toLowerCase().includes(query)) ||
        p.subCategory.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.grade.toLowerCase().includes(query) ||
        p.origin.toLowerCase().includes(query)
      );
    });

    setFilteredResults(results.slice(0, 8));
  }, [searchTerm]);

  if (!isSearchModalOpen) return null;

  const popularKeywords = [
    'Mamra Almonds',
    'W180 Cashews',
    'Kashmiri Walnuts',
    'Ajwa Dates',
    'Akbari Pistachios',
    'Anjeer Figs',
    'Gift Hamper',
    'Makhana'
  ];

  const handleSelectProduct = (product: Product) => {
    setIsSearchModalOpen(false);
    navigate('product-detail', { slug: product.slug });
  };

  const handleSelectCategory = (categoryId: string) => {
    setIsSearchModalOpen(false);
    navigate('category', { categoryId });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-20">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#1E331B]/65 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsSearchModalOpen(false)}
      />

      <div className="relative mx-auto max-w-2xl bg-[#FDF8F3] rounded-[2rem] shadow-2xl overflow-hidden border border-[#EEDCC6] animate-in zoom-in-95 duration-200">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EEDCC6] flex items-center gap-3 bg-[#F5EFE7]">
          <Search className="w-5 h-5 text-[#2D4628] shrink-0" />
          <input 
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Mamra, W180 Cashews, Ajwa Dates, Walnuts, Combos..."
            className="w-full bg-transparent text-sm sm:text-base text-[#2D4628] placeholder-[#78716C] focus:outline-hidden"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="p-1 text-stone-400 hover:text-[#2D4628]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={() => setIsSearchModalOpen(false)}
            className="px-2 py-1 text-xs font-semibold text-[#2D4628] hover:bg-[#EEDCC6] bg-white rounded-md border border-[#EEDCC6]"
          >
            ESC
          </button>
        </div>

        {/* Search Content */}
        <div className="max-h-[60vh] overflow-y-auto p-5">
          {searchTerm.trim() === '' ? (
            <div className="space-y-6">
              {/* Popular Searches */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D4628] mb-2.5 flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5 text-[#D97706]" /> Popular Searches
                </h4>
                <div className="flex flex-wrap gap-2">
                  {popularKeywords.map((kw) => (
                    <button
                      key={kw}
                      onClick={() => setSearchTerm(kw)}
                      className="px-3.5 py-1.5 bg-[#F5EFE7] hover:bg-[#EEDCC6] text-xs font-semibold text-[#2D4628] rounded-full transition-colors border border-[#EEDCC6]/50"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Categories */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D4628] mb-2.5">
                  Quick Category Access
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {CATEGORIES_META.slice(0, 8).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => handleSelectCategory(c.id)}
                      className="p-2.5 rounded-2xl border border-[#EEDCC6] hover:border-[#2D4628] bg-white hover:bg-[#F5EFE7] flex items-center gap-2 text-left transition-colors group"
                    >
                      <span className="text-xl group-hover:scale-110 transition-transform">{c.icon}</span>
                      <div className="min-w-0">
                        <span className="block text-xs font-bold text-[#2D4628] truncate">{c.name}</span>
                        <span className="block text-[10px] text-stone-500">From ₹{c.startingPrice}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : filteredResults.length === 0 ? (
            <div className="text-center py-10 space-y-2">
              <p className="text-[#2D4628] font-medium text-sm">No dry fruits found for "{searchTerm}"</p>
              <p className="text-xs text-stone-500">Try searching for Almonds, Cashews, Walnuts, Dates, or Combos</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between text-xs text-stone-500 pb-1 border-b border-[#EEDCC6]/60">
                <span>Found {filteredResults.length} natural harvests</span>
                <span className="text-[#D97706] font-semibold">Click to view details</span>
              </div>

              <div className="space-y-2">
                {filteredResults.map((product) => {
                  const defaultOpt = product.weightOptions[0];
                  return (
                    <div 
                      key={product.id}
                      onClick={() => handleSelectProduct(product)}
                      className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-[#F5EFE7] border border-transparent hover:border-[#EEDCC6] cursor-pointer transition-all group"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="w-14 h-14 rounded-xl object-cover border border-[#EEDCC6] shrink-0 group-hover:scale-105 transition-transform bg-white" 
                        />
                        <div className="min-w-0">
                          <h4 className="text-xs sm:text-sm font-bold text-[#2D4628] group-hover:text-[#D97706] truncate">
                            {product.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[11px] text-stone-500">{product.origin}</span>
                            <span className="text-[#EEDCC6]">•</span>
                            <span className="text-[11px] font-semibold text-[#D97706] flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-[#D97706] text-[#D97706]" /> {product.rating}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 pl-3">
                        <span className="text-xs sm:text-sm font-bold text-[#2D4628]">
                          {formatPrice(defaultOpt.price)}
                        </span>
                        <span className="block text-[10px] text-stone-400">
                          ({defaultOpt.weight})
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#FAF5EE] border-t border-[#EEDCC6] text-center text-xs text-stone-600 flex justify-between px-6">
          <span>🌿 100% Cold-Harvested & Unpolished</span>
          <button 
            onClick={() => { setIsSearchModalOpen(false); navigate('shop'); }}
            className="font-bold text-[#2D4628] hover:text-[#D97706] flex items-center gap-1"
          >
            View All in Catalog <ArrowRight className="w-3 h-3" />
          </button>
        </div>

      </div>
    </div>
  );
};
