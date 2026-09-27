import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingBag, 
  Search, 
  X, 
  Heart, 
  ChevronDown, 
  Sparkles, 
  ArrowRight,
  Plus
} from 'lucide-react';
import { CategoryId, Product } from '../types/jewelry';
import { CATEGORIES, PRODUCTS } from '../data/jewelryData';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedCategory: CategoryId;
  onSelectCategory: (category: CategoryId) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenCareGuide: () => void;
  onGoHome?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  searchQuery,
  onSearchChange,
  selectedCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart,
  onOpenCareGuide,
  onGoHome,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);
  const [searchCategoryFilter, setSearchCategoryFilter] = useState<CategoryId>('all');

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const menuContainerRef = useRef<HTMLDivElement>(null);

  // Close search suggestions & compact vertical menu on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchDropdownOpen(false);
      }
      if (menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Auto-focus search input when search bar opens
  useEffect(() => {
    if (isSearchBarVisible && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchBarVisible]);

  // Compute live search suggestions & quick preview cards
  const liveSearchResults = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return PRODUCTS.filter((product) => {
      if (searchCategoryFilter !== 'all' && product.category !== searchCategoryFilter) {
        return false;
      }
      const matchName = product.name.toLowerCase().includes(q);
      const matchMaterial = product.material.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchTag = product.tags.some((t) => t.toLowerCase().includes(q));
      return matchName || matchMaterial || matchDesc || matchTag;
    }).slice(0, 5);
  }, [searchQuery, searchCategoryFilter]);

  const navLinks = [
    { label: 'Shop Collection', href: '#catalog' },
    { label: 'Categories', href: '#categories' },
    { label: 'Our Story', href: '#story' },
    { label: 'Reviews', href: '#reviews' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D9] transition-all">
      {/* Top Minimal Announcement Strip (Exact Match to Reference) */}
      <div className="bg-[#F2ECE1] text-[#6E6459] text-[11px] sm:text-xs py-2 px-4 text-center tracking-wide font-normal">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3">
          <Sparkles className="w-3 h-3 text-[#B89B72] shrink-0" />
          <span>100% Authentic</span>
          <span className="text-[#C8B28E]">•</span>
          <span>Premium Quality</span>
          <span className="text-[#C8B28E]">•</span>
          <span>Made for You</span>
        </div>
      </div>

      {/* Main Uncluttered 3-Column Header Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 h-20 grid grid-cols-3 items-center">
        
        {/* Left: Clean Hamburger Icon + Compact Rounded Vertical Menu + Subtle Search Toggle */}
        <div className="flex items-center gap-3 sm:gap-5 justify-self-start">
          <div ref={menuContainerRef} className="relative">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation menu"
              aria-expanded={isMenuOpen}
              className="p-1.5 text-[#1E1B18] hover:text-[#8C7355] transition-colors focus:outline-none cursor-pointer flex items-center justify-center rounded-lg hover:bg-[#F2ECE1]/70"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.5]" />
              ) : (
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <line x1="3" y1="7" x2="21" y2="7" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="17" x2="21" y2="17" />
                </svg>
              )}
            </button>

            {/* Compact Rounded Vertical Menu (Short & Neat, Anchored Top-Left) */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-[#FAF8F5] border border-[#DED5C8] rounded-2xl shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex flex-col space-y-0.5">
                  {navLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => {
                        setIsMenuOpen(false);
                        if (onGoHome) onGoHome();
                      }}
                      className="font-serif text-sm text-[#1E1B18] hover:text-[#8C7355] hover:bg-[#F2ECE1] px-3 py-1.5 rounded-xl transition-colors flex items-center justify-between"
                    >
                      <span>{link.label}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-[#B89B72]" />
                    </a>
                  ))}
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenCareGuide();
                    }}
                    className="w-full text-left font-serif text-sm text-[#8C7355] hover:text-[#1E1B18] hover:bg-[#F2ECE1] px-3 py-1.5 rounded-xl transition-colors cursor-pointer flex items-center justify-between border-t border-[#EAE3D9] mt-1 pt-2"
                  >
                    <span className="inline-flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
                      <span>Size &amp; Care Guide</span>
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#B89B72]" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsSearchBarVisible(!isSearchBarVisible)}
            aria-label="Toggle live search"
            className="p-1.5 text-[#1E1B18] hover:text-[#8C7355] transition-colors focus:outline-none cursor-pointer flex items-center gap-1.5"
            title="Search Catalog"
          >
            <Search className="w-5 h-5 stroke-[1.5]" />
            <span className="hidden lg:inline text-xs tracking-widest uppercase text-[#6E6459] hover:text-[#1E1B18]">
              Search
            </span>
          </button>
        </div>

        {/* Center: SOLARIA Brand Wordmark (Unchanged Name, Reference Typography Style) */}
        <div className="justify-self-center text-center">
          <a
            href="#"
            onClick={(e) => {
              if (onGoHome) {
                e.preventDefault();
                onGoHome();
              }
            }}
            className="inline-flex flex-col items-center focus:outline-none group"
          >
            <span className="font-serif text-2xl sm:text-3xl md:text-[34px] font-normal tracking-[0.22em] text-[#1E1B18] group-hover:text-[#8C7355] transition-colors leading-none">
              SOLARIA
            </span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.34em] text-[#6E6459] uppercase font-normal mt-1.5">
              LUXURY PRÊT • PAKISTAN
            </span>
          </a>
        </div>

        {/* Right: Minimal Icons (Wishlist, Shopping Bag) */}
        <div className="flex items-center gap-3 sm:gap-5 justify-self-end">

          {/* Wishlist Heart */}
          <button
            onClick={onOpenWishlist}
            aria-label={`Wishlist with ${wishlistCount} items`}
            className="relative p-1.5 text-[#1E1B18] hover:text-[#8C7355] transition-colors cursor-pointer"
            title="Saved Wishlist"
          >
            <Heart className={`w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[1.5] ${wishlistCount > 0 ? 'fill-[#D8C39E] text-[#1E1B18]' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#D8C39E] text-[#1E1B18] text-[9px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Bag */}
          <button
            onClick={onOpenCart}
            aria-label={`Shopping bag with ${cartCount} items`}
            className="relative p-1.5 text-[#1E1B18] hover:text-[#8C7355] transition-colors focus:outline-none cursor-pointer"
            title="Shopping Bag"
          >
            <ShoppingBag className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-[#1E1B18] text-[#FAF8F5] text-[9px] font-medium w-4 h-4 rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>

      {/* Expandable Live Search Bar (Cleanly tucked unless clicked or active) */}
      {(isSearchBarVisible || searchQuery.trim().length > 0) && (
        <div ref={searchContainerRef} className="border-t border-[#EAE3D9] bg-[#FDFBF7] px-4 py-3 animate-in fade-in duration-150">
          <div className="max-w-3xl mx-auto relative">
            <div className="flex items-center bg-white border border-[#DED5C8] focus-within:border-[#1E1B18] transition-colors">
              
              {/* Category Filter Dropdown */}
              <div className="relative border-r border-[#EAE3D9] bg-[#F7F3EB]">
                <select
                  value={searchCategoryFilter}
                  onChange={(e) => setSearchCategoryFilter(e.target.value as CategoryId)}
                  className="text-xs text-[#1E1B18] bg-transparent py-2.5 pl-3 pr-7 appearance-none focus:outline-none cursor-pointer"
                >
                  <option value="all">All Categories</option>
                  {CATEGORIES.filter((c) => c.id !== 'all').map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-[#8C7355] absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Search Input */}
              <div className="flex-1 flex items-center px-3.5 py-2">
                <Search className="w-4 h-4 text-[#8C7355] mr-2.5 shrink-0" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search solitaire ring, emerald drop, baroque pearl, choker..."
                  value={searchQuery}
                  onFocus={() => setIsSearchDropdownOpen(true)}
                  onChange={(e) => {
                    onSearchChange(e.target.value);
                    setIsSearchDropdownOpen(true);
                  }}
                  className="w-full text-xs sm:text-sm text-[#1E1B18] bg-transparent focus:outline-none placeholder:text-[#9C9286]"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    aria-label="Clear search"
                    className="text-[#8C7355] hover:text-[#1E1B18] p-1 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                onClick={() => {
                  setIsSearchBarVisible(false);
                  setIsSearchDropdownOpen(false);
                }}
                className="px-3 py-2 text-xs text-[#6E6459] hover:text-[#1E1B18] border-l border-[#EAE3D9] cursor-pointer"
              >
                Close
              </button>
            </div>

            {/* Live Search Suggestions Dropdown */}
            {isSearchDropdownOpen && searchQuery.trim().length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-[#DED5C8] shadow-xl z-50 overflow-hidden">
                <div className="px-4 py-2 bg-[#F7F3EB] border-b border-[#EAE3D9] flex items-center justify-between text-xs text-[#6E6459]">
                  <span>
                    {liveSearchResults.length > 0
                      ? `Showing ${liveSearchResults.length} matching creations`
                      : 'No direct matches'}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-[#8C7355]">
                    Live Preview
                  </span>
                </div>

                {liveSearchResults.length > 0 ? (
                  <div className="divide-y divide-[#F2ECE1] max-h-80 overflow-y-auto">
                    {liveSearchResults.map((prod) => (
                      <div
                        key={prod.id}
                        className="p-3 hover:bg-[#FAF8F5] flex items-center justify-between gap-3 transition-colors cursor-pointer group"
                        onClick={() => {
                          onQuickView(prod);
                          setIsSearchDropdownOpen(false);
                        }}
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 object-cover border border-[#EAE3D9]"
                          />
                          <div>
                            <h4 className="font-serif text-base text-[#1E1B18] group-hover:text-[#8C7355] line-clamp-1">
                              {prod.name}
                            </h4>
                            <span className="text-[11px] text-[#787066] uppercase tracking-wider">
                              {prod.category.replace('-', ' ')} · {prod.material.split('&')[0]}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-serif text-sm font-medium text-[#1E1B18] tabular-nums">
                            Rs. {prod.price.toLocaleString()}
                          </span>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onAddToCart(prod);
                              setIsSearchDropdownOpen(false);
                            }}
                            className="p-2 bg-[#D8C39E] hover:bg-[#C8B28E] text-[#1E1B18] transition-colors cursor-pointer"
                            title="Quick Add to Bag"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="p-2.5 bg-[#FAF8F5] text-center border-t border-[#EAE3D9]">
                      <a
                        href="#catalog"
                        onClick={() => setIsSearchDropdownOpen(false)}
                        className="text-xs text-[#1E1B18] hover:text-[#8C7355] underline inline-flex items-center gap-1"
                      >
                        <span>See all results for "{searchQuery}"</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-[#6E6459]">
                    No pieces found matching "{searchQuery}". Try "solitaire", "emerald", or "pearl".
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
