type EnvironmentString = 'test' | 'development' | 'staging' | 'production'

type Config = {
  website: string
  environment: EnvironmentString
  deployEnvironment: EnvironmentString
  port: number
  isBrowser: boolean
  endpoint: string
  sessionSecret: string
  defaultLanguage: string
  acceptedLanguages: string[]
  currency: {
    default: {
      code: 'EUR'
    }
  }
  ssl: {
    redirect: boolean
  }
  nextAuth: {
    secret: string
  }
  legacyPages: {
    faq: string
    termOfService: string
    privacyPolicy: string
  }
  googleAnalyticsTrackingID: string
}
