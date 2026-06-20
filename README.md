# 🌐 Multi-Page Glassmorphic Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-16.2.9-black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

A modern, responsive, and premium full-stack portfolio built with Next.js (App Router) and Tailwind CSS, featuring a sleek dark-themed glassmorphic design system.

**Creator**: **Saif Khan** (AI-Driven Full-Stack Developer & Product Builder)

---

## 🚀 The Architecture & Workflow

This project was engineered utilizing state-of-the-art **Agentic AI workflows** (leveraging agent frameworks such as `agy` and `ccd`). 

This architecture showcases a modern **"AI Engineer / Product Builder" methodology**:
* **Rapid Prototyping**: Instant feature iteration and layout design cycles.
* **Clean Modular Directory Structure**: Clear encapsulation of routes, UI components, and styles.
* **High Shipping Velocity**: Zero boilerplate friction, keeping production-grade quality from the first commit.
* **Rigorous Verification**: Fully checked against ESLint standards and verified with complete Next.js static builds.

---

## 🗺️ Application Structure (MPA)

The portfolio is structured as a fast, statically optimized Multi-Page Application (MPA) using the Next.js App Router:

* **`/` (Home)**: A premium introduction, dynamic AI-builder narrative, and interactive landing dashboard highlighting development philosophy.
* **`/resume`**: A dedicated professional profile mapping out traditional industry experience (B2B, Salesforce, customer success, process compliance) and IGNOU academic credentials. Features a direct download hook for the verified resume PDF.
* **`/projects`**: A showcase hub displaying live, monetized full-stack deployments such as [casfrosting.com](https://casfrosting.com) (CSS presets marketplace) and [openstudydeck.com](https://openstudydeck.com) (community-funded deck tool).
* **`/contact`**: A styled contact hub integrated with simulated API submission forms, location mappings, and links to professional communication profiles (GitHub, LinkedIn).

---

## 🛠️ Tech Stack & Design System

* **Framework**: [Next.js](https://nextjs.org/) (App Router, Turbopack, React 19)
* **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
  * *Glassmorphic design system*: Translucent background overlays (`backdrop-filter`), thin high-contrast borders, and floating ambient glow orbs (`BackgroundOrbs`).
* **Icons & Animation**: [Lucide React](https://lucide.dev/) / Custom Tailwind keyframes for ambient float translations.
* **Repository Sync**: GitHub CLI (`gh`) for seamless repo deployment.

---

## 💻 Local Development

Follow these steps to run the portfolio on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/iamsaifkhan25/Portfolio.git
cd Portfolio
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables
Create a `.env.local` file in the root directory for any custom secrets or credentials:
```env
# Example environment variables
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Run the Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the live application.

### 5. Build for Production
```bash
npm run build
```
This command compiles the TypeScript assets and outputs a statically optimized export ready for global edge deployment.
