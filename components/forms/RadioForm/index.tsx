import { PropsForm } from '@/types/formType/props-form'
import React, { ReactElement } from 'react'
import { ErrorForm } from '..'
interface Props extends PropsForm {
  value: string | number | boolean
  defaultChecked?: boolean
  checked?: boolean
  onChange?: (e?: any) => void
}
const RadioForm = ({
  children,
  errors,
  label,
  value,
  sizeField,
  infoMessage,
  register,
  ...props
}: Props): ReactElement => {
  return (
    <>
      {infoMessage}
      <label
        className={`text-md text-gray-800 select-none cursor-pointer dark:text-gray-200`}
      >
        <input
          type='radio'
          {...props}
          {...register}
          value={String(value)}
          className={'cursor-pointer ' + (sizeField !== 'small' && 'h-4 w-4')}
        />{' '}
        {children}
      </label>
      {errors && <ErrorForm>{String(errors)}</ErrorForm>}
    </>
  )
}
export default RadioForm
