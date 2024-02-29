import { ReactNode } from 'react'
import {
  Control,
  FieldError,
  FieldErrorsImpl,
  Merge,
  UseFormRegisterReturn
} from 'react-hook-form'

type Form = {
  [key: string]: string
}

export interface PropsForm {
  id: string
  name: string
  step?: string
  required?: boolean
  register?: UseFormRegisterReturn
  label?: string | ReactNode
  full?: boolean
  type?: string
  placeholder?: string
  defaultValue?: string | number
  disabled?: boolean
  autoComplete?: string
  min?: number
  max?: number
  errors?:
    | string
    | FieldError
    | Merge<FieldError, FieldErrorsImpl<any>>
    | Partial<{ type: string | number; message: string }>
    | undefined
  children?: string | React.ReactNode
  sizeField?: 'small' | 'normal'
  infoMessage?: string | React.ReactNode
  control?: Control<Form, object>
  onChange?: (date: any) => void
}
