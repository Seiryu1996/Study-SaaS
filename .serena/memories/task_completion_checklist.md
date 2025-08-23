# Task Completion Checklist

## Before Completing Any Task

### Code Quality Checks
1. **Type Checking**
   ```bash
   docker compose exec app npm run type-check
   ```
   - Ensure no TypeScript errors
   - Verify all types are properly defined

2. **Linting**
   ```bash
   docker compose exec app npm run lint
   ```
   - Fix all ESLint warnings and errors
   - Follow established code style

3. **Testing**
   ```bash
   docker compose exec app npm run test
   ```
   - Ensure all existing tests pass
   - Add tests for new functionality
   - Run in watch mode during development: `npm run test:watch`

### Build Verification
4. **Production Build**
   ```bash
   docker compose exec app npm run build
   ```
   - Verify the application builds without errors
   - Check for any build-time warnings

### Development Environment
5. **Hot Reload Testing**
   - Verify changes reflect immediately in browser
   - Test Monaco editor state preservation during reloads
   - Ensure no console errors in browser

### Database Operations (If Applicable)
6. **Database Migrations**
   ```bash
   docker compose exec app npx prisma generate
   docker compose exec app npx prisma migrate dev
   ```

### Security Considerations
7. **Security Review**
   - Ensure no secrets are logged or exposed
   - Verify code execution is properly sandboxed
   - Check authentication flows work correctly

### Documentation
8. **Code Comments**
   - Add meaningful comments for complex logic
   - Update relevant documentation
   - Ensure API endpoints are documented

## Specific to Monaco/Code Execution Features
- Test code execution with multiple languages
- Verify syntax highlighting works correctly
- Ensure error handling is comprehensive
- Test with various code samples

## Final Verification
- Application starts successfully with `docker compose up`
- All services (app, db, redis) are healthy
- Authentication flow works with Clerk
- Monaco editor loads and functions properly