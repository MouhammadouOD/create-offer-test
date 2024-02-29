type MessageFormData = {
  toCompanyId: number | string
  toUserId: number | string
  fromUserId: number | string
  fromCompanyId: number | string
  message: string
  files: File[] | undefined
}
