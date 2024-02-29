import React, { ChangeEvent, useState } from 'react'
import { ErrorForm, LabelForm } from '..'
import { PropsForm } from '@/types/formType/props-form'

interface TextareaProps extends PropsForm {
  size?: number
  value?: string
  limitText?: number
  isResize?: boolean
  className?: string
}

const TextareaForm = ({
  id,
  name,
  size = 2,
  required,
  register,
  limitText,
  value,
  infoMessage,
  isResize = false,
  errors,
  className,
  ...props
}: TextareaProps) => {
  const errorCss = errors ? 'border-red-500' : ''
  const resize = isResize
    ? undefined
    : ({ resize: 'none' } as React.CSSProperties)
  const limitCharacters = limitText ? limitText : null
  const [text, setText] = useState<string | undefined>(value)
  const [nbCharacters, setNbCharacters] = useState<number>(
    text ? text.length : 0
  )

  const handleTextarea = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value
    setNbCharacters(value.length)
    limitCharacters && value.length > limitCharacters ? null : setText(value)
    register?.onChange(e) //Custom onchange from register
  }
  return (
    <div>
      <LabelForm htmlFor={id} name={name} required={required} />
      {infoMessage}
      <textarea
        {...register}
        {...props}
        className={`w-full border border-gray-300 rounded-md p-2 text-md text-gray-700 focus:outline-2 focus:outline-orange-400 focus:text-gray-700 ${className} ${errorCss}`}
        id={id}
        rows={size ? size : 2}
        defaultValue={text}
        onChange={handleTextarea}
        maxLength={limitCharacters ? limitCharacters : undefined}
        style={resize}
      />
      {limitCharacters && (
        <div className='text-sm text-gray-400'>
          Nombre de caractères :{' '}
          <span
            className={
              nbCharacters === limitCharacters
                ? 'font-semibold text-red-500'
                : 'text-gray-800 dark:text-gray-200'
            }
          >
            {nbCharacters}
          </span>
          /{limitCharacters ? limitCharacters : '♾️'}
        </div>
      )}

      {errors && <ErrorForm>{String(errors)}</ErrorForm>}
    </div>
  )
}

export default TextareaForm
