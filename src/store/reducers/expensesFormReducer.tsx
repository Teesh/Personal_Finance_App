import { AnyAction } from 'redux'
import * as actionTypes from '../actions'

const initialState: ExpensesState = {
  homeowner: false,
  rent: 0,
  rentInsurance: 0,
  utilities: 0,
  groceries: 0,
  misc: 0,
  mortgagePay: 0,
  mortgageRate: 3.18,
  propertyValue: 0,
  hoaFees: 0,
  hoInsurance: 0,
  downPayment: 50,
  mortgageLength: 30,
  pmiRate: 0,
}

const reducer = (state: ExpensesState = initialState, action: AnyAction): ExpensesState => {
  switch (action.type) {
    case actionTypes.HANDLE_EXPENSES_TEXT_CHANGE:
      return {
        ...state,
        [action.name]: action.value,
      }
    case actionTypes.HANDLE_EXPENSES_SLIDER_CHANGE:
      return {
        ...state,
        downPayment: action.value,
      }
    case actionTypes.HANDLE_YEAR_CHANGE:
      console.log(action.value)
      return {
        ...state,
        mortgageLength: action.value,
      }
    case actionTypes.HANDLE_HOMEOWNER_CHANGE:
      return {
        ...state,
        homeowner: action.value,
      }
    default:
      return state
  }
}

export default reducer