import { storageName, apiUrl, page } from '../constants'
import { webStorage } from '.'
import { api } from '../services'
import { addSession, deleteSession } from '../redux/session/sessionSlice'
import { makeStore } from '../store/app/store'
import Router from 'next/router'
import { deleteCookie, setCookie } from 'cookies-next'
import { getCryptUserInfos } from './crypt-infos'

const saveSession = (res: any) => {
  makeStore().dispatch(
    addSession({
      token: res.accessToken,
      tokenExpiresAt: res.accessTokenExpiresAt,
      me: res.user
    })
  )
  const userInfos = getCryptUserInfos(res.user, res.accessToken)
  const newToken = webStorage.saveInWebStorage(
    storageName.SESSION_ID,
    userInfos,
    false,
    'session',
    false
  )
  setCookie(storageName.COOKIE_TOKEN, newToken)
}

const logOut = async () => {
  makeStore().dispatch(deleteSession())
  deleteCookie(storageName.COOKIE_TOKEN)
  await api.fetchData(`${apiUrl.API_LOGOUT}`)
  webStorage.removeAllWebStorage()
  Router.push(page.PAGE_SIGNIN)
}

export { saveSession, logOut }
