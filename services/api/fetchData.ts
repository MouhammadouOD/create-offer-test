import apiSettings from '@/config/apiSettings'
import 'whatwg-fetch'
import { apiFetch, getQueryString } from '.'

export type Options = {
  qs?: Object
  hasAborted?: boolean
  [x: string]: any
}
export const fetchData = async (url: string, options?: Options) => {
  const defaultSettings = await apiSettings()
  const baseOptions = {
    ...defaultSettings,
    method: 'GET',
    headers: {
      ...defaultSettings.headers,
      Accept: 'application/json',
      'Content-Type': 'application/json'
    }
  }

  const queryStringUrl = options?.qs
    ? `${url.split('?')[0]}${getQueryString(options.qs)}`
    : url

  const hasAborted = options?.hasAborted
  const fetchOptions = options ? options : {}

  try {
    const res = await apiFetch(
      queryStringUrl,
      { ...baseOptions, ...fetchOptions },
      hasAborted
    )
    return res
  } catch (error) {
    throw String(error)
  }
}
