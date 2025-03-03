import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const anecdotes = await getAll()
  const votes = content.votes || 0

  const object = { 
    content: content, 
    votes: votes,
    id: String(anecdotes.length + 1)
  }
  const response = await axios.post(baseUrl, object)
  return response.data
}

const update = async (id) => {
  const anecdotes = await getAll()

  const anecdoteToChange = anecdotes.find(s => s.id === id)
  const updateAnecdote = {
    ...anecdoteToChange,
    votes: anecdoteToChange.votes + 1
  }
  const response = await axios.put(`${baseUrl}/${id}`, updateAnecdote)
  return response.data
}

export default { 
  getAll, 
  createNew, 
  update,
}