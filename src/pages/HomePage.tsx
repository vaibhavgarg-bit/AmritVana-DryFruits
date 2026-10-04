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
import SEO from "../SEO";

export const HomePage: React.FC = () => {
  return (
      <>
      <SEO
        title="Dry Fruits Online India | Premium Dry Fruits | AmritVana"
        description="Buy premium dry fruits online in India from AmritVana. Explore almonds, cashews, walnuts, pistachios, raisins and dates."
      />

      <div className="space-y-0">
        <HeroBanner />
        <CategoryGrid />
        <BestSellers />
        <FlashDeals />
        <CuratedCombos />
        <CustomMixPromo />
        <WhyChooseUs />
        <NutNutritionQuiz />
        <CustomerReviewsSection />
        <BlogPreview />
      </div>
    </>
  );
};
