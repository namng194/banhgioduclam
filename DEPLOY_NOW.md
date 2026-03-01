# 🚀 Deploy Ngay

## ✅ Đã Hoàn Thành

- [x] Cover image từ Facebook đã cập nhật
- [x] Code đã push lên GitHub (branch `dev`)
- [x] Vercel CLI đã cài đặt

## 📌 Deploy Lên Vercel (3 bước)

### 1. Login Vercel
```bash
vercel login
```

### 2. Deploy
```bash
vercel --prod
```

### 3. Setup Database

#### Option A: Vercel Postgres (Dễ nhất)
1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project `banhgioduclam`
3. Tab "Storage" → "Create Database" → "Postgres"
4. Copy DATABASE_URL
5. Vào "Settings" → "Environment Variables" → Add `DATABASE_URL`

#### Option B: Neon (Free tốt hơn)
1. Đăng ký [neon.tech](https://neon.tech)
2. Create project → Copy connection string
3. Vercel Dashboard → Project Settings → Environment Variables
4. Add: `DATABASE_URL` = connection string từ Neon

### 4. Push Database Schema
```bash
# Set DATABASE_URL
export DATABASE_URL="your_connection_string_here"

# Push schema
npm run db:push
```

## 🌐 Link Website

Sau khi deploy xong: `https://banhgioduclam.vercel.app`

## 📱 Test Local (Cần Database)

```bash
# Tạo .env với DATABASE_URL thật
echo "DATABASE_URL=postgresql://..." > .env

# Start dev
npm run dev
```

Truy cập: http://localhost:5000

## ❓ Lỗi?

**Database connection error:**
- Check DATABASE_URL đúng format
- Đảm bảo database đã được tạo

**Build error:**
- Run `npm run build` local để test

**Chatbot không hoạt động:**
- Check database đã có FAQs chưa (run `npm run db:studio`)

---

📞 Need help? 0984 989 795
