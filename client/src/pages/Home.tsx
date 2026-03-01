import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Phone, Facebook, CheckCircle2, Star, Clock, Menu, X } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";
import { FaqSection } from "@/components/FaqSection";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* ===== HEADER ===== */}
      <header className="fixed top-0 left-0 right-0 z-[100] px-3 sm:px-6 lg:px-8 pt-3">
        <div className="max-w-7xl mx-auto flex justify-between items-center bg-white/85 backdrop-blur-lg rounded-2xl px-4 sm:px-6 py-2.5 shadow-lg shadow-black/[0.04] border border-white/60">
          <a href="#" className="flex items-center gap-2.5">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-primary rounded-lg flex items-center justify-center text-primary-foreground font-display font-bold text-xs sm:text-sm shadow-sm">
              ĐL
            </div>
            <span className="text-base sm:text-lg font-display font-bold text-foreground tracking-tight">
              Đức Lâm
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1">
            <a href="#about" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-black/[0.03] transition-all">Giới Thiệu</a>
            <a href="#faq" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-black/[0.03] transition-all">Hỏi Đáp</a>
            <a href="#contact" className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-black/[0.03] transition-all">Liên Hệ</a>
            <a href="tel:0984989795" className="ml-2 bg-primary text-primary-foreground px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
              <Phone className="w-3.5 h-3.5" />
              Gọi Ngay
            </a>
          </nav>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-foreground"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="md:hidden mt-2 bg-white rounded-2xl px-5 py-4 max-w-7xl mx-auto shadow-xl border border-border/50"
            >
              <nav className="flex flex-col text-sm font-medium">
                <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-3 text-foreground border-b border-border/30">Giới Thiệu</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="py-3 text-foreground border-b border-border/30">Hỏi Đáp</a>
                <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-3 text-foreground border-b border-border/30">Liên Hệ</a>
                <a href="tel:0984989795" className="mt-3 bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-center flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  0984 989 795
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== HERO ===== */}
      <section className="pt-14 sm:pt-16">
        <div className="relative h-full w-full aspect-[5/3]">
          <img
            src="/hero-cover.jpg"
            alt="Bánh Giò Đức Lâm"
            className="absolute inset-0 w-full h-full object-cover"
            // className="absolute inset-0 w-full h-full object-contain bg-black"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/5" />

          {/* Text in flow for sticky to work */}
          <div className="relative z-10 flex flex-col h-full">
            <div className="flex-1" />
            <div className="sticky bottom-0 p-5 sm:p-8 md:p-12 lg:p-16 xl:p-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-3xl space-y-3 sm:space-y-5"
              >
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-white/90 text-xs sm:text-sm font-medium border border-white/20">
                  <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="currentColor" />
                  <span>2,1K+ người tin dùng</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-[1.1]">
                  Thưởng thức Bánh Giò
                  <br />
                  Chuẩn vị truyền thống
                </h2>

                <p className="text-white/75 text-sm sm:text-base md:text-lg max-w-lg leading-relaxed hidden sm:block">
                  Cao cấp, thượng hạng. Nói không với bánh rẻ tiền, hàng kém chất lượng.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 pt-1 sm:pt-2">
                  <a
                    href="#contact"
                    className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold bg-white text-foreground hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <MapPin className="w-4 h-4" />
                    Đến Quán Ngay
                  </a>
                  <a
                    href="tel:0984989795"
                    className="px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-semibold bg-white/15 backdrop-blur-sm text-white border border-white/25 hover:bg-white/25 transition-all duration-300 flex items-center justify-center gap-2 text-sm sm:text-base"
                  >
                    <Phone className="w-4 h-4" />
                    0984 989 795
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section id="about" className="py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3">
              Vì Sao Chọn <span className="text-primary">Đức Lâm</span>?
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
              Hương vị truyền thống, chất lượng thượng hạng
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl p-6 sm:p-8 border border-border/50 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4 sm:mb-5">
                <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Chuẩn Vị Truyền Thống</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Công thức độc quyền lưu giữ hương vị tinh túy ngàn xưa.</p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl p-6 sm:p-8 border border-border/50 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center mx-auto mb-4 sm:mb-5">
                <Star className="w-6 h-6 sm:w-7 sm:h-7" fill="currentColor" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Cao Cấp, Thượng Hạng</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Chỉ sử dụng nguyên liệu tươi ngon nhất, chọn lọc kỹ càng.</p>
            </motion.div>

            <motion.div whileHover={{ y: -4 }} className="bg-white rounded-2xl p-6 sm:p-8 border border-border/50 text-center hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 sm:mb-5">
                <Clock className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-base sm:text-lg font-bold mb-2">Nói Không Hàng Kém</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">Cam kết tuyệt đối không dùng bánh rẻ tiền, luôn đảm bảo chất lượng.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <div id="faq" className="scroll-mt-20">
        <FaqSection />
      </div>

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-16 sm:py-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold mb-3">
              Ghé Thăm Quán
            </h2>
            <p className="text-muted-foreground text-sm sm:text-base max-w-md mx-auto">
              Đến tận nơi trải nghiệm hương vị bánh giò thượng hạng
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-10">
            <a
              href="https://maps.google.com/?q=459+B%E1%BA%A1ch+Mai,+Hai+B%C3%A0+Tr%C6%B0ng,+H%C3%A0+N%E1%BB%99i"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 sm:p-8 rounded-2xl border border-border/50 flex flex-col items-center text-center gap-3 group hover:shadow-lg hover:border-primary/20 transition-all"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                <MapPin className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-base sm:text-lg font-bold">Địa Chỉ</h3>
              <p className="text-muted-foreground text-sm">459 Bạch Mai,<br />Hai Bà Trưng, Hà Nội</p>
            </a>

            <a
              href="tel:0984989795"
              className="bg-white p-6 sm:p-8 rounded-2xl border border-border/50 flex flex-col items-center text-center gap-3 group hover:shadow-lg hover:border-primary/20 transition-all"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
                <Phone className="w-6 h-6 sm:w-7 sm:h-7 text-primary group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-base sm:text-lg font-bold">Hotline</h3>
              <p className="text-primary text-xl sm:text-2xl font-bold mt-1">0984 989 795</p>
            </a>

            <a
              href="https://www.facebook.com/banhgioduclam"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-6 sm:p-8 rounded-2xl border border-border/50 flex flex-col items-center text-center gap-3 group hover:shadow-lg hover:border-[#1877F2]/20 transition-all"
            >
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#1877F2]/10 flex items-center justify-center group-hover:bg-[#1877F2] transition-colors">
                <Facebook className="w-6 h-6 sm:w-7 sm:h-7 text-[#1877F2] group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-base sm:text-lg font-bold">Facebook</h3>
              <p className="text-muted-foreground text-sm">2,1K+ người theo dõi</p>
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-lg border border-border/50 h-[260px] sm:h-[320px] md:h-[380px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.7335661245!2d105.84752627596851!3d21.003314488651846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac73f3099993%3A0x609565f375f0a203!2zNDU5IELhuqFjaCBNYWksIFRHLiBC4buZLCBIYWkgQsOgIFRyxrBuZywgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1715678901234!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bánh Giò Đức Lâm - 459 Bạch Mai, Hà Nội"
            ></iframe>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="bg-foreground py-10 sm:py-12 px-4 mt-auto">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start sm:justify-between gap-6 text-center sm:text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-primary font-display font-bold text-sm">
                ĐL
              </div>
              <div>
                <p className="font-display font-bold text-white text-lg">Bánh Giò Đức Lâm</p>
                <p className="text-white/50 text-xs">Chuẩn vị, cao cấp, thượng hạng</p>
              </div>
            </div>
            <div className="text-white/50 text-sm space-y-1">
              <p>459 Bạch Mai, Hai Bà Trưng, Hà Nội</p>
              <p>Hotline: <a href="tel:0984989795" className="text-white/70 hover:text-white transition-colors">0984 989 795</a></p>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 text-center">
            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} Bánh Giò Đức Lâm. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <ChatWidget />
    </div>
  );
}
