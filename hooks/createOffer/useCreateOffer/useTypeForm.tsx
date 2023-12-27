import * as Yup from 'yup'
import { form } from '../../../constants'
import { useFormValidation } from '@hooks/common'
import { SchemaOf } from 'yup'

const useTypeForm = () => {
  const validationSchema = Yup.object({
    typeOffer: Yup.string().required(form.REQUIRED),
    target: Yup.string().required(form.REQUIRED),
    typeResponse: Yup.string().required(form.REQUIRED),
    displayName: Yup.boolean().required(form.REQUIRED),
    public: Yup.boolean().required(form.REQUIRED)
  }).required()

  const proprietiesForm = useFormValidation<
    SchemaOf<TypeFormData>,
    TypeFormData
  >(validationSchema, `OF:T`, true)
  return proprietiesForm
}

export default useTypeForm
