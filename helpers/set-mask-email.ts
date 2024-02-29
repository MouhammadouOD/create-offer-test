import isValidateEmail from './is-valid-email'

const setMaskEmail = (email: string): string => {
  if (!isValidateEmail(email)) return email
  const [uid, provider] = email.split('@')
  if (uid.length < 1) return email
  if (uid.length < 2) return `${uid}@${provider}`
  if (uid.length < 3) return `${uid.substring(0, 2)}***@${provider}`
  return `${uid.substring(0, 4)}***@${provider}`
}

export default setMaskEmail
