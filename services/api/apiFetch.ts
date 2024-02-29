import 'whatwg-fetch'
import { appEnv } from '../../config'
import { logOut } from '@/helpers/auth'

export const apiFetch = async (
  url: string,
  options?: ObjectDifferentTypes,
  hasAborted?: boolean
) => {
  try {
    const res = await fetch(url, { ...options })
    const results = await res.json()
    if (hasAborted) {
      throw new Error('window.location.href changed while fetching the data')
    }
    if (!res.ok) {
      if (typeof window !== 'undefined') {
        if (res.status === 401) {
          logOut()
        }
        throw new Error(
          results?.response
            ? results.response
            : `Invalid response status: ${res.statusText}. URL was ${res.url} `
        )
      } else {
        //Put code to manage the error
      }
    }
    return results ? results?.response : null
  } catch (error) {
    appEnv.environment !== 'production' &&
      console.error(
        'There has been a problem with fetch data operation: ',
        error
      )
    throw String(error)
  }
}

export function getQueryString(qs: any) {
  if (typeof qs !== 'object') {
    return ''
  }

  const queryString = Object.keys(qs)
    .filter(key => qs[key] !== undefined)
    .map(key => `${encodeURI(key)}=${encodeURI(qs[key])}`)
    .join('&')

  return queryString === '' ? queryString : `?${queryString}`
}
