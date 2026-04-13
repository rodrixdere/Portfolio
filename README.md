# Rodrigo Horvilleur — Portfolio

Personal portfolio built with React, TypeScript, Vite, and GSAP.

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build**: Vite
- **Animations**: GSAP (ScrollTrigger, magnetic cursor)
- **Styling**: CSS Modules
- **Email**: EmailJS
- **Fonts**: Barlow Condensed, Space Grotesk, JetBrains Mono

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment variables
```bash
cp .env.example .env.local
```
Fill in your EmailJS credentials in `.env.local`.

### 3. Run development server
```bash
npm run dev
```

### 4. Build for production
```bash
npm run build
```

## Project Structure

```
src/
├── components/     # UI components with their CSS modules
├── hooks/          # Custom React hooks (cursor, scroll stack)
├── i18n.ts         # EN/ES translations
├── useLang.tsx     # Language context
├── App.tsx
└── main.tsx
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_EMAILJS_SERVICE_ID` | EmailJS service ID |
| `VITE_EMAILJS_TEMPLATE_ID` | EmailJS template ID |
| `VITE_EMAILJS_PUBLIC_KEY` | EmailJS public key |