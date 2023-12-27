import { useState } from 'react'

const useAlertNotification = () => {
  const [messageNotification, setMessageNotification] = useState<string | null>(
    null
  )
  const [typeNotification, setTypeNotification] =
    useState<TypeNotification>(null)

  const handleNotification = (
    message: string | null,
    typeNotif: TypeNotification
  ) => {
    setMessageNotification(String(message))
    setTypeNotification(typeNotif)
  }

  return { messageNotification, typeNotification, handleNotification }
}

export default useAlertNotification
