import React from 'react'

export type IAlert = {
  message: string | null
  type: 'error' | 'success' | null
}

export type IAlertContext = {
  alert: IAlert
  openAlert: (message: string, type: 'error' | 'success') => void
  removeAlert: () => void
}

const AlertContext = React.createContext<IAlertContext>({
  alert: { message: null, type: null },
  openAlert: () => {},
  removeAlert: () => {}
})

export default AlertContext
