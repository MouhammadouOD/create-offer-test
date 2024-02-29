import { commonLabel, signupLabel, createOfferLabel } from './listLabelName'
import { commonValue, signupValue, createOfferValue } from './listValueName'

const listLabelPreviewForm = (section: PreviewFormSection) => {
  let listLabel

  switch (section) {
    case 'createOffer':
      listLabel = createOfferLabel
      break
    default:
      listLabel = signupLabel
      break
  }
  return { ...commonLabel, ...listLabel }
}

const listValuePreviewForm = (section: PreviewFormSection) => {
  let listValue

  switch (section) {
    case 'createOffer':
      listValue = createOfferValue
      break
    default:
      listValue = signupValue
      break
  }
  return { ...commonValue, ...listValue }
}

export {
  listLabelPreviewForm,
  listValuePreviewForm,
  commonLabel,
  signupLabel,
  commonValue,
  signupValue
}
