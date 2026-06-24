import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MapPin, Calendar, CheckCircle2, Bookmark, Heart, X, MessageSquare, Send } from 'lucide-react';
import { ATTRACTIONS } from '../data';
import { Attraction } from '../types';

interface AttractionsGridProps {
  onPlanTripTrigger: (attractionName: string) => void;
  savedList: string[];
  onToggleSave: (id: string) => void;
  scrollToSection: (id: string) => void;
  attractions?: Attraction[];
}

export default function AttractionsGrid({ onPlanTripTrigger, savedList, onToggleSave, scrollToSection, attractions = ATTRACTIONS }: AttractionsGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Nature' | 'Culture' | 'History'>('All');
  const [activeModal, setActiveModal] = useState<Attraction | null>(null);

  // Reviews simulated state
  const [reviews, setReviews] = useState<Record<string, { author: string; rating: number; text: string; date: string }[]>>({
    'wondo-genet': [
      { author: 'Sarah K.', rating: 5, text: 'The natural hot baths are incredible! We hiked to the upper waterfall and spotted three colobus monkeys.', date: '3 days ago' },
      { author: 'Sven Larson', rating: 4, text: 'Beautiful evergreen scenery, very relaxing. Don’t miss the authentic coffee ceremony just outside!', date: '1 week ago' }
    ],
    'rastafari-community': [
      { author: 'Elena Rostova', rating: 5, text: 'Unbelievably rich culture. The museum has some very unique artifacts and the ital food was fantastic.', date: 'Yesterday' }
    ]
  });

  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');

  const categories: ('All' | 'Nature' | 'Culture' | 'History')[] = ['All', 'Nature', 'Culture', 'History'];

  const filteredAttractions = selectedCategory === 'All' 
    ? attractions 
    : attractions.filter((a) => a.category === selectedCategory);

  const handlePostReview = (attractionId: string) => {
    if (!newReviewAuthor.trim() || !newReviewText.trim()) return;
    
    const submittedReview = {
      author: newReviewAuthor,
      rating: newReviewRating,
      text: newReviewText,
      date: 'Just now'
    };

    setReviews(prev => ({
      ...prev,
      [attractionId]: [submittedReview, ...(prev[attractionId] || [])]
    }));

    setNewReviewAuthor('');
    setNewReviewText('');
    setNewReviewRating(5);
  };

  const getCombinedRating = (id: string, initialRating: number) => {
    const records = reviews[id] || [];
    if (!records.length) return initialRating;
    const sum = records.reduce((acc, cur) => acc + cur.rating, 0) + initialRating;
    return parseFloat((sum / (records.length + 1)).toFixed(1));
  };

  const modalRating = activeModal ? getCombinedRating(activeModal.id, activeModal.rating) : 0;

  return (
    <section id="attractions" className="py-20 bg-neutral-950 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-orange-500 font-mono text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
            Regional Highlights
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 text-white">Explore Attractions</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
          <p className="text-neutral-400 mt-4 text-xs sm:text-sm">
            Discover a landscape where ecological wonders blend seamlessly with ancient tribal assembly grounds and global heritage.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12" id="attractions-filter">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 text-xs sm:text-sm font-semibold rounded-full border transition-all cursor-pointer ${
                selectedCategory === cat 
                  ? 'bg-orange-600 border-orange-500 text-white shadow-lg' 
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:text-white hover:border-neutral-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Attractions Grid Cards */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredAttractions.map((att) => {
              const isSaved = savedList.includes(att.id);
              const customRating = getCombinedRating(att.id, att.rating);
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  key={att.id}
                  className="group bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden hover:border-orange-500/40 hover:bg-neutral-900/90 transition-all flex flex-col h-full shadow-lg"
                  id={`attraction-card-${att.id}`}
                >
                  {/* Card Banner Image */}
                  <div className="relative h-60 sm:h-64 overflow-hidden">
                    <img 
                      src={att.image} 
                      alt={att.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent to-transparent" />
                    
                    {/* Category tag */}
                    <span className="absolute top-4 left-4 bg-orange-600 font-mono text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full shadow-lg">
                      {att.category}
                    </span>

                    {/* Bookmark Toggle */}
                    <button
                      onClick={() => onToggleSave(att.id)}
                      className={`absolute top-4 right-4 p-2 rounded-full border backdrop-blur-md transition-all ${
                        isSaved 
                          ? 'bg-orange-600 border-orange-500 text-white' 
                          : 'bg-neutral-950/50 border-neutral-700 text-neutral-300 hover:text-white hover:scale-105 shadow'
                      }`}
                      title={isSaved ? 'Remove from saved' : 'Save attraction'}
                    >
                      <Heart className={`h-4 w-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  {/* Card Content body */}
                  <div className="p-6 flex flex-col flex-grow space-y-3 justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-white group-hover:text-orange-400 transition-colors">
                          {att.name}
                        </h3>
                        <div className="flex items-center gap-1.5 bg-neutral-950 px-2 py-1 rounded-lg border border-neutral-800 flex-shrink-0">
                          <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                          <span className="text-xs font-bold font-mono text-neutral-200">
                            {customRating}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-neutral-400 mt-2 line-clamp-2 leading-relaxed font-sans">
                        {att.description}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-800 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-neutral-400 font-mono text-[11px]">
                        <MapPin className="h-3.5 w-3.5 text-neutral-600" />
                        <span className="truncate max-w-[140px] sm:max-w-[200px]" title={att.coordinates}>
                          {att.coordinates}
                        </span>
                      </div>
                      
                      <button
                        onClick={() => setActiveModal(att)}
                        className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-orange-700/50 group-hover:bg-orange-600 border border-orange-500/20 hover:border-orange-500/40 transition-colors cursor-pointer"
                        id={`btn-learn-more-${att.id}`}
                      >
                        Deep Explore →
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Dynamic Details Modal Dialog - overlaying screen */}
        <AnimatePresence>
          {activeModal && (
            <div 
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
              onClick={() => setActiveModal(null)}
            >
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-neutral-900 border border-neutral-800 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto text-white shadow-2xl relative block"
                onClick={(e) => e.stopPropagation()}
                id="details-modal"
              >
                {/* Close absolute button */}
                <button 
                  onClick={() => setActiveModal(null)}
                  className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-neutral-950 hover:bg-neutral-800 border border-neutral-800 hover:scale-105 transition-all text-neutral-400 hover:text-white"
                >
                  <X className="h-5 w-5" />
                </button>

                {/* Banner Hero Image */}
                <div className="relative h-64 md:h-80 overflow-hidden">
                  <img 
                    src={activeModal.image} 
                    alt={activeModal.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/60 to-transparent" />
                  
                  <div className="absolute bottom-6 left-6 md:left-8 right-6">
                    <span className="bg-orange-600 font-mono text-[10px] uppercase font-semibold tracking-widest px-3 py-1 rounded-full shadow-lg">
                      {activeModal.category}
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mt-2">
                      {activeModal.name}
                    </h1>
                  </div>
                </div>

                {/* Modal main content grid */}
                <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Left Column Description */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-amber-50 mb-2">Heritage Insight</h3>
                      <p className="text-neutral-300 text-sm leading-relaxed font-sans">
                        {activeModal.longDescription}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-amber-50 mb-3">Expedition Highlights</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {activeModal.highlights.map((highlight, index) => (
                          <div key={index} className="flex items-center gap-2 bg-neutral-950 p-2.5 rounded-lg border border-neutral-800/60">
                            <CheckCircle2 className="h-4 w-4 text-orange-500 flex-shrink-0" />
                            <span className="text-xs text-neutral-300 font-sans">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Interactive Review Form */}
                    <div className="border-t border-neutral-800 pt-6">
                      <h3 className="text-base font-bold text-amber-50 mb-4 flex items-center gap-1.5">
                        <MessageSquare className="h-4.5 w-4.5 text-orange-500" /> Visitor Reviews & Comments
                      </h3>

                      <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 space-y-3 mb-6">
                        <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase">Write a review</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input 
                            type="text" 
                            placeholder="Your name" 
                            value={newReviewAuthor}
                            onChange={(e) => setNewReviewAuthor(e.target.value)}
                            className="bg-neutral-900 border border-neutral-800 focus:border-orange-500 text-xs text-neutral-200 p-2.5 rounded-lg focus:outline-none"
                            id="review-author-input"
                          />
                          <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-3.5 py-2.5 rounded-lg">
                            <span className="text-xs text-neutral-400">Rating:</span>
                            <div className="flex gap-1">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                  key={s}
                                  type="button"
                                  onClick={() => setNewReviewRating(s)}
                                  className="text-yellow-500 focus:outline-none"
                                >
                                  <Star className={`h-3 w-3 ${newReviewRating >= s ? 'fill-current' : ''}`} />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <textarea 
                            placeholder="Share your experience..." 
                            rows={2}
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 focus:border-orange-500 text-xs text-neutral-200 p-2.5 rounded-lg focus:outline-none resize-none"
                            id="review-text-textarea"
                          />
                          <button
                            onClick={() => handlePostReview(activeModal.id)}
                            className="bg-orange-600 hover:bg-orange-500 text-white p-3.5 rounded-lg flex items-center justify-center transition-all flex-shrink-0 cursor-pointer"
                          >
                            <Send className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Displaying Reviews */}
                      <div className="space-y-4 max-h-60 overflow-y-auto pr-1">
                        {(reviews[activeModal.id] || []).map((rev, i) => (
                          <div key={i} className="bg-neutral-950 p-3.5 rounded-xl border border-neutral-800/50 flex flex-col sm:flex-row gap-3">
                            <div className="flex-shrink-0 flex sm:flex-col items-center gap-1 bg-neutral-900/60 px-2 py-1.5 sm:py-2.5 rounded-lg border border-neutral-800">
                              <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
                              <span className="text-[10px] font-bold font-mono text-neutral-300">{rev.rating}.0</span>
                            </div>
                            <div>
                              <div className="flex items-center justify-between">
                                <span className="font-bold text-xs text-orange-400">{rev.author}</span>
                                <span className="text-[10px] text-neutral-500 font-mono">{rev.date}</span>
                              </div>
                              <p className="text-xs text-neutral-300 mt-1 leading-relaxed font-sans">{rev.text}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Right Column quick facts */}
                  <div className="space-y-6">
                    <div className="bg-neutral-950/80 p-5 rounded-2xl border border-neutral-800 space-y-4">
                      <h3 className="text-base font-bold text-amber-50 border-b border-neutral-800 pb-2">Travel Advisory</h3>
                      
                      <div>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Best season</p>
                        <p className="text-xs text-neutral-200 mt-1 flex items-center gap-1.5 font-sans">
                          <Calendar className="h-4 w-4 text-orange-500 flex-shrink-0" />
                          {activeModal.bestTime}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Coordinates</p>
                        <p className="text-xs text-neutral-200 mt-1 flex items-center gap-1.5 font-sans">
                          <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
                          {activeModal.coordinates}
                        </p>
                      </div>

                      <div>
                        <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Global Rating</p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex gap-0.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className={`h-3 w-3 fill-yellow-500 text-yellow-500 ${modalRating >= s ? '' : 'opacity-20'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-neutral-300 font-mono font-semibold">({modalRating} / 5)</span>
                        </div>
                      </div>
                    </div>

                    {/* Plan trip button integration as requested */}
                    <button
                      onClick={() => {
                        onPlanTripTrigger(activeModal.name);
                        setActiveModal(null);
                        scrollToSection('events');
                      }}
                      className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl text-center text-xs flex items-center justify-center gap-2 shadow-lg hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      <Bookmark className="h-4 w-4" />
                      Add to My Custom Planner
                    </button>
                  </div>

                </div>

              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
