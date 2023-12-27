import usePreviewForm from '@/hooks/common/usePreviewForm'
import React from 'react'

type Props = {
  label: string
  value: string
  section: string
}

const PreviewFormItem = ({ label, value, section }: Props) => {
  const isObject = typeof value === 'object'

  const { previewLabel, previewValue } = usePreviewForm(
    section,
    label,
    isObject ? value : JSON.stringify(value)
  )
  return previewLabel ? (
    <div className='py-1 w-full'>
      {previewLabel !== 'fichiers' ? (
        <>
          <span className='font-medium first-letter:capitalize'>
            {previewLabel} :
          </span>{' '}
          <span className='first-letter:capitalize text-gray-600'>
            {previewValue}
          </span>
        </>
      ) : (
        <div className='flex flex-col space-y-2'>
          {previewValue.split(',').map((value, index) => (
            <span key={index}>- {value}</span>
          ))}
        </div>
      )}
    </div>
  ) : (
    <div></div>
  )
}

export default PreviewFormItem
