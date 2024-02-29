import { useEffect, useState } from 'react'

type ReturnValue = {
  open: boolean
  handleOpenMenu: () => void
}

const useOpenMenu = (ref: React.MutableRefObject<any>): ReturnValue => {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false)
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  const handleOpenMenu = () => {
    setOpen(!open)
  }

  return { open, handleOpenMenu }
}

export default useOpenMenu
