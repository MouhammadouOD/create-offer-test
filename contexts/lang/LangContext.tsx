import React from 'react'
import { appEnv } from '../../config'

export interface ILangContext {
  locale: string
  defaultLocale: string
  toggleLang: () => void
}

const LangContext = React.createContext<ILangContext>({
  locale: 'fr',
  defaultLocale: appEnv.defaultLanguage,
  toggleLang: () => {}
})

export default LangContext
