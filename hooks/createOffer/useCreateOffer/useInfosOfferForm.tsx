import * as Yup from 'yup'
import { form } from '../../../constants'
import { useFormValidation } from '@hooks/common'
import { SchemaOf } from 'yup'

const useInfosOfferForm = () => {
  const validationSchema = Yup.object({
    title: Yup.string().required(form.REQUIRED),
    countries: Yup.array(Yup.mixed().required(form.REQUIRED)).required(
      form.REQUIRED
    ),
    categories: Yup.array(Yup.mixed().required(form.REQUIRED)).required(
      form.REQUIRED
    ),
    closingDate: Yup.date().required(form.REQUIRED),
    closingDateHour: Yup.date().required(form.REQUIRED)
  }).required()

  const proprietiesForm = useFormValidation<
    SchemaOf<InfosOfferFormData>,
    InfosOfferFormData
  >(validationSchema, `OF:I`, true)
  return proprietiesForm
}

export default useInfosOfferForm
