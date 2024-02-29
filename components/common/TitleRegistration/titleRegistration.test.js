import React from 'react'
import { testUtils } from '../../../helpers'
import '@testing-library/jest-dom'
import TitleRegistration from '.'
import data from './data'

const { render, screen, renderer } = testUtils

describe('TitleRegistration', () => {
  it('Should render Snapshot', async () => {
    const component = renderer.create(<TitleRegistration title={data.title} />)
    expect(component).toMatchSnapshot()
  })

  it('Should render with good props', async () => {
    const component = render(<TitleRegistration title={data.title} />)

    const title = screen.getByTestId('title')

    expect(title).toHaveTextContent(data.title)
  })
})
