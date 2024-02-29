import useBreadcrumbForm from '../useBreadcrumbForm'

type Tabs = {
  id: number
  name: string
  isActived: boolean
  isValidated: boolean
  content: string | null
}

type Properties = ReturnFormValidation<
  AllFormsCreateOffer | AllFormsSignUp
> | null

const useButtonMultiForm = (
  tabs: Tabs[],
  componentId: number,
  properties: Properties
) => {
  const [stateBreadcrumbForm, dispatchBreadcrumbForm] = useBreadcrumbForm(tabs)
  const handlePrevious = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    dispatchBreadcrumbForm({
      type: 'ACTIVE',
      payload: {
        id: componentId === 1 ? 1 : componentId - 1
      }
    })
  }

  const handleNext = (data: AllFormsSignUp | AllFormsCreateOffer) => {
    if (properties) {
      const { onSubmit } = properties
      dispatchBreadcrumbForm({
        type: 'VALIDATED_ADD_CONTENT',
        payload: {
          id: componentId,
          content: '✓'
        }
      })
      dispatchBreadcrumbForm({
        type: 'ACTIVE',
        payload: {
          id: componentId + 1
        }
      })
      onSubmit(data)
    }
  }

  return { stateBreadcrumbForm, handlePrevious, handleNext }
}

export default useButtonMultiForm
