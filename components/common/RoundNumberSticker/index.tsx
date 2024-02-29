import React from 'react'

type Props = {
  content: number | string
  styles?: string
  isActived?: boolean
  isValidated?: boolean
}

const RoundNumberSticker = ({
  styles,
  content,
  isActived,
  isValidated
}: Props) => {
  const isActiveCss = isActived
    ? 'bg-yellow-500 text-white'
    : isValidated
    ? 'bg-green-500 text-white'
    : 'border border-yellow-500 text-yellow-500'
  return (
    <div
      data-testid='div'
      className={`rounded-full h-6 w-6 flex items-center justify-center ${isActiveCss}`}
    >
      {content}
    </div>
  )
}

export default RoundNumberSticker
