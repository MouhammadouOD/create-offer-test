import React, { ReactElement } from 'react'

type Props = {
  type?: 'normal' | 'upload'
  name?: string
  level?: number
  color?: string
  colorText?: boolean
  sizeText?: 'small' | 'normal' | 'large' | 'xlarge'
  sizeBar?: 'small' | 'normal' | 'large' | 'xlarge'
}

const ProgressBar = ({
  type = 'normal',
  name,
  level = 0,
  color,
  colorText = false,
  sizeText = 'normal',
  sizeBar = 'normal'
}: Props): ReactElement => {
  const colorBg = color ? 'bg-' + color : 'bg-omedema'
  const fontColor = color && colorText ? 'text-' + color : 'text-gray-800'
  const displayLevel = level && level > 100 ? 100 : Math.abs(level)
  let fontSize: string
  let heightBar: string

  switch (sizeText) {
    case 'small':
      fontSize = 'text-sm'
      break
    case 'large':
      fontSize = 'text-lg'
      break
    case 'xlarge':
      fontSize = 'text-xl'
      break
    default:
      fontSize = 'text-base'
  }
  switch (sizeBar) {
    case 'small':
      heightBar = 'h-2 rounded'
      break
    case 'large':
      heightBar = 'h-6 rounded-xl'
      break
    case 'xlarge':
      heightBar = 'h-8 rounded-2xl'
      break
    default:
      heightBar = 'h-4 rounded-lg'
  }

  return (
    <>
      <div className='relative w-full'>
        <div
          data-testid='div'
          className='flex mb-1 items-center justify-between'
        >
          {name && (
            <div>
              <span
                data-testid='span1 '
                className={`${fontSize} font-semibold inline-block py-1 capitalize rounded-full ${fontColor}  dark:text-gray-200`}
              >
                {name}
              </span>
            </div>
          )}
          <div className='text-right'>
            <span
              data-testid='span2'
              className={`text-base font-semibold inline-block ${fontColor}  dark:text-gray-200`}
            >
              {displayLevel}
              {type === 'upload' ? '%' : null}
            </span>
          </div>
        </div>
        <div
          data-testid='div2'
          className={`overflow-hidden ${heightBar} mb-2 text-xs flex bg-gray-200`}
        >
          <div
            data-testid='div3'
            style={{
              width: displayLevel + '%'
            }}
            className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${colorBg}`}
          ></div>
        </div>
      </div>
    </>
  )
}

export default ProgressBar
