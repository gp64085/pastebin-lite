# 📋 Pastebin Lite

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-0.45.1-green?logo=drizzle)](https://orm.drizzle.team/)
[![Neon](https://img.shields.io/badge/Neon-Database-purple?logo=postgresql)](https://neon.tech/)
[![pnpm](https://img.shields.io/badge/pnpm-9.0-orange?logo=pnpm)](https://pnpm.io/)

> Lightweight pastebin with expiration and view limits

## 🚀 Quick Start

```bash
git clone <repo-url>
cd pastebin-lite
pnpm install
cp .env.example .env  # Add your DATABASE_URL
pnpm dev
```

## 📖 API

**Create Paste:**
```bash
curl -X POST http://localhost:3000/api/pastes \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello","ttl_seconds":3600,"max_views":10}'
```

**Get Paste:**
```bash
curl http://localhost:3000/api/pastes/{id}
```

## 🚀 Deploy

**Vercel:**
```bash
pnpm add -g vercel && vercel --prod
```

## 🔧 Environment

```env
DATABASE_URL="postgresql://user:pass@host/db"
TEST_MODE=0
```