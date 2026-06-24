import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Compass, 
  Hotel as HotelIcon, 
  Utensils, 
  Calendar, 
  Newspaper, 
  Image as ImageIcon, 
  Sliders, 
  Users, 
  User, 
  Settings, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  Check, 
  MapPin, 
  DollarSign, 
  Star, 
  Clock, 
  ShieldCheck, 
  Eye, 
  ExternalLink 
} from 'lucide-react';
import { Slide, Attraction, Hotel, Restaurant, Event, StaffMember, GalleryItem, NewsItem } from '../types';
import ImageUploadBox from './ImageUploadBox';

interface AdminDashboardProps {
  onLogout: () => void;
  onViewSite?: () => void;
  slides: Slide[];
  onUpdateSlides: (newSlides: Slide[]) => void;
  attractions: Attraction[];
  onUpdateAttractions: (newAttractions: Attraction[]) => void;
  hotels: Hotel[];
  onUpdateHotels: (newHotels: Hotel[]) => void;
  restaurants: Restaurant[];
  onUpdateRestaurants: (newRestaurants: Restaurant[]) => void;
  events: Event[];
  onUpdateEvents: (newEvents: Event[]) => void;
  news: NewsItem[];
  onUpdateNews: (newNews: NewsItem[]) => void;
  staff: StaffMember[];
  onUpdateStaff: (newStaff: StaffMember[]) => void;
  gallery: GalleryItem[];
  onUpdateGallery: (newGallery: GalleryItem[]) => void;
  users: { id: string; name: string; email: string; role: string; lastLogin: string }[];
  onUpdateUsers: (newUsers: { id: string; name: string; email: string; role: string; lastLogin: string }[]) => void;
  activeTab?: TabType;
  onChangeTab?: (tab: TabType) => void;
}

type TabType = 
  | 'dashboard' 
  | 'add-content' 
  | 'attractions' 
  | 'hotels' 
  | 'restaurants' 
  | 'events' 
  | 'news' 
  | 'gallery' 
  | 'hero-slider' 
  | 'staff' 
  | 'users' 
  | 'settings';

export default function AdminDashboard({
  onLogout,
  onViewSite,
  slides,
  onUpdateSlides,
  attractions,
  onUpdateAttractions,
  hotels,
  onUpdateHotels,
  restaurants,
  onUpdateRestaurants,
  events,
  onUpdateEvents,
  news,
  onUpdateNews,
  staff,
  onUpdateStaff,
  gallery,
  onUpdateGallery,
  users,
  onUpdateUsers,
  activeTab: externalActiveTab,
  onChangeTab
}: AdminDashboardProps) {
  
  const [internalActiveTab, setInternalActiveTab] = useState<TabType>('dashboard');
  
  const activeTab = externalActiveTab || internalActiveTab;
  
  const setActiveTab = (tab: TabType) => {
    if (onChangeTab) {
      onChangeTab(tab);
    } else {
      setInternalActiveTab(tab);
    }
  };
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Search state
  const [searchTerm, setSearchTerm] = useState('');
  
  // Edit item state
  const [editingItem, setEditingItem] = useState<{ type: string; data: any } | null>(null);

  // Success message toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  
  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Add content states
  const [addType, setAddType] = useState<'attraction' | 'hotel' | 'restaurant' | 'event' | 'news' | 'staff' | 'gallery' | 'slide' | 'user'>('attraction');
  
  // Dynamic settings
  const [settingsData, setSettingsData] = useState({
    siteName: 'Shashemene Tourism Portal',
    contactEmail: 'info@shashemenetourism.org',
    contactPhone: '+251-462-11-2233',
    isMaintenanceMode: false,
    smartServicesActive: true,
    ictUptimeGoal: '99.9%'
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    triggerToast('Settings updated successfully!');
  };

  // --- ADD FORM STATES ---
  // Attraction form
  const [attrForm, setAttrForm] = useState({
    name: '',
    category: 'Nature' as 'Nature' | 'Culture' | 'History',
    rating: 4.5,
    reviewsCount: 12,
    image: '',
    description: '',
    longDescription: '',
    highlights: '',
    bestTime: 'October to February',
    coordinates: '7.2000° N, 38.6000° E'
  });

  // Hotel form
  const [hotelForm, setHotelForm] = useState({
    name: '',
    type: 'Hotel' as 'Hotel' | 'Lodge' | 'Resort',
    price: '$40 / night',
    rating: 4.5,
    image: '',
    description: '',
    features: 'Free Wi-Fi, Hot Shower, Secure Parking',
    location: 'Central Shashemene'
  });

  // Restaurant form
  const [restaurantForm, setRestaurantForm] = useState({
    name: '',
    cuisine: '',
    specialty: '',
    rating: 4.5,
    image: '',
    description: '',
    hours: '8:00 AM - 10:00 PM'
  });

  // Event form
  const [eventForm, setEventForm] = useState({
    title: '',
    date: '',
    category: 'Festival' as 'Festival' | 'Cultural' | 'ICT' | 'Holiday',
    location: '',
    image: '',
    description: ''
  });

  // News form
  const [newsForm, setNewsForm] = useState({
    title: '',
    date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
    author: 'Legese Tsegaye',
    category: 'ICT & Smart Tourism',
    summary: '',
    content: ''
  });

  // Staff form
  const [staffForm, setStaffForm] = useState({
    name: '',
    role: '',
    department: '',
    image: '',
    bio: '',
    email: '',
    phone: '',
    responsibilities: '',
    tier: 'Employee' as 'Director' | 'Manager' | 'Team Leader' | 'Employee'
  });

  // Gallery form
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'nature' as 'nature' | 'culture' | 'staff' | 'landmark',
    image: '',
    description: ''
  });

  // Slide form
  const [slideForm, setSlideForm] = useState({
    title: '',
    subtitle: '',
    category: 'Banner Info',
    image: '',
    actionText: 'Explore More',
    tag: 'Spotlight'
  });

  // User form
  const [userForm, setUserForm] = useState({
    name: '',
    email: '',
    role: 'Editor',
    lastLogin: 'Never'
  });

  // --- ACTIONS ---
  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (addType === 'attraction') {
      const newItem: Attraction = {
        id: attrForm.name.toLowerCase().replace(/\s+/g, '-'),
        name: attrForm.name,
        category: attrForm.category,
        rating: Number(attrForm.rating),
        reviewsCount: Number(attrForm.reviewsCount),
        image: attrForm.image || 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&h=450&q=80',
        description: attrForm.description,
        longDescription: attrForm.longDescription || attrForm.description,
        highlights: attrForm.highlights.split(',').map(h => h.trim()).filter(Boolean),
        bestTime: attrForm.bestTime,
        coordinates: attrForm.coordinates
      };
      onUpdateAttractions([...attractions, newItem]);
      setAttrForm({ name: '', category: 'Nature', rating: 4.5, reviewsCount: 12, image: '', description: '', longDescription: '', highlights: '', bestTime: 'October to February', coordinates: '7.2000° N, 38.6000° E' });
      triggerToast(`Successfully added attraction: ${newItem.name}`);
    } 
    else if (addType === 'hotel') {
      const newItem: Hotel = {
        id: hotelForm.name.toLowerCase().replace(/\s+/g, '-'),
        name: hotelForm.name,
        type: hotelForm.type,
        price: hotelForm.price,
        rating: Number(hotelForm.rating),
        image: hotelForm.image || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=500&q=80',
        description: hotelForm.description,
        features: hotelForm.features.split(',').map(f => f.trim()).filter(Boolean),
        location: hotelForm.location
      };
      onUpdateHotels([...hotels, newItem]);
      setHotelForm({ name: '', type: 'Hotel', price: '$40 / night', rating: 4.5, image: '', description: '', features: 'Free Wi-Fi, Hot Shower', location: 'Central Shashemene' });
      triggerToast(`Successfully added hotel: ${newItem.name}`);
    }
    else if (addType === 'restaurant') {
      const newItem: Restaurant = {
        id: restaurantForm.name.toLowerCase().replace(/\s+/g, '-'),
        name: restaurantForm.name,
        cuisine: restaurantForm.cuisine,
        specialty: restaurantForm.specialty,
        rating: Number(restaurantForm.rating),
        image: restaurantForm.image || 'https://images.unsplash.com/photo-1490239683250-1c61e4184885?auto=format&fit=crop&w=500&q=80',
        description: restaurantForm.description,
        hours: restaurantForm.hours
      };
      onUpdateRestaurants([...restaurants, newItem]);
      setRestaurantForm({ name: '', cuisine: '', specialty: '', rating: 4.5, image: '', description: '', hours: '8:00 AM - 10:00 PM' });
      triggerToast(`Successfully added restaurant: ${newItem.name}`);
    }
    else if (addType === 'event') {
      const newItem: Event = {
        id: eventForm.title.toLowerCase().replace(/\s+/g, '-'),
        title: eventForm.title,
        date: eventForm.date || 'TBA',
        category: eventForm.category,
        location: eventForm.location,
        image: eventForm.image || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=500&q=80',
        description: eventForm.description
      };
      onUpdateEvents([...events, newItem]);
      setEventForm({ title: '', date: '', category: 'Festival', location: '', image: '', description: '' });
      triggerToast(`Successfully added event: ${newItem.title}`);
    }
    else if (addType === 'news') {
      const newItem: NewsItem = {
        id: newsForm.title.toLowerCase().replace(/\s+/g, '-'),
        title: newsForm.title,
        date: newsForm.date,
        author: newsForm.author,
        category: newsForm.category,
        summary: newsForm.summary,
        content: newsForm.content
      };
      onUpdateNews([...news, newItem]);
      setNewsForm({ title: '', date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }), author: 'Legese Tsegaye', category: 'ICT & Smart Tourism', summary: '', content: '' });
      triggerToast(`Successfully published news: ${newItem.title}`);
    }
    else if (addType === 'staff') {
      const newItem: StaffMember = {
        id: staffForm.name.toLowerCase().replace(/\s+/g, '-'),
        name: staffForm.name,
        role: staffForm.role,
        department: staffForm.department,
        image: staffForm.image || 'https://images.unsplash.com/photo-1489980508314-941910ded1f4?auto=format&fit=crop&w=400&h=400&q=80',
        bio: staffForm.bio,
        email: staffForm.email,
        phone: staffForm.phone,
        responsibilities: staffForm.responsibilities.split(',').map(r => r.trim()).filter(Boolean),
        tier: staffForm.tier
      };
      onUpdateStaff([...staff, newItem]);
      setStaffForm({ name: '', role: '', department: '', image: '', bio: '', email: '', phone: '', responsibilities: '', tier: 'Employee' });
      triggerToast(`Successfully added staff member: ${newItem.name}`);
    }
    else if (addType === 'gallery') {
      const newItem: GalleryItem = {
        id: 'g-' + (gallery.length + 1),
        title: galleryForm.title,
        category: galleryForm.category,
        image: galleryForm.image || 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=600&h=400&q=80',
        description: galleryForm.description
      };
      onUpdateGallery([...gallery, newItem]);
      setGalleryForm({ title: '', category: 'nature', image: '', description: '' });
      triggerToast(`Successfully added image to Gallery: ${newItem.title}`);
    }
    else if (addType === 'slide') {
      const newItem: Slide = {
        id: Date.now(),
        title: slideForm.title,
        subtitle: slideForm.subtitle,
        category: slideForm.category,
        image: slideForm.image || 'https://images.unsplash.com/photo-1547127796-06bb04e4b315?auto=format&fit=crop&w=1600&q=80',
        actionText: slideForm.actionText,
        tag: slideForm.tag
      };
      onUpdateSlides([...slides, newItem]);
      setSlideForm({ title: '', subtitle: '', category: 'Banner Info', image: '', actionText: 'Explore More', tag: 'Spotlight' });
      triggerToast(`Successfully added Hero slide: ${newItem.title}`);
    }
    else if (addType === 'user') {
      const newItem = {
        id: 'u-' + (users.length + 1),
        name: userForm.name,
        email: userForm.email,
        role: userForm.role,
        lastLogin: 'Never'
      };
      onUpdateUsers([...users, newItem]);
      setUserForm({ name: '', email: '', role: 'Editor', lastLogin: 'Never' });
      triggerToast(`Successfully created administrative user: ${newItem.name}`);
    }

    // Switch to the appropriate tab to view
    const viewTab = addType === 'slide' ? 'hero-slider' : (addType + 's') as TabType;
    if (viewTab === 'attractions' || viewTab === 'hotels' || viewTab === 'restaurants' || viewTab === 'events' || viewTab === 'news' || viewTab === 'gallery' || viewTab === 'staff' || viewTab === 'users' || viewTab === 'hero-slider') {
      setActiveTab(viewTab);
    } else {
      setActiveTab('dashboard');
    }
  };

  // Delete item handler
  const handleDeleteItem = (type: string, id: string | number) => {
    if (confirm(`Are you sure you want to delete this ${type}?`)) {
      if (type === 'attraction') {
        onUpdateAttractions(attractions.filter(x => x.id !== id));
      } else if (type === 'hotel') {
        onUpdateHotels(hotels.filter(x => x.id !== id));
      } else if (type === 'restaurant') {
        onUpdateRestaurants(restaurants.filter(x => x.id !== id));
      } else if (type === 'event') {
        onUpdateEvents(events.filter(x => x.id !== id));
      } else if (type === 'news') {
        onUpdateNews(news.filter(x => x.id !== id));
      } else if (type === 'staff') {
        onUpdateStaff(staff.filter(x => x.id !== id));
      } else if (type === 'gallery') {
        onUpdateGallery(gallery.filter(x => x.id !== id));
      } else if (type === 'slide') {
        onUpdateSlides(slides.filter(x => x.id !== id));
      } else if (type === 'user') {
        onUpdateUsers(users.filter(x => x.id !== id));
      }
      triggerToast(`Successfully deleted ${type}.`);
    }
  };

  // Edit save handler
  const handleEditSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    const { type, data } = editingItem;

    if (type === 'attraction') {
      onUpdateAttractions(attractions.map(x => x.id === data.id ? data : x));
    } else if (type === 'hotel') {
      onUpdateHotels(hotels.map(x => x.id === data.id ? data : x));
    } else if (type === 'restaurant') {
      onUpdateRestaurants(restaurants.map(x => x.id === data.id ? data : x));
    } else if (type === 'event') {
      onUpdateEvents(events.map(x => x.id === data.id ? data : x));
    } else if (type === 'news') {
      onUpdateNews(news.map(x => x.id === data.id ? data : x));
    } else if (type === 'staff') {
      onUpdateStaff(staff.map(x => x.id === data.id ? data : x));
    } else if (type === 'gallery') {
      onUpdateGallery(gallery.map(x => x.id === data.id ? data : x));
    } else if (type === 'slide') {
      onUpdateSlides(slides.map(x => x.id === data.id ? data : x));
    } else if (type === 'user') {
      onUpdateUsers(users.map(x => x.id === data.id ? data : x));
    }

    setEditingItem(null);
    triggerToast(`Updated ${type}: ${data.name || data.title || data.name}`);
  };

  // Sidebar options
  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'add-content', label: 'Add Content', icon: PlusCircle },
    { id: 'attractions', label: 'Attractions', icon: Compass },
    { id: 'hotels', label: 'Hotels', icon: HotelIcon },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils },
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'news', label: 'News', icon: Newspaper },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'hero-slider', label: 'Hero Slider', icon: Sliders },
    { id: 'staff', label: 'Staff', icon: Users },
    { id: 'users', label: 'Users', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex min-h-[calc(100vh-76px)] bg-[#f8fafc] text-slate-800 font-sans antialiased">
      
      {/* Toast alert */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: -50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: -50, x: '-50%' }}
            className="fixed top-6 left-1/2 z-50 bg-[#0f5132] text-white font-medium text-xs font-mono py-3 px-6 rounded-xl shadow-xl flex items-center gap-2.5 border border-[#146c43]"
          >
            <ShieldCheck className="h-4 w-4 text-emerald-300 animate-bounce" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR - Fits exact layout from screenshot */}
      <aside className="hidden lg:flex flex-col w-64 bg-neutral-950 text-neutral-300 border-r border-neutral-800 flex-shrink-0">
        
        {/* Sidebar Header Brand */}
        <div className="flex items-center gap-2.5 px-6 py-5 border-b border-neutral-900 bg-neutral-950 select-none">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#0f5132] to-[#ca8a04] p-1.5 shadow-md">
            <Compass className="h-full w-full text-white animate-spin-slow" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold text-white tracking-tight leading-none">Shashemene</span>
            <span className="text-xs font-medium text-[#ca8a04] leading-none mt-1">Tourism Admin</span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-grow py-4 px-3 space-y-1 overflow-y-auto">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id as TabType);
                  setSearchTerm('');
                  setEditingItem(null);
                }}
                className={`flex items-center gap-3 w-full px-4 py-2.5 text-xs font-medium rounded-xl transition-all duration-150 group ${
                  isActive 
                    ? 'bg-neutral-900 text-white border-l-4 border-[#ca8a04] pl-3' 
                    : 'hover:bg-neutral-900/50 hover:text-white'
                }`}
                id={`sidebar-${item.id}`}
              >
                <Icon className={`h-4 w-4 transition-transform group-hover:scale-110 ${isActive ? 'text-[#ca8a04]' : 'text-neutral-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer with Log out */}
        <div className="p-3 border-t border-neutral-900 bg-neutral-950/60">
          <button 
            onClick={onLogout}
            className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-xl transition-all"
            id="sidebar-logout"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* MOBILE SIDEBAR DRAWER */}
      <AnimatePresence>
        {isMobileSidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileSidebarOpen(false)}
              className="fixed inset-0 z-40 bg-black/55 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 z-50 flex flex-col w-64 bg-neutral-950 text-neutral-300 border-r border-neutral-800 lg:hidden"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-900 bg-neutral-950">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#0f5132] to-[#ca8a04] p-1.5 text-white">
                    <Compass className="h-full w-full" />
                  </div>
                  <span className="text-sm font-bold text-white tracking-tight">ICT Admin Panel</span>
                </div>
                <button 
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1 rounded-md hover:bg-neutral-900 text-neutral-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-grow py-4 px-3 space-y-1 overflow-y-auto">
                {sidebarItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveTab(item.id as TabType);
                        setSearchTerm('');
                        setEditingItem(null);
                        setIsMobileSidebarOpen(false);
                      }}
                      className={`flex items-center gap-3 w-full px-4 py-2.5 text-xs font-medium rounded-xl transition-all duration-150 ${
                        isActive 
                          ? 'bg-neutral-900 text-white border-l-4 border-[#ca8a04] pl-3' 
                          : 'hover:bg-neutral-900/50 hover:text-white'
                      }`}
                    >
                      <Icon className={`h-4 w-4 ${isActive ? 'text-[#ca8a04]' : 'text-neutral-500'}`} />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </nav>

              <div className="p-3 border-t border-neutral-900 bg-neutral-950/60">
                <button 
                  onClick={onLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-950/20 rounded-xl transition-all"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* MAIN CONTAINER WORKSPACE */}
      <div className="flex-grow flex flex-col min-w-0 min-h-screen">
        
        {/* Header toolbar */}
        <header className="flex items-center justify-between px-4 lg:px-8 py-4 bg-white border-b border-slate-200">
          <div className="flex items-center gap-3">
            {/* Hamburger button on Mobile */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 lg:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 capitalize">
              {activeTab === 'hero-slider' ? 'Hero Slider Banners' : activeTab.replace('-', ' ')}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden sm:inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 text-[10px] font-mono font-medium px-2.5 py-1 rounded-full border border-emerald-200">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Legese Tsegaye (ICT)
            </span>
            {onViewSite && (
              <button 
                onClick={onViewSite}
                className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-800 rounded-lg transition-all cursor-pointer"
              >
                <ExternalLink className="h-3.5 w-3.5 text-amber-600" />
                <span>View Site</span>
              </button>
            )}
            <button 
              onClick={onLogout}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 border border-slate-200 text-slate-700 rounded-lg transition-all cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              <span className="hidden xs:inline">Log out</span>
            </button>
          </div>
        </header>

        {/* Workspace scroll area */}
        <main className="flex-grow p-4 lg:p-8 overflow-y-auto">
          
          {/* TAB 1: DASHBOARD (STATISTICS CARD HUB - MATCHES SCREENSHOT PERFECTLY) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8" id="admin-tab-dashboard">
              
              {/* Colored Count cards - Exact replication of uploaded screen */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                
                {/* Attractions: Blue */}
                <div 
                  onClick={() => setActiveTab('attractions')}
                  className="bg-[#1e74ff] text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer select-none group relative overflow-hidden"
                >
                  <div className="absolute right-3 bottom-1 text-white/10 group-hover:scale-110 transition-transform">
                    <Compass className="h-16 w-16" />
                  </div>
                  <h3 className="text-sm font-medium opacity-90 leading-none">Attractions</h3>
                  <p className="text-5xl font-bold tracking-tight mt-4 leading-none">{attractions.length}</p>
                </div>

                {/* Hotels: Green */}
                <div 
                  onClick={() => setActiveTab('hotels')}
                  className="bg-[#198754] text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer select-none group relative overflow-hidden"
                >
                  <div className="absolute right-3 bottom-1 text-white/10 group-hover:scale-110 transition-transform">
                    <HotelIcon className="h-16 w-16" />
                  </div>
                  <h3 className="text-sm font-medium opacity-90 leading-none">Hotels</h3>
                  <p className="text-5xl font-bold tracking-tight mt-4 leading-none">{hotels.length}</p>
                </div>

                {/* Restaurants: Cyan */}
                <div 
                  onClick={() => setActiveTab('restaurants')}
                  className="bg-[#0dcaf0] text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer select-none group relative overflow-hidden"
                >
                  <div className="absolute right-3 bottom-1 text-white/10 group-hover:scale-110 transition-transform">
                    <Utensils className="h-16 w-16" />
                  </div>
                  <h3 className="text-sm font-medium opacity-90 leading-none">Restaurants</h3>
                  <p className="text-5xl font-bold tracking-tight mt-4 leading-none">{restaurants.length}</p>
                </div>

                {/* Events: Yellow */}
                <div 
                  onClick={() => setActiveTab('events')}
                  className="bg-[#ffc107] text-slate-900 p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer select-none group relative overflow-hidden"
                >
                  <div className="absolute right-3 bottom-1 text-slate-900/10 group-hover:scale-110 transition-transform">
                    <Calendar className="h-16 w-16" />
                  </div>
                  <h3 className="text-sm font-semibold opacity-90 leading-none">Events</h3>
                  <p className="text-5xl font-bold tracking-tight mt-4 leading-none">{events.length}</p>
                </div>

                {/* News: Gray */}
                <div 
                  onClick={() => setActiveTab('news')}
                  className="bg-[#6c757d] text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer select-none group relative overflow-hidden"
                >
                  <div className="absolute right-3 bottom-1 text-white/10 group-hover:scale-110 transition-transform">
                    <Newspaper className="h-16 w-16" />
                  </div>
                  <h3 className="text-sm font-medium opacity-90 leading-none">News</h3>
                  <p className="text-5xl font-bold tracking-tight mt-4 leading-none">{news.length}</p>
                </div>

                {/* Users: Red */}
                <div 
                  onClick={() => setActiveTab('users')}
                  className="bg-[#dc3545] text-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer select-none group relative overflow-hidden"
                >
                  <div className="absolute right-3 bottom-1 text-white/10 group-hover:scale-110 transition-transform">
                    <User className="h-16 w-16" />
                  </div>
                  <h3 className="text-sm font-medium opacity-90 leading-none">Users</h3>
                  <p className="text-5xl font-bold tracking-tight mt-4 leading-none">{users.length}</p>
                </div>

              </div>

              {/* Informative Welcome block */}
              <div className="bg-gradient-to-r from-emerald-900 to-emerald-950 text-white rounded-2xl p-6 lg:p-8 shadow-md relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial-gradient opacity-10 pointer-events-none" />
                <div className="max-w-2xl relative z-10 space-y-3">
                  <span className="text-[10px] font-mono tracking-wider text-amber-400 font-bold uppercase bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/20">
                    Municipal Smart Node
                  </span>
                  <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Welcome, Chief Legese Tsegaye</h2>
                  <p className="text-xs md:text-sm text-emerald-200 leading-relaxed font-normal">
                    This administrative suite represents the live smart portal database of Shashemene. You can oversee and edit background sliders, local lodging registries, restaurants, news, and staff directories. Changes are propagated to the public layout instantaneously!
                  </p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    <button 
                      onClick={() => setActiveTab('add-content')}
                      className="flex items-center gap-1.5 bg-[#ca8a04] hover:bg-[#b07803] text-white font-semibold text-xs py-2 px-4 rounded-lg transition-all"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      Add New Content
                    </button>
                    <button 
                      onClick={() => {
                        onLogout();
                        triggerToast('Returned to main website preview.');
                      }}
                      className="flex items-center gap-1.5 bg-white/10 hover:bg-white/15 text-white border border-white/20 font-medium text-xs py-2 px-4 rounded-lg transition-all"
                    >
                      <ExternalLink className="h-3.5 w-3.5 text-neutral-300" />
                      View Live Website
                    </button>
                  </div>
                </div>
              </div>

              {/* Recent news / Quick activity feed */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* System state block */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold tracking-tight text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-[#0f5132]" />
                    Server & Cloud Security Status
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[10px] text-slate-500 font-mono">Live Ingress Port</p>
                      <p className="text-sm font-bold text-slate-800 mt-1 font-mono">3000 (Proxy Active)</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[10px] text-slate-500 font-mono">Cloud Endpoint State</p>
                      <p className="text-sm font-bold text-emerald-600 mt-1 font-mono">Online & Secure</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[10px] text-slate-500 font-mono">Primary Maintainer</p>
                      <p className="text-xs font-bold text-slate-800 mt-1">Legese Tsegaye</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                      <p className="text-[10px] text-slate-500 font-mono">Database Type</p>
                      <p className="text-sm font-bold text-slate-800 mt-1 font-mono">Mock DB / LS</p>
                    </div>
                  </div>
                </div>

                {/* Recent Items List */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4">
                  <h3 className="text-sm font-bold tracking-tight text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
                    <PlusCircle className="h-4 w-4 text-[#ca8a04]" />
                    Recently Added Attractions
                  </h3>
                  <div className="space-y-3">
                    {attractions.slice(-3).reverse().map((attr) => (
                      <div key={attr.id} className="flex items-center justify-between p-2.5 bg-slate-50 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img src={attr.image} alt="" className="h-10 w-10 object-cover rounded-lg flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-xs font-bold text-slate-800 truncate">{attr.name}</p>
                            <p className="text-[10px] text-slate-400 font-medium">{attr.category} • {attr.coordinates}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => {
                            setActiveTab('attractions');
                            setSearchTerm(attr.name);
                          }}
                          className="p-1 rounded bg-white text-slate-600 hover:text-slate-900 shadow-sm border border-slate-200/60"
                        >
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 2: ADD CONTENT (RESPONSIVE COMPREHENSIVE FORM) */}
          {activeTab === 'add-content' && (
            <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm space-y-6" id="admin-tab-add-content">
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block">Content Module Selection</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {[
                    { id: 'attraction', label: 'Attraction' },
                    { id: 'hotel', label: 'Hotel/Lodge' },
                    { id: 'restaurant', label: 'Restaurant' },
                    { id: 'event', label: 'Event' },
                    { id: 'news', label: 'News Post' },
                    { id: 'staff', label: 'Staff Member' },
                    { id: 'gallery', label: 'Gallery Photo' },
                    { id: 'slide', label: 'Hero Slide' },
                    { id: 'user', label: 'Admin User' }
                  ].map((btn) => (
                    <button
                      key={btn.id}
                      type="button"
                      onClick={() => setAddType(btn.id as any)}
                      className={`py-2 px-3 text-[11px] font-semibold rounded-lg text-center border transition-all truncate ${
                        addType === btn.id 
                          ? 'bg-[#0f5132] text-white border-[#0f5132] shadow-sm' 
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-5 pt-3 border-t border-slate-100">
                
                {/* 1. ATTRACTION FORM */}
                {addType === 'attraction' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Attraction Name</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Melka Kunture Local Sights"
                          value={attrForm.name}
                          onChange={(e) => setAttrForm({...attrForm, name: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Category</label>
                        <select
                          value={attrForm.category}
                          onChange={(e) => setAttrForm({...attrForm, category: e.target.value as any})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        >
                          <option value="Nature">Nature</option>
                          <option value="Culture">Culture</option>
                          <option value="History">History</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Rating (0-5)</label>
                        <input 
                          type="number" min="1" max="5" step="0.1" required
                          value={attrForm.rating}
                          onChange={(e) => setAttrForm({...attrForm, rating: Number(e.target.value)})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Review Count</label>
                        <input 
                          type="number" min="0" required
                          value={attrForm.reviewsCount}
                          onChange={(e) => setAttrForm({...attrForm, reviewsCount: Number(e.target.value)})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Best Season to Visit</label>
                        <input 
                          type="text" required
                          placeholder="e.g. October to March"
                          value={attrForm.bestTime}
                          onChange={(e) => setAttrForm({...attrForm, bestTime: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <ImageUploadBox 
                          value={attrForm.image}
                          onChange={(val) => setAttrForm({...attrForm, image: val})}
                          label="Image / Cover Photo"
                          placeholder="Paste image URL or upload..."
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">GPS Coordinates</label>
                        <input 
                          type="text" required
                          placeholder="e.g. 7.1995° N, 38.5888° E"
                          value={attrForm.coordinates}
                          onChange={(e) => setAttrForm({...attrForm, coordinates: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Short Summary description</label>
                      <input 
                        type="text" required
                        placeholder="A sentence or two highlighting the main sight features..."
                        value={attrForm.description}
                        onChange={(e) => setAttrForm({...attrForm, description: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Detailed Long Description</label>
                      <textarea 
                        rows={3}
                        placeholder="Provide detailed logs of history, routes, wildlife and background context..."
                        value={attrForm.longDescription}
                        onChange={(e) => setAttrForm({...attrForm, longDescription: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Highlights (comma separated)</label>
                      <input 
                        type="text"
                        placeholder="e.g. Scenic Sunrises, Local Guides, Ancient Trees, Wildlife Trails"
                        value={attrForm.highlights}
                        onChange={(e) => setAttrForm({...attrForm, highlights: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  </div>
                )}

                {/* 2. HOTEL FORM */}
                {addType === 'hotel' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Accommodation Name</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Rastafari Crown Guest Lodge"
                          value={hotelForm.name}
                          onChange={(e) => setHotelForm({...hotelForm, name: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Type</label>
                        <select
                          value={hotelForm.type}
                          onChange={(e) => setHotelForm({...hotelForm, type: e.target.value as any})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        >
                          <option value="Hotel">Hotel</option>
                          <option value="Lodge">Lodge</option>
                          <option value="Resort">Resort</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Price text</label>
                        <input 
                          type="text" required
                          placeholder="e.g. $45 / night"
                          value={hotelForm.price}
                          onChange={(e) => setHotelForm({...hotelForm, price: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Rating (0-5)</label>
                        <input 
                          type="number" min="1" max="5" step="0.1" required
                          value={hotelForm.rating}
                          onChange={(e) => setHotelForm({...hotelForm, rating: Number(e.target.value)})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Location area</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Rastafari Diaspora Quarter"
                          value={hotelForm.location}
                          onChange={(e) => setHotelForm({...hotelForm, location: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <ImageUploadBox 
                        value={hotelForm.image}
                        onChange={(val) => setHotelForm({...hotelForm, image: val})}
                        label="Hotel / Lodge Image"
                        placeholder="Paste image URL or upload..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Description</label>
                      <textarea 
                        rows={3} required
                        placeholder="Tell visitors about comfort, garden trails, traditional foods, or scenic views..."
                        value={hotelForm.description}
                        onChange={(e) => setHotelForm({...hotelForm, description: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Features / Amenities (comma separated)</label>
                      <input 
                        type="text"
                        placeholder="e.g. Organic Food, Hot Springs Access, Free Wi-Fi, Balcony, Secure Parking"
                        value={hotelForm.features}
                        onChange={(e) => setHotelForm({...hotelForm, features: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  </div>
                )}

                {/* 3. RESTAURANT FORM */}
                {addType === 'restaurant' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Restaurant Name</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Traditional Hub"
                          value={restaurantForm.name}
                          onChange={(e) => setRestaurantForm({...restaurantForm, name: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Cuisine Type</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Rastafarian Ital / Vegan"
                          value={restaurantForm.cuisine}
                          onChange={(e) => setRestaurantForm({...restaurantForm, cuisine: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Specialty Dish</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Spiced Organic Stew with Fresh Juice"
                          value={restaurantForm.specialty}
                          onChange={(e) => setRestaurantForm({...restaurantForm, specialty: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Rating (0-5)</label>
                        <input 
                          type="number" min="1" max="5" step="0.1" required
                          value={restaurantForm.rating}
                          onChange={(e) => setRestaurantForm({...restaurantForm, rating: Number(e.target.value)})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Opening Hours</label>
                        <input 
                          type="text" required
                          placeholder="e.g. 8:00 AM - 10:00 PM"
                          value={restaurantForm.hours}
                          onChange={(e) => setRestaurantForm({...restaurantForm, hours: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <ImageUploadBox 
                        value={restaurantForm.image}
                        onChange={(val) => setRestaurantForm({...restaurantForm, image: val})}
                        label="Restaurant Image"
                        placeholder="Paste image URL or upload..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Description</label>
                      <textarea 
                        rows={3} required
                        placeholder="Provide details about coffee ceremonies, spices, outdoor settings, etc..."
                        value={restaurantForm.description}
                        onChange={(e) => setRestaurantForm({...restaurantForm, description: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  </div>
                )}

                {/* 4. EVENT FORM */}
                {addType === 'event' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Event Title</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Rastafarian Harmony Festival"
                          value={eventForm.title}
                          onChange={(e) => setEventForm({...eventForm, title: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Event Date</label>
                        <input 
                          type="text" required
                          placeholder="e.g. November 2"
                          value={eventForm.date}
                          onChange={(e) => setEventForm({...eventForm, date: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Category</label>
                        <select
                          value={eventForm.category}
                          onChange={(e) => setEventForm({...eventForm, category: e.target.value as any})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        >
                          <option value="Festival">Festival</option>
                          <option value="Cultural">Cultural</option>
                          <option value="ICT">ICT</option>
                          <option value="Holiday">Holiday</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Location venue</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Tabor Tabernacle Grounds"
                          value={eventForm.location}
                          onChange={(e) => setEventForm({...eventForm, location: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <ImageUploadBox 
                        value={eventForm.image}
                        onChange={(val) => setEventForm({...eventForm, image: val})}
                        label="Event Image / Banner"
                        placeholder="Paste image URL or upload..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Description</label>
                      <textarea 
                        rows={3} required
                        placeholder="Provide details of performance, entrance, community unity programs..."
                        value={eventForm.description}
                        onChange={(e) => setEventForm({...eventForm, description: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  </div>
                )}

                {/* 5. NEWS FORM */}
                {addType === 'news' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Article Title</label>
                        <input 
                          type="text" required
                          placeholder="e.g. New Scenic Trails Mapped in Wondo Genet"
                          value={newsForm.title}
                          onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Category Tag</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Wildlife & Conservation"
                          value={newsForm.category}
                          onChange={(e) => setNewsForm({...newsForm, category: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Author Name</label>
                        <input 
                          type="text" required
                          value={newsForm.author}
                          onChange={(e) => setNewsForm({...newsForm, author: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Date text</label>
                        <input 
                          type="text" required
                          value={newsForm.date}
                          onChange={(e) => setNewsForm({...newsForm, date: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Brief Summary</label>
                      <input 
                        type="text" required
                        placeholder="A short description shown on the news index feed..."
                        value={newsForm.summary}
                        onChange={(e) => setNewsForm({...newsForm, summary: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Article Content Details</label>
                      <textarea 
                        rows={4} required
                        placeholder="Write the full body content of this press release / tourism update..."
                        value={newsForm.content}
                        onChange={(e) => setNewsForm({...newsForm, content: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  </div>
                )}

                {/* 6. STAFF FORM */}
                {addType === 'staff' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Full Name</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Dereje Kassa"
                          value={staffForm.name}
                          onChange={(e) => setStaffForm({...staffForm, name: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Role Title</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Senior Naturalist Guide"
                          value={staffForm.role}
                          onChange={(e) => setStaffForm({...staffForm, role: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Department</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Ecotourism Department"
                          value={staffForm.department}
                          onChange={(e) => setStaffForm({...staffForm, department: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Staff Level / Tier</label>
                        <select
                          value={staffForm.tier}
                          onChange={(e) => setStaffForm({...staffForm, tier: e.target.value as any})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        >
                          <option value="Director">Director</option>
                          <option value="Manager">Manager</option>
                          <option value="Team Leader">Team Leader</option>
                          <option value="Employee">Employee</option>
                        </select>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Email Address</label>
                        <input 
                          type="email" required
                          placeholder="dereje@shashemene.org"
                          value={staffForm.email}
                          onChange={(e) => setStaffForm({...staffForm, email: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Phone Connection</label>
                        <input 
                          type="text" required
                          placeholder="+251-912-XX-XX-XX"
                          value={staffForm.phone}
                          onChange={(e) => setStaffForm({...staffForm, phone: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <ImageUploadBox 
                        value={staffForm.image}
                        onChange={(val) => setStaffForm({...staffForm, image: val})}
                        label="Profile Image"
                        placeholder="Paste image URL or upload..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Short Bio</label>
                      <textarea 
                        rows={2} required
                        placeholder="Describe expert training background and years of service..."
                        value={staffForm.bio}
                        onChange={(e) => setStaffForm({...staffForm, bio: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Responsibilities (comma separated)</label>
                      <input 
                        type="text"
                        placeholder="e.g. Training junior guides, Conducting forest mapping, Safety coordination"
                        value={staffForm.responsibilities}
                        onChange={(e) => setStaffForm({...staffForm, responsibilities: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  </div>
                )}

                {/* 7. GALLERY FORM */}
                {addType === 'gallery' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Photo Title</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Sunset over Rift Valley Ridge"
                          value={galleryForm.title}
                          onChange={(e) => setGalleryForm({...galleryForm, title: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Category Grid</label>
                        <select
                          value={galleryForm.category}
                          onChange={(e) => setGalleryForm({...galleryForm, category: e.target.value as any})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        >
                          <option value="nature">Nature / Wildlife</option>
                          <option value="culture">Cultural Heritage</option>
                          <option value="staff">Staff Highlights</option>
                          <option value="landmark">Municipal Landmarks</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <ImageUploadBox 
                        value={galleryForm.image}
                        onChange={(val) => setGalleryForm({...galleryForm, image: val})}
                        label="Gallery Photo / Image Source"
                        placeholder="Paste image URL or upload..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Short Capture description</label>
                      <input 
                        type="text" required
                        placeholder="e.g. Walking trails in the early morning sunlight."
                        value={galleryForm.description}
                        onChange={(e) => setGalleryForm({...galleryForm, description: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  </div>
                )}

                {/* 8. HERO SLIDE FORM */}
                {addType === 'slide' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Heading Title</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Welcome to Senkele savannah"
                          value={slideForm.title}
                          onChange={(e) => setSlideForm({...slideForm, title: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Category Mini-Header</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Wildlife Preservation"
                          value={slideForm.category}
                          onChange={(e) => setSlideForm({...slideForm, category: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Button CTA text</label>
                        <input 
                          type="text" required
                          value={slideForm.actionText}
                          onChange={(e) => setSlideForm({...slideForm, actionText: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Tag Info</label>
                        <input 
                          type="text"
                          placeholder="e.g. National Treasure"
                          value={slideForm.tag}
                          onChange={(e) => setSlideForm({...slideForm, tag: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <ImageUploadBox 
                        value={slideForm.image}
                        onChange={(val) => setSlideForm({...slideForm, image: val})}
                        label="Hero Background Image"
                        placeholder="Paste image URL or upload..."
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Subtitle Description</label>
                      <textarea 
                        rows={2} required
                        placeholder="Write a clear, brief sentence summarizing this hero slider content..."
                        value={slideForm.subtitle}
                        onChange={(e) => setSlideForm({...slideForm, subtitle: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  </div>
                )}

                {/* 9. USER FORM */}
                {addType === 'user' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Full Name</label>
                        <input 
                          type="text" required
                          placeholder="e.g. Almaz Kebede"
                          value={userForm.name}
                          onChange={(e) => setUserForm({...userForm, name: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs font-bold text-slate-700">Email Address</label>
                        <input 
                          type="email" required
                          placeholder="almaz@shashemenetourism.org"
                          value={userForm.email}
                          onChange={(e) => setUserForm({...userForm, email: e.target.value})}
                          className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Administrative Role</label>
                      <select
                        value={userForm.role}
                        onChange={(e) => setUserForm({...userForm, role: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      >
                        <option value="Administrator">Administrator</option>
                        <option value="Editor">Editor</option>
                        <option value="ICT Tech support">ICT Tech support</option>
                      </select>
                    </div>
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('dashboard');
                    }}
                    className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#0f5132] hover:bg-[#146c43] text-white transition-all shadow-sm"
                  >
                    Save & Publish Item
                  </button>
                </div>

              </form>

            </div>
          )}

          {/* TAB 3: LISTS MANAGER (ATTRACTIONS / HOTELS / RESTAURANTS / EVENTS / NEWS / GALLERY / HERO-SLIDER / STAFF / USERS) */}
          {activeTab !== 'dashboard' && activeTab !== 'add-content' && activeTab !== 'settings' && (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden" id={`admin-tab-list-${activeTab}`}>
              
              {/* Toolbar */}
              <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col sm:flex-row gap-3 items-center justify-between">
                
                <div className="relative w-full sm:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder={`Search ${activeTab}...`}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132] bg-white"
                  />
                </div>

                <button
                  onClick={() => {
                    const typeMap: Record<string, any> = {
                      attractions: 'attraction',
                      hotels: 'hotel',
                      restaurants: 'restaurant',
                      events: 'event',
                      news: 'news',
                      gallery: 'gallery',
                      'hero-slider': 'slide',
                      staff: 'staff',
                      users: 'user'
                    };
                    setAddType(typeMap[activeTab] || 'attraction');
                    setActiveTab('add-content');
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0f5132] hover:bg-[#146c43] text-white text-xs font-bold rounded-lg transition-all shadow-sm w-full sm:w-auto justify-center"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Add New
                </button>
              </div>

              {/* LIST TABLE CONTAINER */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-100/75 text-slate-500 font-mono text-[10px] uppercase tracking-wider border-b border-slate-200">
                      <th className="py-3 px-4">Item Details</th>
                      <th className="py-3 px-4">Category / Metadata</th>
                      <th className="py-3 px-4">Additional Info</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-xs">
                    
                    {/* ATTRACTIONS GRID LIST */}
                    {activeTab === 'attractions' && attractions
                      .filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase()) || x.description.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt="" className="h-12 w-16 object-cover rounded-lg border border-slate-200 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="font-bold text-slate-800">{item.name}</p>
                                <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px]">
                            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-semibold border border-blue-200">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5">
                              <p className="text-[11px] font-semibold text-slate-700">⭐ {item.rating} ({item.reviewsCount} reviews)</p>
                              <p className="text-[10px] text-slate-400 font-mono">{item.coordinates}</p>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            <button 
                              onClick={() => setEditingItem({ type: 'attraction', data: { ...item } })}
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-white inline-flex"
                              title="Edit"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteItem('attraction', item.id)}
                              className="p-1.5 rounded-lg border border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50 inline-flex"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                    ))}

                    {/* HOTELS LIST */}
                    {activeTab === 'hotels' && hotels
                      .filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase()) || x.description.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt="" className="h-12 w-16 object-cover rounded-lg border border-slate-200 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="font-bold text-slate-800">{item.name}</p>
                                <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px]">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold border border-emerald-200">
                              {item.type}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5">
                              <p className="text-[11px] font-bold text-slate-700">{item.price}</p>
                              <p className="text-[10px] text-slate-500 font-medium">📍 {item.location}</p>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            <button 
                              onClick={() => setEditingItem({ type: 'hotel', data: { ...item } })}
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-white inline-flex"
                              title="Edit"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteItem('hotel', item.id)}
                              className="p-1.5 rounded-lg border border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50 inline-flex"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                    ))}

                    {/* RESTAURANTS LIST */}
                    {activeTab === 'restaurants' && restaurants
                      .filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase()) || x.cuisine.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt="" className="h-12 w-16 object-cover rounded-lg border border-slate-200 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="font-bold text-slate-800">{item.name}</p>
                                <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px]">
                            <span className="px-2 py-0.5 rounded bg-cyan-50 text-cyan-700 font-semibold border border-cyan-200">
                              {item.cuisine}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5">
                              <p className="text-[11px] font-medium text-slate-700">⭐ {item.rating} • {item.hours}</p>
                              <p className="text-[10px] text-slate-500 italic font-semibold truncate max-w-[140px]">{item.specialty}</p>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            <button 
                              onClick={() => setEditingItem({ type: 'restaurant', data: { ...item } })}
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-white inline-flex"
                              title="Edit"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteItem('restaurant', item.id)}
                              className="p-1.5 rounded-lg border border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50 inline-flex"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                    ))}

                    {/* EVENTS LIST */}
                    {activeTab === 'events' && events
                      .filter(x => x.title.toLowerCase().includes(searchTerm.toLowerCase()) || x.description.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt="" className="h-12 w-16 object-cover rounded-lg border border-slate-200 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="font-bold text-slate-800">{item.title}</p>
                                <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px]">
                            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5">
                              <p className="text-[11px] font-bold text-slate-700">{item.date}</p>
                              <p className="text-[10px] text-slate-500 font-medium">📍 {item.location}</p>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            <button 
                              onClick={() => setEditingItem({ type: 'event', data: { ...item } })}
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-white inline-flex"
                              title="Edit"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteItem('event', item.id)}
                              className="p-1.5 rounded-lg border border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50 inline-flex"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                    ))}

                    {/* NEWS LIST */}
                    {activeTab === 'news' && news
                      .filter(x => x.title.toLowerCase().includes(searchTerm.toLowerCase()) || x.summary.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="min-w-0">
                              <p className="font-bold text-slate-800">{item.title}</p>
                              <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.summary}</p>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px]">
                            <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold border border-slate-200">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="space-y-0.5">
                              <p className="text-[11px] font-semibold text-slate-600">✍️ {item.author}</p>
                              <p className="text-[10px] text-slate-400 font-mono">{item.date}</p>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            <button 
                              onClick={() => setEditingItem({ type: 'news', data: { ...item } })}
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-white inline-flex"
                              title="Edit"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteItem('news', item.id)}
                              className="p-1.5 rounded-lg border border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50 inline-flex"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                    ))}

                    {/* GALLERY LIST */}
                    {activeTab === 'gallery' && gallery
                      .filter(x => x.title.toLowerCase().includes(searchTerm.toLowerCase()) || x.description.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt="" className="h-12 w-16 object-cover rounded-lg border border-slate-200 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="font-bold text-slate-800">{item.title}</p>
                                <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.description}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px]">
                            <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-700 font-semibold border border-amber-200">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px] text-slate-500">
                            {item.id}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            <button 
                              onClick={() => setEditingItem({ type: 'gallery', data: { ...item } })}
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-white inline-flex"
                              title="Edit"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteItem('gallery', item.id)}
                              className="p-1.5 rounded-lg border border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50 inline-flex"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                    ))}

                    {/* HERO SLIDER LIST */}
                    {activeTab === 'hero-slider' && slides
                      .filter(x => x.title.toLowerCase().includes(searchTerm.toLowerCase()) || x.subtitle.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt="" className="h-12 w-20 object-cover rounded-lg border border-slate-200 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="font-bold text-slate-800">{item.title}</p>
                                <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.subtitle}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px]">
                            <span className="px-2 py-0.5 rounded bg-neutral-100 text-neutral-800 font-semibold border border-neutral-300">
                              {item.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px] text-slate-500">
                            CTA: <span className="font-semibold text-slate-700">{item.actionText}</span>
                            {item.tag && <p className="text-[9px] text-[#ca8a04] mt-0.5 font-sans font-bold uppercase">{item.tag}</p>}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            <button 
                              onClick={() => setEditingItem({ type: 'slide', data: { ...item } })}
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-white inline-flex"
                              title="Edit"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteItem('slide', item.id)}
                              className="p-1.5 rounded-lg border border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50 inline-flex"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                    ))}

                    {/* STAFF LIST */}
                    {activeTab === 'staff' && staff
                      .filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase()) || x.role.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <img src={item.image} alt="" className="h-12 w-12 object-cover rounded-full border border-slate-200 flex-shrink-0" />
                              <div className="min-w-0">
                                <p className="font-bold text-slate-800 flex items-center gap-1.5">
                                  {item.name}
                                  {item.highlighted && (
                                    <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold">
                                      Spotlight
                                    </span>
                                  )}
                                </p>
                                <p className="text-[11px] text-slate-500 truncate mt-0.5">{item.role}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[11px] text-slate-600">
                            <div>
                              <p className="font-semibold">{item.department}</p>
                              <span className="inline-block mt-1 px-2 py-0.5 rounded bg-amber-50 text-amber-800 text-[10px] font-bold border border-amber-200 uppercase tracking-wider">
                                {item.tier || 'Employee'}
                              </span>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                            <p>✉️ {item.email}</p>
                            <p className="font-mono text-[10px] mt-0.5">📞 {item.phone}</p>
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            <button 
                              onClick={() => setEditingItem({ type: 'staff', data: { ...item } })}
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-white inline-flex"
                              title="Edit"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteItem('staff', item.id)}
                              className="p-1.5 rounded-lg border border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50 inline-flex"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                    ))}

                    {/* USERS LIST */}
                    {activeTab === 'users' && users
                      .filter(x => x.name.toLowerCase().includes(searchTerm.toLowerCase()) || x.email.toLowerCase().includes(searchTerm.toLowerCase()))
                      .map((item) => (
                        <tr key={item.id} className="hover:bg-slate-50/60 transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="min-w-0">
                              <p className="font-bold text-slate-800">{item.name}</p>
                              <p className="text-[11px] text-slate-500 mt-0.5">✉️ {item.email}</p>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-mono text-[10px]">
                            <span className="px-2 py-0.5 rounded bg-purple-50 text-purple-700 font-semibold border border-purple-200">
                              {item.role}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-[11px] text-slate-500 font-mono">
                            Last active: {item.lastLogin}
                          </td>
                          <td className="py-3.5 px-4 text-right space-x-1.5">
                            <button 
                              onClick={() => setEditingItem({ type: 'user', data: { ...item } })}
                              className="p-1.5 rounded-lg border border-slate-200 hover:border-slate-300 text-slate-600 hover:bg-white inline-flex"
                              title="Edit"
                            >
                              <Edit className="h-3.5 w-3.5" />
                            </button>
                            <button 
                              onClick={() => handleDeleteItem('user', item.id)}
                              className="p-1.5 rounded-lg border border-red-100 hover:border-red-200 text-red-600 hover:bg-red-50 inline-flex"
                              title="Delete"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </td>
                        </tr>
                    ))}

                  </tbody>
                </table>
              </div>

            </div>
          )}

          {/* TAB 4: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl mx-auto bg-white rounded-2xl p-6 lg:p-8 border border-slate-200 shadow-sm" id="admin-tab-settings">
              <form onSubmit={handleSaveSettings} className="space-y-6">
                
                <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-3 block">
                  Portal Configuration
                </h3>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Tourism Website Name</label>
                      <input 
                        type="text" required
                        value={settingsData.siteName}
                        onChange={(e) => setSettingsData({...settingsData, siteName: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Administrator Contact Email</label>
                      <input 
                        type="email" required
                        value={settingsData.contactEmail}
                        onChange={(e) => setSettingsData({...settingsData, contactEmail: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">Official Office Support Phone</label>
                      <input 
                        type="text" required
                        value={settingsData.contactPhone}
                        onChange={(e) => setSettingsData({...settingsData, contactPhone: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-700">ICT Server Uptime Goal</label>
                      <input 
                        type="text" required
                        value={settingsData.ictUptimeGoal}
                        onChange={(e) => setSettingsData({...settingsData, ictUptimeGoal: e.target.value})}
                        className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="pr-4">
                        <p className="text-xs font-bold text-slate-800">Smart GIS Services</p>
                        <p className="text-[10px] text-slate-400">Enable automatic location tracking and coordinates mapping on client itinerary charts.</p>
                      </div>
                      <input 
                        type="checkbox"
                        checked={settingsData.smartServicesActive}
                        onChange={(e) => setSettingsData({...settingsData, smartServicesActive: e.target.checked})}
                        className="h-4.5 w-4.5 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="pr-4">
                        <p className="text-xs font-bold text-slate-800">Website Maintenance Mode</p>
                        <p className="text-[10px] text-slate-400">Put the public tourist site into maintenance mode. Only authorized ICT administrators can access catalog.</p>
                      </div>
                      <input 
                        type="checkbox"
                        checked={settingsData.isMaintenanceMode}
                        onChange={(e) => setSettingsData({...settingsData, isMaintenanceMode: e.target.checked})}
                        className="h-4.5 w-4.5 rounded text-emerald-600 border-slate-300 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#0f5132] hover:bg-[#146c43] text-white transition-all shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>

              </form>
            </div>
          )}

        </main>
      </div>

      {/* MODAL: EDITING ITEM OVERLAY */}
      <AnimatePresence>
        {editingItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/55 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-lg p-6 lg:p-8 text-slate-800 shadow-2xl space-y-5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h4 className="text-sm font-bold text-slate-900 capitalize">
                  Edit {editingItem.type}: {editingItem.data.name || editingItem.data.title}
                </h4>
                <button 
                  onClick={() => setEditingItem(null)}
                  className="p-1 rounded bg-slate-100 text-slate-500 hover:text-slate-700"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <form onSubmit={handleEditSave} className="space-y-4">
                
                {/* Dynamically render common form inputs based on item types */}
                <div className="space-y-3.5 max-h-[350px] overflow-y-auto pr-1">
                  
                  {editingItem.data.name !== undefined && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Name</label>
                      <input 
                        type="text" required
                        value={editingItem.data.name}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, name: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  )}

                  {editingItem.data.title !== undefined && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Title</label>
                      <input 
                        type="text" required
                        value={editingItem.data.title}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, title: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  )}

                  {editingItem.data.subtitle !== undefined && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Subtitle</label>
                      <textarea 
                        rows={2} required
                        value={editingItem.data.subtitle}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, subtitle: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  )}

                  {editingItem.data.description !== undefined && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Description</label>
                      <textarea 
                        rows={3} required
                        value={editingItem.data.description}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, description: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  )}

                  {editingItem.data.summary !== undefined && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Summary</label>
                      <textarea 
                        rows={2} required
                        value={editingItem.data.summary}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, summary: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  )}

                  {editingItem.data.content !== undefined && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Content</label>
                      <textarea 
                        rows={4} required
                        value={editingItem.data.content}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, content: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  )}

                  {editingItem.data.price !== undefined && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Price</label>
                      <input 
                        type="text" required
                        value={editingItem.data.price}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, price: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  )}

                  {editingItem.data.location !== undefined && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Location</label>
                      <input 
                        type="text" required
                        value={editingItem.data.location}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, location: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  )}

                  {editingItem.data.image !== undefined && (
                    <div className="space-y-1">
                      <ImageUploadBox 
                        value={editingItem.data.image}
                        onChange={(val) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, image: val }
                        })}
                        label="Image URL or File"
                        placeholder="Paste image URL or upload..."
                      />
                    </div>
                  )}

                  {editingItem.data.category !== undefined && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Category</label>
                      <input 
                        type="text" required
                        value={editingItem.data.category}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, category: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  )}

                  {editingItem.data.role !== undefined && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Role</label>
                      <input 
                        type="text" required
                        value={editingItem.data.role}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, role: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  )}

                  {(editingItem.data.tier !== undefined || editingItem.type === 'staff') && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Staff Level / Tier</label>
                      <select
                        value={editingItem.data.tier || 'Employee'}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, tier: e.target.value as any }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      >
                        <option value="Director">Director</option>
                        <option value="Manager">Manager</option>
                        <option value="Team Leader">Team Leader</option>
                        <option value="Employee">Employee</option>
                      </select>
                    </div>
                  )}

                  {editingItem.data.email !== undefined && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Email</label>
                      <input 
                        type="email" required
                        value={editingItem.data.email}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, email: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  )}

                  {editingItem.data.phone !== undefined && (
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-slate-600 uppercase">Phone</label>
                      <input 
                        type="text" required
                        value={editingItem.data.phone}
                        onChange={(e) => setEditingItem({
                          ...editingItem,
                          data: { ...editingItem.data, phone: e.target.value }
                        })}
                        className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f5132]"
                      />
                    </div>
                  )}

                </div>

                <div className="pt-4 border-t border-slate-100 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingItem(null)}
                    className="px-4 py-2 text-xs font-semibold rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 text-xs font-semibold rounded-lg bg-[#0f5132] hover:bg-[#146c43] text-white transition-all shadow-sm"
                  >
                    Save Changes
                  </button>
                </div>

              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
