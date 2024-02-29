import { useAppSelector } from '../../../store/app/hooks'
import { useEffect, useState } from 'react'
import { apiUrl, form } from '../../../constants'
import * as yup from 'yup'
import { api } from '../../../services'
import useFormValidation from '../useFormValidation'

interface List<T> extends IPagination {
  datas: T[] | []
}

type ReturnValue<T> = {
  property: ReturnFormValidation<AddSkillFormData>
  loading: boolean
  loadingCreate: boolean
  loadingDelete: boolean
  loadingUpdate: boolean
  error: string | null
  success: boolean | null
  list: List<T>
  createSkill: (datas: React.MouseEvent<HTMLElement>) => void
  deleteSkill: (skillId: number) => void
  updateSkill: (datas: React.MouseEvent<HTMLElement>) => void
  refresData: () => void
  deleteError: () => void
  deleteSuccess: () => void
}

const validationSchema = yup.object({
  name: yup.string().required(form.REQUIRED),
  level: yup
    .number()
    .min(1, form.MIN_LEVEL_SKILL)
    .max(3, form.MAX_LEVEL_SKILL)
    .positive()
    .required(form.REQUIRED)
})

const useProfileSkill = <T>(): ReturnValue<T> => {
  const session = useAppSelector(state => state.session.me)
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingCreate, setLoadingCreate] = useState<boolean>(false)
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false)
  const [loadingUpdate, setLoadingUpdate] = useState<boolean>(false)
  const [success, setSuccess] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [list, setList] = useState<List<T>>({
    currentPage: 0,
    limitByPage: 0,
    totalItems: 0,
    totalPages: 0,
    datas: []
  })

  const property = useFormValidation<
    yup.SchemaOf<AddSkillFormData>,
    AddSkillFormData
  >(validationSchema, ``, false)

  const getResponses = async () => {
    try {
      setLoading(true)
      // Call an external API endpoint to get posts
      const res = await api.fetchData(`${apiUrl.API_SKILLS}`, {
        qs: { size: 100 }
      })
      setList(res.results)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      setError(error)
    }
  }

  useEffect(() => {
    getResponses()
  }, [])

  const refresData = () => {
    getResponses()
  }

  const createSkill = async (datas: React.MouseEvent<HTMLElement>) => {
    try {
      setLoadingCreate(true)
      // Call an external API endpoint to get posts
      await api.postData(`${apiUrl.API_SKILLS}`, {
        ...datas,
        ...(session?.Company
          ? { companyId: session?.companyId }
          : { userId: session?.id })
      })
      refresData()
      setSuccess(true)
      setLoadingCreate(false)
    } catch (error: any) {
      setLoadingCreate(false)
      setError(error)
    }
  }

  const deleteSkill = async (skillId: number) => {
    try {
      const urlStatus = session?.Company
        ? `company/${session?.companyId}`
        : `user/${session?.id}`
      const apiUrlDeleteSkill = `${apiUrl.API_SKILLS}/${skillId}/${urlStatus}`
      setLoadingDelete(true)
      // Call an external API endpoint to get posts
      await api.deleteData(`${apiUrlDeleteSkill}`)
      refresData()
      setLoadingDelete(false)
    } catch (error: any) {
      setLoadingDelete(false)
      setError(error)
    }
  }

  const updateSkill = async (datas: any) => {
    try {
      setLoadingUpdate(true)
      // Call an external API endpoint to get posts
      await api.patchData(`${apiUrl.API_SKILLS}/${datas?.skillId}`, {
        ...datas,
        ...(session?.Company
          ? { companyId: session?.companyId }
          : { userId: session?.id })
      })
      refresData()
      setSuccess(true)
      setLoadingUpdate(false)
    } catch (error: any) {
      setLoadingUpdate(false)
      setError(error)
    }
  }

  const deleteSuccess = () => {
    setSuccess(false)
  }
  const deleteError = () => {
    setError(null)
  }

  return {
    property,
    list,
    error,
    success,
    loading,
    loadingCreate,
    loadingDelete,
    loadingUpdate,
    refresData,
    createSkill,
    deleteSkill,
    updateSkill,
    deleteError,
    deleteSuccess
  }
}

export default useProfileSkill
