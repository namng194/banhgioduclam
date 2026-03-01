import type { Express } from "express";
import type { Server } from "http";
import { storage, getChatbotAnswer } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { testConnection } from "./db";

// Fallback FAQs when database is unavailable
const FALLBACK_FAQS = [
  {
    id: 1,
    question: "Địa chỉ quán ở đâu?",
    answer: "Dạ, BÁNH GIÒ ĐỨC LÂM có địa chỉ tại 459 Bạch Mai, Hai Bà Trưng, Hà Nội ạ. Quán nằm trên đường Bạch Mai, rất dễ tìm!"
  },
  {
    id: 2,
    question: "Số điện thoại liên hệ?",
    answer: "Dạ, anh/chị có thể liên hệ qua số điện thoại: 0984 989 795. Em sẵn sàng tư vấn và nhận đặt bánh ạ!"
  },
  {
    id: 3,
    question: "Chất lượng bánh thế nào?",
    answer: "Bánh giò nhà Đức Lâm tự hào chuẩn vị, cao cấp, thượng hạng. Nói không với bánh rẻ tiền, hàng kém chất lượng! Quán cam kết chỉ sử dụng nguyên liệu tươi ngon, được chọn lọc kỹ càng mỗi ngày."
  },
  {
    id: 4,
    question: "Quán mở cửa lúc mấy giờ?",
    answer: "Dạ, quán mở cửa từ 6h sáng đến 22h tối hàng ngày ạ. Anh/chị có thể ghé quán bất cứ lúc nào trong khung giờ này!"
  },
  {
    id: 5,
    question: "Giá bánh giò bao nhiêu?",
    answer: "Dạ, giá bánh giò của quán dao động từ 15.000đ - 25.000đ/chiếc tùy loại. Đây là mức giá phù hợp với chất lượng cao cấp mà quán cam kết."
  },
  {
    id: 6,
    question: "Quán có những loại bánh gì?",
    answer: "Dạ, quán chuyên các loại bánh giò truyền thống: bánh giò thường, bánh giò nhân thịt đặc biệt, bánh giò trứng muối, và bánh giò chay. Tất cả đều được làm thủ công hàng ngày!"
  },
  {
    id: 7,
    question: "Làm sao để đặt bánh?",
    answer: "Dạ, để đặt bánh anh/chị có thể gọi trực tiếp hotline: 0984 989 795 hoặc nhắn tin qua Facebook: facebook.com/banhgioduclam. Quán nhận đặt trước và giao hàng tận nơi!"
  },
  {
    id: 8,
    question: "Quán có giao hàng không?",
    answer: "Dạ có ạ! Quán có dịch vụ giao hàng tận nơi trong khu vực nội thành Hà Nội. Phí ship từ 15.000đ - 30.000đ tùy khoảng cách. Đơn từ 200.000đ miễn phí ship!"
  },
  {
    id: 9,
    question: "Bánh giò được làm từ nguyên liệu gì?",
    answer: "Dạ, bánh giò của quán được làm từ bột gạo nguyên chất, thịt lợn nạc đùi, nấm mèo, mộc nhĩ, hành tím và các gia vị truyền thống. Tất cả đều tươi sống, không chất bảo quản!"
  },
  {
    id: 10,
    question: "Có thể thanh toán bằng chuyển khoản không?",
    answer: "Dạ được ạ! Quán nhận thanh toán cả tiền mặt và chuyển khoản ngân hàng. Anh/chị chọn hình thức nào thuận tiện nhất nhé!"
  }
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.faqs.list.path, async (req, res) => {
    try {
      const allFaqs = await storage.getFaqs();
      res.json(allFaqs);
    } catch (err) {
      console.error('❌ Error fetching FAQs from database:', err);
      console.log('ℹ️  Returning fallback FAQs (database unavailable)');
      // Return fallback FAQs when database is unavailable
      res.json(FALLBACK_FAQS);
    }
  });

  app.post(api.chat.send.path, async (req, res) => {
    try {
      const input = api.chat.send.input.parse(req.body);

      // Get answer with full error protection
      // Chatbot ALWAYS works - no database dependency
      let answer: string;
      try {
        answer = await storage.getAnswerForQuestion(input.message);
      } catch (storageErr) {
        // If storage layer fails (should never happen), use direct fallback
        console.error('⚠️  Storage layer failed, using direct chatbot fallback:', storageErr);
        try {
          answer = getChatbotAnswer(input.message);
        } catch (fallbackErr) {
          // Ultimate fallback if everything fails
          console.error('❌ Even fallback failed (critical):', fallbackErr);
          answer = "Dạ em xin lỗi! Vui lòng gọi trực tiếp: 0984 989 795 để được hỗ trợ ngay ạ!";
        }
      }

      res.json({ answer });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }

      console.error('❌ Unexpected error in chat endpoint:', err);

      // Ultimate fallback: always provide a helpful response
      return res.status(200).json({
        answer: "Dạ em xin lỗi, hệ thống đang gặp một chút trục trặc. Vui lòng gọi trực tiếp: 0984 989 795 để được hỗ trợ ngay ạ!"
      });
    }
  });

  // Test database connection on startup
  console.log('🔄 Testing database connection...');
  const isConnected = await testConnection(3);

  if (!isConnected) {
    console.warn('⚠️  Warning: Database connection could not be established after multiple retries.');
    console.warn('   The server will start in FALLBACK MODE.');
    console.warn('   ✓ Chatbot will work with predefined answers');
    console.warn('   ✓ FAQs will use fallback data');
    console.warn('   The database should wake up on subsequent requests.');
  } else {
    console.log('✅ Database connection successful');
  }

  // Seed DB with some FAQs (with retry)
  if (isConnected) {
    seedDatabase().catch((err) => {
      console.error('⚠️  Database seeding failed:', err);
      console.error('   Operating in fallback mode...');
    });
  } else {
    console.log('ℹ️  Skipping database seeding (database unavailable)');
  }

  return httpServer;
}

async function seedDatabase() {
  const existingFaqs = await storage.getFaqs();
  if (existingFaqs.length === 0) {
    const faqsToSeed = [
      {
        question: "Địa chỉ quán ở đâu?",
        answer: "Dạ, BÁNH GIÒ ĐỨC LÂM có địa chỉ tại 459 Bạch Mai, Hai Bà Trưng, Hà Nội ạ. Quán nằm trên đường Bạch Mai, rất dễ tìm!"
      },
      {
        question: "Số điện thoại liên hệ?",
        answer: "Dạ, anh/chị có thể liên hệ qua số điện thoại: 0984 989 795. Em sẵn sàng tư vấn và nhận đặt bánh ạ!"
      },
      {
        question: "Chất lượng bánh thế nào?",
        answer: "Bánh giò nhà Đức Lâm tự hào chuẩn vị, cao cấp, thượng hạng. Nói không với bánh rẻ tiền, hàng kém chất lượng! Quán cam kết chỉ sử dụng nguyên liệu tươi ngon, được chọn lọc kỹ càng mỗi ngày."
      },
      {
        question: "Quán mở cửa lúc mấy giờ?",
        answer: "Dạ, quán mở cửa từ 6h sáng đến 22h tối hàng ngày ạ. Anh/chị có thể ghé quán bất cứ lúc nào trong khung giờ này!"
      },
      {
        question: "Giá bánh giò bao nhiêu?",
        answer: "Dạ, giá bánh giò của quán dao động từ 15.000đ - 25.000đ/chiếc tùy loại. Đây là mức giá phù hợp với chất lượng cao cấp mà quán cam kết."
      },
      {
        question: "Quán có những loại bánh gì?",
        answer: "Dạ, quán chuyên các loại bánh giò truyền thống: bánh giò thường, bánh giò nhân thịt đặc biệt, bánh giò trứng muối, và bánh giò chay. Tất cả đều được làm thủ công hàng ngày!"
      },
      {
        question: "Làm sao để đặt bánh?",
        answer: "Dạ, để đặt bánh anh/chị có thể gọi trực tiếp hotline: 0984 989 795 hoặc nhắn tin qua Facebook: facebook.com/banhgioduclam. Quán nhận đặt trước và giao hàng tận nơi!"
      },
      {
        question: "Quán có giao hàng không?",
        answer: "Dạ có ạ! Quán có dịch vụ giao hàng tận nơi trong khu vực nội thành Hà Nội. Phí ship từ 15.000đ - 30.000đ tùy khoảng cách. Đơn từ 200.000đ miễn phí ship!"
      },
      {
        question: "Bánh giò được làm từ nguyên liệu gì?",
        answer: "Dạ, bánh giò của quán được làm từ bột gạo nguyên chất, thịt lợn nạc đùi, nấm mèo, mộc nhĩ, hành tím và các gia vị truyền thống. Tất cả đều tươi sống, không chất bảo quản!"
      },
      {
        question: "Có thể thanh toán bằng chuyển khoản không?",
        answer: "Dạ được ạ! Quán nhận thanh toán cả tiền mặt và chuyển khoản ngân hàng. Anh/chị chọn hình thức nào thuận tiện nhất nhé!"
      }
    ];

    for (const faq of faqsToSeed) {
      await storage.createFaq(faq);
    }

    console.log(`✅ Seeded ${faqsToSeed.length} FAQs to database`);
  }
}
