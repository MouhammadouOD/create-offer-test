import { useState } from 'react'

const useNavButton = () => {
  const [nav, setNav] = useState<number>(0)

  const handleNav = (value: number) => {
    setNav(value)
  }

  return { nav, handleNav }
}
export default useNavButton
