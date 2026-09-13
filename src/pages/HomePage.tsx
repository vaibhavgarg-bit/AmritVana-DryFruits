import React from 'react';
import { HeroBanner } from '../components/home/HeroBanner';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { BestSellers } from '../components/home/BestSellers';
import { FlashDeals } from '../components/home/FlashDeals';
import { CuratedCombos } from '../components/home/CuratedCombos';
import { CustomMixPromo } from '../components/home/CustomMixPromo';
import { WhyChooseUs } from '../components/home/WhyChooseUs';
import { NutNutritionQuiz } from '../components/home/NutNutritionQuiz';
import { CustomerReviewsSection } from '../components/home/CustomerReviewsSection';
import { BlogPreview } from '../components/home/BlogPreview';

export const HomePage: React.FC = () => {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroBanner />

      {/* 2. Shop by Category */}
      <CategoryGrid />

      {/* 3. Best Sellers with Weight Picker */}
      <BestSellers />

      {/* 4. Limited Harvest Flash Deals & Countdown */}
      <FlashDeals />

      {/* 5. Curated Combos & Gift Hampers */}
      <CuratedCombos />

      {/* 6. Custom Mix Interactive Promo */}
      <CustomMixPromo />

      {/* 7. Why Choose Us (Quality & Sourcing Pillars) */}
      <WhyChooseUs />

      {/* 8. Interactive Ayurvedic Nutrition Quiz */}
      <NutNutritionQuiz />

      {/* 9. Verified Customer Reviews */}
      <CustomerReviewsSection />

      {/* 10. Nutrition Blog & Buying Guides */}
      <BlogPreview />
    </div>
  );
};
