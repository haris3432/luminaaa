import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { Product } from '../types/jewelry';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlist: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onMoveToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlist,
  onRemoveFromWishlist,
  onMoveToCart,
  onQuickView,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#1A1916]/65 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFFDF0] shadow-2xl border-l-2 border-[#FDE68A] flex flex-col">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b-2 border-[#FDE68A] flex items-center justify-between bg-[#FEF9E7]">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#FEF08A] flex items-center justify-center border border-[#FCD34D]">
                <Heart className="w-4 h-4 text-[#DC2626] fill-[#DC2626]" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1916]">
                Saved Pieces ({wishlist.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close wishlist"
              className="p-2 text-[#78350F] hover:text-[#1A1916] rounded-full hover:bg-[#FEF08A] transition-colors cursor-pointer border border-[#FDE68A]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {wishlist.length === 0 ? (
              <div className="py-20 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#FEF3C7] border-2 border-[#FCD34D] flex items-center justify-center text-[#D97706] mb-4">
                  <Heart className="w-8 h-8 stroke-1.5" />
                </div>
                <h3 className="font-serif text-2xl text-[#1A1916] font-bold mb-1">Your wishlist is empty</h3>
                <p className="text-xs text-[#524B40] max-w-xs mb-6 font-medium">
                  Tap the heart icon on any jewelry piece to save it for later.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#1A1916] hover:bg-[#2C2C2C] text-[#FFFDF0] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-[#F59E0B]"
                >
                  Browse Catalog
                </button>
              </div>
            ) : (
              <div className="divide-y-2 divide-[#FDE68A]">
                {wishlist.map((product) => (
                  <div key={product.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      onClick={() => {
                        onQuickView(product);
                        onClose();
                      }}
                      className="w-20 h-20 sm:w-22 sm:h-22 object-cover border-2 border-[#FDE68A] bg-[#FEF9E7] shadow-2xs shrink-0 cursor-pointer"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 
                            onClick={() => {
                              onQuickView(product);
                              onClose();
                            }}
                            className="font-serif text-base font-bold text-[#1A1916] hover:text-[#B45309] leading-snug cursor-pointer"
                          >
                            {product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveFromWishlist(product.id)}
                            aria-label={`Remove ${product.name} from wishlist`}
                            className="text-[#92400E] hover:text-[#DC2626] p-1 cursor-pointer transition-colors"
                            title="Remove"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[11px] text-[#78350F] font-semibold block mt-0.5">
                          {product.category.replace('-', ' ')}
                        </span>
                        <span className="font-serif font-bold text-base text-[#B45309] block mt-1 tabular-nums">
                          Rs. {product.price.toLocaleString()}
                        </span>
                      </div>

                      <div className="pt-2 flex items-center gap-2">
                        <button
                          onClick={() => {
                            onMoveToCart(product);
                            onClose();
                          }}
                          className="flex-1 py-2 px-3 bg-[#1A1916] hover:bg-[#2C2C2C] text-[#FFFDF0] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-[#F59E0B]"
                        >
                          <ShoppingBag className="w-3.5 h-3.5 text-[#FEF08A]" />
                          <span>Move to Bag</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-4 bg-[#FEF9E7] border-t-2 border-[#FDE68A] text-center">
              <button
                onClick={onClose}
                className="text-xs text-[#92400E] hover:text-[#1A1916] font-bold underline cursor-pointer"
              >
                Continue Browsing Catalog
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
