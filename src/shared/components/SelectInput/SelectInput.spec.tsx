import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { SelectInput, SelectInputProps } from './SelectInput'

const renderComponent = ({
  label = 'SelectInput',
  options = [],
  disabled = false,
  className = '',
  onChange = vi.fn(),
  ...props
}: SelectInputProps) => {
  render(
    <SelectInput
      label={label}
      options={options}
      disabled={disabled}
      className={className}
      onChange={onChange}
      {...props}
    />
  )
}

describe('SelectInput', () => {
  it('should render component', async () => {
    renderComponent({
      label: 'Select',
      options: [],
      onChange: vi.fn(),
    })
    const select = screen.getByRole('combobox', { name: 'Select' })

    expect(select).toBeInTheDocument()
  })

  it('should render with custom className', () => {
    renderComponent({
      label: 'SelectInput',
      options: [],
      className: 'custom-class',
    })
    const select = screen.getByRole('combobox', { name: 'SelectInput' })

    expect(select).toHaveClass('custom-class')
  })

  it('should selected option', async () => {
    renderComponent({
      label: 'SelectInput',
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
      ],
    })
    const select = screen.getByRole('combobox', { name: 'SelectInput' })
    const option = screen.getByRole('option', { name: '2' })

    await userEvent.click(select)

    await userEvent.selectOptions(select, option)

    expect(select).toHaveValue('2')
  })

  it('should render with disabled', () => {
    renderComponent({
      label: 'SelectInput',
      name: 'SelectInput',
      id: 'SelectInput',
      options: [],
      disabled: true,
    })
    const select = screen.getByRole('combobox', { name: 'SelectInput' })

    expect(select).toBeDisabled()
  })
})
