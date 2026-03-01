import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageSquare } from "lucide-react";
import { useFaqs } from "@/hooks/use-faqs";

export function FaqSection() {
  const { data: faqs, isLoading } = useFaqs();
  const [openId, setOpenId] = useState<number | null>(null);

  if (isLoading) {
    return (
      <div className="py-20 bg-muted/30">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="h-8 bg-muted rounded-full w-48 mx-auto mb-10 animate-pulse"></div>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-white rounded-xl shadow-sm animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Always render FAQs section (fallback data is provided by hook)
  if (!faqs || faqs.length === 0) {
    return null; // This should rarely happen now that we have fallback
  }

  return (
    <section className="py-24 bg-muted/20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Câu Hỏi Thường Gặp
          </h2>
          <p className="text-muted-foreground">
            Giải đáp một số thắc mắc khách hàng thường hỏi Bánh Giò Đức Lâm
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openId === faq.id;

            return (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen ? "border-primary/30 shadow-md" : "border-border/50 shadow-sm hover:border-border hover:shadow-md"
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="flex items-center justify-between w-full p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                      isOpen ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                    }`}>
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <span className={`font-semibold text-lg transition-colors ${
                      isOpen ? "text-primary" : "text-foreground"
                    }`}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 pl-[72px] text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
