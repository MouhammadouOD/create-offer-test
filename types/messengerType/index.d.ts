interface MessengerData {
  id: number
  offerId: OfferData | null
  offerSectionId: OfferSectionData | null
  applicantRespondsOfferId: ApplicantRespondsOfferData | null
  fromUserId: number | null
  fromCompanyId: number | null
  toUserId: number | null
  toCompanyId: number | null
  adviserId: number | null
  deleteBy: number[] | []
  dateLastMessage: date | null
  createdAt: Date
  status: 'closed' | 'in_progress' | 'approved' | 'archive'
  FromUser: AccountData | null
  FromCompany: CompanyData | null
  ToUser: AccountData | null
  ToCompany: CompanyData | null
  MessengerMessages: MessengerMessageData[]
  Offer: OfferData | null
  createdAt: Date
  updatedAt: Date
}

interface MessengerMessageData {
  id: number
  message: string
  messengerId: id
  creatorId: number
  companyId: number | null
  adviserId: number | null
  dateSent: Date
  createdAt: Date
  dateRead: Date | null
  AdviserMOM: AccountData
  CreatorMOM: AccountData
  Company: CompanyData
  Messenger: MessengerData
}

interface MessengerMessageFileData {
  id: number
  path: string
  name: string
  messengerMessageId: number
}
