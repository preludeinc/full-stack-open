import axios from 'axios'
const baseURL = '/api/blogs'

const getAll = async() => {
  const response = await axios.get(baseURL)
  return response.data
}

const create = async newBlog => {
  const response = axios.post(baseURL, newBlog)
  return response.data
}

const update = async (id, newBlog) => {
  const response = await axios.put(`${ baseURL } /${id}`, newBlog)
  return response.data
}

export default { getAll, create, update }