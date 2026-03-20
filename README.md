# Darius Henry - Portfolio Website

A state-of-the-art portfolio website showcasing full-stack development expertise, built with Next.js 14, React 18, TypeScript, Tailwind CSS, and Framer Motion.

## Features

- **Modern Design**: Clean, professional dark theme with animated gradients and smooth transitions
- **Interactive Animations**: Powered by Framer Motion for smooth, engaging user experience
- **Responsive**: Fully responsive design that works perfectly on all devices
- **Performance Optimized**: Built with Next.js for optimal performance and SEO
- **Type-Safe**: Built with TypeScript for reliability and maintainability
- **27+ Projects**: Comprehensive showcase of production applications
- **Skills Visualization**: Interactive skill progress bars and categorization
- **Contact Form**: Professional contact section with multiple communication channels

## Tech Stack

### Frontend
- **Framework**: Next.js 14 with App Router
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

### Project Highlights

This portfolio showcases:
- **6+ SaaS Platforms**: Including Zonely, Speakix, TapeCoach
- **27+ Production Apps**: Across web, mobile, and backend
- **3+ AI Integrations**: OpenAI GPT-4, Vision, Speech Recognition
- **Full-Stack Mastery**: React, Next.js, SwiftUI, Node.js, Firebase
- **Modern Architecture**: Subscription systems, payment integration, real-time sync

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd /Users/stockhousefilms/Documents/dariusHenry/portfolio-site
   ```

2. **Install dependencies:**

   If you encounter npm cache permission issues, use:
   ```bash
   npm install --cache /tmp/npm-cache --legacy-peer-deps
   ```

   Or standard installation:
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
portfolio-site/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles and animations
├── components/
│   ├── Hero.tsx             # Hero section with animations
│   ├── Projects.tsx         # Projects showcase with filtering
│   ├── Skills.tsx           # Skills section with progress bars
│   └── Contact.tsx          # Contact form and info
├── data/
│   └── projects.ts          # Project data and interfaces
├── public/                  # Static assets
├── tailwind.config.ts       # Tailwind configuration
├── tsconfig.json           # TypeScript configuration
├── next.config.mjs         # Next.js configuration
└── package.json            # Dependencies and scripts
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Customization

### Update Personal Information

1. **Contact Information** (components/Contact.tsx):
   - Update email address
   - Update LinkedIn URL
   - Update GitHub URL

2. **Hero Section** (components/Hero.tsx):
   - Update social media links
   - Modify stats and taglines

3. **Projects** (data/projects.ts):
   - Add new projects
   - Update project details
   - Modify technologies and features

4. **Metadata** (app/layout.tsx):
   - Update title and description
   - Add keywords

### Styling

The color scheme uses Tailwind CSS and can be customized in:
- `tailwind.config.ts` - Color palette and animations
- `app/globals.css` - Global styles and custom classes

### Adding New Sections

Create new components in the `components/` directory and import them into `app/page.tsx`.

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository in Vercel
3. Vercel will auto-detect Next.js and deploy

### Other Platforms

Build the production version:
```bash
npm run build
```

Then deploy the `.next` directory to your hosting provider.

## Performance Optimizations

- Server-side rendering with Next.js
- Optimized images and assets
- Lazy loading animations
- Minimal bundle size
- Efficient CSS with Tailwind

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Troubleshooting

### npm permission errors

If you encounter npm cache permission errors:
```bash
npm install --cache /tmp/npm-cache --legacy-peer-deps
```

### Build errors

Clear `.next` directory and rebuild:
```bash
rm -rf .next
npm run build
```

## License

All rights reserved - Darius Henry © 2026

## Contact

For questions or inquiries:
- Email: dariushenry@example.com
- LinkedIn: [linkedin.com/in/dariushenry](https://linkedin.com/in/dariushenry)
- GitHub: [github.com/dariushenry](https://github.com/dariushenry)

---

**Built with passion using Next.js, TypeScript, and modern web technologies.**
