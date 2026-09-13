import React, { useState } from 'react';
import { Sparkles, Check, ArrowRight, RefreshCw, ShoppingBag } from 'lucide-react';
import { PRODUCTS } from '../../data/products';
import { Product } from '../../types';
import { useShop } from '../../context/ShopContext';

export const NutNutritionQuiz: React.FC = () => {
  const { addToCart, formatPrice, navigate } = useShop();

  const [step, setStep] = useState(1);
  const [answers, setAnswers] = useState({
    goal: '',
    whoFor: '',
    preference: '',
  });
  const [resultProduct, setResultProduct] = useState<Product | null>(null);

  const handleSelectOption = (key: 'goal' | 'whoFor' | 'preference', value: string) => {
    const updated = { ...answers, [key]: value };
    setAnswers(updated);

    if (step < 3) {
      setStep(step + 1);
    } else {
      calculateResult(updated);
      setStep(4);
    }
  };

  const calculateResult = (finalAnswers: typeof answers) => {
    if (finalAnswers.goal === 'brain') {
      setResultProduct(PRODUCTS.find((p) => p.id === 'almond-mamra-kashmiri') || PRODUCTS[0]);
    } else if (finalAnswers.goal === 'heart') {
      setResultProduct(PRODUCTS.find((p) => p.id === 'walnut-kashmiri-snow-white-halves') || PRODUCTS[4]);
    } else if (finalAnswers.goal === 'energy') {
      setResultProduct(PRODUCTS.find((p) => p.id === 'dates-ajwa-al-madinah') || PRODUCTS[11]);
    } else if (finalAnswers.whoFor === 'family') {
      setResultProduct(PRODUCTS.find((p) => p.id === 'combo-daily-nutrition-30-day-pack') || PRODUCTS[17]);
    } else {
      setResultProduct(PRODUCTS.find((p) => p.id === 'combo-royal-5-in-1-treasure') || PRODUCTS[16]);
    }
  };

  const handleReset = () => {
    setStep(1);
    setAnswers({ goal: '', whoFor: '', preference: '' });
    setResultProduct(null);
  };

  return (
    <section className="py-16 bg-[#FDF8F3] border-b border-[#EEDCC6]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 shadow-xl border border-[#EEDCC6] text-center relative overflow-hidden">
          
          <div className="inline-flex items-center gap-1.5 bg-[#F5EFE7] border border-[#EEDCC6] text-[#2D4628] px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            <span>PERSONALIZED NUT SELECTOR</span>
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D4628]">
            Find Your Ideal Daily Nutrition Match
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 max-w-lg mx-auto mt-1 mb-8">
            Answer 3 quick questions to discover which cold-harvested dry fruits align best with your wellness goals.
          </p>

          {/* Step 1: Health Goal */}
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                Step 1 of 3: What is your primary wellness goal?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto pt-2">
                <button
                  onClick={() => handleSelectOption('goal', 'brain')}
                  className="p-4 rounded-2xl border border-[#EEDCC6] hover:border-[#2D4628] hover:bg-[#F5EFE7] flex items-center gap-3 text-left transition-all group"
                >
                  <span className="text-2xl">🧠</span>
                  <div>
                    <strong className="block text-xs sm:text-sm text-[#2D4628] group-hover:text-[#D97706] font-bold">Sharper Memory & Focus</strong>
                    <span className="text-[11px] text-stone-500">For students, office work & active recall</span>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectOption('goal', 'heart')}
                  className="p-4 rounded-2xl border border-[#EEDCC6] hover:border-[#2D4628] hover:bg-[#F5EFE7] flex items-center gap-3 text-left transition-all group"
                >
                  <span className="text-2xl">🫀</span>
                  <div>
                    <strong className="block text-xs sm:text-sm text-[#2D4628] group-hover:text-[#D97706] font-bold">Heart & Cholesterol Support</strong>
                    <span className="text-[11px] text-stone-500">Rich in plant Omega-3 ALA & healthy fats</span>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectOption('goal', 'energy')}
                  className="p-4 rounded-2xl border border-[#EEDCC6] hover:border-[#2D4628] hover:bg-[#F5EFE7] flex items-center gap-3 text-left transition-all group"
                >
                  <span className="text-2xl">⚡</span>
                  <div>
                    <strong className="block text-xs sm:text-sm text-[#2D4628] group-hover:text-[#D97706] font-bold">Stamina & Vital Energy</strong>
                    <span className="text-[11px] text-stone-500">Natural energy & workout recovery</span>
                  </div>
                </button>

                <button
                  onClick={() => handleSelectOption('goal', 'immunity')}
                  className="p-4 rounded-2xl border border-[#EEDCC6] hover:border-[#2D4628] hover:bg-[#F5EFE7] flex items-center gap-3 text-left transition-all group"
                >
                  <span className="text-2xl">🌿</span>
                  <div>
                    <strong className="block text-xs sm:text-sm text-[#2D4628] group-hover:text-[#D97706] font-bold">Digestive & Skin Glow</strong>
                    <span className="text-[11px] text-stone-500">Vitamin E, soluble fiber & antioxidants</span>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Who is this for? */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                Step 2 of 3: Who are you purchasing for?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto pt-2">
                <button
                  onClick={() => handleSelectOption('whoFor', 'myself')}
                  className="p-4 rounded-2xl border border-[#EEDCC6] hover:border-[#2D4628] hover:bg-[#F5EFE7] flex flex-col items-center text-center transition-all group"
                >
                  <span className="text-3xl mb-2">👤</span>
                  <strong className="text-xs font-bold text-[#2D4628] group-hover:text-[#D97706]">Just for Myself</strong>
                  <span className="text-[10px] text-stone-500 mt-1">Daily morning routine</span>
                </button>

                <button
                  onClick={() => handleSelectOption('whoFor', 'family')}
                  className="p-4 rounded-2xl border border-[#EEDCC6] hover:border-[#2D4628] hover:bg-[#F5EFE7] flex flex-col items-center text-center transition-all group"
                >
                  <span className="text-3xl mb-2">👨‍👩‍👧‍👦</span>
                  <strong className="text-xs font-bold text-[#2D4628] group-hover:text-[#D97706]">Whole Family</strong>
                  <span className="text-[10px] text-stone-500 mt-1">Kids, parents & seniors</span>
                </button>

                <button
                  onClick={() => handleSelectOption('whoFor', 'gifting')}
                  className="p-4 rounded-2xl border border-[#EEDCC6] hover:border-[#2D4628] hover:bg-[#F5EFE7] flex flex-col items-center text-center transition-all group"
                >
                  <span className="text-3xl mb-2">🎁</span>
                  <strong className="text-xs font-bold text-[#2D4628] group-hover:text-[#D97706]">Festive / VIP Gift</strong>
                  <span className="text-[10px] text-stone-500 mt-1">Keepsake wooden chest</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Roasting & Taste Preference */}
          {step === 3 && (
            <div className="space-y-4 animate-in fade-in duration-300">
              <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                Step 3 of 3: How do you prefer your dry fruits?
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto pt-2">
                <button
                  onClick={() => handleSelectOption('preference', 'raw')}
                  className="p-4 rounded-2xl border border-[#EEDCC6] hover:border-[#2D4628] hover:bg-[#F5EFE7] flex flex-col items-center text-center transition-all group"
                >
                  <span className="text-3xl mb-2">🌱</span>
                  <strong className="text-xs font-bold text-[#2D4628] group-hover:text-[#D97706]">100% Raw & Soaking</strong>
                  <span className="text-[10px] text-stone-500 mt-1">Unprocessed for traditional intake</span>
                </button>

                <button
                  onClick={() => handleSelectOption('preference', 'roasted')}
                  className="p-4 rounded-2xl border border-[#EEDCC6] hover:border-[#2D4628] hover:bg-[#F5EFE7] flex flex-col items-center text-center transition-all group"
                >
                  <span className="text-3xl mb-2">🔥</span>
                  <strong className="text-xs font-bold text-[#2D4628] group-hover:text-[#D97706]">Slow Roasted (Pink Salt)</strong>
                  <span className="text-[10px] text-stone-500 mt-1">Crunchy gourmet snacking</span>
                </button>

                <button
                  onClick={() => handleSelectOption('preference', 'mix')}
                  className="p-4 rounded-2xl border border-[#EEDCC6] hover:border-[#2D4628] hover:bg-[#F5EFE7] flex flex-col items-center text-center transition-all group"
                >
                  <span className="text-3xl mb-2">🍯</span>
                  <strong className="text-xs font-bold text-[#2D4628] group-hover:text-[#D97706]">Sweet & Nutty Mix</strong>
                  <span className="text-[10px] text-stone-500 mt-1">Dates, figs, berries & nuts</span>
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Result Box */}
          {step === 4 && resultProduct && (
            <div className="animate-in zoom-in-95 duration-300 max-w-lg mx-auto bg-[#FDF8F3] p-6 rounded-3xl border border-[#EEDCC6] text-left">
              <div className="flex items-center justify-between pb-3 border-b border-[#EEDCC6]">
                <span className="text-xs font-bold text-[#2D4628] flex items-center gap-1">
                  <Check className="w-4 h-4 text-[#2D4628]" /> Perfect Harvest Match!
                </span>
                <button
                  onClick={handleReset}
                  className="text-xs text-stone-500 hover:text-[#2D4628] flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Retake
                </button>
              </div>

              <div className="flex gap-4 mt-4 items-center">
                <img 
                  src={resultProduct.images[0]} 
                  alt={resultProduct.name} 
                  className="w-20 h-20 rounded-2xl object-cover border border-[#EEDCC6] shrink-0 bg-white" 
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#2D4628] bg-[#F5EFE7] px-2 py-0.5 rounded-full border border-[#EEDCC6]">
                    {resultProduct.grade}
                  </span>
                  <h4 className="font-serif font-bold text-[#2D4628] text-base mt-1">
                    {resultProduct.name}
                  </h4>
                  <p className="text-xs text-stone-600 mt-0.5 line-clamp-1">
                    {resultProduct.tagline}
                  </p>
                  <div className="mt-1 font-serif font-bold text-base text-[#2D4628]">
                    {formatPrice(resultProduct.weightOptions[0].price)} ({resultProduct.weightOptions[0].weight})
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#EEDCC6] grid grid-cols-2 gap-2">
                <button
                  onClick={() => addToCart(resultProduct, resultProduct.weightOptions[0].weight, 1)}
                  className="py-2.5 px-3 bg-[#2D4628] hover:bg-[#1E331B] text-white rounded-full text-xs font-bold text-center flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
                </button>
                <button
                  onClick={() => navigate('product-detail', { slug: resultProduct.slug })}
                  className="py-2.5 px-3 border border-[#EEDCC6] hover:border-[#2D4628] bg-white text-[#2D4628] rounded-full text-xs font-bold text-center flex items-center justify-center gap-1"
                >
                  View Details <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </section>
  );
};
