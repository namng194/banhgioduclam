# ✅ Pre-Deployment Checklist

Checklist này giúp đảm bảo website sẵn sàng deploy lên production.

## 📋 Code Quality

- [x] TypeScript type checking passes (`npm run check`)
- [x] No console errors in development
- [x] All components render correctly
- [x] Mobile responsive design tested
- [x] Cross-browser compatibility (Chrome, Firefox, Safari)

## 🎨 Content & Design

- [x] Hero section với thông tin quán
- [x] Contact section với địa chỉ, SĐT, Facebook
- [x] FAQ section với animation
- [x] Google Maps integration
- [x] Chatbot widget ở góc phải
- [x] Logo/Brand identity (ĐL)
- [x] Images optimized và có alt text
- [x] Favicon configured

## 🤖 Chatbot

- [x] Chatbot responds to địa chỉ queries
- [x] Chatbot responds to giờ mở cửa
- [x] Chatbot responds to giá cả
- [x] Chatbot responds to menu
- [x] Chatbot responds to đặt bánh
- [x] Chatbot responds to giao hàng
- [x] Chatbot responds to chất lượng
- [x] Chatbot has default fallback response
- [x] Quick reply buttons work
- [x] Smooth animations

## 📊 Database

- [x] Schema defined in `shared/schema.ts`
- [x] Drizzle config properly set up
- [x] Seed data prepared in `server/routes.ts`
- [ ] Database URL configured (do this during deployment)
- [ ] Schema pushed to production DB (do after deployment)

## 🌐 SEO & Meta

- [x] HTML lang="vi" for Vietnamese
- [x] Title tag descriptive & < 60 chars
- [x] Meta description < 160 chars
- [x] Open Graph tags for social sharing
- [x] Twitter card tags
- [x] Schema.org structured data (Restaurant)
- [x] Canonical URL
- [x] Robots meta tag

## 🚀 Deployment Config

- [x] `.env.example` created
- [x] `vercel.json` configured
- [x] `.gitignore` includes sensitive files
- [x] `package.json` scripts ready
- [x] Build command works (`npm run build`)
- [x] Production environment variables documented

## 📄 Documentation

- [x] `README.md` with setup instructions
- [x] `DEPLOYMENT.md` with deploy guide
- [x] `API.md` with API documentation
- [x] Environment variables documented
- [x] Troubleshooting section

## 🔒 Security

- [x] No API keys in code
- [x] `.env` in `.gitignore`
- [x] Database URL not hardcoded
- [x] Input validation (Zod schemas)
- [x] SQL injection prevention (Drizzle ORM)

## 📱 Testing

Before deploying, test these scenarios:

### Homepage
- [ ] Hero loads với đúng thông tin
- [ ] Images load correctly
- [ ] CTA buttons work (Đến Quán, Gọi Đặt)
- [ ] Navigation links work
- [ ] Facebook link opens correctly

### Features Section
- [ ] 3 feature cards display
- [ ] Icons render correctly
- [ ] Hover animations work

### FAQ Section
- [ ] FAQs load from API
- [ ] Accordion opens/closes smoothly
- [ ] Icons animate on open/close
- [ ] Loading skeleton displays

### Contact Section
- [ ] Địa chỉ card clickable → opens Google Maps
- [ ] Phone card clickable → initiates call
- [ ] Facebook card clickable → opens FB page
- [ ] Google Maps embedded correctly

### Chatbot Widget
- [ ] Widget button visible bottom-right
- [ ] Click opens chat window
- [ ] Initial greeting displays
- [ ] Can send messages
- [ ] Bot responds correctly
- [ ] Quick replies work
- [ ] Close button works
- [ ] Animations smooth
- [ ] Mobile responsive

### API Endpoints
Test in browser or Postman after deployment:

```bash
# Get FAQs
curl https://your-project.vercel.app/api/faqs

# Chat
curl -X POST https://your-project.vercel.app/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "địa chỉ"}'
```

Expected responses:
- [ ] GET /api/faqs returns array of FAQs
- [ ] POST /api/chat returns { answer: string }
- [ ] Error responses return proper JSON

## 🎯 Performance

- [ ] Lighthouse score > 90 (Performance)
- [ ] Lighthouse score > 95 (Accessibility)
- [ ] Lighthouse score > 90 (Best Practices)
- [ ] Lighthouse score > 95 (SEO)
- [ ] First Contentful Paint < 1.5s
- [ ] Time to Interactive < 3s

Run Lighthouse:
1. Open Chrome DevTools (F12)
2. Go to Lighthouse tab
3. Select "Mobile" + all categories
4. Click "Analyze page load"

## 🌍 Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Chrome (Android)
- [ ] Mobile Safari (iOS)

## 📲 Mobile Testing

- [ ] Layout responsive on 320px width
- [ ] Layout responsive on 375px width (iPhone)
- [ ] Layout responsive on 768px width (tablet)
- [ ] Touch targets > 44px
- [ ] No horizontal scroll
- [ ] Chatbot usable on mobile
- [ ] Maps scrollable/pinchable

## 🔍 Final Checks

Before going live:

- [ ] Remove console.logs from code
- [ ] Remove debug code
- [ ] Check for TODO comments
- [ ] Verify all links work
- [ ] Test on production DB
- [ ] Monitor first deployment logs
- [ ] Test after deployment (smoke test)

## 🎉 Post-Deployment

After successful deployment:

- [ ] Share link with stakeholders
- [ ] Monitor error logs (first 24h)
- [ ] Check analytics setup
- [ ] Test chatbot with real users
- [ ] Collect feedback
- [ ] Update Facebook page with website link
- [ ] Add website to Google My Business (if applicable)

## 📊 Monitoring

Setup monitoring for:
- [ ] Uptime (Vercel auto)
- [ ] Error rates
- [ ] API response times
- [ ] Database connection health
- [ ] Chatbot usage metrics

## 🐛 If Something Breaks

1. Check Vercel deployment logs
2. Check browser console errors
3. Verify DATABASE_URL is set correctly
4. Test API endpoints manually
5. Check database has data
6. Roll back to previous deployment if needed

---

## ✅ Ready to Deploy?

If all core items checked, you're ready! 🚀

```bash
vercel --prod
```

---

**Questions?** Check:
- `README.md` - Setup guide
- `DEPLOYMENT.md` - Deployment instructions
- `API.md` - API documentation

**Need help?** Contact: 0984 989 795
