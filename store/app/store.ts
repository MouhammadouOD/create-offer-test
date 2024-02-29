import { configureStore } from '@reduxjs/toolkit'
import { createWrapper } from 'next-redux-wrapper'
import categoryReducer from '@/redux/category/categorySlice'
import countryReducer from '@/redux/country/countrySlice'
import sessionReducer from '@/redux/session/sessionSlice'
import tagReducer from '@/redux/tag/tagSlice'

const isDev = process.env.NODE_ENV === 'development'

export const store = configureStore({
  reducer: {
    category: categoryReducer,
    country: countryReducer,
    session: sessionReducer,
    tag: tagReducer
  },
  devTools: isDev //isDev
})

export const makeStore = () => store

/* export type AppDispatch = typeof store.dispatch
export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<typeof store.getState> */

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

/* const wrapper = createWrapper<AppStore>(makeStore, { debug: isDev }) //isDev
export default wrapper */
