import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { IntlProvider } from 'react-intl'
import { LangContext } from '.'
import { ILangContext } from './LangContext'
import locale_en from '@/translations/en.json'
import locale_fr from '@/translations/fr.json'
import { useRouter } from 'next/router'

type Props = PropsWithChildren<{}>

const LangProvider = ({ children }: Props) => {
  const router = useRouter()
  const { locale, pathname } = router
  const langContext: ILangContext = useContext(LangContext)
  const [lang, setLang] = useState<ILangContext>(langContext)

  useEffect(() => {
    if (window && window.localStorage.getItem('lang') !== null) {
      const langLocale = window.localStorage.getItem('lang')!
      updateLang(langLocale)
    } else if (locale) {
      updateLang(locale)
    }
  }, [])

  const toggleLang = (): void => {
    const langLocale = lang.locale === 'fr' ? 'en' : 'fr'
    updateLang(langLocale)
  }

  const updateLang = (locale: string): void => {
    setLang(prevState => ({ ...prevState, locale }))
    localStorage.setItem('lang', locale)
    router.push(pathname, pathname, { locale, shallow: true })
  }

  const messagesLang: any = {
    fr: locale_fr,
    en: locale_en
  }

  const contextValue = {
    ...lang,
    toggleLang: toggleLang
  }

  return (
    <LangContext.Provider value={contextValue}>
      <IntlProvider
        locale={lang.locale}
        key={lang.locale}
        defaultLocale={lang.defaultLocale}
        messages={messagesLang[lang.locale]}
      >
        {children}
      </IntlProvider>
    </LangContext.Provider>
  )
}
export default LangProvider
