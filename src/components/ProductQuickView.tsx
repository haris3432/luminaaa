import React, { useState } from 'react';
import { X, Star, ShieldCheck, Truck, RotateCcw, Check, ShoppingBag, Heart, Sun, Sparkles } from 'lucide-react';
import { Product } from '../types/jewelry';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number, selectedSize?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!product) return null;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.category === 'rings' || product.category === 'silver-rings'
      ? 'Size 7 (Standard)'
      : 'Standard'
  );
  const [isAdded, setIsAdded] = useState(false);

  const ringSizes = ['Size 6 (16.5mm)', 'Size 7 (Standard 17.3mm)', 'Size 8 (18.1mm)', 'Size 9 (18.9mm)'];

  const handleAdd = () => {
    onAddToCart(product, quantity, selectedSize);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A1916]/75 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FFFDF0] max-w-3xl w-full border-2 border-[#FCD34D] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
          <button
            onClick={() => onToggleWishlist(product)}
            aria-label="Wishlist toggle"
            className="p-2.5 text-[#1A1916] bg-white hover:bg-[#FEF08A] rounded-full border border-[#FDE68A] transition-colors cursor-pointer shadow-sm"
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#DC2626] text-[#DC2626]' : ''}`} />
          </button>
          <button
            onClick={onClose}
            aria-label="Close product view"
            className="p-2.5 text-[#1A1916] bg-white hover:bg-[#FEF08A] rounded-full border border-[#FDE68A] transition-colors cursor-pointer shadow-sm"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image */}
          <div className="relative bg-[#FEF9E7] aspect-[4/3] md:aspect-auto md:h-full overflow-hidden border-b-2 md:border-b-0 md:border-r-2 border-[#FDE68A]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              {product.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] font-bold tracking-wider uppercase bg-[#FEF08A] text-[#1A1916] px-2.5 py-1 border border-[#FCD34D] shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto bg-[#FFFDF5]">
            <div>
              {/* Category & Rating */}
              <div className="flex items-center justify-between text-xs text-[#B45309] mb-2 font-bold">
                <span className="uppercase tracking-widest flex items-center gap-1.5 bg-[#FEF3C7] px-2.5 py-0.5 border border-[#FDE68A]">
                  <Sun className="w-3.5 h-3.5 text-[#D97706]" />
                  {product.category.replace('-', ' ')}
                </span>
                <div className="flex items-center gap-1 bg-[#FEF9E7] px-2 py-0.5 border border-[#FDE68A]">
                  <div className="flex text-[#D97706]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B]" />
                    ))}
                  </div>
                  <span className="text-[#1A1916] font-bold tabular-nums ml-1">
                    {product.rating} ({product.reviewsCount})
                  </span>
                </div>
              </div>

              {/* Title - Bright, bold, crisp */}
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#1A1916] mb-3 leading-snug">
                {product.name}
              </h2>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-4 pb-4 border-b-2 border-[#FDE68A]">
                <span className="font-serif text-2xl sm:text-3xl font-bold text-[#B45309] tabular-nums">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#92400E]/70 line-through tabular-nums font-semibold">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-[#15803D] bg-[#DCFCE7] border border-[#86EFAC] px-2 py-0.5 font-bold ml-auto">
                  In Stock & Ready
                </span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#37332E] leading-relaxed mb-5 font-medium">
                {product.description}
              </p>

              {/* Specs */}
              <div className="space-y-2 mb-6 bg-[#FEF9E7] p-4 border-2 border-[#FDE68A] text-xs">
                <div className="flex justify-between">
                  <span className="text-[#524B40] font-semibold">Material:</span>
                  <span className="font-bold text-[#1A1916] text-right">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#524B40] font-semibold">Finish:</span>
                  <span className="font-bold text-[#1A1916] text-right">{product.finish}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#524B40] font-semibold">Dimensions:</span>
                  <span className="font-bold text-[#1A1916] text-right">{product.dimensions}</span>
                </div>
              </div>

              {/* Sizing for rings */}
              {(product.category === 'rings' || product.category === 'silver-rings') && (
                <div className="mb-5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1916] mb-2">
                    Select Ring Size:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {ringSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`text-xs py-2.5 px-2 text-center border-2 transition-all cursor-pointer font-bold ${
                          selectedSize === size
                            ? 'border-[#1A1916] bg-[#1A1916] text-[#FEF08A]'
                            : 'border-[#FDE68A] bg-white text-[#1A1916] hover:bg-[#FEF08A]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-[#1A1916]">
                  Quantity:
                </span>
                <div className="flex items-center border-2 border-[#FDE68A] bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3.5 py-1.5 text-sm font-bold text-[#1A1916] hover:bg-[#FEF9E7] disabled:opacity-30 cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-extrabold tabular-nums text-[#1A1916]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 py-1.5 text-sm font-bold text-[#1A1916] hover:bg-[#FEF9E7] cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div>
              <button
                onClick={handleAdd}
                className={`w-full py-4 px-6 font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                  isAdded
                    ? 'bg-[#15803D] text-white border-2 border-[#15803D]'
                    : 'bg-[#1A1916] hover:bg-[#2C2C2C] text-[#FFFDF0] border-2 border-[#F59E0B]'
                }`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 text-[#FEF08A]" />
                    <span>Add to Bag — Rs. {(product.price * quantity).toLocaleString()}</span>
                  </>
                )}
              </button>

              {/* Guarantees */}
              <div className="mt-4 pt-4 border-t-2 border-[#FDE68A] grid grid-cols-3 gap-2 text-center text-[11px] text-[#78350F] font-bold">
                <div className="flex flex-col items-center gap-1">
                  <Truck className="w-4 h-4 text-[#B45309]" />
                  <span>2-4 Days Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw className="w-4 h-4 text-[#B45309]" />
                  <span>7-Day Return</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-[#B45309]" />
                  <span>100% Secure</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
