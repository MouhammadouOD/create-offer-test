import { makeStore } from '@/store/app/store'

type ReturnBaseOptions = {
  method: string
  credentials: RequestCredentials
  headers: HeadersInit
}

const baseOptions = async (): Promise<ReturnBaseOptions> => {
  const state = makeStore().getState()

  return {
    method: 'GET',
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      Authorization: state?.session?.token
        ? `Bearer ${state?.session?.token}`
        : ''
    }
  }
}

export default baseOptions
