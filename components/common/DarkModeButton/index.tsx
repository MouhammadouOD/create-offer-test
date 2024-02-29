import React, { useContext } from 'react'
import { context } from '../../../contexts'
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs'

const DarkModeButton = () => {
  const { theme, toggleTheme } = useContext(context.ThemeContext)

  return (
    <>
      <div
        className='w-12 h-6 text-lg flex justify-center items-center bg-omedema-vdark border border-omedema-vdark hover:bg-omedema-dark hover:border-omedema-dark rounded-full cursor-pointer'
        onClick={toggleTheme}
      >
        <BsFillMoonFill
          className={theme === 'dark' ? 'visible text-dark' : 'hidden'}
        />
        <BsFillSunFill
          className={theme === 'light' ? 'visible text-white' : 'hidden'}
        />
      </div>
    </>
  )
}

export default DarkModeButton
