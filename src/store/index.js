import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import logger from 'redux-logger'
import rootReducer from './Reducers/index'

const store = configureStore({
  reducer: rootReducer,
  applyMiddleware: [logger]
})

export default store;