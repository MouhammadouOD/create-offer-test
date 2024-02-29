import { store } from './store'

describe('redux state tests', () => {
  it('Should initially set categories to an empty object', () => {
    const categoryState = store.getState().category
    const initialState = {
      categories: {},
      error: null,
      loading: false,
      categoryFetched: {}
    }
    expect(categoryState).toEqual(initialState)
  })

  it('Should initially set countries to an empty object', () => {
    const countryState = store.getState().country
    const initialState = {
      countries: {},
      error: null,
      loading: false,
      countryFetched: {}
    }
    expect(countryState).toEqual(initialState)
  })

  it('Should fetch categories ', () => {
    const categories = {}
    const categoryState = store.getState().category
    const initialState = {
      categories: {},
      error: null,
      loading: false,
      categoryFetched: {}
    }
    expect(categoryState).toEqual(initialState)
  })
})
