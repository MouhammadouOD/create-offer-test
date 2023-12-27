import {
  ADD_CATEGORY,
  DELETE_CATEGORY,
  CATEGORY_REQUEST_LOADING,
  CATEGORY_REQUEST_SUCCESS,
  CATEGORY_REQUEST_ERROR
} from '@/redux/category/category.constants'

export type CategoryState = {
  categories: CategoryData[] | []
  error: string | null
  loading: boolean
  categoryFetched: CategoryData | {}
}

export interface PayloadCategory extends CategoryData {}

export interface IActionCategoryRequestLoading {
  //type: typeof CATEGORY_REQUEST_LOADING
  loading: boolean
}

export interface IActionCategoryRequestSuccess {
  //type: typeof CATEGORY_REQUEST_SUCCESS
  categories: PayloadCategory[]
  loading: boolean
}

export interface IActionCategoryRequestError {
  //type: typeof CATEGORY_REQUEST_ERROR
  error: string
  loading: boolean
}

type ActionCategoryTypes =
  | typeof ADD_CATEGORY
  | typeof DELETE_CATEGORY
  | typeof CATEGORY_REQUEST_LOADING
  | typeof CATEGORY_REQUEST_SUCCESS
  | typeof CATEGORY_REQUEST_ERROR
