import React, { useState } from 'react';
import { Landmark, Mail, Phone, MapPin, Youtube, Github, RefreshCw, Sun, Moon } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
}

export default function Footer({ onNavigate, theme, onToggleTheme }: FooterProps) {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubscribed(true);
      setEmailInput('');
    }, 1000);
  };

  return (
    <footer className="bg-neutral-950 border-t-2 border-orange-600 text-white font-sans overflow-hidden">
      
      {/* Decorative top row gradient line */}
      <div className="h-0.5 bg-gradient-to-r from-orange-600 via-amber-500 to-purple-600" />

      {/* Main Grid section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-12 gap-10">
        
        {/* Brand Column (5-cols) */}
        <div className="md:col-span-5 space-y-4">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => onNavigate('home')}>
            <div className="bg-orange-600/10 p-1 rounded-lg border border-orange-500/10">
              <Landmark className="h-5 w-5 text-orange-500" />
            </div>
            <span className="font-sans text-lg font-bold tracking-tight">
              Shashemene <span className="text-orange-500 font-extrabold">Tourism</span>
            </span>
          </div>
          <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
            Preserving cultural treasures, cataloging highland eco-sanctuaries, and setting up centralized municipal services inside Ethiopia's unique Central Great Rift Valley.
          </p>

          <div className="space-y-2 text-xs text-neutral-400">
            <div className="flex items-center gap-2 font-sans">
              <MapPin className="h-4 w-4 text-orange-500 flex-shrink-0" />
              <span>Municipal Building, Shashemene, Oromia, Ethiopia</span>
            </div>
            <div className="flex items-center gap-2 font-sans">
              <Mail className="h-4 w-4 text-orange-500 flex-shrink-0" />
              <span>contact@shashemenetourism.gov.et</span>
            </div>
          </div>
        </div>

        {/* Quick Links Column (3-cols) */}
        <div className="md:col-span-3 space-y-4 text-left">
          <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-bold border-b border-neutral-900 pb-2">
            Explore Destinations
          </h4>
          <ul className="text-xs space-y-2 text-neutral-400">
            <li>
              <button onClick={() => onNavigate('attractions')} className="hover:text-orange-400 transition-colors cursor-pointer text-left block">
                → Wondo Genet Hot Springs
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('attractions')} className="hover:text-orange-400 transition-colors cursor-pointer text-left block">
                → Rastafaris Diaspora Museum
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('attractions')} className="hover:text-orange-400 transition-colors cursor-pointer text-left block">
                → Senkele Swayne's Sanctuary
              </button>
            </li>
            <li>
              <button onClick={() => onNavigate('attractions')} className="hover:text-orange-400 transition-colors cursor-pointer text-left block">
                → Melka Oda ancient ruins
              </button>
            </li>
          </ul>
        </div>

        {/* Newsletter Registrations (4-cols) */}
        <div className="md:col-span-4 space-y-4">
          <h4 className="text-xs uppercase font-mono tracking-widest text-neutral-400 font-bold border-b border-neutral-900 pb-2">
            Smart-Tourism Bulletins
          </h4>
          <p className="text-neutral-400 text-xs leading-relaxed">
            Get seasonal travel tips, advisory advisories, and tech reports from the municipality.
          </p>

          {subscribed ? (
            <div className="bg-green-500/5 p-3.5 rounded-xl border border-green-500/20 text-center text-xs text-neutral-300">
              ✓ Subscribed! Thank you for backing Shashemene.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-2" id="newsletter-form">
              <input 
                type="email"
                required
                placeholder="Name your email Address"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="bg-neutral-900 border border-neutral-800 focus:border-orange-500 text-xs text-neutral-200 p-2.5 rounded-xl focus:outline-none flex-grow"
                id="newsletter-email-input"
              />
              <button
                type="submit"
                disabled={submitting}
                className="bg-orange-600 hover:bg-orange-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all disabled:opacity-50 flex-shrink-0 cursor-pointer"
                id="btn-subscribe-submit"
              >
                {submitting ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : 'Subscribe'}
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Lower Copyright Row */}
      <div className="bg-neutral-950 border-t border-neutral-900 py-6 text-center text-[10px] text-neutral-500 font-mono space-y-3 flex flex-col items-center justify-center">
        <div className="space-y-1">
          <div>
            © 2026 SHASHEMENE MUNICIPALITY TOURISM DEVELOPMENT BOARD. ALL RIGHTS RESERVED.
          </div>
          <div>
            Maintained with high-fidelity fiber networks and secure databases by ICT Chief Manager:{' '}
            <span className="text-neutral-400 font-bold">Legese Tsegaye</span>.
          </div>
        </div>

        {/* Dynamic theme toggle button with custom IDs for quality testing */}
        <button
          onClick={onToggleTheme}
          type="button"
          className="inline-flex items-center gap-1.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-800 hover:border-neutral-700 px-3.5 py-1.5 rounded-full text-[10px] font-sans font-bold transition-all duration-300 cursor-pointer shadow-sm mt-1"
          id="theme-toggle-btn"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? (
            <>
              <Moon className="h-3 w-3 text-indigo-400" />
              <span>ACTIVATE DARK AESTHETIC</span>
            </>
          ) : (
            <>
              <Sun className="h-3 w-3 text-orange-500 animate-pulse" />
              <span>ACTIVATE LIGHT READABILITY</span>
            </>
          )}
        </button>
      </div>

    </footer>
  );
}
