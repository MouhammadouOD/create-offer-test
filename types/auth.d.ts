type SignInData = {
  email: string
  password: string
}

type ForgotPasswordData = {
  email: string
}

type ResetPasswordData = {
  confirmPassword: string
  password: string
  token: string
}

type UserFormData = {
  firstName: string
  lastName: string
  email: string
  country: string
  job: string
}



type AllFormsSignUp =
  | UserFormData
  | StatusFormData
  | InfosFormData
  | FinanceFormData
  | RequirementFormData
