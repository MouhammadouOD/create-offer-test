import React from 'react'
import BreadcrumbTab from './BreadcrumbTab'

type Props = {
  listTabs: BreadcrumbTab[]
  className?: string
}

const BreadcrumbForm = ({ listTabs, className }: Props) => {
  return (
    <ul className={`flex flex-row flex-wrap list-none ${className}`}>
      {listTabs.map(tab => (
        <li key={tab.id} className='flex-1'>
          <BreadcrumbTab
            id={tab.id}
            name={tab.name}
            isActived={tab.isActived}
            isValidated={tab.isValidated}
            content={tab.content}
          />
        </li>
      ))}
    </ul>
  )
}

export default BreadcrumbForm
