import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Landmark, Compass, ShieldAlert, Cpu, Award, Milestone, CloudSun } from 'lucide-react';
import { Slide, Attraction, Hotel, Restaurant, Event, StaffMember, GalleryItem, NewsItem } from './types';
import { 
  HERO_SLIDES,
  ATTRACTIONS,
  HOTELS,
  RESTAURANTS,
  EVENTS,
  STAFF,
  GALLERY_ITEMS,
  NEWS_BOARD
} from './data';

// Modular Subcomponents
import Navbar from './components/Navbar';
import HeroCarousel from './components/HeroCarousel';
import AboutSection from './components/AboutSection';
import AttractionsGrid from './components/AttractionsGrid';
import DirectorySection from './components/DirectorySection';
import EventsCalendar from './components/EventsCalendar';
import StaffDirectory from './components/StaffDirectory';
import NewsAndQuiz from './components/NewsAndQuiz';
import GallerySection from './components/GallerySection';
import LoginPortal from './components/LoginPortal';
import Footer from './components/Footer';
import AdminDashboard from './components/AdminDashboard';

export default function App() {
  // Global admin & navigation states
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [viewMode, setViewMode] = useState<'public' | 'admin'>('public');
  const [adminActiveTab, setAdminActiveTab] = useState<'dashboard' | 'add-content' | 'attractions' | 'hotels' | 'restaurants' | 'events' | 'news' | 'gallery' | 'hero-slider' | 'staff' | 'users' | 'settings'>('dashboard');

  // Sync viewMode with admin status
  useEffect(() => {
    if (isAdmin) {
      setViewMode('admin');
    } else {
      setViewMode('public');
    }
  }, [isAdmin]);

  // Attractions state
  const [attractions, setAttractions] = useState<Attraction[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('shashemene_attractions');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn(e);
    }
    return ATTRACTIONS;
  });

  const handleUpdateAttractions = (newAttractions: Attraction[]) => {
    setAttractions(newAttractions);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('shashemene_attractions', JSON.stringify(newAttractions));
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // Hotels state
  const [hotels, setHotels] = useState<Hotel[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('shashemene_hotels');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn(e);
    }
    return HOTELS;
  });

  const handleUpdateHotels = (newHotels: Hotel[]) => {
    setHotels(newHotels);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('shashemene_hotels', JSON.stringify(newHotels));
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // Restaurants state
  const [restaurants, setRestaurants] = useState<Restaurant[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('shashemene_restaurants');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn(e);
    }
    return RESTAURANTS;
  });

  const handleUpdateRestaurants = (newRestaurants: Restaurant[]) => {
    setRestaurants(newRestaurants);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('shashemene_restaurants', JSON.stringify(newRestaurants));
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // Events state
  const [events, setEvents] = useState<Event[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('shashemene_events');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn(e);
    }
    return EVENTS;
  });

  const handleUpdateEvents = (newEvents: Event[]) => {
    setEvents(newEvents);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('shashemene_events', JSON.stringify(newEvents));
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // News state
  const [news, setNews] = useState<NewsItem[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('shashemene_news');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn(e);
    }
    return NEWS_BOARD;
  });

  const handleUpdateNews = (newNews: NewsItem[]) => {
    setNews(newNews);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('shashemene_news', JSON.stringify(newNews));
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // Staff state
  const [staff, setStaff] = useState<StaffMember[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('shashemene_staff');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn(e);
    }
    return STAFF;
  });

  const handleUpdateStaff = (newStaff: StaffMember[]) => {
    setStaff(newStaff);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('shashemene_staff', JSON.stringify(newStaff));
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // Gallery state
  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('shashemene_gallery_items');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn(e);
    }
    return GALLERY_ITEMS;
  });

  const handleUpdateGallery = (newGallery: GalleryItem[]) => {
    setGallery(newGallery);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('shashemene_gallery_items', JSON.stringify(newGallery));
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // Users state
  const [users, setUsers] = useState<{ id: string; name: string; email: string; role: string; lastLogin: string }[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('shashemene_users');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn(e);
    }
    return [
      { id: 'u-1', name: 'Legese Tsegaye', email: 'legesetsegaye41@gmail.com', role: 'Administrator', lastLogin: 'Just now' },
      { id: 'u-2', name: 'Admin Staff', email: 'admin@shashemenetourism.org', role: 'Editor', lastLogin: '2 hours ago' }
    ];
  });

  const handleUpdateUsers = (newUsers: { id: string; name: string; email: string; role: string; lastLogin: string }[]) => {
    setUsers(newUsers);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('shashemene_users', JSON.stringify(newUsers));
      }
    } catch (e) {
      console.warn(e);
    }
  };

  // Theme state: dark (default) or light
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('shashemene_theme');
        if (saved === 'light' || saved === 'dark') {
          return saved;
        }
      }
    } catch (e) {
      console.warn('LocalStorage theme load failed:', e);
    }
    return 'dark'; // Dark is default aesthetic
  });

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('shashemene_theme', nextTheme);
      }
    } catch (e) {
      console.warn('LocalStorage theme save failed:', e);
    }
    triggerAlertToast(`Active layout: ${nextTheme === 'light' ? 'Light Readability' : 'Dark Aesthetic'}`);
  };

  // Dynamically apply/remove classes to document.body
  useEffect(() => {
    try {
      if (typeof document !== 'undefined') {
        const body = document.body;
        if (theme === 'light') {
          body.classList.add('light-theme');
        } else {
          body.classList.remove('light-theme');
        }
      }
    } catch (e) {
      console.error('Failed to update body class for theme:', e);
    }
  }, [theme]);

  // Dynamic slide hero state
  const [slides, setSlides] = useState<Slide[]>(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = window.localStorage.getItem('shashemene_hero_slides');
        if (saved) {
          return JSON.parse(saved);
        }
      }
    } catch (e) {
      console.warn('LocalStorage is blocked or unavailable in this environment:', e);
    }
    return HERO_SLIDES;
  });

  const handleUpdateSlides = (newSlides: Slide[]) => {
    setSlides(newSlides);
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        window.localStorage.setItem('shashemene_hero_slides', JSON.stringify(newSlides));
      }
    } catch (e) {
      console.warn('LocalStorage setItem is blocked or unavailable:', e);
    }
  };

  // Custom persistent trip planner list
  const [customPlannerItems, setCustomPlannerItems] = useState<string[]>([
    'Explore Central Shashemene Historic Core',
    'Experience real-time high-speed internet at Digital Cafe'
  ]);

  // Attraction bookmark lists
  const [savedList, setSavedList] = useState<string[]>(['wondo-genet']);

  // Dynamic trigger when guest "Adds to Planner" from Attraction Modals
  const [selectedAttractionName, setSelectedAttractionName] = useState<string | null>(null);

  // Success toast alerts
  const [alertText, setAlertText] = useState('');

  // Auto scroll-spy handler to highlight active sections in the navbar
  useEffect(() => {
    const sections = ['home', 'about', 'attractions', 'directory', 'events', 'staff', 'news', 'gallery'];
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleNavigate = (targetId: string) => {
    // If target has subslug like "attractions-wondo-genet"
    if (targetId.includes('-')) {
      const parentId = targetId.split('-')[0];
      const element = document.getElementById(parentId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(parentId);
      }
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveSection(targetId);
      }
    }
  };

  const handleNavbarNavigate = (sectionId: string) => {
    if (viewMode === 'admin') {
      // Map public navbar section IDs directly to admin dashboard tabs
      if (sectionId === 'home') {
        setViewMode('public');
        setTimeout(() => handleNavigate('home'), 100);
      } else if (sectionId.startsWith('attractions')) {
        setAdminActiveTab('attractions');
      } else if (sectionId.startsWith('hotels')) {
        setAdminActiveTab('hotels');
      } else if (sectionId.startsWith('restaurants')) {
        setAdminActiveTab('restaurants');
      } else if (sectionId.startsWith('events')) {
        setAdminActiveTab('events');
      } else if (sectionId.startsWith('gallery')) {
        setAdminActiveTab('gallery');
      } else if (sectionId.startsWith('news')) {
        setAdminActiveTab('news');
      } else if (sectionId.startsWith('staff')) {
        setAdminActiveTab('staff');
      } else {
        setViewMode('public');
        setTimeout(() => handleNavigate(sectionId), 100);
      }
    } else {
      handleNavigate(sectionId);
    }
  };

  const triggerAlertToast = (text: string) => {
    setAlertText(text);
    setTimeout(() => {
      setAlertText('');
    }, 4500);
  };

  const handleToggleSaveAttraction = (id: string) => {
    if (savedList.includes(id)) {
      setSavedList(prev => prev.filter(item => item !== id));
      triggerAlertToast('Removed from saved bookmarks.');
    } else {
      setSavedList(prev => [...prev, id]);
      triggerAlertToast('Attraction saved to bookmarks!');
    }
  };

  const handleAddPlannedStop = (item: string) => {
    if (customPlannerItems.includes(item)) {
      triggerAlertToast('This program stop is already in your planner!');
      return;
    }
    setCustomPlannerItems(prev => [...prev, item]);
    triggerAlertToast('Stop successfully added to your Itinerary Planner!');
  };

  const handleRemovePlannedStop = (item: string) => {
    setCustomPlannerItems(prev => prev.filter(planned => planned !== item));
    triggerAlertToast('Stop removed from itinerary.');
  };

  return (
    <div className={`bg-neutral-950 text-white min-h-screen relative font-sans antialiased selection:bg-orange-600 selection:text-white ${theme === 'light' ? 'light-theme' : ''}`}>
      
      {/* Dynamic Success Alert Toast */}
      <AnimatePresence>
        {alertText && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-50 bg-neutral-900 border-2 border-orange-500 rounded-2xl px-6 py-3.5 shadow-2xl flex items-center gap-3 font-medium text-xs font-mono tracking-wide text-neutral-100 min-w-[280px]"
            id="global-alert-toast"
          >
            <Compass className="h-4.5 w-4.5 text-orange-400 flex-shrink-0 animate-spin" />
            <span>{alertText}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modern Glassmorphic Header */}
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)}
        isAdmin={isAdmin}
        onLogout={() => {
          setIsAdmin(false);
          setViewMode('public');
          triggerAlertToast('Logged out of ICT Admin Panel.');
        }}
        activeSection={viewMode === 'admin' ? 'admin' : activeSection}
        onNavigate={handleNavbarNavigate}
        viewMode={viewMode}
        onToggleViewMode={() => setViewMode(prev => prev === 'admin' ? 'public' : 'admin')}
      />

      {isAdmin && viewMode === 'admin' ? (
        <AdminDashboard 
          onLogout={() => {
            setIsAdmin(false);
            setViewMode('public');
            triggerAlertToast('Logged out of ICT Admin Panel.');
          }}
          onViewSite={() => setViewMode('public')}
          activeTab={adminActiveTab}
          onChangeTab={setAdminActiveTab}
          slides={slides}
          onUpdateSlides={handleUpdateSlides}
          attractions={attractions}
          onUpdateAttractions={handleUpdateAttractions}
          hotels={hotels}
          onUpdateHotels={handleUpdateHotels}
          restaurants={restaurants}
          onUpdateRestaurants={handleUpdateRestaurants}
          events={events}
          onUpdateEvents={handleUpdateEvents}
          news={news}
          onUpdateNews={handleUpdateNews}
          staff={staff}
          onUpdateStaff={handleUpdateStaff}
          gallery={gallery}
          onUpdateGallery={handleUpdateGallery}
          users={users}
          onUpdateUsers={handleUpdateUsers}
        />
      ) : (
        <>
          {/* Main Content Layout Block */}
          <main className="overflow-x-hidden">
            
            {/* Glowing global visual accent */}
            <div className="absolute top-44 left-1/2 -translate-x-1/2 h-[500px] w-full max-w-7xl bg-orange-600/5 blur-3xl rounded-full pointer-events-none" />

            {/* Hero Banner Carousel - matches slider precisely */}
            <HeroCarousel onActionClick={handleNavigate} slides={slides} />

            {/* About Shashemene Core Details */}
            <AboutSection />

            {/* Attractions Explore Board */}
            <AttractionsGrid 
              onPlanTripTrigger={(name) => setSelectedAttractionName(name)}
              savedList={savedList}
              onToggleSave={handleToggleSaveAttraction}
              scrollToSection={handleNavigate}
              attractions={attractions}
            />

            {/* Hotel Lodging & Traditional Restaurants Directory */}
            <DirectorySection hotels={hotels} restaurants={restaurants} />

            {/* Festive Events & Dynamic custom Interactive Planner */}
            <EventsCalendar 
              customPlannerItems={customPlannerItems}
              onAddPlannedItem={handleAddPlannedStop}
              onRemovePlannedItem={handleRemovePlannedStop}
              selectedAttractionName={selectedAttractionName}
              clearSelectedAttraction={() => setSelectedAttractionName(null)}
              events={events}
            />

            {/* Key Team Staff Directory - featuring specialized spotlight on user Legese Tsegaye */}
            <StaffDirectory staff={staff} />

            {/* Historical advisory Board + Interactive quiz matching core traveler profile */}
            <NewsAndQuiz 
              onAddPlannedItem={handleAddPlannedStop}
              scrollToSection={handleNavigate}
              news={news}
            />

            {/* Dynamic Snapshots filtering gallery */}
            <GallerySection isAdmin={isAdmin} gallery={gallery} />

          </main>

          {/* Beautiful details footer section */}
          <Footer onNavigate={handleNavigate} theme={theme} onToggleTheme={handleToggleTheme} />
        </>
      )}

      {/* Modal Administrative Dashboard and login system */}
      <LoginPortal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={() => {
          setIsAdmin(true);
          setIsLoginOpen(false);
          triggerAlertToast('Access Granted! Legese’s ICT terminal interface active.');
        }}
        isAdmin={isAdmin}
        slides={slides}
        onUpdateSlides={handleUpdateSlides}
      />

    </div>
  );
}
