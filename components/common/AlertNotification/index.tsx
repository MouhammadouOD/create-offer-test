import React, { ReactElement, useEffect, useState } from 'react'
import { BiCheck, BiX } from 'react-icons/bi'

type Props = {
  message: string | null
  type: TypeNotification
  handleNotification?: (
    message: string | null,
    typeNotif: TypeNotification
  ) => void
}

const AlertNotification = ({
  message,
  type,
  handleNotification
}: Props): ReactElement => {
  const [displayAlert, setDisplayAlert] = useState<'flex' | 'hidden'>('hidden')
  const [notification, setNotification] = useState<string | null>(message)
  const [typeNotification, setTypeNotification] = useState<string | null>(
    type === 'error' ? 'red' : 'green'
  )
  const baseCSS = 'inline-block mb-1 h-6 w-6'

  useEffect(() => {
    setDisplayAlert(message ? 'flex' : 'hidden')
    setNotification(message ? message : null)
    setTypeNotification(type === 'error' ? 'red' : 'green')
    return () => {
      setDisplayAlert('hidden')
      setNotification(null)
    }
  }, [message, type])

  const removeAlert = () => {
    handleNotification && handleNotification('', 'error')
  }

  return (
    <>
      <div
        data-testid='displayAlert'
        className={`fixed bottom-0 right-0 z-50 ${displayAlert} flex-row justify-between items-center cursor-pointer rounded-md px-4 py-3 my-2 md:px-6 md:py-4 md:my-4 mx-auto text-sm md:text-base 2xl:text-lg w-4/5 lg:w-2/5 2xl:w-2/5  bg-${typeNotification}-200 `}
      >
        <div className='w-full flex flex-row items-center'>
          <span className='w-1/12'>
            {typeNotification === 'red' ? (
              <BiX
                data-testid='typeNotification1'
                className={`${baseCSS} text-red-600`}
              />
            ) : (
              <BiCheck className={`${baseCSS} text-green-600`} />
            )}
          </span>
          <span
            data-testid='typeNotification2'
            className={`ml-2 inline-block w-11/12 text-${typeNotification}-800`}
          >
            {notification}
          </span>
        </div>
        <div>
          <BiX className='h-6 w-6' onClick={removeAlert} />
        </div>
      </div>
    </>
  )
}

export default AlertNotification
