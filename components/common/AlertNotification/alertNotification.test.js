import React from 'react'
import { testUtils } from '../../../helpers'
import '@testing-library/jest-dom'
import AlertNotification from '.'
import data from './data'

const { render, screen, renderer } = testUtils

describe('AlertNotification', () => {
  it('Should render Snapshot', async () => {
    const component = renderer.create(
      <AlertNotification message={data.message} type={data.type} />
    )
    expect(component).toMatchSnapshot()
  })

  it('Should render with good props', async () => {
    const component = render(
      <AlertNotification message={data.message} type={data.type} />
    )

    const div1 = screen.getByTestId('displayAlert')
    expect(div1).toHaveAttribute(
      'class',
      `fixed bottom-0 right-0 z-50 flex flex-row justify-between items-center cursor-pointer rounded-md px-4 py-3 my-2 md:px-6 md:py-4 md:my-4 mx-auto text-sm md:text-base 2xl:text-lg w-4/5 lg:w-2/5 2xl:w-2/5  bg-red-200 `
    )

    const span1 = screen.getByTestId('typeNotification1')
    expect(span1).toHaveAttribute(
      'class',
      `inline-block mb-1 h-6 w-6 text-red-600`
    )

    const span2 = screen.getByTestId('typeNotification2')
    expect(span2).toHaveAttribute(
      'class',
      `ml-2 inline-block w-11/12 text-red-800`
    )
    expect(span2).toHaveTextContent(data.message)
  })
})
