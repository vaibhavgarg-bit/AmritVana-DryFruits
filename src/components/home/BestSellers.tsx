import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { ProductCard } from '../common/ProductCard';
import { useShop } from '../../context/ShopContext';

export const BestSellers: React.FC = () => {
  const { navigate } = useShop();
  const [activeTab, setActiveTab] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Top Sellers' },
    { id: 'almonds', name: 'Almonds' },
    { id: 'cashews', name: 'Cashews' },
    { id: 'walnuts', name: 'Walnuts' },
    { id: 'dates', name: 'Dates' },
    { id: 'combos-gifts', name: 'Combos & Boxes' },
  ];

  const bestSellerProducts = PRODUCTS.filter((p) => {
    if (activeTab === 'all') return p.isBestSeller || p.rating >= 4.8;
    return p.category === activeTab;
  }).slice(0, 8);

  return (
    <section className="py-16 sm:py-20 bg-[#FAF5EE] border-b border-[#EEDCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-bold uppercase tracking-widest text-[#D97706] mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
              <span>Customer Favorites & Signature Harvests</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D4628]">
              Best Selling Dry Fruits
            </h2>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#F5EFE7] rounded-full border border-[#EEDCC6]">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#2D4628] text-white shadow-xs'
                    : 'text-[#2D4628] hover:bg-[#EEDCC6]/50'
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View All CTA */}
        <div className="mt-12 text-center">
          <button
            onClick={() => navigate('shop')}
            className="px-8 py-3.5 bg-[#2D4628] hover:bg-[#1E331B] text-white font-bold rounded-full text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-md active:scale-95"
          >
            Explore Complete Marketplace ({PRODUCTS.length}+ Products) <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};
