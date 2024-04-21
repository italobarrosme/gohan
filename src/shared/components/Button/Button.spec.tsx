import { vi } from 'vitest'
import { Button, ButtonProps } from './Button'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

vi.mock('@iconify/react', () => ({
  Icon: () => <svg data-testid="icon" />,
}))

const renderComponent = ({
  className,
  icon,
  children,
  variant,
  onClick,
}: ButtonProps) => {
  render(
    <Button
      className={className}
      variant={variant}
      icon={icon}
      onClick={onClick}
    >
      {children}
    </Button>
  )
}

describe('Button', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should render component', () => {
    renderComponent({
      children: 'test',
    })

    const labelButton = screen.getByRole('button', {
      name: 'test',
    })

    expect(labelButton).toBeInTheDocument()
  })

  it('should perform an action when the button is clicked', async () => {
    const onClickStub = vi.fn()

    renderComponent({
      children: 'test',
      onClick: onClickStub,
    })

    const button = screen.getByRole('button', {
      name: 'test',
    })

    // Simulate a click on the button
    await userEvent.click(button)

    expect(onClickStub).toBeCalled()
  })

  it('should render an icon', () => {
    renderComponent({
      children: 'test',
      icon: 'test',
    })

    const icon = screen.getByTestId('icon')

    expect(icon).toBeInTheDocument()
  })

  it('should render a custom class', () => {
    renderComponent({
      children: 'test',
      className: 'bg-red-500',
    })

    const button = screen.getByRole('button', {
      name: 'test',
    })

    expect(button).toHaveClass('bg-red-500')
  })

  it('should change variant', () => {
    renderComponent({
      children: 'test',
      variant: {
        color: 'danger',
        size: 'lg',
      },
    })

    const button = screen.getByRole('button', {
      name: 'test',
    })

    expect(button).toHaveClass('bg-red-500')
    expect(button).toHaveClass('text-lg')
  })
})
