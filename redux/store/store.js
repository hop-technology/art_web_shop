import { configureStore } from '@reduxjs/toolkit'

import { messageReducer } from '../reducers/message.slice'

const reducer = {
  message: messageReducer,
}

const store = configureStore({
  reducer,
})

export default store
