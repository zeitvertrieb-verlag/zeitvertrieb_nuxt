# AGENTS.md - Agentic Coding Guidelines

This document provides guidelines for agents working in the Zeitvertrieb Nuxt codebase.

## Project Overview

- **Framework**: Nuxt 4 with Vue 3
- **Language**: TypeScript
- **Data Storage**: LowDB (JSON file-based)
- **Server**: Nitro (Nuxt server engine)

## Commands

### Development
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build
npm run generate   # Generate static site
```

### Linting & Type Checking
No custom linting or type checking is configured. To add:
```bash
npm install -D eslint @nuxt/eslint eslint-plugin-vue
npm install -D vue-tsc
```

### Testing
No testing framework is currently configured. To add tests:
```bash
npm install -D vitest @vue/test-utils jsdom
```

To run a single test file with Vitest:
```bash
npx vitest run path/to/test.spec.ts
# or watch mode
npx vitest path/to/test.spec.ts
```

## Code Style Guidelines

### General Conventions

- Use **Vue 3 Composition API** with `<script setup>` syntax
- Use **TypeScript** for all new files
- Follow **Nuxt 4 conventions** for directory structure:
  - `pages/` - Page components
  - `components/` - Reusable Vue components
  - `server/api/` - Server API routes
  - `server/lib/` - Server-side utilities
  - `layouts/` - Layout components
  - `assets/` - Static assets (CSS, images)

### TypeScript

- Enable strict type checking when possible
- Use interfaces over types for object shapes
- Use proper TypeScript types instead of `any`

### Vue Components

- Use `<script setup lang="ts">` for new components
- Use PascalCase for component names (e.g., `WorksList.vue`)
- Use kebab-case for component usage in templates
- Define props using `defineProps<{...}>()`
- Define emits using `defineEmits<{...}>()`
- Use `ref`, `computed`, `watch` from Vue
- Leverage Nuxt auto-imports (e.g., `useFetch`, `useRoute`)

### Server API (Nitro)

- Place API handlers in `server/api/` directory
- Use `defineEventHandler` for route handlers
- Use `getRequestHeaders`, `getQuery`, `getRouterParam` for request parsing
- Use `createError` for error responses
- Return proper HTTP status codes

### Imports

- Use **absolute imports** with `~/` for root-relative paths
- Use **named exports** for utilities
- Group imports: external libraries, then relative imports

### Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `WorksList.vue`, `UserProfile.vue` |
| Files (utilities) | kebab-case | `db-helper.ts`, `auth-utils.ts` |
| Variables | camelCase | `userName`, `isLoading` |
| Constants | UPPER_SNAKE_CASE | `ADMIN_PASSWORD`, `MAX_RETRIES` |
| Interfaces | PascalCase | `Work`, `UserProfile` |
| Props | camelCase | `itemId`, `showModal` |

### Error Handling

- Use `try/catch` blocks for async operations
- Use `createError` with appropriate status codes (400, 401, 404, 500)
- Provide meaningful error messages
- Handle null/undefined values explicitly

### CSS/Styling

- Use `<style scoped>` for component-specific styles
- Use kebab-case for CSS class names
- Follow existing color scheme (see `assets/css/main.css`)
- Avoid global styles unless necessary (put in `assets/css/`)

### Security

- Never hardcode secrets in source code
- Use environment variables for sensitive data
- Validate all user inputs in API routes
- Use proper authentication/authorization checks

### File Organization

```
zeitvertrieb_nuxt/
├── assets/          # Static assets (CSS, images)
├── components/      # Vue components
├── layouts/         # Layout components
├── pages/           # Page components (file-based routing)
├── server/
│   ├── api/        # API route handlers
│   └── lib/        # Server utilities
├── app.vue         # Root app component
├── nuxt.config.ts  # Nuxt configuration
└── package.json
```

## Common Patterns

### Fetching Data in Components
```vue
<script setup lang="ts">
const { data, pending, error } = await useFetch('/api/endpoint')
</script>
```

### Server API Handler
```typescript
export default defineEventHandler(async (event) => {
  const method = event.method
  
  if (method === 'GET') {
    // Handle GET request
  }
  
  throw createError({ statusCode: 405, statusMessage: 'Method not allowed' })
})
```

### Reactive State
```vue
<script setup lang="ts">
const count = ref(0)
const doubled = computed(() => count.value * 2)

function increment() {
  count.value++
}
</script>
```
