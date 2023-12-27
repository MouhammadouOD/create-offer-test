import React, { useContext } from 'react'
import { context } from '../../../contexts'
import ReactFlagsSelect from 'react-flags-select'

const LangButton = () => {
  const { locale, toggleLang } = useContext(context.LangContext)

  return (
    <>
      <ReactFlagsSelect
        className='menu-flags rfs_btn'
        selected={locale === 'en' ? 'GB' : 'FR'}
        onSelect={toggleLang}
        countries={['GB', 'FR']}
        selectedSize={13}
        showOptionLabel={false}
        showSelectedLabel={false}
      />
    </>
  )
}

export default LangButton
