import React, { useState } from 'react';
import { X, Sparkles, Droplets, ShieldCheck, Sun } from 'lucide-react';

interface JewelryCareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JewelryCareModal: React.FC<JewelryCareModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'care' | 'sizing'>('care');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#1A1916]/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div 
        className="relative bg-[#FFFDF0] max-w-xl w-full border-2 border-[#FCD34D] shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b-2 border-[#FDE68A] flex items-center justify-between bg-[#FEF9E7]">
          <div className="flex items-center gap-2">
            <Sun className="w-5 h-5 text-[#D97706]" />
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#1A1916]">
              Solaria Care & Ring Sizing Guide
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#78350F] hover:text-[#1A1916] rounded-full hover:bg-[#FEF08A] cursor-pointer border border-[#FDE68A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Toggle */}
        <div className="flex border-b-2 border-[#FDE68A] bg-[#FEF3C7]">
          <button
            onClick={() => setActiveTab('care')}
            className={`flex-1 py-3.5 text-xs font-extrabold uppercase tracking-wider text-center transition-colors cursor-pointer ${
              activeTab === 'care'
                ? 'bg-[#FFFDF0] border-b-2 border-[#B45309] text-[#1A1916]'
                : 'text-[#78350F] hover:text-[#1A1916]'
            }`}
          >
            Care & Maintenance
          </button>
          <button
            onClick={() => setActiveTab('sizing')}
            className={`flex-1 py-3.5 text-xs font-extrabold uppercase tracking-wider text-center transition-colors cursor-pointer ${
              activeTab === 'sizing'
                ? 'bg-[#FFFDF0] border-b-2 border-[#B45309] text-[#1A1916]'
                : 'text-[#78350F] hover:text-[#1A1916]'
            }`}
          >
            Ring Size Reference
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs text-[#37332E]">
          {activeTab === 'care' ? (
            <div className="space-y-4">
              <div className="flex items-start gap-3.5 p-4 bg-[#FEF9E7] border-2 border-[#FDE68A] shadow-2xs">
                <Droplets className="w-6 h-6 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-[#1A1916] font-bold mb-1">
                    Water & Daily Wear
                  </h4>
                  <p className="leading-relaxed font-medium">
                    Our 2.5µm 18K vermeil is water-resistant. However, avoid submerging pieces in chlorinated swimming pools, sulfur hot springs, or sea water to preserve the honey-gold luster.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-[#FEF9E7] border-2 border-[#FDE68A] shadow-2xs">
                <Sparkles className="w-6 h-6 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-[#1A1916] font-bold mb-1">
                    Perfumes & Lotions
                  </h4>
                  <p className="leading-relaxed font-medium">
                    Always apply perfumes, lotions, and hairsprays <em>before</em> putting on your jewelry. Chemicals can degrade the natural nacre of Grade AAA baroque pearls and untreated emeralds.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 p-4 bg-[#FEF9E7] border-2 border-[#FDE68A] shadow-2xs">
                <ShieldCheck className="w-6 h-6 text-[#D97706] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-serif text-base text-[#1A1916] font-bold mb-1">
                    Velvet Storage
                  </h4>
                  <p className="leading-relaxed font-medium">
                    Store individual pieces in the butter-yellow Solaria velvet box to prevent chains from tangling and to isolate silver components from airborne pollutants.
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-[#37332E] leading-relaxed font-semibold">
                If you are unsure of your ring size, wrap a string around the base of your intended finger, mark the point where the ends meet, and measure against this chart:
              </p>

              <div className="border-2 border-[#FCD34D] overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FEF3C7] border-b-2 border-[#FCD34D] text-[#1A1916]">
                    <tr>
                      <th className="p-3 font-bold">Standard Size</th>
                      <th className="p-3 font-bold">Inside Diameter</th>
                      <th className="p-3 font-bold">Circumference</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#FDE68A] bg-white text-[#1A1916]">
                    <tr>
                      <td className="p-3 font-semibold">Size 5 (Small)</td>
                      <td className="p-3 font-medium">15.7 mm</td>
                      <td className="p-3 font-medium">49.3 mm</td>
                    </tr>
                    <tr className="bg-[#FEF9E7]/40">
                      <td className="p-3 font-semibold">Size 6</td>
                      <td className="p-3 font-medium">16.5 mm</td>
                      <td className="p-3 font-medium">51.8 mm</td>
                    </tr>
                    <tr className="bg-[#FEF08A] font-bold text-[#1A1916] border-y-2 border-[#F59E0B]">
                      <td className="p-3 font-extrabold text-[#B45309]">Size 7 (Standard Most Popular)</td>
                      <td className="p-3">17.3 mm</td>
                      <td className="p-3">54.4 mm</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold">Size 8</td>
                      <td className="p-3 font-medium">18.1 mm</td>
                      <td className="p-3 font-medium">56.9 mm</td>
                    </tr>
                    <tr className="bg-[#FEF9E7]/40">
                      <td className="p-3 font-semibold">Size 9</td>
                      <td className="p-3 font-medium">18.9 mm</td>
                      <td className="p-3 font-medium">59.5 mm</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="p-3.5 bg-[#FEF3C7] border-2 border-[#FCD34D] text-xs text-[#92400E] font-bold shadow-2xs">
                💡 <strong>Complimentary Exchange:</strong> If your Solaria ring does not fit perfectly, we offer free ring size exchanges within 7 business days of delivery.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FEF9E7] border-t-2 border-[#FDE68A] flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#1A1916] hover:bg-[#2C2C2C] text-[#FFFDF0] text-xs font-bold uppercase tracking-wider cursor-pointer border border-[#F59E0B]"
          >
            Got It
          </button>
        </div>
      </div>
    </div>
  );
};
