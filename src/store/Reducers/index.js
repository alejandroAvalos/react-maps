import { combineReducers } from 'redux'
import technicianLocationReducer from './technicianLocationReducer'

const rootReducer = combineReducers({
  technicianLocation: technicianLocationReducer
})

export default rootReducer
