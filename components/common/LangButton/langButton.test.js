import React from 'react'
import { testUtils } from '../../../helpers'
import '@testing-library/jest-dom'
import LangButton from '.'

const { render, screen, renderer } = testUtils

describe('LangButton', () => {
  it('Should render Snapshot', async () => {
    const component = renderer.create(<LangButton />)
    expect(component).toMatchSnapshot()
  })
})
