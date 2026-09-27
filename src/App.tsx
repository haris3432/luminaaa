import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CategoryNav } from './components/CategoryNav';
import { ProductCard } from './components/ProductCard';
import { ProductDetailPage } from './components/ProductDetailPage';
import { ProductQuickView } from './components/ProductQuickView';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { StoryAndProof } from './components/StoryAndProof';
import { JewelryCareModal } from './components/JewelryCareModal';
import { Footer } from './components/Footer';

import { PRODUCTS } from './data/jewelryData';
import { CategoryId, Product, CartItem, Order } from './types/jewelry';
import { Search, ArrowUpDown, X, CheckCircle2, Sparkles } from 'lucide-react';

export default function App() {
  // Category & search state
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [mobileGridCols, setMobileGridCols] = useState<3 | 4>(3);

  // Dedicated Product Detail Page state & Drawers/Modals
  const [activeProductPage, setActiveProductPage] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isCareGuideOpen, setIsCareGuideOpen] = useState(false);
  const [selectedProductForQuickView, setSelectedProductForQuickView] = useState<Product | null>(null);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Promo code
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Cart state persisted to localStorage
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('solaria_jewelry_cart_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [
      {
        product: PRODUCTS[0], // Zircon Solitaire Ring
        quantity: 1,
        selectedSize: 'Size 7 (Standard)',
      },
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('solaria_jewelry_cart_v1', JSON.stringify(cart));
    } catch {
      // ignore
    }
  }, [cart]);

  // Wishlist state persisted to localStorage
  const [wishlist, setWishlist] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('solaria_jewelry_wishlist_v1');
      if (saved) return JSON.parse(saved);
    } catch {
      // ignore
    }
    return [PRODUCTS[1]]; // Layered Gold Choker in wishlist by default
  });

  useEffect(() => {
    try {
      localStorage.setItem('solaria_jewelry_wishlist_v1', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const toggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed "${product.name}" from your wishlist.`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to your wishlist.`);
    }
  };

  const cartCount = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  // Pricing calculations
  const FREE_SHIPPING_THRESHOLD = 5000;
  const STANDARD_DELIVERY_FEE = 250;

  const subtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [cart]);

  const deliveryFee = useMemo(() => {
    if (cart.length === 0) return 0;
    return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_DELIVERY_FEE;
  }, [cart, subtotal]);

  const discount = useMemo(() => {
    if (appliedPromo === 'SOLARIA10' || appliedPromo === 'BOTANICA10' || appliedPromo === 'LUMINA10') {
      return Math.round(subtotal * 0.1);
    }
    if (appliedPromo === 'WELCOME') {
      return Math.min(500, subtotal);
    }
    return 0;
  }, [appliedPromo, subtotal]);

  const grandTotal = Math.max(0, subtotal - discount + deliveryFee);

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, selectedSize?: string) => {
    setCart((prev) => {
      const sizeToUse = selectedSize || (product.category === 'rings' || product.category === 'silver-rings' ? 'Size 7 (Standard)' : 'Standard');
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedSize === sizeToUse
      );

      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }

      return [
        ...prev,
        {
          product,
          quantity,
          selectedSize: sizeToUse,
        },
      ];
    });

    showToast(`Added "${product.name}" to your shopping bag.`);
  };

  const handleBuyNow = (product: Product, quantity = 1, selectedSize?: string) => {
    handleAddToCart(product, quantity, selectedSize);
    setIsCheckoutOpen(true);
  };

  const handleOpenProductPage = (product: Product) => {
    setActiveProductPage(product);
  };

  const handleBackToShop = () => {
    setActiveProductPage(null);
    setTimeout(() => {
      const el = document.getElementById('catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 30);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from shopping bag.');
  };

  const handleApplyPromo = (code: string) => {
    if (code === 'SOLARIA10' || code === 'BOTANICA10' || code === 'LUMINA10' || code === 'WELCOME') {
      setAppliedPromo(code);
      showToast(`Promo code "${code}" applied!`);
      return true;
    }
    return false;
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    showToast('Promo code removed.');
  };

  const handleOrderConfirmed = (order: Order) => {
    setCompletedOrder(order);
    setIsCheckoutOpen(false);
    setCart([]);
    showToast(`Order #${order.id} confirmed! Thank you.`);
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesDesc = product.description.toLowerCase().includes(q);
        const matchesMaterial = product.material.toLowerCase().includes(q);
        const matchesTag = product.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesName && !matchesDesc && !matchesMaterial && !matchesTag) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (a.isBestSeller && !b.isBestSeller) return -1;
      if (!a.isBestSeller && b.isBestSeller) return 1;
      return 0;
    });
  }, [selectedCategory, searchQuery, sortBy]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1E1B18] selection:bg-[#EAE0D0] selection:text-[#1E1B18]">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1E1B18] text-[#FAF8F5] px-4 py-3 shadow-xl border border-[#C8B28E] flex items-center gap-2.5 text-xs animate-in slide-in-from-bottom-3 duration-200">
          <CheckCircle2 className="w-4 h-4 text-[#D8C39E] shrink-0" />
          <span className="tracking-wide">{toastMessage}</span>
          <button
            onClick={() => setToastMessage(null)}
            className="text-[#C8B28E] hover:text-white ml-2 cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Minimalist Uncluttered Header & Expandable Live Search */}
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          setActiveProductPage(null);
        }}
        onQuickView={(p) => handleOpenProductPage(p)}
        onAddToCart={handleAddToCart}
        onOpenCareGuide={() => setIsCareGuideOpen(true)}
        onGoHome={() => {
          setActiveProductPage(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      <main className="flex-1">
        {activeProductPage ? (
          <ProductDetailPage
            product={activeProductPage}
            onBackToShop={handleBackToShop}
            onSelectCategory={(catId) => {
              setSelectedCategory(catId);
              setActiveProductPage(null);
            }}
            onSelectProduct={(p) => handleOpenProductPage(p)}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            isWishlisted={wishlist.some((p) => p.id === activeProductPage.id)}
            onToggleWishlist={toggleWishlist}
            wishlist={wishlist}
            onOpenCareGuide={() => setIsCareGuideOpen(true)}
          />
        ) : (
          <>
            {/* Editorial Hero Banner matching the user's reference photo */}
            <Hero
              onExploreClick={() => scrollTo('catalog')}
              onStoryClick={() => scrollTo('story')}
            />

            {/* 5-Card Visual Category Row matching the user's reference photo */}
            <CategoryNav
              selectedCategory={selectedCategory}
              onSelectCategory={(catId) => {
                setSelectedCategory(catId);
                scrollTo('catalog');
              }}
            />

            {/* Diverse Product Catalog Section */}
            <section id="catalog" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              
              {/* Header & Filter Controls */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 pb-5 border-b border-[#EAE3D9]">
                <div>
                  <span className="text-[11px] uppercase tracking-[0.25em] text-[#8C7355] block mb-1.5">
                    Solaria Fine Jewelry &amp; Prêt Accessories
                  </span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1B18] font-normal tracking-tight">
                    {selectedCategory === 'all'
                      ? 'Curated Collection'
                      : `${selectedCategory.replace('-', ' ').replace(/\b\w/g, (l) => l.toUpperCase())}`}
                  </h2>
                </div>

                {/* Filter & Sorting */}
                <div className="flex flex-wrap items-center gap-3">
                  {(selectedCategory !== 'all' || searchQuery) && (
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="text-xs text-[#6E6459] hover:text-[#1E1B18] flex items-center gap-1 border-b border-[#C8B28E] pb-0.5 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Reset Filters</span>
                    </button>
                  )}

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2 bg-white border border-[#DED5C8] px-3.5 py-2 text-xs text-[#1E1B18]">
                    <ArrowUpDown className="w-3.5 h-3.5 text-[#8C7355]" />
                    <span className="text-[#6E6459] hidden sm:inline">Sort:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as any)}
                      className="bg-transparent text-xs text-[#1E1B18] font-medium focus:outline-none cursor-pointer"
                    >
                      <option value="featured">Featured / Bestsellers</option>
                      <option value="price-asc">Price: Low to High</option>
                      <option value="price-desc">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>

                  {/* Mobile Grid Density Switcher (3 or 4 per row on mobile, strictly 3 on desktop) */}
                  <div className="flex sm:hidden items-center bg-white border border-[#DED5C8] p-0.5 text-[11px]">
                    <button
                      type="button"
                      onClick={() => setMobileGridCols(3)}
                      className={`px-2 py-1 transition-colors cursor-pointer ${
                        mobileGridCols === 3
                          ? 'bg-[#1E1B18] text-[#FAF8F5] font-medium'
                          : 'text-[#6E6459]'
                      }`}
                    >
                      3 / Row
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileGridCols(4)}
                      className={`px-2 py-1 transition-colors cursor-pointer ${
                        mobileGridCols === 4
                          ? 'bg-[#1E1B18] text-[#FAF8F5] font-medium'
                          : 'text-[#6E6459]'
                      }`}
                    >
                      4 / Row
                    </button>
                  </div>

                  {/* Items Counter */}
                  <span className="text-xs text-[#6E6459] bg-[#F3EDE3] px-3 py-2 border border-[#EAE3D9] tabular-nums">
                    {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
                  </span>
                </div>
              </div>

              {/* Active Search Filter Banner */}
              {searchQuery && (
                <div className="mb-6 p-3.5 bg-[#F3EDE3] border border-[#DED5C8] flex items-center justify-between text-xs text-[#1E1B18]">
                  <span>
                    Search results for "<strong className="font-medium">{searchQuery}</strong>": Showing {filteredProducts.length} pieces
                  </span>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-[#8C7355] hover:text-[#1E1B18] underline cursor-pointer"
                  >
                    Clear Search
                  </button>
                </div>
              )}

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="py-20 text-center bg-white border border-[#EAE3D9] p-8">
                  <Search className="w-10 h-10 text-[#B89B72] mx-auto mb-3 stroke-[1.5]" />
                  <h3 className="font-serif text-2xl text-[#1E1B18] mb-2 font-normal">No pieces found</h3>
                  <p className="text-xs text-[#6E6459] max-w-sm mx-auto mb-5 leading-relaxed">
                    We couldn't locate any creations matching your search keywords. Try searching for "solitaire", "emerald", "choker", "toe rings", or "velvet".
                  </p>
                  <button
                    onClick={() => {
                      setSelectedCategory('all');
                      setSearchQuery('');
                    }}
                    className="px-6 py-3 bg-[#D8C39E] hover:bg-[#C8B28E] text-[#1E1B18] text-xs font-medium uppercase tracking-wider cursor-pointer"
                  >
                    View Full Catalog
                  </button>
                </div>
              ) : (
                <div
                  className={`grid ${
                    mobileGridCols === 4 ? 'grid-cols-4' : 'grid-cols-3'
                  } sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-6 lg:gap-8`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isWishlisted={wishlist.some((p) => p.id === product.id)}
                      onToggleWishlist={toggleWishlist}
                      onAddToCart={(p) => handleAddToCart(p, 1)}
                      onQuickView={(p) => handleOpenProductPage(p)}
                    />
                  ))}
                </div>
              )}

              {/* Bottom Catalog Concierge Banner */}
              <div className="mt-16 p-6 sm:p-8 bg-[#F3EDE3] border border-[#EAE3D9] flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#8C7355] mb-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#B89B72]" />
                    Atelier Concierge Service
                  </div>
                  <h3 className="font-serif text-2xl text-[#1E1B18] font-normal mb-1">
                    Custom Ring Sizing or Gift Box Requests?
                  </h3>
                  <p className="text-xs text-[#5E564D] max-w-xl leading-relaxed">
                    Our Lahore atelier provides complimentary size adjustments, hand-calligraphed notes, and signature velvet keepsake chests.
                  </p>
                </div>
                <div className="flex gap-3 shrink-0">
                  <button
                    onClick={() => setIsCareGuideOpen(true)}
                    className="px-5 py-3 bg-white border border-[#DED5C8] hover:border-[#1E1B18] text-xs font-medium text-[#1E1B18] uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Ring Size Chart
                  </button>
                  <a
                    href="https://wa.me/923008472910"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-3 bg-[#D8C39E] hover:bg-[#C8B28E] text-[#1E1B18] text-xs font-medium uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    WhatsApp Atelier
                  </a>
                </div>
              </div>
            </section>

            {/* Brand Story & Social Proof with Customer Reviews Carousel & Trust Values */}
            <StoryAndProof />
          </>
        )}
      </main>

      {/* Footer with Contact Info, Address & Quick Store Links */}
      <Footer
        onSelectCategory={(catId) => {
          setSelectedCategory(catId);
          setActiveProductPage(null);
          setTimeout(() => scrollTo('catalog'), 40);
        }}
        onOpenCareGuide={() => setIsCareGuideOpen(true)}
      />

      {/* Slide-Over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        appliedPromo={appliedPromo}
        onApplyPromo={handleApplyPromo}
        onRemovePromo={handleRemovePromo}
      />

      {/* Slide-Over Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlist={wishlist}
        onRemoveFromWishlist={(id) => {
          setWishlist((prev) => prev.filter((p) => p.id !== id));
          showToast('Removed from wishlist.');
        }}
        onMoveToCart={(product) => {
          handleAddToCart(product, 1);
          setIsCartOpen(true);
        }}
        onQuickView={(p) => {
          setIsWishlistOpen(false);
          handleOpenProductPage(p);
        }}
      />

      {/* Multi-Step Checkout Modal with Manual Bank Transfer & Screenshot Proof */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        subtotal={subtotal}
        deliveryFee={deliveryFee}
        discount={discount}
        total={grandTotal}
        onOrderConfirmed={handleOrderConfirmed}
      />

      {/* Unique Order Success Popup ID Modal */}
      <OrderSuccessModal
        order={completedOrder}
        onClose={() => setCompletedOrder(null)}
      />

      {/* Product Quick-View Modal */}
      <ProductQuickView
        product={selectedProductForQuickView}
        onClose={() => setSelectedProductForQuickView(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={selectedProductForQuickView ? wishlist.some((p) => p.id === selectedProductForQuickView.id) : false}
        onToggleWishlist={(p) => toggleWishlist(p)}
      />

      {/* Jewelry Care & Ring Sizing Guide Modal */}
      <JewelryCareModal
        isOpen={isCareGuideOpen}
        onClose={() => setIsCareGuideOpen(false)}
      />

    </div>
  );
}
