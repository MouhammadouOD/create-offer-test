import React from 'react'
import PreviewFormItem from './PreviewFormItem'
import { listLabelPreviewForm } from '../../helpers/listPreviewFormData'

type Props = {
  title: string
  values: AllFormsSignUp | AllFormsCreateOffer | null
  section: PreviewFormSection
}

const PreviewFormCard = ({ title, values, section }: Props) => {
  const listLabel = listLabelPreviewForm(section)
  const titleCard = listLabel[title as keyof typeof listLabel]
  //Allow to check if one value exist
  const listValues = values
    ? Object.entries(values).filter(([_, value]) => value !== undefined)
    : []

  return (
    <div className='shadow bg-white border border-gray-300 rounded-xl p-10'>
      <h3 className='w-full border-b-2 border-gray-300 pb-4 text-xl mb-2 first-letter:capitalize'>
        {titleCard ? titleCard : title}
      </h3>
      <div className='flex flex-col w-full'>
        {!!listValues.length && values ? (
          Object.entries(values).map(
            ([label, value], index) =>
              value && (
                <PreviewFormItem
                  key={index}
                  label={label}
                  section={section}
                  value={value}
                />
              )
          )
        ) : (
          <span className='italic'>Aucune informations</span>
        )}
      </div>
    </div>
  )
}

export default PreviewFormCard
