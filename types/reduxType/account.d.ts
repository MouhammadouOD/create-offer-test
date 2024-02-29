import {
  LOGIN_REQUEST,
  ACCOUNT_LOADING_UPDATE,
  ACCOUNT_UPDATE_PASSWORD,
  ACCOUNT_UPDATE_REQUEST,
  ACCOUNT_UPDATE,
  ACCOUNT_UPLOAD_AVATAR,
  ACCOUNT_ERROR_REQUEST
} from '@/redux/account/account.constants'

export type AccountStatus = 'member' | 'freelance' | 'company' | 'staff' | null

export type AccountState = {
  status: AccountStatus
  me: AccountData | any
  error: string | null
  loading: boolean
}

export type PayloadAccountUpdatePassword = {
  oldPassword: string
  newPassword: string
  confirmNewPassword: string
}

export interface IActionAccountLoadingUpdate {
  //type: typeof ACCOUNT_LOADING_UPDATE
  loading: boolean
}

export interface IActionAccountUpdatePassword {
  //type: typeof ACCOUNT_UPDATE_PASSWORD
  payload: PayloadAccountUpdatePassword
  accountId: number
}

export interface IActionAccountUpdateRequest {
  //type: typeof ACCOUNT_UPDATE_REQUEST
  payload: AccountData
  accountId: number
  loading: boolean
}

export interface IActionAccountUpdateStatus {
  //type: typeof ACCOUNT_UPDATE_STATUS
  status: AccountStatus
}
export interface IActionAccountUpdate {
  //type: typeof ACCOUNT_UPDATE
  me: AccountData
  loading: boolean
}
export interface IActionAccountUploadAvatar {
  //type: typeof ACCOUNT_UPLOAD_AVATAR
  payload: FormData
  accountId: number
  onUploadProgress: (progressEvent: any) => void
}

export interface IActionAccountErrorRequest {
  //type: typeof ACCOUNT_ERROR_REQUEST
  loading: boolean
}

type ActionAccountTypes =
  | typeof ACCOUNT_LOADING_UPDATE
  | typeof ACCOUNT_UPDATE_PASSWORD
  | typeof ACCOUNT_UPDATE_REQUEST
  | typeof ACCOUNT_UPDATE
  | typeof ACCOUNT_UPLOAD_AVATAR
  | typeof ACCOUNT_ERROR_REQUEST
