import React, { useEffect, useRef, useState } from 'react'
import { useForm, UseFormRegisterReturn } from 'react-hook-form'
import { ErrorForm, InputForm, LabelForm } from '..'
import CheckboxForm from '../CheckboxForm'

type Props = {
  name: string
  label: string
  value: string
  register: UseFormRegisterReturn
  errors: { [x: string]: any }
  setValue: ReturnType<typeof useForm>['setValue']
  required?: boolean
}

const BusinessExperienceCheckboxForm = ({
  name,
  label,
  register,
  errors,
  setValue,
  value,
  required = false
}: Props) => {
  const listValues = value ? value.toLowerCase().split(', ') : []
  const hasBeenEdit = useRef(false)
  const [list, setList] = useState<string[] | []>([])

  useEffect(() => {
    if (!!listValues.length && !hasBeenEdit.current) {
      setList(prevState => [...prevState, ...listValues])
      hasBeenEdit.current = true
    }
  }, [listValues])

  useEffect(() => {
    setValue(name, list.join(', '))
  }, [list])

  const handleList = (name: string) => {
    const businessExperience = list.find((text: string) => text === name)
    if (businessExperience) {
      setList(prevState => prevState.filter(value => value !== name))
    } else {
      setList(prevState => [...prevState, name])
    }
  }

  return (
    <>
      <LabelForm htmlFor='#' name={label} required={required} />
      <div className='px-2 space-y-1 flex flex-col lg:flex-row lg:space-y-0'>
        <div className='w-full lg:w-1/2 flex flex-col space-y-0.5'>
          <CheckboxForm
            defaultChecked={
              listValues.includes('startup_company') ? true : false
            }
            sizeField='small'
            id='startup_company'
            name='startup_company'
            onClick={(e: any) => handleList('startup_company')}
          >
            Startup
          </CheckboxForm>
          <CheckboxForm
            defaultChecked={listValues.includes('very_small_company')}
            sizeField='small'
            id='very_small_company'
            name='very_small_company'
            onClick={(e: any) => handleList('very_small_company')}
          >
            Très petite entreprise (1-9 salariés)
          </CheckboxForm>
          <CheckboxForm
            defaultChecked={listValues.includes('small_company')}
            sizeField='small'
            id='small_company'
            name='small_company'
            onClick={(e: any) => handleList('small_company')}
          >
            Petite entreprise (10-99 salariés)
          </CheckboxForm>
        </div>
        <div className='w-full lg:w-1/2 flex flex-col space-y-0.5'>
          <CheckboxForm
            defaultChecked={listValues.includes('mid_company')}
            sizeField='small'
            id='mid_company'
            name='mid_company'
            onClick={(e: any) => handleList('mid_company')}
          >
            Moyenne entreprise (100-999 salariés)
          </CheckboxForm>
          <CheckboxForm
            defaultChecked={listValues.includes('large_company')}
            sizeField='small'
            id='large_company'
            name='large_company'
            onClick={(e: any) => handleList('large_company')}
          >
            Grosse entreprise (1000+ salariés)
          </CheckboxForm>
          <CheckboxForm
            defaultChecked={listValues.includes('fortune500_company')}
            sizeField='small'
            id='fortune500_company'
            name='fortune500_company'
            onClick={(e: any) => handleList('fortune500_company')}
          >
            Fortune 500 (
            <a
              className='text-blue-500 underline'
              href='https://fortune.com/fortune500/'
              target='_blank'
            >
              Liste Fortune 500
            </a>
            )
          </CheckboxForm>
        </div>
      </div>
      <div className='w-full'>
        <ErrorForm>{errors?.businessSizeExperience?.message}</ErrorForm>
      </div>
      {/* This form save the value from CheckboxForm for businessSizeExperience */}
      <div className='hidden'>
        <InputForm
          id={name}
          name={name}
          defaultValue={value}
          type='text'
          required={required}
          register={register}
        />
      </div>
    </>
  )
}

export default BusinessExperienceCheckboxForm
