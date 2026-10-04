import React, { useState, useEffect } from 'react';
import { 
  Star, 
  Heart, 
  ShoppingBag, 
  Truck, 
  ShieldCheck, 
  Leaf, 
  Wind, 
  Sparkles, 
  Plus, 
  Minus, 
  MapPin, 
  CheckCircle2, 
  Share2
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { PRODUCT_NUTRITION, REVIEWS } from '../data/coupons';
import { ProductCard } from '../components/common/ProductCard';
import { useShop } from '../context/ShopContext';
import { CustomerReview } from '../types';
import SEO from "../SEO";

export const ProductDetailPage: React.FC = () => {
  const { 
    viewParams, 
    navigate, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    formatPrice, 
    showToast,
    setIsCartDrawerOpen,
    selectedDeliveryPincode,
    setDeliveryPincode
  } = useShop();

  const slug = viewParams?.slug;
  const product = PRODUCTS.find((p) => p.slug === slug) || PRODUCTS[0];

  const [selectedWeight, setSelectedWeight] = useState<string>(
    product.defaultWeight || product.weightOptions[0].weight
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'nutrition' | 'sourcing' | 'ayurveda' | 'storage' | 'reviews'>('overview');
  
  // Pincode checker state
  const [pincodeInput, setPincodeInput] = useState<string>(selectedDeliveryPincode || '560038');
  const [pincodeChecked, setPincodeChecked] = useState<boolean>(true);
  const [estimatedDate, setEstimatedDate] = useState<string>('Tomorrow, by 5:00 PM');

  // Review Form state
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [localReviews, setLocalReviews] = useState<CustomerReview[]>(REVIEWS);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSelectedWeight(product.defaultWeight || product.weightOptions[0].weight);
    setQuantity(1);
    setActiveImageIndex(0);
  }, [slug, product]);

  const currentOption = product.weightOptions.find((w) => w.weight === selectedWeight) || product.weightOptions[0];
  const discountPercent = Math.round(((currentOption.originalPrice - currentOption.price) / currentOption.originalPrice) * 100);
  const isWishlisted = isInWishlist(product.id);
  const nutrition = PRODUCT_NUTRITION[product.category] || PRODUCT_NUTRITION['almonds'];
  const relatedProducts = PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4);

  // Dynamic SEO for individual product pages
  const productSEO = {
    title: `${product.name} | Buy Online | AmritVana`,
    description: `Buy ${product.name} online from AmritVana. Explore premium quality ${product.name.toLowerCase()} with fresh packaging, multiple pack sizes and delivery across India.`,
  };

  // Frequently bought bundle
  const bundleItem2 = PRODUCTS.find((p) => p.id === 'cashew-w180-king-jumbo') || PRODUCTS[4];
  const bundleItem3 = PRODUCTS.find((p) => p.id === 'dates-ajwa-al-madinah') || PRODUCTS[11];
  const bundlePrice = currentOption.price + bundleItem2.weightOptions[0].price + bundleItem3.weightOptions[0].price;
  const bundleDiscountedTotal = Math.round(bundlePrice * 0.9); // Extra 10% bundle deal

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincodeInput.length !== 6) {
      showToast('Please enter a valid 6-digit Indian PIN Code', 'warning');
      return;
    }
    setDeliveryPincode(pincodeInput);
    setPincodeChecked(true);
    if (pincodeInput.startsWith('11') || pincodeInput.startsWith('40') || pincodeInput.startsWith('56')) {
      setEstimatedDate('Tomorrow by 4:00 PM (Express Available)');
    } else {
      setEstimatedDate('Within 2-3 Business Days');
    }
    showToast(`Delivery available to PIN ${pincodeInput}!`, 'success');
  };

  const handleAddToCart = () => {
    addToCart(product, selectedWeight, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedWeight, quantity);
    setIsCartDrawerOpen(false);
    navigate('checkout');
  };

  const handleAddBundleToCart = () => {
    addToCart(product, selectedWeight, 1);
    addToCart(bundleItem2, bundleItem2.weightOptions[0].weight, 1);
    addToCart(bundleItem3, bundleItem3.weightOptions[0].weight, 1);
    showToast('3-Piece Imperial Bundle added to cart with 10% Extra Discount!', 'success');
  };

  const handleShareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: `Check out ${product.name} on AmritVana - Fresh, Premium & Naturally Good!`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard!', 'success');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewTitle || !newReviewComment) {
      showToast('Please provide a title and your feedback', 'warning');
      return;
    }

    const createdReview: CustomerReview = {
      id: `rev-${Date.now()}`,
      productId: product.id,
      userName: 'Vaibhav Garg',
      userLocation: 'Bengaluru, India',
      rating: newReviewRating,
      date: 'Just now',
      title: newReviewTitle,
      comment: newReviewComment,
      verifiedPurchase: true,
      helpfulCount: 1,
    };

    setLocalReviews([createdReview, ...localReviews]);
    setNewReviewTitle('');
    setNewReviewComment('');
    setShowReviewForm(false);
    showToast('Thank you! Your verified review has been published ⭐', 'success');
  };

  return (
    <>
    <SEO
      title={productSEO.title}
      description={productSEO.description}
    />
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-stone-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <button onClick={() => navigate('shop')} className="hover:underline">Shop</button>
          <span>/</span>
          <button onClick={() => navigate('category', { categoryId: product.category })} className="hover:underline capitalize">
            {product.category}
          </button>
          <span>/</span>
          <span className="text-[#2D4628] font-bold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Top Main Product Box */}
        <div className="bg-white rounded-[2.5rem] border border-[#EEDCC6] shadow-xl overflow-hidden p-6 sm:p-10 mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Left Column: Gallery (5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative aspect-square rounded-3xl overflow-hidden bg-[#FAF5EE] border border-[#EEDCC6] shadow-xs group">
                <img 
                  src={product.images[activeImageIndex] || product.images[0]} 
                  alt={product.name} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {product.badge && (
                    <span className="bg-[#2D4628] text-white text-xs font-bold px-3 py-1 rounded-full backdrop-blur-xs shadow-md">
                      {product.badge}
                    </span>
                  )}
                  {product.isOrganic && (
                    <span className="bg-[#2D4628]/80 text-[#FDE68A] text-[11px] font-bold px-3 py-0.5 rounded-full shadow-xs">
                      🌿 100% Raw Harvest
                    </span>
                  )}
                </div>

                {/* Share Button */}
                <button
                  onClick={handleShareProduct}
                  className="absolute top-4 right-4 p-2.5 rounded-full bg-white/90 hover:bg-white text-[#2D4628] border border-[#EEDCC6] shadow-md backdrop-blur-xs transition-colors"
                  title="Share Product"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>

              {/* Thumbnail strip */}
              {product.images.length > 1 && (
                <div className="flex gap-3 justify-center">
                  {product.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-18 h-18 rounded-2xl overflow-hidden border-2 transition-all ${
                        activeImageIndex === idx ? 'border-[#2D4628] scale-105 shadow-md' : 'border-[#EEDCC6] opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Angle" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* 3 Quick Assurance Badges */}
              <div className="grid grid-cols-3 gap-2 pt-4 border-t border-[#EEDCC6]/60 text-center">
                <div className="bg-[#FAF5EE] p-2.5 rounded-2xl border border-[#EEDCC6]">
                  <Wind className="w-4 h-4 text-[#2D4628] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-[#2D4628] block">Nitrogen Sealed</span>
                  <span className="text-[9px] text-stone-500">Freshness Lock</span>
                </div>
                <div className="bg-[#FAF5EE] p-2.5 rounded-2xl border border-[#EEDCC6]">
                  <Leaf className="w-4 h-4 text-[#2D4628] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-[#2D4628] block">Zero Additives</span>
                  <span className="text-[9px] text-stone-500">100% Natural</span>
                </div>
                <div className="bg-[#FAF5EE] p-2.5 rounded-2xl border border-[#EEDCC6]">
                  <ShieldCheck className="w-4 h-4 text-[#D97706] mx-auto mb-1" />
                  <span className="text-[10px] font-bold text-[#2D4628] block">Triple Sorted</span>
                  <span className="text-[9px] text-stone-500">Zero Bitterness</span>
                </div>
              </div>
            </div>

            {/* Right Column: Product Core Info & Buying Actions (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#D97706] mb-1.5">
                  <span className="bg-[#F5EFE7] border border-[#EEDCC6] px-2.5 py-0.5 rounded-full">{product.origin}</span>
                  <span>•</span>
                  <span className="text-stone-500 font-mono">{product.grade}</span>
                </div>

                <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2D4628] leading-snug">
                  {product.name}
                </h1>
                {product.hindiName && (
                  <p className="text-sm font-medium text-stone-500 mt-1">{product.hindiName}</p>
                )}

                {/* Rating summary */}
                <div className="flex items-center gap-3 mt-3">
                  <div className="flex items-center gap-1 bg-[#F5EFE7] border border-[#EEDCC6] text-[#2D4628] px-2.5 py-1 rounded-full text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
                    <span>{product.rating}</span>
                  </div>
                  <span className="text-xs text-stone-500 font-medium">
                    ({product.reviewCount} verified reviews)
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-xs text-[#2D4628] font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> In Stock (Dispatched in 24 hrs)
                  </span>
                </div>
              </div>

              {/* Price Calculation Box */}
              <div className="p-4 bg-[#FAF5EE] rounded-2xl border border-[#EEDCC6] space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl sm:text-4xl font-black text-[#2D4628]">
                    {formatPrice(currentOption.price)}
                  </span>
                  {currentOption.originalPrice > currentOption.price && (
                    <>
                      <span className="text-base text-stone-400 line-through">
                        {formatPrice(currentOption.originalPrice)}
                      </span>
                      <span className="text-xs font-bold text-[#D97706] bg-[#D97706]/10 px-2.5 py-0.5 rounded-full">
                        {discountPercent}% OFF
                      </span>
                    </>
                  )}
                </div>
                <div className="flex items-center justify-between text-xs text-stone-500">
                  <span>Inclusive of all taxes & vacuum seal packaging</span>
                  <span className="font-mono font-semibold text-[#2D4628]">
                    SKU: {currentOption.sku}
                  </span>
                </div>
              </div>

              {/* Weight Selector Pills */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#2D4628]">
                    Choose Pack Size / Weight:
                  </label>
                  <span className="text-xs font-semibold text-[#D97706]">
                    Selected: {selectedWeight}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {product.weightOptions.map((opt) => (
                    <button
                      key={opt.weight}
                      onClick={() => setSelectedWeight(opt.weight)}
                      className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex flex-col items-center ${
                        selectedWeight === opt.weight
                          ? 'bg-[#2D4628] text-white ring-2 ring-[#2D4628] shadow-md scale-102'
                          : 'bg-white text-[#2D4628] hover:bg-[#F5EFE7] border border-[#EEDCC6]'
                      }`}
                    >
                      <span className="text-sm font-black">{opt.weight}</span>
                      <span className={`text-[10px] font-medium mt-0.5 ${selectedWeight === opt.weight ? 'text-[#FDE68A]' : 'text-stone-500'}`}>
                        {formatPrice(opt.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & CTA Buttons */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  {/* Quantity Modifier */}
                  <div className="flex items-center border border-[#EEDCC6] rounded-full bg-[#FAF5EE] p-1">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 text-[#2D4628] hover:bg-[#EEDCC6] rounded-full transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 text-sm font-bold text-[#2D4628] min-w-[28px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 text-[#2D4628] hover:bg-[#EEDCC6] rounded-full transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-4 px-6 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-sm font-bold flex items-center justify-center gap-2 shadow-md active:scale-98 transition-all"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add to Cart
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product, selectedWeight)}
                    className={`p-4 rounded-full border transition-all ${
                      isWishlisted 
                        ? 'bg-[#F5EFE7] border-[#D97706] text-[#D97706]' 
                        : 'border-[#EEDCC6] text-stone-600 hover:text-[#D97706] hover:bg-[#F5EFE7]'
                    }`}
                    title="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#D97706]' : ''}`} />
                  </button>
                </div>

                {/* Instant Buy Now Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-6 bg-[#D97706] hover:bg-[#B45309] text-white rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                >
                  ⚡ Buy Now (Express Checkout)
                </button>
              </div>

              {/* Delivery PIN Code Checker */}
              <div className="pt-4 border-t border-[#EEDCC6]">
                <form onSubmit={handleCheckPincode} className="flex gap-2 max-w-sm">
                  <div className="relative flex-1">
                    <MapPin className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input 
                      type="text"
                      maxLength={6}
                      value={pincodeInput}
                      onChange={(e) => setPincodeInput(e.target.value.replace(/\D/g, ''))}
                      placeholder="Enter 6-digit PIN code"
                      className="w-full pl-9 pr-3 py-2 text-xs bg-[#FAF5EE] border border-[#EEDCC6] rounded-full focus:outline-hidden focus:border-[#2D4628] text-[#2D4628]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2D4628] text-white text-xs font-bold rounded-full hover:bg-[#1E331B] transition-colors"
                  >
                    Check
                  </button>
                </form>

                {pincodeChecked && (
                  <p className="text-xs text-[#2D4628] font-semibold mt-2 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-[#2D4628] shrink-0" />
                    <span>Estimated delivery to <strong>{pincodeInput}</strong>: {estimatedDate}</span>
                  </p>
                )}
              </div>

            </div>

          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="bg-white rounded-[2.5rem] border border-[#EEDCC6] shadow-md overflow-hidden p-6 sm:p-10 mb-12">
          {/* Tabs Navigation */}
          <div className="flex border-b border-[#EEDCC6] overflow-x-auto gap-2 sm:gap-6 pb-2 no-scrollbar">
            {[
              { id: 'overview', label: 'Overview & Description' },
              { id: 'nutrition', label: 'Nutrition Facts (per 100g)' },
              { id: 'sourcing', label: 'Origin & Cold Harvest' },
              { id: 'ayurveda', label: 'Ayurvedic Benefits' },
              { id: 'storage', label: 'Storage & Shelf Life' },
              { id: 'reviews', label: `Customer Reviews (${product.reviewCount})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 text-xs sm:text-sm font-bold whitespace-nowrap transition-colors relative ${
                  activeTab === tab.id
                    ? 'text-[#2D4628] border-b-2 border-[#2D4628]'
                    : 'text-stone-500 hover:text-[#2D4628]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="py-6 space-y-6 animate-in fade-in duration-200">
              <div className="space-y-3">
                <h3 className="font-serif text-lg font-bold text-[#2D4628]">Product Description</h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif text-sm font-bold text-[#2D4628]">Key Health & Vitality Benefits:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-2.5 bg-[#FAF5EE] p-3 rounded-2xl border border-[#EEDCC6]">
                      <CheckCircle2 className="w-4 h-4 text-[#2D4628] shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-800 leading-relaxed font-medium">{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 text-xs text-stone-500">
                <strong>Ingredients:</strong> {product.ingredients}
              </div>
            </div>
          )}

          {/* Tab 2: Nutrition */}
          {activeTab === 'nutrition' && (
            <div className="py-6 space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2D4628] mb-1">
                  Nutritional Breakdown (Per 100g Serving)
                </h3>
                <p className="text-xs text-stone-500">
                  Tested and verified by independent accredited food laboratories.
                </p>
              </div>

              <div className="max-w-2xl bg-[#FAF5EE] rounded-2xl border border-[#EEDCC6] overflow-hidden text-xs">
                <div className="p-4 bg-[#2D4628] text-white flex justify-between font-bold">
                  <span>Nutrient Parameter</span>
                  <span>Amount per 100g</span>
                </div>
                <div className="divide-y divide-[#EEDCC6]">
                  <div className="p-3 flex justify-between">
                    <span className="font-bold text-[#2D4628]">Energy / Calories</span>
                    <span className="font-bold text-[#2D4628]">{nutrition.calories} kcal</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="font-semibold text-stone-700">Plant Protein</span>
                    <span className="font-semibold text-[#D97706]">{nutrition.protein}</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="font-semibold text-stone-700">Total Healthy Fats</span>
                    <span className="font-semibold">{nutrition.fat}</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="font-semibold text-stone-700">Dietary Fiber</span>
                    <span className="font-semibold text-[#2D4628]">{nutrition.fiber}</span>
                  </div>
                  <div className="p-3 flex justify-between">
                    <span className="font-semibold text-stone-700">Carbohydrates</span>
                    <span className="font-semibold">{nutrition.carbs}</span>
                  </div>
                  {nutrition.omega3 && (
                    <div className="p-3 flex justify-between bg-[#F5EFE7]">
                      <span className="font-bold text-[#2D4628]">Alpha-Linolenic Acid (Omega-3)</span>
                      <span className="font-bold text-[#2D4628]">{nutrition.omega3}</span>
                    </div>
                  )}
                  {nutrition.magnesium && (
                    <div className="p-3 flex justify-between">
                      <span className="text-stone-600">Magnesium</span>
                      <span>{nutrition.magnesium}</span>
                    </div>
                  )}
                  {nutrition.iron && (
                    <div className="p-3 flex justify-between">
                      <span className="text-stone-600">Bioavailable Iron</span>
                      <span>{nutrition.iron}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Sourcing */}
          {activeTab === 'sourcing' && (
            <div className="py-6 space-y-4 animate-in fade-in duration-200 max-w-3xl">
              <h3 className="font-serif text-lg font-bold text-[#2D4628]">Direct Orchard Origin</h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                <strong>Origin:</strong> {product.origin}
              </p>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                AmritVana partners directly with family-owned heirloom orchards that follow regenerative, non-polluting farming practices. Every crop is harvested at peak maturity, cold-stored at 15°C, and nitrogen-flushed immediately after sorting to prevent oil rancidity.
              </p>
              <div className="bg-[#FAF5EE] p-4 rounded-2xl border border-[#EEDCC6] text-xs text-[#2D4628] space-y-1">
                <strong>Quality Grading:</strong> {product.grade}
                <p className="text-stone-600 mt-1">Zero artificial polishing oils, zero chemical bleach, zero sulfur dioxide.</p>
              </div>
            </div>
          )}

          {/* Tab 4: Ayurveda */}
          {activeTab === 'ayurveda' && (
            <div className="py-6 space-y-4 animate-in fade-in duration-200 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌿</span>
                <h3 className="font-serif text-lg font-bold text-[#2D4628]">Ayurvedic Ritual & Usage</h3>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed bg-[#FAF5EE] p-4 rounded-2xl border border-[#EEDCC6]">
                {product.ayurvedicNote || 'Soak in fresh clay pot or glass bowl overnight. Consume early in the morning on an empty stomach to balance Vata and nourish Dhatus (tissues).'}
              </p>
              <div className="text-xs text-stone-600 space-y-2">
                <p><strong>Ideal Timing:</strong> Dawn or 4:00 PM evening tea accompaniment.</p>
                <p><strong>Dosha Alignment:</strong> Balances Vata & Pitta constitutions when soaked and peeled.</p>
              </div>
            </div>
          )}

          {/* Tab 5: Storage */}
          {activeTab === 'storage' && (
            <div className="py-6 space-y-4 animate-in fade-in duration-200 max-w-3xl">
              <h3 className="font-serif text-lg font-bold text-[#2D4628]">Storage & Shelf Life Instructions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="bg-[#FAF5EE] p-4 rounded-2xl border border-[#EEDCC6]">
                  <span className="font-bold text-[#2D4628] block mb-1">Recommended Storage:</span>
                  <p className="text-stone-600">{product.storageInstructions}</p>
                </div>
                <div className="bg-[#FAF5EE] p-4 rounded-2xl border border-[#EEDCC6]">
                  <span className="font-bold text-[#2D4628] block mb-1">Shelf Life:</span>
                  <p className="text-stone-600">{product.shelfLife}</p>
                </div>
              </div>
            </div>
          )}

          {/* Tab 6: Reviews */}
          {activeTab === 'reviews' && (
            <div className="py-6 space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#EEDCC6]">
                <div>
                  <h3 className="font-serif text-lg font-bold text-[#2D4628]">Customer Feedback</h3>
                  <p className="text-xs text-stone-500">Overall Rating: {product.rating} out of 5 stars</p>
                </div>

                <button
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="px-4 py-2 bg-[#2D4628] text-white rounded-full text-xs font-bold hover:bg-[#1E331B] transition-colors"
                >
                  {showReviewForm ? 'Cancel' : 'Write a Review'}
                </button>
              </div>

              {/* Review Submit Form */}
              {showReviewForm && (
                <form onSubmit={handleAddReview} className="bg-[#FAF5EE] p-5 rounded-2xl border border-[#EEDCC6] space-y-3 max-w-xl">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D4628]">Submit Your Review</h4>
                  <div>
                    <label className="block text-xs font-semibold text-stone-600 mb-1">Your Rating</label>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          type="button"
                          key={star}
                          onClick={() => setNewReviewRating(star)}
                          className="p-1"
                        >
                          <Star className={`w-5 h-5 ${star <= newReviewRating ? 'fill-[#D97706] text-[#D97706]' : 'text-stone-300'}`} />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <input 
                      type="text"
                      placeholder="Headline / Summary (e.g. Crisp & Fresh!)"
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                      className="w-full text-xs p-2.5 bg-white border border-[#EEDCC6] rounded-xl text-[#2D4628]"
                    />
                  </div>
                  <div>
                    <textarea 
                      placeholder="Write your experience with the taste, crunch and packaging..."
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      rows={3}
                      className="w-full text-xs p-2.5 bg-white border border-[#EEDCC6] rounded-xl text-[#2D4628]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#2D4628] text-white rounded-full text-xs font-bold"
                  >
                    Post Review
                  </button>
                </form>
              )}

              {/* Reviews List */}
              <div className="space-y-4">
                {localReviews.slice(0, 3).map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-[#FAF5EE] border border-[#EEDCC6] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < rev.rating ? 'fill-[#D97706] text-[#D97706]' : 'text-stone-300'}`} />
                        ))}
                      </div>
                      <span className="text-[11px] text-stone-400">{rev.date}</span>
                    </div>
                    <h5 className="font-serif font-bold text-xs sm:text-sm text-[#2D4628]">"{rev.title}"</h5>
                    <p className="text-xs text-stone-600">{rev.comment}</p>
                    <div className="flex items-center justify-between pt-2 text-[11px] text-stone-500">
                      <span>{rev.userName} • {rev.userLocation}</span>
                      <span className="text-[#2D4628] font-semibold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#2D4628]" /> Verified Buyer
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Frequently Bought Together Bundle */}
        <div className="bg-[#2D4628] text-white rounded-[2.5rem] p-6 sm:p-8 border border-[#EEDCC6]/30 mb-12 shadow-xl">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-[#FDE68A]" />
            <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
              Frequently Bought Together (Imperial Trio)
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* 3 Bundle Items */}
            <div className="lg:col-span-8 flex flex-wrap sm:flex-nowrap items-center gap-3 sm:gap-4">
              
              {/* Item 1 */}
              <div className="flex items-center gap-2.5 bg-[#1E331B]/80 p-2.5 rounded-2xl border border-[#EEDCC6]/20 flex-1 min-w-[160px]">
                <img src={product.images[0]} alt={product.name} className="w-12 h-12 rounded-xl object-cover bg-white" />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block truncate">{product.name}</span>
                  <span className="text-[11px] text-[#FDE68A]">{formatPrice(currentOption.price)}</span>
                </div>
              </div>

              <span className="text-lg font-bold text-[#FDE68A]">+</span>

              {/* Item 2 */}
              <div className="flex items-center gap-2.5 bg-[#1E331B]/80 p-2.5 rounded-2xl border border-[#EEDCC6]/20 flex-1 min-w-[160px]">
                <img src={bundleItem2.images[0]} alt={bundleItem2.name} className="w-12 h-12 rounded-xl object-cover bg-white" />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block truncate">{bundleItem2.name}</span>
                  <span className="text-[11px] text-[#FDE68A]">{formatPrice(bundleItem2.weightOptions[0].price)}</span>
                </div>
              </div>

              <span className="text-lg font-bold text-[#FDE68A]">+</span>

              {/* Item 3 */}
              <div className="flex items-center gap-2.5 bg-[#1E331B]/80 p-2.5 rounded-2xl border border-[#EEDCC6]/20 flex-1 min-w-[160px]">
                <img src={bundleItem3.images[0]} alt={bundleItem3.name} className="w-12 h-12 rounded-xl object-cover bg-white" />
                <div className="min-w-0">
                  <span className="text-xs font-bold text-white block truncate">{bundleItem3.name}</span>
                  <span className="text-[11px] text-[#FDE68A]">{formatPrice(bundleItem3.weightOptions[0].price)}</span>
                </div>
              </div>

            </div>

            {/* Bundle Price & Add CTA */}
            <div className="lg:col-span-4 bg-[#1E331B]/90 p-4 rounded-2xl border border-[#EEDCC6]/30 text-center sm:text-right space-y-2">
              <div>
                <span className="text-xs text-stone-300 block">Bundle Price (Extra 10% Off)</span>
                <div className="flex items-baseline justify-center sm:justify-end gap-2">
                  <span className="font-serif text-2xl font-black text-[#FDE68A]">
                    {formatPrice(bundleDiscountedTotal)}
                  </span>
                  <span className="text-xs text-stone-400 line-through">
                    {formatPrice(bundlePrice)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleAddBundleToCart}
                className="w-full py-3 bg-[#D97706] hover:bg-[#B45309] text-white rounded-full text-xs font-bold transition-all shadow-md active:scale-95"
              >
                Add All 3 to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-2xl font-bold text-[#2D4628]">
                Related {product.category.replace('-', ' ')}
              </h3>
              <button 
                onClick={() => navigate('category', { categoryId: product.category })}
                className="text-xs font-bold text-[#D97706] hover:underline"
              >
                View Category →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
    </>
  );
};
