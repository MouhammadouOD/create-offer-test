import React from 'react'
import { testUtils } from '../../../helpers'
import '@testing-library/jest-dom'
import ProgressBar from '.'
import data from './data'

const { render, screen, renderer } = testUtils

describe('ProgressBar', () => {
  it('Should render Snapshot', async () => {
    const component = renderer.create(
      <ProgressBar
        type={data.type}
        name={data.name}
        level={data.level}
        color={data.color}
        colorText={data.colorText}
        sizeText={data.sizeText}
        sizeBar={data.sizeBar}
      />
    )
    expect(component).toMatchSnapshot()
  })

  it('Should render with good props', async () => {
    const component = render(
      <ProgressBar
        type={data.type}
        name={data.name}
        level={data.level}
        color={data.color}
        colorText={data.colorText}
        sizeText={data.sizeText}
        sizeBar={data.sizeBar}
      />
    )

    const div = screen.getByTestId('div')
    expect(div).toHaveTextContent(data.name)

    const span1 = screen.getByTestId('span1')
    expect(span1).toHaveTextContent(data.name)

    const fontColor =
      data.color && data.colorText ? 'text-' + data.color : 'text-gray-800'
    const displayLevel =
      data.level && data.level > 100 ? 100 : Math.abs(data.level)
    let fontSize = ''
    let heightBar = ''

    switch (data.sizeText) {
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
    switch (data.sizeBar) {
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
    expect(span1).toHaveAttribute(
      'class',
      `${fontSize} font-semibold inline-block py-1 capitalize rounded-full ${fontColor}  dark:text-gray-200`
    )

    const span2 = screen.getByTestId('span2')
    expect(span2).toHaveAttribute(
      'class',
      `text-base font-semibold inline-block ${fontColor}  dark:text-gray-200`
    )
    expect(span2).toHaveTextContent(displayLevel)

    const div2 = screen.getByTestId('div2')
    expect(div2).toHaveAttribute(
      'class',
      `overflow-hidden ${heightBar} mb-2 text-xs flex bg-gray-200`
    )

    const div3 = screen.getByTestId('div3')
    expect(div3).toHaveAttribute('style', 'width: ' + displayLevel + '%;')

    const colorBg = data.color ? 'bg-' + data.color : 'bg-omedema'
    expect(div3).toHaveAttribute(
      'class',
      `shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${colorBg}`
    )
  })
})
