# Study SaaS - Interactive Programming Learning Platform

A Progate-inspired learning platform built with Next.js and Monaco Editor, providing interactive programming tutorials with real-time code execution and feedback.

## Features

- **Monaco Editor Integration**: VS Code-powered code editor in the browser
- **Hot Reload Development**: Instant feedback during development
- **Multi-language Support**: JavaScript, Python, HTML/CSS, and more
- **Interactive Lessons**: Step-by-step programming tutorials
- **Real-time Execution**: Code execution with immediate feedback
- **Progress Tracking**: User progress monitoring and achievements

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Editor**: Monaco Editor (@monaco-editor/react)
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis
- **Styling**: Tailwind CSS
- **Authentication**: JWT-based auth
- **Development**: Docker Compose with hot reload

## Getting Started

### Prerequisites

- Docker and Docker Compose
- Git

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Study-SaaS
   ```

2. **Clerk Authentication Setup**
   ```bash
   # Create a Clerk account at https://clerk.com
   # Create a new application
   # Enable Google OAuth provider
   # Copy the keys to .env.local
   ```

3. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your Clerk keys:
   # NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your-key
   # CLERK_SECRET_KEY=sk_test_your-key
   ```

4. **Start Development Environment**
   ```bash
   # Build and start all services
   docker compose up -d
   
   # View logs
   docker compose logs -f app
   ```

5. **Setup ngrok for Clerk (Required for proper authentication)**
   ```bash
   # Install ngrok if you haven't already
   npm install -g ngrok
   
   # Start ngrok tunnel
   ngrok http 3000
   
   # Copy the ngrok URL (e.g., https://abc123.ngrok.io)
   # Update Clerk Dashboard with the ngrok URL:
   # - Go to Clerk Dashboard > Configure > Domains
   # - Add your ngrok domain
   # - Update environment variables if needed
   ```

6. **Access the Application**
   - Application: http://localhost:3000 OR your ngrok URL
   - Database (PostgreSQL): localhost:5432
   - Redis: localhost:6379

### Development Commands

#### Docker Compose Commands
```bash
# Start all services
docker compose up -d

# Stop all services
docker compose down

# Rebuild containers
docker compose build

# View logs
docker compose logs -f

# Access app container shell
docker compose exec app bash
```

#### Application Commands (inside container)
```bash
# Development server with hot reload
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint

# Type checking
npm run type-check
```

#### Database Commands
```bash
# Run database migrations
docker compose exec app npx prisma migrate dev

# Open Prisma Studio
docker compose exec app npx prisma studio

# Generate Prisma client
docker compose exec app npx prisma generate
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/          # React components
│   ├── editor/          # Monaco editor components
│   ├── lessons/         # Lesson-related components
│   ├── ui/              # Reusable UI components
│   └── layout/          # Layout components
├── lib/                 # Utility libraries
│   ├── monaco/          # Monaco editor configuration
│   ├── execution/       # Code execution logic
│   ├── validation/      # Code validation utilities
│   └── db/              # Database utilities
├── types/               # TypeScript definitions
└── styles/              # Global styles
```

## Development Features

### Hot Reload Configuration
- Source code changes reflect immediately in browser
- Monaco editor state is preserved during hot reloads
- No container restarts required for code changes

### Monaco Editor Features
- Syntax highlighting for multiple languages
- IntelliSense and auto-completion
- Code validation and error detection
- Customizable themes and layouts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.