# 🌦 Weather App — SSR + CSR with Clean Architecture

A modern weather application built with **Next.js (App Router)**, **TypeScript**, and **Clean Architecture** principles.  
It combines **Server-Side Rendering (SSR)** for city search and **Client-Side Rendering (CSR)** for current location weather.  
Fully responsive, animated with **Framer Motion** with cached weather data.

---

## 🚀 Features

- Current Location Weather — Fetch weather based on user geolocation (CSR)
- City Search Weather — Search by city and render results server-side (SSR)
- Permission Handling — Prompt to re-enable geolocation if denied
- Manual Refresh — Button to re-fetch location weather
- Secure API Key — Hidden using server environment variables
- Centralized API Layer — Axios with interceptors for logging requests/responses
- Offline Mode — Cache last successful data in `localStorage` and display when offline
- Dark/Light Theme — Theme persistence using your existing theme system
- i18n Support — Multi-language via `next-i18next` or your configured i18n setup
- Animations — Page & component animations with Framer Motion
- Responsive UI — Works across all screen sizes

---

## ⚙️ Installation

### 1. Clone the repository
```bash
git clone https://github.com/Abdallah-Abdelkhalek/weather-app.git
cd weather-app
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Environment variables
Create a `.env.local` file in the root:
```env
OPENWEATHER_API_KEY=your_api_key_here
OPENWEATHER_BASE=https://api.openweathermap.org/data/2.5
```
> Never commit this file!  

---

## 🛠 Development

Start the development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
npm start
```

Lint & format:
```bash
npm run lint
npm run format
```

---

## 🔌 API Layer

All API requests go through a centralized Axios client (`src/lib/infra/apiClient.ts`)  
with request & response interceptors for logging:

```ts
api.interceptors.request.use((config) => {
  console.log('[API Request]', config);
  return config;
});
api.interceptors.response.use((response) => {
  console.log('[API Response]', response);
  return response;
});
```

---

## 📦 Caching & Offline Mode

- Last successful data is stored in `localStorage`
- When offline:
  - Shows cached weather
  - Displays a red banner at the bottom of the screen

---

## 📜 License

MIT © 2025 Abdallah-Abdelkhalek
