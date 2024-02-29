import * as Yup from 'yup'
import { form } from '../../constants'

const informationsValidationSchema = Yup.object({
  mainIndustry: Yup.number().test(
    'required',
    form.REQUIRED,
    function (mainIndustry) {
      return mainIndustry ? true : false
    }
  ),
  otherIndustries: Yup.array(Yup.mixed().required(form.REQUIRED)),
  competences: Yup.array()
    .of(Yup.mixed())
    .min(1, form.REQUIRED)
    .required(form.REQUIRED),
  headquarters: Yup.number().test(
    'required',
    form.REQUIRED,
    function (headquarters) {
      return headquarters ? true : false
    }
  ),
  areaActivities: Yup.array()
    .of(Yup.mixed())
    .min(1, form.REQUIRED)
    .required(form.REQUIRED)
})

export default informationsValidationSchema
