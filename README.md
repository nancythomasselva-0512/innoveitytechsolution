# 🚀 Innoveity Tech Solution — Corporate Website & CMS Platform

**Innoveity Tech Solution** is a high-performance, modern corporate web application and content management system (CMS) engineered for enterprise software development, digital transformation, AI cloud engineering, and technology leadership.

---

## ✨ Features

- ⚡ **Modern & Responsive UI**: Dynamic glassmorphism aesthetic, subtle micro-animations powered by Framer Motion, and responsive mobile-first layouts.
- 🗄️ **Centralized Supabase Cloud PostgreSQL Database**: Dynamic cloud database storing projects, showcase portfolio, team roster, page copy, contact details, and admin users.
- 🔄 **Realtime Live Synchronization**: Dual-sync engine combining Supabase Realtime WebSockets and 3-second live polling backup so Admin changes update on all connected devices instantly without page refresh.
- 🛡️ **Multi-Tier Admin & Super Admin Dashboard**: Complete CMS panel for content management, team roster ordering, portfolio creation, SEO meta configuration, and database snapshots.
- 🎯 **Automated Dynamic SEO Suite**: Real-time reactive meta titles, meta descriptions, OpenGraph tags, and canonical links per page (`SEOHead`).
- 📧 **EmailJS Contact Integration**: Direct inquiries and consultation requests dispatched straight to inbox.

---

## 🛠️ Technology Stack

- **Frontend**: React 19, Vite, React Router v7, Framer Motion, React Icons / Lucide React
- **Database & Cloud**: Supabase Cloud PostgreSQL, Supabase Realtime WebSockets
- **Styling**: Modern Vanilla CSS, Glassmorphism, CSS Custom Properties
- **Deployment**: Vercel / Netlify (SPA Rewrites pre-configured)

---

## 🚀 Quick Start & Installation

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/innoveity-tech.git
cd innoveity-tech
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (refer to `.env.example`):
```env
# SMTP & EmailJS Configuration
VITE_SMTP_EMAIL=your-email@gmail.com
VITE_SMTP_PASS=your-app-password
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key

# Centralized MySQL API & Server Configuration
VITE_MYSQL_API_URL=http://localhost:5000/api/cms

# MySQL Database Credentials
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_PASSWORD=
MYSQL_DATABASE=innoveity_db
MYSQL_PORT=3306
```

### 3. Setup MySQL Database Schema & Seed Data
Execute the automatic setup script to create database tables and seed initial CMS data:
```bash
npm run db:seed
```
*(Alternatively, execute [`mysql_schema.sql`](./mysql_schema.sql) in phpMyAdmin / MySQL CLI).*

### 4. Run Backend Express Server
```bash
npm run server
```

### 5. Run Frontend Development Server
In a separate terminal window:
```bash
npm run dev
```

### 6. Build for Production
```bash
npm run build
```

---

## 📝 License & Ownership

© 2026 **Innoveity Tech Solution Private Limited**. All Rights Reserved.
