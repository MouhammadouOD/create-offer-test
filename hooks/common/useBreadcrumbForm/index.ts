import { Dispatch, useReducer } from 'react'

const reducer = (state: BreadcrumbTab[], action: BreadcrumbTabAction) => {
  const tabIndex: number = state.findIndex(tab => tab.id === action.payload.id)
  const newState = [...state]
  switch (action.type) {
    case 'ACTIVE':
      return [
        ...newState.map((tab, index) => {
          if (index === tabIndex) return { ...tab, isActived: true }
          return { ...tab, isActived: false }
        })
      ]
    case 'VALIDATED':
      newState[tabIndex] = { ...newState[tabIndex], isValidated: true }
      return newState
    case 'NOT_VALIDATED':
      newState[tabIndex] = { ...newState[tabIndex], isValidated: false }
      return newState
    case 'ADD_CONTENT':
      newState[tabIndex] = {
        ...newState[tabIndex],
        content: action.payload.content
      }
      return newState
    case 'DELETE_CONTENT':
      newState[tabIndex] = { ...newState[tabIndex], content: null }
      return newState
    case 'VALIDATED_ADD_CONTENT':
      newState[tabIndex] = {
        ...newState[tabIndex],
        isValidated: true,
        content: action.payload.content
      }
      return newState
    default:
      throw new Error('Something went wrong with useBreadcrumbForm !')
  }
}

const useBreadcrumbForm = (
  initialState: BreadcrumbTab[]
): [BreadcrumbTab[], Dispatch<BreadcrumbTabAction>] => {
  const [stateBreadcrumbForm, dispatchBreadcrumbForm] = useReducer(
    reducer,
    initialState
  )

  return [stateBreadcrumbForm, dispatchBreadcrumbForm]
}

export default useBreadcrumbForm
