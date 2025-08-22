# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Study-SaaS is a Progate-inspired learning platform that provides interactive programming tutorials with a built-in code editor powered by Microsoft's Monaco Editor (the same editor used in VS Code).

## Core Features

### Interactive Code Editor
- **Monaco Editor**: Browser-based code editor with syntax highlighting, IntelliSense, and debugging capabilities
- **Multi-language support**: Support for various programming languages (JavaScript, Python, HTML/CSS, etc.)
- **Real-time execution**: Code execution with instant feedback
- **Code validation**: Automatic checking of student code against expected solutions

### Learning Management
- **Progressive lessons**: Step-by-step tutorials with guided exercises
- **Interactive challenges**: Hands-on coding exercises with immediate feedback
- **Progress tracking**: Student progress monitoring and achievement system
- **Hint system**: Contextual hints and guidance for stuck students

## Recommended Tech Stack

### Frontend
```bash
# React-based frontend with Monaco integration
npm install @monaco-editor/react
npm install react react-dom
npm install @types/react @types/react-dom
```

### Monaco Editor Setup
```bash
# Core Monaco packages
npm install monaco-editor
npm install @monaco-editor/loader
```

### Backend & Database
```bash
# API and data management
npm install express
npm install prisma @prisma/client
npm install jsonwebtoken bcryptjs
```

### Real-time Features
```bash
# For live code execution and collaboration
npm install socket.io socket.io-client
npm install ws
```

## Essential Development Commands

### Docker Compose Development
```bash
docker compose up -d           # Start all services in background
docker compose down            # Stop all services
docker compose build          # Rebuild containers
docker compose logs -f        # Follow logs from all services
docker compose exec app bash  # Access application container shell
```

### Development (within containers)
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run test         # Run test suite
```

### Database Operations
```bash
# Run from host or within app container
docker compose exec app npx prisma migrate dev --name <name>  # Run migrations
docker compose exec app npx prisma studio                     # Open database GUI
docker compose exec app npx prisma generate                   # Generate Prisma client
```

## Architecture Guidelines

### Project Structure
```
src/
├── components/
│   ├── editor/          # Monaco editor components
│   │   ├── CodeEditor.tsx
│   │   ├── LanguageSelector.tsx
│   │   └── ExecutionPanel.tsx
│   ├── lessons/         # Lesson components
│   │   ├── LessonView.tsx
│   │   ├── ExerciseCard.tsx
│   │   └── ProgressTracker.tsx
│   ├── ui/              # Reusable UI components
│   └── layout/          # Layout components
├── lib/
│   ├── monaco/          # Monaco editor configuration
│   ├── execution/       # Code execution logic
│   ├── validation/      # Code validation utilities
│   └── db/              # Database utilities
├── pages/ or app/       # Next.js routing
├── api/                 # API endpoints
└── types/               # TypeScript definitions
```

### Monaco Editor Integration
```typescript
// Basic Monaco setup
import { Editor } from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange }) => {
  return (
    <Editor
      height="400px"
      language={language}
      value={value}
      onChange={onChange}
      theme="vs-dark"
      options={{
        selectOnLineNumbers: true,
        roundedSelection: false,
        readOnly: false,
        cursorStyle: 'line',
        automaticLayout: true,
      }}
    />
  );
};
```

## Key Implementation Areas

### 1. Code Execution Engine
- Sandboxed code execution environment
- Support for multiple programming languages
- Real-time output capture and display
- Error handling and debugging support

### 2. Lesson Management System
- Structured lesson content with markdown support
- Exercise templates and validation rules
- Progress tracking and completion states
- Adaptive difficulty progression

### 3. User Authentication & Progress
- User accounts and authentication
- Progress persistence across sessions
- Achievement and badge systems
- Learning analytics and reporting

### 4. Interactive Features
- Code hints and auto-completion
- Step-by-step guidance
- Interactive tutorials
- Real-time collaboration (optional)

## Security Considerations

### Code Execution Safety
- Sandboxed execution environments
- Input validation and sanitization
- Resource limits (memory, execution time)
- Protection against malicious code

### User Data Protection
- Secure authentication implementation
- Progress data encryption
- Privacy-compliant user tracking
- GDPR/privacy regulation compliance

## Performance Optimization

### Monaco Editor
- Lazy loading of language definitions
- Web worker utilization for syntax highlighting
- Efficient diff algorithms for code comparison
- Memory management for long sessions

### Learning Content
- Progressive loading of lesson content
- Caching strategies for frequently accessed materials
- Optimized code execution pipelines
- Efficient progress synchronization

## Docker Development Setup

### Required Files
Create these files in your project root:

**docker-compose.yml**
```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
    depends_on:
      - db
      - redis

  db:
    image: postgres:15
    environment:
      POSTGRES_DB: study_saas
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

**Dockerfile**
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
# Hot reload enabled for development
CMD ["npm", "run", "dev"]
```

### Hot Reload Configuration
The development environment supports hot reloading for immediate code changes:

**Volume Mounting for Hot Reload**
- Source code is mounted as volume: `.:/app`
- `node_modules` is excluded from mounting to prevent conflicts
- Changes to files are immediately reflected without container restart

**Next.js Hot Reload**
```json
// package.json scripts
{
  "scripts": {
    "dev": "next dev --hostname 0.0.0.0",
    "dev:watch": "next dev --hostname 0.0.0.0 --turbo"
  }
}
```

**Monaco Editor Hot Reload**
```typescript
// Monaco editor preserves state during hot reloads
import { Editor } from '@monaco-editor/react';

const CodeEditor = ({ language, value, onChange }) => {
  return (
    <Editor
      // Hot reload preserves editor state
      saveViewState={true}
      // ... other props
    />
  );
};
```

## Development Workflow

### Docker-based Development with Hot Reload
1. Run `docker compose up -d` to start all services with hot reload enabled
2. Edit source files - changes automatically reflect in browser
3. Monaco editor state is preserved during hot reloads
4. Run `docker compose exec app npm run lint` for code quality checks
5. Run `docker compose exec app npm run test` for functionality verification
6. Test Monaco editor integration across browsers
7. Validate code execution security measures
8. Run `docker compose down` when done

### Hot Reload Benefits
- **Instant feedback**: Code changes appear immediately in browser
- **State preservation**: Monaco editor content and cursor position maintained
- **No container restarts**: Development server stays running
- **Fast iteration**: Rapid development and testing cycles

### Testing Strategy
- Unit tests for validation logic
- Integration tests for Monaco editor features
- End-to-end tests for complete user workflows
- Security testing for code execution environment

## Common Development Tasks

### Adding New Programming Language
1. Configure Monaco language support
2. Implement language-specific execution logic
3. Create validation templates
4. Add syntax highlighting themes

### Creating New Lesson Content
1. Define lesson structure and learning objectives
2. Create interactive exercises with validation rules
3. Implement progress tracking logic
4. Add hint systems and guidance

### Enhancing Editor Features
1. Configure Monaco editor options
2. Implement custom themes and layouts
3. Add debugging and diagnostic features
4. Integrate real-time collaboration tools