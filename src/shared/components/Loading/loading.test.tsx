import { cleanup, render, screen } from '@testing-library/react'
import { Loading } from './Loading'

const renderComponent = () => render(<Loading />)

afterEach(() => {
  cleanup()
})

describe('Loading', () => {
  it('should render', () => {
    renderComponent()

    expect(screen.getByTestId('loading')).toBeTruthy()
  })

  it('should render 3 dots', () => {
    renderComponent()

    expect(screen.getAllByTestId('dot')).toHaveLength(3)
  })
})
