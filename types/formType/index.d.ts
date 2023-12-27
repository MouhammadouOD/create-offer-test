type PreviewFormSection = 'firstConnection' | 'createOffer'

type SelectOptionsForm = {
  value: string | number
  label: string
  selected?: boolean
}

interface SelectPropsForm {
  options?: SelectOptionsForm[]
  value?: string | number
}

type ValueReactSelect = {
  label: string
  value: string
  [key: string]: string
}

type ReturnFormValidation<FormType> = {
  methods: UseFormReturn<FormType, object>
  values: FormType | null
  onSubmit: SubmitHandler<FormType>
  isValidData: boolean
}

type ReactSelectOption = {
  id: number
  value: number | string
  label: string
}
