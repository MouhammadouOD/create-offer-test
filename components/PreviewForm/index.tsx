import React from 'react'
import PreviewFormCard from './PreviewFormCard'

type Values = {
  [x: string]: AllFormsSignUp | AllFormsCreateOffer | null
}
type Props = {
  section: PreviewFormSection
  listValues: Values
  hasActivatedScrolling?: boolean
}

const PreviewForm = ({ section, listValues, hasActivatedScrolling }: Props) => {
  const hasScrolling = hasActivatedScrolling
    ? 'xl:overflow-y-auto xl:h-3/5 xl:max-h-[500px]'
    : ''
  return (
    <div className={`w-full space-y-6 bg-gray-100 p-5 ${hasScrolling}`}>
      {listValues &&
        Object.entries(listValues).map(([title, values], index) => (
          <PreviewFormCard
            key={index}
            section={section}
            title={title}
            values={values}
          />
        ))}
    </div>
  )
}

export default PreviewForm
