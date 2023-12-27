type TypeFormData = {
  typeOffer: string
  target: string
  typeResponse: string
  displayName: boolean
  public: boolean
}

type InfosOfferFormData = {
  title: string
  countries: INameFrEn[] | undefined
  categories: INameFrEn[] | undefined
  closingDate: Date
  closingDateHour: Date
}

type DetailsOfferFormData = {
  budget: number
  budgetCurrency: string
  deadlineStart: Date
  deadlineEnd: Date
}

type DescriptionOfferFormData = {
  description: string
}

type ConditionsOfferFormData = {
  termsConditionsAward: string | undefined
  selectionCriteria: string | undefined
  criteriaJudgingOffers: string | undefined
}

type FilesOfferFormData = {
  files: File[] | undefined
}

type CreateOfferComponentProps = {
  register?: UseFormRegister<FieldValues>;
  watch?: UseFormWatch<FieldValues>;
  setFocus?: UseFormSetFocus<FieldValues>;
  formState?: FormState<FieldValues>;
  getValues?: UseFormGetValues<FieldValues>;
  setValue?: UseFormSetValue<FieldValues>;
  control?: Control<FieldValues, any>
};

type AllFormsCreateOffer =
  | TypeFormData
  | InfosOfferFormData
  | DetailsOfferFormData
  | DescriptionOfferFormData
  | FilesOfferFormData
  | ConditionsOfferFormData
  | CreateOfferComponentProps
