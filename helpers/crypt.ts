import { appEnv } from '../config'
import { AES, enc } from 'crypto-js'

const getCryptData = (data: any, isObject: boolean = false): string => {
  const dataHasCrypt = isObject ? JSON.stringify(data) : data
  const ciphertext = AES.encrypt(dataHasCrypt, appEnv.sessionSecret).toString()
  return ciphertext
}

const getDecryptData = (data: string, isObject: boolean = false): any => {
  var bytes = AES.decrypt(data, appEnv.sessionSecret)
  var decryptedData = isObject
    ? JSON.parse(bytes.toString(enc.Utf8))
    : bytes.toString(enc.Utf8)
  return decryptedData
}

export { getCryptData, getDecryptData }
