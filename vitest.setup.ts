import '@testing-library/jest-dom/vitest'
import { vi } from 'vitest'

vi.mock('next/navigation', () => ({
  notFound: vi.fn(),
}))

vi.mock('nuqs', () => ({
  parseAsArrayOf: vi.fn(() => ({
    withDefault: vi.fn(() => ({
      withOptions: vi.fn(() => ({}))
    }))
  })),
  parseAsString: {},
  useQueryState: vi.fn(() => ['', vi.fn()]),
}))

vi.mock('@/hooks/useFavorite', () => ({
  useFavorite: vi.fn(() => ({
    favorites: [],
    isFavorite: vi.fn(() => false),
    addFavorite: vi.fn(),
    removeFavorite: vi.fn(),
    toggleFavorite: vi.fn(),
  })),
}))
