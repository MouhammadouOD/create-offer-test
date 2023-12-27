import React from 'react'
import { RoundNumberSticker } from '@/components/common'

const BreadcrumbTab = ({
  id,
  name,
  isActived,
  isValidated,
  content
}: BreadcrumbTab) => {
  const isActiveCss = isActived || isValidated ? 'font-bold' : 'font-normal'
  return (
    <span
      data-testid='span1'
      className='flex flex-row justify-start items-center space-x-1  pr-2'
    >
      <RoundNumberSticker
        content={!isActived && content ? content : id}
        isActived={isActived}
        isValidated={isValidated}
      />
      <span data-testid='span2' className={`capitalize ${isActiveCss}`}>
        {name}
      </span>
    </span>
  )
}

export default BreadcrumbTab
