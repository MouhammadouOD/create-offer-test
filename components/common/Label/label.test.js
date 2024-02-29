import React from 'react'
import { testUtils } from '../../../helpers'
import '@testing-library/jest-dom'
import Label from '.'
import data from './data'

const { render, screen, renderer } = testUtils

describe('Label', () => {
  it('Should render Snapshot', async () => {
    const component = renderer.create(
      <Label
        children={data.children}
        colorBg={data.colorBg}
        colorText={data.colorText}
        size={data.size}
        colorOutline={data.colorOutline}
      />
    )
    expect(component).toMatchSnapshot()
  })

  it('Should render with good props', async () => {
    const component = render(
      <Label
        children={data.children}
        colorBg={data.colorBg}
        colorText={data.colorText}
        size={data.size}
        colorOutline={data.colorOutline}
      />
    )

    const label = screen.getByTestId('span')

    expect(label).toHaveAttribute(
      'class',
      `py-1 px-3 rounded-md text-xs outline outline-offset-2 outline-1 ${data.colorOutline} ${data.colorText}  ${data.colorBg} ${data.size}`
    )
    expect(label).toHaveTextContent(data.children)
  })

  it('Should render without colorOutline props', async () => {
    const component = render(
      <Label
        children={data.children}
        colorBg={data.colorBg}
        colorText={data.colorText}
        size={data.size}
      />
    )

    const label = screen.getByTestId('span')

    expect(label).toHaveAttribute(
      'class',
      `py-1 px-3 rounded-md text-xs bg-orange-400 text-white ${data.colorText}  ${data.colorBg} ${data.size}`
    )
    expect(label).toHaveTextContent(data.children)
  })
})
