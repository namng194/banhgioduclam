import { useQuery } from "@tanstack/react-query";
import { api } from "@shared/routes";

// Fallback FAQs for when API fails
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
];

export function useFaqs() {
  return useQuery({
    queryKey: [api.faqs.list.path],
    queryFn: async () => {
      try {
        const res = await fetch(api.faqs.list.path, { credentials: "include" });
        if (!res.ok) {
          console.warn('FAQ API failed, using fallback data');
          return FALLBACK_FAQS;
        }
        const data = await res.json();
        return api.faqs.list.responses[200].parse(data);
      } catch (error) {
        console.warn('FAQ fetch error, using fallback data:', error);
        return FALLBACK_FAQS;
      }
    },
    // Always return data, never throw
    retry: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}
