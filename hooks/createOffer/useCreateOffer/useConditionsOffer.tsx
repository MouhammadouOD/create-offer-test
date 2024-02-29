import * as Yup from 'yup'
import { useFormValidation } from '@hooks/common'
import { SchemaOf } from 'yup'

const useConditionsOfferForm = () => {
  const validationSchema = Yup.object({
    termsConditionsAward: Yup.string().required(),
    selectionCriteria: Yup.string().required(),
    criteriaJudgingOffers: Yup.string().required()
  }).required()

  const proprietiesForm = useFormValidation<
    SchemaOf<ConditionsOfferFormData>,
    ConditionsOfferFormData
  >(validationSchema, `OF:C`, true)
  return proprietiesForm
}

export default useConditionsOfferForm
