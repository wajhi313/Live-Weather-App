# WeatherBoard

A personal weather dashboard built as part of the Edspire Frontend (React) Developer Technical Challenge, powered by public APIs and developed using an Agentic IDE workflow.

## Links
- **Live URL:** [Insert Your Deployed App Link Here]
- **GitHub Repository:** [Insert Repository Link Here]

---

## Features and Core Requirements Met
- **City Search with Autocomplete:** Integrated GeoDB Cities API for live city suggestions, maintaining response times under 300ms with proper error and empty states.
- **Weather Data Display:** Fetches and displays current conditions and a 5-day forecast using OpenWeatherMap, with an automatic fallback to Open-Meteo in case of rate limits.
- **Client-Side Form Validation:** Implements strict validation on blur/submit with clear inline error messages.
- **Favorite Cities:** Allows users to save up to 5 favorite cities persisted via localStorage, complete with a quick-access panel and confirmation prompts for removal.
- **Progressive Web App (PWA):** Fully installable on mobile and desktop devices with a web manifest, custom icons, and a service worker caching the app shell and last-viewed weather for offline usage.
- **Push Notifications:** Provides daily morning weather reminders via the Web Push and Notifications API through the service worker.
- **Responsive Design:** Fully responsive layout tested across mobile (375px), tablet (768px), and desktop (1280px) with accessible touch targets.

---

## Tech Stack and Architecture Decisions
- **Framework:** React / Vite
- **Styling:** CSS Modules / Tailwind CSS
- **PWA Configuration:** Vite PWA Plugin / Service Worker
- **State Management:** React Hooks and LocalStorage

### Architecture Decisions:
1. **API Fallback Mechanism:** Implemented a resilient fetch strategy that switches to Open-Meteo if the primary OpenWeatherMap API hits rate limits.
2. **Offline-First Capabilities:** Utilized service workers to cache essential app assets and ensure the last-viewed weather data remains accessible offline with an indicator banner.

---

## APIs Used
1. **OpenWeatherMap API:** Used for current conditions and 5-day weather forecasts.
2. **OpenMeteo API:** Used as a fallback weather source.
3. **GeoDB Cities API (via RapidAPI):** Powers the live autocomplete search functionality.
4. **Web Push / Notifications API:** Handles browser-native daily weather reminder notifications.

---

## Setup and Installation Complete.
