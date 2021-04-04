import { combineReducers } from 'redux'
import incomeReducer from './reducers/incomeFormReducer'
import expensesReducer from './reducers/expensesFormReducer'

const rootReducer = combineReducers({
  inc: incomeReducer,
  exp: expensesReducer,
})

export default rootReducer