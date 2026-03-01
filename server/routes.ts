import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.faqs.list.path, async (req, res) => {
    const allFaqs = await storage.getFaqs();
    res.json(allFaqs);
  });

  app.post(api.chat.send.path, async (req, res) => {
    try {
      const input = api.chat.send.input.parse(req.body);
      const answer = await storage.getAnswerForQuestion(input.message);
      res.json({ answer });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Seed DB with some FAQs (with retry logic)
  seedDatabaseWithRetry();

  return httpServer;
}

async function seedDatabaseWithRetry(retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      await seedDatabase();
      console.log('✅ Database seeded successfully');
      return;
    } catch (error) {
      console.log(`⚠️  Database connection attempt ${i + 1}/${retries} failed:`, error instanceof Error ? error.message : error);
      if (i < retries - 1) {
        const delay = Math.min(1000 * Math.pow(2, i), 5000);
        console.log(`   Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        console.error('❌ Database seed failed after all retries. Server will continue without initial data.');
      }
    }
  }
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
