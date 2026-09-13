import React, { useState, useMemo } from 'react';
import { 
  Filter, 
  SlidersHorizontal, 
  Grid3X3, 
  List, 
  Search, 
  X, 
  RotateCcw
} from 'lucide-react';
import { PRODUCTS, CATEGORIES_META } from '../data/products';
import { ProductCard } from '../components/common/ProductCard';
import { useShop } from '../context/ShopContext';

export const ShopPage: React.FC = () => {
  const { viewParams, formatPrice } = useShop();

  // Filters State
  const [selectedCategory, setSelectedCategory] = useState<string>(viewParams?.categoryId || 'all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(4500);
  const [selectedWeight, setSelectedWeight] = useState<string>('all');
  const [selectedProcessing, setSelectedProcessing] = useState<string>('all');
  const [minRating, setMinRating] = useState<number>(0);
  const [organicOnly, setOrganicOnly] = useState<boolean>(false);
  const [dealsOnly, setDealsOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  // Available subcategories dynamically from selected category
  const availableSubcategories = useMemo(() => {
    if (selectedCategory === 'all') {
      return Array.from(new Set(PRODUCTS.map((p) => p.subCategory)));
    }
    const cat = CATEGORIES_META.find((c) => c.id === selectedCategory);
    return cat ? cat.subcategories : [];
  }, [selectedCategory]);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category
      if (selectedCategory !== 'all' && product.category !== selectedCategory) return false;

      // Subcategory
      if (selectedSubCategory !== 'all') {
        const subLower = selectedSubCategory.toLowerCase();
        const prodSubLower = product.subCategory.toLowerCase();
        const prodNameLower = product.name.toLowerCase();
        if (!prodSubLower.includes(subLower) && !subLower.includes(prodSubLower) && !prodNameLower.includes(subLower)) {
          return false;
        }
      }

      // Price filter
      const lowestPrice = Math.min(...product.weightOptions.map((w) => w.price));
      if (lowestPrice > maxPrice) return false;

      // Weight filter
      if (selectedWeight !== 'all' && !product.weightOptions.some((w) => w.weight.includes(selectedWeight))) return false;

      // Processing
      if (selectedProcessing !== 'all' && product.processing !== selectedProcessing) return false;

      // Organic only
      if (organicOnly && !product.isOrganic) return false;

      // Deals only
      if (dealsOnly && !product.isDeal && !product.badge) return false;

      // Rating
      if (minRating > 0 && product.rating < minRating) return false;

      // Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matches = 
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.origin.toLowerCase().includes(q) ||
          product.grade.toLowerCase().includes(q) ||
          product.subCategory.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') {
        const priceA = a.weightOptions[0].price;
        const priceB = b.weightOptions[0].price;
        return priceA - priceB;
      }
      if (sortBy === 'price-high') {
        const priceA = a.weightOptions[0].price;
        const priceB = b.weightOptions[0].price;
        return priceB - priceA;
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      if (sortBy === 'reviews') {
        return b.reviewCount - a.reviewCount;
      }
      return 0; // featured default
    });
  }, [
    selectedCategory,
    selectedSubCategory,
    maxPrice,
    selectedWeight,
    selectedProcessing,
    minRating,
    organicOnly,
    dealsOnly,
    sortBy,
    searchQuery,
  ]);

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedSubCategory('all');
    setMaxPrice(4500);
    setSelectedWeight('all');
    setSelectedProcessing('all');
    setMinRating(0);
    setOrganicOnly(false);
    setDealsOnly(false);
    setSearchQuery('');
    setSortBy('featured');
  };

  const activeFiltersCount = 
    (selectedCategory !== 'all' ? 1 : 0) +
    (selectedSubCategory !== 'all' ? 1 : 0) +
    (maxPrice < 4500 ? 1 : 0) +
    (selectedWeight !== 'all' ? 1 : 0) +
    (selectedProcessing !== 'all' ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    (organicOnly ? 1 : 0) +
    (dealsOnly ? 1 : 0) +
    (searchQuery ? 1 : 0);

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Breadcrumb & Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span>Home</span>
            <span>/</span>
            <span className="text-[#2D4628] font-bold">Shop Marketplace</span>
            {selectedCategory !== 'all' && (
              <>
                <span>/</span>
                <span className="capitalize font-semibold text-[#D97706]">{selectedCategory}</span>
              </>
            )}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D4628]">
            AmritVana Dry Fruit Marketplace
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 mt-1">
            Browse 100% natural, unadulterated nuts, raisins, dates, and festive hampers.
          </p>
        </div>

        {/* Top Control Bar (Search, Sorting, Layout) */}
        <div className="bg-white p-4 rounded-2xl border border-[#EEDCC6] shadow-xs mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Search within results */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search in catalog..."
              className="w-full pl-9 pr-4 py-2 bg-[#F5EFE7] border border-[#EEDCC6] rounded-full text-xs sm:text-sm focus:outline-hidden focus:border-[#2D4628] text-[#2D4628]"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-stone-400 hover:text-[#2D4628]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between md:justify-end gap-3 w-full md:w-auto">
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden px-4 py-2 bg-[#2D4628] text-white rounded-full text-xs font-bold flex items-center gap-1.5 shadow-xs"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#2D4628] font-medium hidden sm:inline">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-[#F5EFE7] border border-[#EEDCC6] rounded-full px-3.5 py-2 text-xs font-semibold text-[#2D4628] focus:outline-hidden focus:border-[#2D4628]"
              >
                <option value="featured">Featured / Best Sellers</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated (4.8+)</option>
                <option value="reviews">Most Reviewed</option>
              </select>
            </div>

            {/* Layout Switcher */}
            <div className="hidden sm:flex items-center border border-[#EEDCC6] rounded-full bg-[#F5EFE7] p-1">
              <button
                onClick={() => setLayout('grid')}
                className={`p-1.5 rounded-full transition-colors ${layout === 'grid' ? 'bg-white shadow-xs text-[#2D4628] font-bold' : 'text-stone-400 hover:text-[#2D4628]'}`}
                title="Grid View"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setLayout('list')}
                className={`p-1.5 rounded-full transition-colors ${layout === 'list' ? 'bg-white shadow-xs text-[#2D4628] font-bold' : 'text-stone-400 hover:text-[#2D4628]'}`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Main Grid: Sidebar + Product Catalog */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block lg:col-span-3 space-y-6">
            <div className="bg-white p-6 rounded-3xl border border-[#EEDCC6] shadow-xs space-y-6">
              
              <div className="flex items-center justify-between pb-4 border-b border-[#EEDCC6]/50">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-[#2D4628]" />
                  <h3 className="font-serif font-bold text-base text-[#2D4628]">Filters</h3>
                </div>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={handleResetFilters}
                    className="text-xs font-semibold text-[#D97706] hover:underline flex items-center gap-1"
                  >
                    <RotateCcw className="w-3 h-3" /> Reset All
                  </button>
                )}
              </div>

              {/* Category Filter */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D4628] mb-3">
                  Categories
                </h4>
                <div className="space-y-1.5 text-xs">
                  <button
                    onClick={() => { setSelectedCategory('all'); setSelectedSubCategory('all'); }}
                    className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors flex items-center justify-between ${
                      selectedCategory === 'all' ? 'bg-[#2D4628] text-white font-bold' : 'text-stone-700 hover:bg-[#F5EFE7]'
                    }`}
                  >
                    <span>All Products</span>
                    <span className="text-[11px] opacity-75">({PRODUCTS.length})</span>
                  </button>

                  {CATEGORIES_META.map((cat) => {
                    const count = PRODUCTS.filter((p) => p.category === cat.id).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => { setSelectedCategory(cat.id); setSelectedSubCategory('all'); }}
                        className={`w-full text-left px-3 py-2 rounded-xl font-medium transition-colors flex items-center justify-between ${
                          selectedCategory === cat.id ? 'bg-[#2D4628] text-white font-bold' : 'text-stone-700 hover:bg-[#F5EFE7]'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{cat.icon}</span> {cat.name}
                        </span>
                        <span className="text-[11px] opacity-75">({count})</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Sub-Grade Varieties */}
              {availableSubcategories.length > 0 && (
                <div className="pt-4 border-t border-[#EEDCC6]/50">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D4628] mb-3">
                    Type / Variety
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    <button
                      onClick={() => setSelectedSubCategory('all')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                        selectedSubCategory === 'all'
                          ? 'bg-[#2D4628] text-white font-bold'
                          : 'bg-[#F5EFE7] text-[#2D4628] hover:bg-[#EEDCC6]'
                      }`}
                    >
                      All Varieties
                    </button>
                    {availableSubcategories.map((sub) => (
                      <button
                        key={sub}
                        onClick={() => setSelectedSubCategory(sub)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-colors ${
                          selectedSubCategory === sub
                            ? 'bg-[#2D4628] text-white font-bold'
                            : 'bg-[#F5EFE7] text-[#2D4628] hover:bg-[#EEDCC6]'
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Price Range Slider */}
              <div className="pt-4 border-t border-[#EEDCC6]/50">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D4628]">
                    Max Price
                  </h4>
                  <span className="text-xs font-bold text-[#D97706] font-mono">
                    {formatPrice(maxPrice)}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="200" 
                  max="4500" 
                  step="100"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#2D4628] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-stone-500 mt-1">
                  <span>₹200</span>
                  <span>₹4,500</span>
                </div>
              </div>

              {/* Weight Options */}
              <div className="pt-4 border-t border-[#EEDCC6]/50">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D4628] mb-2">
                  Weight Filter
                </h4>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {['all', '100g', '250g', '500g', '1kg', '2kg'].map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`py-1.5 px-2 rounded-lg font-semibold text-center uppercase text-[11px] transition-colors ${
                        selectedWeight === w
                          ? 'bg-[#2D4628] text-white'
                          : 'bg-[#F5EFE7] text-[#2D4628] hover:bg-[#EEDCC6]'
                      }`}
                    >
                      {w === 'all' ? 'Any' : w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Processing & Roast Type */}
              <div className="pt-4 border-t border-[#EEDCC6]/50">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D4628] mb-2">
                  Processing & Flavor
                </h4>
                <div className="space-y-1.5 text-xs">
                  {[
                    { id: 'all', label: 'All Styles' },
                    { id: 'raw', label: '100% Raw & Sun-Dried' },
                    { id: 'slow-roasted', label: 'Slow Dry-Roasted' },
                    { id: 'flavoured', label: 'Spiced & Masala' },
                  ].map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedProcessing(p.id)}
                      className={`w-full text-left px-3 py-1.5 rounded-lg transition-colors ${
                        selectedProcessing === p.id
                          ? 'bg-[#2D4628] text-white font-bold'
                          : 'text-stone-700 hover:bg-[#F5EFE7]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggles: Organic & Deals */}
              <div className="pt-4 border-t border-[#EEDCC6]/50 space-y-2.5 text-xs">
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-semibold text-[#2D4628]">🌿 100% Organic Certified</span>
                  <input 
                    type="checkbox" 
                    checked={organicOnly}
                    onChange={(e) => setOrganicOnly(e.target.checked)}
                    className="rounded text-[#2D4628] focus:ring-[#2D4628]"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer">
                  <span className="font-semibold text-[#2D4628]">🔥 Flash Deals & Discounts</span>
                  <input 
                    type="checkbox" 
                    checked={dealsOnly}
                    onChange={(e) => setDealsOnly(e.target.checked)}
                    className="rounded text-[#2D4628] focus:ring-[#2D4628]"
                  />
                </label>
              </div>

            </div>
          </div>

          {/* Right Product Grid */}
          <div className="lg:col-span-9">
            
            {/* Active Filters Pill Bar */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span className="text-xs font-semibold text-stone-500">Active Filters:</span>
                {selectedCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-[#F5EFE7] border border-[#EEDCC6] text-[#2D4628] px-3 py-1 rounded-full text-xs font-bold">
                    Category: {selectedCategory}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                  </span>
                )}
                {selectedSubCategory !== 'all' && (
                  <span className="inline-flex items-center gap-1 bg-[#F5EFE7] border border-[#EEDCC6] text-[#2D4628] px-3 py-1 rounded-full text-xs font-bold">
                    {selectedSubCategory}
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedSubCategory('all')} />
                  </span>
                )}
                {organicOnly && (
                  <span className="inline-flex items-center gap-1 bg-[#2D4628] text-white px-3 py-1 rounded-full text-xs font-bold">
                    Organic Only
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setOrganicOnly(false)} />
                  </span>
                )}
                {dealsOnly && (
                  <span className="inline-flex items-center gap-1 bg-[#D97706] text-white px-3 py-1 rounded-full text-xs font-bold">
                    Deals Only
                    <X className="w-3 h-3 cursor-pointer" onClick={() => setDealsOnly(false)} />
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-[#D97706] hover:underline font-semibold ml-2"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Results count */}
            <div className="flex justify-between items-center mb-4 text-xs text-stone-600">
              <span>Showing <strong>{filteredProducts.length}</strong> natural dry fruit harvests</span>
              <span className="text-[#2D4628] font-medium">Guaranteed 100% Unadulterated</span>
            </div>

            {/* Products List/Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-[#EEDCC6] space-y-4">
                <div className="w-16 h-16 bg-[#F5EFE7] text-[#2D4628] rounded-full flex items-center justify-center mx-auto text-2xl border border-[#EEDCC6]">
                  🔍
                </div>
                <h3 className="font-serif text-lg font-bold text-[#2D4628]">No products match your filter criteria</h3>
                <p className="text-xs text-stone-500 max-w-md mx-auto">
                  Try adjusting your price slider, clearing specific variety tags, or resetting all filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="px-6 py-2.5 bg-[#2D4628] text-white rounded-full text-xs font-bold shadow-md hover:bg-[#1E331B] transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className={layout === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} layout={layout} />
                ))}
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Mobile Filters Slide-over Sheet */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden lg:hidden">
          <div 
            className="absolute inset-0 bg-[#1E331B]/60 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <div className="w-screen max-w-xs bg-[#FDF8F3] p-6 overflow-y-auto space-y-6 shadow-2xl flex flex-col justify-between border-l border-[#EEDCC6]">
              
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-[#EEDCC6]">
                  <h3 className="font-serif font-bold text-lg text-[#2D4628]">Filters</h3>
                  <button onClick={() => setIsMobileFilterOpen(false)}>
                    <X className="w-5 h-5 text-stone-400" />
                  </button>
                </div>

                <div className="py-4 space-y-4 text-xs">
                  <div>
                    <h4 className="font-bold text-[#2D4628] mb-2">Category</h4>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-2 bg-white border border-[#EEDCC6] rounded-xl text-[#2D4628]"
                    >
                      <option value="all">All Categories</option>
                      {CATEGORIES_META.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <h4 className="font-bold text-[#2D4628] mb-2">Max Price ({formatPrice(maxPrice)})</h4>
                    <input 
                      type="range" 
                      min="200" 
                      max="4500" 
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full accent-[#2D4628]"
                    />
                  </div>

                  <div className="space-y-2 pt-2 border-t border-[#EEDCC6]">
                    <label className="flex items-center justify-between">
                      <span className="text-[#2D4628] font-medium">Organic Only</span>
                      <input 
                        type="checkbox"
                        checked={organicOnly}
                        onChange={(e) => setOrganicOnly(e.target.checked)}
                        className="rounded text-[#2D4628] focus:ring-[#2D4628]"
                      />
                    </label>
                    <label className="flex items-center justify-between">
                      <span className="text-[#2D4628] font-medium">Deals Only</span>
                      <input 
                        type="checkbox"
                        checked={dealsOnly}
                        onChange={(e) => setDealsOnly(e.target.checked)}
                        className="rounded text-[#2D4628] focus:ring-[#2D4628]"
                      />
                    </label>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#EEDCC6] grid grid-cols-2 gap-2">
                <button
                  onClick={handleResetFilters}
                  className="py-2.5 px-3 border border-[#EEDCC6] bg-white text-[#2D4628] text-xs font-bold rounded-full text-center"
                >
                  Reset
                </button>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="py-2.5 px-3 bg-[#2D4628] text-white text-xs font-bold rounded-full text-center"
                >
                  Apply
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};
