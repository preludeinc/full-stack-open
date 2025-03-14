import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

export const createAnecdote = async (newAnecdote) => {
  try {
    let votes = newAnecdote.votes || 0
    const formattedAnecdote = {
      content: newAnecdote.content,
      id: String(Math.floor(Math.random() * 10000)),
      votes: votes
    }
    const response = await axios.post(baseUrl, formattedAnecdote)
    return response.data
  } catch (error) {
    return error.message
  }
}

export const updateAnecdote = async (updatedAnecdote) => {
  const response = await axios.put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
  return response.data
}