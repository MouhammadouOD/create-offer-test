import React from 'react'
import '@testing-library/jest-dom'
import Avatar from '.'
import data from './data'
import { testUtils } from '../../../helpers'

const { render, screen, renderer } = testUtils

describe('Avatar', () => {
  it('Should render Snapshot', async () => {
    const component = renderer.create(
      <Avatar
        img={data.img}
        alt={data.alt}
        size={data.size}
        className={data.className}
      />
    )
    expect(component).toMatchSnapshot()
  })

  it('Should render with good props', async () => {
    const component = render(
      <Avatar
        img={data.img}
        alt={data.alt}
        size={data.size}
        className={data.className}
      />
    )

    const image = screen.getByRole('img')

    expect(image).toHaveAttribute(
      'class',
      `rounded-full w-${data.size} h-${data.size} ${data.className}`
    )
    expect(image).toHaveAttribute('alt', data.alt)
  })
})
