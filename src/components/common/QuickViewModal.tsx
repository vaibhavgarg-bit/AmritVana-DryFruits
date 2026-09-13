import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Heart, 
  Check, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { PRODUCT_NUTRITION } from '../../data/coupons';

export const QuickViewModal: React.FC = () => {
  const { 
    quickViewProduct, 
    closeQuickView, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatPrice,
    navigate,
    setIsCartDrawerOpen
  } = useShop();

  const product = quickViewProduct;
  const [selectedWeight, setSelectedWeight] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  useEffect(() => {
    if (product) {
      setSelectedWeight(product.defaultWeight || product.weightOptions[0].weight);
      setQuantity(1);
      setActiveImageIndex(0);
    }
  }, [product]);

  if (!product) return null;

  const currentOption = product.weightOptions.find((w) => w.weight === selectedWeight) || product.weightOptions[0];
  const discountPercent = Math.round(((currentOption.originalPrice - currentOption.price) / currentOption.originalPrice) * 100);
  const isWishlisted = isInWishlist(product.id);
  const nutrition = PRODUCT_NUTRITION[product.category] || PRODUCT_NUTRITION['almonds'];

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, quantity);
    closeQuickView();
    setIsCartDrawerOpen(false);
    navigate('checkout');
  };

  const handleViewFullDetails = () => {
    closeQuickView();
    navigate('product-detail', { slug: product.slug });
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#1E331B]/65 backdrop-blur-xs transition-opacity duration-300"
        onClick={closeQuickView}
      />

      <div className="relative w-full max-w-4xl bg-[#FDF8F3] rounded-[2.5rem] shadow-2xl overflow-hidden border border-[#EEDCC6] z-10 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-[#2D4628] bg-white hover:bg-[#F5EFE7] rounded-full border border-[#EEDCC6] transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Image Gallery */}
          <div className="p-6 sm:p-8 bg-[#FAF5EE] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#EEDCC6]">
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-white border border-[#EEDCC6] shadow-sm">
                <img 
                  src={product.images[activeImageIndex] || product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-all duration-300"
                />
                {product.badge && (
                  <span className="absolute top-3 left-3 bg-[#2D4628] text-white text-[11px] font-bold px-3 py-1 rounded-full shadow-md">
                    {product.badge}
                  </span>
                )}
                {product.isOrganic && (
                  <span className="absolute top-3 right-3 bg-[#2D4628]/80 text-[#FDE68A] text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                    100% Raw
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {product.images.length > 1 && (
                <div className="flex gap-2 justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-[#2D4628] scale-105 shadow-sm' : 'border-[#EEDCC6] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick Nutrition Pill */}
            <div className="mt-4 pt-4 border-t border-[#EEDCC6] grid grid-cols-3 gap-2 text-center text-xs">
              <div className="bg-white p-2 rounded-xl border border-[#EEDCC6]">
                <span className="text-[10px] text-stone-500 block uppercase font-medium">Calories</span>
                <span className="font-bold text-[#2D4628]">{nutrition.calories} kcal</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-[#EEDCC6]">
                <span className="text-[10px] text-stone-500 block uppercase font-medium">Protein</span>
                <span className="font-bold text-[#D97706]">{nutrition.protein}</span>
              </div>
              <div className="bg-white p-2 rounded-xl border border-[#EEDCC6]">
                <span className="text-[10px] text-stone-500 block uppercase font-medium">Fiber</span>
                <span className="font-bold text-[#2D4628]">{nutrition.fiber}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Info & Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#D97706] font-semibold mb-1">
                <span>{product.origin}</span>
                <span>•</span>
                <span>{product.grade}</span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#2D4628] leading-snug">
                {product.name}
              </h2>
              {product.hindiName && (
                <p className="text-xs text-stone-500 mt-0.5">{product.hindiName}</p>
              )}

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 bg-[#F5EFE7] px-2.5 py-0.5 rounded-full text-[#2D4628] font-bold text-xs border border-[#EEDCC6]">
                  <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                  <span>{product.rating}</span>
                </div>
                <span className="text-xs text-stone-500 font-medium">
                  ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Pricing Display */}
              <div className="flex items-baseline gap-2.5 mt-4">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2D4628]">
                  {formatPrice(currentOption.price)}
                </span>
                {currentOption.originalPrice > currentOption.price && (
                  <>
                    <span className="text-stone-400 line-through text-sm">
                      {formatPrice(currentOption.originalPrice)}
                    </span>
                    <span className="bg-[#D97706]/10 text-[#D97706] font-bold text-xs px-2 py-0.5 rounded-md">
                      {discountPercent}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Weight Selector */}
              <div className="mt-5 space-y-2">
                <span className="text-xs font-bold text-[#2D4628] uppercase tracking-wider block">
                  Select Weight Pack:
                </span>
                <div className="flex flex-wrap gap-2">
                  {product.weightOptions.map((opt) => (
                    <button
                      key={opt.weight}
                      onClick={() => setSelectedWeight(opt.weight)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        selectedWeight === opt.weight
                          ? 'bg-[#2D4628] text-white shadow-xs'
                          : 'bg-white border border-[#EEDCC6] text-[#2D4628] hover:bg-[#F5EFE7]'
                      }`}
                    >
                      {opt.weight} - {formatPrice(opt.price)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3 pt-4 border-t border-[#EEDCC6]">
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={handleAddToCart}
                  className="py-3 bg-[#2D4628] hover:bg-[#1E331B] text-white font-bold rounded-full text-xs flex items-center justify-center gap-2 shadow-sm transition-all active:scale-95"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-3 bg-[#D97706] hover:bg-[#B45309] text-white font-bold rounded-full text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95"
                >
                  Buy Now
                </button>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex items-center gap-1.5 font-semibold transition-colors ${
                    isWishlisted ? 'text-[#D97706]' : 'text-stone-600 hover:text-[#2D4628]'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#D97706]' : ''}`} />
                  {isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}
                </button>

                <button
                  onClick={handleViewFullDetails}
                  className="font-bold text-[#2D4628] hover:text-[#D97706] flex items-center gap-1"
                >
                  Full Product Page <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
