# ⚡ Deploy Vercel - 5 phút

## Bước 1: Import GitHub Repo vào Vercel

1. Vào: **https://vercel.com/new**
2. Login (GitHub account)
3. "Import Git Repository"
4. Paste: `https://github.com/namng194/banhgioduclam`
5. Select branch: **`dev`**
6. Click **"Import"**

## Bước 2: Configure Project

**Framework Preset:** Other

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `dist/public`
- Install Command: `npm install`

**Root Directory:** `./` (leave default)

## Bước 3: Setup Database (Vercel Postgres)

**QUAN TRỌNG:** Làm NGAY khi project được tạo (trước khi deploy)

### Option A: Vercel Postgres (Recommended)

1. Trong Vercel project → Tab **"Storage"**
2. Click **"Create Database"**
3. Chọn **"Postgres"**
4. Database name: `banhgioduclam-db`
5. Region: **Singapore** (gần VN nhất)
6. Click **"Create"**
7. ✅ Vercel tự động add `DATABASE_URL` vào Environment Variables

### Option B: Neon (Free tier tốt hơn)

1. Vào: **https://console.neon.tech/signup**
2. Sign up với GitHub
3. **Create Project:**
   - Name: `banhgioduclam`
   - Region: **Singapore**
4. Copy **"Pooled connection"** string
5. Quay lại Vercel project:
   - Settings → **Environment Variables**
   - Name: `DATABASE_URL`
   - Value: (paste connection string)
   - Environment: **Production, Preview, Development**
   - Click **"Save"**

## Bước 4: Deploy

1. Click **"Deploy"** (nút lớn màu đen)
2. Đợi ~2-3 phút
3. ✅ Website live tại: `https://banhgioduclam-xxx.vercel.app`

## Bước 5: Push Database Schema

**SAU KHI deploy thành công:**

### Cách 1: Vercel CLI
```bash
# Install Vercel CLI (nếu chưa có)
npm i -g vercel

# Link project
vercel link

# Get DATABASE_URL
vercel env pull .env.production

# Push schema
source .env.production && npm run db:push
```

### Cách 2: Neon/Vercel SQL Editor

**Neon:** SQL Editor → Run:
```sql
CREATE TABLE faqs (
  id SERIAL PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL
);
```

**Vercel Postgres:** Storage → Database → SQL tab → Run query trên

## ✅ Verify Deployment

1. Mở website: `https://your-project.vercel.app`
2. Click chatbot icon (góc phải dưới)
3. Gửi tin nhắn: "Địa chỉ"
4. Nếu FAQs rỗng → Seed data:

```sql
INSERT INTO faqs (question, answer) VALUES
  ('Địa chỉ quán ở đâu?', 'Dạ, BÁNH GIÒ ĐỨC LÂM có địa chỉ tại 459 Bạch Mai, Hai Bà Trưng, Hà Nội ạ.'),
  ('Số điện thoại liên hệ?', 'Dạ, anh/chị có thể liên hệ qua số điện thoại: 0984 989 795 ạ.'),
  ('Chất lượng bánh thế nào?', 'Bánh giò nhà Đức Lâm tự hào chuẩn vị, cao cấp, thượng hạng!');
```

## 🔄 Auto-Deploy

Mỗi lần push code lên GitHub branch `dev`, Vercel tự động deploy!

```bash
git add .
git commit -m "update something"
git push origin dev
# Auto deploy! 🚀
```

## 🐛 Troubleshooting

### Build failed?
- Check Vercel logs: Project → Deployments → Click failed deployment
- Usually: Missing DATABASE_URL

### Database connection error?
- Verify DATABASE_URL in Settings → Environment Variables
- Format: `postgresql://user:pass@host:5432/db?sslmode=require`

### Chatbot không trả lời?
- Database schema chưa được push
- FAQs chưa có data → Run seed SQL

---

## 🎯 TÓM TẮT

1. **https://vercel.com/new** → Import `https://github.com/namng194/banhgioduclam`
2. Select branch `dev`
3. Storage → Create Postgres (hoặc dùng Neon)
4. Deploy
5. Push schema: `npm run db:push`

**Done!** Website live trong 5 phút.
