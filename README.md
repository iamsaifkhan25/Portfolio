# Saif Khan - Full-Stack AI-Driven Portfolio

A modern, responsive, premium full-stack portfolio website structured as a Multi-Page Application (MPA) using **Next.js (App Router)** and **Tailwind CSS**.

The theme is built around a dark slate backdrop accented by translucent **Glassmorphic** components (soft blurs, thin borders, subtle shadows) and floating ambient color glows.

## 🚀 Technologies Used
* **Framework**: [Next.js](https://nextjs.org/) (App Router & Turbopack)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Languages**: TypeScript, CSS, HTML

## 📁 Repository Structure
```text
Portfolio/
├── public/
│   └── Saif Resume.pdf           # Resume download asset placeholder
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Global setup (fonts, Navbar, Footer, BackgroundOrbs)
│   │   ├── globals.css           # Glassmorphic utilities & custom scrollbar
│   │   ├── page.tsx              # Home Page (/)
│   │   ├── resume/
│   │   │   └── page.tsx          # Resume Page (/resume)
│   │   ├── projects/
│   │   │   └── page.tsx          # Projects Page (/projects)
│   │   └── contact/
│   │       └── page.tsx          # Contact Page (/contact)
│   └── components/
│       ├── BackgroundOrbs.tsx    # Glow ambient backgrounds
│       ├── Footer.tsx            # Premium global footer
│       ├── GlassCard.tsx         # Reusable glassmorphic cards
│       └── Navbar.tsx            # Sticky floating navbar with active state
```

## 🛠️ Local Development

To run the Next.js development server locally:

```bash
# Install dependencies (if needed)
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
