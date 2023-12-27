import { PropsForm } from '@/types/formType/props-form'
import React, { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorForm, LabelForm } from '..'

interface SelectProps extends SelectPropsForm, PropsForm {
  value: string | number
  setValue?: ReturnType<typeof useForm>['setValue']
  getValues?: ReturnType<typeof useForm>['getValues']
  clearErrors?: ReturnType<typeof useForm>['clearErrors']
}

const SelectForm = ({
  id,
  name,
  register,
  errors,
  label,
  required,
  options,
  value,
  disabled,
  full,
  onChange,
  setValue,
  getValues,
  clearErrors,
  ...props
}: SelectProps): ReactElement => {
  const [selectValue, setSelectValue] = useState(value)
  const fullCss = full ? 'w-full' : ''
  const disabledCss = disabled ? 'bg-gray-300 cursor-not-allowed' : ''
  const errorCss = errors ? 'border-red-500' : ''

  useEffect(() => {
    handleValue(value)
  }, [value])

  const handleValue = (value: string | number) => {
    if (setValue && value && register?.name) {
      setValue(register?.name, value)
      setSelectValue(value)
    }
  }

  return (
    <div>
      <LabelForm htmlFor={id} name={name} required={required} />
      {props.infoMessage}
      <select
        {...props}
        name={register?.name}
        onChange={e => {
          register?.onChange(e)
          handleValue(e.target.value)
          clearErrors && clearErrors() // clear all form
        }}
        onBlur={register?.onBlur}
        ref={register?.ref}
        value={selectValue}
        className={`w-full border border-gray-300 rounded-md px-3 py-2 text-lg bg-white text-gray-700 focus:outline-1 focus:outline-orange-400 focus:text-gray-700  ${fullCss} ${disabledCss} ${errorCss}`}
      >
        {(options as Array<SelectOptionsForm | any>).map(
          (option: SelectOptionsForm) => (
            <option key={option.value} value={option.value} disabled={disabled}>
              {option.label}
            </option>
          )
        )}
      </select>
      {errors && <ErrorForm>{String(errors)}</ErrorForm>}
    </div>
  )
}

export default SelectForm
