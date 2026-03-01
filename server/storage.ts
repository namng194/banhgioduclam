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
    
    // Địa chỉ
    if (queryLower.includes('địa chỉ') || queryLower.includes('ở đâu') || queryLower.includes('chỗ') || queryLower.includes('nơi')) {
      return "Dạ, BÁNH GIÒ ĐỨC LÂM có địa chỉ tại 459 Bạch Mai, Hai Bà Trưng, Hà Nội ạ. Quán nằm trên đường Bạch Mai, rất dễ tìm ạ!";
    }
    
    // Số điện thoại
    if (queryLower.includes('số điện thoại') || queryLower.includes('liên hệ') || queryLower.includes('sđt') || queryLower.includes('gọi') || queryLower.includes('phone') || queryLower.includes('hotline')) {
      return "Dạ, anh/chị có thể liên hệ qua số điện thoại: 0984 989 795. Em sẵn sàng tư vấn và nhận đặt bánh ạ!";
    }
    
    // Social media
    if (queryLower.includes('facebook') || queryLower.includes('fanpage') || queryLower.includes('fb') || queryLower.includes('social')) {
      return "Dạ, fanpage của quán là: https://www.facebook.com/banhgioduclam với hơn 2,1K người bạn đang theo dõi. Anh/chị có thể xem thêm hình ảnh và đánh giá của khách hàng tại đây ạ!";
    }
    
    // Giờ mở cửa
    if (queryLower.includes('giờ') || queryLower.includes('mở cửa') || queryLower.includes('đóng cửa') || queryLower.includes('hoạt động') || queryLower.includes('bao giờ')) {
      return "Dạ, quán mở cửa từ 6h sáng đến 22h tối hàng ngày ạ. Anh/chị có thể ghé quán bất cứ lúc nào trong khung giờ này nhé!";
    }
    
    // Giá cả
    if (queryLower.includes('giá') || queryLower.includes('bao nhiêu') || queryLower.includes('tiền') || queryLower.includes('phí')) {
      return "Dạ, giá bánh giò của quán dao động từ 15.000đ - 25.000đ/chiếc tùy loại. Đây là mức giá phù hợp với chất lượng cao cấp, nguyên liệu tươi ngon mà quán cam kết ạ!";
    }
    
    // Menu / Sản phẩm
    if (queryLower.includes('menu') || queryLower.includes('món') || queryLower.includes('có gì') || queryLower.includes('bán gì') || queryLower.includes('loại')) {
      return "Dạ, quán chuyên các loại bánh giò truyền thống: bánh giò thường, bánh giò nhân thịt đặc biệt, bánh giò trứng muối, và bánh giò chay. Tất cả đều được làm thủ công hàng ngày với nguyên liệu cao cấp ạ!";
    }
    
    // Đặt bánh
    if (queryLower.includes('đặt') || queryLower.includes('order') || queryLower.includes('mua')) {
      return "Dạ, để đặt bánh anh/chị có thể gọi trực tiếp hotline: 0984 989 795 hoặc nhắn tin qua Facebook: facebook.com/banhgioduclam. Quán nhận đặt trước và giao hàng tận nơi trong khu vực nội thành Hà Nội ạ!";
    }
    
    // Giao hàng
    if (queryLower.includes('giao hàng') || queryLower.includes('ship') || queryLower.includes('delivery') || queryLower.includes('giao tận')) {
      return "Dạ, quán có dịch vụ giao hàng tận nơi trong khu vực nội thành Hà Nội. Phí ship dao động từ 15.000đ - 30.000đ tùy khoảng cách. Đơn từ 200.000đ trở lên được miễn phí ship ạ!";
    }
    
    // Chất lượng
    if (queryLower.includes('chất lượng') || queryLower.includes('chuẩn vị') || queryLower.includes('ngon') || queryLower.includes('thế nào') || queryLower.includes('ra sao')) {
      return "Bánh giò nhà Đức Lâm tự hào chuẩn vị, cao cấp, thượng hạng. Nói không với bánh rẻ tiền, hàng kém chất lượng! Quán cam kết chỉ sử dụng nguyên liệu tươi ngon, được chọn lọc kỹ càng mỗi ngày ạ!";
    }
    
    // Nguyên liệu
    if (queryLower.includes('nguyên liệu') || queryLower.includes('làm từ') || queryLower.includes('thành phần') || queryLower.includes('an toàn')) {
      return "Dạ, bánh giò của quán được làm từ bột gạo nguyên chất, thịt lợn nạc đùi, nấm mèo, mộc nhĩ, hành tím và các gia vị truyền thống. Tất cả đều là nguyên liệu tươi sống, không chất bảo quản, đảm bảo an toàn vệ sinh thực phẩm ạ!";
    }
    
    // Thanh toán
    if (queryLower.includes('thanh toán') || queryLower.includes('trả tiền') || queryLower.includes('chuyển khoản') || queryLower.includes('payment')) {
      return "Dạ, quán nhận thanh toán cả tiền mặt và chuyển khoản ngân hàng ạ. Anh/chị có thể chọn hình thức thanh toán thuận tiện nhất!";
    }
    
    // Chào hỏi
    if (queryLower.includes('chào') || queryLower.includes('hello') || queryLower.includes('hi') || queryLower.includes('xin chào')) {
      return "Dạ chào anh/chị! Em là chatbot của BÁNH GIÒ ĐỨC LÂM. Em có thể giúp anh/chị tìm hiểu về địa chỉ, giờ mở cửa, menu, giá cả, đặt bánh và giao hàng ạ. Anh/chị cần hỏi gì ạ?";
    }
    
    // Cảm ơn
    if (queryLower.includes('cảm ơn') || queryLower.includes('thanks') || queryLower.includes('thank')) {
      return "Dạ em cảm ơn anh/chị đã quan tâm! Nếu cần hỗ trợ thêm, đừng ngại gọi hotline 0984 989 795 nhé. Hẹn gặp lại anh/chị ạ!";
    }

    return "Dạ em chưa hiểu rõ câu hỏi của anh/chị lắm ạ. Anh/chị có thể hỏi em về:\n• Địa chỉ, giờ mở cửa\n• Menu, giá cả\n• Đặt bánh, giao hàng\n• Chất lượng, nguyên liệu\n\nHoặc gọi trực tiếp: 0984 989 795 để được tư vấn tốt nhất nhé!";
  }

  async createFaq(faq: InsertFaq): Promise<Faq> {
    const [newFaq] = await db.insert(faqs).values(faq).returning();
    return newFaq;
  }
}

export const storage = new DatabaseStorage();
