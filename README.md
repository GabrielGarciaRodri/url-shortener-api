# 🔗 URL Shortener API

A minimal URL shortener REST API built with NestJS, Prisma, and SQLite. Create short links, track clicks, and redirect — no external database needed.

## Features

- **Shorten URLs** with auto-generated or custom codes
- **301 Redirects** with click tracking
- **Stats endpoint** — see click count per URL
- **List all URLs** — paginated, newest first
- **Delete URLs** — clean up old links
- **Input validation** with class-validator
- **SQLite** — zero config, file-based database

## Installation

```bash
npm install
npx prisma generate
npx prisma db push
```

## Usage

```bash
# Development
npm run start:dev

# Production
npm run build
npm start
```

Server runs on `http://localhost:3000` by default.

## API Endpoints

### POST /shorten
Create a short URL.
```json
{
  "url": "https://github.com/gabrielsantiago",
  "customCode": "gh"  // optional
}
```
Response:
```json
{
  "code": "gh",
  "shortUrl": "http://localhost:3000/gh",
  "original": "https://github.com/gabrielsantiago"
}
```

### GET /:code
Redirects (301) to the original URL and increments click counter.

### GET /urls
List all shortened URLs (latest 50).

### GET /stats/:code
Get click stats for a specific short URL.

### DELETE /:code
Delete a short URL.

## Tech Stack

- NestJS (Node.js framework)
- Prisma ORM
- SQLite (zero-config database)
- TypeScript
- class-validator (DTO validation)
- nanoid (short code generation)

## License

MIT
