import React from 'react'

export interface IThemeContext {
  theme: string
  toggleTheme: () => void
}

const ThemeContext = React.createContext<IThemeContext>({
  theme: 'light',
  toggleTheme: () => {}
})

export default ThemeContext
