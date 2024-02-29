type CountryData = {
  id: number
  nameEn: string | null
  nameFr: string | null
  continent: string | null
  codeIso: string | null
}

type CountryState = {
  countries: CountryData[] | []
  error: string | null
  loading: boolean
  countryFetched: CountryData | {}
}

interface PayloadCountry extends CountryData {}

interface IActionCountryRequestLoading {
  //type: typeof Country_REQUEST_LOADING
  loading: boolean
}

interface IActionCountryRequestSuccess {
  //type: typeof Country_REQUEST_SUCCESS
  countries: PayloadCountry[]
  loading: boolean
}

interface IActionCountryRequestError {
  //type: typeof Country_REQUEST_ERROR
  error: string
  loading: boolean
}
