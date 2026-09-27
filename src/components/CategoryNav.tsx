import React from 'react';
import { 
  CATEGORIES, 
  catFloralJewelryImg, 
  catLuxuryAccessoriesImg, 
  catGiftPackagingImg,
  emeraldDropImg,
  maangTikkaImg
} from '../data/jewelryData';
import { CategoryId } from '../types/jewelry';

interface CategoryNavProps {
  selectedCategory: CategoryId;
  onSelectCategory: (id: CategoryId) => void;
}

interface FeaturedTile {
  id: CategoryId;
  title: string;
  image: string;
}

const FEATURED_TILES: FeaturedTile[] = [
  {
    id: 'all',
    title: 'New Arrivals',
    image: catFloralJewelryImg,
  },
  {
    id: 'necklaces',
    title: 'Jewelry',
    image: emeraldDropImg,
  },
  {
    id: 'luxury-pret',
    title: 'Accessories',
    image: catLuxuryAccessoriesImg,
  },
  {
    id: 'hair-accessories',
    title: 'Hair Accessories',
    image: maangTikkaImg,
  },
  {
    id: 'gift-boxes',
    title: 'Gift Boxes',
    image: catGiftPackagingImg,
  },
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <section id="categories" className="py-10 sm:py-14 bg-[#FAF8F5] border-b border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 5-Card Visual Category Row (Exact Match to Reference Photo) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6">
          {FEATURED_TILES.map((tile) => {
            const isSelected = selectedCategory === tile.id;

            return (
              <button
                key={tile.title}
                onClick={() => onSelectCategory(tile.id)}
                className="group flex flex-col items-center text-center focus:outline-none cursor-pointer"
              >
                {/* Portrait Editorial Card */}
                <div
                  className={`w-full aspect-[4/5] overflow-hidden bg-[#F3EDE3] rounded-xs transition-all duration-300 ${
                    isSelected
                      ? 'ring-2 ring-[#B89B72] shadow-md'
                      : 'border border-[#EAE3D9] group-hover:border-[#C8B28E] shadow-2xs group-hover:shadow-md'
                  }`}
                >
                  <img
                    src={tile.image}
                    alt={tile.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Centered Serif Title & Delicate Champagne Underline */}
                <span className="mt-3.5 font-serif text-base sm:text-lg text-[#1E1B18] group-hover:text-[#8C7355] transition-colors font-normal tracking-wide">
                  {tile.title}
                </span>
                <span
                  className={`block h-[1.5px] transition-all duration-300 mt-1 ${
                    isSelected
                      ? 'w-12 bg-[#8C7355]'
                      : 'w-7 bg-[#D8C39E] group-hover:w-11 group-hover:bg-[#B89B72]'
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Minimalist Category Filter Strip for All 9 Silhouettes */}
        <div className="mt-10 pt-6 border-t border-[#EFE9E0] flex items-center justify-start sm:justify-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-1">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-2 text-xs tracking-wider uppercase shrink-0 transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#1E1B18] text-[#FAF8F5] font-medium shadow-2xs'
                    : 'bg-[#F3EDE3]/70 hover:bg-[#EAE0D0] text-[#4A433B] font-normal'
                }`}
              >
                <span>{cat.name}</span>
                <span className="ml-1.5 text-[10px] opacity-70">({cat.count})</span>
              </button>
            );
          })}
        </div>

      </div>
    </section>
  );
};
