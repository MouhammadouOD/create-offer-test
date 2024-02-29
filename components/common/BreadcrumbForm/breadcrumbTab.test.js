import React from 'react'
import { testUtils } from '../../../helpers'
import '@testing-library/jest-dom'
import BreadcrumbTab from '.'
import dataTab from './data'

const { render, screen, renderer } = testUtils

describe('BreadcrumbTab', () => {
  it('Should render Snapshot', async () => {
    const component = renderer.create(
      <BreadcrumbTab
        id={dataTab.id}
        name={dataTab.name}
        isActived={dataTab.isActived}
        isValidated={dataTab.isValidated}
        content={dataTab.content}
      />
    )
    expect(component).toMatchSnapshot()
  })

  it('Should render with good props', async () => {
    const component = render(
      <BreadcrumbTab
        id={dataTab.id}
        name={dataTab.name}
        isActived={dataTab.isActived}
        isValidated={dataTab.isValidated}
        content={dataTab.content}
      />
    )

    const span1 = screen.getByTestId('span1')
    expect(span1).toBeIntheDocument()

    const span2 = screen.getByTestId('span2')
    expect(span2).toHaveAttribute('class', `capitalize font-bold`)
    expect(span2).toHaveTextContent(dataTab.name)
  })
})
