import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'
import { apiUrl, form } from '../../../constants'
import * as yup from 'yup'
import { api } from '../../../services'
import useFormValidation from '../useFormValidation'

interface List<T> extends IPagination {
  datas: T[] | []
}

type ReturnValue<T> = {
  property: ReturnFormValidation<AddProjectFormData>
  loading: boolean
  loadingCreate: boolean
  loadingDelete: boolean
  loadingUpdate: boolean
  error: string | null
  success: boolean | null
  list: List<T>
  createProject: (datas: React.MouseEvent<HTMLElement>) => void
  deleteProject: (projectId: number) => void
  updateProject: (datas: React.MouseEvent<HTMLElement>) => void
  refresData: () => void
  deleteError: () => void
  deleteSuccess: () => void
}

//image validators functions
const checkIfFilesAreTooBig = (/* files */ file?: [File] | any): boolean => {
  let valid = true
  if (/* files */ file) {
    /*  files.map((file : File) => { */
    const size = file[0].size / 1024 / 1024
    if (size > 10) {
      valid = false
    }
    /* }) */
  }
  return valid
}

const checkIfFilesAreCorrectType = (
  /* files */ file?: [File] | any
): boolean => {
  let valid = true
  if (/* files */ file) {
    /* files.map((file : File) => { */
    if (
      !['application/pdf', 'image/jpeg', 'image/png'].includes(file[0].type)
    ) {
      valid = false
    }
    /*  }) */
  }
  return valid
}

const validationSchema = yup.object({
  name: yup.string().required(form.REQUIRED),
  image: yup
    .mixed()
    .required(form.REQUIRED)
    .test('is-correct-file', 'VALIDATION_FIELD_FILE_BIG', checkIfFilesAreTooBig)
    .test(
      'is-big-file',
      'VALIDATION_FIELD_FILE_WRONG_TYPE',
      checkIfFilesAreCorrectType
    )
})

const useProfilePortfolio = <T>(): ReturnValue<T> => {
  const { data: session } = useSession()
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

  const accountId = Number(session?.user?.id)
  const typeProfile = session?.user?.status !== 'company' ? 'user' : 'company'

  const property = useFormValidation<
    yup.SchemaOf<AddProjectFormData>,
    AddProjectFormData
  >(validationSchema, ``, false)

  const getResponses = async () => {
    try {
      setLoading(true)
      // Call an external API endpoint to get posts
      const res = await api.fetchData(`${apiUrl.API_PROFILE_PORTFOLIOS}`, {
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

  const createProject = async (datas: React.MouseEvent<HTMLElement>) => {
    try {
      const payload = {
        ...datas,
        ...(session?.comp
          ? { applicantCompanyId: session?.userCompanyId }
          : { applicantFreelanceId: session?.user?.id }),
        creatorId: session?.user?.id
      }

      setLoadingCreate(true)
      // Call an external API endpoint to get posts
      await api.postData(
        apiUrl.API_PORTFOLIO_REQUIREMENT(typeProfile, accountId),
        payload,
        undefined,
        true,
        'portfolio'
      )
      refresData()
      setSuccess(true)
      setLoadingCreate(false)
    } catch (error: any) {
      setLoadingCreate(false)
      setError(error)
    }
  }

  const deleteProject = async (projectId: number) => {
    try {
      const urlStatus = session?.userCompany
        ? `company/${session?.userCompanyId}`
        : `user/${session?.user?.id}`
      const apiUrlDeleteProject = `${apiUrl.API_PROFILE_PORTFOLIOS}/${projectId}/${urlStatus}`
      setLoadingDelete(true)
      // Call an external API endpoint to get posts
      await api.deleteData(`${apiUrlDeleteProject}`)
      refresData()
      setLoadingDelete(false)
    } catch (error: any) {
      setLoadingDelete(false)
      setError(error)
    }
  }

  const updateProject = async (datas: any) => {
    try {
      setLoadingUpdate(true)
      // Call an external API endpoint to get posts
      await api.patchData(
        `${apiUrl.API_PROFILE_PORTFOLIOS}/${datas?.skillId}`,
        {
          ...datas,
          ...(session?.userCompany
            ? { companyId: session?.userCompanyId }
            : { userId: session?.user?.id })
        }
      )
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
    createProject,
    deleteProject,
    updateProject,
    deleteError,
    deleteSuccess
  }
}

export default useProfilePortfolio
