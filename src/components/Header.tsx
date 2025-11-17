import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, ShoppingCart, ChevronDown } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import SearchModal from './SearchModal';

const marqueeTexts = [
  'BLACK WEEK IS HERE! TAKE ADVANTAGE OF EXCEPTIONAL OFFERS',
  'BLACK WEEK IS HERE! TAKE ADVANTAGE OF EXCEPTIONAL OFFERS',
  'BLACK WEEK IS HERE! TAKE ADVANTAGE OF EXCEPTIONAL OFFERS',
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isVhiveOpen, setIsVhiveOpen] = useState(false);
  const [isPartnersOpen, setIsPartnersOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const location = useLocation();
  const { state, dispatch } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const getTotalItems = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <>
      {/* Announcement Bar */}
      <div className={`
        bg-black text-white py-3 overflow-hidden text-xs font-bold tracking-wider
        transition-all duration-300 ease-in-out fixed top-0 left-0 right-0 z-50
        ${isScrolled ? 'max-h-0 py-0 opacity-0' : 'max-h-12 opacity-100'}
      `}>
        <div className="flex w-max animate-scroll">
          {[...marqueeTexts, ...marqueeTexts, ...marqueeTexts].map((text, index) => (
            <span key={index} className="mx-16 whitespace-nowrap">
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* Main Navigation */}
      <header className={`
        bg-slate-900 border-b border-slate-500 /* <-- MUDANÇA: Cor do Header */
        transition-all duration-300 ease-in-out
        ${isScrolled
          ? 'fixed top-0 left-0 right-0 z-40'
          : 'fixed left-0 right-0 z-40'
        }
        ${isScrolled ? 'top-0' : 'top-10'}
      `}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/logo.png"
                alt="Logo"
                className="h-12 w-auto object-contain"
              />
            </Link>

            {/* Navigation Links */}
            <nav className="hidden md:flex items-center space-x-8 relative">
              <button
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
                className="font-semibold text-white hover:text-gray-300 transition-colors relative group" /* <-- MUDANÇA: Cor do Texto */
              >
                SHOP
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-white transform transition-transform ${isShopOpen ? 'scale-x-100' : 'scale-x-0'}`}></span> {/* <-- MUDANÇA: Cor do Sublinhado */}
              </button>
              <Link
                to="/games"
                className="font-semibold text-white hover:text-gray-300 transition-colors" /* <-- MUDANÇA: Cor do Texto */
              >
                TEAMS
              </Link>

              {/* V.HIVE Dropdown */}
              <div
                onMouseEnter={() => setIsVhiveOpen(true)}
                onMouseLeave={() => setIsVhiveOpen(false)}
                className="relative"
              >
                <button className="font-semibold text-white hover:text-gray-300 transition-colors flex items-center gap-1"> {/* <-- MUDANÇA: Cor do Texto */}
                  V.HIVE
                  <ChevronDown className={`h-4 w-4 transition-transform ${isVhiveOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`
                  absolute top-full left-0 bg-white border border-gray-200 rounded shadow-lg
                  transition-all duration-300 ease-in-out z-50
                  ${isVhiveOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none max-h-0'}
                  mt-2 min-w-48 overflow-hidden
                `}>
                  <ul className="py-2">
                    <li>
                      <Link to="/vhive/paris" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm font-medium">
                        V.Hive Paris
                      </Link>
                    </li>
                    <li>
                      <Link to="/vhive/bootcamp" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm font-medium">
                        V.Bootcamp
                      </Link>
                    </li>
                    <li>
                      <Link to="/vhive/shop" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm font-medium">
                        V.Shop
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* PARTNERS Dropdown */}
              <div
                onMouseEnter={() => setIsPartnersOpen(true)}
                onMouseLeave={() => setIsPartnersOpen(false)}
                className="relative"
              >
                <button className="font-semibold text-white hover:text-gray-300 transition-colors flex items-center gap-1"> {/* <-- MUDANÇA: Cor do Texto */}
                  PARTNERS
                  <ChevronDown className={`h-4 w-4 transition-transform ${isPartnersOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`
                  absolute top-full left-0 bg-white border border-gray-200 rounded shadow-lg
                  transition-all duration-300 ease-in-out z-50
                  ${isPartnersOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none max-h-0'}
                  mt-2 min-w-48 overflow-hidden
                `}>
                  <ul className="py-2">
                    <li>
                      <Link to="/partners/esports" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm font-medium">
                        Esports Partners
                      </Link>
                    </li>
                    <li>
                      <Link to="/partners/brands" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm font-medium">
                        Brand Partners
                      </Link>
                    </li>
                    <li>
                      <Link to="/partners/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm font-medium">
                        Contact Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ABOUT Dropdown */}
              <div
                onMouseEnter={() => setIsAboutOpen(true)}
                onMouseLeave={() => setIsAboutOpen(false)}
                className="relative"
              >
                <button className="font-semibold text-white hover:text-gray-300 transition-colors flex items-center gap-1"> {/* <-- MUDANÇA: Cor do Texto */}
                  ABOUT
                  <ChevronDown className={`h-4 w-4 transition-transform ${isAboutOpen ? 'rotate-180' : ''}`} />
                </button>
                <div className={`
                  absolute top-full left-0 bg-white border border-gray-200 rounded shadow-lg
                  transition-all duration-300 ease-in-out z-50
                  ${isAboutOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none max-h-0'}
                  mt-2 min-w-48 overflow-hidden
                `}>
                  <ul className="py-2">
                    <li>
                      <Link to="/about/company" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm font-medium">
                        About Us
                      </Link>
                    </li>
                    <li>
                      <Link to="/about/story" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm font-medium">
                        Our Story
                      </Link>
                    </li>
                    <li>
                      <Link to="/about/contact" className="block px-4 py-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors text-sm font-medium">
                        Contact
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            {/* Right Side Icons */}
            <div className="flex items-center space-x-4">
              <button className="hidden md:flex items-center gap-1 text-sm font-semibold text-white hover:text-gray-300 transition-colors"> {/* <-- MUDANÇA: Cor do Texto */}
                ENGLISH
                <ChevronDown className="h-4 w-4" />
              </button>
              <button onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5 text-white hover:text-gray-300 cursor-pointer transition-colors" /> {/* <-- MUDANÇA: Cor do Texto */}
              </button>
              <Link to="/login">
                <User className="h-5 w-5 text-white hover:text-gray-300 cursor-pointer transition-colors" /> {/* <-- MUDANÇA: Cor do Texto */}
              </Link>
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="relative"
              >
                <ShoppingCart className="h-5 w-5 text-white hover:text-gray-300 cursor-pointer transition-colors" /> {/* <-- MUDANÇA: Cor do Texto */}
                {getTotalItems() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"> {/* <-- MUDANÇA: Cor do Badge */}
                    {getTotalItems()}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mega Menu */}
        <div
          onMouseEnter={() => setIsShopOpen(true)}
          onMouseLeave={() => setIsShopOpen(false)}
          className={`
            bg-white border-t border-gray-200 shadow-lg
            transition-all duration-300 ease-in-out
            ${isShopOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'}
            overflow-hidden
          `}
        >
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="grid grid-cols-12 gap-8">
              {/* Categories Column */}
              <div className="col-span-2">
                <h3 className="font-bold text-gray-900 mb-4 text-sm tracking-wider">
                  CATEGORIES
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      Jerseys
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      New products
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      Esports
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      Lifestyle
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      Esports Sleeves
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      Accessories
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      Outlet
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      Digital Items
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      All Products
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Latest Trends Column */}
              <div className="col-span-2">
                <h3 className="font-bold text-gray-900 mb-4 text-sm tracking-wider">
                  LATEST TRENDS
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      KARE
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      Alternate 2025
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      Pro Jersey 2025
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      Vitality x Golden Hornets
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      V.University
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      Essentials 2025
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      Travel Kit 2025
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      Fan Pack 2025
                    </Link>
                  </li>
                  <li>
                    <Link to="/products" className="text-gray-700 hover:text-gray-900 text-sm font-medium transition-colors">
                      Gift Card
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Featured Image 1 */}
              <div className="col-span-4">
                <Link to="/products/1" className="group block">
                  <div className="relative aspect-[3/4] rounded overflow-hidden">
                    <img
                      src="/dps.png"
                      alt="Check our jerseys"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-bold text-sm tracking-wider">
                        CHECK OUR JERSEYS
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Featured Image 2 */}
              <div className="col-span-4">
                <Link to="/products" className="group block">
                  <div className="relative aspect-[3/4] rounded overflow-hidden bg-black">
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                      <h3 className="text-white font-bold text-4xl mb-2">
                        BLACK WEEK
                      </h3>
                      <p className="text-white text-5xl font-bold mb-4">-70%</p>
                      <div className="border-2 border-yellow-400 text-yellow-400 px-4 py-2 rounded-full text-xs font-bold tracking-wider">
                        &gt; EXCLUSIVE JERSEY BUNDLES AVAILABLE
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <p className="text-white font-bold text-sm tracking-wider">
                        THE BEST DEALS!
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer to prevent content from hiding under fixed header */}
      <div className={isScrolled ? 'h-20' : 'h-32'}></div>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
};

export default Header;