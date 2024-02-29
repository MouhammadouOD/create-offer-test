import { PropsWithChildren } from 'react'
import * as ThemeContext from './Theme'
import * as LangContext from './lang'
import * as AlertContext from './alert'

type Props = PropsWithChildren<{}>

export const context = { ...ThemeContext, ...LangContext, ...AlertContext }

const Contexts = ({ children }: Props) => {
  return (
    <LangContext.LangProvider>
      <ThemeContext.ThemeProvider>{children}</ThemeContext.ThemeProvider>
    </LangContext.LangProvider>
  )
}

export default Contexts
