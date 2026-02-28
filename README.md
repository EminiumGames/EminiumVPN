# VPN-GUI (Neutralino + React + Vite Template)

This repository is a starter template for building a Neutralino.js desktop app using React, TypeScript, and Vite.

## Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```
2. **Run during development**
   - Start the Vite dev server:
     ```bash
     pnpm run dev
     ```
   - In another terminal, start Neutralino to open the window:
     ```bash
     pnpm run neutralino:start
     ```
   The window will load the URL from `http://localhost:3000` by default during dev.

3. **Build the app**
   ```bash
   pnpm run build
   pnpm run neutralino:build
   ```

4. **Configuration**
   Edit `neutralino.config.json` to adjust window size, application ID, and other options. The `url` field can point to a local file (`./index.html`) for production.

## Project Structure

```
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── neutralino.config.json
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   └── index.css
└── README.md
```

## Notes

- This template uses Vite's React plugin with TypeScript support.
- The Neutralino server is enabled (`enableServer: true`) so that you can call backend APIs if needed.

Enjoy building your Neutralino desktop app!