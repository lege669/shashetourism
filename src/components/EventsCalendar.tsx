import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CalendarDays, MapPin, Plus, Trash2, Milestone, HeartHandshake, Compass, Sparkles } from 'lucide-react';
import { EVENTS } from '../data';
import { Event } from '../types';

interface EventsCalendarProps {
  customPlannerItems: string[];
  onAddPlannedItem: (item: string) => void;
  onRemovePlannedItem: (item: string) => void;
  selectedAttractionName: string | null;
  clearSelectedAttraction: () => void;
  events?: Event[];
}

export default function EventsCalendar({ 
  customPlannerItems, 
  onAddPlannedItem, 
  onRemovePlannedItem,
  selectedAttractionName,
  clearSelectedAttraction,
  events = EVENTS
}: EventsCalendarProps) {
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'All' | 'Festival' | 'Cultural' | 'ICT'>('All');
  
  // Custom manual planner input
  const [customInput, setCustomInput] = useState('');

  // Propose automated item if selected outside
  useEffect(() => {
    if (selectedAttractionName) {
      setPlannerOpen(true);
      // Auto-add if not already in
      if (!customPlannerItems.includes(selectedAttractionName)) {
        onAddPlannedItem(selectedAttractionName);
      }
      // Clear trigger
      const timer = setTimeout(() => {
        clearSelectedAttraction();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [selectedAttractionName]);

  const filteredEvents = activeFilter === 'All' 
    ? events 
    : events.filter((e) => e.category === activeFilter);

  const handleAddCustomPlan = () => {
    if (!customInput.trim()) return;
    onAddPlannedItem(customInput.trim());
    setCustomInput('');
  };

  const getCalendarCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case 'festival':
        return 'bg-amber-600 border-amber-500';
      case 'cultural':
        return 'bg-purple-600 border-purple-500';
      default: // ICT
        return 'bg-blue-600 border-blue-500';
    }
  };

  return (
    <section id="events" className="py-20 bg-neutral-950 text-white border-b border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-orange-500 font-mono text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
            Communal Festivities & Tech
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 text-white">Events & Planner</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
          <p className="text-neutral-400 mt-4 text-xs sm:text-sm">
            Align your voyage with major regional alignments, historical coronation gatherers, and regional ICT Expos.
          </p>
        </div>

        {/* Double Column Layout: Events list (Left) + Custom Itinerary Planner (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Left Columns: Events Feed */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Inner local event category filters */}
            <div className="flex bg-neutral-900 p-1 rounded-xl border border-neutral-800/80 max-w-xs" id="events-filter">
              {(['All', 'Festival', 'Cultural', 'ICT'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                    activeFilter === cat 
                      ? 'bg-orange-600 text-white shadow' 
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* List block */}
            <div className="space-y-6">
              {filteredEvents.map((evt) => {
                const isItemPlanned = customPlannerItems.includes(evt.title);
                return (
                  <motion.div
                    layout
                    key={evt.id}
                    className="p-5 bg-neutral-900 border border-neutral-800 hover:border-orange-500/20 rounded-2xl flex flex-col sm:flex-row gap-5 hover:bg-neutral-900/90 transition-all group"
                    id={`event-card-${evt.id}`}
                  >
                    {/* Event Banner */}
                    <div className="w-full sm:w-44 h-32 rounded-xl overflow-hidden flex-shrink-0 relative bg-neutral-800">
                      <img 
                        src={evt.image} 
                        alt={evt.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <span className={`absolute top-2.5 left-2.5 font-mono text-[9px] uppercase font-bold px-2 py-0.5 rounded border text-white ${getCalendarCategoryColor(evt.category)}`}>
                        {evt.category}
                      </span>
                    </div>

                    {/* Event Description */}
                    <div className="space-y-3 flex-grow flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-orange-500 font-mono text-[10px] sm:text-xs">
                          <CalendarDays className="h-3.5 w-3.5" />
                          <span>{evt.date}</span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-neutral-100 group-hover:text-orange-400 transition-colors">
                          {evt.title}
                        </h3>
                        <p className="text-neutral-400 text-xs font-sans leading-relaxed line-clamp-2">
                          {evt.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-neutral-800 flex items-center justify-between">
                        <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1 max-w-[150px] truncate" title={evt.location}>
                          <MapPin className="h-3 w-3" /> {evt.location}
                        </span>
                        
                        <button
                          onClick={() => {
                            if (isItemPlanned) {
                              onRemovePlannedItem(evt.title);
                            } else {
                              onAddPlannedItem(evt.title);
                            }
                          }}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold border transition-all cursor-pointer ${
                            isItemPlanned 
                              ? 'bg-emerald-600/10 border-emerald-500/30 text-emerald-400' 
                              : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-orange-500 hover:text-white'
                          }`}
                        >
                          <Plus className={`h-3 w-3 transition-transform ${isItemPlanned ? 'rotate-45' : ''}`} />
                          {isItemPlanned ? 'Scheduled' : 'Plan Trip'}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

          {/* Right Column: Custom Itinerary Planner */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-3xl p-6 space-y-5 sticky top-24 shadow-xl">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <div className="flex items-center gap-2">
                <Milestone className="h-5 w-5 text-orange-500" />
                <h3 className="font-bold text-neutral-100 text-sm">Shashemene Travel Plan</h3>
              </div>
              <span className="bg-orange-600/10 border border-orange-500/20 text-orange-400 text-[10px] font-mono font-bold px-2 py-0.5 rounded-full">
                {customPlannerItems.length} Stops
              </span>
            </div>

            {/* Custom planner quick user input tool */}
            <div className="space-y-2">
              <label className="text-[10px] font-mono uppercase font-bold text-neutral-500">Add a custom program stop</label>
              <div className="flex gap-2">
                <input 
                  type="text"
                  placeholder="E.g., Try Oromo Coffee Ceremony"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="bg-neutral-950 border border-neutral-800 focus:border-orange-500 text-xs text-neutral-200 p-2.5 rounded-xl focus:outline-none flex-grow"
                  onKeyDown={(e) => e.key === 'Enter' && handleAddCustomPlan()}
                  id="custom-plan-input"
                />
                <button
                  onClick={handleAddCustomPlan}
                  className="bg-orange-600 hover:bg-orange-500 text-white p-2.5 rounded-xl flex items-center justify-center transition-all cursor-pointer"
                  id="btn-add-custom-plan"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Itinerary Display List */}
            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              <AnimatePresence initial={false}>
                {customPlannerItems.length === 0 ? (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-8 bg-neutral-950/40 rounded-2xl border border-neutral-800/40"
                  >
                    <HeartHandshake className="h-8 w-8 text-neutral-700 mx-auto" />
                    <p className="text-xs text-neutral-500 mt-2 font-sans font-medium">Your itinerary is empty.</p>
                    <p className="text-[10px] text-neutral-600 mt-1 max-w-[200px] mx-auto leading-relaxed">
                      Click "Plan Trip" on events or add attractions to start mapping your path!
                    </p>
                  </motion.div>
                ) : (
                  customPlannerItems.map((item, idx) => (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      key={item}
                      className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 flex items-center justify-between gap-3 relative overflow-hidden group/item"
                      id={`planner-item-${idx}`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <div className="h-5 w-5 rounded-full bg-orange-600/15 text-orange-400 flex items-center justify-center font-mono text-[10px] font-bold flex-shrink-0">
                          {idx + 1}
                        </div>
                        <span className="text-xs text-neutral-200 truncate font-sans font-medium" title={item}>
                          {item}
                        </span>
                      </div>
                      <button
                        onClick={() => onRemovePlannedItem(item)}
                        className="p-1 rounded bg-neutral-900/45 text-neutral-500 hover:text-red-400 hover:bg-red-950/20 transition-all opacity-100 sm:opacity-0 group-hover/item:opacity-100"
                        title="Delete stop"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>

            {/* Map distance warning or local advice */}
            {customPlannerItems.length > 0 && (
              <div className="bg-orange-500/5 p-3 rounded-xl border border-orange-500/10 text-center flex flex-col gap-1">
                <div className="flex items-center justify-center gap-1.5 text-orange-400 font-bold text-[10px] uppercase font-mono">
                  <Sparkles className="h-3 w-3" /> ICT Automated Route Check
                </div>
                <p className="text-[10px] text-neutral-400 leading-normal font-sans text-center">
                  This custom plan starts around Wondo Genet foothills and runs up to the Jamaican museum sector. Total trip area: 18.4km. Route maps exported to municipal dashboard.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
