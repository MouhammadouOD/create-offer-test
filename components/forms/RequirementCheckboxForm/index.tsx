import React from 'react'
import { useForm } from 'react-hook-form'
import { ErrorForm, LabelForm } from '..'
import CheckboxForm from '../CheckboxForm'

type Props = {
  label: string
  register: ReturnType<typeof useForm>['register']
  errors: { [x: string]: any }
  required?: boolean
}

const RequirementCheckboxForm = ({
  label,
  register,
  errors,
  required = false
}: Props) => {
  return (
    <>
      <LabelForm htmlFor='#' name={label} required={required} />
      <div className='px-2 space-y-1 flex flex-col lg:flex-row lg:space-y-0'>
        <div className='w-full lg:w-1/2 flex flex-col space-y-0.5'>
          <CheckboxForm
            defaultChecked={false}
            sizeField='small'
            id='find_partners'
            name='find_partners'
            register={register('find_partners')}
          >
            Trouver des partenaires
          </CheckboxForm>
          <CheckboxForm
            defaultChecked={false}
            sizeField='small'
            id='find_suppliers'
            name='find_suppliers'
            register={register('find_suppliers')}
          >
            Trouver des fournisseurs
          </CheckboxForm>
          <CheckboxForm
            defaultChecked={false}
            sizeField='small'
            id='exchange_share'
            name='exchange_share'
            register={register('exchange_share')}
          >
            Echanger et partager
          </CheckboxForm>
          <CheckboxForm
            defaultChecked={false}
            sizeField='small'
            id='find_customers'
            name='find_customers'
            register={register('find_customers')}
          >
            Trouver des clients
          </CheckboxForm>
        </div>
        <div className='w-full lg:w-1/2 flex flex-col space-y-0.5'>
          <CheckboxForm
            defaultChecked={false}
            sizeField='small'
            id='seeks_investor'
            name='seeks_investor'
            register={register('seeks_investor')}
          >
            Trouver des investisseurs
          </CheckboxForm>
          <CheckboxForm
            defaultChecked={false}
            sizeField='small'
            id='find_skills'
            name='find_skills'
            register={register('find_skills')}
          >
            Trouver des compétences
          </CheckboxForm>
          <CheckboxForm
            defaultChecked={false}
            sizeField='small'
            id='trained_for_development'
            name='trained_for_development'
            register={register('trained_for_development')}
          >
            Etre formé pour le développement
          </CheckboxForm>
          <CheckboxForm
            defaultChecked={false}
            sizeField='small'
            id='other'
            name='other'
            register={register('other')}
          >
            Autre
          </CheckboxForm>
        </div>
      </div>

      <div className='w-full'>
        <ErrorForm>{errors?.other?.message}</ErrorForm>
      </div>
    </>
  )
}

export default RequirementCheckboxForm
