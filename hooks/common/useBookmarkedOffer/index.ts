import { apiUrl } from '../../../constants'
import { useAppSelector } from '../../../store/app/hooks'
import { api } from '../../../services'
import { useEffect, useState } from 'react'
import useAlertNotification from '../useAlertNotification'

const useBookmarkedOffer = (
  offerFavorites: OfferFavorites[] | [] | undefined
) => {
  const session = useAppSelector(state => state.session.me)
  const isCompany = session?.status !== 'freelance' ? true : false
  const { messageNotification, handleNotification } = useAlertNotification()

  const [isInFavorite, setIsInFavorite] = useState<boolean>(false)
  const [favoriteId, setFavoriteId] = useState<number | null>(null)

  useEffect(() => {
    const getFavorite = () => {
      if (!!offerFavorites?.length) {
        offerFavorites.map(favorite => {
          if (isCompany && favorite.companyId === session?.companyId) {
            setIsInFavorite(true)
            setFavoriteId(favorite.id)
          }
          if (!isCompany && favorite.freelanceId === session?.id) {
            setIsInFavorite(true)
            setFavoriteId(favorite.id)
          }
        })
      }
    }

    getFavorite()
  }, [offerFavorites])

  const addBookmark = async (offerId: number | undefined) => {
    const payload = {
      offerId,
      ...(session?.status === 'company'
        ? { companyId: session?.companyId }
        : { freelanceId: session?.id })
    }
    try {
      const res = await api.postData(apiUrl.API_OFFER_FAVORITES, payload)
      setIsInFavorite(true)
      setFavoriteId(res.favoriteId)
    } catch (error) {
      handleNotification(String(error), 'error')
    }
  }

  const deleteBookmark = async () => {
    try {
      await api.deleteData(`${apiUrl.API_OFFER_FAVORITES}/${favoriteId}`)
      setIsInFavorite(false)
    } catch (error) {
      handleNotification(String(error), 'error')
    }
  }

  return {
    isInFavorite,
    messageNotification,
    addBookmark,
    deleteBookmark,
    handleNotification
  }
}
export default useBookmarkedOffer
