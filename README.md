## Features

### Core Features
- **Catalog List**: Browse devices in a responsive grid layout
- **Search**: Find devices by name or description
- **Filter**: Filter devices by category (multi-select)
- **Sort**: Sort by price, rating, name, or category (ascending/descending)
- **Device Detail**: Dedicated page for each device with full details
- **Favorites**: Mark devices as favorites with localStorage persistence
- **Loading States**: Spinner for async operations
- **Empty States**: Feedback when no devices match filters
- **Error States**: Error boundaries with retry functionality
- **Responsive Design**: Mobile-first
- **Accessibility**: Semantic HTML, keyboard navigation, focus management

### Additional Features 
- **URL State Sync**: All filters/search/sort persist in URL for shareable links
- **Dark Mode Support**: CSS ready for dark mode (no toggle UI implemented)
- **Comprehensive Tests**: Basic tests covering components and pages

## Tech Stack

### Core
- **Next.js 15** (App Router) - React framework with SSR/SSG
- **React 19** - Latest React with modern patterns
- **TypeScript** - Type safety throughout
- **Tailwind CSS 4** - Utility-first styling

### Libraries
- **Base UI** - Headless, accessible primitive components
- **nuqs** - Type-safe URL state management
- **Lucide React** - Icon library
- **clsx + tailwind-merge** - Conditional class utilities

### Testing
- **Vitest** - Fast unit test runner
- **Testing Library** - React component testing
- **jsdom** - DOM environment for tests

## Getting Started

### Prerequisites
- **Node.js 20+** or **Bun 1.0+**

### Installation

```bash
# Install dependencies
bun install
# or npm install
```

### Development

```bash
# Run dev server
bun run dev

# Open http://localhost:3000
```

### Build

```bash
# Create production build
bun run build

# Run production server
bun run start
```

### Testing

```bash
# Run tests once
bun run test
```

### Linting

```bash
# Run ESLint
bun run lint
```

## Project Structure

```
src/
├── app/                          # Next.js App Router pages
│   ├── devices/[id]/            # Device detail page
│   │   ├── page.tsx             # Detail page component
│   │   ├── error.tsx            # Error boundary
│   │   └── not-found.tsx        # 404 page
│   ├── page.tsx                 # Home page (catalog list)
│   ├── error.tsx                # Root error boundary
│   ├── loading.tsx              # Loading UI
│   └── layout.tsx               # Root layout
├── components/                  # React components
│   ├── device/                  # Device-specific components
│   │   └── detail.tsx           # Device detail card
│   ├── home/                    # Home page components
│   │   ├── devices.tsx          # Device grid
│   │   ├── filters.tsx          # Search/filter/sort sidebar
│   │   └── header.tsx           # Page header
│   ├── checkbox-group.tsx       # Primitive: Multi-select checkboxes
│   ├── input.tsx                # Primitive: Text input
│   ├── search.tsx               # Search input with icon
│   └── select.tsx               # Primitive: Single-select dropdown
├── hooks/                       # Custom React hooks
│   └── useFavorite.ts           # Favorites management with localStorage
├── lib/                         # Utilities
│   ├── data.ts                  # Data fetching with simulated latency
│   └── utils.ts                 # cn() utility for class merging
├── data/                        # Static JSON data
│   ├── devices.json
│   └── categories.json
└── types/                       # TypeScript definitions
    └── index.ts
```

## Tech Choices & Trade-offs

### Why Next.js 15 App Router?
- **Server Components**: Default SSR for better performance and SEO
- **Built-in routing**: File-based routing with layouts and error boundaries
- **Modern patterns**: Latest React features

### Why Base UI over other component libraries?
- **Headless**: Full control over styling while maintaining accessibility
- **Primitive pattern**: Composable components for flexibility
- **Lightweight**: Only includes what's needed

### Why nuqs for URL state?
- **Type-safe**: Serialization/deserialization with type safety
- **Simple API**: Works seamlessly with Next.js App Router
- **Shareable links**: Users can bookmark or share filtered views

### Why client-side filtering instead of server-side?
- **Small dataset**: ~20 devices makes client-side filtering fast
- **Better UX**: Instant feedback without network roundtrips
- **Simpler architecture**: No backend needed
- **Trade-off**: Wouldn't scale well with thousands of items

### Why localStorage for favorites?
- **Requirement**: Spec asked for localStorage persistence
- **Simple**: No backend or auth needed
- **Trade-off**: Not synced across devices/browsers

### Hydration vs. Lazy Initialization Trade-off
The `useFavorite` hook has a known hydration warning pattern:
- **Issue**: Server renders with empty favorites, client hydrates with localStorage data
- **Why we kept it**: The ESLint rule `react-hooks/set-state-in-effect` discourages `setState` in `useEffect`, but this is a legitimate use case for hydrating from localStorage
- **Alternative tried**: Lazy initialization (`useState(() => ...)`) eliminates the lint warning but causes hydration mismatches
- **Decision**: Keep the `useEffect` pattern as it's the correct solution for hydrating from browser-only APIs like localStorage

## What I'd Improve With More Time

  ### Features
  1. **Dark mode toggle UI** - CSS is ready, just needs a toggle button + persistence
  2. **Debounced search** - Reduce unnecessary re-renders and API calls (critical for server-side search in production)
  3. **Skeleton loaders with granular Suspense boundaries** - Better perceived performance and allows UI sections to load independently (e.g., render device grid while filters are still loading)
  4. **Granular error boundaries** - Wrap individual sections (filters, device grid) so failures in one component don't crash the entire page
  5. **Pagination/Virtual scrolling** - For larger datasets
  6. **Keyboard shortcuts** - Quick actions (e.g., "/" to focus search)

### Technical Improvements
1. **TanStack Query** - Better data caching and revalidation
2. **TanStack Table** - Better data presentation and filtering
3. **E2E tests** - Playwright for user flows
4. **Error tracking** - Sentry or similar for production errors
5. **Bundle analysis** - Optimize imports, code splitting

### Code Quality
1. **More granular components** - Break down larger components
2. **Custom hooks** - Extract reusable logic (useDebounce, useMediaQuery)
3. **Better TypeScript** - More strict types, fewer `as` casts
4. **Documentation** - TSDoc for better team understanding

## Deviations from Spec

### Sorting
Didn't make sense to sort by multiple filters so I only allowed selecting one filter at a time.

## AI Assistance Disclosure

This project was built with assistance from Claude (Anthropic AI). AI was used for:

### Problem Solving
- **Debugging**: nuqs URL state serialization
- **Trade-off discussions**: localStorage hydration approaches

## Testing Error States

The data fetching functions in `src/lib/data.ts` include a `maybeSimulateError` function for testing error boundaries. To test error handling:

1. Open `src/lib/data.ts`
2. Change `await maybeSimulateError(0)` to `await maybeSimulateError(1.0)` (100% error rate)
3. Refresh the app to see error boundaries in action
4. Click "Try again" to test the retry functionality
5. Set back to `0` to disable errors

This simulates network failures without needing to disconnect or mock network requests.