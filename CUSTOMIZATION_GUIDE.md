# 📝 Quick Customization Guide - شركة إنفينتي

This guide helps you quickly customize the website with your actual business information.

## 🔄 Essential Updates Before Launch

### 1️⃣ Replace Contact Information

Open `src/App.tsx` and search/replace these placeholders:

#### WhatsApp Number
**Find**: `970599999999`
**Replace with**: Your actual WhatsApp number (with country code, no + symbol)

Example:
```tsx
// Before:
href="https://wa.me/970599999999?text=..."

// After:
href="https://wa.me/970591234567?text=..."
```

#### Telegram Handle
**Find**: `infinitytravel`
**Replace with**: Your actual Telegram username or channel

Example:
```tsx
// Before:
href="https://t.me/infinitytravel"

// After:
href="https://t.me/yourcompanyname"
```

#### Phone Number Display
**Find**: `+970 59 999 9999`
**Replace with**: Your display phone number

**Find**: `info@infinitytravel.ps`
**Replace with**: Your actual email address

### 2️⃣ Update Company Logo

1. Prepare your logo:
   - **Format**: PNG with transparent background (recommended)
   - **Size**: Minimum 200x200px, ideally 400x400px
   - **Shape**: Circular or square
   - **Colors**: Burgundy/maroon to match the theme

2. Replace the file:
   - Save your logo as `public/logo.png`
   - The existing AI-generated logo will be replaced

3. If using a different filename:
   ```tsx
   // Find this in src/App.tsx (appears 3 times):
   <img src="/logo.png" alt="Infinity Travel Logo" />
   
   // Change to:
   <img src="/your-logo-name.png" alt="Infinity Travel Logo" />
   ```

### 3️⃣ Update Statistics (أثر يمكن قياسه)

In `src/App.tsx`, find the Statistics Section and update these numbers:

```tsx
// Current values - update to your real data:
<div className="text-5xl font-black text-[#D4AF37] mb-2">+1,500</div>
<p className="text-gray-400">حالات تم تنسيقها بنجاح</p>

// Change to your actual number of cases:
<div className="text-5xl font-black text-[#D4AF37] mb-2">+2,300</div>
```

**Four stat cards to update**:
1. Number of successful cases (حالات تم تنسيقها بنجاح)
2. Transparency percentage (شفافية ومتابعة مستمرة)
3. Speed indicator (سرعة في الإنجاز)
4. Support availability (دعم الحالات الإنسانية)

### 4️⃣ Update Client Testimonials

Find the Testimonials Section in `src/App.tsx`:

```tsx
// Current testimonial example:
<p className="text-gray-300 mb-6 leading-relaxed">
  "خدمة ممتازة واحترافية عالية. تم إنجاز معاملتي بسرعة وأمان..."
</p>
<h4 className="font-bold">محمد أحمد</h4>
<p className="text-sm text-gray-400">غزة - مصر</p>
```

**Replace with real client testimonials**:
- Use actual client feedback (with permission)
- Keep client anonymity (initials only) for privacy
- Update routes (غزة - مصر, غزة - الأردن, etc.)

**Template for new testimonial**:
```tsx
<div className="glass-strong p-8 rounded-2xl hover:scale-105 transition-all duration-300">
  <div className="flex gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
    ))}
  </div>
  <p className="text-gray-300 mb-6 leading-relaxed">
    "Your client's testimonial text here..."
  </p>
  <div className="flex items-center gap-3">
    <div className="w-12 h-12 bg-gradient-to-br from-[#8B1538] to-[#6B0F1A] rounded-full flex items-center justify-center font-bold text-lg">
      ع.س
    </div>
    <div>
      <h4 className="font-bold">عميل سعيد</h4>
      <p className="text-sm text-gray-400">غزة - تركيا</p>
    </div>
  </div>
</div>
```

### 5️⃣ Update WhatsApp Pre-filled Messages

Customize the automatic greeting messages for WhatsApp links:

**Find these in `src/App.tsx`**:
```tsx
// Hero section:
?text=مرحباً، أرغب في حجز تنسيق سفري الآن

// Contact section:
?text=مرحباً شركة إنفينتي، أرغب في الاستفسار عن خدمات تنسيق السفر والعبور من غزة

// Floating button:
?text=مرحباً، أحتاج مساعدة

// Final CTA:
?text=مرحباً، أود البدء بإجراءات السفر
```

**Customize these messages** to match your preferred client greeting style.

### 6️⃣ Update Company Description

**Footer company info** - Find in footer section:
```tsx
<p className="text-gray-400 text-sm leading-relaxed">
  شريكك الموثوق في تنسيق السفر والعبور من قطاع غزة بكل أمان واحترافية
</p>
```

**Hero subheading** - Find in hero section:
```tsx
<p className="text-lg md:text-xl text-gray-300 mb-12 leading-relaxed max-w-3xl mx-auto">
  مختصون بتنسيقات العبور والخروج من قطاع غزة...
</p>
```

Update these to reflect your company's unique value proposition.

---

## 🎨 Optional Customization

### Change Color Scheme

If you want to adjust colors to match your brand better:

#### Primary Burgundy Color
**Find**: `#8B1538` and `#6B0F1A`
**Replace with**: Your preferred burgundy shade

**Locations**:
- Gradient backgrounds
- Button colors
- Icon backgrounds
- Glow effects

#### Gold Accent Color
**Find**: `#D4AF37`
**Replace with**: Your preferred accent color

#### Background Color
**Find**: `#0b1120`
**Replace with**: Your preferred dark background

> **Tip**: Search for the hex code in `src/App.tsx` and `src/index.css` to replace all instances.

### Update Service Steps

Find the "Services Section" and customize the 4-step process:

```tsx
// Step 1
<h3 className="text-xl font-bold mb-3">مراجعة الطلب</h3>
<p className="text-gray-400 text-sm leading-relaxed">
  نستقبل طلبك ونراجع جميع المستندات...
</p>
```

Update the titles and descriptions to match your exact process.

### Modify Required Documents

In the Requirements Section, update the checklist:

```tsx
<li className="flex items-start gap-3">
  <CheckCircle className="w-5 h-5 text-[#D4AF37] mt-1 flex-shrink-0" />
  <span className="text-gray-300">صورة واضحة من جواز السفر (ساري المفعول)</span>
</li>
```

Add, remove, or modify items based on your actual requirements.

---

## 🔐 Legal & Compliance Updates

### Privacy Policy & Disclaimer

**Important**: Have a lawyer review these sections before launch.

**Legal Disclaimer** (in footer):
```tsx
<p className="text-sm text-gray-400 leading-relaxed">
  شركة إنفينتي لتنسيقات السفر تعمل كوسيط لتسهيل إجراءات السفر...
</p>
```

**Privacy Policy** (in requirements section):
```tsx
<h4 className="text-xl font-bold mb-2">سياسة الخصوصية والأمان</h4>
<p className="text-gray-300 leading-relaxed">
  نحن في شركة إنفينتي نلتزم بأعلى معايير حماية البيانات...
</p>
```

Update these to reflect your actual policies and legal compliance.

---

## 🚀 After Customization

### 1. Test All Links
- Click every WhatsApp button → Verify phone number
- Click Telegram links → Verify channel/username
- Test email link → Verify email opens correctly
- Check all navigation → Verify smooth scrolling

### 2. Mobile Testing
- Open on mobile device
- Test all buttons (touch-friendly?)
- Verify text readability
- Check floating WhatsApp button

### 3. Cross-Browser Testing
- Chrome
- Safari
- Firefox
- Edge

### 4. Rebuild Project
```bash
npm run build
```

### 5. Deploy
Upload the contents of the `dist` folder to your web hosting.

---

## 📞 Quick Reference - Files to Edit

| What to Update | File | Section |
|---------------|------|---------|
| Contact numbers | `src/App.tsx` | Search for `970599999999` |
| Telegram handle | `src/App.tsx` | Search for `infinitytravel` |
| Company logo | `public/logo.png` | Replace file |
| Statistics | `src/App.tsx` | Statistics Section |
| Testimonials | `src/App.tsx` | Testimonials Section |
| Services description | `src/App.tsx` | Services Section |
| Legal disclaimer | `src/App.tsx` | Footer Section |
| Page title | `index.html` | `<title>` tag |

---

## ✅ Pre-Launch Checklist

- [ ] WhatsApp number updated (test it!)
- [ ] Telegram handle updated (test it!)
- [ ] Email address updated
- [ ] Phone number updated
- [ ] Company logo replaced
- [ ] Statistics numbers are accurate
- [ ] Real client testimonials added
- [ ] Legal disclaimer reviewed by lawyer
- [ ] Privacy policy reviewed
- [ ] All CTAs tested on mobile
- [ ] Build successful (`npm run build`)
- [ ] Tested on mobile device
- [ ] Tested on desktop browsers
- [ ] SSL certificate installed (HTTPS)
- [ ] Domain connected properly

---

**Need Help?** All content is in Arabic RTL, designed for your Gaza-based audience. Keep the professional tone and trustworthy design intact while customizing with your actual business data.

**Good luck with your launch! 🚀**
