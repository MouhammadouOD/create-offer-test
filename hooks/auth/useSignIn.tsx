import * as Yup from 'yup'
import { useFormValidation } from '@hooks/common'
import { useEffect, useState } from 'react'
import { form, apiUrl, page } from '../../constants'
import { useRouter } from 'next/router'
import { api } from '../../services'
import { saveSession } from '@helpers/auth'

const validationSchema = Yup.object({
  email: Yup.string().email('Email non valide').required(form.REQUIRED),
  password: Yup.string().min(6, '6 caractères minimum').required(form.REQUIRED)
})

type Login = {
  email: string
  password: string
}

const useSignIn = () => {
  const router = useRouter()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const { values, methods, onSubmit } = useFormValidation<
    Yup.SchemaOf<SignInData>,
    SignInData
  >(validationSchema, ``, false)

  useEffect(() => {
    const signIn = async (values: Login) => {
      setLoading(true)
      try {
        const res = await api.postData(apiUrl.API_SIGNIN, values)
        setLoading(false)
        saveSession(res)
        router.push(page.PAGE_HOME)
      } catch (error) {
        setError(String(error))
        setLoading(false)
      }
    }
    if (values) {
      signIn(values)
      //signIn('credentials', obj)
    }
  }, [values])

  return { methods, onSubmit, loading, error }
}

export default useSignIn
