import { storageName } from '../../../constants'
import { useFormValidation } from '@hooks/common'
import { SchemaOf } from 'yup'
import { statusValidationSchema } from '@helpers/yupValidationForm'

const useStatusForm = () => {
  const proprietiesForm = useFormValidation<
    SchemaOf<StatusFormData>,
    StatusFormData
  >(statusValidationSchema, `${storageName.FIRST_CONNECTION}:SF`, true)

  return proprietiesForm
}

export default useStatusForm
