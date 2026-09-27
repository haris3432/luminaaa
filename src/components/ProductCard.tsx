import React, { useState } from 'react';
import { Check, Star, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types/jewelry';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e: React.MouseEvent) => void;
  onAddToCart: (product: Product, e?: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
}) => {
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, e);
    setIsAddedRecently(true);
    setTimeout(() => {
      setIsAddedRecently(false);
    }, 1500);
  };

  const formattedPrice = `Rs. ${product.price.toLocaleString()}`;
  const formattedOriginalPrice = product.originalPrice
    ? `Rs. ${product.originalPrice.toLocaleString()}`
    : null;

  return (
    <article
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-white border border-[#EAE3D9] hover:border-[#C8B28E] rounded-xs transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md cursor-pointer overflow-hidden"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/5] bg-[#F7F4EE] overflow-hidden border-b border-[#F0EAE0]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center transform transition-transform duration-500 ease-out group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Top Single Clean Status Tag (Desktop & Tablet) */}
        <div className="hidden sm:flex absolute top-3 left-3 flex-col gap-1.5 items-start">
          {product.isBestSeller && (
            <span className="text-[10px] uppercase font-medium tracking-widest bg-[#1E1B18] text-[#FAF8F5] px-2.5 py-1">
              Bestseller
            </span>
          )}
          {product.isNew && !product.isBestSeller && (
            <span className="text-[10px] uppercase font-medium tracking-widest bg-[#D8C39E] text-[#1E1B18] px-2.5 py-1">
              New Arrival
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => onToggleWishlist(product, e)}
          aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute top-1.5 right-1.5 sm:top-3 sm:right-3 w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10 cursor-pointer border border-[#EAE3D9] ${
            isWishlisted
              ? 'bg-white text-[#1E1B18]'
              : 'bg-white/90 hover:bg-white text-[#6E6459] hover:text-[#1E1B18]'
          }`}
          title={isWishlisted ? 'Saved to Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-3 h-3 sm:w-4 sm:h-4 stroke-[1.5] ${isWishlisted ? 'fill-[#D8C39E] text-[#1E1B18]' : ''}`} />
        </button>
      </div>

      {/* Soft White Card Body */}
      <div className="p-2 sm:p-5 flex flex-col flex-1 justify-between bg-white">
        <div>
          {/* Category & Rating (Visible on sm+ to keep compact mobile multi-column cards super clean) */}
          <div className="hidden sm:flex items-center justify-between text-[11px] text-[#787066] mb-1.5">
            <span className="uppercase tracking-widest truncate">
              {product.category.replace('-', ' ')}
            </span>
            <div className="flex items-center gap-1 shrink-0">
              <Star className="w-3 h-3 fill-[#C8B28E] text-[#C8B28E]" />
              <span className="text-[#4A433B] tabular-nums">{product.rating}</span>
            </div>
          </div>

          {/* Product Title */}
          <h3 className="font-serif text-[11px] sm:text-lg font-medium text-[#1E1B18] group-hover:text-[#8C7355] transition-colors leading-snug mb-0.5 sm:mb-1 line-clamp-1">
            {product.name}
          </h3>

          {/* Material Snippet */}
          <p className="hidden sm:block text-xs text-[#6E6459] line-clamp-1 mb-3">
            {product.material}
          </p>
        </div>

        {/* Price & Clear Action Buttons */}
        <div className="pt-1.5 sm:pt-3 sm:border-t sm:border-[#F2ECE1] space-y-2 sm:space-y-3">
          <div className="flex items-baseline justify-between gap-1">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif text-[11px] sm:text-lg font-semibold text-[#1E1B18] tabular-nums">
                {formattedPrice}
              </span>
              {formattedOriginalPrice && (
                <span className="hidden sm:inline text-xs text-[#9C9286] line-through tabular-nums">
                  {formattedOriginalPrice}
                </span>
              )}
            </div>
            <span className="hidden md:inline text-[10px] text-[#6E6459] uppercase tracking-wider">
              In Stock
            </span>
          </div>

          {/* Clear Action Button: Add to Cart */}
          <button
            type="button"
            onClick={handleQuickAdd}
            className={`w-full py-1.5 sm:py-2.5 px-2 sm:px-3 text-[9px] sm:text-xs font-medium uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap ${
              isAddedRecently
                ? 'bg-[#2E6F40] text-white'
                : 'bg-[#1E1B18] hover:bg-[#332E29] text-[#FAF8F5]'
            }`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#D8C39E] shrink-0" />
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
