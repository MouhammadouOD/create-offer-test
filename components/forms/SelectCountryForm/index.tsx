import React, { ReactElement, useEffect, useState } from 'react'
import { CountryDropdown } from 'react-country-region-selector'
import { ErrorForm, LabelForm } from '..'
import { useController, useForm } from 'react-hook-form'
import { PropsForm } from '@/types/formType/props-form'

interface PropsSelectForm extends PropsForm {
  value: string
  setValue?: ReturnType<typeof useForm>['setValue']
}

const SelectCountryForm = ({
  id,
  name: nameField,
  value: valueField,
  errors,
  required,
  setValue,
  placeholder,
  label,
  disabled = false,
  control,
  ...props
}: PropsSelectForm): ReactElement => {
  const {
    field: { onChange, name, value, ref }
  } = useController({
    name: nameField,
    control,
    rules: { required: required ? true : false },
    defaultValue: valueField
  })
  const [country, setCountry] = useState<string>('')

  useEffect(() => {
    if (setValue && value && name) {
      setValue(name, value)
      setCountry(value)
    }
    return () => {}
  }, [value])

  return (
    <>
      <LabelForm
        htmlFor={id}
        name={label ? String(label) : 'Pays'}
        required={required}
      />
      {props.infoMessage}
      <CountryDropdown
        id={id}
        name={name}
        ref={ref}
        value={country}
        defaultOptionLabel={placeholder ? placeholder : 'Indiquer le pays'}
        classes={`text-lg  appearance-none border rounded-md w-full px-3 py-2 leading-tight focus:outline-none focus:shadow-md dark:bg-dark-light text-gray-700 dark:text-gray-200 dark:border-dark-light ${
          errors ? 'border border-red-500' : ''
        }`}
        disabled={disabled}
        onChange={onChange}
        style={{
          marginTop: '0px'
        }}
      />
      {errors && <ErrorForm>{String(errors)}</ErrorForm>}
    </>
  )
}

export default SelectCountryForm
