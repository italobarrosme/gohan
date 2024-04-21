import { renderHook } from '@testing-library/react'
import { useRedirectTimeout } from './useRedirectTimeout'

const defineUrl = (url: string) => {
  Object.defineProperty(window, 'location', {
    writable: true,
    value: {
      href: url,
    },
  })
}

afterEach(() => {
  vi.clearAllTimers()
})

describe('useRedirectTimeout', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  it('should redirect after the specified timeout', async () => {
    const redirectPath = 'redirecta'
    const timeout = 1000

    defineUrl('')

    renderHook(() => useRedirectTimeout(timeout, redirectPath))

    vi.advanceTimersByTime(timeout)

    expect(window.location.href).toEqual(redirectPath)
  })
})
