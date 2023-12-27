// test-utils.js
import { render } from '@testing-library/react'
import renderer from 'react-test-renderer'
import { ReactElement } from 'react'

type Props = {
  children: ReactElement
}

// Add in any providers here if necessary:
// (ReduxProvider, ThemeProvider, etc)
const Providers = ({ children }: Props) => {
  return children
}

const customRender = (ui: any, options = {}) =>
  render(ui, { wrapper: Providers, ...options })

// re-export everything
export * from '@testing-library/react'

// override render method
export { customRender as render, renderer }
