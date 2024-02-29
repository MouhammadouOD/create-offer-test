import * as Yup from 'yup'
import { form } from '../../constants'

const requirementValidationSchema = Yup.object({
  countries: Yup.array(Yup.mixed().required(form.REQUIRED)).required(
    form.REQUIRED
  ),
  find_partners: Yup.bool().default(false),
  find_suppliers: Yup.bool().default(false),
  find_customers: Yup.bool().default(false),
  seeks_investor: Yup.bool().default(false),
  find_skills: Yup.bool().default(false),
  exchange_share: Yup.bool().default(false),
  trained_for_development: Yup.bool().default(false),
  other: Yup.bool()
    .test('required', form.REQUIRED, function (other) {
      //Allow to retrieve field from parent to parent
      const {
        find_partners,
        find_suppliers,
        find_customers,
        seeks_investor,
        find_skills,
        exchange_share,
        trained_for_development
      } = this.parent
      if (
        !find_partners &&
        !find_suppliers &&
        !find_customers &&
        !seeks_investor &&
        !find_skills &&
        !exchange_share &&
        !trained_for_development &&
        !other
      ) {
        return false
      }
      return true
    })
    .default(false),
  descriptionRequirement: Yup.string().required(form.REQUIRED)
})

export default requirementValidationSchema
