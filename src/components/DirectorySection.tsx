import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MapPin, Coffee, Utensils, Award, Shield, DollarSign, Calendar, Clock, Sparkles, Check } from 'lucide-react';
import { HOTELS, RESTAURANTS } from '../data';
import { Hotel, Restaurant } from '../types';

interface DirectorySectionProps {
  initialTab?: 'hotels' | 'restaurants';
  hotels?: Hotel[];
  restaurants?: Restaurant[];
}

export default function DirectorySection({ initialTab = 'hotels', hotels = HOTELS, restaurants = RESTAURANTS }: DirectorySectionProps) {
  const [activeTab, setActiveTab] = useState<'hotels' | 'restaurants'>(initialTab);
  const [bookingItem, setBookingItem] = useState<{ id: string; name: string; price?: string; type: 'hotel' | 'restaurant' } | null>(null);
  
  // Wizard Booking fields
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDate, setBookingDate] = useState('2026-07-15');
  const [bookingGuests, setBookingGuests] = useState(2);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingPhone, setBookingPhone] = useState('');
  const [bookingSuccessCode, setBookingSuccessCode] = useState('');

  const handleOpenBooking = (item: any, type: 'hotel' | 'restaurant') => {
    setBookingItem({
      id: item.id,
      name: item.name,
      price: item.price || undefined,
      type
    });
    setBookingStep(1);
    setBookingName('');
    setBookingEmail('');
    setBookingPhone('');
    setBookingSuccessCode('');
  };

  const handleConfirmReservation = () => {
    if (!bookingName.trim() || !bookingEmail.trim()) return;
    const refCode = `SH-RE-${Math.floor(100000 + Math.random() * 900000)}`;
    setBookingSuccessCode(refCode);
    setBookingStep(3);
  };

  return (
    <section id="directory" className="py-20 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Toggle Title */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6">
          <div>
            <span className="text-orange-500 font-mono text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
              Visitor Conveniences
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 text-white">Hospitality Directory</h2>
            <p className="text-neutral-400 mt-2 text-xs sm:text-sm max-w-lg">
              Check out Shashemene’s cozy retreat lodges and world-class culinary traditional and vegan hotspots.
            </p>
          </div>

          {/* Directory Navigation Buttons */}
          <div className="flex bg-neutral-950 p-1.5 rounded-2xl border border-neutral-800" id="directory-tabs">
            <button
              onClick={() => setActiveTab('hotels')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer ${
                activeTab === 'hotels' 
                  ? 'bg-orange-600 text-white shadow' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Coffee className="h-4 w-4" />
              Places to Stay
            </button>
            <button
              onClick={() => setActiveTab('restaurants')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all cursor-pointer ${
                activeTab === 'restaurants' 
                  ? 'bg-orange-600 text-white shadow' 
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Utensils className="h-4 w-4" />
              Places to Eat
            </button>
          </div>
        </div>

        {/* Dynamic Display Grid */}
        <AnimatePresence mode="wait">
          {activeTab === 'hotels' ? (
            <motion.div
              key="hotels-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              id="hotels-grid"
            >
              {hotels.map((hotel) => (
                <div 
                  key={hotel.id}
                  className="group bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-orange-500/30 hover:bg-neutral-950/85 transition-all flex flex-col justify-between"
                  id={`hotel-card-${hotel.id}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={hotel.image} 
                      alt={hotel.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-neutral-950/85 border border-neutral-800 px-3 py-1 rounded-lg text-orange-500 font-mono text-[11px] font-bold">
                      {hotel.price}
                    </div>
                  </div>

                  <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold text-amber-50 leading-tight group-hover:text-orange-400 transition-colors">
                          {hotel.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-yellow-500 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded flex-shrink-0">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="font-mono">{hotel.rating}</span>
                        </div>
                      </div>

                      <p className="text-neutral-400 text-xs leading-relaxed font-sans line-clamp-3">
                        {hotel.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {hotel.features.slice(0, 3).map((feat, idx) => (
                          <span key={idx} className="bg-neutral-900 text-neutral-400 text-[9px] font-mono px-2 py-0.5 rounded border border-neutral-800">
                            {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                      <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {hotel.location}
                      </span>
                      <button
                        onClick={() => handleOpenBooking(hotel, 'hotel')}
                        className="bg-orange-600/10 hover:bg-orange-600 text-orange-400 hover:text-white border border-orange-500/20 hover:border-transparent rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer"
                        id={`btn-book-hotel-${hotel.id}`}
                      >
                        Book Stay
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="restaurants-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              id="restaurants-grid"
            >
              {restaurants.map((rest) => (
                <div 
                  key={rest.id}
                  className="group bg-neutral-950 border border-neutral-800 rounded-2xl overflow-hidden hover:border-orange-500/30 hover:bg-neutral-950/85 transition-all flex flex-col justify-between"
                  id={`restaurant-card-${rest.id}`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={rest.image} 
                      alt={rest.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 right-4 bg-orange-600/90 text-white font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded shadow">
                      {rest.cuisine}
                    </div>
                  </div>

                  <div className="p-5 space-y-4 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <h3 className="text-lg font-bold text-amber-50 leading-tight group-hover:text-orange-400 transition-colors">
                          {rest.name}
                        </h3>
                        <div className="flex items-center gap-1 text-xs text-yellow-500 bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded flex-shrink-0">
                          <Star className="h-3 w-3 fill-current" />
                          <span className="font-mono">{rest.rating}</span>
                        </div>
                      </div>

                      <p className="text-neutral-400 text-xs leading-relaxed font-sans line-clamp-3">
                        {rest.description}
                      </p>

                      <div className="bg-neutral-900/40 p-2.5 rounded-lg border border-neutral-800">
                        <span className="text-[10px] text-orange-400 uppercase font-mono font-bold block">House Specialty:</span>
                        <span className="text-xs text-neutral-300 italic font-sans">{rest.specialty}</span>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-900 flex items-center justify-between">
                      <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1">
                        <Clock className="h-3 w-3" /> {rest.hours}
                      </span>
                      <button
                        onClick={() => handleOpenBooking(rest, 'restaurant')}
                        className="bg-orange-600/10 hover:bg-orange-600 text-orange-400 hover:text-white border border-orange-500/20 hover:border-transparent rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer"
                        id={`btn-book-restaurant-${rest.id}`}
                      >
                        Reserve Table
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dynamic Booking & reservation popup wizard */}
        <AnimatePresence>
          {bookingItem && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
              onClick={() => setBookingItem(null)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                className="bg-neutral-950 border border-neutral-800 rounded-3xl w-full max-w-md overflow-hidden text-white shadow-2xl block"
                onClick={(e) => e.stopPropagation()}
                id="booking-dialog"
              >
                {/* Header background with sparks */}
                <div className="bg-gradient-to-r from-orange-600 to-amber-600 p-6 relative">
                  <div className="absolute top-4 right-4 text-white/50 hover:text-white cursor-pointer" onClick={() => setBookingItem(null)}>
                    ✕
                  </div>
                  <span className="text-[10px] uppercase tracking-widest bg-white/10 px-2 py-0.5 rounded text-white font-mono">
                    Instant Secure Booking
                  </span>
                  <h3 className="text-xl font-bold mt-2 text-white">
                    {bookingItem.name}
                  </h3>
                  <div className="flex items-center gap-1 font-mono text-xs text-orange-100/90 mt-1">
                    {bookingItem.type === 'hotel' ? 'Lodging Room' : 'Traditional Dining Table'}
                  </div>
                </div>

                {/* Form fields & Wizard logic */}
                <div className="p-6 space-y-4">
                  
                  {/* STEP 1: Details */}
                  {bookingStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                      id="booking-step-1"
                    >
                      <div className="space-y-1">
                        <label className="text-xs uppercase font-mono text-neutral-500 font-bold flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" /> Date for Arrival
                        </label>
                        <input 
                          type="date"
                          value={bookingDate}
                          onChange={(e) => setBookingDate(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm focus:border-orange-500 outline-none text-neutral-200"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase font-mono text-neutral-500 font-bold">
                          Total {bookingItem.type === 'hotel' ? 'Rooms & Guests' : 'Guests (Covers)'}
                        </label>
                        <select 
                          value={bookingGuests}
                          onChange={(e) => setBookingGuests(Number(e.target.value))}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm focus:border-orange-500 outline-none text-neutral-200"
                        >
                          <option value={1}>1 Person</option>
                          <option value={2}>2 People</option>
                          <option value={4}>4 People</option>
                          <option value={6}>6 People (Group)</option>
                        </select>
                      </div>

                      <div className="bg-neutral-900 border border-neutral-800 p-3.5 rounded-xl flex items-center gap-3">
                        <Shield className="h-5 w-5 text-orange-500 flex-shrink-0" />
                        <span className="text-[11px] text-neutral-400 font-sans leading-normal">
                          Free cancellation up to 48 hours prior. Pay in local Ethiopian Birr or USD at the lobby.
                        </span>
                      </div>

                      <button
                        onClick={() => setBookingStep(2)}
                        className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl text-center text-xs tracking-wider uppercase transition-all mt-4 cursor-pointer"
                        id="btn-goto-step-2"
                      >
                        Proceed to Contact Details
                      </button>
                    </motion.div>
                  )}

                  {/* STEP 2: Contact Info */}
                  {bookingStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="space-y-4"
                      id="booking-step-2"
                    >
                      <div className="space-y-1">
                        <label className="text-xs uppercase font-mono text-neutral-500 font-bold">Full Guest Name</label>
                        <input 
                          type="text"
                          required
                          placeholder="E.g., Legese Tsegaye"
                          value={bookingName}
                          onChange={(e) => setBookingName(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm focus:border-orange-500 outline-none text-neutral-200"
                          id="booking-name-input"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase font-mono text-neutral-500 font-bold">Your Email Address</label>
                        <input 
                          type="email"
                          required
                          placeholder="legesetsegaye41@gmail.com"
                          value={bookingEmail}
                          onChange={(e) => setBookingEmail(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm focus:border-orange-500 outline-none text-neutral-200"
                          id="booking-email-input"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs uppercase font-mono text-neutral-500 font-bold">Mobile Phone (Optional)</label>
                        <input 
                          type="text"
                          placeholder="+251-912-34-5678"
                          value={bookingPhone}
                          onChange={(e) => setBookingPhone(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl p-3 text-sm focus:border-orange-500 outline-none text-neutral-200"
                        />
                      </div>

                      {bookingItem.price && (
                        <div className="bg-neutral-900 p-3.5 rounded-1.5xl border border-neutral-800 text-xs font-mono space-y-1 text-neutral-400">
                          <div className="flex justify-between">
                            <span>Base Rate ({bookingItem.price})</span>
                            <span className="text-neutral-200">{bookingItem.price}</span>
                          </div>
                          <div className="flex justify-between border-t border-neutral-800 pt-1 text-white font-bold">
                            <span>Total Estimated Stay</span>
                            <span>{bookingItem.price}</span>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <button
                          onClick={() => setBookingStep(1)}
                          className="py-3 bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white rounded-xl text-center text-xs font-semibold cursor-pointer"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleConfirmReservation}
                          disabled={!bookingName.trim() || !bookingEmail.trim()}
                          className="py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl text-center text-xs font-bold uppercase transition-all tracking-wider disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                          id="btn-confirm-booking"
                        >
                          Confirm
                        </button>
                      </div>
                    </motion.div>
                  )}

                  {/* STEP 3: Complete Success */}
                  {bookingStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-6 space-y-4"
                      id="booking-step-3"
                    >
                      <div className="mx-auto h-16 w-16 bg-green-500/10 border border-green-500/20 text-green-400 rounded-full flex items-center justify-center">
                        <Check className="h-8 w-8 stroke-[3]" />
                      </div>
                      
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold text-neutral-200">Reservation Completed!</h4>
                        <p className="text-xs text-neutral-400 max-w-xs mx-auto font-sans leading-relaxed">
                          We’ve sent a confirmation email to <span className="text-neutral-300 font-semibold">{bookingEmail}</span>. The local resort office has registered your keys.
                        </p>
                      </div>

                      <div className="bg-neutral-900 border border-neutral-800 p-4 rounded-2xl inline-block">
                        <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Booking Reference</p>
                        <p className="text-lg font-bold font-mono text-orange-400 tracking-wider mt-1">
                          {bookingSuccessCode}
                        </p>
                      </div>

                      <div className="text-[10px] text-neutral-500 font-mono italic max-w-xs mx-auto">
                        Note: Legese Tsegaye (ICT Smart Support) has authorized this reservation under local database logs. Thank you for visiting!
                      </div>

                      <button
                        onClick={() => setBookingItem(null)}
                        className="w-full bg-neutral-800 hover:bg-neutral-700 text-white font-bold py-3 px-4 rounded-xl text-center text-xs mt-4 transition-all cursor-pointer"
                      >
                        Close Portal Window
                      </button>
                    </motion.div>
                  )}

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
