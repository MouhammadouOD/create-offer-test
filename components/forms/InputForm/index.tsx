import React from 'react'
import { ErrorForm, LabelForm } from '..'
import { PropsForm } from '@/types/formType/props-form'

const InputForm = ({
  id,
  name,
  type,
  full = true,
  disabled = false,
  required,
  register,
  errors,
  ...props
}: PropsForm) => {
  const fullCss = full ? 'w-full' : ''
  const disabledCss = disabled ? 'bg-gray-300 cursor-not-allowed' : ''
  const errorCss = errors ? 'border-red-500' : ''
  return (
    <div>
      {type !== 'hidden' && (
        <LabelForm htmlFor={id} name={name} required={required} />
      )}
      <input
        id={id}
        type={type}
        placeholder={name}
        disabled={disabled}
        {...register}
        {...props}
        className={`border border-gray-300 rounded-md px-3 py-2 text-lg text-gray-700 focus:outline-1 focus:outline-orange-400 focus:text-gray-700  ${fullCss} ${disabledCss} ${errorCss}`}
      />
      {errors && <ErrorForm>{String(errors)}</ErrorForm>}
    </div>
  )
}

export default InputForm
