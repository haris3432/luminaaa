import React from 'react';
import { CheckCircle2, Package, MapPin, Calendar, Download, ArrowRight, PhoneCall, Sun, Sparkles } from 'lucide-react';
import { Order } from '../types/jewelry';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  const handlePrintReceipt = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A1916]/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-300">
      <div 
        className="relative bg-[#FFFDF0] max-w-xl w-full border-2 border-[#FCD34D] shadow-2xl overflow-hidden my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Celebration Banner - Radiant Warm Amber-Gold */}
        <div className="bg-gradient-to-r from-[#B45309] via-[#D97706] to-[#B45309] text-white p-6 sm:p-8 text-center relative overflow-hidden border-b-2 border-[#FCD34D]">
          <div className="absolute top-0 right-0 w-36 h-36 bg-[#FEF08A]/25 rounded-full blur-2xl pointer-events-none" />
          <div className="w-16 h-16 bg-[#FFFDF0] text-[#B45309] rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg border-2 border-[#FEF08A]">
            <CheckCircle2 className="w-9 h-9 text-[#15803D]" />
          </div>
          <span className="text-xs font-extrabold uppercase tracking-[0.25em] text-[#FEF08A] block mb-1 flex items-center justify-center gap-1.5 drop-shadow-xs">
            <Sun className="w-4 h-4 text-[#FEF08A] fill-[#FEF08A]" />
            Order Successfully Placed
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-normal text-white drop-shadow-xs">
            Thank you, {order.deliveryDetails.fullName.split(' ')[0]}!
          </h2>
          <p className="text-xs text-[#FEF3C7] mt-1 font-medium">
            Your Solaria order has been logged and is being prepared in our Lahore studio.
          </p>

          {/* Unique Order ID - Bright & High Visibility */}
          <div className="mt-4 inline-flex items-center gap-2 bg-[#FFFDF0] px-5 py-2 border-2 border-[#FEF08A] rounded-full text-xs font-mono text-[#1A1916] shadow-md">
            <span className="font-bold text-[#B45309]">UNIQUE ORDER ID:</span>
            <strong className="text-[#1A1916] tracking-wider text-base font-extrabold">{order.id}</strong>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[65vh] overflow-y-auto text-xs">
          
          {/* Status & Verification Box */}
          <div className="bg-[#FEF3C7] p-4 border-2 border-[#FCD34D] flex items-start gap-3 shadow-2xs">
            <Package className="w-5 h-5 text-[#B45309] shrink-0 mt-0.5" />
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h4 className="font-bold text-[#1A1916] text-xs">
                  {order.paymentMethod === 'cod'
                    ? 'Payment Due: Cash on Delivery'
                    : 'Bank Transfer Payment Proof Logged'}
                </h4>
                <span className="text-[10px] bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] px-2 py-0.5 font-extrabold uppercase">
                  {order.status === 'confirmed' ? 'Order Confirmed' : 'Verification In Progress'}
                </span>
              </div>
              <p className="text-[11px] text-[#4B453C] mt-1 font-medium">
                Estimated Delivery: <strong className="text-[#1A1916]">{order.estimatedDelivery}</strong> to {order.deliveryDetails.city}.
              </p>
              {order.transactionId && (
                <p className="text-[11px] text-[#B45309] mt-1 font-mono font-bold">
                  Ref TID: {order.transactionId}
                </p>
              )}
            </div>
          </div>

          {/* Purchased Items */}
          <div>
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-[#1A1916] mb-3 pb-1 border-b-2 border-[#FDE68A]">
              Purchased Pieces ({order.items.reduce((acc, i) => acc + i.quantity, 0)})
            </h4>
            <div className="space-y-3">
              {order.items.map((item) => (
                <div key={item.product.id + item.selectedSize} className="flex items-center justify-between gap-3 bg-[#FEF9E7] p-2.5 border border-[#FDE68A]">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover border border-[#FCD34D] shadow-2xs"
                    />
                    <div>
                      <h5 className="font-serif text-sm font-bold text-[#1A1916]">{item.product.name}</h5>
                      <span className="text-[11px] text-[#78350F] font-semibold">
                        Qty: {item.quantity} · {item.selectedSize || 'Standard'}
                      </span>
                    </div>
                  </div>
                  <span className="font-serif font-bold text-sm tabular-nums text-[#B45309]">
                    Rs. {(item.product.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address & Contact */}
          <div className="bg-white p-4 border-2 border-[#FDE68A] grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center gap-1.5 text-[#B45309] font-bold text-xs uppercase tracking-wider mb-1">
                <MapPin className="w-3.5 h-3.5" />
                <span>Shipping Address</span>
              </div>
              <p className="text-[#1A1916] font-bold text-xs">{order.deliveryDetails.fullName}</p>
              <p className="text-[#4B453C] text-[11px] leading-relaxed font-medium">{order.deliveryDetails.address}</p>
              <p className="text-[#1A1916] text-[11px] font-bold">{order.deliveryDetails.city}, Pakistan</p>
            </div>

            <div>
              <div className="flex items-center gap-1.5 text-[#B45309] font-bold text-xs uppercase tracking-wider mb-1">
                <PhoneCall className="w-3.5 h-3.5" />
                <span>Contact Details</span>
              </div>
              <p className="text-[#1A1916] font-mono text-xs font-bold">{order.deliveryDetails.phone}</p>
              <p className="text-[#4B453C] text-[11px] font-medium">{order.deliveryDetails.email}</p>
              <div className="mt-2 text-[11px] text-[#15803D] font-bold">
                ✓ Tracking link sent via SMS
              </div>
            </div>
          </div>

          {/* Pricing Totals Recap */}
          <div className="pt-2 border-t-2 border-[#FDE68A] space-y-1.5 text-xs font-semibold text-[#4B453C]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="tabular-nums font-bold text-[#1A1916]">Rs. {order.subtotal.toLocaleString()}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-[#15803D] font-bold">
                <span>VIP Privilege Discount:</span>
                <span className="tabular-nums">-Rs. {order.discount.toLocaleString()}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Nationwide Express Courier:</span>
              <span className="font-bold text-[#15803D]">{order.deliveryFee === 0 ? 'Complimentary (Free)' : `Rs. ${order.deliveryFee}`}</span>
            </div>
            <div className="flex justify-between text-base font-bold text-[#1A1916] pt-2 border-t-2 border-[#FDE68A]">
              <span>Total Settled:</span>
              <span className="font-serif text-lg text-[#B45309] tabular-nums font-bold">Rs. {order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Screenshot Proof Note if uploaded */}
          {order.paymentProofName && (
            <div className="p-3 bg-[#FEF3C7] border-2 border-[#FCD34D] text-xs text-[#1A1916] flex items-center justify-between font-bold">
              <span>Attached Proof: <strong className="text-[#B45309]">{order.paymentProofName}</strong></span>
              <span className="text-[#15803D] bg-white px-2 py-0.5 border border-[#86EFAC]">✓ Upload Verified</span>
            </div>
          )}

        </div>

        {/* Action Buttons */}
        <div className="p-4 sm:p-6 bg-[#FEF9E7] border-t-2 border-[#FDE68A] flex flex-col sm:flex-row gap-3 items-center justify-between">
          <button
            onClick={handlePrintReceipt}
            className="w-full sm:w-auto px-5 py-3 bg-white border-2 border-[#FCD34D] hover:border-[#1A1916] text-xs font-bold text-[#1A1916] uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4 text-[#B45309]" />
            <span>Print Official Receipt</span>
          </button>

          <button
            onClick={onClose}
            className="w-full sm:w-auto px-7 py-3 bg-[#1A1916] hover:bg-[#2C2C2C] text-[#FFFDF0] text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer border border-[#F59E0B] shadow-sm"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4 text-[#FEF08A]" />
          </button>
        </div>
      </div>
    </div>
  );
};
