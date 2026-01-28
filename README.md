# 🏖️ TrivaBeach

**Find the nearest beaches with warm water (26°C+) and book your stay!**

🌐 **Live Demo:** [https://trivabeach.gazzar.de](https://trivabeach.gazzar.de)

![TrivaBeach Logo](beach-finder/public/trivaBeach.png)

## Overview

TrivaBeach is a single-page web application that helps users find the nearest beaches with warm water temperatures (26°C+) anywhere in the world, along with nearby hotel options powered by the [Trivago MCP Server](https://mcp.trivago.com/docs).

## Features

- 🌡️ **Water Temperature Filter** - Only shows beaches with 26°C+ water
- 🗺️ **Interactive Map** - Leaflet.js with OpenStreetMap tiles
- 🏨 **Hotel Search** - Real hotel prices via Trivago MCP
- 📍 **Geolocation** - One-click location detection
- 🌍 **Global Search** - Searches tropical destinations worldwide

## Tech Stack

### Frontend
- **Framework:** [Astro.js](https://astro.build/) (Static Site Generator)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)
- **Icons:** [Phosphor Icons](https://phosphoricons.com/)
- **Maps:** [Leaflet.js](https://leafletjs.com/)

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **MCP Client:** [@modelcontextprotocol/sdk](https://modelcontextprotocol.io/)
- **Process Manager:** PM2
- **Reverse Proxy:** Caddy (auto HTTPS)

### APIs Used (All Free!)
| API | Purpose |
|-----|---------|
| Browser Geolocation | User's current location |
| [Overpass API](https://overpass-api.de/) | Find beaches from OpenStreetMap |
| [Open-Meteo Marine API](https://open-meteo.com/en/docs/marine-weather-api) | Sea water temperature |
| [Trivago MCP](https://mcp.trivago.com/docs) | Hotel search & pricing |

## Project Structure

```
trivaBeach/
├── beach-finder/           # Frontend (Astro.js)
│   ├── src/
│   │   ├── layouts/
│   │   ├── pages/
│   │   └── components/
│   ├── public/
│   └── package.json
│
└── beach-finder-api/       # Backend (Node.js)
    ├── server.js           # Express + MCP proxy
    ├── ecosystem.config.cjs # PM2 config
    ├── Caddyfile           # Reverse proxy config
    └── package.json
```

## Getting Started

### Frontend Development

```bash
cd beach-finder
npm install
npm run dev
```

Open [http://localhost:4321](http://localhost:4321)

### Backend Development

```bash
cd beach-finder-api
npm install
npm run dev
```

API runs on [http://localhost:3000](http://localhost:3000)

## Deployment

### Frontend (Static Hosting)
```bash
cd beach-finder
npm run build
# Upload dist/ folder to any static host
```

### Backend (Node.js Server)
```bash
cd beach-finder-api
npm install
pm2 start ecosystem.config.cjs
```

## Environment

- **Frontend:** Hosted on [all-inkl.com](https://all-inkl.com/) with Let's Encrypt SSL
- **Backend:** Hosted on Oracle Cloud (AMD 2) with Caddy reverse proxy

## License

MIT

## Credits

- Hotel data powered by [Trivago MCP Server](https://mcp.trivago.com/docs)
- Beach data from [OpenStreetMap](https://www.openstreetmap.org/)
- Weather data from [Open-Meteo](https://open-meteo.com/)
