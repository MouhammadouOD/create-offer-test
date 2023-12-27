import { storageName } from '../../../constants'
import { useFormValidation } from '@hooks/common'
import { SchemaOf } from 'yup'
import { requirementValidationSchema } from '@helpers/yupValidationForm'

const useRequirementForm = () => {
  const proprietiesForm = useFormValidation<
    SchemaOf<RequirementFormData>,
    RequirementFormData
  >(requirementValidationSchema, `${storageName.FIRST_CONNECTION}:RF`, true)

  return proprietiesForm
}

export default useRequirementForm
