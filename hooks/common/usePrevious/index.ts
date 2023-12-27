import { useRef, useEffect } from 'react'

/**
 * Hook to maintain value of React prop/state between successive renders
 *
 * @param {*} value value to maintain on next render
 *
 * @returns {*} previous value passed into hook (undefined on first iteration)
 *
 * @example
 * const { value } = props
 * const previousValue = usePrevious(value)
 *
 * if(value !== previousValue) {
 *   // props changed
 * }
 *
 */
const usePrevious = (value: any) => {
  const ref = useRef()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}

export default usePrevious
