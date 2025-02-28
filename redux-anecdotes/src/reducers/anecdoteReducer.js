import { createSlice } from '@reduxjs/toolkit'

const initialState = [
  {
    content: 'Be yourself, everyone else is already taken',
    votes: 0,
    id: 1
  },
  {
    content: 'You\'re braver than you believe, stronger than you seem, and smarter than you think.',
    votes: 0,
    id: 2
  }
]

const getId = () => 
  (100000 * Math.random()).toFixed(0)

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    createAnecdote: (state, action) => {
      const content = action.payload
      state.push({
        content,
        id: getId(),
        votes: 0
      })
    },
    voteOnAnecdote: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.find(s => s.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
  },
})

export const { createAnecdote, voteOnAnecdote } = anecdoteSlice.actions
export default anecdoteSlice.reducer