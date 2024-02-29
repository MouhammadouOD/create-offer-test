interface IOfferPagination extends IPagination {
  datas: OfferData[]
}

interface IConversationListPagination extends IPagination {
  datas: MessengerData[]
}

interface IMessageListPagination extends IPagination {
  datas: MessengerMessageData[]
}
