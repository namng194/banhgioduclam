# Hướng Dẫn Deploy Lên Vercel

## ✅ Đã Fix: Ứng dụng giờ hoạt động KHÔNG CẦN database

Ứng dụng đã được cập nhật để **hoạt động hoàn hảo** ngay cả khi không có database connection:
- ✅ **Chatbot** vẫn hoạt động với logic predefined
- ✅ **FAQs** vẫn hiển thị với dữ liệu fallback
- ✅ **Server** khởi động thành công dù không có DATABASE_URL

## 🚀 Deploy Lên Vercel

### Option 1: Deploy KHÔNG CẦN Database (Recommended cho test nhanh)

1. Push code lên GitHub
2. Import project vào Vercel
3. Deploy - **Không cần config gì thêm!**
4. Ứng dụng sẽ hoạt động với fallback data

### Option 2: Deploy VỚI Database (Production)

#### Bước 1: Tạo Database trên Neon

1. Truy cập [neon.tech](https://neon.tech)
2. Tạo project mới (hoặc dùng project có sẵn)
3. Copy **Connection String** có dạng:
   ```
   postgresql://username:password@ep-xxx.region.aws.neon.tech/database?sslmode=require
   ```

#### Bước 2: Setup Database Schema

Chạy migration để tạo tables (local hoặc trên Neon):

```bash
npm run db:push
```

#### Bước 3: Config Vercel Environment Variables

1. Vào Vercel Dashboard → Your Project → Settings → Environment Variables
2. Thêm biến môi trường:
   - **Key**: `DATABASE_URL`
   - **Value**: Connection string từ Neon
   - **Environments**: Chọn `Production`, `Preview`, `Development`
3. Click **Save**

#### Bước 4: Redeploy

1. Vào tab **Deployments**
2. Click **...** trên deployment mới nhất
3. Click **Redeploy**

## 🔍 Kiểm Tra Logs

Để xem app đang chạy ở chế độ nào:

1. Vào Vercel Dashboard → Project → **Functions** hoặc **Deployments**
2. Click vào một function execution
3. Xem logs:
   - **❌ DATABASE_URL not set. Server will run in FALLBACK MODE.** → Chạy không có DB
   - **✅ Database connection test successful** → Đã kết nối DB thành công

## ⚙️ Optimization cho Vercel Serverless

Code đã được optimize cho Vercel serverless environment:
- ✅ Connection pooling: `max: 1` (không cần pool cho serverless)
- ✅ Timeout: `3000ms` (3 giây thay vì 60 giây)
- ✅ Idle timeout: `0` (đóng connection ngay)
- ✅ Keep-alive: Disabled cho serverless
- ✅ Graceful degradation khi DB timeout

## 🧪 Test Local

Test với database:
```bash
# Tạo file .env
echo "DATABASE_URL=your_connection_string" > .env

# Run dev
npm run dev
```

Test KHÔNG có database (fallback mode):
```bash
# Xóa DATABASE_URL hoặc comment out trong .env
# DATABASE_URL=...

# Run dev
npm run dev
```

Cả 2 mode đều hoạt động bình thường!

## 📝 Notes

- FAQs sẽ luôn hiển thị (từ database hoặc fallback)
- Chatbot luôn hoạt động (database chỉ để check availability)
- Server khởi động nhanh ngay cả khi database suspended/unavailable
- Timeout cho mọi database operation: **1.5 giây** → fallback ngay

## 🆘 Troubleshooting

### FAQs không hiển thị
- ✅ **FIXED**: FAQs giờ luôn hiển thị với fallback data

### Chatbot không hoạt động
- ✅ **FIXED**: Chatbot giờ luôn hoạt động với predefined logic

### Vercel Function Timeout
- ✅ **FIXED**: Database operations timeout sau 1.5s và fallback

### Database Connection Error
- ✅ **FIXED**: App vẫn chạy bình thường, log warning và dùng fallback

---

**Kết luận**: Deploy lên Vercel giờ đây **"just works"** - không cần phải lo lắng về database connection! 🎉
