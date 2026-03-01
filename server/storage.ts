import { db } from "./db";
import { faqs, type Faq, type InsertFaq } from "@shared/schema";
import { eq, ilike } from "drizzle-orm";

export interface IStorage {
  getFaqs(): Promise<Faq[]>;
  getAnswerForQuestion(question: string): Promise<string>;
  createFaq(faq: InsertFaq): Promise<Faq>;
}

export class DatabaseStorage implements IStorage {
  async getFaqs(): Promise<Faq[]> {
    return await db.select().from(faqs);
  }

  async getAnswerForQuestion(questionQuery: string): Promise<string> {
    // Simple naive keyword matching for the scripted chatbot
    const allFaqs = await this.getFaqs();
    
    // Find best match by checking if the query contains words from the question
    const queryLower = questionQuery.toLowerCase();
    
    if (queryLower.includes('địa chỉ') || queryLower.includes('ở đâu')) {
      return "Dạ, BÁNH GIÒ ĐỨC LÂM có địa chỉ tại 459 Bạch Mai, Hai Bà Trưng, Hà Nội ạ.";
    }
    
    if (queryLower.includes('số điện thoại') || queryLower.includes('liên hệ') || queryLower.includes('sđt') || queryLower.includes('gọi')) {
      return "Dạ, anh/chị có thể liên hệ qua số điện thoại: 0984 989 795 ạ.";
    }
    
    if (queryLower.includes('facebook') || queryLower.includes('fanpage') || queryLower.includes('fb')) {
      return "Dạ, fanpage của quán là: https://www.facebook.com/banhgioduclam ạ.";
    }
    
    if (queryLower.includes('chất lượng') || queryLower.includes('chuẩn vị') || queryLower.includes('ngon')) {
      return "Bánh giò nhà Đức Lâm tự hào chuẩn vị, cao cấp, thượng hạng. Nói không với bánh rẻ tiền, hàng kém chất lượng!";
    }

    return "Dạ em chưa hiểu ý mình lắm, anh/chị có thể hỏi về địa chỉ, số điện thoại, hoặc thông tin fanpage BÁNH GIÒ ĐỨC LÂM nhé!";
  }

  async createFaq(faq: InsertFaq): Promise<Faq> {
    const [newFaq] = await db.insert(faqs).values(faq).returning();
    return newFaq;
  }
}

export const storage = new DatabaseStorage();
