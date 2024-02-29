type AccountStatusData = 'member' | 'freelance' | 'company' | 'staff'
type AccountData = {
  id: number
  firstName: string | null
  lastName: string | null
  fullName: string | null
  email: string
  gender: 'male' | 'female'
  confimEmailUuid: string | null
  isEmailVerified: boolean
  password: string
  language: string
  about: string | undefined
  description: string | undefined
  phone: string | null
  country: string | null
  city: string | null
  region: string | null
  avatar: string | null
  job: string | null
  birthday: Date | null
  lastLogin: Date
  createdAt: Date
  updatedAt: Date
  status: AccountStatusData
  roleId: number
  companyId: number | null
  companyFounderId: number | null
  roleCompanyId: number | null
  facebookUrl: string | null
  twitterUrl: string | null
  linkedinUrl: string | null
  instagramUrl: string | null
  websiteUrl: string | null
  Requirement: Requirement | null
  TagCompetenceUser: INameFrEn[] | []
  UserProfessionalExperiences: AccountProfessionalExperience[] | []
  UserSkills: SkillData[] | []
  UserTargetCountry: INameFrEn[] | []
  UserWaitingListCompany: AccountWaitingListCompany
  Company: CompanyData | null
  Offers: OfferData[] | []
  UserFreelanceInformation: AccountFreelanceInformation
}

type AccountFreelanceInformation = {
  id: number
  AccountId: number
  levelExperience: string
  yearExperience: string
  businessSizeExperience: string
  description: string
  available: boolean
  remoteWorking: boolean
  UserFreelanceMainIndustry: INameFrEn[] | []
  UserFreelanceOtherIndustry: INameFrEn[] | []
  UserFreelanceHeadquarter: INameFrEn
  UserFreelanceAreaActivity: INameFrEn[] | []
  UserFreelanceTargetCountry: INameFrEn[] | []
}

type AccountSkill = {
  id: number
  name: string
  level: number
  order?: number
  colorTailwind?: string
  colorHex?: string
}

type AccountProfessionalExperience = {
  id: number
  job: string
  company: string
  country: string
  city: string | null
  region: string | null
  currentPosition: boolean
  startDate: Date | string
  endDate?: Date | string
  description: string
  new: boolean | undefined
}
