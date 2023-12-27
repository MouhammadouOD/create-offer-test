import React from 'react'
import { testUtils } from '../../../helpers'
import '@testing-library/jest-dom'
import NavButton from '.'
import data from './data'

const { render, screen, renderer } = testUtils

describe('NavButton', () => {
  it('Should render Snapshot', async () => {
    const component =
      render[
        (
          <NavButton
            listNav={data.listNav}
            nav={data.nav}
            onClick={data.onClick}
            className={data.className}
          />
        )
      ]
    expect(component).toMatchSnapshot()
  })

  it('Should render with good props', async () => {
    const component =
      render[
        (
          <NavButton
            listNav={data.listNav}
            nav={data.nav}
            onClick={data.onClick}
            className={data.className}
          />
        )
      ]

    /*const buttons = screen.getBy('button')
        
        expect(buttons.length()).to.Be(1)*/
  })
})
