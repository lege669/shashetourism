import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Newspaper, HelpCircle, CheckCircle2, RefreshCw, Star, Trees, Compass, BookOpen, Clock, AlertTriangle, CloudSun } from 'lucide-react';
import { NEWS_BOARD, QUIZ_QUESTIONS } from '../data';

import { NewsItem } from '../types';

interface NewsAndQuizProps {
  onAddPlannedItem: (item: string) => void;
  scrollToSection: (id: string) => void;
  news?: NewsItem[];
}

export default function NewsAndQuiz({ onAddPlannedItem, scrollToSection, news = NEWS_BOARD }: NewsAndQuizProps) {
  // Quiz states
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [quizResult, setQuizResult] = useState<string | null>(null);

  // Weather simulator
  const [weatherToday, setWeatherToday] = useState({ temp: '25°C', cond: 'Sunny Highlands', humidity: '44%' });

  const handleSelectOption = (type: string) => {
    const nextAnswers = [...answers, type];
    setAnswers(nextAnswers);

    if (currentQuestionIdx < QUIZ_QUESTIONS.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
    } else {
      // Calculate dominant travel type
      const counts = nextAnswers.reduce((acc, curr) => {
        acc[curr] = (acc[curr] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      let dominant = 'Nature';
      let maxCount = 0;
      for (const k in counts) {
        if (counts[k] > maxCount) {
          maxCount = counts[k];
          dominant = k;
        }
      }
      setQuizResult(dominant);
    }
  };

  const resetQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestionIdx(0);
    setAnswers([]);
    setQuizResult(null);
  };

  const getResultDetails = (type: string) => {
    switch (type) {
      case 'Culture':
        return {
          title: 'Cultural Seekers / Repatriants',
          desc: 'Your soul resonates with global unity, organic lifestyle, roots reggae, and diaspora history. You belong in the Rastafari Diaspora Museum hubs, exploring ital organic farms and learning historic repatriation tales.',
          spot: 'Rastafari Community & Museum',
          badge: <Compass className="h-6 w-6 text-purple-400" />
        };
      case 'History':
        return {
          title: 'Heritage Archaeologists',
          desc: 'You are deeply fascinated by ancient democratic structures, volcanic geological arches, prehistoric Rock carvings, and oral narratives of local assemblies.',
          spot: 'Melka Oda Archaeological Site',
          badge: <BookOpen className="h-6 w-6 text-blue-400" />
        };
      case 'Food':
        return {
          title: 'Traditional Ethiopian Foodies',
          desc: 'You have dynamic taste buds! You adore traditional layered avocado juice, rich charcoal-roasted Oromian coffee, and traditional Abyssinia honey-wine houses.',
          spot: 'Abyssinia Traditional House',
          badge: <Star className="h-6 w-6 text-amber-400" />
        };
      default: // Nature
        return {
          title: 'Eco-Adventurers / Naturalists',
          desc: 'You seek deep communion with the earth, hot volcanic steam, natural therapeutic baths, colobus monkey spotters, and walking safaris amid golden savannah grass.',
          spot: 'Wondo Genet Hot Springs',
          badge: <Trees className="h-6 w-6 text-emerald-400" />
        };
    }
  };

  return (
    <section id="news" className="py-20 bg-neutral-900 border-b border-neutral-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dual columns layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT 7-COLUMNS: NEWS BULLETINS & WEATHER ADVISORY */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <span className="text-orange-500 font-mono text-xs uppercase tracking-widest bg-orange-500/10 px-3 py-1.5 rounded-full border border-orange-500/20">
                Local Bulletins & Advisory
              </span>
              <h2 className="text-3xl font-bold tracking-tight mt-4 text-white">Tourist Advisory & News</h2>
              <div className="w-16 h-1 bg-orange-500 mt-2 rounded-full" />
            </div>

            {/* Weather & Travel alert header widget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <CloudSun className="h-8 w-8 text-amber-500" />
                  <div>
                    <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase">Weather Today</h4>
                    <p className="text-sm font-bold mt-0.5">{weatherToday.temp} • {weatherToday.cond}</p>
                  </div>
                </div>
                <span className="text-[10px] bg-neutral-900 text-neutral-500 px-2 py-1 rounded font-mono">Hum: {weatherToday.humidity}</span>
              </div>

              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 flex items-center gap-3">
                <AlertTriangle className="h-7 w-7 text-orange-500 flex-shrink-0 animate-pulse" />
                <div>
                  <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase">ICT System Alert</h4>
                  <p className="text-xs text-neutral-300 leading-normal font-sans">Public fiber hotspots in central square verified working at 350Mbps peak download speeds.</p>
                </div>
              </div>
            </div>

            {/* News board list */}
            <div className="space-y-6">
              {news.map((news) => (
                <div 
                  key={news.id} 
                  className="bg-neutral-950/80 p-6 rounded-2xl border border-neutral-800 hover:border-orange-500/10 transition-all space-y-3"
                  id={`news-box-${news.id}`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="px-2.5 py-0.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 font-mono text-[9px] uppercase font-bold rounded">
                      {news.category}
                    </span>
                    <span className="text-[10px] text-neutral-500 font-mono flex items-center gap-1">
                      <Clock className="h-3 w-3" /> {news.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-neutral-200">
                    {news.title}
                  </h3>
                  
                  <p className="text-neutral-400 text-xs leading-relaxed font-sans pb-3 border-b border-neutral-900">
                    {news.summary}
                  </p>

                  <p className="text-neutral-300 text-xs leading-relaxed font-sans italic">
                    {news.content}
                  </p>

                  <div className="flex items-center gap-1 text-[10px] font-mono text-neutral-500">
                    <span>Written by:</span>
                    <span className="text-orange-400 font-medium">{news.author}</span>
                    <span>• Verified by Municipal ICT</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT 5-COLUMNS: THE TRAVELLER PERSONALITY QUIZ */}
          <div className="lg:col-span-5 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 md:p-8 space-y-6 relative overflow-hidden shadow-xl">
            <div className="absolute top-0 right-0 h-40 w-40 bg-orange-500/5 blur-2xl rounded-full" />
            
            <div className="border-b border-neutral-800 pb-4">
              <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-orange-500 uppercase">
                <HelpCircle className="h-4.5 w-4.5" /> Discovery Sandbox
              </div>
              <h3 className="text-xl font-bold mt-1 text-neutral-200">Calculate Your Travel Vibe</h3>
              <p className="text-neutral-400 text-xs mt-1 font-sans leading-normal">
                Answer 3 quick questions and let our local ICT database custom-map your ultimate Shashemene itinerary!
              </p>
            </div>

            <AnimatePresence mode="wait">
              
              {/* QUIZ STATE 1: Call to Action */}
              {!quizStarted && !quizResult && (
                <motion.div
                  key="start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4 py-4 text-center"
                  id="quiz-intro"
                >
                  <div className="mx-auto h-12 w-12 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-orange-500 animate-bounce">
                    🗺️
                  </div>
                  <h4 className="font-semibold text-sm text-neutral-200">Ready to customize?</h4>
                  <p className="text-xs text-neutral-400 max-w-xs mx-auto font-sans leading-relaxed">
                    Choose and log your sensory expectations (stews, climate, music) and match them instantly to real Rift Valley resorts or diaspora relics.
                  </p>
                  <button
                    onClick={() => setQuizStarted(true)}
                    className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-3.5 rounded-xl text-xs tracking-wider uppercase transition-all cursor-pointer"
                    id="btn-start-quiz"
                  >
                    Start Personality Match
                  </button>
                </motion.div>
              )}

              {/* QUIZ STATE 2: Current Question */}
              {quizStarted && !quizResult && (
                <motion.div
                  key="question"
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  className="space-y-4"
                  id={`quiz-question-${currentQuestionIdx}`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-500">
                    <span>PROGRESS CHIP</span>
                    <span>{currentQuestionIdx + 1} / {QUIZ_QUESTIONS.length} Questions</span>
                  </div>

                  <h4 className="text-sm font-bold text-neutral-200">
                    {QUIZ_QUESTIONS[currentQuestionIdx].question}
                  </h4>

                  <div className="space-y-2 mt-2">
                    {QUIZ_QUESTIONS[currentQuestionIdx].options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectOption(opt.type)}
                        className="w-full text-left bg-neutral-900 hover:bg-neutral-800/85 border border-neutral-850 hover:border-orange-500/20 px-4 py-3 rounded-xl text-xs text-neutral-300 hover:text-white transition-all cursor-pointer font-sans block"
                        id={`quiz-${currentQuestionIdx}-opt-${i}`}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* QUIZ STATE 3: Completed Results */}
              {quizResult && (
                <motion.div
                  key="result"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="text-center py-4 space-y-4"
                  id="quiz-results"
                >
                  <div className="mx-auto h-12 w-12 bg-orange-600/15 border border-orange-500/20 rounded-full flex items-center justify-center text-orange-400">
                    {getResultDetails(quizResult).badge}
                  </div>

                  <div>
                    <span className="text-[10px] bg-neutral-900 border border-neutral-800 font-mono uppercase tracking-widest text-neutral-500 px-2.5 py-1 rounded">
                      Matching Profile
                    </span>
                    <h4 className="font-extrabold text-base text-neutral-200 mt-2">
                      {getResultDetails(quizResult).title}
                    </h4>
                    <p className="text-xs text-neutral-400 max-w-xs mx-auto leading-relaxed mt-2 font-sans font-medium">
                      {getResultDetails(quizResult).desc}
                    </p>
                  </div>

                  <div className="bg-neutral-900 p-3.5 rounded-2xl border border-neutral-850 text-left space-y-2">
                    <span className="text-[9px] uppercase font-mono tracking-widest text-neutral-500 block">Top recommended spot:</span>
                    <span className="text-xs text-orange-400 font-bold font-sans block">{getResultDetails(quizResult).spot}</span>
                    <button
                      onClick={() => {
                        onAddPlannedItem(getResultDetails(quizResult).spot);
                        scrollToSection('events');
                      }}
                      className="w-full bg-orange-600 hover:bg-orange-500 text-white font-bold py-2 rounded-xl text-[10px] flex items-center justify-center gap-1.5 cursor-pointer mt-1"
                      id="btn-quiz-add-recommended"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5" /> Add Recommended Spot to Planner
                    </button>
                  </div>

                  <button
                    onClick={resetQuiz}
                    className="inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white font-semibold transition-all cursor-pointer mt-2"
                    id="btn-restart-quiz"
                  >
                    <RefreshCw className="h-3.5 w-3.5 text-neutral-600" />
                    Reset Quiz
                  </button>
                </motion.div>
              )}

            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
