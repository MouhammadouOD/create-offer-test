import React, { ReactElement, useEffect, useState } from 'react'
import { RegionDropdown } from 'react-country-region-selector'
import { ErrorForm, LabelForm } from '..'
import { useController, useForm } from 'react-hook-form'
import { PropsForm } from '@/types/formType/props-form'

interface PropSelectRegionsForm extends PropsForm {
  value: string
  unregister?: ReturnType<typeof useForm>['unregister']
  setValue?: ReturnType<typeof useForm>['setValue']
  country: string
}

export const SelectRegionForm = ({
  id,
  name: nameField,
  value: valueField,
  register,
  country,
  errors,
  required,
  setValue,
  placeholder,
  label,
  disabled = false,
  control,
  ...props
}: PropSelectRegionsForm): ReactElement => {
  const {
    field: { onChange, name, value, ref }
  } = useController({
    name: nameField,
    control,
    rules: { required: required ? true : false },
    defaultValue: valueField
  })
  const [region, setRegion] = useState<string>(value)

  useEffect(() => {
    if (setValue && value && name) {
      setValue(name, value)
      setRegion(value)
    }
  }, [register, value])

  return (
    <>
      <LabelForm
        htmlFor={id}
        name={label ? String(label) : 'Régiom'}
        required={required}
      />
      {props.infoMessage}
      <RegionDropdown
        id={id}
        name={name}
        ref={ref}
        country={country}
        value={region}
        defaultOptionLabel={placeholder ? placeholder : 'Indiquer votre région'}
        classes={`text-lg  appearance-none border rounded-md w-full px-3 py-2 leading-tight focus:outline-none focus:shadow-md dark:bg-dark-light text-gray-700 dark:text-gray-200 dark:border-dark-light ${
          errors ? 'border border-red-500' : ''
        }`}
        disabled={disabled}
        onChange={onChange}
        style={{
          marginTop: '0px'
        }}
      />
      {errors ? (
        <ErrorForm>
          <div>{String(errors)}</div>
        </ErrorForm>
      ) : null}
    </>
  )
}

export default SelectRegionForm
