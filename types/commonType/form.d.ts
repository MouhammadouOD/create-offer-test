type StatusFormData = {
  status: string
  nameCompany: string | undefined
  typeCompany: string | undefined
  typeBusiness: string | undefined
  levelExperience: string | undefined
  yearExperience: string | undefined
  businessSizeExperience: string | undefined
  description: string
}

type InfosFormData = {
  mainIndustry: number | undefined
  otherIndustries: INameFrEn[] | undefined
  competences: INameFrEn[] | undefined
  headquarters: number | undefined
  areaActivities: INameFrEn[] | undefined
}

type Client = {
  name: string | undefined
  reference: string | undefined
}

type FinanceFormData = {
  levelDevelopment: string
  revenue: string
  clients: Client[] | undefined
  files: File[] | undefined
}
type RequirementFormData = {
  countries: any[]
  descriptionRequirement: string | undefined
  find_partners: boolean
  find_suppliers: boolean
  find_customers: boolean
  seeks_investor: boolean
  find_skills: boolean
  exchange_share: boolean
  trained_for_development: boolean
  other: boolean
}
