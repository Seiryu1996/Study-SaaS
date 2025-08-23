# Code Style and Conventions

## TypeScript Configuration
- **Strict Mode**: Enabled with `strict: true`
- **Target**: ES5 with modern library support
- **Module Resolution**: Bundler-style (Next.js)
- **Path Aliases**: 
  - `@/*` → `./src/*`
  - `@/components/*` → `./src/components/*`
  - `@/lib/*` → `./src/lib/*`
  - `@/types/*` → `./src/types/*`

## File Structure Conventions
```
src/
├── app/                 # Next.js App Router pages and API routes
├── components/          # React components
│   ├── editor/          # Monaco editor related components
│   ├── lessons/         # Lesson-specific components
│   ├── ui/              # Reusable UI components
│   ├── dashboard/       # Dashboard components
│   └── layout/          # Layout components
├── lib/                 # Business logic and utilities
│   ├── execution/       # Code execution engines
│   │   └── services/    # Execution services
│   ├── monaco/          # Monaco editor configuration
│   ├── validation/      # Validation utilities
│   ├── db/              # Database utilities
│   └── i18n/            # Internationalization
├── contexts/            # React contexts
├── types/               # TypeScript type definitions
└── styles/              # Global styles
```

## Naming Conventions
- **Components**: PascalCase (e.g., `CodeEditor.tsx`, `LessonCard.tsx`)
- **Utilities**: camelCase (e.g., `codeRunner.ts`, `validation.ts`)
- **Services**: PascalCase with "Service" suffix (e.g., `CodeExecutionService.ts`)
- **Types**: PascalCase interfaces and types
- **API Routes**: kebab-case directories, `route.ts` files

## Component Patterns
- Use TypeScript interfaces for props
- Prefer functional components with hooks
- Use Radix UI for complex UI components
- Implement proper error boundaries
- Follow React best practices for state management

## Import/Export Conventions
- Use absolute imports with path aliases (`@/`)
- Export components as default exports
- Export utilities as named exports
- Group imports: external libraries, internal modules, relative imports

## Code Quality Tools
- **ESLint**: Next.js configuration with strict rules
- **TypeScript**: Strict type checking enabled
- **Prettier**: (Inferred from consistent formatting)
- **Jest**: Testing framework with React Testing Library