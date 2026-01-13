# RSGRT Institute Portal

RSGRT Institute is a modern, full-stack educational web portal built with Next.js 15. It is designed to showcase professional training courses in Geographic Information Systems (GIS), Remote Sensing, and Data Science.

## 🚀 Key Features

* **Dynamic Course Catalog**: Displays a wide array of specialized courses including ArcGIS, Google Earth Engine (GEE), Python for Data Science, and R-Programming.
* **Interactive UI**:
   * Hero Section: High-impact introduction to the institute's mission.
   * Image Slider: Interactive visual showcase of campus and activities using Keen Slider.
   * Animations: Smooth transitions and entry animations powered by Framer Motion.
* **Backend Integration**: Uses Supabase for real-time data management, authentication helpers, and content delivery.
* **Responsive Design**: Fully responsive layout optimized for all devices using Tailwind CSS 4.
* **Dedicated Course Pages**: Individual specialized pages for deep-dives into ArcGIS, QGIS, SPSS, and Web Development.

## 🛠️ Tech Stack

* **Framework**: Next.js 15 (App Router)
* **Backend**: Supabase (Database & Auth)
* **UI/UX**: Tailwind CSS 4, Framer Motion (Animations), and Keen Slider
* **Icons**: Lucide React and React Icons
* **Language**: TypeScript

## 📁 Project Structure
```
├── src/
│   ├── app/
│   │   ├── courses/        # Individual course pages (ArcGIS, GEE, etc.)
│   │   ├── news/           # News and updates section
│   │   ├── contact/        # Contact and inquiry page
│   │   └── page.tsx        # Home page (Hero, About, Courses)
│   ├── components/
│   │   ├── Navbar.tsx      # Main navigation
│   │   ├── CourseList.tsx  # Dynamic course grid
│   │   ├── ImageSlider.tsx # Interactive gallery
│   │   └── Hero.tsx        # Welcome section
│   └── lib/
│       ├── supabaseClient.ts # Supabase initialization
│       └── supabaseProvider.tsx # Auth & data context
└── public/                 # Optimized JPEG/PNG assets for courses
```

## ⚙️ Setup & Installation

1. **Install Dependencies**:
```bash
npm install
```

2. **Run Development Server**:
```bash
npm run dev
```

3. **Build for Production**:
```bash
npm run build
```
