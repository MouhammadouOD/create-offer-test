import React from 'react'
import { testUtils } from '../../../helpers'
import '@testing-library/jest-dom'
import CardTitle from '.'
import data from './data'

const { render, screen, renderer } = testUtils

describe('CardTitle', () => {
  it('Should render Snapshot', async () => {
    const component = renderer.create(<CardTitle title={data.title} />)
    expect(component).toMatchSnapshot()
  })

  it('Should render with good props', async () => {
    const component = render(<CardTitle title={data.title} />)

    const title = screen.getByTestId('title')

    expect(title).toHaveTextContent(data.title)
  })
})
