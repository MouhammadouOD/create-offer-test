import React from 'react'
import { testUtils } from '../../../helpers'
import '@testing-library/jest-dom'
import TitleDashboard from '.'
import data from './data'

const { render, screen, renderer } = testUtils

describe('TitleDashboard', () => {
  it('Should render Snapshot', async () => {
    const component = renderer.create(
      <TitleDashboard title={data.title} align={data.align} />
    )
    expect(component).toMatchSnapshot()
  })

  it('Should render with good props', async () => {
    const component = render(
      <TitleDashboard title={data.title} align={data.align} />
    )

    const title = screen.getByTestId('title')

    expect(title).toHaveTextContent(data.title)
    expect(title).toHaveAttribute(
      'class',
      `w-full text-xl mb-6 text-${data.align}`
    )
  })
})
