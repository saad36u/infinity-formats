# ⚡ Quick Start Guide - 5 Minutes to Launch

Get your Infinity Travel website live in 5 simple steps!

---

## Step 1: Update Contact Information (2 minutes)

Open `src/App.tsx` and use Find & Replace (Ctrl+F or Cmd+F):

### Find & Replace These:

1. **WhatsApp Number**
   - Find: `970599999999`
   - Replace: `970XXXXXXXXX` (your actual number)
   
2. **Telegram**
   - Find: `infinitytravel`
   - Replace: `yourhandle` (your Telegram username)
   
3. **Email**
   - Find: `info@infinitytravel.ps`
   - Replace: `your@email.com`

4. **Phone Display**
   - Find: `+970 59 999 9999`
   - Replace: `+970 XX XXX XXXX`

**Save the file!**

---

## Step 2: Replace Logo (1 minute)

1. Get your company logo (PNG, 200x200px minimum)
2. Save it as `public/logo.png` (replace existing file)
3. Done!

---

## Step 3: Build for Production (30 seconds)

Open terminal and run:

```bash
npm run build
```

Wait for "✓ built in X seconds" message.

---

## Step 4: Deploy (1 minute)

### Option A: Netlify (Easiest!)

1. Go to [app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag the entire `dist` folder onto the page
3. Your site is LIVE! 🎉

You'll get a URL like: `https://random-name-123.netlify.app`

### Option B: Vercel

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login
3. Click "Add New" → "Project"
4. Upload `dist` folder
5. Done!

### Option C: Traditional Hosting

1. Connect via FTP
2. Upload contents of `dist` folder to `public_html`
3. Done!

---

## Step 5: Test (30 seconds)

Open your live site and test:
- [ ] Click WhatsApp button (does it open WhatsApp with your number?)
- [ ] Click Telegram link (goes to your channel?)
- [ ] Test on mobile phone
- [ ] All sections load correctly

---

## ✅ You're LIVE!

**That's it!** Your professional travel coordination website is now online.

---

## 🔥 Optional Improvements (Later)

When you have more time:

### Update Testimonials
In `src/App.tsx`, search for "Testimonial" and replace the 3 example reviews with real client feedback.

### Adjust Statistics
Search for "+1,500" and update to your actual number of cases.

### Legal Review
Have a lawyer review the disclaimer text in the footer section.

### Custom Domain
In Netlify/Vercel dashboard:
1. Click "Domain Settings"
2. Add your domain (e.g., infinitytravel.ps)
3. Update DNS records as shown
4. Wait 24-48 hours for DNS propagation

### Add Analytics
1. Get Google Analytics tracking code
2. Add to `index.html` in `<head>` section
3. Rebuild and redeploy

---

## 🆘 Troubleshooting

**WhatsApp link not working?**
- Make sure number has no spaces or + in the code
- Format should be: `970XXXXXXXXX` (country code + number)

**Logo not showing?**
- Check file is named exactly `logo.png`
- Make sure it's in the `public` folder
- Rebuild: `npm run build`

**Site not updating?**
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check you uploaded the NEW `dist` folder

**Build errors?**
- Run: `npm install`
- Then: `npm run build`

---

## 📞 Quick Commands Reference

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm run preview      # Preview build locally

# Deployment
netlify deploy --prod --dir=dist    # Deploy to Netlify
vercel --prod                       # Deploy to Vercel
```

---

## 📚 Need More Details?

- **Full customization**: Read `CUSTOMIZATION_GUIDE.md`
- **Deployment options**: Read `DEPLOYMENT.md`
- **Feature overview**: Read `WEBSITE_OVERVIEW.md`
- **Complete docs**: Read `README.md`

---

## ✨ Pro Tips

1. **Test WhatsApp on your phone** before announcing the site
2. **Set up WhatsApp Business** for professional appearance
3. **Enable HTTPS** (automatic on Netlify/Vercel)
4. **Share on social media** once everything is tested
5. **Monitor analytics** to see how users interact

---

**Total Time**: ~5 minutes to basic launch
**Total Cost**: $0 (free hosting) + domain if you want ($10-15/year)

---

🎉 **Congratulations!** You now have a professional travel coordination website serving people in Gaza.

**Next**: Share your website URL and start helping people travel safely!

صُمم بـ ❤️ لخدمة أهلنا في غزة
