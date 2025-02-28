import { createSlice } from '@reduxjs/toolkit'

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: []
  },
  reducers: {
    createNotification: (state, action) => {
      message = action.payload
      state.notifications.push({
      message: message
    })
  }
  }
})

export const { createNotification } = NotificationSlice.actions
export default NotificationSlice