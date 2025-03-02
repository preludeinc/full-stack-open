import { createSlice } from '@reduxjs/toolkit'

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    createNotification: (state, action) => {
      const content = action.payload
      const id = Math.floor(Math.random() * 100000)
      state.push({ content, id })
    },
    clearNotification: (state, action) => {
      state.pop()
    }
  }
})

export const { createNotification, clearNotification } = NotificationSlice.actions
export default NotificationSlice.reducer