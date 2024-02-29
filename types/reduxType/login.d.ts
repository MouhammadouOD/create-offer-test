import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGIN_ME,
  LOGOUT,
  LOGOUT_REQUEST,
  DELETE_TOKEN,
  ADD_TOKEN
} from '@/redux/login/login.constants'

export type LoginState = {
  isAuth: boolean
  token: string
  error: string | null
  loading: boolean
}

export interface IActionLoginRequest {
  //type: typeof LOGIN_REQUEST
  loading: boolean
}

export interface IActionLoginMe {
  //type: typeof LOGIN_ME
}

export interface IActionLoginSuccess {
  //type: typeof LOGIN_SUCCESS
  isAuth: boolean
  loading: boolean
}

export interface IActionLoginError {
  //type: typeof LOGIN_ERROR
  error: string
  isAuth: boolean
  loading: boolean
}

export interface IActionLoginDeleteToken {
  //type: typeof DELETE_TOKEN
}

export interface IActionLoginAddToken {
  //type: typeof ADD_TOKEN
  token: string
}

export interface IActionLoginLogout {
  //type: typeof LOGOUT
  loading: boolean
}

export interface IActionLoginRequestLogout {
  //type: typeof LOGOUT_REQUEST
}

type ActionLoginTypes =
  | typeof LOGIN_REQUEST
  | typeof LOGIN_ME
  | typeof LOGIN_SUCCESS
  | typeof LOGIN_ERROR
  | typeof DELETE_TOKEN
  | typeof ADD_TOKEN
  | typeof LOGOUT
  | typeof LOGOUT_REQUEST
