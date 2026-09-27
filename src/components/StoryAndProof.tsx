import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  Sparkles,
  Quote
} from 'lucide-react';
import { REVIEWS, emeraldDropImg, zirconRingImg, velvetBoxImg } from '../data/jewelryData';

export const StoryAndProof: React.FC = () => {
  const [activeReviewIndex, setActiveReviewIndex] = useState(0);

  const nextReview = () => {
    setActiveReviewIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const prevReview = () => {
    setActiveReviewIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  const currentReview = REVIEWS[activeReviewIndex];

  return (
    <section id="story" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* BRAND VALUES TRUST BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 bg-[#F3EDE3] p-6 sm:p-8 border border-[#EAE3D9]">
          
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#8C7355] shrink-0 border border-[#DED5C8]">
              <ShieldCheck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1E1B18] mb-1">
                100% Secure Checkout
              </h3>
              <p className="text-xs text-[#5E564D] leading-relaxed">
                Encrypted bank transfers &amp; verified Raast / JazzCash payment confirmations with instant receipts.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t md:border-t-0 md:border-l border-[#DED5C8] pt-4 md:pt-0 md:pl-6">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#8C7355] shrink-0 border border-[#DED5C8]">
              <Truck className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1E1B18] mb-1">
                Free Shipping Over Rs. 5,000
              </h3>
              <p className="text-xs text-[#5E564D] leading-relaxed">
                Complimentary tracked express courier delivery to all major cities across Pakistan.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t md:border-t-0 md:border-l border-[#DED5C8] pt-4 md:pt-0 md:pl-6">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#8C7355] shrink-0 border border-[#DED5C8]">
              <RotateCcw className="w-6 h-6 stroke-[1.5]" />
            </div>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-normal text-[#1E1B18] mb-1">
                7-Day Return Policy
              </h3>
              <p className="text-xs text-[#5E564D] leading-relaxed">
                Effortless size exchanges &amp; 7-day hassle-free returns on all unworn pieces in original velvet packaging.
              </p>
            </div>
          </div>

        </div>

        {/* BRAND HERITAGE STORY */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
          
          {/* Editorial Collage */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-4 items-center">
            <div className="col-span-7">
              <div className="aspect-[3/4] overflow-hidden border border-[#EAE3D9] bg-[#F3EDE3]">
                <img
                  src={emeraldDropImg}
                  alt="Solaria Handcrafted Emerald Drop Necklace"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="col-span-5 space-y-4">
              <div className="aspect-square overflow-hidden border border-[#EAE3D9] bg-[#F3EDE3]">
                <img
                  src={zirconRingImg}
                  alt="Solaria Zircon Solitaire Ring"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square overflow-hidden border border-[#EAE3D9] bg-[#F3EDE3]">
                <img
                  src={velvetBoxImg}
                  alt="Solaria Velvet Jewelry Box"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* Story Copy */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.25em] text-[#8C7355]">
              <Sparkles className="w-3.5 h-3.5 text-[#B89B72]" />
              <span>The Solaria Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1E1B18] font-normal leading-[1.15] tracking-tight">
              Designed for quiet luxury &amp; timeless everyday radiance.
            </h2>

            <p className="text-sm sm:text-base text-[#4A433B] leading-relaxed">
              Born in our Lahore studio, Solaria Jewelry bridges heritage South Asian craftsmanship with minimalist contemporary silhouettes. Every piece is cast in recycled 925 sterling silver and finished with heavy 2.5-micron 18K gold vermeil.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#EAE3D9]">
              <div>
                <span className="font-serif text-2xl text-[#1E1B18] block">2.5 Micron</span>
                <span className="text-xs text-[#6E6459]">18K Gold Vermeil</span>
              </div>
              <div>
                <span className="font-serif text-2xl text-[#1E1B18] block">100%</span>
                <span className="text-xs text-[#6E6459]">Hypoallergenic Nickel-Free</span>
              </div>
              <div>
                <span className="font-serif text-2xl text-[#1E1B18] block">Handpicked</span>
                <span className="text-xs text-[#6E6459]">Freshwater Pearls &amp; Stones</span>
              </div>
            </div>
          </div>

        </div>

        {/* CUSTOMER REVIEWS CAROUSEL */}
        <div id="reviews" className="pt-8 border-t border-[#EAE3D9]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7355] block mb-1.5">
                Client Reflections
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal tracking-tight">
                Loved Across Pakistan
              </h2>
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                aria-label="Previous customer review"
                className="w-10 h-10 bg-white border border-[#DED5C8] hover:border-[#1E1B18] flex items-center justify-center text-[#1E1B18] transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextReview}
                aria-label="Next customer review"
                className="w-10 h-10 bg-white border border-[#DED5C8] hover:border-[#1E1B18] flex items-center justify-center text-[#1E1B18] transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Active Featured Carousel Card + Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            
            {/* Featured Active Review Spotlight */}
            <div className="lg:col-span-7 bg-white border border-[#EAE3D9] p-6 sm:p-10 flex flex-col justify-between relative">
              <Quote className="w-10 h-10 text-[#EAE0D0] absolute top-6 right-6 pointer-events-none" />
              
              <div>
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(currentReview.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-[#C8B28E] text-[#C8B28E]" />
                  ))}
                </div>

                <p className="font-serif text-xl sm:text-2xl text-[#1E1B18] leading-relaxed italic mb-6">
                  "{currentReview.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#F2ECE1] flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-lg text-[#1E1B18] font-medium">
                      {currentReview.author}
                    </span>
                    <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider text-[#6E6459] bg-[#F3EDE3] px-2 py-0.5">
                      <CheckCircle className="w-3 h-3 text-[#8C7355]" /> Verified Buyer
                    </span>
                  </div>
                  <span className="text-xs text-[#787066] block mt-0.5">
                    {currentReview.city} · Purchased <strong className="font-normal text-[#1E1B18]">{currentReview.productName}</strong>
                  </span>
                </div>
                <span className="text-xs text-[#9C9286]">{currentReview.date}</span>
              </div>
            </div>

            {/* Side Mini Review List */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-3">
              {REVIEWS.map((rev, index) => {
                const isActive = index === activeReviewIndex;
                return (
                  <button
                    key={rev.id}
                    onClick={() => setActiveReviewIndex(index)}
                    className={`w-full text-left p-4 border transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#F3EDE3] border-[#C8B28E]'
                        : 'bg-white border-[#EAE3D9] hover:border-[#DED5C8]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-serif text-base text-[#1E1B18] font-medium">
                        {rev.author} <span className="text-xs font-sans text-[#787066]">({rev.city})</span>
                      </span>
                      <div className="flex items-center gap-0.5">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#C8B28E] text-[#C8B28E]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[#5E564D] line-clamp-1">
                      "{rev.comment}"
                    </p>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
