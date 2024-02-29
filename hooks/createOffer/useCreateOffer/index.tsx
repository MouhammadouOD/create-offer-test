import { ReactNode, useEffect, useRef, useState } from 'react'
import PreviewForm from '@/components/PreviewForm'
import useTypeForm from './useTypeForm'
import useInfosOfferForm from './useInfosOfferForm'
import useDetailsOfferForm from './useDetailsOfferForm'
import useDescriptionOfferForm from './useDescriptionOfferForm'
import useConditionsOfferForm from './useConditionsOffer'
import {
  ConditionsOfferForm,
  DescriptionOfferForm,
  DetailsOfferForm,
  FilesOfferForm,
  InfosOfferForm,
  TypeForm
} from '@/components/createOffer'
import useFilesOfferForm from './useFilesOfferForm'
import { api } from '../../../services'
import { apiUrl, page } from '../../../constants'
import { useRouter } from 'next/router'
import useButtonMultiForm from '@hooks/common/useButtonMultiForm'
import { CardTitle } from '@/components/common'
import { useAppSelector } from '../../../store/app/hooks'

const tabs = [
  {
    id: 1,
    name: 'type',
    isActived: true,
    isValidated: false,
    content: null
  },
  {
    id: 2,
    name: 'informations',
    isActived: false,
    isValidated: false,
    content: null
  },
  {
    id: 3,
    name: 'détails',
    isActived: false,
    isValidated: false,
    content: null
  },
  {
    id: 4,
    name: 'description',
    isActived: false,
    isValidated: false,
    content: null
  },
  {
    id: 5,
    name: 'conditions',
    isActived: false,
    isValidated: false,
    content: null
  },
  {
    id: 6,
    name: 'fichiers',
    isActived: false,
    isValidated: false,
    content: null
  },
  {
    id: 7,
    name: 'Déposer',
    isActived: false,
    isValidated: false,
    content: null
  }
]

const useCreateOffer = () => {
  const router = useRouter()
  const session = useAppSelector(state => state.session.me)
  const hasCompletedForm = useRef(false)
  const [error, setError] = useState<any | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const propertiesTypeForm = useTypeForm()
  const propertiesInfosOfferForm = useInfosOfferForm()
  const propertiesDetailsOfferForm = useDetailsOfferForm()
  const propertiesDescriptionOfferForm = useDescriptionOfferForm()
  const propertiesConditionsOfferForm = useConditionsOfferForm()
  const propertiesFilesOfferForm = useFilesOfferForm()

  const [componentId, setComponentId] = useState<number>(1)

  const [properties, setProperties] =
    useState<ReturnFormValidation<AllFormsCreateOffer> | null>(
      propertiesTypeForm
    )
  const [componentFormField, setComponentFormField] = useState<ReactNode>(
    <TypeForm />
  )

  const { stateBreadcrumbForm, handlePrevious, handleNext } =
    useButtonMultiForm(tabs, componentId, properties)

  useEffect(() => {
    const tab = stateBreadcrumbForm.find(tab => tab.isActived === true)
    setComponentId(tab?.id ? tab.id : 1)
  }, [stateBreadcrumbForm])

  useEffect(() => {
    getManageForm()
  }, [componentId])

  const getValues = () => {
    return {
      type: propertiesTypeForm.values,
      infos: propertiesInfosOfferForm.values,
      details: propertiesDetailsOfferForm.values,
      descriptions: propertiesDescriptionOfferForm.values,
      conditions: propertiesConditionsOfferForm.values,
      files: propertiesFilesOfferForm.values
    }
  }

  const getManageForm = () => {
    let property: ReturnFormValidation<AllFormsCreateOffer> | null
    let component: ReactNode
    switch (componentId) {
      case 2:
        property = propertiesInfosOfferForm
        component = <InfosOfferForm />
        break
      case 3:
        property = propertiesDetailsOfferForm
        component = (
          <DetailsOfferForm
            closingDate={propertiesInfosOfferForm?.values?.closingDate}
          />
        )
        break
      case 4:
        property = propertiesDescriptionOfferForm
        component = <DescriptionOfferForm />
        break
      case 5:
        property = propertiesConditionsOfferForm
        component = <ConditionsOfferForm />
        break
      case 6:
        property = propertiesFilesOfferForm
        component = <FilesOfferForm />
        break
      case 7:
        property = null
        component = (
          <>
            <CardTitle title='Récapitulatif de votre offre' />
            <PreviewForm
              hasActivatedScrolling={false}
              section='createOffer'
              listValues={getValues()}
            />
          </>
        )
        break
      default:
        property = propertiesTypeForm
        component = <TypeForm />
        break
    }

    setProperties(property)
    setComponentFormField(component)
    hasCompletedForm.current = componentId === 7 ? true : false
  }

  const submitForm = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault()
    setLoading(true)
    let datas = Object.entries(getValues()).reduce(
      (acc: any, val: [String, AllFormsCreateOffer | null]) => {
        return { ...acc, ...val[1] }
      },
      {}
    )
    //Add the user Id and eventually company id
    const payload = {
      ...datas,
      creatorId: session?.id,
      companyId: session?.companyId
    }

    try {
      const res = await api.postData(
        apiUrl.API_CREATE_OFFER,
        payload,
        undefined,
        true,
        'encrypt-files'
      )
      setLoading(false)
      router.replace(`${page.PAGE_OFFERS}/${res.offerId}`)
    } catch (error) {
      setError(String(error))
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
    loading,
    error
  }
}

export default useCreateOffer
