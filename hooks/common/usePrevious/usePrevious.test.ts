import { renderHook } from '@testing-library/react'
import usePrevious from '.'

describe('usePrevious', () => {
  it('should return previous state if state updated', () => {
    const INITIAL = 0
    const UPDATE = 10
    const { result, rerender } = renderHook(value => usePrevious(value), {
      initialProps: INITIAL
    })

    rerender(UPDATE)

    expect(result.current).toBe(INITIAL)

    rerender(INITIAL)

    expect(result.current).toBe(UPDATE)
  })
})
