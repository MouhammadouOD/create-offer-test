import { storageName } from '../../../constants'
import { useFormValidation } from '@hooks/common'
import { SchemaOf } from 'yup'
import { financeValidationSchema } from '@helpers/yupValidationForm'

const useFinanceForm = () => {
  const proprietiesForm = useFormValidation<
    SchemaOf<FinanceFormData>,
    FinanceFormData
  >(financeValidationSchema, `${storageName.FIRST_CONNECTION}:FF`, true)

  return proprietiesForm
}

export default useFinanceForm
