import { renderHook, act } from '@testing-library/react'
import useFetchData from './useFetchData'
import { fetchData } from '../../services/api'

jest.mock('../../services/api', () => ({
  fetchData: jest.fn(() => Promise.resolve({ success: true }))
}))

afterAll(() => {
  jest.restoreAllMocks()
})

describe('useFetchData', () => {
  afterEach(() => {
    jest.clearAllMocks
  })

  it('should return promise response value from hook', async () => {
    const { result, rerender } = renderHook(() => useFetchData('/test'))

    await act(async () => {
      await rerender()
    })

    expect(result.current.result).toEqual({
      success: true
    })
  })

  it('should return error value from hook', async () => {
    fetchData.mockImplementation(() => Promise.reject({ error: true }))

    const { result, rerender } = renderHook(() => useFetchData('/test'))

    await act(async () => {
      await rerender()
    })

    expect(result.current.error).toEqual({
      error: true
    })
  })
})
