import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, MoreHorizontal } from "lucide-react";
import { useChat } from "@/hooks/use-chat";

interface Message {
  id: string;
  role: "bot" | "user";
  content: string;
}

const QUICK_REPLIES = [
  "Địa chỉ quán ở đâu?",
  "Số điện thoại?",
  "Chất lượng bánh?",
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "initial",
      role: "bot",
      content: "Chào bạn, mình có thể giúp gì cho bạn?",
    },
  ]);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatMutation = useChat();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, chatMutation.isPending]);

  const handleSend = (text: string) => {
    if (!text.trim() || chatMutation.isPending) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: text,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");

    chatMutation.mutate(
      { message: text },
      {
        onSuccess: (data) => {
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: "bot",
              content: data.answer,
            },
          ]);
        },
        onError: () => {
          setMessages((prev) => [
            ...prev,
            {
              id: (Date.now() + 1).toString(),
              role: "bot",
              content: "Xin lỗi, hiện tại hệ thống đang bận. Bạn vui lòng gọi hotline 0984 989 795 nhé!",
            },
          ]);
        },
      }
    );
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-80 sm:w-96 overflow-hidden rounded-2xl bg-card shadow-2xl border border-border/50 flex flex-col"
            style={{ maxHeight: "calc(100vh - 120px)", height: "500px" }}
          >
            {/* Header */}
            <div className="bg-primary px-4 py-4 flex items-center justify-between shadow-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary font-display font-bold text-xl shadow-sm">
                  ĐL
                </div>
                <div>
                  <h3 className="text-primary-foreground font-semibold leading-tight">Đức Lâm Bot</h3>
                  <p className="text-primary-foreground/80 text-xs">Luôn sẵn sàng hỗ trợ</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground/80 hover:text-white hover:bg-white/10 p-2 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto chat-scroll p-4 space-y-4 bg-background/50">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-2.5 rounded-2xl ${
                      msg.role === "user"
                        ? "bg-primary text-primary-foreground rounded-tr-sm shadow-md shadow-primary/10"
                        : "bg-white text-foreground border border-border/50 rounded-tl-sm shadow-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </motion.div>
              ))}
              
              {chatMutation.isPending && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-white border border-border/50 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-primary/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-2 h-2 rounded-full bg-primary flex animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </motion.div>
              )}

              {/* Suggestions after each message */}
              {!chatMutation.isPending && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-wrap gap-2 pt-2"
                >
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => handleSend(reply)}
                      className="text-[10px] sm:text-xs px-2.5 py-1 bg-white hover:bg-primary hover:text-white border border-primary/20 text-primary rounded-full transition-all duration-200 shadow-sm"
                    >
                      {reply}
                    </button>
                  ))}
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-3 bg-white border-t border-border">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Nhập tin nhắn..."
                  disabled={chatMutation.isPending}
                  className="flex-1 bg-muted/50 border border-transparent focus:border-primary/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-full px-4 py-2.5 text-sm transition-all duration-200"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || chatMutation.isPending}
                  className="bg-primary text-primary-foreground p-2.5 rounded-full shadow-lg shadow-primary/25 hover:shadow-xl hover:bg-primary/90 disabled:opacity-50 disabled:hover:shadow-none transition-all duration-200"
                >
                  <Send className="w-4 h-4 translate-x-px translate-y-px" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-xl shadow-primary/30 flex items-center justify-center relative overflow-hidden group"
      >
        <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
        {isOpen ? <X className="w-6 h-6 relative z-10" /> : <MessageCircle className="w-6 h-6 relative z-10" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent border-2 border-background rounded-full"></span>
        )}
      </motion.button>
    </div>
  );
}
