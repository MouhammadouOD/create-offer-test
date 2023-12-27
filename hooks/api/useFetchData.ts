import { useState, useRef, useEffect } from 'react'
import { fetchData } from '../../services/api'

type Options = {
  qs?: Object
}

type ReturnType = {
  error: string | null
  result: any
  reloadItems: () => Promise<void>
  abortFetch: () => void
  fetchItems: () => Promise<any>
}

const useFetchData = (
  endpoint: string,
  options?: Options,
  firstRequest: boolean = true
): ReturnType => {
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<string | null>(null)
  const [hasAborted, setHasAborted] = useState<boolean>(false)
  const hasFetched = useRef(false)

  const loadDatas = async (): Promise<any> => {
    if (endpoint && !hasFetched.current) {
      const baseOptions = { ...options, hasAborted }
      try {
        const response = await fetchData(endpoint, baseOptions)
        hasFetched.current = true
        return response
      } catch (error: any) {
        setError(error)
      }
    }
  }

  const triggerItems = async (): Promise<any> => {
    try {
      const response = await loadDatas()
      hasFetched.current = true
      setResult(response)
    } catch (error: any) {
      setError(error)
    }
  }

  const fetchItems = async (): Promise<any> => {
    try {
      const response = await loadDatas()
      return response
    } catch (error: any) {
      setError(error)
    }
  }

  useEffect(() => {
    const loadItems = async () => {
      await triggerItems()
    }
    firstRequest && loadItems()
  }, [endpoint, firstRequest])

  const reloadItems = async () => {
    hasFetched.current = false
    await fetchItems()
  }

  const abortFetch = () => {
    hasFetched.current = false
    setHasAborted(true)
  }

  return { error, result, reloadItems, abortFetch, fetchItems }
}

export default useFetchData
