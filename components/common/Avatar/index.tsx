import React from 'react'

type Props = {
  img: string
  alt: string
  className?: string
  size?: number
}

const Avatar = ({ img, size, alt, className }: Props) => {
  const imgSize = size ? size : 10
  return (
    <img
      src={img}
      alt={alt}
      className={`rounded-full w-${imgSize} h-${imgSize} ${className}`}
    ></img>
  )
}

export default Avatar
