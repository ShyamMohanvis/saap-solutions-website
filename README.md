# SAAP SOLUTIONS — Digital Agency

A modern, high-performance, and beautifully designed digital agency website built with **React**, **Vite**, and **Tailwind CSS**. It features a dynamic dark/light mode toggle, stunning 3D aesthetics, fluid animations, and a responsive layout.

![SAAP Solutions Hero](client/public/assets/img/hero_dark_v2.png)

## 🚀 Live Demo

The website is automatically deployed via GitHub Actions and hosted on GitHub Pages:
**[View Live Website](https://ShyamMohanvis.github.io/saap-solutions-website/)**

## ✨ Features

- **Modern Tech Stack**: Built entirely with React and Vite for lightning-fast HMR and optimized production builds.
- **Dynamic Theming**: Seamless Light and Dark mode toggling with custom UI logic.
- **Beautiful Animations**: Powered by `framer-motion` for smooth scroll reveals and layout transitions.
- **Interactive Carousels**: Integrated `swiper` for touch-friendly portfolio and testimonial sliders.
- **Premium Aesthetics**: Custom glassmorphism, dynamic gradients, glowing neon effects, and 3D geometric illustrations.
- **Fully Responsive**: Flawless experience across mobile, tablet, and desktop devices.
- **CI/CD Integrated**: Fully automated GitHub Actions workflow to deploy static builds to GitHub Pages on every push.

## 📂 Project Structure

```text
├── client/
│   ├── public/assets/img/ # Static images, logos, and graphics
│   ├── src/
│   │   ├── App.jsx        # Main application component and routing logic
│   │   ├── index.css      # Tailwind CSS entry and custom utilities
│   │   └── main.jsx       # React DOM rendering
│   ├── package.json       # Frontend dependencies and scripts
│   └── vite.config.js     # Vite configuration and proxy setup
├── server/                # (Optional) Node.js/Express backend for handling contact forms
└── .github/workflows/     # GitHub Actions CI/CD deployment pipeline
```

## 🛠️ Local Development

To run this project locally on your machine:

### 1. Clone the repository
```bash
git clone https://github.com/ShyamMohanvis/saap-solutions-website.git
cd saap-solutions-website
```

### 2. Install Frontend Dependencies
```bash
cd client
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```
The site will now be running locally at `http://localhost:5173`.

## 📦 Deployment

This repository uses a **GitHub Actions** workflow (`.github/workflows/deploy.yml`) to automatically compile and deploy the Vite frontend. 

1. Push your changes to the `master` branch.
2. The Action will trigger, run `npm run build`, and deploy the static files directly to GitHub Pages.

> **Note on Backend**: Because the site is currently hosted on GitHub Pages (a static host), backend routes like the Contact Form will require a separate Node.js deployment (e.g. Render, Railway, or Heroku) to function.

## 📄 License

Copyright © 2026 SAAP SOLUTIONS. All rights reserved.
