import React, { useState, useMemo } from 'react';
import { 
  Sliders, 
  ShoppingBag, 
  Plus, 
  Minus 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { IMAGES } from '../assets/images';

interface IngredientOption {
  id: string;
  name: string;
  hindi: string;
  icon: string;
  pricePer100g: number;
  proteinPer100g: number;
  caloriesPer100g: number;
  fiberPer100g: number;
  color: string;
}

const INGREDIENTS: IngredientOption[] = [
  { id: 'mamra', name: 'Kashmiri Mamra Almonds', hindi: 'मामरा बादाम', icon: '🥜', pricePer100g: 220, proteinPer100g: 22, caloriesPer100g: 580, fiberPer100g: 12.5, color: '#D97706' },
  { id: 'cashew', name: 'W180 King Jumbo Cashews', hindi: 'काजू', icon: '🌰', pricePer100g: 180, proteinPer100g: 18, caloriesPer100g: 553, fiberPer100g: 3.3, color: '#F59E0B' },
  { id: 'walnut', name: 'Kashmiri Snow-White Walnuts', hindi: 'अखरोट', icon: '🧠', pricePer100g: 190, proteinPer100g: 15, caloriesPer100g: 654, fiberPer100g: 6.7, color: '#92400E' },
  { id: 'pista', name: 'Royal Akbari Pistachios', hindi: 'पिस्ता', icon: '🟢', pricePer100g: 240, proteinPer100g: 20, caloriesPer100g: 562, fiberPer100g: 10.6, color: '#10B981' },
  { id: 'peanuts', name: 'Bharuchi Roasted Peanuts', hindi: 'मूंगफली', icon: '🥜', pricePer100g: 75, proteinPer100g: 26, caloriesPer100g: 567, fiberPer100g: 8.5, color: '#B45309' },
  { id: 'dates', name: 'Madinah Ajwa Dates (Chopped)', hindi: 'अजवा खजूर', icon: '🌴', pricePer100g: 160, proteinPer100g: 2.5, caloriesPer100g: 282, fiberPer100g: 8.0, color: '#451A03' },
  { id: 'cranberries', name: 'Dried Canadian Cranberries', hindi: 'क्रैनबेरी', icon: '🍒', pricePer100g: 120, proteinPer100g: 0.5, caloriesPer100g: 308, fiberPer100g: 5.7, color: '#E11D48' },
  { id: 'figs', name: 'Khandahar Anjeer (Diced)', hindi: 'अंजीर', icon: '🍯', pricePer100g: 175, proteinPer100g: 3.3, caloriesPer100g: 249, fiberPer100g: 9.8, color: '#78350F' },
  { id: 'mango', name: 'Alphonso Dry Mango Slices', hindi: 'सूखा आम', icon: '🥭', pricePer100g: 130, proteinPer100g: 2.5, caloriesPer100g: 320, fiberPer100g: 4.5, color: '#F97316' },
  { id: 'apple', name: 'Kashmiri Dry Apple Rings', hindi: 'सूखा सेब', icon: '🍎', pricePer100g: 115, proteinPer100g: 1.0, caloriesPer100g: 243, fiberPer100g: 8.7, color: '#DC2626' },
  { id: 'kiwi', name: 'Emerald Dry Kiwi Slices', hindi: 'सूखा कीवी', icon: '🥝', pricePer100g: 120, proteinPer100g: 2.0, caloriesPer100g: 310, fiberPer100g: 6.2, color: '#84CC16' },
  { id: 'tuttifrutti', name: 'Tri-Color Tutti Frutti Bits', hindi: 'टूटी फ्रूटी', icon: '🍬', pricePer100g: 60, proteinPer100g: 0.5, caloriesPer100g: 280, fiberPer100g: 2.8, color: '#EC4899' },
  { id: 'pumpkin', name: 'AAA Raw Pumpkin Seeds', hindi: 'कद्दू बीज', icon: '🌱', pricePer100g: 95, proteinPer100g: 30, caloriesPer100g: 559, fiberPer100g: 18.0, color: '#047857' },
  { id: 'chia', name: 'Organic Black Chia Seeds', hindi: 'चिया बीज', icon: '⚫', pricePer100g: 80, proteinPer100g: 17, caloriesPer100g: 486, fiberPer100g: 34.4, color: '#374151' },
  { id: 'flax', name: 'Organic Brown Flax Seeds (Alsi)', hindi: 'अलसी', icon: '🌾', pricePer100g: 55, proteinPer100g: 18, caloriesPer100g: 534, fiberPer100g: 27.3, color: '#7C2D12' },
  { id: 'sunflower', name: 'Jumbo Sunflower Seeds', hindi: 'सूरजमुखी बीज', icon: '🌻', pricePer100g: 70, proteinPer100g: 21, caloriesPer100g: 584, fiberPer100g: 8.6, color: '#EAB308' },
  { id: 'makhana', name: 'Slow-Roasted Foxnuts (Makhana)', hindi: 'मखाना', icon: '⚪', pricePer100g: 110, proteinPer100g: 9.7, caloriesPer100g: 347, fiberPer100g: 14.5, color: '#CA8A04' },
];

export const CustomMixBuilderPage: React.FC = () => {
  const { addToCart, formatPrice, navigate, showToast } = useShop();

  const [jarSize, setJarSize] = useState<number>(500); // 250g, 500g, 1000g
  const [jarLabel, setJarLabel] = useState<string>('My Daily Superfuel Mix');
  const [roastStyle, setRoastStyle] = useState<string>('Himalayan Pink Salt Slow-Roasted');
  
  // Percentage allocation for each ingredient (must sum to 100)
  const [ratios, setRatios] = useState<Record<string, number>>({
    mamra: 30,
    cashew: 25,
    walnut: 20,
    cranberries: 15,
    pumpkin: 10,
  });

  const totalPercentage = (Object.values(ratios) as number[]).reduce((s: number, v: number) => s + (v || 0), 0);

  const handleRatioChange = (id: string, delta: number) => {
    const current = ratios[id] || 0;
    const nextVal = Math.max(0, Math.min(100, current + delta));
    
    if (delta > 0 && totalPercentage + delta > 100) {
      showToast('Total mix ratio cannot exceed 100%! Reduce another ingredient first.', 'warning');
      return;
    }

    setRatios((prev) => {
      const copy = { ...prev };
      if (nextVal === 0) {
        delete copy[id];
      } else {
        copy[id] = nextVal;
      }
      return copy;
    });
  };

  // Calculate live price based on weights and ingredients
  const calculatedPrice = useMemo(() => {
    let priceFor100g = 0;
    Object.entries(ratios).forEach(([id, percent]) => {
      const ing = INGREDIENTS.find((i) => i.id === id);
      const numPercent = Number(percent) || 0;
      if (ing) {
        priceFor100g += (ing.pricePer100g * numPercent) / 100;
      }
    });
    // Add glass jar packaging cost (₹60) + roasting surcharge if roasted
    const baseJarCost = 60;
    const multiplier = jarSize / 100;
    const total = Math.round(priceFor100g * multiplier + baseJarCost);
    return total;
  }, [ratios, jarSize]);

  // Calculated Nutrition per 100g
  const calculatedNutrition = useMemo(() => {
    let calories = 0;
    let protein = 0;
    let fiber = 0;

    Object.entries(ratios).forEach(([id, percent]) => {
      const ing = INGREDIENTS.find((i) => i.id === id);
      const numPercent = Number(percent) || 0;
      if (ing) {
        calories += (ing.caloriesPer100g * numPercent) / 100;
        protein += (ing.proteinPer100g * numPercent) / 100;
        fiber += (ing.fiberPer100g * numPercent) / 100;
      }
    });

    return {
      calories: Math.round(calories),
      protein: protein.toFixed(1),
      fiber: fiber.toFixed(1),
    };
  }, [ratios]);

  const handleAddToCart = () => {
    if (totalPercentage !== 100) {
      showToast(`Please make sure total ingredients equal exactly 100% (Current: ${totalPercentage}%)`, 'warning');
      return;
    }

    const mixIngredientsSummary = Object.entries(ratios)
      .map(([id, pct]) => {
        const item = INGREDIENTS.find((i) => i.id === id);
        return `${pct}% ${item?.name}`;
      })
      .join(', ');

    const customProduct: Product = {
      id: `custom-mix-${Date.now()}`,
      name: `Custom Glass Jar: "${jarLabel}"`,
      hindiName: 'कस्टम ड्राई फ्रूट जार',
      category: 'combos-gifts',
      subCategory: 'Custom Handcrafted Blend',
      slug: `custom-jar-${Date.now()}`,
      description: `Bespoke artisanal mix created by you. Blend: ${mixIngredientsSummary}. Style: ${roastStyle}. Packaged in airtight amber glass jar.`,
      tagline: `Artisanal ${jarSize}g Blend • ${roastStyle}`,
      images: [
        IMAGES.superSeedsMix,
        IMAGES.trailMixKids,
      ],
      badge: 'Bespoke Blend',
      rating: 5.0,
      reviewCount: 1,
      isOrganic: true,
      origin: 'Custom Curated in AmritVana Roastery',
      grade: 'Imperial Custom Grade',
      processing: 'slow-roasted',
      benefits: [
        `Custom blend containing ${calculatedNutrition.protein}g protein & ${calculatedNutrition.fiber}g fiber per 100g`,
        '100% Freshly packed in reusable luxury glass jar with custom label',
      ],
      ingredients: mixIngredientsSummary,
      storageInstructions: 'Store in cool, dry place away from direct sunlight',
      shelfLife: '6 Months from packing',
      weightOptions: [
        {
          weight: `${jarSize}g Glass Jar`,
          price: calculatedPrice,
          originalPrice: Math.round(calculatedPrice * 1.15),
          sku: `CUSTOM-${jarSize}G`,
          stock: 100,
        },
      ],
    };

    addToCart(customProduct, `${jarSize}g Glass Jar`, 1);
    showToast(`"${jarLabel}" (${jarSize}g) added to your shopping cart! 🎉`, 'success');
  };

  return (
    <div className="bg-[#FDF8F3] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-6">
          <button onClick={() => navigate('home')} className="hover:underline">Home</button>
          <span>/</span>
          <span className="text-[#2D4628] font-bold">Custom Mix Lab</span>
        </div>

        {/* Hero Header */}
        <div className="bg-[#2D4628] rounded-[2.5rem] p-6 sm:p-10 text-white shadow-xl border border-[#EEDCC6]/30 mb-8">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#1E331B] text-[#FDE68A] border border-[#EEDCC6]/30 px-3.5 py-1 rounded-full text-xs font-bold">
              <Sliders className="w-3.5 h-3.5 text-[#FDE68A]" />
              <span>THE AMRITVANA BESPOKE ROASTERY</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
              Build Your Own Custom Nut & Berry Jar
            </h1>
            <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
              Design the exact ratio of Kashmiri Mamra, W180 Cashews, Berries, and Seeds. We roast to order, package in a keepsake amber glass jar, and print your custom name label!
            </p>
          </div>
        </div>

        {/* Main 2-Column Builder Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Ingredients Selector (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Jar Size & Custom Label */}
            <div className="bg-white p-6 rounded-[2rem] border border-[#EEDCC6] shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-[#2D4628] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#2D4628] text-white flex items-center justify-center text-xs">1</span>
                <span>Select Jar Size & Personal Label</span>
              </h3>

              <div className="grid grid-cols-3 gap-3">
                {[
                  { size: 250, label: '250g Jar', sub: 'Single / 15 Days' },
                  { size: 500, label: '500g Jar', sub: 'Most Popular / 30 Days' },
                  { size: 1000, label: '1kg Family Jar', sub: 'Family Vitality Pack' },
                ].map((s) => (
                  <button
                    key={s.size}
                    onClick={() => setJarSize(s.size)}
                    className={`p-3 rounded-2xl text-center border transition-all ${
                      jarSize === s.size
                        ? 'bg-[#2D4628] text-white border-[#2D4628] ring-2 ring-[#2D4628] shadow-sm'
                        : 'bg-[#FAF5EE] border-[#EEDCC6] text-[#2D4628] hover:bg-[#F5EFE7]'
                    }`}
                  >
                    <span className="block text-xs sm:text-sm font-bold">{s.label}</span>
                    <span className={`text-[10px] block mt-0.5 ${jarSize === s.size ? 'text-[#FDE68A]' : 'text-stone-500'}`}>{s.sub}</span>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#2D4628] mb-1">
                  Custom Label Text (Printed on Glass Jar):
                </label>
                <input 
                  type="text"
                  value={jarLabel}
                  onChange={(e) => setJarLabel(e.target.value)}
                  maxLength={35}
                  placeholder="e.g. Rahul's Morning Power Fuel"
                  className="w-full p-2.5 bg-[#FAF5EE] border border-[#EEDCC6] rounded-xl text-xs sm:text-sm focus:outline-hidden focus:border-[#2D4628] text-[#2D4628]"
                />
              </div>
            </div>

            {/* Step 2: Roasting & Flavor Style */}
            <div className="bg-white p-6 rounded-[2rem] border border-[#EEDCC6] shadow-xs space-y-4">
              <h3 className="font-serif font-bold text-base text-[#2D4628] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#2D4628] text-white flex items-center justify-center text-xs">2</span>
                <span>Select Roasting & Seasoning Style</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: '100% Raw & Sun-Dried', desc: 'Unroasted, unseasoned for overnight soaking', icon: '🌱' },
                  { id: 'Himalayan Pink Salt Slow-Roasted', desc: 'Lightly roasted with mineral-rich rock salt', icon: '🧂' },
                  { id: 'Royal Shahi Chaat Masala', desc: 'Savory roasted with dry mango & spices', icon: '🌶️' },
                  { id: 'Wild Himalayan Honey Glazed', desc: 'Sweet crunchy roasted with organic honey', icon: '🍯' },
                ].map((style) => (
                  <button
                    key={style.id}
                    onClick={() => setRoastStyle(style.id)}
                    className={`p-3 rounded-2xl text-left border transition-all flex items-center gap-3 ${
                      roastStyle === style.id
                        ? 'bg-[#FAF5EE] border-[#2D4628] ring-1 ring-[#2D4628]'
                        : 'bg-[#FAF5EE]/50 border-[#EEDCC6] hover:bg-[#FAF5EE]'
                    }`}
                  >
                    <span className="text-2xl">{style.icon}</span>
                    <div className="min-w-0">
                      <strong className="block text-xs font-bold text-[#2D4628] truncate">{style.id}</strong>
                      <span className="text-[10px] text-stone-500 line-clamp-1">{style.desc}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Ingredient Percentages */}
            <div className="bg-white p-6 rounded-[2rem] border border-[#EEDCC6] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif font-bold text-base text-[#2D4628] flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-[#2D4628] text-white flex items-center justify-center text-xs">3</span>
                  <span>Allocate Ingredients (Total must equal 100%)</span>
                </h3>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  totalPercentage === 100 ? 'bg-[#2D4628] text-white' : 'bg-[#FAF5EE] border border-[#EEDCC6] text-[#D97706]'
                }`}>
                  Current: {totalPercentage}% / 100%
                </span>
              </div>

              {/* Ingredients list */}
              <div className="space-y-3">
                {INGREDIENTS.map((ing) => {
                  const currentVal = ratios[ing.id] || 0;
                  return (
                    <div 
                      key={ing.id} 
                      className={`p-3 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                        currentVal > 0 ? 'bg-[#FAF5EE] border-[#2D4628]' : 'bg-[#FAF5EE]/40 border-[#EEDCC6]'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <span className="text-2xl shrink-0">{ing.icon}</span>
                        <div className="min-w-0">
                          <div className="flex items-baseline gap-1.5">
                            <span className="text-xs font-bold text-[#2D4628] truncate">{ing.name}</span>
                            <span className="text-[10px] text-stone-400">({ing.hindi})</span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] text-stone-500 mt-0.5">
                            <span>₹{ing.pricePer100g}/100g</span>
                            <span>•</span>
                            <span className="text-[#2D4628] font-semibold">{ing.proteinPer100g}g protein</span>
                          </div>
                        </div>
                      </div>

                      {/* Percentage controller */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleRatioChange(ing.id, -5)}
                          disabled={currentVal === 0}
                          className="w-7 h-7 rounded-full bg-white border border-[#EEDCC6] hover:bg-[#FAF5EE] disabled:opacity-30 flex items-center justify-center text-[#2D4628] font-bold transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="w-10 text-center text-xs font-bold font-mono text-[#2D4628]">
                          {currentVal}%
                        </span>

                        <button
                          onClick={() => handleRatioChange(ing.id, 5)}
                          disabled={totalPercentage >= 100}
                          className="w-7 h-7 rounded-full bg-[#2D4628] hover:bg-[#1E331B] disabled:opacity-30 flex items-center justify-center text-white font-bold transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

          {/* Right Column: Live Jar Preview & Pricing Summary (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Visual Custom Jar Card */}
            <div className="bg-[#2D4628] rounded-[2.5rem] p-6 text-white border border-[#EEDCC6]/30 shadow-2xl space-y-5 sticky top-24">
              
              {/* Jar Visual & Label Simulation */}
              <div className="bg-[#1E331B] rounded-2xl p-6 border border-[#EEDCC6]/30 text-center space-y-3 relative overflow-hidden">
                <div className="w-20 h-20 mx-auto rounded-full bg-[#2D4628] text-[#FDE68A] flex items-center justify-center text-4xl border border-[#EEDCC6]/30 shadow-inner">
                  🏺
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#FDE68A] block">
                    Luxury Amber Glass Jar
                  </span>
                  <h4 className="font-serif font-bold text-lg text-white mt-0.5">
                    "{jarLabel || 'My Custom Blend'}"
                  </h4>
                  <p className="text-xs text-stone-300 font-mono mt-1">
                    {jarSize}g Net Weight • {roastStyle}
                  </p>
                </div>

                {/* Progress Bar of blend ratio */}
                <div className="h-3 rounded-full overflow-hidden flex bg-stone-800 border border-[#EEDCC6]/20">
                  {Object.entries(ratios).map(([id, percent]) => {
                    const ing = INGREDIENTS.find((i) => i.id === id);
                    const numPercent = Number(percent) || 0;
                    if (!ing || numPercent === 0) return null;
                    return (
                      <div
                        key={id}
                        style={{ width: `${numPercent}%`, backgroundColor: ing.color }}
                        title={`${ing.name}: ${numPercent}%`}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Calculated Blend Breakdown */}
              <div className="space-y-2 text-xs">
                <span className="font-bold text-[#FDE68A] uppercase tracking-wider block">
                  Your Blend Recipe:
                </span>
                <div className="bg-[#1E331B]/80 rounded-2xl p-3.5 border border-[#EEDCC6]/20 space-y-1.5 max-h-44 overflow-y-auto">
                  {Object.keys(ratios).length === 0 ? (
                    <p className="text-stone-400 italic text-center py-2">Add ingredients on the left...</p>
                  ) : (
                    Object.entries(ratios).map(([id, percent]) => {
                      const ing = INGREDIENTS.find((i) => i.id === id);
                      const numPercent = Number(percent) || 0;
                      if (!ing || numPercent === 0) return null;
                      const gramAmount = (jarSize * numPercent) / 100;
                      return (
                        <div key={id} className="flex justify-between items-center text-stone-200">
                          <span className="flex items-center gap-1.5">
                            <span>{ing.icon}</span> {ing.name}:
                          </span>
                          <span className="font-mono font-bold text-[#FDE68A]">
                            {numPercent}% ({gramAmount}g)
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Calculated Nutrition */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-[#1E331B] p-2.5 rounded-xl border border-[#EEDCC6]/20">
                  <span className="text-[10px] text-stone-300 block">Calories</span>
                  <span className="font-bold text-[#FDE68A] font-mono">{calculatedNutrition.calories} kcal</span>
                </div>
                <div className="bg-[#1E331B] p-2.5 rounded-xl border border-[#EEDCC6]/20">
                  <span className="text-[10px] text-stone-300 block">Protein</span>
                  <span className="font-bold text-[#FDE68A] font-mono">{calculatedNutrition.protein}g</span>
                </div>
                <div className="bg-[#1E331B] p-2.5 rounded-xl border border-[#EEDCC6]/20">
                  <span className="text-[10px] text-stone-300 block">Fiber</span>
                  <span className="font-bold text-[#FDE68A] font-mono">{calculatedNutrition.fiber}g</span>
                </div>
              </div>

              {/* Live Price & Add to Cart */}
              <div className="pt-4 border-t border-[#EEDCC6]/30 space-y-3">
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="text-xs text-stone-300 block">Custom Crafted Jar Price:</span>
                    <span className="text-[10px] text-[#FDE68A]">Includes nitrogen sealing & custom glass jar</span>
                  </div>
                  <span className="font-serif text-3xl font-black text-white">
                    {formatPrice(calculatedPrice)}
                  </span>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={totalPercentage !== 100}
                  className="w-full py-4 bg-[#D97706] hover:bg-[#B45309] disabled:opacity-40 text-white font-bold rounded-full text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xl transition-all active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    {totalPercentage === 100 ? `Add Custom Jar to Cart (${formatPrice(calculatedPrice)})` : `Allocate 100% (Current: ${totalPercentage}%)`}
                  </span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
