import * as Yup from 'yup'
import { form } from '../../../constants'
import { useFormValidation } from '@hooks/common'
import { SchemaOf } from 'yup'

const useDescriptionOfferForm = () => {
  const validationSchema = Yup.object({
    description: Yup.string().required(form.REQUIRED)
  }).required()

  const proprietiesForm = useFormValidation<
    SchemaOf<DescriptionOfferFormData>,
    DescriptionOfferFormData
  >(validationSchema, `OF:D`, true)
  return proprietiesForm
}

export default useDescriptionOfferForm
