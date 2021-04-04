import { AnyAction } from 'redux'
import * as actionTypes from '../actions'
import { effectiveTaxFormula } from "../../helpers/taxes"

const initialState: IncomeState = {
  salary: 50000,
  married: false,
  taxRate: 25,
  state: '',
  deductions: 12400,
  stdDeduct: true,
  retireContributions: 0,
  retireRate: 0,
  retireRateOf: 0,
  netIncome: 0,
  effectiveTaxRate: 0,
}

const updateComputed = (newState: IncomeState): void => {
  let {etr, netpay} = effectiveTaxFormula({
    income: newState.salary, 
    state: newState.state,
    taxRate: newState.taxRate,
    deductions: newState.deductions,
    retireContributions: newState.retireContributions,
  })
  newState.netIncome = netpay
  newState.effectiveTaxRate = etr
}

const reducer = (state: IncomeState = initialState, action: AnyAction): IncomeState => {
  let newState
  switch (action.type) {
    case actionTypes.HANDLE_INCOME_TEXT_CHANGE:
      newState = {
        ...state,
        [action.name]: action.value,
      }
      updateComputed(newState)
      return newState
    case actionTypes.HANDLE_INCOME_SLIDER_CHANGE:
      newState = {
        ...state,
        salary: action.value,
      }
      updateComputed(newState)
      return newState
    case actionTypes.HANDLE_MARRIED_CHANGE:
      newState = {
        ...state,
        married: action.value === "single" ? false : true,
      }
      updateComputed(newState)
      return newState
    case actionTypes.HANDLE_STD_DEDUCT_CHANGE:
      newState = {
        ...state,
        stdDeduct: action.value,
        deductions: action.value ? 12400 : 0,
      }
      updateComputed(newState)
      return newState
    case actionTypes.HANDLE_STATE_CHANGE:
      newState = {
        ...state,
        state: action.value,
      }
      updateComputed(newState)
      return newState
    default:
      return state
  }
}

export default reducer