import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  UserCheck, 
  Mail, 
  Phone, 
  ShieldAlert, 
  Award, 
  ChevronDown, 
  CheckCircle, 
  Send, 
  MessageSquareText,
  Briefcase,
  Sparkles,
  Users,
  User 
} from 'lucide-react';
import { STAFF } from '../data';
import { StaffMember } from '../types';

interface StaffDirectoryProps {
  staff?: StaffMember[];
}

export default function StaffDirectory({ staff = STAFF }: StaffDirectoryProps) {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Director' | 'Manager' | 'Team Leader' | 'Employee'>('All');
  const [showResponsibilities, setShowResponsibilities] = useState<string | null>(null);
  
  // Custom contact message simulations targeting individual staff
  const [contactMessage, setContactMessage] = useState('');
  const [contactSenderName, setContactSenderName] = useState('');
  const [sentSuccessId, setSentSuccessId] = useState<string | null>(null);

  const handleSendMessage = (staffId: string) => {
    if (!contactMessage.trim() || !contactSenderName.trim()) return;
    setSentSuccessId(staffId);
    setContactMessage('');
    setContactSenderName('');
    
    // Clear success banner after 6s
    setTimeout(() => {
      setSentSuccessId(null);
    }, 6000);
  };

  const filters: { id: 'All' | 'Director' | 'Manager' | 'Team Leader' | 'Employee'; label: string }[] = [
    { id: 'All', label: 'All Staff' },
    { id: 'Director', label: 'Directors' },
    { id: 'Manager', label: 'Managers' },
    { id: 'Team Leader', label: 'Team Leaders' },
    { id: 'Employee', label: 'Employees' }
  ];

  const getTierBadge = (tier?: string) => {
    switch (tier) {
      case 'Director':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-purple-500/15 border border-purple-500/30 text-purple-400 px-2.5 py-0.5 rounded-full">
            <Award className="h-3 w-3" /> Director
          </span>
        );
      case 'Manager':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 px-2.5 py-0.5 rounded-full">
            <Briefcase className="h-3 w-3" /> Manager
          </span>
        );
      case 'Team Leader':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-orange-500/15 border border-orange-500/30 text-orange-400 px-2.5 py-0.5 rounded-full">
            <Sparkles className="h-3 w-3" /> Team Leader
          </span>
        );
      case 'Employee':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-500/15 border border-slate-500/30 text-slate-400 px-2.5 py-0.5 rounded-full">
            <Users className="h-3 w-3" /> Employee
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="staff" className="py-20 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-orange-500 font-mono text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
            Smart Municipality Team
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mt-4 text-white">Our Board & Leaders</h2>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-3 rounded-full" />
          <p className="text-neutral-400 mt-4 text-xs sm:text-sm">
            Meet the administration officers coordinating historic preservation, diaspora lands, and digital ICT services.
          </p>
        </div>

        {/* Category segment controller */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-4xl mx-auto" id="staff-tier-filters">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.id;
            const count = filter.id === 'All' 
              ? staff.length 
              : staff.filter(s => s.tier === filter.id).length;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/10 scale-[1.03]'
                    : 'bg-neutral-950 text-neutral-400 border-neutral-800 hover:text-white hover:border-neutral-700'
                }`}
              >
                <span>{filter.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-orange-600 text-orange-100' : 'bg-neutral-900 text-neutral-500'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Staff Cards Layout grid */}
        <div className="space-y-12">
          
          {/* SPECIAL SPOTLIGHT CARD: Show only when 'All' or 'Team Leader' is selected (and the leader is highlighted) */}
          {(activeFilter === 'All' || activeFilter === 'Team Leader') && 
            staff.filter(s => s.highlighted).map((leader) => {
              const isSentLocal = sentSuccessId === leader.id;
              const isOpenResp = showResponsibilities === leader.id;
              return (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  key={leader.id}
                  className="relative bg-neutral-950 rounded-3xl p-6 md:p-10 border-2 border-orange-600/60 overflow-hidden shadow-2xl block"
                  id="staff-leader-spotlight"
                >
                  {/* Visual Accent Glowing Orbs */}
                  <div className="absolute top-0 right-0 h-60 w-60 bg-orange-600/10 blur-3xl rounded-full" />
                  <div className="absolute bottom-0 left-0 h-60 w-60 bg-purple-600/10 blur-3xl rounded-full" />
                  
                  <span className="absolute top-6 right-6 font-mono text-[9px] uppercase tracking-widest bg-orange-500/15 border border-orange-500/30 text-orange-400 font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Award className="h-3 w-3" /> Special Team Leader Spotlight
                  </span>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    
                    {/* Left portrait image column */}
                    <div className="lg:col-span-4 flex flex-col items-center text-center">
                      <div className="relative h-44 w-44 md:h-56 md:w-56 rounded-full p-1.5 bg-gradient-to-tr from-orange-600 via-amber-500 to-purple-600 shadow-2xl overflow-hidden aspect-square">
                        <img 
                          src={leader.image} 
                          alt={leader.name} 
                          className="w-full h-full object-cover rounded-full filter brightness-105"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="bg-neutral-900/80 px-4 py-1.5 rounded-full border border-neutral-800/80 mt-5 inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[11px] font-mono text-neutral-300">Active Office Host</span>
                      </div>
                    </div>

                    {/* Right Description text Column */}
                    <div className="lg:col-span-8 space-y-5">
                      <div className="flex flex-col gap-1.5">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <h3 className="text-3xl md:text-4xl font-serif font-black tracking-tight text-white capitalize leading-tight">
                            {leader.name}
                          </h3>
                          {getTierBadge(leader.tier)}
                        </div>
                        <p className="text-orange-400 font-mono text-sm tracking-widest font-bold uppercase mt-1">
                          {leader.role}
                        </p>
                        <p className="text-neutral-500 text-xs font-sans mt-0.5">
                          {leader.department}
                        </p>
                      </div>

                      <p className="text-neutral-300 text-sm md:text-base leading-relaxed font-sans max-w-3xl">
                        {leader.bio}
                      </p>

                      {/* Contacts info row */}
                      <div className="flex flex-wrap gap-4 pt-2">
                        <a 
                          href={`mailto:${leader.email}`}
                          className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-850 px-4 py-2 rounded-xl text-xs text-neutral-300 border border-neutral-800 hover:border-orange-500/30 transition-all font-sans cursor-pointer"
                        >
                          <Mail className="h-3.5 w-3.5 text-orange-500" />
                          {leader.email}
                        </a>
                        <a 
                          href={`tel:${leader.phone}`}
                          className="flex items-center gap-2 bg-neutral-900 hover:bg-neutral-850 px-4 py-2 rounded-xl text-xs text-neutral-300 border border-neutral-800 hover:border-orange-500/30 transition-all font-sans cursor-pointer"
                        >
                          <Phone className="h-3.5 w-3.5 text-orange-500" />
                          {leader.phone}
                        </a>
                      </div>

                      {/* Collapsible Administrative Tasks List */}
                      <div className="border-t border-neutral-800 pt-4">
                        <button
                          onClick={() => setShowResponsibilities(isOpenResp ? null : leader.id)}
                          className="flex items-center gap-1.5 text-xs text-orange-400 font-bold hover:text-white transition-colors cursor-pointer"
                          id="btn-toggle-responsibilities"
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${isOpenResp ? 'rotate-180' : ''}`} />
                          {isOpenResp ? 'Hide Official ICT Mandates' : 'View Official ICT Mandates & Responsibilities'}
                        </button>

                        <AnimatePresence>
                          {isOpenResp && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden mt-3 max-w-3xl"
                            >
                              <ul className="space-y-2 bg-neutral-900 p-4 rounded-2xl border border-neutral-800/60">
                                {leader.responsibilities.map((resp, i) => (
                                  <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 leading-relaxed font-sans">
                                    <CheckCircle className="h-4 w-4 text-orange-500 mt-0.5 flex-shrink-0" />
                                    <span>{resp}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Interactive spotlight write-a-message module */}
                      <div className="bg-neutral-900 p-4 rounded-2xl border border-neutral-800 mt-6 overflow-hidden">
                        <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-neutral-400 uppercase mb-3">
                          <MessageSquareText className="h-4.5 w-4.5 text-orange-400" /> Deliver an official message to Legese
                        </div>

                        <AnimatePresence mode="wait">
                          {isSentLocal ? (
                            <motion.div
                              key="success"
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0.95, opacity: 0 }}
                              className="bg-green-500/5 border border-green-500/25 p-3.5 rounded-xl text-center"
                            >
                              <CheckCircle className="h-6 w-6 text-green-400 mx-auto" />
                              <p className="text-xs text-neutral-200 mt-1.5 font-sans leading-relaxed">
                                Thank you for the note! <span className="text-white font-semibold">Legese Tsegaye</span> and the ICT Smart Bureau team will review your inquiry at <span className="text-orange-400 font-mono font-semibold">{leader.email}</span> and respond shortly.
                              </p>
                            </motion.div>
                          ) : (
                            <motion.div 
                              key="inputs"
                              className="space-y-3"
                            >
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <input 
                                  type="text"
                                  placeholder="Your Name"
                                  required
                                  value={contactSenderName}
                                  onChange={(e) => setContactSenderName(e.target.value)}
                                  className="bg-neutral-950 border border-neutral-800 focus:border-orange-500 text-xs text-neutral-200 px-3.5 py-2.5 rounded-xl focus:outline-none"
                                  id="leader-sender-name"
                                />
                                <input 
                                  type="text"
                                  placeholder="Your Contact (Email / Phone)"
                                  className="bg-neutral-950 border border-neutral-800 focus:border-orange-500 text-xs text-neutral-200 px-3.5 py-2.5 rounded-xl focus:outline-none"
                                />
                              </div>
                              <div className="flex gap-2">
                                <input 
                                  type="text"
                                  placeholder="Write your brief tourism inquiry or digital feedback..."
                                  required
                                  value={contactMessage}
                                  onChange={(e) => setContactMessage(e.target.value)}
                                  className="w-full bg-neutral-950 border border-neutral-800 focus:border-orange-500 text-xs text-neutral-200 px-3.5 py-2.5 rounded-xl focus:outline-none"
                                  id="leader-contact-message"
                                />
                                <button
                                  onClick={() => handleSendMessage(leader.id)}
                                  disabled={!contactMessage.trim() || !contactSenderName.trim()}
                                  className="bg-orange-600 hover:bg-orange-500 text-white px-4 rounded-xl flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                                  id="btn-submit-leader-message"
                                >
                                  <Send className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                    </div>

                  </div>
                </motion.div>
              );
            })
          }

          {/* TEAM MEMBERS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            {staff
              .filter((s) => {
                if (activeFilter === 'All') {
                  // Show non-highlighted staff when in 'All' tab
                  return !s.highlighted;
                } else {
                  // Show all staff of specific level in that tab, highlighted or not
                  return s.tier === activeFilter;
                }
              })
              .map((team) => {
                const isSentLocal = sentSuccessId === team.id;
                return (
                  <div 
                    key={team.id}
                    className="bg-neutral-950 border border-neutral-850 rounded-2xl p-6 hover:border-orange-500/25 transition-all flex flex-col justify-between space-y-5"
                    id={`staff-${team.id}`}
                  >
                    <div className="flex gap-4 items-start justify-between">
                      <div className="flex gap-4 items-center">
                        <img 
                          src={team.image} 
                          alt={team.name} 
                          className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover filter brightness-105"
                          referrerPolicy="no-referrer"
                        />
                        <div>
                          <h4 className="text-xl font-bold font-sans text-neutral-100 group-hover:text-orange-400 transition-colors">{team.name}</h4>
                          <p className="text-orange-500 font-mono text-[10px] uppercase font-bold tracking-widest mt-0.5">{team.role}</p>
                          <p className="text-neutral-500 text-[10px] font-sans">{team.department}</p>
                        </div>
                      </div>
                      <div className="flex-shrink-0">
                        {getTierBadge(team.tier)}
                      </div>
                    </div>

                    <p className="text-neutral-400 text-xs font-sans leading-relaxed flex-grow">
                      {team.bio}
                    </p>

                    <div className="space-y-3 pt-3 border-t border-neutral-900">
                      <div className="flex flex-wrap gap-2 text-[10px] text-neutral-500">
                        <span className="bg-neutral-900 px-2 py-1 rounded flex items-center gap-1">
                          <Mail className="h-3 w-3 text-orange-500" /> {team.email}
                        </span>
                        {team.phone && (
                          <span className="bg-neutral-900 px-2 py-1 rounded flex items-center gap-1">
                            <Phone className="h-3 w-3 text-orange-500" /> {team.phone}
                          </span>
                        )}
                      </div>

                      {/* Quick contact trigger toggle */}
                      <div className="space-y-1">
                        {isSentLocal ? (
                          <div className="bg-green-500/5 p-2 rounded-lg border border-green-500/20 text-center text-[10px] text-neutral-300 font-sans leading-relaxed">
                            Message dispatched to {team.name}! We will follow up shortly.
                          </div>
                        ) : (
                          <div className="flex gap-1.5">
                            <input 
                              type="text"
                              placeholder="Type a quick word..."
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                  setSentSuccessId(team.id);
                                  setTimeout(() => setSentSuccessId(null), 3500);
                                }
                              }}
                              className="bg-neutral-900 border border-neutral-850 text-[10px] text-neutral-300 px-2 py-1.5 rounded-lg flex-grow focus:outline-none focus:border-orange-500"
                            />
                            <button
                              onClick={() => {
                                setSentSuccessId(team.id);
                                setTimeout(() => setSentSuccessId(null), 3500);
                              }}
                              className="bg-neutral-800 hover:bg-orange-600 text-neutral-300 hover:text-white px-3 py-1.5 rounded-lg text-[10px] font-bold cursor-pointer"
                            >
                              Send
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                );
              })}
          </div>

          {/* Empty state when no staff matches the tier */}
          {staff.filter((s) => activeFilter === 'All' ? true : s.tier === activeFilter).length === 0 && (
            <div className="text-center py-12 bg-neutral-950 rounded-2xl border border-neutral-800">
              <ShieldAlert className="h-8 w-8 text-neutral-600 mx-auto" />
              <p className="text-sm text-neutral-400 mt-2 font-mono">No staff found under this tier tier.</p>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
