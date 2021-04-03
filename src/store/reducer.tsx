import { AnyAction } from 'redux'

const initialState: RootState = {
  salary: 50000,
  married: false,
  taxRate: 25,
  state: '',
  deductions: 0,
  stdDeduct: false,
  retireContributions: 0,
  retireRate: 0,
  retireRateOf: 0,
}

const reducer = (state: RootState = initialState, action: AnyAction) => {
  if (action.type === "HANDLE_TEXT_CHANGE") {
    let name = action.name;
    let value = action.value;
    let newState = {
      ...state,
      [name]: value,
    }
    return state
  }
}

export default reducer