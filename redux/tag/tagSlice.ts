import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { TagState, PayloadTag } from '@/types/reduxType/tag'

const initialState: TagState = {
  tags: {},
  error: null,
  loading: false,
  tagFetched: {}
}

const tagSlice = createSlice({
  name: 'tag',
  initialState,
  reducers: {
    //requestTag
    requestTag(state) {
      state.loading = true
    },
    //requestTagFetched
    requestTagFetched(state, action: PayloadAction<string>) {
      state.tagFetched = state.tags.filter(
        (row: any) =>
          row.nameFr.toLowerCase().indexOf(action.payload.toLowerCase()) !==
            -1 ||
          row.nameEn.toLowerCase().indexOf(action.payload.toLowerCase()) !== -1
      )
    },
    //tagSuccess
    tagSuccess(state, action: PayloadAction<PayloadTag[]>) {
      state.tags = action.payload
      state.loading = false
    },
    //tagError
    tagError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    }
  },
  /* extraReducers: {
    [HYDRATE]: (state, action) => {
      let nextState = {
        ...state, // use previous state
        ...action.payload.tag // apply delta from hydration
      }
      if (state?.tags) nextState = state //preserve user value on client side navigation
      return nextState
    }
  } */
})

export const { requestTag, tagSuccess, tagError, requestTagFetched } =
  tagSlice.actions
export default tagSlice.reducer
