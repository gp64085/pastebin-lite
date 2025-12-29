# 📋 Pastebin Lite

[![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Drizzle ORM](https://img.shields.io/badge/Drizzle-0.45.1-green?logo=drizzle)](https://orm.drizzle.team/)
[![Neon](https://img.shields.io/badge/Neon-Database-purple?logo=postgresql)](https://neon.tech/)

> A lightweight, fast pastebin service with expiration and view limits

## ✨ Features

- 🚀 **Fast & Lightweight** - Built with Next.js 16 and TypeScript
- ⏰ **Time-based Expiration** - Set TTL in seconds
- 👁️ **View Limits** - Control how many times a paste can be viewed
- 🔒 **Secure** - UUID-based paste IDs
- 📱 **API-First** - RESTful API design
- 🎯 **Atomic Operations** - Thread-safe view counting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL database (Neon recommended)

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd pastebin-lite

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL
```

### Environment Setup

```env
DATABASE_URL="postgresql://username:password@host/database"
TEST_MODE=0  # Set to 1 for testing with custom timestamps
```

### Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000`

## 📖 API Documentation

### Create Paste

```http
POST /api/pastes
Content-Type: application/json

{
  "content": "Your paste content here",
  "ttl_seconds": 3600,     // Optional: expires in 1 hour
  "max_views": 10          // Optional: max 10 views
}
```

**Response:**
```json
{
  "id": "uuid-here",
  "shareableUrl": "https://yourapp.com/pastes/uuid-here"
}
```

### Get Paste

```http
GET /api/pastes/{id}
```

**Response:**
```json
{
  "content": "Your paste content",
  "remainingViews": 9,
  "expiresAt": "2024-01-01T12:00:00Z"
}
```

## 🧪 Testing

### Using curl

```bash
# Create a paste
curl -X POST http://localhost:3000/api/pastes \
  -H "Content-Type: application/json" \
  -d '{"content":"Hello World","ttl_seconds":3600}'

# Get a paste
curl http://localhost:3000/api/pastes/{paste-id}
```

### Test Mode

Enable test mode for custom timestamps:

```bash
# Set TEST_MODE=1 in .env
curl -X GET http://localhost:3000/api/pastes/{id} \
  -H "x-test-now-ms: 1640995200000"
```

## 🏗️ Architecture

```
app/
├── api/
│   └── pastes/
│       ├── route.ts          # POST /api/pastes
│       └── [id]/
│           └── route.ts      # GET /api/pastes/{id}
lib/
├── db.ts                     # Database connection
├── schema.ts                 # Drizzle schema
├── time.ts                   # Time utilities
├── validation.ts             # Input validation
├── api-response.ts           # Response helpers
└── paste-service.ts          # Business logic
```

## 🔧 Database Schema

```sql
CREATE TABLE pastes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content TEXT NOT NULL,
  expires_at TIMESTAMP,
  remaining_views INTEGER,
  created_at TIMESTAMP DEFAULT NOW() NOT NULL
);
```

## 📊 Features in Detail

### ⏰ Expiration Logic
- **Time-based**: Paste expires after specified seconds
- **View-based**: Paste expires after N views
- **Combined**: Both conditions can be set simultaneously

### 🔒 Security Features
- UUID-based IDs (no sequential enumeration)
- Input validation and sanitization
- SQL injection protection via Drizzle ORM

### ⚡ Performance
- Atomic view counting with SQL CASE statements
- Efficient database queries with proper indexing
- Minimal API surface area

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [Drizzle ORM](https://orm.drizzle.team/)
- [Neon Database](https://neon.tech/)

---

<div align="center">
  <strong>Built with ❤️ using Next.js and TypeScript</strong>
</div>