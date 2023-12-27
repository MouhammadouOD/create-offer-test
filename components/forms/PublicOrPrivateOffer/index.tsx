import React from 'react'
import { UseFormRegisterReturn } from 'react-hook-form'
import { ErrorForm, LabelForm } from '..'
import RadioForm from '../RadioForm'
type Props = {
  label: string
  nameError: string
  value: boolean | undefined
  register: UseFormRegisterReturn
  error?: string
  hasOutline: boolean
  required?: boolean
}
const PublicOrPrivateOffer = ({
  label,
  register,
  value,
  error,
  nameError,
  hasOutline = false,
  required = false
}: Props) => {
  const cssCheckbox = hasOutline
    ? 'border border-gray-300 rounded-xl py-3 pl-2 pr-16 w-1/2'
    : ''
  return (
    <>
      <LabelForm htmlFor='#' name={label} required={required} />
      <div className='space-y-1 flex flex-col lg:flex-row lg:space-y-0'>
        <div
          className={`w-full lg:w-1/2 flex flex-row space-x-2 ${
            error && error !== 'undefined' && 'border border-red-400 rounded-xl'
          }`}
        >
          <label htmlFor='public' className={`cursor-pointer ${cssCheckbox}`}>
            <RadioForm
              defaultChecked={value ? true : value !== null ? false : true}
              sizeField='small'
              id='public'
              value='true'
              name={nameError}
              register={register}
            >
              Publique
            </RadioForm>
          </label>
          <label htmlFor='private' className={`cursor-pointer ${cssCheckbox}`}>
            <RadioForm
              defaultChecked={!value ? true : false}
              sizeField='small'
              id='private'
              value='false'
              name={nameError}
              register={register}
            >
              Privée
            </RadioForm>
          </label>
        </div>
      </div>
      <div className='w-full'>
        {error && error !== 'undefined' && (
          <ErrorForm>{String(error)}</ErrorForm>
        )}
      </div>
    </>
  )
}
export default PublicOrPrivateOffer
