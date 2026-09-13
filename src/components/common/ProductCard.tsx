import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye, Check, Plus } from 'lucide-react';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

interface ProductCardProps {
  product: Product;
  layout?: 'grid' | 'list';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, layout = 'grid' }) => {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    openQuickView, 
    formatPrice, 
    navigate 
  } = useShop();

  const [selectedWeight, setSelectedWeight] = useState<string>(
    product.defaultWeight || product.weightOptions[0].weight
  );
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  const currentOption = product.weightOptions.find((w) => w.weight === selectedWeight) || product.weightOptions[0];
  const discountPercent = Math.round(((currentOption.originalPrice - currentOption.price) / currentOption.originalPrice) * 100);
  const isWishlisted = isInWishlist(product.id);

  const handleCardClick = () => {
    navigate('product-detail', { slug: product.slug });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedWeight, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1200);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product, selectedWeight);
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  if (layout === 'list') {
    return (
      <div 
        onClick={handleCardClick}
        className="bg-white rounded-3xl border border-[#EEDCC6] p-4 sm:p-5 flex flex-col sm:flex-row gap-5 hover:shadow-xl hover:border-[#D97706]/60 transition-all duration-300 cursor-pointer group"
      >
        {/* Product Image */}
        <div className="relative w-full sm:w-52 h-52 rounded-2xl overflow-hidden bg-[#FDF8F3] shrink-0 border border-[#EEDCC6]/60">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
          {product.badge && (
            <span className="absolute top-2.5 left-2.5 bg-[#2D4628] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
              {product.badge}
            </span>
          )}
          <button
            onClick={handleToggleWishlist}
            className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition-colors ${
              isWishlisted ? 'bg-[#D97706] text-white' : 'bg-white/85 text-[#2D4628] hover:text-[#D97706]'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
              <span>{product.origin}</span>
              <span>•</span>
              <span className="font-semibold text-[#2D4628]">{product.grade}</span>
            </div>

            <h3 className="font-serif text-lg font-bold text-[#2D4628] group-hover:text-[#D97706] transition-colors">
              {product.name}
            </h3>
            {product.hindiName && (
              <p className="text-xs text-stone-500 mt-0.5">{product.hindiName}</p>
            )}

            <p className="text-xs text-stone-600 line-clamp-2 mt-2 leading-relaxed">
              {product.description}
            </p>

            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1 bg-[#F5EFE7] px-2.5 py-0.5 rounded-full text-[#2D4628] font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                <span>{product.rating}</span>
              </div>
              <span className="text-xs text-stone-400">({product.reviewCount} reviews)</span>
              {product.isOrganic && (
                <span className="text-[10px] font-bold text-[#2D4628] bg-[#F5EFE7] border border-[#EEDCC6] px-2.5 py-0.5 rounded-full">
                  🌿 100% Organic
                </span>
              )}
            </div>
          </div>

          {/* Bottom weight picker and add to cart */}
          <div className="pt-4 mt-4 border-t border-[#EEDCC6]/60 flex flex-wrap items-center justify-between gap-4">
            <div>
              {/* Weight Selector */}
              <div className="flex flex-wrap gap-1.5 mb-2" onClick={(e) => e.stopPropagation()}>
                {product.weightOptions.map((opt) => (
                  <button
                    key={opt.weight}
                    onClick={() => setSelectedWeight(opt.weight)}
                    className={`px-3 py-1 rounded-full text-[11px] font-bold transition-all ${
                      selectedWeight === opt.weight
                        ? 'bg-[#2D4628] text-white shadow-xs'
                        : 'bg-[#F5EFE7] text-[#2D4628] hover:bg-[#EEDCC6]'
                    }`}
                  >
                    {opt.weight}
                  </button>
                ))}
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-serif text-xl font-bold text-[#2D4628]">
                  {formatPrice(currentOption.price)}
                </span>
                {currentOption.originalPrice > currentOption.price && (
                  <>
                    <span className="text-xs text-stone-400 line-through">
                      {formatPrice(currentOption.originalPrice)}
                    </span>
                    <span className="text-xs font-bold text-[#D97706]">
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handleQuickView}
                className="p-2.5 rounded-full border border-[#EEDCC6] hover:border-[#2D4628] text-[#2D4628] hover:bg-[#F5EFE7] text-xs font-semibold flex items-center gap-1 transition-colors"
                title="Quick View"
              >
                <Eye className="w-4 h-4" />
              </button>

              <button
                onClick={handleAddToCart}
                className={`py-2.5 px-5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm transition-all ${
                  addedAnimation
                    ? 'bg-[#2D4628] text-white'
                    : 'bg-[#D97706] hover:bg-[#B45309] text-white'
                }`}
              >
                {addedAnimation ? (
                  <>
                    <Check className="w-4 h-4" /> Added!
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid layout (Standard E-Commerce Product Card)
  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-3xl border border-[#EEDCC6] overflow-hidden hover:shadow-xl hover:border-[#D97706]/60 transition-all duration-300 flex flex-col justify-between cursor-pointer group relative"
    >
      {/* Top Image Box */}
      <div className="relative aspect-square overflow-hidden bg-[#FDF8F3]">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out" 
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="bg-[#2D4628] text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-md backdrop-blur-xs">
              {product.badge}
            </span>
          )}
          {discountPercent > 10 && (
            <span className="bg-[#D97706] text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-xs">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleToggleWishlist}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all z-10 ${
            isWishlisted 
              ? 'bg-[#D97706] text-white shadow-md' 
              : 'bg-white/80 text-[#2D4628] hover:text-[#D97706] hover:bg-white'
          }`}
          title="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
        </button>

        {/* Quick View Hover Button */}
        <button
          onClick={handleQuickView}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 hover:bg-[#2D4628] hover:text-white text-[#2D4628] px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-xs z-10 translate-y-2 group-hover:translate-y-0 border border-[#EEDCC6]"
        >
          <Eye className="w-3.5 h-3.5" /> Quick View
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Sourcing & Rating */}
          <div className="flex items-center justify-between text-[11px] text-stone-500 mb-1.5">
            <span className="truncate max-w-[140px] font-medium text-[#2D4628]/80">{product.origin.split(',')[0]}</span>
            <div className="flex items-center gap-1 font-bold text-[#D97706] bg-[#F5EFE7] px-2 py-0.5 rounded-full">
              <Star className="w-3 h-3 fill-[#D97706] text-[#D97706]" />
              <span>{product.rating}</span>
            </div>
          </div>

          <h3 className="font-serif font-bold text-sm sm:text-base text-[#2D4628] group-hover:text-[#D97706] transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>
          <p className="text-[11px] text-stone-500 line-clamp-1 mt-0.5">
            {product.tagline}
          </p>

          {/* Weight Selectors (Interactive directly on the card!) */}
          <div className="mt-3.5" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-wrap gap-1">
              {product.weightOptions.map((opt) => (
                <button
                  key={opt.weight}
                  onClick={() => setSelectedWeight(opt.weight)}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold transition-all ${
                    selectedWeight === opt.weight
                      ? 'bg-[#2D4628] text-white shadow-xs'
                      : 'bg-[#F5EFE7] text-[#2D4628] hover:bg-[#EEDCC6]'
                  }`}
                >
                  {opt.weight}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Price & Action */}
        <div className="mt-4 pt-3 border-t border-[#EEDCC6]/60 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif font-extrabold text-base sm:text-lg text-[#2D4628]">
                {formatPrice(currentOption.price)}
              </span>
              {currentOption.originalPrice > currentOption.price && (
                <span className="text-[11px] text-stone-400 line-through">
                  {formatPrice(currentOption.originalPrice)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-stone-400 block -mt-0.5">
              for {selectedWeight}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-9 h-9 rounded-full border border-[#EEDCC6] flex items-center justify-center transition-all shadow-xs active:scale-90 ${
              addedAnimation
                ? 'bg-[#2D4628] text-white'
                : 'bg-white hover:bg-[#D97706] hover:text-white text-[#2D4628]'
            }`}
            title="Add to Cart"
          >
            {addedAnimation ? (
              <Check className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4 font-bold" />
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
