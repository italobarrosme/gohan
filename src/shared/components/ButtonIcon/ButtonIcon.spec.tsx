import { screen, render } from '@testing-library/react'
import { ButtonIcon, type ButtonIconProps } from './ButtonIcon'
import userEvent from '@testing-library/user-event'

const renderComponent = ({
  children = 'ButtonIcon',
  icon = 'mdi:home',
  onClick = vi.fn(),
  height = 32,
  width = 32,
}: ButtonIconProps) => {
  render(
    <ButtonIcon icon={icon} onClick={onClick} height={height} width={width}>
      {children}
    </ButtonIcon>
  )
}

describe('ButtonIcon', () => {
  afterAll(() => {
    vi.clearAllMocks()
  })

  it('render component', () => {
    renderComponent({
      children: 'ButtonIcon',
      icon: 'mdi:home',
    })
    const button = screen.getByRole('button', { name: 'ButtonIcon' })

    expect(button).toBeInTheDocument()

    expect(button).toHaveTextContent('ButtonIcon')
  })
  it('should render with custom width and height', () => {
    vi.mock('@iconify/react', () => ({
      Icon: () => <svg data-testid="icon" height={32} width={32} />,
    }))

    renderComponent({
      children: 'ButtonIcon',
      icon: 'mdi:home',
      height: 32,
      width: 32,
    })
    const icon = screen.getByTestId('icon')

    expect(icon).toHaveAttribute('height', '32')
    expect(icon).toHaveAttribute('width', '32')
  })

  it('should render without label', () => {
    renderComponent({
      children: '',
      icon: 'mdi:home',
    })
    const button = screen.getByRole('button')
    const label = button.querySelector('label')

    expect(label).not.toBeInTheDocument()
  })

  it('should perform an action when the button is clicked', async () => {
    const onClickStub = vi.fn()

    renderComponent({
      children: 'ButtonIcon',
      icon: 'mdi:home',
      onClick: onClickStub,
    })

    const button = screen.getByRole('button', {
      name: 'ButtonIcon',
    })

    // Simulate a click on the button
    await userEvent.click(button)

    expect(onClickStub).toBeCalled()
  })
})
