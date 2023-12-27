import * as Yup from 'yup'
import { useAlertNotification, useFormValidation } from '@hooks/common'
import { useEffect, useState } from 'react'
import { apiUrl, form } from '../../constants'
import { api } from '../../services'

const validationSchema = Yup.object({
  password: Yup.string().min(6, '6 caractères minimum').required(form.REQUIRED),
  confirmPassword: Yup.string()
    .min(6, '6 caractères minimum')
    .required(form.REQUIRED)
    .oneOf(
      [Yup.ref('password'), null],
      'Les mots de passe ne sont pas les mêmes'
    ),
  token: Yup.string().required(form.REQUIRED)
})

const useResetPassword = () => {
  const { messageNotification, typeNotification, handleNotification } =
    useAlertNotification()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { values, methods, onSubmit } = useFormValidation<
    Yup.SchemaOf<ResetPasswordData>,
    ResetPasswordData
  >(validationSchema, ``, false)

  useEffect(() => {
    if (values) {
      handleSubmit(values)
    }
  }, [values])

  const handleSubmit = async (datas: ResetPasswordData) => {
    setIsLoading(true)
    try {
      const res = await api.postData(apiUrl.API_RESET_PASSWORD, datas)
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

export default useResetPassword
