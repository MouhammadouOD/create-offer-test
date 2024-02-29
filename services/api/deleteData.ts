import apiSettings from '@/config/apiSettings'
import 'whatwg-fetch'
import { apiFetch } from '.'

type Options = {
  qs?: Object
  hasAborted?: boolean
  [x: string]: any
}

const deleteData = async (url: string, options?: Options) => {
  const defaultSettings = await apiSettings()
  const baseOptions = {
    ...defaultSettings,
    method: 'DELETE',
    headers: {
      ...defaultSettings.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  const hasAborted = options?.hasAborted
  const fetchOptions = options ? options : {}

  try {
    const res = await apiFetch(
      url,
      { ...baseOptions, ...fetchOptions },
      hasAborted
    )
    return res
  } catch (error) {
    throw String(error)
  }
}

export default deleteData
