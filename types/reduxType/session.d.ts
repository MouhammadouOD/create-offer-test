interface Session {
  user: AccountData | undefined
  status: AccountStatusData | undefined
  CompanyId: number | undefined | null
  userCompetence: INameFrEn[] | [] | undefined
  userFreelance: AccountFreelanceInformation | undefined
  userProExp: AccountProfessionalExperience[] | [] | undefined
  userRequirement: Requirement | null
  userSkills: AccountSkill[] | [] | undefined
  userTargetCountry: INameFrEn[] | [] | undefined
  userWaitingListCompany: AccountWaitingListCompany
  Company: CompanyData | undefined | null
  userOffers: OfferData[] | []
}

type SessionState = {
  isAuth: boolean
  isLoading: boolean
  token: string | null
  tokenExpiresAt: string | null
  me: AccountData | null
}

interface PayloadAddSession {
  token: string
  tokenExpiresAt: string
  me: AccountData
}

interface PayloadAddToken {
  token: string
}
