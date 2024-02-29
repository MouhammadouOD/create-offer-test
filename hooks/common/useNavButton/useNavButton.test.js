import { renderHook, act } from '@testing-library/react'
import useNavButton from '.'

describe('useNavButton', () => {
  it('should return the right nav value', async () => {
    const { result } = renderHook(() => useNavButton())
    expect(result.current.nav).toBe(0)
    act(() => {
      result.current.handleNav(2)
    })
    expect(result.current.nav).toBe(2)
  })
})
