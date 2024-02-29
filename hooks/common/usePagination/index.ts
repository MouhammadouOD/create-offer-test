import { useEffect, useState } from 'react'
import { api } from '../../../services'

interface List<T> extends IPagination {
  datas: T[] | []
}

type ReturnValue<T> = {
  loading: boolean
  error: string
  list: List<T>
  handlePage: (page: number) => void
  handleQuery: (queries: ObjectDifferentTypes) => void
  refresData: () => void
}

const usePagination = <T>(
  apiUrl: string,
  query?: ObjectDifferentTypes
): ReturnValue<T> => {
  const [loading, setLoading] = useState<boolean>(false)
  const [page, setPage] = useState<number>()
  const [queries, setQueries] = useState<ObjectDifferentTypes>()
  const [error, setError] = useState<string>('')
  const [list, setList] = useState<List<T>>({
    currentPage: 0,
    limitByPage: 0,
    totalItems: 0,
    totalPages: 0,
    datas: []
  })

  const getResponses = async () => {
    try {
      setLoading(true)
      // Call an external API endpoint to get posts
      const res = await api.fetchData(`${apiUrl}`, {
        qs: { ...query, page }
      })
      setList(res.results)
      setLoading(false)
    } catch (error: any) {
      setLoading(false)
      setError(error)
    }
  }

  useEffect(() => {
    setPage(0)
    query && setQueries(query)
  }, [])

  useEffect(() => {
    if (page || queries) {
      getResponses()
    }
  }, [page, queries])

  const handlePage = (page: number) => {
    setPage(page)
  }

  const handleQuery = (queries: ObjectDifferentTypes) => {
    setQueries(queries)
  }

  const refresData = () => {
    getResponses()
  }

  return { list, error, loading, handlePage, handleQuery, refresData }
}

export default usePagination
