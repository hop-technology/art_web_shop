import { createSlice } from '@reduxjs/toolkit'

const messageSlice = createSlice({
  name: 'message',
  initialState: {
    message: '',
    open: false,
  },
  reducers: {
    successMessage: (state, action) => {
      return {
        ...state,
        message: action.payload,
        open: true,
        success: true
      }
    },
    errorMessage: (state, action) => {
      return {
        ...state,
        message: action.payload,
        open: true,
        success: false
      }
    },
    resetMessage: (state, action) => {
      return {
        ...state,
        message: '',
        open: false,
      }
    },
  },
})

export const messageReducer = messageSlice.reducer

export const { successMessage, resetMessage, errorMessage } =
  messageSlice.actions
