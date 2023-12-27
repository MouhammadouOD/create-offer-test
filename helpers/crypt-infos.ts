import * as cookie from 'cookie'
import { GetServerSidePropsContext } from 'next'
import { storageName } from '../constants'
import { getDecryptData, getCryptData } from './crypt'

type UserInfos = {
  token: string
  userId: number
  status: AccountStatusData
}

const getCryptUserInfos = (user: AccountData, token: string): string => {
  const userInfos = {
    token,
    userId: user.id,
    status: user.status
  }
  const value = getCryptData(userInfos, true)
  return value
}

const getDecryptUserInfos = (context: GetServerSidePropsContext) => {
  const parsedCookies = cookie.parse(
    context.req ? context.req.headers.cookie || '' : document.cookie
  )
  const userInfos: UserInfos = getDecryptData(
    parsedCookies[storageName.COOKIE_TOKEN],
    true
  )
  const { userId, token, status } = userInfos
  return { userId, token, status }
}

export { getCryptUserInfos, getDecryptUserInfos }
