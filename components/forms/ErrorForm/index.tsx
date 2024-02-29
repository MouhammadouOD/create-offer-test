import React, { PropsWithChildren, ReactElement } from 'react'

type Props = PropsWithChildren<{}>

const ErrorForm = ({ children }: Props): ReactElement => {
  return <span className='text-sm font-normal text-red-500'>{children}</span>
}

export default ErrorForm
