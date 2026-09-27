import React from 'react';
import { heroDiscoverStyleImg } from '../data/jewelryData';

interface HeroProps {
  onExploreClick: () => void;
  onStoryClick?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <section className="relative w-full bg-[#EFE9DF] overflow-hidden border-b border-[#E6DEC8]">
      <div className="max-w-7xl mx-auto">
        <div className="relative min-h-[360px] sm:min-h-[460px] lg:min-h-[540px] flex items-center">
          
          {/* Background Editorial Portrait Image matching the reference composition */}
          <div className="absolute inset-0 z-0">
            <img
              src={heroDiscoverStyleImg}
              alt="Solaria Luxury Prêt, Fine Jewelry & Accessories"
              className="w-full h-full object-cover object-right sm:object-center"
              referrerPolicy="no-referrer"
              loading="eager"
            />
            {/* Soft left-side gradient blend so text is effortlessly legible and serene */}
            <div 
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-[#F3EDE3] via-[#F3EDE3]/85 sm:via-[#F3EDE3]/55 to-transparent"
            />
          </div>

          {/* Left Editorial Typography & CTA (Exact Reference Layout) */}
          <div className="relative z-10 w-full px-6 sm:px-12 lg:px-16 py-12 sm:py-16 max-w-xl">
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[62px] font-normal text-[#1E1B18] leading-[1.08] tracking-tight mb-4">
              Discover Your
              <span className="block mt-1">Style</span>
            </h1>

            <p className="text-sm sm:text-base lg:text-[17px] text-[#3D3730] font-normal tracking-wide mb-8">
              Luxury Prêt, Fine Jewelry &amp; Accessories
            </p>

            <button
              onClick={onExploreClick}
              className="px-8 sm:px-10 py-3 sm:py-3.5 bg-[#D8C39E] hover:bg-[#C8B089] text-[#1E1B18] text-xs sm:text-sm font-medium tracking-wider transition-all duration-200 shadow-2xs hover:shadow-sm cursor-pointer"
            >
              Shop Now
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};
