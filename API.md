# 📚 API Documentation

REST API endpoints cho website Bánh Giò Đức Lâm.

## Base URL

- **Development:** `http://localhost:5000`
- **Production:** `https://your-project.vercel.app`

## Endpoints

### 1. Get All FAQs

Lấy danh sách tất cả câu hỏi thường gặp.

**Endpoint:** `GET /api/faqs`

**Request:**
```bash
curl https://your-project.vercel.app/api/faqs
```

**Response:** `200 OK`
```json
[
  {
    "id": 1,
    "question": "Địa chỉ quán ở đâu?",
    "answer": "Dạ, BÁNH GIÒ ĐỨC LÂM có địa chỉ tại 459 Bạch Mai, Hai Bà Trưng, Hà Nội ạ."
  },
  {
    "id": 2,
    "question": "Số điện thoại liên hệ?",
    "answer": "Dạ, anh/chị có thể liên hệ qua số điện thoại: 0984 989 795 ạ."
  }
]
```

**Response Schema:**
```typescript
type Faq = {
  id: number;
  question: string;
  answer: string;
}

type Response = Faq[];
```

---

### 2. Chat with Bot

Gửi tin nhắn tới chatbot và nhận câu trả lời.

**Endpoint:** `POST /api/chat`

**Request:**
```bash
curl -X POST https://your-project.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Địa chỉ quán ở đâu?"}'
```

**Request Body:**
```json
{
  "message": "Địa chỉ quán ở đâu?"
}
```

**Request Schema:**
```typescript
type ChatRequest = {
  message: string; // Required, user's message
}
```

**Response:** `200 OK`
```json
{
  "answer": "Dạ, BÁNH GIÒ ĐỨC LÂM có địa chỉ tại 459 Bạch Mai, Hai Bà Trưng, Hà Nội ạ. Quán nằm trên đường Bạch Mai, rất dễ tìm ạ!"
}
```

**Response Schema:**
```typescript
type ChatResponse = {
  answer: string; // Bot's response
}
```

**Error Response:** `400 Bad Request`
```json
{
  "message": "Invalid input",
  "field": "message"
}
```

---

## Chatbot Logic

Chatbot sử dụng **keyword matching** để trả lời câu hỏi. Dưới đây là các keywords được nhận diện:

### Supported Keywords

| Keyword | Trigger Words | Example Response |
|---------|---------------|------------------|
| **Địa chỉ** | `địa chỉ`, `ở đâu`, `chỗ`, `nơi` | 459 Bạch Mai, Hai Bà Trưng, Hà Nội |
| **Điện thoại** | `số điện thoại`, `liên hệ`, `sđt`, `gọi`, `phone`, `hotline` | 0984 989 795 |
| **Facebook** | `facebook`, `fanpage`, `fb`, `social` | facebook.com/banhgioduclam |
| **Giờ mở cửa** | `giờ`, `mở cửa`, `đóng cửa`, `hoạt động`, `bao giờ` | 6h sáng - 22h tối |
| **Giá cả** | `giá`, `bao nhiêu`, `tiền`, `phí` | 15.000đ - 25.000đ/chiếc |
| **Menu** | `menu`, `món`, `có gì`, `bán gì`, `loại` | Bánh giò thường, nhân thịt đặc biệt, trứng muối, chay |
| **Đặt bánh** | `đặt`, `order`, `mua` | Gọi 0984 989 795 hoặc inbox Facebook |
| **Giao hàng** | `giao hàng`, `ship`, `delivery`, `giao tận` | 15.000đ - 30.000đ, miễn phí từ 200k |
| **Chất lượng** | `chất lượng`, `chuẩn vị`, `ngon`, `thế nào` | Chuẩn vị, cao cấp, thượng hạng |
| **Nguyên liệu** | `nguyên liệu`, `làm từ`, `thành phần`, `an toàn` | Bột gạo, thịt nạc đùi, nấm, không chất bảo quản |
| **Thanh toán** | `thanh toán`, `trả tiền`, `chuyển khoản`, `payment` | Tiền mặt hoặc chuyển khoản |
| **Chào** | `chào`, `hello`, `hi`, `xin chào` | Greeting message |
| **Cảm ơn** | `cảm ơn`, `thanks`, `thank` | Thank you message |

### Default Response

Nếu không match keyword nào:
```
Dạ em chưa hiểu rõ câu hỏi của anh/chị lắm ạ. 
Anh/chị có thể hỏi em về:
• Địa chỉ, giờ mở cửa
• Menu, giá cả  
• Đặt bánh, giao hàng
• Chất lượng, nguyên liệu

Hoặc gọi trực tiếp: 0984 989 795 để được tư vấn tốt nhất nhé!
```

---

## Error Handling

### Standard Error Response

```typescript
type ErrorResponse = {
  message: string;
  field?: string; // Present for validation errors
}
```

### HTTP Status Codes

| Code | Description |
|------|-------------|
| `200` | Success |
| `400` | Bad Request - Invalid input |
| `404` | Not Found - Endpoint doesn't exist |
| `500` | Internal Server Error - Something went wrong |

### Example Error Responses

**Validation Error:**
```json
{
  "message": "Required",
  "field": "message"
}
```

**Server Error:**
```json
{
  "message": "Internal Server Error"
}
```

---

## Rate Limiting

Currently **no rate limiting** is implemented. 

For production, consider adding:
- Express Rate Limit
- Vercel Edge Config
- Cloudflare Rate Limiting

---

## CORS

CORS is configured to allow all origins in development.

For production, update `server/index.ts`:
```typescript
app.use(cors({
  origin: ['https://banhgioduclam.vercel.app'],
  credentials: true
}));
```

---

## Authentication

Currently **no authentication** required.

Future features may add:
- Admin panel (requires auth)
- Order management (requires auth)
- Customer accounts (optional auth)

---

## Testing API

### Using cURL

```bash
# Get FAQs
curl https://your-project.vercel.app/api/faqs

# Chat
curl -X POST https://your-project.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Giá bao nhiêu?"}'
```

### Using JavaScript/Fetch

```javascript
// Get FAQs
fetch('https://your-project.vercel.app/api/faqs')
  .then(res => res.json())
  .then(data => console.log(data));

// Chat
fetch('https://your-project.vercel.app/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ message: 'Địa chỉ?' })
})
  .then(res => res.json())
  .then(data => console.log(data.answer));
```

### Using Postman

1. Create new request
2. Method: `POST`
3. URL: `https://your-project.vercel.app/api/chat`
4. Headers: `Content-Type: application/json`
5. Body (raw JSON):
   ```json
   {
     "message": "Quán có giao hàng không?"
   }
   ```

---

## Database Schema

### FAQs Table

```sql
CREATE TABLE faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL
);
```

**Indexes:**
- Primary key on `id` (auto-created)

**Future additions:**
- `created_at TIMESTAMP DEFAULT NOW()`
- `updated_at TIMESTAMP DEFAULT NOW()`
- `category VARCHAR(50)` for grouping FAQs
- `priority INTEGER` for ordering

---

## Performance

### Response Times (avg)

- `GET /api/faqs`: <50ms
- `POST /api/chat`: <100ms

### Optimization Tips

1. **Add Redis caching** for FAQs
2. **Database connection pooling** (already implemented)
3. **CDN** for static assets (Vercel auto)
4. **Database indexing** on frequently queried fields

---

## Future API Endpoints

### Planned

```typescript
// Admin: Create FAQ
POST /api/admin/faqs
Body: { question: string, answer: string }

// Admin: Update FAQ
PUT /api/admin/faqs/:id
Body: { question?: string, answer?: string }

// Admin: Delete FAQ
DELETE /api/admin/faqs/:id

// Submit order
POST /api/orders
Body: { items: OrderItem[], contact: ContactInfo }

// Contact form
POST /api/contact
Body: { name: string, phone: string, message: string }
```

---

## Support

API issues? Contact:
- 📧 Technical: Check [GitHub Issues](https://github.com/YOUR_USERNAME/banhgioduclam/issues)
- 📞 Business: 0984 989 795
- 💬 Facebook: facebook.com/banhgioduclam
