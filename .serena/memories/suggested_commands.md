# Suggested Development Commands

## Docker Compose Commands (Primary Development)
```bash
# Start development environment
docker compose up -d

# Stop all services
docker compose down

# Rebuild containers after dependency changes
docker compose build

# View application logs
docker compose logs -f app

# Access application container shell
docker compose exec app bash
```

## Application Commands (Inside Container)
```bash
# Development server with hot reload
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Run tests
npm run test

# Watch mode for tests
npm run test:watch

# Lint code
npm run lint

# Type checking
npm run type-check

# Database seed
npm run db:seed
```

## Database Commands
```bash
# Run database migrations
docker compose exec app npx prisma migrate dev --name <migration-name>

# Open Prisma Studio (database GUI)
docker compose exec app npx prisma studio

# Generate Prisma client after schema changes
docker compose exec app npx prisma generate

# Reset database (development only)
docker compose exec app npx prisma migrate reset
```

## Makefile Shortcuts
```bash
# Start development environment
make up

# Stop environment
make down

# Access container shell
make web

# Start ngrok tunnel for Clerk auth
make ngrok

# Combined development start
make dev
```

## Authentication Setup (Clerk)
```bash
# Setup ngrok for authentication (required)
ngrok http 3000

# Copy ngrok URL and update Clerk dashboard domains
```

## System Requirements
- Docker and Docker Compose installed
- Git for version control
- ngrok for authentication (development)