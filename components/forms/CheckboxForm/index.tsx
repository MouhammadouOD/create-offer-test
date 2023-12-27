import { PropsForm } from '@/types/formType/props-form'
import React, { ReactElement, useEffect, useState } from 'react'
import { ErrorForm } from '..'

interface Props extends PropsForm {
  defaultChecked?: boolean
  checked?: boolean
  onClick?: (e?: any) => void
}

const CheckboxForm = ({
  children,
  register,
  errors,
  label,
  sizeField,
  infoMessage,
  defaultChecked,
  ...props
}: Props): ReactElement => {
  const [checked, setChecked] = useState<boolean>()

  useEffect(() => {
    setChecked(!!defaultChecked)
  }, [defaultChecked])

  return (
    <>
      {infoMessage}
      <label
        className={`text-md text-gray-800 select-none cursor-pointer dark:text-gray-200`}
      >
        <input
          type='checkbox'
          {...props}
          {...register}
          defaultChecked={checked}
          className={'cursor-pointer ' + (sizeField !== 'small' && 'h-4 w-4')}
        />{' '}
        {children}
      </label>
      {errors && <ErrorForm>{String(errors)}</ErrorForm>}
    </>
  )
}

export default CheckboxForm
