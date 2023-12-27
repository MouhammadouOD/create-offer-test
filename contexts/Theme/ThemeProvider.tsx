import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState
} from 'react'
import { ThemeContext } from '.'
import { IThemeContext } from './ThemeContext'

type Props = PropsWithChildren<{}>

const ThemeProvider = ({ children }: Props) => {
  const themeContext: IThemeContext = useContext(ThemeContext)
  const [objTheme, setTheme] = useState<IThemeContext>(themeContext)

  useEffect(() => {
    if (window && window.localStorage.getItem('theme') !== null) {
      var theme = window.localStorage.getItem('theme')!
      updateTheme(theme)
    }
  }, [objTheme.theme])

  const toggleTheme = (): void => {
    const theme = objTheme.theme === 'light' ? 'dark' : 'light'
    updateTheme(theme)
  }

  const updateTheme = (theme: string): void => {
    setTheme(prevState => ({ ...prevState, theme }))
    localStorage.setItem('theme', theme)
    document.querySelector('html')!.className = theme
  }

  const contextValue = {
    ...objTheme,
    toggleTheme: toggleTheme
  }

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
      {/* Allow to change the body of app */}
      <style jsx global>{`
        body {
          background-color: ${objTheme.theme === 'light'
            ? '#f7fafc'
            : '#18191a'}!important;
        }
      `}</style>
    </ThemeContext.Provider>
  )
}
export default ThemeProvider
