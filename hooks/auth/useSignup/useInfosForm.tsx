import { storageName } from '../../../constants'
import { useFormValidation } from '@hooks/common'
import { SchemaOf } from 'yup'
import { informationsValidationSchema } from '@helpers/yupValidationForm'

const useInfosForm = () => {
  const proprietiesForm = useFormValidation<
    SchemaOf<InfosFormData>,
    InfosFormData
  >(informationsValidationSchema, `${storageName.FIRST_CONNECTION}:IF`, true)

  return proprietiesForm
}

export default useInfosForm
