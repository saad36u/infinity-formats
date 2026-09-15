# شركة إنفينتي لتنسيقات السفر - Infinity Travel Arrangements

A modern, professional, fully responsive Arabic RTL website for a travel coordination company serving people in Gaza who need secure, fast, and reliable coordination for crossing and exiting the Gaza Strip.

## Features

✨ **Modern Dark Theme Design**
- Premium dark mode aesthetic with deep navy background (#0b1120)
- Sophisticated burgundy/maroon accents matching the company logo
- Soft gold highlights for premium feel
- Glassmorphism effects throughout

🌍 **Full RTL Arabic Support**
- Right-to-Left layout optimized for Arabic readers
- Beautiful Arabic typography using Cairo and Tajawal fonts
- Professional bilingual branding

📱 **Fully Responsive**
- Mobile-first design
- Optimized for all screen sizes
- Touch-friendly navigation

🎨 **Key Sections**
1. **Sticky Navigation Bar** - Glassmorphic header with logo and quick access links
2. **Hero Section** - Compelling headline with clear call-to-action buttons
3. **Statistics Section** - Impressive metrics showcasing company credibility
4. **Services & Process** - Clear 4-step process visualization
5. **Requirements Section** - Transparent information about needed documents
6. **Testimonials** - Client success stories and reviews
7. **Contact Section** - Direct WhatsApp and Telegram integration
8. **Professional Footer** - Company info, quick links, and legal disclaimer

🔗 **Direct Communication Channels**
- Pre-configured WhatsApp links with greeting messages
- Telegram channel integration
- Floating WhatsApp button for instant access
- All contact information clearly displayed

🎯 **Technical Stack**
- React 19 with TypeScript
- Vite for ultra-fast builds
- Tailwind CSS for styling
- Lucide React for icons
- Smooth animations and transitions
- Optimized for performance

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
```bash
git clone [repository-url]
cd infinity-travel
```

2. Install dependencies
```bash
npm install
```

3. Run development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

5. Preview production build
```bash
npm run preview
```

## Customization

### Update Contact Information

Replace the placeholder contact details in `src/App.tsx`:

- **WhatsApp Number**: Search for `970599999999` and replace with actual number
- **Telegram Handle**: Search for `infinitytravel` and replace with actual handle
- **Email**: Search for `info@infinitytravel.ps` and update
- **Phone**: Update phone number in contact section

### Replace Logo

Replace the AI-generated logo at `public/logo.png` with your official company logo. The logo should be:
- Circular or square format
- High resolution (minimum 200x200px)
- PNG format with transparent background preferred
- Burgundy/maroon color scheme to match brand

### Modify Content

All content is in `src/App.tsx` and can be easily updated:
- Testimonials
- Statistics numbers
- Service descriptions
- Company information
- Legal disclaimers

### Color Customization

Main colors are defined throughout the codebase:
- **Background**: `#0b1120` (dark navy)
- **Primary Burgundy**: `#8B1538` and `#6B0F1A`
- **Gold Accent**: `#D4AF37`

Search and replace these hex codes to update the color scheme.

## File Structure

```
├── public/
│   └── logo.png          # Company logo
├── src/
│   ├── App.tsx          # Main application component
│   ├── index.css        # Global styles and utilities
│   ├── main.tsx         # Application entry point
│   └── utils/
│       └── cn.ts        # Utility functions
├── index.html           # HTML template with RTL support
└── package.json         # Dependencies
```

## Features Breakdown

### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- High contrast ratios for readability

### Performance
- Single-file build output
- Optimized bundle size
- Lazy loading where applicable
- Fast initial load times

### SEO
- Proper meta tags
- Semantic heading structure
- Descriptive alt texts
- Arabic language declaration

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Privacy & Security Notes

The website emphasizes:
- Data privacy and encryption
- Secure document handling
- Client confidentiality
- Legal compliance

All communication channels use official platforms (WhatsApp, Telegram) with end-to-end encryption.

## License

© 2024 شركة إنفينتي لتنسيقات السفر. All rights reserved.

## Support

For technical support or customization requests, please contact the development team.

---

**Built with ❤️ to serve our people in Gaza**
