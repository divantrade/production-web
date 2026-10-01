import { render, screen, fireEvent } from '@testing-library/react'
import Button from '@/components/Button'

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Click me</Button>)
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveClass('bg-accent', 'px-8', 'py-3')
  })

  it('applies variant classes', () => {
    const { rerender } = render(<Button variant="secondary">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-transparent', 'text-white')

    rerender(<Button variant="outline">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('text-accent', 'border-accent')
  })

  it('applies size classes', () => {
    const { rerender } = render(<Button size="sm">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-4', 'text-xs')

    rerender(<Button size="lg">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('px-12', 'text-base')
  })

  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('is disabled when disabled prop is true', () => {
    const handleClick = jest.fn()
    render(<Button disabled onClick={handleClick}>Disabled</Button>)
    const button = screen.getByRole('button')
    expect(button).toBeDisabled()
    expect(button).toHaveClass('opacity-50', 'cursor-not-allowed')
    fireEvent.click(button)
    expect(handleClick).not.toHaveBeenCalled()
  })

  it('merges custom className', () => {
    render(<Button className="custom-class">Button</Button>)
    expect(screen.getByRole('button')).toHaveClass('custom-class')
  })
})
