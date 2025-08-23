# Tech Stack

## Frontend
- **Framework**: Next.js 14 with App Router
- **Runtime**: React 18, TypeScript 5.2
- **Editor**: Monaco Editor (@monaco-editor/react v4.6.0)
- **Styling**: Tailwind CSS with custom configurations
- **UI Components**: Radix UI primitives (dialog, select, tabs)
- **Icons**: Lucide React
- **Authentication**: Clerk (@clerk/nextjs v5.7.5)

## Backend & Database
- **Database**: PostgreSQL 15 
- **ORM**: Prisma v6.14.0 with Prisma Client
- **Cache**: Redis 7-alpine
- **Real-time**: Socket.io v4.7.2 (both client and server)
- **Validation**: Zod v3.22.4
- **Webhooks**: Svix v1.74.1

## Development Environment
- **Containerization**: Docker Compose with hot reload
- **Package Manager**: npm with package-lock.json
- **Testing**: Jest with React Testing Library
- **Linting**: ESLint with Next.js config
- **Type Checking**: TypeScript with strict mode
- **Build Tools**: PostCSS, Autoprefixer

## Code Execution Environment
- **Multi-language Support**: Native runners for Go, Python, JavaScript, etc.
- **Security**: Sandboxed execution with SecurityService
- **Services**: Modular execution services in `/lib/execution/services/`