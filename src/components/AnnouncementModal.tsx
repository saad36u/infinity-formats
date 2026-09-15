import { useState, useEffect } from 'react';
import { X, AlertTriangle, MessageCircle, Shield } from 'lucide-react';

interface AnnouncementModalProps {
  whatsappNumber?: string;
  telegramHandle?: string;
}

export default function AnnouncementModal({
  whatsappNumber = "972567706668",
  telegramHandle = "InfinityFormats"
}: AnnouncementModalProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  const whatsappMessage = encodeURIComponent("مرحباً شركة إنفينتي، أرغب في التسجيل في خدمات تنسيق السفر والعبور من غزة");

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl sm:rounded-3xl bg-white dark:bg-[#0f172a] border-2 border-[#8B1538]/50 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* الشريط العلوي الملون */}
        <div className="sticky top-0 h-1.5 bg-gradient-to-l from-[#8B1538] via-[#D4AF37] to-[#8B1538] z-10"></div>

        {/* زر الإغلاق */}
        <button
          onClick={handleClose}
          aria-label="إغلاق"
          className="absolute top-3 left-3 z-20 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-[#8B1538] hover:bg-[#6B0F1A] flex items-center justify-center transition-all hover:scale-110 shadow-lg text-white"
        >
          <X className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        {/* المحتوى */}
        <div className="p-5 sm:p-7 pt-8 sm:pt-10">
          
          {/* الأيقونة + العنوان */}
          <div className="flex flex-col items-center text-center mb-5 sm:mb-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] flex items-center justify-center mb-3 shadow-2xl glow-burgundy">
              <AlertTriangle className="w-8 h-8 sm:w-10 sm:h-10 text-[#D4AF37]" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-[#1a1a2e] dark:text-white mb-2">
              إعلان مهم لجميع العملاء
            </h2>
            <div className="w-16 h-1 bg-gradient-to-l from-[#8B1538] to-[#D4AF37] rounded-full"></div>
          </div>

          {/* النص الرئيسي */}
          <div className="space-y-3 sm:space-y-4 text-sm sm:text-base leading-relaxed">
            <p className="text-center font-semibold text-[#1a1a2e] dark:text-white">
              السلام عليكم ورحمة الله وبركاته،
              <br />
              إلى جميع عملائنا الكرام،
            </p>

            <p className="text-center text-[#4a5568] dark:text-gray-300 font-medium">
              نوصل كل جهودنا من أجل مساعدتكم وتمكينكم من العبور بأمان عبر المعابر الرسمية.
            </p>

            {/* التنبيه المهم */}
            <div className="bg-gradient-to-l from-[#8B1538]/10 to-[#D4AF37]/15 dark:from-[#8B1538]/30 dark:to-[#D4AF37]/20 border-2 border-[#8B1538]/30 dark:border-[#D4AF37]/40 rounded-xl p-4 my-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-[#8B1538] dark:text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-black text-[#8B1538] dark:text-[#D4AF37] mb-2 text-sm sm:text-base">
                    ⚠️ تنبيه هام جداً
                  </p>
                  <p className="text-sm sm:text-base text-[#1a1a2e] dark:text-white leading-relaxed font-semibold">
                    <strong>التسجيل الرسمي والمعتمد</strong> لدينا يتم <strong className="text-[#8B1538] dark:text-[#D4AF37]">فقط عبر الواتساب</strong> الموجود في الموقع.
                  </p>
                  <p className="text-xs sm:text-sm text-[#4a5568] dark:text-gray-300 mt-2 font-medium">
                    أي وسيلة تواصل أخرى لا تمثلنا ولا نتحمل مسؤوليتها. احذر من الجهات المزيفة.
                  </p>
                </div>
              </div>
            </div>

            {/* زر الواتساب */}
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#1eb955] text-white font-bold text-base sm:text-lg py-3.5 sm:py-4 rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-xl"
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>التسجيل عبر واتساب</span>
            </a>

            {/* الزر الثاني - تصفح الموقع */}
            <button
              onClick={handleClose}
              className="w-full text-[#718096] dark:text-gray-400 hover:text-[#8B1538] dark:hover:text-[#D4AF37] text-sm py-2 transition-colors font-semibold"
            >
              تصفح الموقع أولاً ←
            </button>
          </div>

          {/* Footer بسيط */}
          <div className="mt-5 pt-4 border-t border-black/10 dark:border-white/10 text-center">
            <p className="text-[10px] sm:text-xs text-[#718096] dark:text-gray-500 font-medium">
              © شركة إنفينتي لتنسيقات السفر - خدمة موثوقة ومعتمدة
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}