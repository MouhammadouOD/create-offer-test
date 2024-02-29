import { PropsWithChildren } from 'react'

type Props = PropsWithChildren<{
  className?: string
}>

const Card = ({ className, children }: Props) => {
  return (
    <div
      data-testid='CardComponent'
      className={`p-10 rounded-2xl bg-white ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
