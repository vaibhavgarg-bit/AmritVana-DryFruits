import React from 'react';
import { Star, CheckCircle, ThumbsUp } from 'lucide-react';
import { REVIEWS } from '../../data/coupons';

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section className="py-20 bg-[#FAF5EE] border-b border-[#EEDCC6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 bg-[#F5EFE7] border border-[#EEDCC6] text-[#2D4628] px-3.5 py-1 rounded-full text-xs font-bold mb-3">
            <Star className="w-3.5 h-3.5 fill-[#D97706] text-[#D97706]" />
            <span>REAL STORIES FROM VERIFIED PATRONS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D4628]">
            Trusted by 50,000+ Families Across India
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2">
            Read what our patrons say about the aroma, oiliness, crunch, and authentic purity of AmritVana dry fruits.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div 
              key={rev.id}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-[#EEDCC6] hover:border-[#D97706]/60 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Rating & Verified Tag */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < rev.rating ? 'fill-[#D97706] text-[#D97706]' : 'text-stone-300'}`} 
                      />
                    ))}
                  </div>

                  {rev.verifiedPurchase && (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#2D4628] bg-[#F5EFE7] px-2.5 py-0.5 rounded-full border border-[#EEDCC6]">
                      <CheckCircle className="w-3 h-3 text-[#2D4628]" /> Verified Buyer
                    </span>
                  )}
                </div>

                {/* Title */}
                <h4 className="font-serif font-bold text-[#2D4628] text-sm sm:text-base leading-snug mb-2">
                  "{rev.title}"
                </h4>

                {/* Comment */}
                <p className="text-xs text-stone-600 leading-relaxed">
                  {rev.comment}
                </p>
              </div>

              {/* Author & Helpful count */}
              <div className="pt-4 mt-4 border-t border-[#EEDCC6]/50 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold text-[#2D4628] block">{rev.userName}</span>
                  <span className="text-[11px] text-stone-400">{rev.userLocation} • {rev.date}</span>
                </div>

                <div className="flex items-center gap-1 text-[11px] text-stone-500 bg-[#F5EFE7] px-2.5 py-1 rounded-full border border-[#EEDCC6]">
                  <ThumbsUp className="w-3 h-3 text-[#D97706]" />
                  <span>{rev.helpfulCount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
