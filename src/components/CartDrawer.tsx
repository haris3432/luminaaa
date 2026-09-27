import React, { useState } from 'react';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Tag, Sparkles, Sun } from 'lucide-react';
import { CartItem } from '../types/jewelry';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  appliedPromo: string | null;
  onApplyPromo: (code: string) => boolean;
  onRemovePromo: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  appliedPromo,
  onApplyPromo,
  onRemovePromo,
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 5000;
  const STANDARD_DELIVERY_FEE = 250;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const isFreeDelivery = subtotal >= FREE_SHIPPING_THRESHOLD;
  const deliveryFee = items.length === 0 ? 0 : isFreeDelivery ? 0 : STANDARD_DELIVERY_FEE;
  
  let discount = 0;
  if (appliedPromo === 'SOLARIA10' || appliedPromo === 'BOTANICA10' || appliedPromo === 'LUMINA10') {
    discount = Math.round(subtotal * 0.1);
  } else if (appliedPromo === 'WELCOME') {
    discount = Math.min(500, subtotal);
  }

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const success = onApplyPromo(promoInput.trim().toUpperCase());
    if (!success) {
      setPromoError('Invalid code. Try "SOLARIA10" or "WELCOME".');
    } else {
      setPromoError('');
      setPromoInput('');
    }
  };

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
                <ShoppingBag className="w-4 h-4 text-[#B45309]" />
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1916]">
                Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
              </h2>
            </div>
            <button
              onClick={onClose}
              aria-label="Close cart drawer"
              className="p-2 text-[#78350F] hover:text-[#1A1916] rounded-full hover:bg-[#FEF08A] transition-colors cursor-pointer border border-[#FDE68A]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator (Threshold Rs. 5000) */}
          <div className="bg-[#FEF3C7] px-5 py-3.5 border-b-2 border-[#FDE68A]">
            <div className="flex items-center justify-between text-xs text-[#1A1916] mb-2 font-bold">
              {isFreeDelivery ? (
                <span className="text-[#15803D] flex items-center gap-1.5 font-bold">
                  <Sun className="w-4 h-4 text-[#D97706]" /> Free Nationwide Express Delivery Unlocked!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#B45309] tabular-nums font-extrabold">Rs. {amountNeededForFreeShipping.toLocaleString()}</strong> more for <strong>Free Delivery</strong>
                </span>
              )}
              <span className="text-[11px] font-extrabold text-[#92400E]">
                {Math.round(freeShippingProgress)}%
              </span>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full h-2.5 bg-white border border-[#FCD34D] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#F59E0B] to-[#D97706] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
            {items.length === 0 ? (
              <div className="py-16 text-center flex flex-col items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-[#FEF3C7] border-2 border-[#FCD34D] flex items-center justify-center text-[#D97706] mb-4">
                  <ShoppingBag className="w-8 h-8 stroke-1.5" />
                </div>
                <h3 className="font-serif text-2xl text-[#1A1916] font-bold mb-1">Your bag is empty</h3>
                <p className="text-xs text-[#524B40] max-w-xs mb-6 font-medium">
                  Add handcrafted 18K honey-gold pieces to your collection.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-3 bg-[#1A1916] hover:bg-[#2C2C2C] text-[#FFFDF0] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer border border-[#F59E0B]"
                >
                  Explore Collection
                </button>
              </div>
            ) : (
              <div className="divide-y-2 divide-[#FDE68A]">
                {items.map((item) => (
                  <div key={item.product.id + item.selectedSize} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                    {/* Item Image */}
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 sm:w-22 sm:h-22 object-cover border-2 border-[#FDE68A] bg-[#FEF9E7] shadow-2xs shrink-0"
                    />

                    {/* Item Info */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif text-base font-bold text-[#1A1916] leading-snug">
                            {item.product.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(item.product.id)}
                            aria-label={`Remove ${item.product.name}`}
                            className="text-[#92400E] hover:text-[#DC2626] p-1 cursor-pointer transition-colors"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <span className="text-[11px] text-[#78350F] font-semibold block mt-0.5">
                          {item.selectedSize || 'Standard'} · {item.product.material.split('&')[0]}
                        </span>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center border-2 border-[#FDE68A] bg-white">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                            className="px-2.5 py-1 text-sm font-bold text-[#1A1916] hover:bg-[#FEF9E7] cursor-pointer"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 text-xs font-bold tabular-nums text-[#1A1916]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                            className="px-2.5 py-1 text-sm font-bold text-[#1A1916] hover:bg-[#FEF9E7] cursor-pointer"
                          >
                            +
                          </button>
                        </div>

                        {/* Price */}
                        <span className="font-serif font-bold text-base text-[#B45309] tabular-nums">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-5 sm:p-6 bg-[#FEF9E7] border-t-2 border-[#FDE68A] space-y-4">
              
              {/* Promo Code Input */}
              <div>
                {appliedPromo ? (
                  <div className="bg-[#FEF08A] border-2 border-[#F59E0B] p-2.5 text-xs text-[#92400E] font-bold flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#B45309]" />
                      <span>Code <strong>"{appliedPromo}"</strong> applied (-Rs. {discount.toLocaleString()})</span>
                    </div>
                    <button
                      onClick={onRemovePromo}
                      className="text-[11px] text-[#DC2626] hover:underline font-bold cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. SOLARIA10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 bg-white border-2 border-[#FDE68A] text-xs px-3.5 py-2 text-[#1A1916] font-bold placeholder:text-[#92400E]/60 focus:outline-none focus:border-[#B45309]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-[#1A1916] hover:bg-[#2C2C2C] text-[#FEF08A] text-xs font-bold uppercase tracking-wider cursor-pointer border border-[#F59E0B]"
                    >
                      Apply
                    </button>
                  </form>
                )}
                {promoError && (
                  <p className="text-[11px] text-[#DC2626] font-bold mt-1">{promoError}</p>
                )}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-1.5 text-xs font-semibold text-[#4B453C]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-[#1A1916] tabular-nums">Rs. {subtotal.toLocaleString()}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-[#15803D] font-bold">
                    <span>VIP Privilege Promo:</span>
                    <span className="tabular-nums">-Rs. {discount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Nationwide Courier Delivery:</span>
                  <span className={deliveryFee === 0 ? 'text-[#15803D] font-bold' : 'font-bold text-[#1A1916]'}>
                    {deliveryFee === 0 ? 'Free (Threshold Reached)' : `Rs. ${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-[#1A1916] pt-2 border-t-2 border-[#FDE68A]">
                  <span>Total Amount:</span>
                  <span className="font-serif text-xl font-bold text-[#B45309] tabular-nums">
                    Rs. {grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-4 bg-[#1A1916] hover:bg-[#2C2C2C] text-[#FFFDF0] text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 shadow-md cursor-pointer border-2 border-[#F59E0B]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 text-[#FEF08A]" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#78350F] font-bold pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#B45309]" />
                <span>100% Secure Manual Raast & Bank Transfer Checkout</span>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
