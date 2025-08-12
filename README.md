# SHAOLINKTATTOO Website

A professional, responsive website for SHAOLINKTATTOO - a premier tattoo studio located in London. This modern web application showcases the studio's artistry, services, and provides an intuitive booking experience for clients.

## 🎨 Project Overview

SHAOLINKTATTOO website is a fully responsive, feature-rich web application designed to represent a professional tattoo studio. The site combines modern web technologies with engaging visual elements to create an immersive user experience that reflects the artistic nature of the business.

## ✨ Key Features

### 🎬 Video Background
- **Custom video background** on the landing page with smooth playback
- **Smart scroll behavior** - automatically pauses video when scrolling, resumes when returning to top
- **Custom video controls** with play/pause and mute/unmute functionality
- **Mobile-optimized** video controls with responsive design
- **Performance optimized** with preload metadata and visibility change handling

### 🧭 Navigation & UX
- **Fixed navigation bar** that stays at the top while scrolling on all pages
- **Logo click-to-top** functionality - smooth scroll to page top when clicking the logo
- **Responsive mobile menu** with hamburger toggle
- **Smooth scrolling** animations throughout the site
- **Cross-page consistency** in navigation behavior

### 🌓 Theme System
- **Dark/Light mode toggle** with persistent user preference
- **Automatic theme detection** based on system preferences
- **Smooth theme transitions** with CSS animations
- **Consistent theming** across all pages

### 📱 Responsive Design
- **Mobile-first approach** ensuring optimal experience on all devices
- **Flexible grid layouts** that adapt to different screen sizes
- **Touch-optimized** controls and interactions for mobile users
- **Cross-browser compatibility** with modern web standards

### 🖼️ Content Sections
- **Gallery showcase** with high-quality tattoo artwork
- **About page** featuring CEO/Artist profile with professional photography
- **Interactive FAQ section** with expandable questions and answers
- **Contact forms** with validation and user-friendly interfaces
- **Booking system** for appointment scheduling
- **Professional footer** with contact information and quick links

## 🛠️ Tech Stack

- **HTML5** - Semantic markup and modern web standards
- **CSS3** - Advanced styling with Flexbox, Grid, and animations
- **Vanilla JavaScript** - Interactive functionality and DOM manipulation
- **Responsive Design** - Mobile-first approach with media queries
- **Modern Web APIs** - Video API, Intersection Observer, Local Storage

## 📁 Project Structure

```
tattooshop/
├── index.html              # Landing page with video background
├── about.html              # About us and artist profiles
├── gallery.html            # Tattoo artwork showcase
├── booking.html            # Appointment booking form
├── contact.html            # Contact information and form
├── thank-you.html          # Confirmation page
├── css/
│   ├── styles.css          # Main stylesheet
│   └── faq.css            # FAQ-specific styles
├── js/
│   ├── script.js           # Main JavaScript functionality
│   ├── video-controls.js   # Video background controls
│   └── faq.js             # FAQ interactive functionality
├── images/
│   ├── background.mp4      # Hero section video background
│   ├── franky.jpg         # CEO/Artist profile photo
│   ├── logo1.png          # Light theme logo
│   ├── logo2.png          # Dark theme logo
│   └── [gallery-images]   # Tattoo artwork images
└── README.md              # Project documentation
```

## 🚀 Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional but recommended)

### Local Development

1. **Clone or download** the project files
2. **Navigate** to the project directory
3. **Start a local server** (recommended):

   **Using Python:**
   ```bash
   python -m http.server 8000
   ```

   **Using Node.js:**
   ```bash
   npx serve .
   ```

   **Using PHP:**
   ```bash
   php -S localhost:8000
   ```

4. **Open your browser** and navigate to `http://localhost:8000`

### Direct File Access
Alternatively, you can open `index.html` directly in your browser, though some features may be limited due to CORS restrictions.

## 🌐 Deployment

### Vercel Deployment
The project is configured for Vercel deployment with `vercel.json` configuration file.

**Note:** Due to the large image files in the gallery, the project may exceed Vercel's 10MB limit. Consider:
- **Image optimization** - Compress images using tools like TinyPNG
- **External hosting** - Use services like Cloudinary or AWS S3 for large media files
- **Progressive loading** - Implement lazy loading for gallery images

### Other Hosting Platforms
The project is compatible with:
- **Netlify** - Drag and drop deployment
- **GitHub Pages** - Static site hosting
- **Traditional web hosting** - Upload via FTP/SFTP

## 🎯 Feature Details

### Video Background System
- **Autoplay with mute** - Complies with browser autoplay policies
- **Loop functionality** - Seamless video repetition
- **Scroll-based control** - Intelligent pause/resume based on user scroll position
- **Mobile optimization** - Responsive controls and performance considerations
- **Fallback support** - Graceful degradation for unsupported browsers

### Navigation Enhancement
- **Fixed positioning** - Navigation remains accessible while scrolling
- **Logo interaction** - Click logo to return to page top with smooth animation
- **Mobile menu** - Collapsible navigation for smaller screens
- **Active state indication** - Visual feedback for current page

### Interactive Elements
- **FAQ accordion** - Expandable question/answer sections
- **Form validation** - Client-side validation for user inputs
- **Theme persistence** - Remembers user's dark/light mode preference
- **Smooth animations** - CSS transitions for enhanced user experience

## 🌍 Browser Compatibility

- **Chrome** 60+ ✅
- **Firefox** 55+ ✅
- **Safari** 12+ ✅
- **Edge** 79+ ✅
- **Mobile browsers** - iOS Safari, Chrome Mobile ✅

## 📞 Studio Information

**SHAOLINKTATTOO**
- **Address:** 66 Fulham High Street, London, SW6 3LQ
- **Phone:** +44 7748 010987
- **Email:** Shoalinktattoo@gmail.com
- **CEO & Artist:** Francesco Gaggini

## 📄 License

This project is created for SHAOLINKTATTOO studio. All rights reserved.

## 🤝 Contributing

For bug reports, feature requests, or contributions, please contact the development team or studio management.

## 📝 Development Notes

- **Performance optimized** - Efficient loading and rendering
- **SEO friendly** - Semantic HTML and proper meta tags
- **Accessibility considered** - ARIA labels and keyboard navigation support
- **Modern standards** - ES6+ JavaScript and CSS3 features
- **Cross-platform tested** - Verified on multiple devices and browsers

---

*Built with passion for exceptional tattoo artistry and modern web development.*
