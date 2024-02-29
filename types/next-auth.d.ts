import 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken: string
    accessTokenExpiresAt: number
    user: AccountData | undefined
    status: AccountStatusData | undefined
    CompanyId: number | undefined | null
    userCompetence: INameFrEn[] | [] | undefined
    userFreelance: AccountFreelanceInformation | undefined
    userMainIndustry: INameFrEn[] | [] | undefined
    userOtherIndustry: INameFrEn[] | [] | undefined
    userProExp: AccountProfessionalExperience[] | [] | undefined
    userRequirement: Requirement | null
    userSkills: AccountSkill[] | [] | undefined
    userTargetCountry: INameFrEn[] | [] | undefined
    userWaitingListCompany: AccountWaitingListCompany
    Company: CompanyData | undefined | null
    userOffers: OfferData[] | []
  }

  interface User {
    accessToken: string
    accessTokenExpiresAt: number
    user: any
  }

  interface Account {}

  interface Profile {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken: string
    accessTokenExpiresAt: number
    user?: AccountData
    error?: any
  }
}
