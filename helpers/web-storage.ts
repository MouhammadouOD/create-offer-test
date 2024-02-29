import { getCryptData, getDecryptData } from './crypt'

/**
 * Value exist in localStorage or sessionStorage
 *
 * @param {string} nameStorage - indicate the name of storage
 * @param {string} typeStorage - indicate if is 'local' (localStorage) or 'session' (sessionStorage)
 *
 * @returns {boolean}
 */

const checkValueIfExistInWebStorage = (
  nameStorage: string,
  typeStorage?: 'local' | 'session'
) => {
  const storage =
    typeStorage === 'session' ? window?.sessionStorage : window?.localStorage
  if (storage) {
    return !!storage.getItem(nameStorage)
  }
  return false
}

/**
 * Value in localStorage or sessionStorage
 *
 * @param {string} nameStorage - indicate the name of storage
 * @param {boolean} isParse - indicate if the value is parse or not
 * @param {string} typeStorage - indicate if is 'local' (localStorage) or 'session' (sessionStorage)
 *
 * @returns {any}
 */

const getValueInWebStorage = (
  nameStorage: string,
  isParse?: boolean,
  typeStorage?: 'local' | 'session',
  isCrypt?: boolean
) => {
  const storage =
    typeStorage === 'session' ? window?.sessionStorage : window?.localStorage
  if (storage) {
    const value = storage.getItem(nameStorage)
    const newValue = value && isCrypt ? getDecryptData(value) : value
    return newValue && isParse ? JSON.parse(newValue) : newValue
  }
  return null
}

/**
 * Value in localStorage or sessionStorage
 *
 * @param {string} nameStorage - indicate the name of storage
 * @param {any} valueStorage - indicate the value at save in storage
 * @param {boolean} hasParse - indicate if the value must be parse or not
 * @param {string} typeStorage - indicate if is 'local' (localStorage) or 'session' (sessionStorage)
 *
 * @returns {any}
 */

const saveInWebStorage = (
  nameStorage: string,
  valueStorage: any,
  hasParse?: boolean,
  typeStorage?: 'local' | 'session',
  isCrypt?: boolean
) => {
  const storage =
    typeStorage === 'session' ? window?.sessionStorage : window?.localStorage
  if (storage) {
    const value = hasParse ? JSON.stringify(valueStorage) : valueStorage
    const newValue = isCrypt && !hasParse ? getCryptData(value) : value
    window?.sessionStorage.setItem(nameStorage, newValue)
    return newValue
  }
  return null
}

/**
 * Remove value in localStorage or sessionStorage
 *
 * @param {string} nameStorage - indicate the name of storage
 * @param {string} typeStorage - indicate if is 'local' (localStorage) or 'session' (sessionStorage)
 *
 * @returns {boolean}
 */

const removeValueInWebStorage = (
  nameStorage: string,
  typeStorage?: 'local' | 'session'
) => {
  const storage =
    typeStorage === 'session' ? window?.sessionStorage : window?.localStorage
  if (storage) {
    const value = storage.getItem(nameStorage)
    if (value) {
      storage.removeItem(nameStorage)
      return true
    }
    return false
  }
  return false
}

/**
 * Remove value in localStorage or sessionStorage
 *
 * @param {string} nameStorage - indicate the name of storage
 * @param {string} typeStorage - indicate if is 'local' (localStorage) or 'session' (sessionStorage)
 *
 * @returns {boolean}
 */

const removeAllWebStorage = (typeStorage?: 'local' | 'session') => {
  const storage =
    typeStorage === 'session' ? window?.sessionStorage : window?.localStorage
  if (storage) {
    storage.clear()
    return true
  }
  return false
}

export default {
  checkValueIfExistInWebStorage,
  getValueInWebStorage,
  saveInWebStorage,
  removeValueInWebStorage,
  removeAllWebStorage
}
