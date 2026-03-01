# 🥟 Bánh Giò Đức Lâm

Website chuyên nghiệp cho quán bánh giò truyền thống tại Hà Nội, với tích hợp chatbot AI hỗ trợ khách hàng 24/7.

![Bánh Giò Đức Lâm](https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/616838197_122278854656190415_5330095285622941852_n.jpg)

## 📍 Thông Tin Quán

- **Tên quán:** BÁNH GIÒ ĐỨC LÂM
- **Địa chỉ:** 459 Bạch Mai, Hai Bà Trưng, Hà Nội
- **Điện thoại:** 0984 989 795
- **Facebook:** [facebook.com/banhgioduclam](https://www.facebook.com/banhgioduclam)
- **Slogan:** *Ở đây có bánh giò chuẩn vị, cao cấp, thượng hạng. Nói không với bánh rẻ tiền, hàng kém chất lượng!*

## 🚀 Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Framer Motion** - Animation library
- **TanStack Query** - Data fetching & caching
- **Wouter** - Minimal routing

### Backend
- **Node.js & Express** - Web server
- **TypeScript** - Type safety
- **Drizzle ORM** - Type-safe database ORM
- **PostgreSQL** - Relational database
- **Zod** - Schema validation

### Features
- ✅ Responsive design (mobile-first)
- ✅ Interactive chatbot với keyword matching
- ✅ FAQ section với animation
- ✅ Google Maps integration
- ✅ Contact forms
- ✅ SEO optimized
- ✅ Production-ready

## 📦 Installation

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm hoặc yarn

### Local Development

1. **Clone repository:**
```bash
git clone <your-repo-url>
cd banhgioduclam
```

2. **Install dependencies:**
```bash
npm install
```

3. **Setup environment variables:**
```bash
cp .env.example .env
```

Chỉnh sửa `.env` với thông tin database của bạn:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/banhgioduclam
PORT=5000
NODE_ENV=development
```

4. **Setup database:**
```bash
# Push schema to database
npm run db:push

# (Optional) Open Drizzle Studio to view database
npm run db:studio
```

5. **Start development server:**
```bash
npm run dev
```

Website sẽ chạy tại `http://localhost:5000`

## 🌐 Deploy to Vercel (FREE)

### Bước 1: Chuẩn bị Database

Bạn cần một PostgreSQL database. Có nhiều lựa chọn miễn phí:

#### Option A: Vercel Postgres (Recommended)
1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Tạo project mới
3. Vào tab "Storage" → "Create Database" → "Postgres"
4. Copy connection string

#### Option B: Neon (Free PostgreSQL)
1. Đăng ký tại [neon.tech](https://neon.tech)
2. Tạo project mới (Free tier: 500MB storage)
3. Copy connection string từ dashboard

#### Option C: Supabase (Free PostgreSQL)
1. Đăng ký tại [supabase.com](https://supabase.com)
2. Tạo project mới (Free tier)
3. Vào "Project Settings" → "Database" → Copy connection string

### Bước 2: Push Code lên GitHub

```bash
# Tạo repo trên GitHub trước
git init
git add .
git commit -m "Initial commit: Banh Gio Duc Lam website"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Bước 3: Deploy trên Vercel

#### Via Vercel Dashboard (Dễ nhất)

1. Vào [vercel.com](https://vercel.com) và đăng nhập
2. Click "Add New" → "Project"
3. Import Git Repository (chọn repo vừa push)
4. Configure project:
   - **Framework Preset:** Other
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist/public`
   - **Install Command:** `npm install`

5. Thêm Environment Variables:
   ```
   DATABASE_URL=<your-postgres-connection-string>
   NODE_ENV=production
   ```

6. Click "Deploy"

#### Via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Add environment variables
vercel env add DATABASE_URL
# Paste your database URL

# Deploy to production
vercel --prod
```

### Bước 4: Setup Database Schema

Sau khi deploy, bạn cần push database schema:

```bash
# Set DATABASE_URL environment variable
export DATABASE_URL=<your-vercel-postgres-url>

# Push schema
npm run db:push
```

Hoặc bạn có thể chạy migration trực tiếp từ Vercel dashboard terminal.

### Bước 5: Kiểm tra

- Website sẽ available tại: `https://your-project.vercel.app`
- Chatbot sẽ tự động seed FAQs lần đầu chạy
- Test chatbot và các chức năng

## 🗃️ Database Schema

```typescript
// FAQs table
{
  id: serial PRIMARY KEY,
  question: text NOT NULL,
  answer: text NOT NULL
}
```

Database sẽ tự động được seed với 10 FAQs mặc định khi chạy lần đầu.

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server (hot reload)

# Production
npm run build        # Build for production
npm start           # Start production server

# Database
npm run db:generate  # Generate migration files
npm run db:push     # Push schema to database
npm run db:studio   # Open Drizzle Studio

# Type checking
npm run check       # Run TypeScript type check
```

## 🎨 Customization

### Thay đổi màu sắc
Chỉnh sửa `tailwind.config.ts`:
```typescript
theme: {
  extend: {
    colors: {
      primary: {...}, // Màu chính
      secondary: {...}, // Màu phụ
    }
  }
}
```

### Thêm FAQs
FAQs được tự động seed trong `server/routes.ts`. Bạn có thể:
1. Thêm vào `seedDatabase()` function
2. Hoặc dùng Drizzle Studio để thêm trực tiếp

### Cải thiện Chatbot
Logic chatbot ở `server/storage.ts` method `getAnswerForQuestion()`.
Bạn có thể:
- Thêm keywords mới
- Cải thiện matching algorithm
- Tích hợp AI (OpenAI, Google Gemini, etc.)

## 🔒 Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `DATABASE_URL` | PostgreSQL connection string | Yes | - |
| `PORT` | Server port | No | 5000 |
| `NODE_ENV` | Environment (development/production) | No | development |
| `SESSION_SECRET` | Session secret key (for future auth) | No | - |

## 📱 Features Roadmap

- [ ] Admin panel để quản lý FAQs
- [ ] Online ordering system
- [ ] Payment integration
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Multi-language support
- [ ] AI-powered chatbot (OpenAI/Gemini)
- [ ] Customer reviews system

## 🐛 Troubleshooting

### Database connection errors
```bash
# Check DATABASE_URL format
postgresql://user:password@host:port/database

# Test connection
psql $DATABASE_URL
```

### Build errors
```bash
# Clear cache and rebuild
rm -rf dist node_modules
npm install
npm run build
```

### Chatbot not responding
- Check database connection
- Verify FAQs are seeded
- Check browser console for errors

## 📄 License

MIT License - feel free to use for your own restaurant!

## 👨‍💻 Support

Nếu gặp vấn đề khi deploy, liên hệ:
- Facebook: [facebook.com/banhgioduclam](https://www.facebook.com/banhgioduclam)
- Phone: 0984 989 795

---

Made with ❤️ for Bánh Giò Đức Lâm
