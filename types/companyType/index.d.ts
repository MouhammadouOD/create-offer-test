type CompanyData = {
  id: number
  authorization: 'pending' | 'validate' | 'banned'
  status: 'company' | 'association' | 'institution'
  name: string | null
  entity: string | null
  btob: boolean
  btoc: boolean
  aliases: string[] | []
  logo: string | null
  dateOfCreation: Date | null
  description: string | null
  country: string | null
  city: string | null
  typeCompany: 'startup' | 'eti' | 'pme' | 'corporate'
  emailContact: string | null
  addressCompany: string | null
  domainNames: string[] | []
  numberEmployees: number
  facebookUrl: string | null
  twitterUrl: string | null
  linkedinUrl: string | null
  instagramUrl: string | null
  websiteUrl: string | null
  CategoryMainIndustryCompany: INameFrEn[] | []
  CategoryOtherIndustryCompany: INameFrEn[] | []
  CompanyHeadquarter: INameFrEn[] | []
  CompanyAreaActivities: INameFrEn[] | []
  Requirement: Requirement | null
  TagCompetenceCompany: INameFrEn[] | []
  CompanyTargetCountry: INameFrEn[] | []
  Offers: OfferData[] | []
  Skills: SkillData[] | []
  CompanyClients: CompanyClient[] | []
  CompanyFiles: FileData[] | []
  InformationQualifyCompany: InformationQualifyCompany
}

type CompanyClient = {
  id: number
  name: string
  reference: string
}

type UserWaitingListCompany = {
  id: number
  companyId: number
  createdAt: Date
  invitation: false
  status: 'pending' | 'cancel' | 'validate'
  updatedAt: Date
  userId: number
  User: UserData
  Company: CompanyData
}

type InformationQualifyCompany = {
  revenue: string | undefined
  development: string | undefined
}

interface RequestCompanyRequirementPayload extends Requirement {}
interface RequestCompanyTargetCountryPayload extends IFormCountry {}
