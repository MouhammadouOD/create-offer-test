import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { HYDRATE } from 'next-redux-wrapper'
import { CategoryState, PayloadCategory } from '@/types/reduxType/category'

const initialState: CategoryState = {
  categories: [],
  error: null,
  loading: false,
  categoryFetched: {}
}

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    requestCategory(state) {
      state.loading = true
    },
    requestCategoryFetched(state, action: PayloadAction<string>) {
      state.categoryFetched = state?.categories?.filter(
        (row: CategoryData) =>
          row?.nameFr?.toLowerCase().indexOf(action.payload.toLowerCase()) !==
            -1 ||
          row?.nameEn?.toLowerCase().indexOf(action.payload.toLowerCase()) !==
            -1
      )
    },
    requestCategoryIdFetched(state, action: PayloadAction<number>) {
      state.categoryFetched = state?.categories?.filter(
        (row: CategoryData) => row.id !== action.payload
      )
    },
    categorySuccess(state, action: PayloadAction<PayloadCategory[]>) {
      state.categories = action.payload
      state.loading = false
    },
    categoryError(state, action: PayloadAction<string>) {
      state.error = action.payload
      state.loading = false
    }
  },
 /*  extraReducers: {
    [HYDRATE]: (state, action) => {
      let nextState = {
        ...state, // use previous state
        ...action.payload.category // apply delta from hydration
      }
      if (state?.categories) nextState = state //preserve user value on client side navigation
      return nextState
    }
  } */
})

export const {
  requestCategory,
  categorySuccess,
  categoryError,
  requestCategoryFetched
} = categorySlice.actions
export default categorySlice.reducer
