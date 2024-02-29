import React from 'react'
import { testUtils } from '../../../helpers'
import '@testing-library/jest-dom'
import RoundNumberSticker from '.'
import data from './data'

const { render, screen, renderer } = testUtils

describe('RoundNumberSticker', () => {
  it('Should render Snapshot', async () => {
    const component = renderer.create(
      <RoundNumberSticker
        styles={data.styles}
        content={data.content}
        isActived={data.isActived}
        isValidated={data.isValidated}
      />
    )
    expect(component).toMatchSnapshot()
  })

  it('Should render with good props', async () => {
    const component = render(
      <RoundNumberSticker
        styles={data.styles}
        content={data.content}
        isActived={data.isActived}
        isValidated={data.isValidated}
      />
    )

    const div = screen.getByTestId('div')

    expect(div).toHaveTextContent(data.content)
    expect(div).toHaveAttribute(
      'class',
      'rounded-full h-6 w-6 flex items-center justify-center bg-yellow-500 text-white'
    )
  })

  it('Should render with isActived to be false and isValidated to be true', async () => {
    const component = render(
      <RoundNumberSticker
        styles={data.styles}
        content={data.content}
        isActived={false}
        isValidated={true}
      />
    )

    const div = screen.getByTestId('div')

    expect(div).toHaveTextContent(data.content)
    expect(div).toHaveAttribute(
      'class',
      'rounded-full h-6 w-6 flex items-center justify-center bg-green-500 text-white'
    )
  })

  it('Should render with isActived and isValidated to be false', async () => {
    const component = render(
      <RoundNumberSticker
        styles={data.styles}
        content={data.content}
        isActived={false}
        isValidated={false}
      />
    )

    const div = screen.getByTestId('div')

    expect(div).toHaveTextContent(data.content)
    expect(div).toHaveAttribute(
      'class',
      'rounded-full h-6 w-6 flex items-center justify-center border border-yellow-500 text-yellow-500'
    )
  })
})
