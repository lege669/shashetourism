import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, Menu, X, User, ChevronDown, Compass, LogOut, Code, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onLoginClick: () => void;
  isAdmin: boolean;
  onLogout: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  viewMode?: 'public' | 'admin';
  onToggleViewMode?: () => void;
}

export default function Navbar({ 
  onLoginClick, 
  isAdmin, 
  onLogout, 
  activeSection, 
  onNavigate,
  viewMode = 'public',
  onToggleViewMode
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { 
      id: 'attractions', 
      label: 'Attractions',
      dropdown: [
        { name: 'Wondo Genet Hot Springs', slug: 'wondo-genet' },
        { name: 'Rastafari Diaspora Museum', slug: 'rastafari-community' },
        { name: 'Senkele Swayne\'s Sanctuary', slug: 'senkele-sanctuary' },
        { name: 'Melka Oda Ancient Ruins', slug: 'melka-oda' }
      ]
    },
    { id: 'hotels', label: 'Hotels' },
    { id: 'restaurants', label: 'Restaurants' },
    { id: 'events', label: 'Events' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'news', label: 'News' },
    { 
      id: 'staff', 
      label: 'Staff',
      dropdown: [
        { name: 'Legese Tsegaye (ICT)', slug: 'legese-tsegaye' },
        { name: 'Aster Benti (Heritage)', slug: 'aster-benti' },
        { name: 'Marcus Reid (Diaspora)', slug: 'marcus-reid' }
      ]
    },
    { 
      id: 'more', 
      label: 'More',
      dropdown: [
        { name: 'Travel Planner Quiz', slug: 'quiz' },
        { name: 'About Ethiopia', slug: 'about' },
        { name: 'Local Advisory', slug: 'advisory' }
      ]
    }
  ];

  const handleLinkClick = (id: string, subSlug?: string) => {
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    if (subSlug) {
      onNavigate(`${id}-${subSlug}`);
    } else {
      onNavigate(id);
    }
  };

  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-neutral-950/95 shadow-xl py-3 border-b-2 border-orange-600' 
            : 'bg-neutral-900 border-b-2 border-orange-500 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Logo with 🏛️ icon - styled exactly like screenshot */}
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => handleLinkClick('home')}
            id="nav-logo"
          >
            <div className="bg-orange-600/10 p-1.5 rounded-lg border border-orange-500/20 group-hover:bg-orange-600/25 transition-all">
              <Landmark className="h-6 w-6 text-orange-500 group-hover:scale-110 transition-transform" />
            </div>
            <span className="font-sans text-xl font-bold tracking-tight text-white flex items-center gap-1">
              Shashemene <span className="text-orange-500 font-extrabold">Tourism</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <div 
                key={link.id} 
                className="relative"
                onMouseEnter={() => link.dropdown && setActiveDropdown(link.id)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  onClick={() => !link.dropdown && handleLinkClick(link.id)}
                  className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-all rounded-md ${
                    activeSection === link.id || activeSection.startsWith(link.id)
                      ? 'text-orange-500 bg-orange-500/5'
                      : 'text-neutral-300 hover:text-white hover:bg-neutral-800'
                  }`}
                >
                  {link.label}
                  {link.dropdown && (
                    <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${
                      activeDropdown === link.id ? 'rotate-180 text-orange-500' : ''
                    }`} />
                  )}
                </button>

                {/* Dropdown Menu */}
                {link.dropdown && activeDropdown === link.id && (
                  <div className="absolute top-full left-0 mt-1 w-60 bg-neutral-950 border border-neutral-800 rounded-lg shadow-2xl py-2 z-50 backdrop-blur-md">
                    {link.dropdown.map((sub, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleLinkClick(link.id, sub.slug)}
                        className="w-full text-left px-4 py-2 text-xs text-neutral-300 hover:text-white hover:bg-orange-600/10 hover:border-l-2 hover:border-orange-500 transition-colors"
                      >
                        {sub.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User Sign-In/Admin Status Option */}
          <div className="hidden xl:flex items-center gap-3">
            {isAdmin ? (
              <div className="flex items-center gap-2">
                {onToggleViewMode && (
                  <button
                    onClick={onToggleViewMode}
                    className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 font-mono text-[11px] px-2.5 py-1 rounded-full hover:bg-amber-500 hover:text-white transition-all cursor-pointer"
                  >
                    {viewMode === 'admin' ? 'View Public Site' : 'Admin Console'}
                  </button>
                )}
                <span className="flex items-center gap-1.5 bg-green-500/10 border border-green-500/20 text-green-400 font-mono text-[11px] px-2.5 py-1 rounded-full">
                  <ShieldCheck className="h-3 w-3" />
                  ICT Portal Active
                </span>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-neutral-800 hover:bg-red-950 hover:text-red-200 border border-neutral-700 hover:border-red-800 rounded-lg transition-all text-white cursor-pointer"
                  title="Logout from admin mode"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={onLoginClick}
                className="flex items-center gap-1.5 px-4 py-1.5 text-sm font-medium text-orange-400 border border-orange-500/40 hover:border-orange-500 hover:text-white hover:bg-orange-500/10 rounded-full transition-all duration-300 cursor-pointer"
                id="btn-login"
              >
                <User className="h-4 w-4 text-orange-500" />
                Login
              </button>
            )}
          </div>

          {/* Mobile hamburger menu */}
          <div className="xl:hidden flex items-center gap-3">
            {isAdmin && (
              <span className="flex items-center gap-1.5 bg-green-500/15 text-green-400 font-mono text-[10px] px-2 py-0.5 rounded-full border border-green-500/20">
                Admin
              </span>
            )}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1 rounded-lg hover:bg-neutral-800 text-white transition-all border border-transparent hover:border-neutral-700"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="xl:hidden fixed inset-x-0 z-40 bg-neutral-950 border-b border-orange-600 shadow-2xl overflow-y-auto max-h-[85vh] text-white"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <div key={link.id} className="space-y-1">
                  <button
                    onClick={() => !link.dropdown && handleLinkClick(link.id)}
                    className={`w-full text-left font-medium text-lg py-2 border-b border-neutral-900 ${
                      activeSection === link.id ? 'text-orange-500' : 'text-neutral-200'
                    }`}
                  >
                    {link.label}
                  </button>
                  {link.dropdown && (
                    <div className="pl-4 py-1.5 grid grid-cols-1 gap-2 border-l border-neutral-800 mt-1">
                      {link.dropdown.map((sub, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleLinkClick(link.id, sub.slug)}
                          className="text-left text-sm text-neutral-400 hover:text-white py-1 block"
                        >
                          → {sub.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 border-t border-neutral-800 flex flex-col gap-2">
                {isAdmin ? (
                  <>
                    <div className="text-xs text-green-400 font-mono mb-2 flex items-center gap-1.5 bg-green-500/5 p-2 rounded-lg">
                      <ShieldCheck className="h-4 w-4" /> Logged in as Legese Tsegaye (ICT Hub)
                    </div>
                    {onToggleViewMode && (
                      <button
                        onClick={() => {
                          setIsMobileMenuOpen(false);
                          onToggleViewMode();
                        }}
                        className="w-full py-2 px-4 rounded-xl text-center text-sm font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-2 flex justify-center items-center gap-1 cursor-pointer"
                      >
                        {viewMode === 'admin' ? 'View Public Site' : 'Admin Console'}
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full py-2 px-4 rounded-xl text-center text-sm font-semibold bg-red-950/40 text-red-200 border border-red-900 flex justify-center items-center gap-1"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onLoginClick();
                    }}
                    className="w-full py-2.5 px-4 rounded-full text-center text-sm font-bold bg-orange-600 hover:bg-orange-500 text-white flex justify-center items-center gap-2"
                  >
                    <User className="h-4 w-4" /> Login
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
