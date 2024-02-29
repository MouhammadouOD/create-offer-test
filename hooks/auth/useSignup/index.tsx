import {
  FinanceForm,
  InfosForm,
  RequirementForm,
  StatusForm,
  UserForm
} from '@/components/auth/SignUp'
import { ReactNode, useEffect, useRef, useState } from 'react'
import useFinanceForm from './useFinanceForm'
import useInfosForm from './useInfosForm'
import useStatusForm from './useStatusForm'
import useUserForm from './useUserForm'
import useRequirementForm from './useRequirementForm'
import PreviewForm from '@/components/PreviewForm'
import { api } from '../../../services'
import { apiUrl, storageName, page } from '../../../constants'
import { webStorage } from '../../../helpers'
import { useRouter } from 'next/router'
import useButtonMultiForm from '@hooks/common/useButtonMultiForm'
import { useAlertNotification } from '@hooks/common'

const tabs = [
  {
    id: 1,
    name: 'vous',
    isActived: true,
    isValidated: false,
    content: null
  },
  {
    id: 2,
    name: 'status',
    isActived: false,
    isValidated: false,
    content: null
  },
  {
    id: 3,
    name: 'informations',
    isActived: false,
    isValidated: false,
    content: null
  },
  {
    id: 4,
    name: 'finance',
    isActived: false,
    isValidated: false,
    content: null
  },
  {
    id: 5,
    name: 'besoins',
    isActived: false,
    isValidated: false,
    content: null
  },
  {
    id: 6,
    name: 'finaliser',
    isActived: false,
    isValidated: false,
    content: null
  }
]

const useSignUp = () => {
  const router = useRouter()
  const hasCompletedForm = useRef(false)
  const [loading, setLoading] = useState<boolean>(false)
  const propertiesUserForm = useUserForm()
  const propertiesStatusForm = useStatusForm()
  const propertiesInfosForm = useInfosForm()
  const propertiesFinanceForm = useFinanceForm()
  const propertiesRequirementForm = useRequirementForm()
  const [componentId, setComponentId] = useState<number>(1)
  const [properties, setProperties] =
    useState<ReturnFormValidation<AllFormsSignUp> | null>(propertiesUserForm)
  const [componentFormField, setComponentFormField] = useState<ReactNode>(
    <UserForm />
  )
  const { messageNotification, typeNotification, handleNotification } =
    useAlertNotification()

  const { stateBreadcrumbForm, handlePrevious, handleNext } =
    useButtonMultiForm(tabs, componentId, properties)

  useEffect(() => {
    const tab = stateBreadcrumbForm.find(tab => tab.isActived === true)
    setComponentId(tab?.id ? tab.id : 1)
  }, [stateBreadcrumbForm])

  useEffect(() => {
    getManageForm()
  }, [componentId, loading])

  const getValues = () => {
    return {
      user: propertiesUserForm.values,
      status: propertiesStatusForm.values,
      infos: propertiesInfosForm.values,
      finance: propertiesFinanceForm.values,
      requirement: propertiesRequirementForm.values
    }
  }

  const getManageForm = () => {
    let property: ReturnFormValidation<AllFormsSignUp> | null
    let component: ReactNode
    switch (componentId) {
      case 2:
        property = propertiesStatusForm
        component = <StatusForm />
        break
      case 3:
        property = propertiesInfosForm
        component = <InfosForm />
        break
      case 4:
        property = propertiesFinanceForm
        component = <FinanceForm />
        break
      case 5:
        property = propertiesRequirementForm
        component = <RequirementForm />
        break
      case 6:
        property = null
        component = (
          <PreviewForm
            hasActivatedScrolling={true}
            section='firstConnection'
            listValues={getValues()}
          />
        )
        break
      default:
        property = propertiesUserForm
        component = <UserForm />
        break
    }

    setProperties(property)
    setComponentFormField(component)
    hasCompletedForm.current = componentId === 6 ? true : false
  }

  const submitForm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setLoading(true)
    const values = getValues()
    try {
      const res = await api.postData(apiUrl.API_SIGNUP, values)
      setLoading(false)
      //Save user_id for section confirmation email for resend email of confirmation
      webStorage.saveInWebStorage(
        storageName.USER_ID,
        res.userId,
        false,
        'session'
      )
      router.push(page.PAGE_CONFIRM_EMAIL)
    } catch (error) {
      handleNotification(String(error), 'error')
      setLoading(false)
    }
  }

  return {
    stateBreadcrumbForm,
    hasCompletedForm: hasCompletedForm.current,
    componentFormField,
    componentId,
    properties,
    handlePrevious,
    handleNext,
    submitForm,
    messageNotification,
    typeNotification,
    handleNotification,
    loading
  }
}

export default useSignUp
