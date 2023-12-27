import { page } from '.'
const {
  PAGE_HOME,
  PAGE_SIGNIN,
  PAGE_SIGNUP,
  PAGE_CONFIRM_EMAIL,
  PAGE_VALIDATION_EMAIL,
  PAGE_VALIDATION_EMAIL_TEST,
  PAGE_FORGOT_PASSWORD,
  PAGE_CONDITION_OF_USE,
  PAGE_PRIVACY,
  PAGE_CREATE_OFFER,
  PAGE_DASHBORD_PROFILE,
  PAGE_PROFIL,
  PAGE_DASHBORD_MESSAGE,
  PAGE_DASHBORD_SETTING,
  PAGE_RESET_PASSWORD,
  PAGE_ADMIN,
  PAGE_OFFERS_ID,
  PAGE_OFFERS,
  PAGE_DASHBORD_OFFERS,
  PAGE_DASHBORD_OFFERS_ID,
  PAGE_DASHBORD_INFORMATIONS
} = page

const UNRESTRICTED_PAGE = [
  PAGE_SIGNIN,
  PAGE_SIGNUP,
  PAGE_CONFIRM_EMAIL,
  PAGE_VALIDATION_EMAIL,
  PAGE_VALIDATION_EMAIL_TEST,
  PAGE_FORGOT_PASSWORD,
  PAGE_CONDITION_OF_USE,
  PAGE_PRIVACY,
  PAGE_RESET_PASSWORD
]

const RESTRICTED_PAGE = [
  PAGE_HOME,
  PAGE_CREATE_OFFER,
  PAGE_DASHBORD_PROFILE,
  PAGE_PROFIL,
  PAGE_DASHBORD_MESSAGE,
  PAGE_DASHBORD_SETTING,
  PAGE_DASHBORD_OFFERS,
  PAGE_CONDITION_OF_USE,
  PAGE_DASHBORD_INFORMATIONS,
  PAGE_PRIVACY,
  PAGE_OFFERS_ID,
  PAGE_CREATE_OFFER,
  PAGE_DASHBORD_OFFERS_ID,
  PAGE_OFFERS
]

const ADMIN_PAGE = [PAGE_ADMIN]

const getIsPage = (pathname: string, pages: string[]) => {
  return pages.find(page => {
    return pathname.includes(page)
  })
}

//Check for normal and dynamic route eg : /page/[id].js
const isUnrestrictedPage = (pathname: string) => {
  return getIsPage(pathname, UNRESTRICTED_PAGE)
}

//Check for normal and  dynamic route eg : /page/[id].js
const isRestrictedPage = (pathname: string) => {
  return getIsPage(pathname, RESTRICTED_PAGE)
}

//Check for normal and  dynamic route eg : /page/[id].js
const isAdminPage = (pathname: string) => {
  return getIsPage(pathname, ADMIN_PAGE)
}

export { isAdminPage, isUnrestrictedPage, isRestrictedPage }
