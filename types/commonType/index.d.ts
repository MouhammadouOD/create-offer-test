/// <reference path="./functions.d.ts" />

type BreadcrumbTab = {
  id: number
  name: string
  isActived?: boolean
  isValidated?: boolean
  content?: number | string | null
}

type BreadcrumbTabAction = {
  type:
    | 'ACTIVE'
    | 'NOT_ACTIVE'
    | 'VALIDATED'
    | 'NOT_VALIDATED'
    | 'ADD_CONTENT'
    | 'DELETE_CONTENT'
    | 'VALIDATED_ADD_CONTENT'
  payload: {
    id: number
    content?: number | string
  }
}

type IPagination = {
  currentPage: number
  limitByPage: number
  totalItems: number
  totalPages: number
}

type INameFrEn = {
  id: number
  nameEn: string | null
  nameFr: string | null
  official?: boolean | null
  description?: string | null
}

type IOptionReactSelect = {
  id?: number
  label: string | null
  value: string | null
  __isNew__?: boolean
}

type FileData = {
  id: number
  path: string
  filename: string
}

type Form = {
  [x: string]: string | number | null | undefined
}

type ObjectDifferentTypes = {
  [x: string]: any
}

type FormResearch = {
  [x: string]: string | number | null | undefined | Form
}

type TypeNotification = 'error' | 'success' | null

type NameFile =
  | 'files'
  | 'encrypt-files'
  | 'beta'
  | 'file'
  | 'encrypt-file'
  | 'logo'
  | 'avatar'
  | 'portfolio'

type PropsEditMode = {
  isEditMode?: boolean
  session?: AccountData | null
}
