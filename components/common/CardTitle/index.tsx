import React, { FunctionComponent } from 'react'

type Props = {
  title: string
}

const CardTitle: FunctionComponent<Props> = ({ title }) => {
  return (
    <div>
      <div data-testid='title' className='text-2xl pb-6'>
        {title}
      </div>
      <hr />
    </div>
  )
}
export default CardTitle
