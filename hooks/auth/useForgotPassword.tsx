import * as Yup from 'yup'
import { useAlertNotification, useFormValidation } from '@hooks/common'
import { useEffect, useState } from 'react'
import { apiUrl, form } from '../../constants'
import { api } from '../../services'

const validationSchema = Yup.object({
  email: Yup.string()
    .email("l'adresse email n'est pas valide")
    .required(form.REQUIRED)
})

const useForgotPassword = () => {
  const { messageNotification, typeNotification, handleNotification } =
    useAlertNotification()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { values, methods, onSubmit } = useFormValidation<
    Yup.SchemaOf<ForgotPasswordData>,
    ForgotPasswordData
  >(validationSchema, ``, false)

  useEffect(() => {
    if (values) {
      handleSubmit(values)
    }
  }, [values])

  const handleSubmit = async (datas: ForgotPasswordData) => {
    setIsLoading(true)
    try {
      const res = await api.postData(apiUrl.API_FORGOT_PASSWORD, datas)
      setIsLoading(false)
      handleNotification(res.message, 'success')
    } catch (error) {
      setIsLoading(false)
      handleNotification(String(error), 'error')
    }
  }

  return {
    methods,
    onSubmit,
    isLoading,
    messageNotification,
    typeNotification,
    handleNotification
  }
}

export default useForgotPassword
