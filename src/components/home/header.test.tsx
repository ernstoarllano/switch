import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Header } from './header'

describe('Header', () => {
  it('renders the title', () => {
    render(<Header devices={10} categories={5} selectedCategories={0} />)
    expect(screen.getByText('Mini Catalog')).toBeInTheDocument()
  })

  it('displays device and category counts', () => {
    render(<Header devices={10} categories={5} selectedCategories={0} />)
    expect(screen.getByText('10')).toBeInTheDocument()
    expect(screen.getByText('5')).toBeInTheDocument()
  })

  it('uses singular form for single category', () => {
    const { container } = render(<Header devices={3} categories={5} selectedCategories={1} />)
    expect(container.textContent).toContain('category')
    expect(container.textContent).not.toContain('categories')
  })

  it('uses plural form for multiple categories', () => {
    const { container } = render(<Header devices={10} categories={5} selectedCategories={0} />)
    expect(container.textContent).toContain('categories')
  })

  it('shows selected categories count when filtering', () => {
    const { container } = render(<Header devices={5} categories={10} selectedCategories={3} />)
    expect(container.textContent).toContain('3')
    expect(container.textContent).toContain('categories')
  })

  it('shows total categories when not filtering', () => {
    const { container } = render(<Header devices={15} categories={8} selectedCategories={0} />)
    expect(container.textContent).toContain('8')
    expect(container.textContent).toContain('categories')
  })
})
