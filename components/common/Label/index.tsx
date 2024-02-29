import React, { FunctionComponent, PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  colorBg?: string
  colorText?: string
  size?: string
  colorOutline?: string
}>

const Label: FunctionComponent<Props> = ({
  children,
  colorBg,
  colorText,
  colorOutline,
  size
}) => {
  return (
    <span
      data-testid='span'
      className={`py-1 px-3 rounded-md text-xs ${
        colorOutline
          ? 'outline outline-offset-2 outline-1 ' + colorOutline
          : 'bg-orange-400 text-white'
      } ${colorText}  ${colorBg} ${size}`}
    >
      {children}
    </span>
  )
}

export default Label
