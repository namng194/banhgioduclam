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

  // Seed DB with some FAQs
  seedDatabase().catch(console.error);

  return httpServer;
}

async function seedDatabase() {
  const existingFaqs = await storage.getFaqs();
  if (existingFaqs.length === 0) {
    await storage.createFaq({
      question: "Địa chỉ quán ở đâu?",
      answer: "Dạ, BÁNH GIÒ ĐỨC LÂM có địa chỉ tại 459 Bạch Mai, Hai Bà Trưng, Hà Nội ạ."
    });
    await storage.createFaq({
      question: "Số điện thoại liên hệ?",
      answer: "Dạ, anh/chị có thể liên hệ qua số điện thoại: 0984 989 795 ạ."
    });
    await storage.createFaq({
      question: "Chất lượng bánh thế nào?",
      answer: "Bánh giò nhà Đức Lâm tự hào chuẩn vị, cao cấp, thượng hạng. Nói không với bánh rẻ tiền, hàng kém chất lượng!"
    });
  }
}
