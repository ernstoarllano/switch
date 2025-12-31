import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'

import Home from './page'

vi.mock('@/lib/data', () => ({
  getDevices: vi.fn(() => Promise.resolve([
    {
      id: 'device-001',
      name: 'Test Device 1',
      description: 'Test description 1',
      price: 99.99,
      rating: 4.5,
      category: 'category-001',
    },
    {
      id: 'device-002',
      name: 'Test Device 2',
      description: 'Test description 2',
      price: 149.99,
      rating: 4.8,
      category: 'category-002',
    },
  ])),
  getCategories: vi.fn(() => Promise.resolve([
    { id: 'category-001', name: 'Audio' },
    { id: 'category-002', name: 'Video' },
  ])),
}))

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the header with title', async () => {
    const searchParams = Promise.resolve({})
    const component = await Home({ searchParams })
    const { container } = render(component)

    expect(container.textContent).toContain('Mini Catalog')
  })

  it('renders devices grid', async () => {
    const searchParams = Promise.resolve({})
    const component = await Home({ searchParams })
    render(component)

    expect(screen.getByText('Test Device 1')).toBeInTheDocument()
    expect(screen.getByText('Test Device 2')).toBeInTheDocument()
  })

  it('displays device count in header', async () => {
    const searchParams = Promise.resolve({})
    const component = await Home({ searchParams })
    const { container } = render(component)

    expect(container.textContent).toContain('2 devices')
  })

  it('displays category count in header', async () => {
    const searchParams = Promise.resolve({})
    const component = await Home({ searchParams })
    const { container } = render(component)

    expect(container.textContent).toContain('2 categories')
  })

  it('renders filters sidebar', async () => {
    const searchParams = Promise.resolve({})
    const component = await Home({ searchParams })
    const { container } = render(component)

    expect(container.textContent).toContain('Search')
    expect(container.textContent).toContain('Categories')
    expect(container.textContent).toContain('Sort by')
  })
})
