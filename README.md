# CryptoLite

A minimalist, beginner-friendly cryptocurrency tracking app built with a focus on clarity, speed, and usability.

---

## Overview

CryptoLite is a frontend-only crypto tracker designed for users who want quick, essential insights into the crypto market without overwhelming data or complex tools.

It provides a clean interface to:

- View top cryptocurrencies
- Search coins globally
- Explore individual coin details
- Save coins to a personal watchlist

---

## Goals

- Keep the UI **simple and intuitive**
- Show only **essential data**
- Ensure **fast performance**
- Build a **responsive experience** across mobile and desktop

---

## Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **State Management:** React Hooks (`useState`, `useEffect`)
- **API:** CoinGecko
- **Storage:** localStorage (for watchlist)

---

## Features

### Homepage

- Displays top cryptocurrencies
- Pagination support
- Clean table layout (mobile & desktop optimized)

### Search

- Global coin search using API
- Debounced input for performance
- Mobile and desktop optimized UI

### Coin Details

- Price and 24h change
- Market cap
- 24h high / low
- Circulating, total, and max supply
- External links (website, socials)

### Watchlist

- Add/remove coins
- Persisted with localStorage
- Dedicated page

---

## Design Principles

- Minimalist UI
- Beginner-friendly data presentation
- Consistent layout across devices
- No unnecessary complexity

---

## API Endpoints

- `/coins/markets` → Market data (homepage)
- `/search` → Global search
- `/coins/{id}` → Coin details

---

## Limitations

- No backend
- No authentication
- No real-time WebSocket updates
- No advanced charts (yet)

---

## Future Improvements

- 24h price chart
- Better data formatting
- Performance optimizations

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open http://localhost:3000 in your browser.

---

## Project Status

In active development (Build-in-public challenge)

---

## License

This project is open-source and available under the MIT License.
