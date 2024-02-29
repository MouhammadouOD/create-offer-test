import * as Yup from 'yup'
import { form, storageName } from '../../../constants'
import { useFormValidation } from '@/hooks/common'
import { SchemaOf } from 'yup'

const useUserForm = () => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required(form.REQUIRED),
    lastName: Yup.string().required(form.REQUIRED),
    email: Yup.string().email(form.EMAIL_INVALID).required(form.REQUIRED),
    country: Yup.string().required(form.REQUIRED),
    job: Yup.string().required(form.REQUIRED)
  }).required()

  const proprietiesForm = useFormValidation<
    SchemaOf<UserFormData>,
    UserFormData
  >(validationSchema, `${storageName.FIRST_CONNECTION}:UF`, true)

  return proprietiesForm
}

export default useUserForm
