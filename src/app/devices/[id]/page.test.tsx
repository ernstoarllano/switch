import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { notFound } from 'next/navigation'

import Device from './page'

vi.mock('@/lib/data', () => ({
  getDeviceById: vi.fn((id: string) => {
    if (id === 'device-001') {
      return Promise.resolve({
        id: 'device-001',
        name: 'Test Device',
        description: 'Test description',
        price: 99.99,
        rating: 4.5,
        category: 'category-001',
      })
    }
    return Promise.resolve(null)
  }),
}))

describe('Device Detail Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders device details when device exists', async () => {
    const params = Promise.resolve({ id: 'device-001' })
    const component = await Device({ params })
    render(component)

    expect(screen.getByText('Test Device')).toBeInTheDocument()
    expect(screen.getByText('Test description')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('4.5')).toBeInTheDocument()
  })

  it('renders back link', async () => {
    const params = Promise.resolve({ id: 'device-001' })
    const component = await Device({ params })
    render(component)

    expect(screen.getByText('Back')).toBeInTheDocument()
  })

  it('calls notFound when device does not exist', async () => {
    const params = Promise.resolve({ id: 'non-existent' })

    await Device({ params })

    expect(notFound).toHaveBeenCalled()
  })
})
