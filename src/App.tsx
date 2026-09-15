import { useState, useEffect } from 'react';

import { 
  Plane, 
  Shield, 
  Clock, 
  Heart, 
  CheckCircle, 
  Users, 
  FileCheck, 
  MessageCircle,
  Phone,
  MapPin,
  ChevronDown,
  Star,
  Lock,
  Zap,
  ArrowLeft,
  RefreshCw,
  X,
  Sun,
  Moon
} from 'lucide-react';

import { testimonialsData } from './data/testimonials';
import AnnouncementModal from './components/AnnouncementModal';

// ========== فلتر الخلفيات (يتبع الثيم عبر CSS) ==========
const BACKGROUND_FILTER = "var(--bg-filter)";

// ========== قسم الآراء: كاروسيل + عرض الكل ==========
function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const total = testimonialsData.length;

  useEffect(() => {
    if (isPaused || showAll) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, total, showAll]);

  useEffect(() => {
    document.body.style.overflow = showAll ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showAll]);

  useEffect(() => {
    const handleClose = () => setShowAll(false);
    window.addEventListener('close-testimonials-modal', handleClose);
    return () => window.removeEventListener('close-testimonials-modal', handleClose);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowAll(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const goTo = (i: number) => setCurrentIndex((i + total) % total);
  const current = testimonialsData[currentIndex];

  return (
    <>
      {/* ====== الكاروسيل ====== */}
      <div 
        className="max-w-3xl mx-auto px-12 sm:px-0"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="relative">
          {/* زر السابق */}
          <button
            onClick={() => goTo(currentIndex - 1)}
            aria-label="السابق"
            className="absolute -right-2 sm:-right-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] shadow-2xl glow-burgundy flex items-center justify-center hover:scale-110 transition"
          >
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white rotate-90" />
          </button>

          {/* زر التالي */}
          <button
            onClick={() => goTo(currentIndex + 1)}
            aria-label="التالي"
            className="absolute -left-2 sm:-left-16 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] shadow-2xl glow-burgundy flex items-center justify-center hover:scale-110 transition"
          >
            <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-white -rotate-90" />
          </button>

          {/* البطاقة */}
          <div className="glass-strong rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl min-h-[260px] sm:min-h-[280px] flex flex-col">
            <div className="flex items-center justify-between gap-3 pb-4 mb-4 border-b border-[var(--border-color)]">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] flex items-center justify-center font-bold text-sm sm:text-base shadow-lg flex-shrink-0 text-white">
                  {current.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm sm:text-base truncate text-[var(--text-main)]">{current.name}</h4>
                  <p className="text-xs sm:text-sm text-[#8B1538] dark:text-[#D4AF37] truncate font-semibold">{current.route}</p>
                </div>
              </div>
              <div className="flex gap-0.5 sm:gap-1 flex-shrink-0">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${i < current.rating ? 'fill-[#D4AF37] text-[#D4AF37]' : 'text-gray-400 dark:text-gray-600'}`} 
                  />
                ))}
              </div>
            </div>

            <div className="flex-1 flex items-center">
              <p className="text-sm sm:text-base md:text-lg text-[var(--text-main)] leading-relaxed text-right w-full">
                {current.text}
              </p>
            </div>
          </div>
        </div>

        {/* شريط التقدم + العدّاد */}
        <div className="mt-6 bg-white/70 dark:bg-transparent backdrop-blur-md rounded-xl px-4 py-2 shadow-md dark:shadow-none">
          <div className="flex items-center justify-between text-xs sm:text-sm text-[var(--text-muted)] mb-2">
            <span>الرأي {currentIndex + 1} من {total}</span>
            <span>{Math.round(((currentIndex + 1) / total) * 100)}%</span>
          </div>
          <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-l from-[#8B1538] via-[#D4AF37] to-[#8B1538] transition-all duration-500 ease-out"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* زر عرض كل الآراء */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="group glass-strong border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] px-6 py-3 rounded-full text-sm sm:text-base font-bold flex items-center gap-2 transition-all duration-300 hover:scale-105 shadow-xl text-[var(--text-main)]"
          >
            <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37]" />
            <span>عرض كل الآراء</span>
            <span className="bg-[#8B1538] text-white text-xs px-2 py-0.5 rounded-full">{total}</span>
          </button>
        </div>
      </div>

      {/* ====== نافذة عرض كل الآراء ====== */}
      {showAll && (
        <div className="fixed inset-0 z-[100] bg-[var(--overlay-modal)] backdrop-blur-md">
          <div className="h-full flex flex-col">
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[var(--border-color)] bg-[var(--overlay-modal-header)] backdrop-blur-lg sticky top-0 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] flex items-center justify-center">
                  <Users className="w-5 h-5 text-[#D4AF37]" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-[var(--text-main)]">كل آراء العملاء</h3>
                  <p className="text-xs text-[var(--text-subtle)]">{total} رأي من عملائنا الكرام</p>
                </div>
              </div>
              <button
                onClick={() => setShowAll(false)}
                aria-label="إغلاق"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#8B1538] hover:bg-[#6B0F1A] flex items-center justify-center transition-all hover:scale-110 shadow-lg text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-w-7xl mx-auto">
                {testimonialsData.map((t) => (
                  <div 
                    key={t.id} 
                    className="glass-strong rounded-xl p-4 border-2 border-[var(--glass-border)] hover:border-[#D4AF37]/60 transition-all hover:scale-[1.02] shadow-lg"
                  >
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] flex items-center justify-center font-bold text-xs flex-shrink-0 text-white">
                          {t.initials}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-sm truncate text-[var(--text-main)]">{t.name}</h4>
                          <p className="text-[10px] text-[#8B1538] dark:text-[#D4AF37] truncate font-semibold">{t.route}</p>
                        </div>
                      </div>
                      <div className="flex gap-0.5 flex-shrink-0 pt-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-[var(--text-main)] leading-relaxed">
                      {t.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDark, setIsDark] = useState(true);

  // ========== تحميل الثيم المحفوظ ==========
  useEffect(() => {
    const savedTheme = localStorage.getItem('infinity-theme');
    const shouldBeDark = savedTheme !== 'light';
    setIsDark(shouldBeDark);
    if (shouldBeDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // ========== تبديل الثيم ==========
  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    if (newIsDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('infinity-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('infinity-theme', 'light');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    window.dispatchEvent(new CustomEvent('close-testimonials-modal'));
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[var(--bg-main)] text-[var(--text-main)] overflow-x-hidden transition-colors duration-500">
      
      {/* ========== ANNOUNCEMENT MODAL ========== */}
      <AnnouncementModal 
        whatsappNumber="972567706668"
        telegramHandle="22"
      />

      {/* ========== HEADER ========== */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'glass-strong shadow-2xl' : 'bg-transparent'
        }`}
      >
        <nav className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-10 h-10 sm:w-14 sm:h-14 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] rounded-full flex items-center justify-center shadow-lg">
                <img 
                  src="/logo.png" 
                  alt="Infinity Travel Logo" 
                  className="w-9 h-9 sm:w-12 sm:h-12 rounded-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                    (e.target as HTMLImageElement).parentElement!.innerHTML = '<svg class="w-6 h-6 sm:w-8 sm:h-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>';
                  }}
                />
              </div>
              <div>
                <h1 className="text-base sm:text-xl font-bold text-[var(--text-main)]">شركة إنفينتي</h1>
                <p className="text-[10px] sm:text-xs text-[#8B1538] dark:text-[#D4AF37] font-semibold">لتنسيقات السفر</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              <button onClick={() => scrollToSection('home')} className="text-sm text-[var(--text-main)] hover:text-[#8B1538] dark:hover:text-[#D4AF37] transition-colors font-medium">الرئيسية</button>
              <button onClick={() => scrollToSection('services')} className="text-sm text-[var(--text-main)] hover:text-[#8B1538] dark:hover:text-[#D4AF37] transition-colors font-medium">خدماتنا</button>
              <button onClick={() => scrollToSection('testimonials')} className="text-sm text-[var(--text-main)] hover:text-[#8B1538] dark:hover:text-[#D4AF37] transition-colors font-medium">آراء العملاء</button>
              <button onClick={() => scrollToSection('requirements')} className="text-sm text-[var(--text-main)] hover:text-[#8B1538] dark:hover:text-[#D4AF37] transition-colors font-medium">الشروط والخطوات</button>
              <button onClick={() => scrollToSection('contact')} className="text-sm text-[var(--text-main)] hover:text-[#8B1538] dark:hover:text-[#D4AF37] transition-colors font-medium">تواصل معنا</button>
            </div>

            {/* Buttons Group */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={toggleTheme}
                aria-label="تبديل الوضع الليلي/النهاري"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-[#8B1538] hover:bg-[#6B0F1A] text-white flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg"
              >
                {isDark ? (
                  <Sun className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Moon className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>

              <a
                href="https://wa.me/972567706668?text=مرحباً، أرغب في الاستفسار عن خدمات تنسيق السفر"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden lg:block bg-gradient-to-l from-[#8B1538] to-[#6B0F1A] hover:from-[#6B0F1A] hover:to-[#8B1538] text-white px-6 py-3 rounded-lg font-semibold text-sm glow-burgundy transition-all duration-300 hover:scale-105"
              >
                استشارة سريعة واتساب
              </a>

              <button 
                className="lg:hidden p-2 bg-[#8B1538] text-white rounded-lg shadow-lg" 
                onClick={() => scrollToSection('contact')}
                aria-label="تواصل معنا"
              >
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* ========== HERO SECTION ========== */}
      <section id="home" className="relative min-h-[100svh] flex items-center justify-center pt-24 pb-12 sm:pt-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/hero-bg.jpg')",
            filter: BACKGROUND_FILTER
          }}
        ></div>

        {/* Overlay خفيف جداً - الصورة تبان بوضوح */}
        <div className="absolute inset-0 bg-[var(--overlay-light)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--gradient-edge)] via-transparent via-40% to-[var(--gradient-edge)]"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-white/10 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-8 border border-[#8B1538]/30 shadow-lg">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B1538] dark:text-[#D4AF37]" />
              <span className="text-xs sm:text-sm text-[var(--text-main)] font-semibold">خدمة موثوقة ومعتمدة منذ سنوات</span>
            </div>

            {/* العنوان الرئيسي مع صندوق أبيض شفاف */}
            <div className="bg-white/85 dark:bg-transparent backdrop-blur-md rounded-2xl p-4 sm:p-6 mb-3 sm:mb-4 shadow-xl dark:shadow-none border border-white/50 dark:border-transparent">
              <h1 className="text-3xl sm:text-5xl md:text-7xl font-black leading-tight text-[var(--text-main)]">
                شركة إنفينتي لتنسيقات السفر
              </h1>
            </div>
            
            <div className="bg-white/85 dark:bg-transparent backdrop-blur-md rounded-xl p-3 sm:p-4 mb-4 sm:mb-6 shadow-lg dark:shadow-none inline-block border border-white/50 dark:border-transparent">
              <h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-[#8B1538] dark:text-[#D4AF37]">
                بوابتك الآمنة نحو بداية جديدة
              </h2>
            </div>

            <div className="bg-white/85 dark:bg-transparent backdrop-blur-md rounded-xl p-4 sm:p-6 max-w-3xl mx-auto shadow-lg dark:shadow-none mb-6 sm:mb-8 border border-white/50 dark:border-transparent">
              <p className="text-sm sm:text-lg md:text-xl text-[var(--text-muted)] leading-relaxed font-semibold">
                مختصون بتنسيقات العبور والخروج من قطاع غزة عبر الطرق والمعابر المعتمدة بكل أمان، موثوقية، وسرعة في إنجاز الحالات الملحة والإنسانية.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-12 sm:mb-16 px-4">
              <a
                href="https://wa.me/972567706668?text=مرحباً، أرغب في حجز تنسيق سفري الآن"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-l from-[#8B1538] to-[#6B0F1A] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg glow-burgundy transition-all duration-300 hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center"
              >
                احجز تنسيقك الآن
                <Plane className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform" />
              </a>
              
              <a
                href="https://t.me/InfinityFormats"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white/90 dark:bg-white/10 backdrop-blur-md px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl font-bold text-base sm:text-lg text-[var(--text-main)] border-2 border-[#8B1538]/40 dark:border-[#D4AF37]/40 hover:border-[#8B1538] dark:hover:border-[#D4AF37] transition-all duration-300 hover:scale-105 flex items-center gap-3 w-full sm:w-auto justify-center shadow-lg"
              >
                تواصل عبر تيليجرام
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform" />
              </a>
            </div>

            <div className="animate-bounce">
              <ChevronDown className="w-6 h-6 sm:w-8 sm:h-8 mx-auto text-[#8B1538] dark:text-[#D4AF37]" />
            </div>
          </div>
        </div>
      </section>

      {/* ========== STATISTICS SECTION ========== */}
      <section className="py-16 sm:py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/stats-bg.jpg')",
            filter: BACKGROUND_FILTER
          }}
        ></div>

        <div className="absolute inset-0 bg-[var(--overlay-light)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--gradient-edge)] via-transparent via-50% to-[var(--gradient-edge)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="bg-white/85 dark:bg-transparent backdrop-blur-md rounded-2xl px-6 py-3 inline-block shadow-lg dark:shadow-none border border-white/50 dark:border-transparent">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)]">
                أثر يمكن قياسه
              </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-l from-[#8B1538] to-[#D4AF37] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            <div className="glass-strong p-4 sm:p-8 rounded-2xl hover:scale-105 transition-all duration-300 group text-center shadow-xl border-2 border-[var(--glass-border)]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto glow-burgundy group-hover:rotate-12 transition-transform text-white">
                <Users className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-2xl sm:text-5xl font-black text-[#8B1538] dark:text-[#D4AF37] mb-1 sm:mb-2">+2164</div>
              <p className="text-xs sm:text-base text-[var(--text-muted)] font-semibold">حالات تم تنسيقها بنجاح</p>
            </div>

            <div className="glass-strong p-4 sm:p-8 rounded-2xl hover:scale-105 transition-all duration-300 group text-center shadow-xl border-2 border-[var(--glass-border)]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto glow-gold group-hover:rotate-12 transition-transform text-white">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-2xl sm:text-5xl font-black text-[#8B1538] dark:text-[#D4AF37] mb-1 sm:mb-2">100%</div>
              <p className="text-xs sm:text-base text-[var(--text-muted)] font-semibold">شفافية ومتابعة مستمرة</p>
            </div>

            <div className="glass-strong p-4 sm:p-8 rounded-2xl hover:scale-105 transition-all duration-300 group text-center shadow-xl border-2 border-[var(--glass-border)]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto glow-burgundy group-hover:rotate-12 transition-transform text-white">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-2xl sm:text-5xl font-black text-[#8B1538] dark:text-[#D4AF37] mb-1 sm:mb-2">عالية</div>
              <p className="text-xs sm:text-base text-[var(--text-muted)] font-semibold">سرعة في الإنجاز</p>
            </div>

            <div className="glass-strong p-4 sm:p-8 rounded-2xl hover:scale-105 transition-all duration-300 group text-center shadow-xl border-2 border-[var(--glass-border)]">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-2xl flex items-center justify-center mb-3 sm:mb-4 mx-auto glow-gold group-hover:rotate-12 transition-transform text-white">
                <Heart className="w-6 h-6 sm:w-8 sm:h-8" />
              </div>
              <div className="text-2xl sm:text-5xl font-black text-[#8B1538] dark:text-[#D4AF37] mb-1 sm:mb-2">24/7</div>
              <p className="text-xs sm:text-base text-[var(--text-muted)] font-semibold">دعم الحالات الإنسانية</p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== SERVICES SECTION ========== */}
      <section id="services" className="py-16 sm:py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/services-bg.jpg')",
            filter: BACKGROUND_FILTER
          }}
        ></div>

        <div className="absolute inset-0 bg-[var(--overlay-light)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--gradient-edge)] via-transparent via-50% to-[var(--gradient-edge)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="bg-white/85 dark:bg-transparent backdrop-blur-md rounded-2xl px-6 py-3 inline-block shadow-lg dark:shadow-none mb-3 border border-white/50 dark:border-transparent">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)]">
                كيف نعمل معك
              </h2>
            </div>
            <div className="bg-white/85 dark:bg-transparent backdrop-blur-md rounded-xl px-6 py-3 max-w-2xl mx-auto shadow-lg dark:shadow-none border border-white/50 dark:border-transparent">
              <p className="text-sm sm:text-lg text-[var(--text-muted)] font-semibold">
                عملية واضحة ومنظمة لضمان راحتك وسرعة إنجاز معاملاتك
              </p>
            </div>
            <div className="w-24 h-1 bg-gradient-to-l from-[#8B1538] to-[#D4AF37] mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            <div className="glass-strong p-5 sm:p-8 rounded-2xl relative overflow-hidden group hover:scale-105 transition-all duration-300 shadow-xl border-2 border-[var(--glass-border)]">
              <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-[#8B1538] opacity-10 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] rounded-xl flex items-center justify-center mb-4 text-xl sm:text-2xl font-black text-white">
                  ١
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[var(--text-main)]">مراجعة الطلب</h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  نستقبل طلبك ونراجع جميع المستندات والبيانات المطلوبة بدقة فائقة
                </p>
              </div>
            </div>

            <div className="glass-strong p-5 sm:p-8 rounded-2xl relative overflow-hidden group hover:scale-105 transition-all duration-300 shadow-xl border-2 border-[var(--glass-border)]">
              <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-[#D4AF37] opacity-15 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-4 text-xl sm:text-2xl font-black text-white">
                  ٢
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[var(--text-main)]">تنسيق المعبر</h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  نبدأ بالتنسيق مع الجهات المختصة والمعابر المعتمدة بشكل احترافي
                </p>
              </div>
            </div>

            <div className="glass-strong p-5 sm:p-8 rounded-2xl relative overflow-hidden group hover:scale-105 transition-all duration-300 shadow-xl border-2 border-[var(--glass-border)]">
              <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-[#8B1538] opacity-10 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] rounded-xl flex items-center justify-center mb-4 text-xl sm:text-2xl font-black text-white">
                  ٣
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[var(--text-main)]">إتمام الإجراءات</h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  نتابع كافة الإجراءات اللازمة ونبقيك على اطلاع دائم بكل التطورات
                </p>
              </div>
            </div>

            <div className="glass-strong p-5 sm:p-8 rounded-2xl relative overflow-hidden group hover:scale-105 transition-all duration-300 shadow-xl border-2 border-[var(--glass-border)]">
              <div className="absolute top-0 right-0 w-20 sm:w-24 h-20 sm:h-24 bg-[#D4AF37] opacity-15 rounded-bl-full"></div>
              <div className="relative">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-xl flex items-center justify-center mb-4 text-xl sm:text-2xl font-black text-white">
                  ٤
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-[var(--text-main)]">متابعة الخروج</h3>
                <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                  نرافقك حتى لحظة الخروج الآمن ونضمن لك رحلة سلسة ومريحة
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            <div className="glass-strong p-5 sm:p-6 rounded-xl border-2 border-[var(--glass-border)] hover:border-[#8B1538] transition-all shadow-xl">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-[#8B1538] dark:text-[#D4AF37] mb-3 sm:mb-4" />
              <h4 className="text-base sm:text-lg font-bold mb-2 text-[var(--text-main)]">أمان وخصوصية</h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                نحافظ على سرية معلوماتك وبياناتك بأعلى معايير الحماية
              </p>
            </div>

            <div className="glass-strong p-5 sm:p-6 rounded-xl border-2 border-[var(--glass-border)] hover:border-[#8B1538] transition-all shadow-xl">
              <Lock className="w-8 h-8 sm:w-10 sm:h-10 text-[#8B1538] dark:text-[#D4AF37] mb-3 sm:mb-4" />
              <h4 className="text-base sm:text-lg font-bold mb-2 text-[var(--text-main)]">معاملات آمنة</h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                جميع المعاملات تتم عبر قنوات رسمية ومعتمدة بشكل قانوني
              </p>
            </div>

            <div className="glass-strong p-5 sm:p-6 rounded-xl border-2 border-[var(--glass-border)] hover:border-[#8B1538] transition-all shadow-xl">
              <FileCheck className="w-8 h-8 sm:w-10 sm:h-10 text-[#8B1538] dark:text-[#D4AF37] mb-3 sm:mb-4" />
              <h4 className="text-base sm:text-lg font-bold mb-2 text-[var(--text-main)]">وثائق كاملة</h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                نساعدك في تجهيز كافة الوثائق والمستندات المطلوبة بشكل صحيح
              </p>
            </div>

            <div className="glass-strong p-5 sm:p-6 rounded-xl border-2 border-[#D4AF37]/50 hover:border-[#D4AF37] transition-all bg-gradient-to-br from-[#D4AF37]/10 to-transparent shadow-xl">
              <RefreshCw className="w-8 h-8 sm:w-10 sm:h-10 text-[#B8941F] mb-3 sm:mb-4" />
              <h4 className="text-base sm:text-lg font-bold mb-2 text-[var(--text-main)]">استرداد آمن وسريع</h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed">
                في حال إلغاء طلبك، نضمن لك استرداد أموالك بالكامل خلال 24 ساعة بأعلى معايير الأمان والشفافية
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========== REQUIREMENTS SECTION ========== */}
      <section id="requirements" className="py-16 sm:py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/requirements-bg.jpg')",
            filter: BACKGROUND_FILTER
          }}
        ></div>

        <div className="absolute inset-0 bg-[var(--overlay-light)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--gradient-edge)] via-transparent via-50% to-[var(--gradient-edge)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="bg-white/85 dark:bg-transparent backdrop-blur-md rounded-2xl px-6 py-3 inline-block shadow-lg dark:shadow-none mb-3 border border-white/50 dark:border-transparent">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)]">
                الشروط والمتطلبات
              </h2>
            </div>
            <div className="bg-white/85 dark:bg-transparent backdrop-blur-md rounded-xl px-6 py-3 max-w-2xl mx-auto shadow-lg dark:shadow-none border border-white/50 dark:border-transparent">
              <p className="text-sm sm:text-lg text-[var(--text-muted)] font-semibold">
                معلومات واضحة وشفافة حول ما تحتاجه للبدء
              </p>
            </div>
            <div className="w-24 h-1 bg-gradient-to-l from-[#8B1538] to-[#D4AF37] mx-auto mt-4"></div>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="glass-strong p-5 sm:p-8 md:p-12 rounded-3xl shadow-2xl border-2 border-[var(--glass-border)]">
              <div className="grid md:grid-cols-2 gap-8 sm:gap-10">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-3 text-[var(--text-main)]">
                    <FileCheck className="w-6 h-6 sm:w-8 sm:h-8 text-[#8B1538] dark:text-[#D4AF37]" />
                    المستندات المطلوبة
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B1538] dark:text-[#D4AF37] mt-1 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-[var(--text-main)] font-medium">صورة واضحة من جواز السفر (ساري المفعول)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B1538] dark:text-[#D4AF37] mt-1 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-[var(--text-main)] font-medium">صورة شخصية حديثة بخلفية بيضاء</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B1538] dark:text-[#D4AF37] mt-1 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-[var(--text-main)] font-medium">صورة من بطاقة الهوية الشخصية</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B1538] dark:text-[#D4AF37] mt-1 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-[var(--text-main)] font-medium">معلومات الاتصال الكاملة (هاتف، عنوان)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#8B1538] dark:text-[#D4AF37] mt-1 flex-shrink-0" />
                      <span className="text-sm sm:text-base text-[var(--text-main)] font-medium">وثائق إضافية حسب نوع الحالة (إن وجدت)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 flex items-center gap-3 text-[var(--text-main)]">
                    <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-[#8B1538] dark:text-[#D4AF37]" />
                    التزاماتنا نحوك
                  </h3>
                  <ul className="space-y-3 sm:space-y-4">
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] mt-1 flex-shrink-0 fill-[#D4AF37]" />
                      <span className="text-sm sm:text-base text-[var(--text-main)] font-medium">سرية تامة لجميع المعلومات والبيانات</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] mt-1 flex-shrink-0 fill-[#D4AF37]" />
                      <span className="text-sm sm:text-base text-[var(--text-main)] font-medium">متابعة مستمرة وتحديثات لحظية</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] mt-1 flex-shrink-0 fill-[#D4AF37]" />
                      <span className="text-sm sm:text-base text-[var(--text-main)] font-medium">شفافية كاملة في جميع الإجراءات</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] mt-1 flex-shrink-0 fill-[#D4AF37]" />
                      <span className="text-sm sm:text-base text-[var(--text-main)] font-medium">استرداد آمن للأموال خلال 24 ساعة عند الإلغاء</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <Star className="w-4 h-4 sm:w-5 sm:h-5 text-[#D4AF37] mt-1 flex-shrink-0 fill-[#D4AF37]" />
                      <span className="text-sm sm:text-base text-[var(--text-main)] font-medium">دعم فني متواصل على مدار الساعة</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 sm:mt-12 p-5 sm:p-6 bg-gradient-to-l from-[#8B1538]/15 to-[#D4AF37]/15 rounded-2xl border-2 border-[#8B1538]/20 dark:border-[#D4AF37]/30">
                <div className="flex items-start gap-3 sm:gap-4">
                  <Lock className="w-6 h-6 sm:w-8 sm:h-8 text-[#8B1538] dark:text-[#D4AF37] flex-shrink-0" />
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold mb-2 text-[var(--text-main)]">سياسة الخصوصية والأمان</h4>
                    <p className="text-sm sm:text-base text-[var(--text-muted)] leading-relaxed">
                      نحن في شركة إنفينتي نلتزم بأعلى معايير حماية البيانات والخصوصية. جميع المعلومات التي تشاركها معنا محمية بتقنيات تشفير متقدمة، ولن يتم مشاركتها مع أي جهات خارجية إلا بموافقتك الصريحة وفي إطار الإجراءات القانونية اللازمة فقط.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS SECTION ========== */}
      <section id="testimonials" className="py-16 sm:py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/testimonials-bg.jpg')",
            filter: BACKGROUND_FILTER
          }}
        ></div>

        <div className="absolute inset-0 bg-[var(--overlay-light)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--gradient-edge)] via-transparent via-50% to-[var(--gradient-edge)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="bg-white/85 dark:bg-transparent backdrop-blur-md rounded-2xl px-6 py-3 inline-block shadow-lg dark:shadow-none mb-3 border border-white/50 dark:border-transparent">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)]">
                آراء وتجارب عملائنا
              </h2>
            </div>
            <div className="bg-white/85 dark:bg-transparent backdrop-blur-md rounded-xl px-6 py-3 max-w-2xl mx-auto shadow-lg dark:shadow-none border border-white/50 dark:border-transparent">
              <p className="text-sm sm:text-lg text-[var(--text-muted)] font-semibold">
                أكثر من 2000 عميل وثقوا بنا. هي بعض من تجاربهم
              </p>
            </div>
            <div className="w-24 h-1 bg-gradient-to-l from-[#8B1538] to-[#D4AF37] mx-auto mt-4"></div>
          </div>

          <TestimonialsSection />

          <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
            <div className="glass-strong p-5 sm:p-8 rounded-2xl text-center shadow-2xl border-2 border-[var(--glass-border)]">
              <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-[var(--text-main)]">لماذا يثق بنا عملاؤنا؟</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] rounded-full flex items-center justify-center mb-3 glow-burgundy text-white">
                    <Shield className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <p className="font-semibold text-sm sm:text-base text-[var(--text-main)]">ضمان وأمان</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#D4AF37] to-[#B8941F] rounded-full flex items-center justify-center mb-3 glow-gold text-white">
                    <Clock className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <p className="font-semibold text-sm sm:text-base text-[var(--text-main)]">سرعة الإنجاز</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] rounded-full flex items-center justify-center mb-3 glow-burgundy text-white">
                    <Heart className="w-7 h-7 sm:w-8 sm:h-8" />
                  </div>
                  <p className="font-semibold text-sm sm:text-base text-[var(--text-main)]">دعم إنساني</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== CONTACT SECTION ========== */}
      <section id="contact" className="py-16 sm:py-20 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: "url('/contact-bg.jpg')",
            filter: BACKGROUND_FILTER
          }}
        ></div>

        <div className="absolute inset-0 bg-[var(--overlay-light)]"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--gradient-edge)] via-transparent via-50% to-[var(--gradient-edge)]"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="bg-white/85 dark:bg-transparent backdrop-blur-md rounded-2xl px-6 py-3 inline-block shadow-lg dark:shadow-none mb-3 border border-white/50 dark:border-transparent">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[var(--text-main)]">
                تواصل معنا الآن
              </h2>
            </div>
            <div className="bg-white/85 dark:bg-transparent backdrop-blur-md rounded-xl px-6 py-3 max-w-2xl mx-auto shadow-lg dark:shadow-none border border-white/50 dark:border-transparent">
              <p className="text-sm sm:text-lg text-[var(--text-muted)] font-semibold">
                نحن هنا لمساعدتك في كل خطوة. تواصل معنا عبر القنوات التالية
              </p>
            </div>
            <div className="w-24 h-1 bg-gradient-to-l from-[#8B1538] to-[#D4AF37] mx-auto mt-4"></div>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <a
                href="https://wa.me/972567706668?text=مرحباً شركة إنفينتي، أرغب في الاستفسار عن خدمات تنسيق السفر والعبور من غزة"
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-strong p-5 sm:p-8 rounded-2xl hover:scale-105 transition-all duration-300 border-2 border-[var(--glass-border)] hover:border-[#25D366] relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#25D366]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#25D366] rounded-2xl flex items-center justify-center mb-5 sm:mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                    <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-center text-[var(--text-main)]">واتساب</h3>
                  <p className="text-sm sm:text-base text-[var(--text-muted)] text-center mb-5 sm:mb-6">
                    تواصل معنا فوراً عبر واتساب للحصول على استشارة مجانية وسريعة
                  </p>
                  <div className="flex items-center justify-center gap-2 text-[#25D366] font-bold text-sm sm:text-base">
                    <span>ابدأ المحادثة الآن</span>
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-2 transition-transform" />
                  </div>
                </div>
              </a>

              <a
                href="https://t.me/InfinityFormats"
                target="_blank"
                rel="noopener noreferrer"
                className="group glass-strong p-5 sm:p-8 rounded-2xl hover:scale-105 transition-all duration-300 border-2 border-[var(--glass-border)] hover:border-[#0088cc] relative overflow-hidden shadow-2xl"
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#0088cc]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#0088cc] rounded-2xl flex items-center justify-center mb-5 sm:mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg">
                    <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-3 text-center text-[var(--text-main)]">تيليجرام</h3>
                  <p className="text-sm sm:text-base text-[var(--text-muted)] text-center mb-5 sm:mb-6">
                    انضم إلى قناتنا على تيليجرام للحصول على التحديثات والأخبار المستمرة
                  </p>
                  <div className="flex items-center justify-center gap-2 text-[#0088cc] font-bold text-sm sm:text-base">
                    <span>انضم إلى القناة</span>
                    <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-2 transition-transform" />
                  </div>
                </div>
              </a>
            </div>

            <div className="mt-8 sm:mt-12 glass-strong p-5 sm:p-8 rounded-2xl shadow-2xl border-2 border-[var(--glass-border)]">
              <h3 className="text-xl sm:text-2xl font-bold mb-5 sm:mb-6 text-center text-[var(--text-main)]">معلومات التواصل الإضافية</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-2xl mx-auto">
                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] rounded-xl flex items-center justify-center mb-3 sm:mb-4 text-white">
                    <Phone className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h4 className="font-bold mb-2 text-sm sm:text-base text-[var(--text-main)]">الهاتف</h4>
                  <p className="text-[var(--text-muted)] text-xs sm:text-sm font-semibold" dir="ltr">+972 56 770 6668</p>
                </div>

                <div className="flex flex-col items-center text-center p-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] rounded-xl flex items-center justify-center mb-3 sm:mb-4 text-white">
                    <MapPin className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h4 className="font-bold mb-2 text-sm sm:text-base text-[var(--text-main)]">الموقع</h4>
                  <p className="text-[var(--text-muted)] text-xs sm:text-sm font-semibold">قطاع غزة، فلسطين</p>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12 bg-gradient-to-l from-[#8B1538] to-[#6B0F1A] p-6 sm:p-8 md:p-12 rounded-3xl text-center glow-burgundy relative overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNnptLTEyIDBjMy4zMTQgMCA2IDIuNjg2IDYgNnMtMi42ODYgNi02IDYtNi0yLjY4Ni02LTYgMi42ODYtNiA2LTZ6IiBzdHJva2U9IiNmZmYiIHN0cm9rZS1vcGFjaXR5PSIuMDUiLz48L2c+PC9zdmc+')] opacity-20"></div>
              <div className="relative">
                <Plane className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 text-[#D4AF37]" />
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 sm:mb-4 text-white">
                  ابدأ رحلتك نحو المستقبل اليوم
                </h3>
                <p className="text-sm sm:text-lg text-white/90 mb-6 sm:mb-8 max-w-2xl mx-auto">
                  لا تتردد في التواصل معنا. فريقنا جاهز لمساعدتك على مدار الساعة
                </p>
                <a
                  href="https://wa.me/972567706668?text=مرحباً، أود البدء بإجراءات السفر"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 sm:gap-3 bg-white text-[#8B1538] px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:scale-105 transition-all duration-300 shadow-xl"
                >
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                  تواصل الآن مجاناً
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========== FOOTER ========== */}
      <footer className="relative border-t border-[var(--border-color)] py-10 sm:py-12 bg-[var(--bg-footer)] transition-colors duration-500">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="text-center md:text-right">
              <div className="flex items-center gap-3 mb-4 justify-center md:justify-start">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] rounded-full flex items-center justify-center text-white">
                  <Plane className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[var(--text-main)]">شركة إنفينتي</h3>
                  <p className="text-xs text-[#8B1538] dark:text-[#D4AF37] font-semibold">لتنسيقات السفر</p>
                </div>
              </div>
              <p className="text-[var(--text-muted)] text-sm leading-relaxed font-medium">
                شريكك الموثوق في تنسيق السفر والعبور من قطاع غزة بكل أمان واحترافية
              </p>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-bold mb-4 text-[var(--text-main)]">روابط سريعة</h4>
              <ul className="space-y-2">
                <li>
                  <button onClick={() => scrollToSection('home')} className="text-[var(--text-muted)] hover:text-[#8B1538] dark:hover:text-[#D4AF37] transition-colors text-sm font-medium">
                    الرئيسية
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('services')} className="text-[var(--text-muted)] hover:text-[#8B1538] dark:hover:text-[#D4AF37] transition-colors text-sm font-medium">
                    خدماتنا
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('testimonials')} className="text-[var(--text-muted)] hover:text-[#8B1538] dark:hover:text-[#D4AF37] transition-colors text-sm font-medium">
                    آراء العملاء
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="text-[var(--text-muted)] hover:text-[#8B1538] dark:hover:text-[#D4AF37] transition-colors text-sm font-medium">
                    تواصل معنا
                  </button>
                </li>
              </ul>
            </div>

            <div className="text-center md:text-right">
              <h4 className="font-bold mb-4 text-[var(--text-main)]">معلومات قانونية</h4>
              <ul className="space-y-2 text-sm text-[var(--text-muted)]">
                <li className="flex items-start gap-2 justify-center md:justify-start">
                  <Shield className="w-4 h-4 mt-1 text-[#8B1538] dark:text-[#D4AF37] flex-shrink-0" />
                  <span className="font-medium">سياسة الخصوصية محمية</span>
                </li>
                <li className="flex items-start gap-2 justify-center md:justify-start">
                  <Lock className="w-4 h-4 mt-1 text-[#8B1538] dark:text-[#D4AF37] flex-shrink-0" />
                  <span className="font-medium">بيانات مشفرة وآمنة</span>
                </li>
                <li className="flex items-start gap-2 justify-center md:justify-start">
                  <RefreshCw className="w-4 h-4 mt-1 text-[#8B1538] dark:text-[#D4AF37] flex-shrink-0" />
                  <span className="font-medium">استرداد آمن خلال 24 ساعة</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-[var(--border-color)] pt-8 mb-8">
            <div className="glass p-5 sm:p-6 rounded-xl">
              <h4 className="font-bold mb-3 flex items-center gap-2 text-sm sm:text-base text-[var(--text-main)]">
                <Shield className="w-5 h-5 text-[#8B1538] dark:text-[#D4AF37]" />
                إخلاء مسؤولية وتنويه هام
              </h4>
              <p className="text-xs sm:text-sm text-[var(--text-muted)] leading-relaxed font-medium">
                شركة إنفينتي لتنسيقات السفر تعمل كوسيط لتسهيل إجراءات السفر والعبور بطرق قانونية ومعتمدة. نحن نلتزم بأعلى معايير السرية والخصوصية ولا نتحمل مسؤولية أي تأخيرات أو تغييرات في الإجراءات الحكومية أو الأمنية خارجة عن إرادتنا. جميع الخدمات تتم وفقاً للقوانين والأنظمة المعمول بها.
              </p>
            </div>
          </div>

          <div className="text-center text-[var(--text-subtle)] text-xs sm:text-sm border-t border-[var(--border-color)] pt-8">
            <p className="font-medium">© {new Date().getFullYear()} شركة إنفينتي لتنسيقات السفر. جميع الحقوق محفوظة.</p>
            <p className="mt-2 text-xs">صُمم بـ ❤️ لخدمة أهلنا في غزة</p>
          </div>
        </div>
      </footer>

      <a
        href="https://wa.me/972567706668?text=مرحباً، أحتاج مساعدة"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 left-5 sm:bottom-8 sm:left-8 z-50 w-14 h-14 sm:w-16 sm:h-16 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300 glow-gold animate-pulse"
        aria-label="WhatsApp"
      >
        <MessageCircle className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
      </a>
    </div>
  );
}

export default App; 
