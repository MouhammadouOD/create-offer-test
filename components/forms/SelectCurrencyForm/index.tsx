import { PropsForm } from '@/types/formType/props-form'
import React, { ReactElement, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { ErrorForm } from '..'
import currencyToSymbolMap from 'currency-symbol-map/map'

interface SelectProps extends SelectPropsForm, PropsForm {
  value: string | number
  setValue?: ReturnType<typeof useForm>['setValue']
  getValues?: ReturnType<typeof useForm>['getValues']
}

const SelectCurrencyForm = ({
  id,
  name,
  register,
  errors,
  label,
  required,
  value,
  disabled,
  full,
  onChange,
  setValue,
  getValues,
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
      <select
        {...props}
        name={register?.name}
        onChange={e => {
          register?.onChange(e)
          handleValue(e.target.value)
        }}
        onBlur={register?.onBlur}
        ref={register?.ref}
        value={selectValue}
        className={`w-full bg-gray-100 border border-none rounded-r-md pl-2 py-2 text-base text-gray-700 focus:outline-1 focus:outline-white focus:text-gray-700  ${fullCss} ${disabledCss} ${errorCss}`}
      >
        {Object.entries(currencyToSymbolMap).map(
          ([currency, symbol]: [string, unknown]) => (
            <option key={currency} value={currency} disabled={disabled}>
              {currency} - {String(symbol)}
            </option>
          )
        )}
      </select>
      {errors && <ErrorForm>{String(errors)}</ErrorForm>}
    </div>
  )
}

export default SelectCurrencyForm
