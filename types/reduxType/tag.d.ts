import {
  ADD_TAG,
  DELETE_TAG,
  TAG_REQUEST_LOADING,
  TAG_REQUEST_SUCCESS,
  TAG_REQUEST_ERROR
} from '@/redux/tag/tag.constants'

export type TagState = {
  tags: TagData | any
  error: string | null
  loading: boolean
  tagFetched?: TagData | any
}

export interface PayloadTag extends TagData {}

export interface IActionTagRequestLoading {
  //type: typeof TAG_REQUEST_LOADING
  loading: boolean
}

export interface IActionTagRequestSuccess {
  //type: typeof TAG_REQUEST_SUCCESS
  tags: PayloadTag[]
  loading: boolean
}

export interface IActionTagRequestError {
  //type: typeof TAG_REQUEST_ERROR
  error: string
  loading: boolean
}

type ActionTagTypes =
  | typeof ADD_TAG
  | typeof DELETE_TAG
  | typeof TAG_REQUEST_LOADING
  | typeof TAG_REQUEST_SUCCESS
  | typeof TAG_REQUEST_ERROR
