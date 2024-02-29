import React from 'react'

type Props = {
  title: string
}

const TitleRegistration = ({ title }: Props) => {
  return (
    <h1 data-testid='title' className='text-3xl text-gray-800'>
      {title}
    </h1>
  )
}

export default TitleRegistration
