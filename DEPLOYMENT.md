# 🚀 Deployment Guide - Vercel

Hướng dẫn chi tiết triển khai website Bánh Giò Đức Lâm lên Vercel hoàn toàn miễn phí.

## Prerequisites

- [ ] Tài khoản GitHub (free)
- [ ] Tài khoản Vercel (free)
- [ ] Database PostgreSQL (xem options bên dưới)

## Step-by-Step Deployment

### 1. Setup Database (Choose ONE option)

#### ⭐ Option A: Vercel Postgres (Recommended - Easiest)

**Ưu điểm:** Tích hợp sẵn với Vercel, zero config
**Free tier:** 256 MB storage, 60 hours compute/month

1. Đăng nhập [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Storage" → "Create Database"
3. Chọn "Postgres"
4. Đặt tên database: `banhgioduclam-db`
5. Chọn region gần Hà Nội nhất (Singapore)
6. Click "Create"
7. Copy connection string từ `.env.local` tab

#### Option B: Neon (Generous Free Tier)

**Ưu điểm:** Free tier rộng rãi, auto-suspend khi không dùng
**Free tier:** 512 MB storage, unlimited compute

1. Đăng ký tại [neon.tech](https://neon.tech)
2. Click "Create Project"
3. Tên project: `banhgioduclam`
4. Region: Singapore
5. PostgreSQL version: 16 (latest)
6. Click "Create Project"
7. Copy connection string từ dashboard (chọn "Pooled connection")

#### Option C: Supabase

**Ưu điểm:** Nhiều tính năng bổ sung (Auth, Storage, Real-time)
**Free tier:** 500 MB storage, unlimited API requests

1. Đăng ký tại [supabase.com](https://supabase.com)
2. Click "New project"
3. Organization: Tạo mới
4. Name: `banhgioduclam`
5. Database Password: Tạo password mạnh (lưu lại!)
6. Region: Southeast Asia (Singapore)
7. Đợi ~2 phút để database được provision
8. Vào "Project Settings" → "Database"
9. Copy "Connection string" (chọn "URI" mode)
10. Thay `[YOUR-PASSWORD]` bằng password vừa tạo

### 2. Push to GitHub

```bash
# Initialize git (nếu chưa có)
git init

# Add all files
git add .

# Commit
git commit -m "feat: Initial deployment - Banh Gio Duc Lam website"

# Tạo repository mới trên GitHub
# Sau đó push:
git remote add origin https://github.com/YOUR_USERNAME/banhgioduclam.git
git branch -M main
git push -u origin main
```

### 3. Deploy to Vercel

#### Method 1: Vercel Dashboard (Recommended)

1. **Import Project**
   - Vào [vercel.com/new](https://vercel.com/new)
   - Click "Import Git Repository"
   - Chọn repo `banhgioduclam`
   - Click "Import"

2. **Configure Project**
   ```
   Framework Preset: Other
   Root Directory: ./
   Build Command: npm run build
   Output Directory: dist/public
   Install Command: npm install
   ```

3. **Add Environment Variables**
   Click "Environment Variables" và thêm:

   ```env
   # Required
   DATABASE_URL=postgresql://user:pass@host/db
   NODE_ENV=production

   # Optional
   SESSION_SECRET=random-string-here-change-me
   ```

   **Important:** Paste DATABASE_URL từ bước 1!

4. **Deploy**
   - Click "Deploy"
   - Đợi ~2-3 phút
   - ✅ Website live tại: `https://your-project.vercel.app`

#### Method 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (development)
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? (select your account)
# - Link to existing project? N
# - What's your project's name? banhgioduclam
# - In which directory is your code located? ./
# - Auto-detected settings, override? N

# Add environment variables
vercel env add DATABASE_URL production
# Paste your database URL when prompted

vercel env add NODE_ENV production
# Enter: production

# Deploy to production
vercel --prod
```

### 4. Initialize Database Schema

**Important:** Database schema phải được tạo trước khi website chạy!

#### Option A: Via Vercel CLI (Recommended)

```bash
# Set DATABASE_URL locally
export DATABASE_URL="your_connection_string_here"

# Push schema to database
npm run db:push

# Verify
echo "✅ Database schema created!"
```

#### Option B: Via Local Dev Environment

```bash
# Create .env file
echo "DATABASE_URL=your_connection_string_here" > .env

# Push schema
npm run db:push

# Optional: View in Drizzle Studio
npm run db:studio
```

#### Option C: Via Database Provider's SQL Editor

**Neon/Supabase:** Vào SQL Editor và chạy:

```sql
CREATE TABLE IF NOT EXISTS faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL
);

-- Insert seed data
INSERT INTO faqs (question, answer) VALUES
  ('Địa chỉ quán ở đâu?', 'Dạ, BÁNH GIÒ ĐỨC LÂM có địa chỉ tại 459 Bạch Mai, Hai Bà Trưng, Hà Nội ạ.'),
  ('Số điện thoại liên hệ?', 'Dạ, anh/chị có thể liên hệ qua số điện thoại: 0984 989 795 ạ.'),
  ('Chất lượng bánh thế nào?', 'Bánh giò nhà Đức Lâm tự hào chuẩn vị, cao cấp, thượng hạng. Nói không với bánh rẻ tiền, hàng kém chất lượng!');
```

### 5. Verify Deployment

1. **Check Homepage:** `https://your-project.vercel.app`
2. **Test Chatbot:** Click icon ở góc phải, gửi tin nhắn
3. **Check FAQs:** Scroll xuống phần "Câu Hỏi Thường Gặp"
4. **Test API:**
   ```bash
   curl https://your-project.vercel.app/api/faqs
   ```

### 6. Setup Custom Domain (Optional)

1. Vào Project Settings → Domains
2. Thêm domain của bạn (vd: `banhgioduclam.com`)
3. Cấu hình DNS records theo hướng dẫn
4. Đợi ~10 phút để SSL được issue

## Post-Deployment

### View Logs

```bash
# Real-time logs
vercel logs --follow

# Last 100 logs
vercel logs
```

### Update Environment Variables

```bash
# Via CLI
vercel env add VARIABLE_NAME production

# Hoặc via Dashboard:
# Project Settings → Environment Variables
```

### Re-deploy

Mỗi lần push code mới lên GitHub, Vercel sẽ tự động deploy!

```bash
git add .
git commit -m "feat: update chatbot responses"
git push
# Auto-deploy! 🚀
```

## Troubleshooting

### ❌ Build Failed

**Error:** `Cannot find module 'xyz'`
```bash
# Fix: Ensure package is in package.json
npm install xyz --save
git add package.json package-lock.json
git commit -m "fix: add missing dependency"
git push
```

### ❌ Database Connection Error

**Error:** `Connection refused` hoặc `Invalid credentials`

1. Kiểm tra DATABASE_URL format:
   ```
   postgresql://user:password@host:5432/database?sslmode=require
   ```

2. Verify trong Vercel:
   - Project Settings → Environment Variables
   - Đảm bảo DATABASE_URL được set cho "Production"

3. Test connection locally:
   ```bash
   psql $DATABASE_URL
   ```

### ❌ API Routes Return 404

**Solution:**
- Xóa `.vercel` folder: `rm -rf .vercel`
- Re-deploy: `vercel --prod`

### ❌ Chatbot không hoạt động

**Check:**
1. Database schema đã được tạo chưa?
2. FAQs có seed data chưa?
3. Check browser console: F12 → Console
4. Check network tab: F12 → Network

```bash
# Verify FAQs in database
npm run db:studio
# Mở browser, check "faqs" table
```

## Monitoring & Analytics

### Built-in Vercel Analytics

Enable tại: Project Settings → Analytics → Enable

### Custom Monitoring

Add to client code:
```typescript
// Track chatbot usage
useEffect(() => {
  analytics.track('chatbot_opened');
}, [isOpen]);
```

## Cost Breakdown (All FREE!)

| Service | Free Tier | Cost If Exceed |
|---------|-----------|----------------|
| Vercel Hosting | 100GB bandwidth/month | $20/mo |
| Vercel Postgres | 256MB, 60hrs compute | $0.16/GB |
| Neon Database | 512MB storage | Free forever |
| Supabase | 500MB storage | Free forever |
| Domain (optional) | - | ~$10/year |

**Expected monthly cost:** $0 (well within free tiers)

## Support

Gặp vấn đề?

1. Check [Vercel Docs](https://vercel.com/docs)
2. Check [Drizzle Docs](https://orm.drizzle.team)
3. Liên hệ: 0984 989 795

---

✅ **Deployment Complete!** Website đã sẵn sàng phục vụ khách hàng 24/7!
