import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { Select } from './select'

describe('Select', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ]

  it('renders with placeholder', () => {
    render(<Select options={options} placeholder="Choose an option" />)
    expect(screen.getByText('Choose an option')).toBeInTheDocument()
  })

  it('displays selected value label', () => {
    render(<Select options={options} value="option2" />)
    expect(screen.getByText('Option 2')).toBeInTheDocument()
  })

  it('calls onValueChange when selection changes', async () => {
    const user = userEvent.setup()
    const handleChange = vi.fn()

    render(
      <Select
        options={options}
        value="option1"
        onValueChange={handleChange}
      />
    )

    const trigger = screen.getByRole('combobox')
    await user.click(trigger)

    const option2 = screen.getByText('Option 2')
    await user.click(option2)

    expect(handleChange).toHaveBeenCalledWith('option2')
  })

  it('renders all options when opened', async () => {
    const user = userEvent.setup()

    render(<Select options={options} />)

    const trigger = screen.getByRole('combobox')
    await user.click(trigger)

    expect(screen.getByText('Option 1')).toBeInTheDocument()
    expect(screen.getByText('Option 2')).toBeInTheDocument()
    expect(screen.getByText('Option 3')).toBeInTheDocument()
  })
})
