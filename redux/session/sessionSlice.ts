import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'

const initialState: SessionState = {
  isAuth: false,
  isLoading: true,
  token: null,
  tokenExpiresAt: null,
  me: null
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    loadingSession(state) {
      state.isLoading = true
    },
    errorSession(state) {
      state.isLoading = false
    },
    addSession(state, action: PayloadAction<PayloadAddSession>) {
      state.isAuth = true
      state.isLoading = false
      state.token = action.payload.token
      state.tokenExpiresAt = action.payload.tokenExpiresAt
      state.me = action.payload.me
    },
    deleteSession(state) {
      state.me = null
      state.isAuth = false
      state.token = null
      state.tokenExpiresAt = null
    },
    updateToken(state, action: PayloadAction<PayloadAddToken>) {
      state.token = action.payload.token
    },
    deleteToken(state) {
      state.token = null
    }
  },
  /* extraReducers: {
    [HYDRATE]: (state, action) => {
      let nextState = {
        ...state, // use previous state
        ...action.payload.session // apply delta from hydration
      }
      if (state?.me) nextState = state //preserve user value on client side navigation
      return nextState
    }
  } */
})

export const {
  addSession,
  deleteSession,
  updateToken,
  deleteToken,
  errorSession,
  loadingSession
} = sessionSlice.actions

export default sessionSlice.reducer
