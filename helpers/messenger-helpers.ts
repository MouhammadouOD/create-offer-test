import { dayjs } from './'

export const getConversationListAccount = (
  userId: number | undefined,
  companyId: number | null | undefined,
  messenger: MessengerData
) => {
  if (messenger.fromUserId && userId !== messenger.fromUserId) {
    return { typeAccount: 'user', user: messenger.FromUser }
  } else if (messenger.toUserId && userId !== messenger.toUserId) {
    return { typeAccount: 'user', user: messenger.ToUser }
  } else if (messenger.fromCompanyId && companyId !== messenger.fromCompanyId) {
    return { typeAccount: 'company', company: messenger.FromCompany }
  } else if (messenger.toCompanyId && companyId !== messenger.toCompanyId) {
    return { typeAccount: 'company', company: messenger.ToCompany }
  }
}

export const dateMessage = (date: Date | undefined) => {
  const closingDate = date || new Date()
  return 7 >= dayjs(new Date(closingDate)).diff(new Date(), 'days')
    ? dayjs(new Date(closingDate)).fromNow()
    : null
}
