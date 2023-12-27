import React from 'react'
import { testUtils } from '../../../helpers'
import '@testing-library/jest-dom'
import Card from '.'
import data from './data'

const { render, screen, renderer } = testUtils

describe('Card', () => {
  it('Should render Snapshot', async () => {
    const component = renderer.create(
      <Card children={data.children} className={data.className} />
    )
    expect(component).toMatchSnapshot()
  })

  it('Should render with good props', async () => {
    const component = render(
      <Card children={data.children} className={data.className} />
    )

    const card = screen.getByTestId('CardComponent')

    expect(card).toHaveAttribute(
      'class',
      `p-10 rounded-2xl bg-white ${data.className}`
    )
    expect(card).toContainHTML(data.children)
  })
})
