import React from 'react'
import '@testing-library/jest-dom'
import { vi } from 'vitest'
import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { faker } from '@faker-js/faker'
import { Input } from '.'

describe('<Input/>', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })
  it('should render the component', () => {
    render(<Input />)
    const input = screen.getByRole('textbox')

    expect(input).toBeInTheDocument()
  })

  it('should render label', () => {
    const fakeLabel = faker.lorem.words(2)

    render(<Input label={fakeLabel} />)

    const label = screen.getByText(fakeLabel)

    expect(label).toBeInTheDocument()
  })

  it('should render placeholder', () => {
    const fakePlaceholder = faker.lorem.words(2)

    render(<Input placeholder={fakePlaceholder} />)

    const input = screen.getByPlaceholderText(fakePlaceholder)

    expect(input).toBeInTheDocument()
  })

  it('should not be clickable when disabled', () => {
    render(<Input disabled />)

    const input = screen.getByRole('textbox')

    expect(input).toBeDisabled()
  })

  it('should display typed value', async () => {
    const fakeValue = faker.lorem.words(2)

    render(<Input />)

    const input = screen.getByRole('textbox')

    await userEvent.type(input, fakeValue)

    expect(input).toHaveValue(fakeValue)
  })

  it('should render with error styles when hasError is true', () => {
    render(<Input hasError />)

    const input = screen.getByRole('textbox')

    expect(input).toHaveClass('border-feedback-error')
  })

  it('should display error message if hasError is true and error message is provided', () => {
    const fakeErrorMessage = faker.lorem.words(2)

    render(<Input hasError errorMessage={fakeErrorMessage} />)

    const errorMessage = screen.getByText(fakeErrorMessage)

    expect(errorMessage).toBeInTheDocument()
  })

  it('should not display error message if hasError is false and error message is provided', () => {
    const fakeErrorMessage = faker.lorem.words(2)
    render(<Input errorMessage={fakeErrorMessage} />)

    const errorMessage = screen.queryByText(fakeErrorMessage)

    expect(errorMessage).not.toBeInTheDocument()
  })

  it('should render with given type', () => {
    render(<Input type="email" />)

    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('type', 'email')
  })

  it('should render with accessory text', () => {
    const fakeAccessoryText = faker.lorem.words(2)
    render(<Input accessoryText={fakeAccessoryText} />)

    const accessoryText = screen.getByText(fakeAccessoryText)

    expect(accessoryText).toBeInTheDocument()
  })

  it('should render with icon left', () => {
    render(<Input iconLeft={<div data-testid="icon-left" />} />)

    const iconLeft = screen.getByTestId('icon-left')

    expect(iconLeft).toBeInTheDocument()
  })

  it('should render with icon right', () => {
    render(<Input iconRight={<div data-testid="icon-right" />} />)

    const iconRight = screen.getByTestId('icon-right')

    expect(iconRight).toBeInTheDocument()
  })

  it('should render with maxLength', () => {
    const fakeMaxLength = faker.datatype.number(100)
    render(<Input maxLength={fakeMaxLength} />)

    const input = screen.getByRole('textbox')

    expect(input).toHaveAttribute('maxLength', `${fakeMaxLength}`)
  })
})
