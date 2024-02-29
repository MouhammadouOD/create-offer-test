import * as Yup from 'yup'
import { form } from '../../../constants'
import { useFormValidation } from '@hooks/common'
import { SchemaOf } from 'yup'

const useDetailsOfferForm = () => {
  const validationSchema = Yup.object({
    budget: Yup.number().positive(form.NUMBER_POSITIVE).required(form.REQUIRED),
    budgetCurrency: Yup.string().required(form.REQUIRED),
    deadlineStart: Yup.date().required(form.REQUIRED),
    deadlineEnd: Yup.date().required(form.REQUIRED)
  }).required()

  const proprietiesForm = useFormValidation<
    SchemaOf<DetailsOfferFormData>,
    DetailsOfferFormData
  >(validationSchema, `OF:DO`, true)
  return proprietiesForm
}

export default useDetailsOfferForm
