import { createSlice } from '@reduxjs/toolkit'

export const NotificationSlice = createSlice({
  name: 'notification',
  initialState: [],
  reducers: {
    setNotification: (state, action) => {
      const content = action.payload
      const id = Math.floor(Math.random() * 10000)
      state.push({ content, id })
    },
    clearNotification: (state, action) => {
      // state.pop()
    }
  }
})

export const { setNotification, clearNotification } = NotificationSlice.actions

export const showNotification = (content, duration) => {
  return dispatch => {
    dispatch(setNotification(content))

    console.log(content.id)

    setTimeout(() => {
      dispatch(clearNotification(content.id))
    }, duration)
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export default NotificationSlice.reducer