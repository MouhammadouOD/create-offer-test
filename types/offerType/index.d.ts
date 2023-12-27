interface OfferData {
  createdAt: Date
  id: number
  typeOffer: 'need' | 'call_tender' | 'other' | 'offer'
  statusCreator: 'member' | 'freelance' | 'company' | 'association' | 'staff'
  searchType: string
  displayName: boolean
  title: string
  country: string
  priority: string
  budget: number | null
  budgetCurrency: string | null
  target: 'company' | 'freelance' | 'association' | 'all'
  closingDate: Date
  deadlineStart: Date
  deadlineEnd: Date | null
  deadlinePeriod: string | null
  deadlineNumberPeriod: number | null
  public: boolean
  status: 'cancel' | 'active' | 'validate' | 'inprogress' | 'closed'
  typeResponse: string
  termsConditionsAward: string | null
  selectionCriteria: string | null
  criteriaJudgingOffers: string | null
  adviserId: number
  companyId: number
  freelanceId: number
  creatorId: number
  Adviser: UserData | null
  Freelance: UserData | null
  Creator: UserData | null
  Company: CompanyData | null
  acceptResponses: boolean
  OfferFiles: FileData[] | []
  OfferSections: OfferSectionData[] | []
  CategoryIndustryOffer: INameFrEn[] | []
  ApplicantRespondsOffers: ApplicantRespondsOfferData[] | []
  TagOffer: INameFrEn[] | []
  CountryDestinationOffer: INameFrEn[] | []
  OfferFavorites: OfferFavorites[] | []
}
type OfferFavorites = {
  id: number
  companyId: number | null
  freelanceId: number | null
}

type OfferStatus =
  | 'cancel'
  | 'active'
  | 'validate'
  | 'inprogress'
  | 'closed'
  | undefined

type OfferSectionData = {
  id: number
  lot: number
  offerId: number
  title: string
  description: string
  acceptResponses: boolean
}

type ApplicantRespondsOfferData = {
  id: number
  typeResponse: string
  description: string | null
  offerId: number
  offerSectionId: number | null
  applicantCompanyId: number
  applicantFreelanceId: number
  creatorId: number
  statusResponse: ApplicantResponseStatus
  createdAt: Date
  updateAt: Date
  ApplicantRespondsOfferFiles: FileData[] | []
  Offer: OfferData
  OfferSection: OfferSectionData
  Company: CompanyData | null
  CreatorResponseOffer: UserData
  ApplicantFreelance: UserData | null
  MessengerOffers: MessengerOfferData[] | []
}

type ApplicantResponseStatus = 'accept' | 'reject' | 'noResponse'

type options = {
  value: string
  label: string
}
type OfferCurrencies = options[]
