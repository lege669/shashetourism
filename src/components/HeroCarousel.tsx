import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, User, Compass, Server, Trees, CalendarRange, Clock } from 'lucide-react';
import { Slide } from '../types';
import { HERO_SLIDES } from '../data';

interface HeroCarouselProps {
  onActionClick: (id: string) => void;
  slides: Slide[];
}

export default function HeroCarousel({ onActionClick, slides = HERO_SLIDES }: HeroCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [isHovered, setIsHovered] = useState(false);

  const activeSlides = Array.isArray(slides) && slides.length > 0 ? slides : HERO_SLIDES;

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 7000); // 7s autoplay
    return () => clearInterval(timer);
  }, [currentSlide, isHovered, activeSlides.length]);

  // Reset or adjust currentSlide if it's out of bounds
  useEffect(() => {
    if (currentSlide >= activeSlides.length) {
      setCurrentSlide(0);
    }
  }, [activeSlides.length, currentSlide]);

  const handleNext = () => {
    setDirection('right');
    setCurrentSlide((prev) => (prev + 1) % activeSlides.length);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentSlide((prev) => (prev - 1 + activeSlides.length) % activeSlides.length);
  };

  const safeIndex = currentSlide >= activeSlides.length ? 0 : currentSlide;
  const currentData = activeSlides[safeIndex];

  // Map bullet/pill icons for categories
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'manager':
        return <User className="h-4 w-4 mr-1 text-purple-400" />;
      case 'natural wonders':
        return <Trees className="h-4 w-4 mr-1 text-emerald-400" />;
      case 'cultural melting pot':
        return <Compass className="h-4 w-4 mr-1 text-yellow-500" />;
      default:
        return <Server className="h-4 w-4 mr-1 text-orange-400" />;
    }
  };

  return (
    <section 
      className="relative w-full h-[85vh] md:h-[90vh] overflow-hidden bg-black text-white"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      id="home"
    >
      {/* Background Slideshow Container with transitions */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0.3, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0.3, scale: 0.95 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="absolute inset-0"
          >
            {/* Soft blurred image to duplicate depth + darker crisp top layer */}
            <div 
              className="absolute inset-0 bg-cover bg-center filter scale-110 blur-xl opacity-35"
              style={{ backgroundImage: `url(${currentData.image})` }}
            />
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 brightness-[0.40] contrast-[1.05]"
              style={{ backgroundImage: `url(${currentData.image})` }}
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08]" 
        style={{ backgroundImage: 'radial-gradient(circle, #ff5a00 1px, transparent 1px)', backgroundSize: '24px 24px' }}
      />

      {/* Floating Info badge top right */}
      <div className="absolute top-6 right-6 z-10 hidden md:flex items-center gap-2 bg-neutral-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-neutral-800">
        <Clock className="h-3.5 w-3.5 text-orange-400" />
        <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-mono">
          Rift Valley Local Time: UTC+3
        </span>
      </div>

      {/* Slide Content wrapper */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center text-center z-10">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentSlide}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -30, opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 max-w-4xl"
          >
            
            {/* Category / Manager tag - matches structure of screen screenshot */}
            {currentData.tag && (
              <div className="inline-flex items-center gap-2 bg-neutral-950/80 backdrop-blur-sm border border-orange-500/20 px-3.5 py-1.5 rounded-full shadow-lg">
                {getCategoryIcon(currentData.category)}
                <span className="text-xs uppercase tracking-widest text-neutral-300 font-mono font-medium">
                  {currentData.category}
                </span>
              </div>
            )}

            {/* Title - "legese tsegaye" or general title */}
            <h1 className={`text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white mb-2 leading-tight ${
              currentData.title.includes('legese') ? 'font-serif capitalize italic font-normal text-amber-50 md:text-8xl' : 'font-sans'
            }`}>
              {currentData.title}
            </h1>

            {/* Sub-label/Dept e.g. "ICT" from screenshot */}
            {currentData.title.includes('legese') && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-orange-500 font-mono tracking-widest text-base md:text-xl font-bold uppercase mb-4"
              >
                ICT
              </motion.div>
            )}

            {/* Description quote / Explorer call */}
            <p className="text-lg md:text-xl text-neutral-300 font-sans max-w-2xl mx-auto leading-relaxed drop-shadow-md">
              {currentData.subtitle}
            </p>

            {/* Actions button section - matches screenshot precisely */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              {currentData.title.includes('legese') ? (
                <>
                  <button 
                    onClick={() => onActionClick('staff')}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm text-white bg-orange-600 hover:bg-orange-500 shadow-xl shadow-orange-900/40 hover:-translate-y-0.5 active:translate-y-0 transition-all border border-transparent cursor-pointer"
                  >
                    View Staff
                  </button>
                  <button 
                    onClick={() => onActionClick('about')}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-sm text-neutral-200 border border-neutral-400 hover:border-white bg-neutral-900/45 hover:bg-white/5 backdrop-blur-md hover:-translate-y-0.5 active:translate-y-0 transition-all cursor-pointer"
                  >
                    Learn More
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => onActionClick(currentData.actionText.toLowerCase().includes('culture') ? 'attractions-rastafari-community' : 'attractions')}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full font-bold text-sm text-white bg-orange-600 hover:bg-orange-500 shadow-xl shadow-orange-950/40 hover:-translate-y-0.5 transition-all cursor-pointer"
                  >
                    {currentData.actionText}
                  </button>
                  <button 
                    onClick={() => onActionClick('quiz')}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full font-medium text-sm text-neutral-300 border border-neutral-700 hover:border-neutral-500 hover:bg-neutral-950/50 backdrop-blur-sm transition-all cursor-pointer"
                  >
                    Try Travel Quiz
                  </button>
                </>
              )}
            </div>

          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left/Right Carousel Controller Arrows - Dark transparent circular design as in screenshot */}
      <button 
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-950/70 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        aria-label="Previous Slide"
      >
        <ChevronLeft className="h-6 w-6 stroke-[2.5]" />
      </button>

      <button 
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full border border-neutral-800 bg-neutral-950/40 hover:bg-neutral-950/70 text-white flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        aria-label="Next Slide"
      >
        <ChevronRight className="h-6 w-6 stroke-[2.5]" />
      </button>

      {/* Progress ticker bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-900/30 z-20">
        <motion.div 
          key={currentSlide}
          initial={{ width: '0%' }}
          animate={{ width: isHovered ? '0%' : '100%' }}
          transition={{ duration: isHovered ? 0 : 7, ease: 'linear' }}
          className="h-full bg-orange-500"
        />
      </div>

      {/* Slide indices bullet points */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2.5 z-20 bg-neutral-950/40 backdrop-blur-sm px-3 py-1.5 rounded-full">
        {activeSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              currentSlide === i ? 'w-6 bg-orange-500' : 'w-2 bg-neutral-600 hover:bg-neutral-400'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
