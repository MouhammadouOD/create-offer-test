import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: CountryState = {
  countries: [],
  error: null,
  loading: false,
  countryFetched: {}
}

const countrySlice = createSlice({
  name: 'country',
  initialState,
  reducers: {
    requestCountry(state) {
      state.loading = true
    },
    countrySuccess(state, action: PayloadAction<PayloadCountry[]>) {
      state.countries = action.payload
      state.loading = false
    },
    requestCountryFetched(state, action: PayloadAction<string>) {
      state.countryFetched = state.countries.filter(
        (row: any) =>
          row.nameFr.toLowerCase().indexOf(action.payload.toLowerCase()) !==
            -1 ||
          row.nameEn.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
      )
    },
    requestCountryIdFetched(state, action: PayloadAction<number>) {
      state.countryFetched = state?.countries?.filter(
        (row: CountryData) => row.id !== action.payload
      )
    },
    countryError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    }
  },
  /* extraReducers: {
    [HYDRATE]: (state, action) => {
      let nextState = {
        ...state, // use previous state
        ...action.payload.country // apply delta from hydration
      }
      if (state?.countries) nextState = state //preserve user value on client side navigation
      return nextState
    }
  } */
})

export const {
  requestCountry,
  countrySuccess,
  countryError,
  requestCountryFetched
} = countrySlice.actions
export default countrySlice.reducer
