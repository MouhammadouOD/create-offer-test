import React from 'react'
import { testUtils } from '../../../helpers'
import '@testing-library/jest-dom'
import LoadingSpinner from './data'
import data from '../AlertNotification/data'

const { render, screen, renderer } = testUtils

describe('LoadingSpinner', () => {
  it('Should render Snapshot', async () => {
    const component = renderer.create(
      <LoadingSpinner
        message={data.message}
        displayMessage={data.displayMessage}
        size={data.size}
      />
    )
    expect(component).toMatchSnapshot()
  })
})
