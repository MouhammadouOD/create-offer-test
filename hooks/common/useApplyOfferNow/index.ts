import { useState } from 'react'
import * as yup from 'yup'
import { api } from '../../../services'
import { apiUrl, file, form } from '../../../constants'
import { useAppSelector } from '../../../store/app/hooks'
import useFormValidation from '../useFormValidation'

const validationSchema = yup.object({
  files: yup
    .array()
    .min(1, form.REQUIRED)
    .of(
      yup
        .mixed()
        .test('fileSize', form.FILE_SIZE_INVALID, value => {
          if (value.length === 0) return true
          return value.size <= file.FILE_DOCUMENT_SIZE
        })
        .test('fileFormat', form.FILE_FORMAT_INVALID, value => {
          if (value.length === 0) return true
          //Hack : When you want upload words document on windows the input file not recognize the file type
          //So we need to check the extension on validate manually
          if (!value.type && value.name) {
            const values = value.name.split('.').length
            const ext = value.name.split('.')[values - 1]
            return ext === 'doc' || ext === 'docx' ? true : false
          }
          return file.FILE_DOCUMENT_SUPPORTED_ALL_FORMATS.includes(value.type)
        })
    ),
  description: yup.string().required(form.REQUIRED),
  offerId: yup.number().positive().required(form.REQUIRED),
  offerSectionId: yup.number().positive().required(form.REQUIRED),
  typeResponse: yup
    .string()
    .required(form.REQUIRED)
    .test(
      'oneOfRequired',
      'La valeur doit être global ou partial',
      function (item) {
        return item === 'global' || item === 'partial'
      }
    )
})

const useApplyOfferNow = () => {
  const session = useAppSelector(state => state.session.me)
  const [error, setError] = useState<any | null>(null)
  const [success, setSuccess] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const property = useFormValidation<
    yup.SchemaOf<ApplyOfferFormData>,
    ApplyOfferFormData
  >(validationSchema, ``, false)

  const submitForm = async (datas: React.MouseEvent<HTMLElement>) => {
    setLoading(true)

    //Add the user Id and eventually company id
    const payload = {
      ...datas,
      ...(session?.companyId
        ? { applicantCompanyId: session?.companyId }
        : { applicantFreelanceId: session?.id }),
      creatorId: session?.id
    }

    try {
      await api.postData(
        apiUrl.API_APPLICANT_RESPONDS_OFFERS,
        payload,
        undefined,
        true,
        'encrypt-files'
      )
      setLoading(false)
      setSuccess(true)
      property.methods.setValue('description', '')
    } catch (error) {
      setError(String(error))
      setLoading(false)
      setSuccess(false)
      property.methods.setValue('description', '')
    }
  }

  const deleteSuccess = () => {
    setSuccess(false)
  }
  const deleteError = () => {
    setError(null)
  }

  return {
    submitForm,
    property,
    loading,
    success,
    error,
    deleteSuccess,
    deleteError
  }
}

export default useApplyOfferNow
