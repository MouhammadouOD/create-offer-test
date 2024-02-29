import * as Yup from 'yup'
import { form } from '../../constants'

const statusValidationSchema = Yup.object({
  status: Yup.string().required(form.REQUIRED),
  nameCompany: Yup.string()
    .when('status', {
      is: 'company',
      then: fieldSchema => fieldSchema.required(form.REQUIRED)
    })
    .when('status', {
      is: 'association',
      then: fieldSchema => fieldSchema.required(form.REQUIRED)
    })
    .when('status', {
      is: 'institution',
      then: fieldSchema => fieldSchema.required(form.REQUIRED)
    }),
  typeCompany: Yup.string().when('status', {
    is: 'company',
    then: fieldSchema => fieldSchema.required(form.REQUIRED)
  }),
  typeBusiness: Yup.string()
    .when('status', {
      is: 'company',
      then: fieldSchema => fieldSchema.required(form.REQUIRED)
    })
    .when('status', {
      is: 'association',
      then: fieldSchema => fieldSchema.required(form.REQUIRED)
    })
    .when('status', {
      is: 'institution',
      then: fieldSchema => fieldSchema.required(form.REQUIRED)
    }),
  levelExperience: Yup.string().when('status', {
    is: 'freelance',
    then: fieldSchema => fieldSchema.required(form.REQUIRED)
  }),
  yearExperience: Yup.string().when('status', {
    is: 'freelance',
    then: fieldSchema => fieldSchema.required(form.REQUIRED)
  }),
  businessSizeExperience: Yup.string().when('status', {
    is: 'freelance',
    then: fieldSchema => fieldSchema.required(form.REQUIRED)
  }),
  description: Yup.string().required(form.REQUIRED)
})

export default statusValidationSchema
