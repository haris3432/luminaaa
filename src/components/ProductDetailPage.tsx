import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  Sparkles,
  Ruler,
  ZoomIn,
  ZoomOut,
  ChevronRight,
  PackageCheck,
  Award,
} from 'lucide-react';
import { Product, CategoryId } from '../types/jewelry';
import { PRODUCTS } from '../data/jewelryData';
import { ProductCard } from './ProductCard';

interface ProductDetailPageProps {
  product: Product;
  onBackToShop: () => void;
  onSelectCategory: (category: CategoryId) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, selectedSize?: string) => void;
  onBuyNow: (product: Product, quantity: number, selectedSize?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product, e?: React.MouseEvent) => void;
  wishlist: Product[];
  onOpenCareGuide: () => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onBackToShop,
  onSelectCategory,
  onSelectProduct,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  wishlist,
  onOpenCareGuide,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<string>(
    product.category === 'rings' || product.category === 'silver-rings'
      ? 'Size 7 (Standard 17.3mm)'
      : 'Standard Atelier Fit'
  );
  const [activeImageView, setActiveImageView] = useState<'full' | 'detail' | 'craft'>('full');
  const [isZoomed, setIsZoomed] = useState(false);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'shipping'>('description');

  // Reset local state and smoothly scroll to top whenever the active product changes
  useEffect(() => {
    setQuantity(1);
    setSelectedSize(
      product.category === 'rings' || product.category === 'silver-rings'
        ? 'Size 7 (Standard 17.3mm)'
        : 'Standard Atelier Fit'
    );
    setActiveImageView('full');
    setIsZoomed(false);
    setIsAddedSuccess(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product]);

  const ringSizes = [
    'Size 6 (16.5mm)',
    'Size 7 (Standard 17.3mm)',
    'Size 8 (18.1mm)',
    'Size 9 (18.9mm)',
  ];

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, selectedSize);
    setIsAddedSuccess(true);
    setTimeout(() => {
      setIsAddedSuccess(false);
    }, 2000);
  };

  const handleBuyNowClick = () => {
    onBuyNow(product, quantity, selectedSize);
  };

  // Curate 3 related products (prioritizing same category, then bestsellers)
  const relatedProducts = React.useMemo(() => {
    const sameCategory = PRODUCTS.filter(
      (p) => p.id !== product.id && p.category === product.category
    );
    const others = PRODUCTS.filter(
      (p) => p.id !== product.id && p.category !== product.category
    );
    return [...sameCategory, ...others].slice(0, 3);
  }, [product]);

  const formattedPrice = `Rs. ${product.price.toLocaleString()}`;
  const formattedOriginalPrice = product.originalPrice
    ? `Rs. ${product.originalPrice.toLocaleString()}`
    : null;
  const savingsAmount = product.originalPrice
    ? product.originalPrice - product.price
    : 0;

  const categoryLabel = product.category
    .replace('-', ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <div className="bg-[#FAF8F5] min-h-screen pb-20 animate-in fade-in duration-200">
      {/* Top Sticky Sub-Bar with Smooth Back to Shop / Home Button & Breadcrumbs */}
      <div className="bg-[#F3EDE3] border-b border-[#EAE3D9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4">
          {/* Smooth Back to Shop / Home Button */}
          <button
            onClick={onBackToShop}
            className="inline-flex items-center gap-2.5 px-4 py-2 bg-white hover:bg-[#1E1B18] text-[#1E1B18] hover:text-[#FAF8F5] border border-[#DED5C8] hover:border-[#1E1B18] text-xs font-medium uppercase tracking-widest transition-all duration-200 cursor-pointer shadow-2xs group"
          >
            <ArrowLeft className="w-4 h-4 text-[#8C7355] group-hover:text-[#D8C39E] transition-transform duration-200 group-hover:-translate-x-0.5" />
            <span>Back to Shop / Home</span>
          </button>

          {/* Interactive Breadcrumb Trail */}
          <nav aria-label="Breadcrumb" className="hidden sm:flex items-center gap-2 text-xs text-[#6E6459]">
            <button
              onClick={onBackToShop}
              className="hover:text-[#1E1B18] transition-colors cursor-pointer"
            >
              Home
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#B89B72]" />
            <button
              onClick={() => {
                onSelectCategory(product.category);
                onBackToShop();
              }}
              className="hover:text-[#1E1B18] transition-colors cursor-pointer"
            >
              {categoryLabel}
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#B89B72]" />
            <span className="text-[#1E1B18] font-medium truncate max-w-[220px]">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Dedicated Product Detail Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column (7 cols on desktop): Large High-Resolution Image Showcase */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary High-Resolution Frame */}
            <div className="relative bg-[#F3EDE3] border border-[#EAE3D9] overflow-hidden aspect-[4/5] sm:aspect-[5/5] group">
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                onClick={() => setIsZoomed(!isZoomed)}
                className={`w-full h-full object-cover object-center transition-transform duration-500 ease-out cursor-zoom-in ${
                  isZoomed
                    ? 'scale-150 cursor-zoom-out'
                    : activeImageView === 'detail'
                    ? 'scale-125 object-center'
                    : activeImageView === 'craft'
                    ? 'scale-115 object-bottom'
                    : 'scale-100 group-hover:scale-103'
                }`}
              />

              {/* Top Left Status Tags */}
              <div className="absolute top-4 left-4 flex flex-col gap-2 items-start pointer-events-none">
                {product.isBestSeller && (
                  <span className="text-[11px] uppercase font-medium tracking-[0.2em] bg-[#1E1B18] text-[#FAF8F5] px-3.5 py-1.5 shadow-sm">
                    Signature Bestseller
                  </span>
                )}
                {product.isNew && (
                  <span className="text-[11px] uppercase font-medium tracking-[0.2em] bg-[#D8C39E] text-[#1E1B18] px-3.5 py-1.5 shadow-sm">
                    New Arrival
                  </span>
                )}
              </div>

              {/* Top Right Wishlist & High-Res Zoom Controls */}
              <div className="absolute top-4 right-4 flex items-center gap-2.5 z-10">
                <button
                  onClick={() => setIsZoomed(!isZoomed)}
                  aria-label={isZoomed ? 'Reset image zoom' : 'Zoom high-resolution image'}
                  className="w-10 h-10 bg-white/90 hover:bg-white text-[#1E1B18] border border-[#DED5C8] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                  title={isZoomed ? 'Zoom Out' : 'Inspect High-Res Detail'}
                >
                  {isZoomed ? (
                    <ZoomOut className="w-4 h-4 stroke-[1.5]" />
                  ) : (
                    <ZoomIn className="w-4 h-4 stroke-[1.5]" />
                  )}
                </button>

                <button
                  onClick={(e) => onToggleWishlist(product, e)}
                  aria-label={isWishlisted ? 'Remove from wishlist' : 'Save to wishlist'}
                  className="w-10 h-10 bg-white/90 hover:bg-white text-[#1E1B18] border border-[#DED5C8] flex items-center justify-center transition-colors cursor-pointer shadow-sm"
                  title={isWishlisted ? 'Saved in Wishlist' : 'Save to Wishlist'}
                >
                  <Heart
                    className={`w-4 h-4 stroke-[1.5] ${
                      isWishlisted ? 'fill-[#D8C39E] text-[#1E1B18]' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Bottom Caption Strip */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="bg-[#FAF8F5]/95 backdrop-blur-xs text-[#1E1B18] text-[11px] tracking-wider uppercase px-3.5 py-1.5 border border-[#DED5C8]">
                  {activeImageView === 'full'
                    ? 'High-Resolution Studio Portrait'
                    : activeImageView === 'detail'
                    ? 'Macro Setting & Stone Clarity'
                    : 'Artisan Polish & Silhouette'}
                </span>
                <span className="hidden sm:inline-block bg-[#1E1B18]/85 text-[#FAF8F5] text-[11px] tracking-wider px-3 py-1.5">
                  Click image to {isZoomed ? 'reset view' : 'zoom 1.5x'}
                </span>
              </div>
            </div>

            {/* Multi-Angle / Perspective Selector Thumbnails */}
            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              <button
                onClick={() => {
                  setActiveImageView('full');
                  setIsZoomed(false);
                }}
                className={`group relative aspect-[4/3] bg-[#F3EDE3] border overflow-hidden cursor-pointer transition-all ${
                  activeImageView === 'full'
                    ? 'border-[#1E1B18] ring-1 ring-[#1E1B18]'
                    : 'border-[#EAE3D9] opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={product.image}
                  alt={`${product.name} full view`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-[#FAF8F5]/90 text-[#1E1B18] text-[10px] uppercase tracking-wider px-2 py-0.5">
                  01. Full Piece
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveImageView('detail');
                  setIsZoomed(false);
                }}
                className={`group relative aspect-[4/3] bg-[#F3EDE3] border overflow-hidden cursor-pointer transition-all ${
                  activeImageView === 'detail'
                    ? 'border-[#1E1B18] ring-1 ring-[#1E1B18]'
                    : 'border-[#EAE3D9] opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={product.image}
                  alt={`${product.name} macro detail`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center scale-150"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-[#FAF8F5]/90 text-[#1E1B18] text-[10px] uppercase tracking-wider px-2 py-0.5">
                  02. Close-Up Detail
                </span>
              </button>

              <button
                onClick={() => {
                  setActiveImageView('craft');
                  setIsZoomed(false);
                }}
                className={`group relative aspect-[4/3] bg-[#F3EDE3] border overflow-hidden cursor-pointer transition-all ${
                  activeImageView === 'craft'
                    ? 'border-[#1E1B18] ring-1 ring-[#1E1B18]'
                    : 'border-[#EAE3D9] opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={product.image}
                  alt={`${product.name} finish view`}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-bottom scale-125"
                />
                <span className="absolute bottom-1.5 left-1.5 bg-[#FAF8F5]/90 text-[#1E1B18] text-[10px] uppercase tracking-wider px-2 py-0.5">
                  03. Finish &amp; Scale
                </span>
              </button>
            </div>
          </div>

          {/* Right Column (5 cols on desktop): Product Title, Price, Detailed Description & Purchase Controls */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white border border-[#EAE3D9] p-6 sm:p-8 lg:p-10 shadow-2xs">
            <div>
              {/* Category & Verified Customer Rating */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#6E6459] mb-3 pb-3 border-b border-[#F2ECE1]">
                <span className="uppercase tracking-[0.22em] text-[#8C7355] font-medium">
                  {categoryLabel}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-[#C8B28E]">
                    {[...Array(5)].map((_, idx) => (
                      <Star key={idx} className="w-3.5 h-3.5 fill-[#C8B28E] text-[#C8B28E]" />
                    ))}
                  </div>
                  <span className="text-[#1E1B18] font-medium tabular-nums">
                    {product.rating}
                  </span>
                  <span className="text-[#787066]">
                    ({product.reviewsCount} verified reviews)
                  </span>
                </div>
              </div>

              {/* Product Title */}
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal tracking-tight leading-tight mb-4">
                {product.name}
              </h1>

              {/* Price & Stock Status */}
              <div className="flex flex-wrap items-baseline gap-3 mb-6 pb-6 border-b border-[#EAE3D9]">
                <span className="font-serif text-3xl sm:text-4xl font-medium text-[#1E1B18] tabular-nums">
                  {formattedPrice}
                </span>
                {formattedOriginalPrice && (
                  <span className="text-base text-[#9C9286] line-through tabular-nums">
                    {formattedOriginalPrice}
                  </span>
                )}
                {savingsAmount > 0 && (
                  <span className="text-[11px] uppercase tracking-wider bg-[#F3EDE3] text-[#8C7355] px-2.5 py-1 border border-[#DED5C8] font-medium">
                    Save Rs. {savingsAmount.toLocaleString()}
                  </span>
                )}
              </div>

              {/* Primary Detailed Description */}
              <div className="mb-6">
                <h2 className="text-[11px] uppercase tracking-[0.2em] text-[#8C7355] mb-2 font-medium">
                  Atelier Description &amp; Notes
                </h2>
                <p className="text-sm sm:text-[15px] text-[#3A332C] leading-relaxed mb-4">
                  {product.description}
                </p>
                <div className="flex flex-wrap items-center gap-2 text-xs text-[#6E6459]">
                  {product.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      {idx > 0 && <span aria-hidden="true" className="text-[#C8B28E]">·</span>}
                      <span>{tag}</span>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Material, Finish & Dimensions Summary Box */}
              <div className="bg-[#FAF8F5] border border-[#EAE3D9] p-4 sm:p-5 mb-6 space-y-2.5 text-xs">
                <div className="flex justify-between gap-4 py-1 border-b border-[#EFE9E0]">
                  <span className="text-[#6E6459] uppercase tracking-wider">Material</span>
                  <span className="text-[#1E1B18] font-medium text-right">{product.material}</span>
                </div>
                <div className="flex justify-between gap-4 py-1 border-b border-[#EFE9E0]">
                  <span className="text-[#6E6459] uppercase tracking-wider">Artisan Finish</span>
                  <span className="text-[#1E1B18] font-medium text-right">{product.finish}</span>
                </div>
                <div className="flex justify-between gap-4 py-1">
                  <span className="text-[#6E6459] uppercase tracking-wider">Dimensions</span>
                  <span className="text-[#1E1B18] font-medium text-right">{product.dimensions}</span>
                </div>
              </div>

              {/* Ring Size Selector (For Rings & Silver Rings) */}
              {(product.category === 'rings' || product.category === 'silver-rings') && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2.5">
                    <label className="text-xs uppercase tracking-widest text-[#1E1B18] font-medium">
                      Select Ring Size
                    </label>
                    <button
                      onClick={onOpenCareGuide}
                      className="text-xs text-[#8C7355] hover:text-[#1E1B18] underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>Size Guide</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2.5">
                    {ringSizes.map((size) => (
                      <button
                        key={size}
                        type="button"
                        onClick={() => setSelectedSize(size)}
                        className={`py-2.5 px-3 text-xs text-center border transition-all cursor-pointer ${
                          selectedSize === size
                            ? 'bg-[#1E1B18] text-[#FAF8F5] border-[#1E1B18] font-medium'
                            : 'bg-[#FAF8F5] text-[#3A332C] border-[#DED5C8] hover:border-[#1E1B18]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Availability */}
              <div className="flex items-center justify-between gap-4 mb-6">
                <div>
                  <span className="block text-xs uppercase tracking-widest text-[#1E1B18] font-medium mb-1">
                    Quantity
                  </span>
                  <span className="text-[11px] text-[#6E6459] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#2E6F40] inline-block" />
                    In Stock — Ready for immediate dispatch
                  </span>
                </div>

                <div className="flex items-center border border-[#DED5C8] bg-[#FAF8F5]">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="w-10 h-10 flex items-center justify-center text-sm text-[#1E1B18] hover:bg-[#EAE3D9] disabled:opacity-40 cursor-pointer transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-12 text-center text-sm font-medium tabular-nums text-[#1E1B18]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center text-sm text-[#1E1B18] hover:bg-[#EAE3D9] cursor-pointer transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Primary CTA Buttons: "Add to Cart" AND "Buy Now" */}
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Add to Cart Button */}
                  <button
                    type="button"
                    onClick={handleAddToCartClick}
                    className={`py-4 px-5 text-xs font-medium uppercase tracking-[0.18em] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer border ${
                      isAddedSuccess
                        ? 'bg-[#2E6F40] text-white border-[#2E6F40]'
                        : 'bg-[#1E1B18] hover:bg-[#332E29] text-[#FAF8F5] border-[#1E1B18]'
                    }`}
                  >
                    {isAddedSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Added to Cart</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#D8C39E]" />
                        <span>Add to Cart</span>
                      </>
                    )}
                  </button>

                  {/* Buy Now Button */}
                  <button
                    type="button"
                    onClick={handleBuyNowClick}
                    className="py-4 px-5 bg-[#D8C39E] hover:bg-[#C8B28E] text-[#1E1B18] border border-[#C8B28E] text-xs font-medium uppercase tracking-[0.18em] transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                  >
                    <Zap className="w-4 h-4 text-[#1E1B18]" />
                    <span>Buy Now — Rs. {(product.price * quantity).toLocaleString()}</span>
                  </button>
                </div>

                {/* Secondary Wishlist & Care Actions */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    type="button"
                    onClick={(e) => onToggleWishlist(product, e)}
                    className="inline-flex items-center gap-2 text-xs text-[#6E6459] hover:text-[#1E1B18] transition-colors cursor-pointer py-1"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        isWishlisted ? 'fill-[#D8C39E] text-[#1E1B18]' : ''
                      }`}
                    />
                    <span>{isWishlisted ? 'Saved in Your Wishlist' : 'Add to Wishlist'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onOpenCareGuide}
                    className="inline-flex items-center gap-1.5 text-xs text-[#8C7355] hover:text-[#1E1B18] transition-colors cursor-pointer py-1"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Jewelry Care &amp; Sizing</span>
                  </button>
                </div>
              </div>

              {/* Additional Detail Tabs (Craftsmanship, Packaging, Shipping) */}
              <div className="border-t border-[#EAE3D9] pt-5">
                <div className="flex border-b border-[#EAE3D9] mb-4">
                  <button
                    type="button"
                    onClick={() => setActiveTab('description')}
                    className={`pb-2.5 pr-4 text-xs uppercase tracking-wider transition-colors cursor-pointer border-b-2 -mb-px ${
                      activeTab === 'description'
                        ? 'border-[#1E1B18] text-[#1E1B18] font-medium'
                        : 'border-transparent text-[#787066] hover:text-[#1E1B18]'
                    }`}
                  >
                    Craftsmanship
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('specifications')}
                    className={`pb-2.5 px-4 text-xs uppercase tracking-wider transition-colors cursor-pointer border-b-2 -mb-px ${
                      activeTab === 'specifications'
                        ? 'border-[#1E1B18] text-[#1E1B18] font-medium'
                        : 'border-transparent text-[#787066] hover:text-[#1E1B18]'
                    }`}
                  >
                    Packaging
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('shipping')}
                    className={`pb-2.5 pl-4 text-xs uppercase tracking-wider transition-colors cursor-pointer border-b-2 -mb-px ${
                      activeTab === 'shipping'
                        ? 'border-[#1E1B18] text-[#1E1B18] font-medium'
                        : 'border-transparent text-[#787066] hover:text-[#1E1B18]'
                    }`}
                  >
                    Delivery &amp; Returns
                  </button>
                </div>

                <div className="text-xs text-[#5E564D] leading-relaxed min-h-[72px]">
                  {activeTab === 'description' && (
                    <p>
                      Hand-finished in our Lahore atelier using hypoallergenic, nickel-free precious metals and ethically sourced stones. Engineered for lasting brilliance and comfortable all-day wear.
                    </p>
                  )}
                  {activeTab === 'specifications' && (
                    <p>
                      Arrives in a signature Solaria velvet heirloom keepsake box with an anti-tarnish suede pouch, polishing cloth, and signed Certificate of Authenticity. Complimentary gift wrapping included.
                    </p>
                  )}
                  {activeTab === 'shipping' && (
                    <p>
                      Insured nationwide delivery across Pakistan within 2–4 business days. Complimentary shipping on orders above Rs. 5,000. Hassle-free 7-day exchange and return guarantee.
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Trust & Atelier Guarantees Footer inside Card */}
            <div className="mt-6 pt-5 border-t border-[#EAE3D9] grid grid-cols-3 gap-2 text-center text-[11px] text-[#5E564D]">
              <div className="flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-[#8C7355] stroke-[1.5]" />
                <span>Fast Pakistan Delivery</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <Award className="w-4 h-4 text-[#8C7355] stroke-[1.5]" />
                <span>100% Authentic Vermeil</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-[#8C7355] stroke-[1.5]" />
                <span>7-Day Easy Exchange</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Related Creations Section ("You May Also Adore") */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20 pt-14 border-t border-[#EAE3D9]">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7355] block mb-1.5">
              Curated Recommendations
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1E1B18] font-normal">
              You May Also Adore
            </h2>
          </div>
          <button
            onClick={onBackToShop}
            className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#1E1B18] hover:text-[#8C7355] border-b border-[#C8B28E] pb-1 cursor-pointer self-start sm:self-auto"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Full Catalog</span>
          </button>
        </div>

        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8">
          {relatedProducts.map((relProd) => (
            <ProductCard
              key={relProd.id}
              product={relProd}
              isWishlisted={wishlist.some((w) => w.id === relProd.id)}
              onToggleWishlist={onToggleWishlist}
              onAddToCart={(p) => onAddToCart(p, 1)}
              onQuickView={(p) => onSelectProduct(p)}
            />
          ))}
        </div>
      </section>
    </div>
  );
};
