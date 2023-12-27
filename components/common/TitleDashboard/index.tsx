import React from 'react'

type Props = {
  title: string
  align?: 'left' | 'center' | 'right'
}

const TitleDashboard = ({ title, align }: Props) => {
  const textAlign = align ? `text-${align}` : 'text-center'
  return (
    <div data-testid='title' className={`w-full text-xl mb-6 ${textAlign}`}>
      {title}
    </div>
  )
}
export default TitleDashboard
