import { appEnv } from '../config'

export const baseAPIURL = appEnv.endpoint

export const API_SIGNIN = `${baseAPIURL}/signin`
export const API_SIGNUP = `${baseAPIURL}/signup`
export const API_LOGOUT = `${baseAPIURL}/logout`
export const API_SEND_CONFIRM_EMAIL = `${baseAPIURL}/send-confirm-email`
export const API_ACTIVE_ACCOUNT = `${baseAPIURL}/active-account`
export const API_FORGOT_PASSWORD = `${baseAPIURL}/forgot-password`
export const API_CHECKING_TOKEN_RESET_PASSWORD = `${baseAPIURL}/auth/checking-token-reset-password`
export const API_REFRESH_TOKEN = `${baseAPIURL}/auth/refresh-token`
export const API_RESET_PASSWORD = `${baseAPIURL}/reset-password`
export const API_COUNTRIES = `${baseAPIURL}/countries`
export const API_CATEGORIES = `${baseAPIURL}/industries`
export const API_TAGS = `${baseAPIURL}/expertises`
// OFFER
export const API_CREATE_OFFER = `${baseAPIURL}/create-offer`
export const API_OFFERS = `${baseAPIURL}/offers`
export const API_OFFER_FAVORITES = `${baseAPIURL}/offer-favorites`
// APLLICANT
export const API_APPLICANT_RESPONDS_OFFERS = `${baseAPIURL}/applicant-responds-offers`
export const API_APPLICANT_RESPONDS_OFFERS_CONFIRMATION = `${baseAPIURL}/confirmation-applicant-responds-offers`
export const API_SKILLS = `${baseAPIURL}/skills`
export const API_PROFILE_PORTFOLIOS = `${baseAPIURL}/profiles`
// MESSENGER
export const API_MESSENGER = `${baseAPIURL}/messengers`
export const API_MESSENGER_MESSAGE = `${baseAPIURL}/messenger-messages`
export const API_MESSENGER_CONTACT = `${baseAPIURL}/messenger-contacts`
export const API_MESSENGER_NEW_CONVERSATION = `${baseAPIURL}/messenger-new-conversation`
export const API_MESSENGER_NEW_MESSAGE = `${baseAPIURL}/messenger-messages`
export const API_MESSENGER_NUMBER_PAGE_BY_MESSAGE = `${baseAPIURL}/messenger-number-page-by-messages`

//
export const API_USER_FREELANCE_STATUS = (userId: number) =>
  `${baseAPIURL}/users/${userId}/freelance/status`
export const API_COMPANY_STATUS = (companyId: number) =>
  `${baseAPIURL}/companies/${companyId}/status`
export const API_USER_FREELANCE_INFOS = (userId: number) =>
  `${baseAPIURL}/users/${userId}/freelance/infos`
export const API_COMPANY_INFOS = (companyId: number) =>
  `${baseAPIURL}/companies/${companyId}/infos`
export const API_USER_FREELANCE_REQUIREMENT = (userId: number) =>
  `${baseAPIURL}/users/${userId}/freelance/requirements`
export const API_COMPANY_REQUIREMENT = (companyId: number) =>
  `${baseAPIURL}/companies/${companyId}/requirements`

export const API_PORTFOLIO_REQUIREMENT = (typeProfile: string, id: number) =>
  `${baseAPIURL}/profiles/${typeProfile}/${id}/portfolio`

export const API_MESSENGER_DELETE_CONVERSATION = (
  messengerId: number,
  typeAccount: 'user' | 'company',
  accountId: number
) => `${baseAPIURL}/messenger/${messengerId}/${typeAccount}/${accountId}`
/* export const API_PORTFOLIO_REQUIREMENT = (typeProfile: string, id: number) =>
  `${baseAPIURL}/profiles/${typeProfile}/${id}/portfolio` */
