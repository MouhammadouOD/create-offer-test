const getStatusOffer = (status: OfferStatus) => {
  switch (status) {
    case 'cancel':
      return 'Supprimée'
    case 'validate':
      return 'Validée'
    case 'inprogress':
      return 'En progrès'
    case 'closed':
      return 'Fermée'
    default:
      return 'Actif'
  }
}

const getStatusApplicantResponse = (status: ApplicantResponseStatus) => {
  switch (status) {
    case 'accept':
      return 'ACCEPTÉE'
    case 'reject':
      return 'REFUSÉE'
    default:
      return 'EN ATTENTE'
  }
}

export { getStatusOffer, getStatusApplicantResponse }
