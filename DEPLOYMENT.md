# 🚀 Deployment Guide - شركة إنفينتي

Quick guide to deploy your website to various hosting platforms.

## 📦 Build the Project

Before deploying, always build the production version:

```bash
npm run build
```

This creates a `dist` folder with optimized files ready for deployment.

**Output**: 
- `dist/index.html` - Single-file HTML (261 KB, 75 KB gzipped)
- `dist/logo.png` - Your company logo

---

## 🌐 Deployment Options

### Option 1: Netlify (Recommended - Free & Easy)

1. **Sign up** at [netlify.com](https://netlify.com)

2. **Deploy via Drag & Drop**:
   - Drag the entire `dist` folder to Netlify dashboard
   - Your site is live instantly!

3. **Or deploy via CLI**:
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod --dir=dist
   ```

4. **Custom Domain**:
   - Go to Domain Settings
   - Add your custom domain
   - Update DNS records as shown

**Benefits**: Free hosting, automatic HTTPS, great performance, easy updates

---

### Option 2: Vercel (Also Free & Fast)

1. **Sign up** at [vercel.com](https://vercel.com)

2. **Deploy via CLI**:
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Or via GitHub**:
   - Push code to GitHub
   - Import repository in Vercel
   - Auto-deploys on push!

4. **Custom Domain**:
   - Add domain in project settings
   - Follow DNS instructions

**Benefits**: Excellent performance, automatic HTTPS, GitHub integration

---

### Option 3: Traditional Web Hosting (cPanel/FTP)

If you have traditional web hosting with cPanel or FTP access:

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Upload files**:
   - Connect via FTP (FileZilla, etc.)
   - Upload contents of `dist` folder to `public_html` or `www` folder
   - Make sure `index.html` is in the root

3. **File structure on server**:
   ```
   public_html/
   ├── index.html
   └── logo.png
   ```

4. **Set up HTTPS**:
   - Use Let's Encrypt (usually free in cPanel)
   - Or purchase SSL certificate
   - Install via cPanel SSL/TLS section

**Benefits**: Full control, works with existing hosting

---

### Option 4: GitHub Pages (Free)

1. **Create GitHub repository**

2. **Add deployment script** to `package.json`:
   ```json
   {
     "scripts": {
       "deploy": "npm run build && npx gh-pages -d dist"
     }
   }
   ```

3. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

5. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select `gh-pages` branch
   - Your site will be at `https://username.github.io/repo-name`

**Benefits**: Free, version controlled, easy rollbacks

---

### Option 5: Firebase Hosting (Google)

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **Initialize Firebase**:
   ```bash
   firebase init hosting
   ```
   - Select your project or create new
   - Public directory: `dist`
   - Single-page app: `No`
   - Auto-deploys: `No`

3. **Deploy**:
   ```bash
   npm run build
   firebase deploy
   ```

**Benefits**: Google infrastructure, great performance, free tier available

---

## 🔒 SSL/HTTPS Setup

**Critical for trust and security!**

### Automatic (Netlify/Vercel)
- SSL is automatic and free
- Just deploy and it's done ✅

### cPanel Hosting
1. Go to cPanel → SSL/TLS
2. Install Let's Encrypt certificate (free)
3. Force HTTPS redirect via `.htaccess`:
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

### Custom Server
1. Get certificate from Let's Encrypt:
   ```bash
   certbot --nginx -d yourdomain.com
   ```
2. Configure Nginx/Apache to use certificate
3. Set up auto-renewal

---

## 🌍 Custom Domain Setup

### Buy a Domain
Recommended registrars for Palestine/Middle East:
- Namecheap
- GoDaddy
- Google Domains
- Cloudflare Registrar

### Connect to Netlify
1. Add domain in Netlify dashboard
2. Update DNS records at your registrar:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5

   Type: CNAME
   Name: www
   Value: your-site.netlify.app
   ```

### Connect to Vercel
1. Add domain in Vercel dashboard
2. Update DNS records:
   ```
   Type: A
   Name: @
   Value: 76.76.21.21

   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

---

## 📊 Post-Deployment Checklist

After deploying, verify:

- [ ] Website loads correctly on HTTPS
- [ ] Logo displays properly
- [ ] All WhatsApp links work (test with your phone!)
- [ ] Telegram links work
- [ ] Email link opens mail client
- [ ] Mobile responsive (test on real device)
- [ ] All sections scroll smoothly
- [ ] Floating WhatsApp button works
- [ ] Forms/buttons are clickable
- [ ] Page loads fast (under 3 seconds)

---

## 🔧 Updating the Website

### Quick Updates (Content Only)

1. Edit `src/App.tsx` with changes
2. Build: `npm run build`
3. Upload new `dist/index.html` to server
   - Or run deploy command for Netlify/Vercel

### Logo Update
1. Replace `public/logo.png`
2. Build: `npm run build`
3. Upload both files to server

### Full Redeployment
```bash
npm run build
# Then use your chosen deployment method
```

---

## 🌐 Performance Optimization

### Enable Compression (cPanel)
Add to `.htaccess`:
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript
</IfModule>
```

### Enable Caching
Add to `.htaccess`:
```apache
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType text/html "access plus 0 seconds"
</IfModule>
```

### Use CDN (Optional)
- Cloudflare (free tier available)
- Improves global loading speed
- Additional security features

---

## 🔍 SEO Setup (Post-Deployment)

### Google Search Console
1. Sign up at [search.google.com/search-console](https://search.google.com/search-console)
2. Add your website
3. Verify ownership
4. Submit sitemap (if created)

### Google Analytics
1. Create account at [analytics.google.com](https://analytics.google.com)
2. Get tracking code
3. Add to `index.html` before `</head>`:
   ```html
   <!-- Google Analytics -->
   <script async src="https://www.googletagmanager.com/gtag/js?id=YOUR-ID"></script>
   <script>
     window.dataLayer = window.dataLayer || [];
     function gtag(){dataLayer.push(arguments);}
     gtag('js', new Date());
     gtag('config', 'YOUR-ID');
   </script>
   ```

### Meta Description
Add to `index.html` `<head>`:
```html
<meta name="description" content="شركة إنفينتي لتنسيقات السفر - مختصون بتنسيق العبور والخروج الآمن من قطاع غزة عبر المعابر المعتمدة بكل موثوقية وسرعة">
<meta name="keywords" content="تنسيق سفر, غزة, معبر رفح, خروج آمن, تنسيق معابر">
```

---

## 📱 WhatsApp Business Integration

### WhatsApp Business Account
1. Download WhatsApp Business app
2. Register your business number
3. Set up business profile:
   - Business name: شركة إنفينتي لتنسيقات السفر
   - Category: Travel Agency
   - Description: Link to your website
   - Business hours
   - Address (if applicable)

### Quick Replies
Set up in WhatsApp Business:
- Greeting message
- Away message  
- Quick replies for common questions

### WhatsApp Link Testing
Always test before going live:
```
https://wa.me/970XXXXXXXXX?text=TestMessage
```

---

## 🚨 Troubleshooting

### Website not loading
- Clear browser cache
- Check DNS propagation (can take 24-48 hours)
- Verify hosting is active

### WhatsApp links not working
- Verify phone number format (no spaces, no + in URL)
- Test on mobile device
- Check country code is correct

### Images not showing
- Verify files uploaded correctly
- Check file paths are correct
- Ensure proper file permissions (644 for files)

### Mobile layout issues
- Test on real device, not just browser resize
- Check viewport meta tag exists
- Verify Tailwind CSS loaded correctly

---

## 💰 Cost Estimates

| Hosting Type | Monthly Cost | Best For |
|-------------|--------------|----------|
| Netlify/Vercel Free | $0 | Getting started |
| GitHub Pages | $0 | Simple sites |
| Shared Hosting | $3-10 | Traditional setup |
| VPS | $5-20 | Full control |
| Domain Name | $10-15/year | Professional presence |
| SSL Certificate | $0 (Let's Encrypt) | Security |

**Recommended Budget**: $15-30/year for domain + free hosting

---

## 📞 Support Resources

### Platform Documentation
- [Netlify Docs](https://docs.netlify.com)
- [Vercel Docs](https://vercel.com/docs)
- [GitHub Pages](https://pages.github.com)

### Community Help
- [Stack Overflow](https://stackoverflow.com)
- [React Community](https://react.dev/community)
- [Tailwind Discord](https://tailwindcss.com/discord)

---

## ✅ Quick Deploy Checklist

- [ ] Run `npm run build` successfully
- [ ] Test `dist/index.html` locally (open in browser)
- [ ] All contact info updated (phone, email, etc.)
- [ ] Logo replaced with actual company logo
- [ ] Choose hosting platform
- [ ] Deploy files
- [ ] Set up HTTPS/SSL
- [ ] Connect custom domain (optional)
- [ ] Test website on mobile
- [ ] Test all WhatsApp/Telegram links
- [ ] Set up analytics (optional)
- [ ] Register with Google Search Console
- [ ] Share website link with test users

---

**Ready to Deploy!** Choose your preferred hosting platform and follow the steps above. Most deployments take less than 10 minutes.

**Recommended**: Start with Netlify drag-and-drop for the easiest deployment experience.

Good luck! 🎉
