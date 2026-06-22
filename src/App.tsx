import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Sparkles, 
  Music, 
  Volume2, 
  VolumeX, 
  Mail, 
  MailOpen, 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Gift, 
  Infinity as InfinityIcon,
  Star,
  MapPin,
  Clock,
  ExternalLink,
  Smile
} from 'lucide-react';
import FloatingParticles from './components/FloatingParticles';
import SparkSurprise from './components/SparkSurprise';
import { PolaroidPhoto, TimelineEvent } from './types';

// Importing generated premium portrait images
// @ts-ignore
import portrait1 from './assets/images/saumya_portrait_1_1782151688143.jpg';
// @ts-ignore
import portraitGarden from './assets/images/saumya_garden_1782151706517.jpg';
// @ts-ignore
import portraitCandle from './assets/images/saumya_candlelight_1782151722483.jpg';

const POLAROIDS: PolaroidPhoto[] = [
  {
    id: 'p1',
    src: portrait1,
    caption: 'My Happiness, Saumya ❤️',
    date: '23 June 2026'
  },
  {
    id: 'p2',
    src: portraitGarden,
    caption: 'Dreamy Golden Hours ✨',
    date: 'Rose Garden'
  },
  {
    id: 'p3',
    src: portraitCandle,
    caption: 'Your Beautiful Smile 💫',
    date: 'Candlelight Evenings'
  }
];

const TIMELINE: TimelineEvent[] = [
  {
    id: 't1',
    title: 'The Magical Spark',
    date: 'June 23',
    description: 'The day the universe brought my favorite person into this world. Your beautiful presence redefined what ultimate happiness and true love meant to me.',
    iconType: 'heart'
  },
  {
    id: 't2',
    title: 'Infinite Conversations',
    date: 'Comfort & Home',
    description: 'Shared laughter, endless late-night messages, discovering our favorite melodies, and realizing we could converse for hours without ever running out of stars to count.',
    iconType: 'sparkle'
  },
  {
    id: 't3',
    title: 'Making Beautiful Memories',
    date: 'Joyful Moments',
    description: 'Every inside joke we have shared, every warm reassurance, and every little instance where your voice made a stressful day completely turn into quiet comfort.',
    iconType: 'star'
  },
  {
    id: 't4',
    title: 'The Forever Promise',
    date: 'Our Unbreakable Bond',
    description: 'Holding your hand in my heart through every chapter. Celebrating who you are today, tomorrow, and through all the birthdays the future holds.',
    iconType: 'rose'
  }
];

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isLetterOpen, setIsLetterOpen] = useState(false);
  const [isSurpriseActive, setIsSurpriseActive] = useState(false);
  const [activePhoto, setActivePhoto] = useState<PolaroidPhoto | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Custom typing animation state
  const typingTexts = [
    "You are my happiness. ❤️",
    "You are my favorite chapter. ✨",
    "You are my forever person. 🌹"
  ];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Load backround audio on initial paint
  useEffect(() => {
    // Beautiful, delicate, soft romantic piano instrumental loop
    const audio = new Audio("https://www.chosic.com/wp-content/uploads/2020/07/Quiet-Morning.mp3");
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  // Soft text typing interval loop
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = typingTexts[currentTextIndex];

    const handleType = () => {
      if (!isDeleting) {
        setCurrentText(fullText.substring(0, currentText.length + 1));
        if (currentText === fullText) {
          timer = setTimeout(() => setIsDeleting(true), 2000);
          return;
        }
      } else {
        setCurrentText(fullText.substring(0, currentText.length - 1));
        if (currentText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % typingTexts.length);
        }
      }

      setTypingSpeed(isDeleting ? 40 : 80);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentTextIndex]);

  const handleOpenMySurprise = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
      }).catch((e) => {
        console.log("Music play blocked by browser. User toggled manually: ", e);
      });
    }
  };

  const handlePlayToggle = () => {
    if (!audioRef.current) return;
    if (isMusicPlaying) {
      audioRef.current.pause();
      setIsMusicPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsMusicPlaying(true);
      }).catch((e) => {
        console.log("Play failed: ", e);
      });
    }
  };

  // Gallery slider pagination
  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? POLAROIDS.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === POLAROIDS.length - 1 ? 0 : prev + 1));
  };

  // Smooth scroll helper
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen selection:bg-rose-gold-350 selection:text-white overflow-x-hidden">
      {/* Decorative Blur Spheres from Theme Design */}
      <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#FCE4EC] rounded-full opacity-40 blur-3xl pointer-events-none select-none z-0" />
      <div className="absolute bottom-[-100px] left-[-50px] w-96 h-96 bg-[#F3E5F5] rounded-full opacity-45 blur-3xl pointer-events-none select-none z-0" />

      {/* Floating Sparkles & Hearts running in the background */}
      <FloatingParticles />

      {/* Sparks Emitter canvas on final surprise trigger */}
      <SparkSurprise isActive={isSurpriseActive} />

      {/* INTRO COVER SCREEN (LOCKED ENVELOPE DESIGN) */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            key="cover-screen"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, transition: { duration: 0.8, ease: "easeInOut" } }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-[#FFF5F7] via-[#F8F0FF] to-[#FFF9F2]"
          >
            {/* Background blur nodes inside intro screen */}
            <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-[#FCE4EC] rounded-full opacity-40 blur-3xl pointer-events-none select-none" />
            <div className="absolute bottom-[-100px] left-[-50px] w-96 h-96 bg-[#F3E5F5] rounded-full opacity-40 blur-3xl pointer-events-none select-none" />

            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative w-full max-w-lg p-8 text-center rounded-[2.5rem] glass-panel-heavy border-pink-100 shadow-2xl z-20 flex flex-col items-center"
            >
              {/* Cute heart header */}
              <div className="relative p-4 rounded-full bg-pink-50 mb-6 border border-pink-100 flex items-center justify-center animate-bounce">
                <Heart className="w-10 h-10 text-[#B76E79] fill-[#B76E79]" />
                <Sparkles className="absolute -top-1 -right-1 w-5 h-5 text-amber-400 animate-pulse" />
              </div>

              {/* Title Greeting */}
              <h1 className="font-serif text-3xl md:text-4xl text-[#5D4037] tracking-tight leading-snug font-semibold text-wrap">
                For My Precious <span className="text-[#B76E79] text-glow font-extrabold font-serif">Saumya</span>
              </h1>
              
              <p className="font-sans text-[#8D6E63] mt-3 text-sm md:text-base leading-relaxed max-w-sm font-medium">
                A private box containing something dreamed up especially for you on your special day.
              </p>

              {/* Cute sealed envelope mockup graphic */}
              <div className="relative w-44 h-28 my-8 border border-pink-200/65 rounded-2xl bg-gradient-to-tr from-[#FFF5F7] to-[#FCE4EC] flex items-center justify-center shadow-md group cursor-pointer" onClick={handleOpenMySurprise}>
                {/* Triangular top flap fold */}
                <div className="absolute top-0 inset-x-0 h-14 border-b border-pink-200/30 bg-[#FCE4EC]/40 rounded-t-2xl clip-path-flap" />
                <Heart className="w-10 h-10 text-[#B76E79] fill-[#FCE4EC]/50 group-hover:scale-110 transition-transform duration-300 drop-shadow-sm" />
                <span className="absolute bottom-2 text-[9px] font-bold uppercase tracking-widest text-[#B76E79]/80">From Rohit With Love</span>
              </div>

              {/* Action Button */}
              <button
                id="btn-open-surprise"
                onClick={handleOpenMySurprise}
                className="relative px-10 py-4 bg-gradient-to-r from-[#B76E79] to-[#D4A5A5] text-white rounded-full font-sans font-bold tracking-wide shadow-lg shadow-[#B76E79]/20 cursor-pointer overflow-hidden group hover:shadow-xl hover:shadow-[#B76E79]/30 transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Gloss/Shimmer shimmer effect */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
                <span className="flex items-center gap-2">
                  <Gift className="w-5 h-5" />
                  Open My Surprise ✨
                </span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* REVEALED FULL SITE CONTENT */}
      {isOpen && (
        <div className="relative w-full z-20">
          
          {/* ROMANTIC STICKY DECK/NAVBAR */}
          <header className="sticky top-0 w-full py-4 px-4 md:px-12 z-40 glass-panel border-b border-pink-100/50 flex items-center justify-between">
            <span 
              className="font-script text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#B76E79] to-[#D4A5A5] bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Saumya & Rohit ❤️
            </span>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-widest font-bold text-[#8D6E63]">
              <button onClick={() => scrollToSection('hero')} className="hover:text-[#B76E79] transition-colors cursor-pointer">Us</button>
              <button onClick={() => scrollToSection('gallery')} className="hover:text-[#B76E79] transition-colors cursor-pointer">Gallery</button>
              <button onClick={() => scrollToSection('letter')} className="hover:text-[#B76E79] transition-colors cursor-pointer">Letter</button>
              <button onClick={() => scrollToSection('timeline')} className="hover:text-[#B76E79] transition-colors cursor-pointer">Story</button>
              <button onClick={() => scrollToSection('reveal-surprise')} className="hover:text-[#B76E79] transition-colors cursor-pointer">Surprise</button>
            </nav>

            {/* Premium details block or music controller */}
            <div className="flex items-center gap-4">
              {/* Music playing interactive pill badge */}
              <div 
                className="hidden lg:flex items-center gap-2 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-pink-100/60 shadow-xs cursor-pointer select-none"
                onClick={handlePlayToggle}
              >
                <span className={`w-2 h-2 rounded-full ${isMusicPlaying ? 'bg-[#B76E79] animate-pulse' : 'bg-gray-300'}`} />
                <span className="text-[10px] text-[#B76E79] font-bold tracking-wider uppercase">
                  {isMusicPlaying ? 'Music: Piano Melody' : 'Music Off'}
                </span>
              </div>

              {/* Music control circular toggle button */}
              <button 
                id="btn-toggle-music"
                onClick={handlePlayToggle}
                className="relative p-3 rounded-full bg-white border border-pink-100/60 text-[#B76E79] shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center group"
                title={isMusicPlaying ? 'Pause Melody' : 'Play Romantic Melody'}
              >
                {/* Spinning musical note ripple if active */}
                {isMusicPlaying && (
                  <span className="absolute inset-0 rounded-full bg-pink-100/50 animate-ping" />
                )}
                {isMusicPlaying ? (
                  <Volume2 className="w-5 h-5 relative z-10" />
                ) : (
                  <VolumeX className="w-5 h-5 relative z-10 text-gray-400" />
                )}
              </button>
            </div>
          </header>

          {/* HERO LANDING SECTION */}
          <section id="hero" className="relative min-h-[92vh] flex flex-col items-center justify-center p-4 md:p-8 text-center overflow-hidden">
            <div className="absolute inset-x-0 -top-12 flex justify-center opacity-30 select-none">
              <div className="w-[500px] h-[500px] rounded-full bg-gradient-to-br from-pink-200 to-lavender blur-[100px]" />
            </div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
              className="relative max-w-4xl flex flex-col items-center z-10"
            >
              <p className="font-sans text-xs md:text-sm font-bold text-[#B76E79] uppercase tracking-widest bg-white/60 px-5 py-2 rounded-full border border-pink-100/60 shadow-xs mb-6 select-none">
                ✨ Celebrating My Favorite day of the year ✨
              </p>

              {/* Huge animated romantic greeting */}
              <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl leading-tight tracking-tight text-[#5D4037] font-light">
                Happy Birthday <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#B76E79] via-[#D4A5A5] to-[#B76E79] inline-block font-bold pb-2 drop-shadow-xs">
                  Saumya Nishant ❤️
                </span>
              </h1>

              {/* Subheading */}
              <h2 className="font-serif italic font-medium text-lg sm:text-xl md:text-2xl text-[#8D6E63] mt-6 max-w-2xl px-2">
                “The Day My Favorite Person Was Born” 23 June 💫
              </h2>

              {/* Custom elegant quotation box */}
              <div className="mt-8 bg-white/30 backdrop-blur-md px-8 py-5 rounded-[2rem] border border-white/60 shadow-xs max-w-lg">
                {/* Typing Animation Box */}
                <div className="h-8 flex items-center justify-center">
                  <p className="font-sans font-semibold text-base md:text-lg text-[#B76E79] leading-relaxed">
                    "{currentText}"
                    <span className="w-1.5 h-5 bg-[#B76E79] inline-block ml-1 animate-pulse" />
                  </p>
                </div>
              </div>

              {/* Elegant scroll anchor indicator */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="mt-12 flex flex-col items-center gap-2"
              >
                <button 
                  onClick={() => scrollToSection('gallery')}
                  className="px-10 py-4 bg-gradient-to-r from-[#B76E79] to-[#D4A5A5] text-white rounded-full font-bold shadow-lg shadow-[#B76E79]/10 hover:shadow-xl hover:shadow-[#B76E79]/20 transition-all duration-300 cursor-pointer transform hover:-translate-y-1 block"
                >
                  Open My Surprise ✨
                </button>
              </motion.div>
            </motion.div>
          </section>

          {/* PHOTO GALLERY SECTION */}
          <section id="gallery" className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-white via-[#FFF5F7] to-[#F8F0FF]">
            <div className="max-w-6xl mx-auto">
              
              {/* Section Header */}
              <div className="text-center mb-16">
                <h2 className="font-serif text-3xl md:text-5xl font-light text-[#5D4037] tracking-tight">
                  Precious Moments of <span className="font-bold text-[#B76E79]">You</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#D4A5A5] to-[#B76E79] mx-auto mt-4 rounded-full" />
                <p className="font-sans text-[#8D6E63] text-sm md:text-base mt-4 max-w-lg mx-auto font-medium">
                  Every photo tells a story, and yours is my absolute favorite. Looking at your peaceful smile light up the dark.
                </p>
              </div>

              {/* Polaroid-style Showcase Carousel */}
              <div className="relative flex flex-col items-center">
                
                {/* Active Slider View */}
                <div className="relative w-full max-w-md p-6 h-[480px] md:h-[550px] flex items-center justify-center">
                  <AnimatePresence mode="wait">
                    {POLAROIDS.map((p, index) => {
                      if (index !== currentSlide) return null;
                      return (
                        <motion.div
                          key={p.id}
                          initial={{ opacity: 0, rotate: index % 2 === 0 ? -4 : 4, scale: 0.95 }}
                          animate={{ opacity: 1, rotate: index % 2 === 0 ? -2 : 2, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9, rotate: 0 }}
                          transition={{ duration: 0.5 }}
                          className="absolute w-full max-w-[340px] md:max-w-[360px] p-4 bg-white rounded-lg shadow-xl photo-frame-shadow border border-pink-100/50 cursor-zoom-in transform hover:scale-[1.03] hover:rotate-0 transition-transform duration-300 flex flex-col justify-between"
                          onClick={() => setActivePhoto(p)}
                        >
                          {/* Polaroid Tape Accent */}
                          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-7 bg-white/70 border border-pink-100/40 shadow-xs rounded-md rotate-[1.5deg] backdrop-blur-xs select-none" />

                          {/* Image Box */}
                          <div className="relative w-full aspect-square md:h-[310px] overflow-hidden rounded bg-gray-50">
                            <img 
                              src={p.src} 
                              alt={p.caption} 
                              className="w-full h-full object-cover select-none"
                              referrerPolicy="no-referrer"
                            />
                            {/* Gloss element overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#B76E79]/5 to-transparent pointer-events-none" />
                          </div>

                           {/* Captions and note */}
                           <div className="pt-5 pb-2 text-center">
                             <p className="font-script text-3xl font-bold text-[#B76E79]">
                               {p.caption}
                             </p>
                             <div className="flex items-center justify-center gap-1.5 text-[#8D6E63] font-sans text-xs mt-2 font-semibold uppercase tracking-wider select-none">
                               <Calendar className="w-3 h-3 text-[#D4A5A5]" />
                               {p.date}
                             </div>
                           </div>
                         </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>

                {/* Slides navigation buttons */}
                <div className="flex items-center gap-6 mt-8">
                  <button 
                    onClick={handlePrevSlide}
                    className="p-3 rounded-full bg-white border border-pink-100 text-[#B76E79] hover:bg-[#B76E79] hover:text-white shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <span className="font-sans text-sm font-bold text-[#8D6E63] select-none">
                    {currentSlide + 1} / {POLAROIDS.length}
                  </span>
                  <button 
                    onClick={handleNextSlide}
                    className="p-3 rounded-full bg-white border border-pink-100 text-[#B76E79] hover:bg-[#B76E79] hover:text-white shadow-sm hover:shadow active:scale-95 transition-all cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>

                {/* Quick grid overview with zoom link */}
                <p className="text-[#B76E79] text-xs font-medium italic mt-6 flex items-center gap-1">
                  <Smile className="w-3.5 h-3.5" /> Tap portrait to expand and feel the warm details.
                </p>
              </div>

            </div>
          </section>

          {/* BIRTHDAY ENVELOPE / LETTER SECTION */}
          <section id="letter" className="relative py-28 px-4 md:px-8 bg-gradient-to-b from-[#F8F0FF] via-white to-[#FFF9F2] overflow-hidden">
            
            {/* Background petal accents */}
            <div className="absolute -left-12 top-20 w-44 h-44 rounded-full bg-pink-100/40 blur-3xl select-none" />
            <div className="absolute -right-12 bottom-12 w-44 h-44 rounded-full bg-purple-100/40 blur-3xl select-none" />

            <div className="max-w-4xl mx-auto flex flex-col items-center">
              
              {/* Section Header */}
              <div className="text-center mb-16 px-4">
                <h2 className="font-serif text-3xl md:text-5xl font-light text-[#5D4037] tracking-tight">
                  My Secret Letter for <span className="font-bold text-[#B76E79]">You</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#D4A5A5] to-[#B76E79] mx-auto mt-4 rounded-full" />
                <p className="font-sans text-[#8D6E63] text-sm md:text-base mt-4 font-medium">
                  Touch the seal of the classic envelope below to reveal my true heart letters.
                </p>
              </div>

              {/* Envelope Component */}
              <div className="relative w-full max-w-xl flex flex-col items-center">
                
                {/* Envelope Wrapper */}
                <div className="relative w-full h-[280px] md:h-[340px] shadow-2xl rounded-2xl bg-gradient-to-b from-[#FFF5F7] to-[#FCE4EC] border border-pink-150 flex flex-col items-center justify-center p-6 select-none z-30 overflow-hidden transform transition-all duration-500 hover:shadow-pink-100/80">
                  
                  {/* Triangular flap cover */}
                  <div 
                    className={`absolute top-0 inset-x-0 bg-gradient-to-b from-[#fff5f7] to-[#FCE4EC] border-b border-pink-200/50 rounded-t-2xl z-20 origin-top transition-transform duration-700 ease-in-out h-1/2 ${
                      isLetterOpen ? 'rotate-x-180 -translate-y-full opacity-0' : 'rotate-x-0'
                    }`}
                  />

                  {/* Envelope body markings */}
                  <div className="absolute bottom-0 inset-x-0 h-2/3 bg-radial from-transparent to-[#ffd0d9]/20 border-t border-pink-200/20" />

                  {/* Envelope Seal interaction button */}
                  <div className="relative flex flex-col items-center z-30">
                    <button
                      id="btn-open-letter"
                      onClick={() => setIsLetterOpen(!isLetterOpen)}
                      className="p-5 rounded-full bg-white border border-[#D4A5A5] shadow-lg text-[#B76E79] hover:scale-110 active:scale-95 transition-all duration-300 cursor-pointer flex items-center justify-center group animate-pulse"
                    >
                      {isLetterOpen ? (
                        <MailOpen className="w-8 h-8 group-hover:rotate-6 transition-transform text-[#B76E79]" />
                      ) : (
                        <Mail className="w-8 h-8 group-hover:-rotate-3 transition-transform text-[#B76E79]" />
                      )}
                    </button>
                    <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#B76E79] mt-3">
                      {isLetterOpen ? 'Click to Close' : 'Click to Open Letter'}
                    </span>
                  </div>

                  {/* Cute date stamp */}
                  <div className="absolute bottom-4 right-6 font-serif italic text-xs text-[#B76E79] font-semibold">
                    23 June ✨
                  </div>
                </div>

                {/* Sliding Letter paper (opens upward or downward depending on state) */}
                <AnimatePresence>
                  {isLetterOpen && (
                    <motion.div
                      initial={{ y: -40, opacity: 0, scale: 0.95 }}
                      animate={{ y: 20, opacity: 1, scale: 1 }}
                      exit={{ y: -40, opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="w-11/12 md:w-full mt-2 relative p-8 md:p-12 rounded-3xl bg-[#FFFDF9]/95 text-gray-800 shadow-2xl border border-[#D4A5A5]/30 leading-relaxed font-sans z-40"
                    >
                      {/* Paper lines overlay */}
                      <div className="absolute inset-x-0 top-0 bottom-0 bg-[linear-gradient(rgba(183,110,121,0.04)_1px,transparent_1px)] bg-[size:100%_28px] pointer-events-none rounded-3xl" />

                      {/* Letter Head with Heart */}
                      <div className="flex justify-between items-center border-b border-[#D4A5A5]/20 pb-3 mb-6 relative">
                        <span className="font-serif italic font-semibold text-[#B76E79] text-lg">My Darling, Saumya Nishant</span>
                        <Heart className="w-5 h-5 text-[#B76E79] fill-[#B76E79]" />
                      </div>

                      {/* Main Message Body */}
                      <p className="font-serif text-lg md:text-xl text-[#5D4037] leading-loose whitespace-pre-line font-medium italic">
                        {"Happy Birthday, Saumya ❤️\n\nOn this special day, I just want to thank you for being part of my life. Your smile makes my days brighter, your presence makes everything better, and every moment with you becomes a beautiful memory.\n\nI wish you endless happiness, good health, success, and all the love you deserve. May all your dreams come true.\n\nHappy Birthday once again, my love. ❤️"}
                      </p>

                      {/* Letter Signature Footer */}
                      <div className="flex flex-col items-end border-t border-[#D4A5A5]/20 pt-5 mt-10">
                        <span className="font-script text-3xl font-bold text-[#B76E79]">Forever Yours,</span>
                        <span className="font-sans text-xs font-bold uppercase tracking-widest text-[#B76E79] mt-1.5">Rohit ❤️</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

              </div>

            </div>
          </section>

          {/* LOVE STORY TIMELINE SECTION */}
          <section id="timeline" className="relative py-24 px-4 md:px-8 bg-gradient-to-b from-[#FFF9F2] to-white">
            <div className="max-w-5xl mx-auto">
              
              {/* Section Header */}
              <div className="text-center mb-20 px-4">
                <h2 className="font-serif text-3xl md:text-5xl font-light text-[#5D4037] tracking-tight">
                  Our Romantic <span className="font-bold text-[#B76E79]">Milestones</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#D4A5A5] to-[#B76E79] mx-auto mt-4 rounded-full" />
                <p className="font-sans text-[#8D6E63] text-sm md:text-base mt-4 max-w-sm mx-auto font-medium">
                  A timeline tracking how two worlds converged to create my favorite fairy-tale chapter.
                </p>
              </div>

              {/* Vertical Timeline Tree */}
              <div className="relative border-l border-pink-100/50 ml-4 md:ml-0 md:flex md:flex-col md:border-l-0 md:items-center">
                
                {/* Center line representation on desktop */}
                <div className="hidden md:block absolute left-1/2 -translate-x-1/2 inset-y-0 w-[1px] bg-pink-100/50" />

                {TIMELINE.map((event, idx) => {
                  const isEven = idx % 2 === 0;
                  return (
                    <motion.div
                      key={event.id}
                      whileInView={{ opacity: 1, y: 0 }}
                      initial={{ opacity: 0, y: 25 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.6, delay: idx * 0.1 }}
                      className={`relative flex flex-col md:flex-row items-start md:items-center w-full mb-16 last:mb-0 ${
                        isEven ? 'md:flex-row-reverse' : ''
                      }`}
                    >
                      {/* Timeline Dot with rotating Icon */}
                      <div className="absolute -left-[17px] md:left-1/2 md:-translate-x-1/2 z-10 p-2.5 rounded-full bg-white border border-[#D4A5A5] text-[#B76E79] shadow-md transform hover:scale-110 active:scale-95 transition-transform duration-350 cursor-pointer">
                        {event.iconType === 'heart' && <Heart className="w-4 h-4 fill-[#FCE4EC]" />}
                        {event.iconType === 'sparkle' && <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />}
                        {event.iconType === 'star' && <Star className="w-4 h-4 text-[#B76E79] fill-pink-50" />}
                        {event.iconType === 'rose' && <Heart className="w-4 h-4 fill-[#B76E79]" />}
                      </div>

                      {/* Content Card Panel */}
                      <div className={`w-full md:w-[45%] pl-8 md:pl-0 ${
                        isEven ? 'md:pr-12' : 'md:pl-12'
                      }`}>
                        <div className="p-6 rounded-2xl glass-panel border border-[#D4A5A5]/20 text-left shadow-md transform hover:-translate-y-1 transition-all duration-300">
                          
                          {/* Event Date stamp */}
                          <div className="flex items-center gap-2 mb-3">
                            <span className="font-sans font-bold text-xs uppercase tracking-widest text-[#B76E79] bg-pink-50/70 px-2.5 py-1 rounded-full border border-pink-100/50">
                              {event.date}
                            </span>
                          </div>

                          <h3 className="font-serif text-xl font-bold text-[#5D4037]">
                            {event.title}
                          </h3>

                          <p className="font-sans text-[#8D6E63] text-sm mt-3 leading-relaxed font-medium">
                            {event.description}
                          </p>
                        </div>
                      </div>

                      {/* Spacing alignment node for grid alignment */}
                      <div className="hidden md:block w-[45%]" />
                    </motion.div>
                  );
                })}
              </div>

            </div>
          </section>

          {/* ACTIVE SURPRISE SHOWCASE SECTION */}
          <section id="reveal-surprise" className="relative py-28 px-4 md:px-8 bg-gradient-to-b from-[#FFF5F7] via-[#FCE4EC] to-[#FFF9F2] text-center overflow-hidden">
            
            {/* Ambient background glow grids */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-pink-200/15 blur-[120px] pointer-events-none select-none" />

            <div className="max-w-4xl mx-auto relative z-30">
              
              {/* Surprise section description */}
              <div className="text-center mb-12">
                <span className="text-[#B76E79] text-xs font-bold uppercase tracking-widest bg-white/70 border border-[#D4A5A5]/40 px-4 py-1.5 rounded-full select-none">
                  Ultimate Reveal ✨
                </span>
                <h2 className="font-serif text-3xl md:text-5xl font-light text-[#5D4037] tracking-tight mt-4">
                  Ready For My <span className="font-bold text-[#B76E79]">Final Secret?</span>
                </h2>
                <div className="w-20 h-1 bg-gradient-to-r from-[#D4A5A5] to-[#B76E79] mx-auto mt-4 rounded-full" />
                <p className="font-sans text-[#8D6E63] text-sm md:text-base mt-4 max-w-sm mx-auto font-medium select-none">
                  Click the heart below to ignite the starlight celebration of how much you mean to me.
                </p>
              </div>

              {/* Central interactive gift seal */}
              <div className="flex flex-col items-center">
                <motion.button
                  id="btn-trigger-fireworks"
                  onClick={() => setIsSurpriseActive(!isSurpriseActive)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-7 rounded-full border shadow-2xl cursor-pointer select-none transition-all duration-300 relative ${
                    isSurpriseActive 
                      ? 'bg-[#B76E79] border-pink-200 text-white shadow-[#B76E79]/30' 
                      : 'bg-white border-[#D4A5A5]/40 text-[#B76E79] shadow-[#B76E79]/5 animate-[bounce_2s_infinite]'
                  }`}
                  title="Reveal Surprises!"
                >
                  {/* Glowing core */}
                  <span className="absolute inset-0 rounded-full bg-[#B76E79]/15 animate-ping pointer-events-none" />
                  <Heart className={`w-12 h-12 ${isSurpriseActive ? 'fill-white' : 'fill-none'}`} />
                </motion.button>

                {/* Ultimate revealed beautiful letters */}
                <AnimatePresence>
                  {isSurpriseActive && (
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.95, opacity: 0 }}
                      transition={{ type: "spring", stiffness: 80, damping: 15 }}
                      className="mt-14 p-8 md:p-12 glass-panel border-[#D4A5A5]/30 bg-white/70 rounded-3xl max-w-2xl relative shadow-3xl text-center"
                    >
                      {/* Floating overlay star points */}
                      <Sparkles className="absolute top-4 left-4 w-6 h-6 text-amber-400 animate-pulse" />
                      <Sparkles className="absolute bottom-4 right-4 w-6 h-6 text-amber-400 animate-pulse" />

                      <p className="font-serif italic font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#5D4037] leading-relaxed">
                        &ldquo;Saumya, You Are The Most Beautiful Thing That Ever Happened To Me ❤️&rdquo;
                      </p>

                      <p className="font-sans text-[#8D6E63] text-sm md:text-base mt-6 leading-relaxed font-semibold">
                        I count myself as the luckiest person in the world to call you mine. On your 23 June birthday and every single day, my love and support are yours entirely, without limits. Let's make this year your most gorgeous and successful chapter yet! 🌟
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          </section>

          {/* LIGHTBOX MODAL DIRECT VIEW */}
          <AnimatePresence>
            {activePhoto && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md cursor-zoom-out"
                onClick={() => setActivePhoto(null)}
              >
                <div className="relative max-w-md w-full bg-white rounded-2xl p-4 md:p-6 shadow-2xl cursor-default flex flex-col items-center">
                  
                  {/* Photo itself */}
                  <div className="relative w-full aspect-square overflow-hidden rounded-xl border border-pink-100 bg-gray-50 flex items-center justify-center">
                    <img 
                      src={activePhoto.src} 
                      alt={activePhoto.caption} 
                      className="w-full h-full object-cover rounded-md select-none"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="pt-5 text-center w-full">
                    <p className="font-script text-3xl font-extrabold text-[#B76E79]">
                      {activePhoto.caption}
                    </p>
                    <div className="flex items-center justify-center gap-1.5 text-gray-400 font-sans text-xs mt-2 select-none">
                      <Calendar className="w-3.5 h-3.5 text-pink-300" />
                      {activePhoto.date}
                    </div>
                  </div>

                  {/* Close floating tag button */}
                  <button 
                    onClick={() => setActivePhoto(null)} 
                    className="absolute -top-10 right-2 text-white/80 hover:text-white font-sans text-sm font-semibold tracking-wide cursor-pointer flex items-center gap-1"
                  >
                    Close [X]
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* LUXURY ROMANTIC FOOTER */}
          <footer className="py-16 px-4 md:px-8 border-t border-pink-150/40 text-center bg-white">
            <div className="max-w-md mx-auto animate-fade-in">
              
              <Heart className="w-8 h-8 text-[#B76E79] fill-[#B76E79]/20 mx-auto animate-pulse" />

              <blockquote className="font-serif italic text-lg sm:text-xl text-[#5D4037] mt-6 leading-relaxed">
                &ldquo;Every love story is beautiful, but ours is my favorite.&rdquo;
              </blockquote>

              <p className="font-script text-5xl font-bold bg-gradient-to-r from-[#B76E79] to-[#D4A5A5] bg-clip-text text-transparent mt-5 mb-1.5 hover:scale-105 transition-transform">
                Forever Yours, Rohit ❤️
              </p>

              <div className="font-sans text-[11px] uppercase tracking-widest text-[#8D6E63] font-bold mt-8 select-none">
                Handcrafted Specially for Saumya Nishant &bull; 23 June 2026
              </div>

            </div>
          </footer>

        </div>
      )}
    </div>
  );
}
