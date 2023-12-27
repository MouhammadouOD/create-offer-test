import React from 'react'
import { testUtils } from '../../../helpers'
import '@testing-library/jest-dom'
import DarkModeButton from '.'
import data from './data'

const { render, screen, renderer } = testUtils

describe('DarkModeButton', () => {
  it('Should render Snapshot', async () => {
    const component = renderer.create(<DarkModeButton />)
    expect(component).toMatchSnapshot()
  })
})
