import get from 'lodash/get'

const environment: EnvironmentString = (process.env.NODE_ENV ||
  /* istanbul ignore next */
  'development') as EnvironmentString
const deployEnvironment: EnvironmentString = (process.env.DEPLOY_ENV ||
  environment) as EnvironmentString

const getEndpointurl = () => {
  let endpointUrl: string | null
  if (process.env.NEXT_PUBLIC_API_STAGING_URL) {
    // endpointUrl = process.env.NEXT_PUBLIC_API_PROD_URL
    endpointUrl = process.env.NEXT_PUBLIC_API_STAGING_URL
  } else {
    endpointUrl = null
  }
  return endpointUrl
}

const config: Config = {
  website: process.env.NEXT_PUBLIC_WEBSITE || 'https://www.omedema.com',
  environment,
  deployEnvironment,
  port: parseInt(process.env.PORT || '4000', 10),
  isBrowser: get(process, 'browser', false) === true,
  endpoint: getEndpointurl() || process.env.API_DEV_URL!, /*  */
  defaultLanguage: process.env.NEXT_PUBLIC_DEFAULT_LANGUAGE || 'fr',
  sessionSecret: process.env.SESSION_SECRET || 'test',
  acceptedLanguages: (process.env.ACCEPTED_LANGUAGES || 'fr,en').split(','),
  currency: {
    default: {
      code: 'EUR'
    }
  },
  ssl: {
    redirect: process.env.SSL_REDIRECT === 'true'
  },
  nextAuth: {
    secret: process.env.NEXTAUTH_SECRET || 'aaaaaaaa'
  },
  legacyPages: {
    faq: process.env.FAQ_LEGACY_PAGE || 'https://www.omedema.com/aide',
    termOfService:
      process.env.TERM_OF_SERVICE || 'https://www.omedema.com/aide',
    privacyPolicy: process.env.PRIVACY_POLICY || 'https://www.omedema.com/aide'
  },
  googleAnalyticsTrackingID: ''
}

export default config
