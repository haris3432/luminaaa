import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { CategoryId } from '../types/jewelry';

interface FooterProps {
  onSelectCategory: (id: CategoryId) => void;
  onOpenCareGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenCareGuide }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubscribed(false), 6000);
    }
  };

  return (
    <footer className="bg-[#F2ECE1] text-[#1E1B18] border-t border-[#DED5C8] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Brand Invitation */}
        <div className="pb-12 border-b border-[#DED5C8] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FAF8F5] p-6 sm:p-8 border border-[#EAE3D9] mb-12">
          <div className="lg:col-span-6">
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7355] block mb-1.5">
              The Solaria Society
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1E1B18] font-normal mb-2 tracking-tight">
              Receive private previews of seasonal releases.
            </h3>
            <p className="text-xs text-[#5E564D] max-w-md">
              Enjoy 10% off your initial order with VIP code <strong className="text-[#1E1B18] bg-[#EAE0D0] px-2 py-0.5 font-medium">SOLARIA10</strong>.
            </p>
          </div>

          <div className="lg:col-span-6">
            {newsletterSubscribed ? (
              <div className="bg-white border border-[#C8B28E] p-4 text-xs text-[#1E1B18] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#8C7355] shrink-0" />
                <span>Welcome to Solaria. Your 10% discount code is <strong className="underline">SOLARIA10</strong>.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white border border-[#DED5C8] text-xs px-4 py-3 text-[#1E1B18] placeholder:text-[#9C9286] focus:outline-none focus:border-[#1E1B18]"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#D8C39E] hover:bg-[#C8B28E] text-[#1E1B18] font-medium text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main 4-Column Footer Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#DED5C8]">
          
          {/* Col 1: Brand Identity */}
          <div className="lg:col-span-4 space-y-4">
            <div>
              <span className="font-serif text-2xl tracking-[0.22em] text-[#1E1B18] block">
                SOLARIA
              </span>
              <span className="text-[9px] tracking-[0.32em] text-[#6E6459] uppercase block mt-1">
                LUXURY PRÊT • PAKISTAN
              </span>
            </div>
            <p className="text-xs text-[#5E564D] leading-relaxed max-w-sm">
              Minimalist fine jewelry, luxury prêt adornments, and handcrafted accessories designed in Lahore. Crafted with 18K gold vermeil, recycled 925 sterling silver, and natural gemstones.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Solaria Jewelry on Instagram"
                className="w-9 h-9 bg-[#FAF8F5] border border-[#DED5C8] hover:border-[#1E1B18] flex items-center justify-center text-[#1E1B18] transition-colors"
              >
                <Instagram className="w-4 h-4 stroke-[1.5]" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Solaria Jewelry on Facebook"
                className="w-9 h-9 bg-[#FAF8F5] border border-[#DED5C8] hover:border-[#1E1B18] flex items-center justify-center text-[#1E1B18] transition-colors"
              >
                <Facebook className="w-4 h-4 stroke-[1.5]" />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Categories */}
          <div className="lg:col-span-3 space-y-2.5">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#1E1B18] font-medium mb-3">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#5E564D]">
              <li>
                <button onClick={() => onSelectCategory('luxury-pret')} className="hover:text-[#1E1B18] transition-colors cursor-pointer">
                  Luxury Prêt &amp; Silk Clutches
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('rings')} className="hover:text-[#1E1B18] transition-colors cursor-pointer">
                  Solitaire &amp; Stacking Rings
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('necklaces')} className="hover:text-[#1E1B18] transition-colors cursor-pointer">
                  Minimalist Gold Necklaces
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('earrings')} className="hover:text-[#1E1B18] transition-colors cursor-pointer">
                  Statement &amp; Pearl Earrings
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('bracelets')} className="hover:text-[#1E1B18] transition-colors cursor-pointer">
                  Gemstone Cuffs &amp; Bracelets
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('hair-accessories')} className="hover:text-[#1E1B18] transition-colors cursor-pointer">
                  Heritage Hair Accessories
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('gift-boxes')} className="hover:text-[#1E1B18] transition-colors cursor-pointer">
                  Velvet Keepsake Gift Boxes
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Client Care & Store Links */}
          <div className="lg:col-span-2 space-y-2.5">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#1E1B18] font-medium mb-3">
              Client Care
            </h4>
            <ul className="space-y-2 text-xs text-[#5E564D]">
              <li>
                <button onClick={onOpenCareGuide} className="hover:text-[#1E1B18] transition-colors cursor-pointer text-left">
                  Ring Size &amp; Care Guide
                </button>
              </li>
              <li>
                <a href="#story" className="hover:text-[#1E1B18] transition-colors">
                  Our Philosophy
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-[#1E1B18] transition-colors">
                  Client Reviews
                </a>
              </li>
              <li>
                <a href="#footer-location" className="hover:text-[#1E1B18] transition-colors">
                  Boutique Address
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Boutique Address */}
          <div className="lg:col-span-3 space-y-3 text-xs text-[#5E564D]">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#1E1B18] font-medium mb-3">
              Contact Boutique
            </h4>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-[#8C7355] shrink-0" />
              <a href="tel:+923008472910" className="hover:text-[#1E1B18]">
                +92-300-8472910
              </a>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-[#8C7355] shrink-0" />
              <a href="mailto:support@example.com" className="hover:text-[#1E1B18]">
                support@example.com
              </a>
            </div>
            <div className="flex items-start gap-2.5 pt-1">
              <Clock className="w-4 h-4 text-[#8C7355] shrink-0 mt-0.5" />
              <span>Mon – Sat: 11:30 AM – 8:30 PM PKT</span>
            </div>
          </div>

        </div>

        {/* Exclusive Very-Bottom Location Address & Copyright Bar */}
        <div id="footer-location" className="pt-8 space-y-6">
          <div className="bg-[#FAF8F5] border border-[#DED5C8] px-5 py-4 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#1E1B18] text-[#D8C39E] flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-[#8C7355] block">
                  Flagship Atelier &amp; Boutique Location
                </span>
                <p className="text-xs sm:text-sm text-[#1E1B18] font-medium mt-0.5">
                  Level 2, Solaria Private Suites, M.M. Alam Road, Gulberg III, Lahore, 54000, Pakistan
                </p>
              </div>
            </div>
            <a
              href="https://maps.google.com/?q=MM+Alam+Road+Gulberg+III+Lahore"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-[#EAE0D0] hover:bg-[#D8C39E] text-[#1E1B18] text-[11px] uppercase tracking-widest font-medium transition-colors shrink-0 inline-flex items-center gap-1.5"
            >
              <span>View on Google Maps</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6E6459]">
            <p>© {new Date().getFullYear()} Solaria Jewelry Pakistan. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8C7355]" />
              <span>100% Authentic · Tracked Delivery Across Pakistan</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
