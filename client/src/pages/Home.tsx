import { motion } from "framer-motion";
import { MapPin, Phone, Facebook, CheckCircle2, Star, Clock, ChefHat } from "lucide-react";
import { ChatWidget } from "@/components/ChatWidget";
import { FaqSection } from "@/components/FaqSection";

export default function Home() {
  return (
    // FIX 1: Bỏ 'overflow-x-hidden' ở div gốc. Chỉ giữ lại flex và layout cơ bản.
    <div className="min-h-screen bg-background flex flex-col relative">

      {/* FIX 2: Tạo một thẻ bao riêng cho Background Blobs với 'overflow-hidden'.
          Thẻ này sẽ dính chặt vào khung nền (absolute inset-0) và cắt bỏ phần thừa của blobs. */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] py-6 px-4 sm:px-6 lg:px-8 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center glass-panel rounded-2xl px-6 py-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-white font-display font-bold shadow-lg shadow-primary/30">
              ĐL
            </div>
            <h1 className="text-xl md:text-2xl font-display font-bold text-foreground tracking-tight">
              Bánh Giò <span className="text-primary">Đức Lâm</span>
            </h1>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm font-semibold text-muted-foreground">
            <a href="#about" className="hover:text-primary transition-colors">Về Chúng Tôi</a>
            <a href="#contact" className="hover:text-primary transition-colors">Liên Hệ</a>
            <a
              href="https://www.facebook.com/banhgioduclam"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent/10 text-accent px-4 py-2 rounded-full hover:bg-accent hover:text-white transition-all duration-300 flex items-center gap-2"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      {/* FIX 3: Thêm 'overflow-x-clip' (hoặc overflow-hidden) vào section này để tránh thanh cuộn ngang
          khi animation từ trái (-x) bay vào */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-32 px-4 sm:px-6 lg:px-8 relative overflow-x-clip">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex flex-col space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 text-secondary-foreground font-semibold text-sm w-fit border border-secondary/30">
              <Star className="w-4 h-4 text-secondary" fill="currentColor" />
              <span>Thương hiệu 2,1K+ người bạn tin dùng</span>
            </div>

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold leading-[1.1] text-balance">
              Thưởng thức <br/>
              <span className="text-primary relative inline-block">
                Bánh Giò
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-secondary/40" viewBox="0 0 100 20" preserveAspectRatio="none">
                  <path d="M0,10 Q50,20 100,10" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                </svg>
              </span><br/>
              Chuẩn vị truyền thống
            </h2>

            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
              Ở đây có bánh giò chuẩn vị, cao cấp, thượng hạng. Nói không với bánh rẻ tiền, hàng kém chất lượng.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="#contact"
                className="px-8 py-4 rounded-xl font-semibold bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center gap-2"
              >
                <MapPin className="w-5 h-5" />
                Đến Quán Ngay
              </a>
              <a
                href="tel:0984989795"
                className="px-8 py-4 rounded-xl font-semibold bg-white text-foreground border-2 border-border shadow-sm hover:border-primary hover:text-primary transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                <Phone className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                Gọi Đặt Bánh
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl shadow-primary/10 border-8 border-white bg-white flex items-center justify-center min-h-[360px]">
              <img
                src="https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/616838197_122278854656190415_5330095285622941852_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=7b2446&_nc_ohc=ff9LLY7OJ6sQ7kNvwGLD1SC&_nc_oc=AdnIA3qjwDhTTGjpiJx9OwKzhxkdXLpbUjEmbuEnwOUnjSMG4XnrtZkpebmn9O9f3JrkLT-ub0gkPS_N44w34Q-y&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=ZKhP-og8awKsX5c4HAnXNQ&_nc_ss=8&oh=00_AfvYzac1xI0O79z27z2OrluEv4laF1-UGSSoNovkBHZWjA&oe=69A9EC7E"
                alt="Bánh Giò Đức Lâm"
                // className="block w-full h-auto max-h-[640px] object-contain"
                className="block w-full h-[400px] object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel rounded-xl p-4 flex items-center gap-4 text-white">
                <div className="bg-primary p-3 rounded-full">
                  <ChefHat className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-lg font-display">Cao Cấp & Thượng Hạng</p>
                  <p className="text-sm opacity-90">Hương vị khó quên</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Features Section */}
      <section id="about" className="py-20 bg-white scroll-mt-32 relative">
        <span id="aboutus" className="absolute -top-32" aria-hidden="true"></span>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-8 text-center divide-y sm:divide-y-0 sm:divide-x divide-border">

            <motion.div
              whileHover={{ y: -5 }}
              className="px-6 py-4 flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center rotate-3 transition-transform hover:rotate-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Chuẩn Vị Truyền Thống</h3>
              <p className="text-muted-foreground text-sm">Công thức độc quyền lưu giữ hương vị tinh túy ngàn xưa.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="px-6 py-4 flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 bg-secondary/10 text-secondary-foreground rounded-2xl flex items-center justify-center -rotate-3 transition-transform hover:-rotate-6">
                <Star className="w-8 h-8 text-secondary" fill="currentColor" />
              </div>
              <h3 className="text-xl font-bold">Cao Cấp, Thượng Hạng</h3>
              <p className="text-muted-foreground text-sm">Chỉ sử dụng nguyên liệu tươi ngon nhất, chọn lọc kỹ càng.</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -5 }}
              className="px-6 py-4 flex flex-col items-center gap-4"
            >
              <div className="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center rotate-3 transition-transform hover:rotate-6">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold">Nói Không Hàng Kém</h3>
              <p className="text-muted-foreground text-sm">Cam kết tuyệt đối không dùng bánh rẻ tiền, luôn đảm bảo chất lượng.</p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FaqSection />

      {/* Contact Section */}
      {/* Note: Section này đã có overflow-hidden nên an toàn với skew */}
      <section id="contact" className="py-24 relative overflow-hidden z-10 scroll-mt-32">
        <div className="absolute inset-0 bg-primary text-primary-foreground skew-y-3 transform origin-bottom-left -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">Ghé Thăm Quán Ngay</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Hãy đến và tự mình trải nghiệm hương vị bánh giò thượng hạng làm nức lòng thực khách Hà Thành.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">

            <motion.a
              href="https://maps.google.com/?q=459+Bạch+Mai,+Hai+Bà+Trưng,+Hà+Nội"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="bg-card p-8 rounded-3xl shadow-xl shadow-black/5 flex flex-col items-center text-center gap-4 border border-border group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                <MapPin className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Địa Chỉ</h3>
              <p className="text-muted-foreground">459 Bạch Mai, <br/>Hai Bà Trưng, Hà Nội</p>
            </motion.a>

            <motion.a
              href="tel:0984989795"
              whileHover={{ scale: 1.03 }}
              className="bg-card p-8 rounded-3xl shadow-xl shadow-black/5 flex flex-col items-center text-center gap-4 border border-border group"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors duration-300">
                <Phone className="w-8 h-8 text-primary group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Điện Thoại</h3>
              <p className="text-muted-foreground text-2xl font-bold text-primary mt-2">0984 989 795</p>
            </motion.a>

            <motion.a
              href="https://www.facebook.com/banhgioduclam"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              className="bg-card p-8 rounded-3xl shadow-xl shadow-black/5 flex flex-col items-center text-center gap-4 border border-border group"
            >
              <div className="w-16 h-16 rounded-full bg-[#1877F2]/10 flex items-center justify-center group-hover:bg-[#1877F2] transition-colors duration-300">
                <Facebook className="w-8 h-8 text-[#1877F2] group-hover:text-white transition-colors duration-300" />
              </div>
              <h3 className="text-xl font-bold text-foreground">Facebook</h3>
              <p className="text-muted-foreground">Theo dõi và <br/>kết nối với 2,1K+ người bạn</p>
            </motion.a>

          </div>

          {/* Google Maps Integration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 rounded-3xl overflow-hidden shadow-2xl border-4 border-white h-[400px] relative"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.7335661245!2d105.84752627596851!3d21.003314488651846!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac73f3099993%3A0x609565f375f0a203!2zNDU5IELhuqFjaCBNYWksIFRHLiBC4buZLCBIYWkgQsOgIFRyxrBuZywgSMOgIE7hu5lpLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1715678901234!5m2!1svi!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Địa chỉ Bánh Giò Đức Lâm"
            ></iframe>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-muted py-12 px-4 text-center border-t-4 border-primary">
        <div className="max-w-4xl mx-auto flex flex-col items-center gap-6">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary font-display font-bold text-xl mb-2">
            ĐL
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold text-white mb-2">BÁNH GIÒ ĐỨC LÂM</h3>
            <p className="opacity-70 max-w-md mx-auto">Ở đây có bánh giò chuẩn vị, cao cấp, thượng hạng. Nói không với bánh rẻ tiền, hàng kém chất lượng.</p>
          </div>
          <p className="text-sm opacity-50 mt-8 pt-8 border-t border-white/10 w-full">
            © {new Date().getFullYear()} Bánh Giò Đức Lâm. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Floating Chatbot Widget */}
      <ChatWidget />
    </div>
  );
}
