import React from 'react'

type Props = {
  htmlFor: string
  name: string
  required?: boolean
}

const LabelForm = ({ htmlFor, name, required }: Props) => {
  return (
    <label
      htmlFor={htmlFor}
      className='block first-letter:capitalize text-md py-2 text-gray-600'
    >
      {name} {required ? '*' : null} :
    </label>
  )
}

export default LabelForm
