import axios from 'axios';
const baseURL = '/api/blogs';

const getAll = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

const create = async (newBlog, token) => {
  const response = await axios.post(baseURL, newBlog, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const update = async (id, newBlog) => {
  const response = await axios.put(`${baseURL}/${id}`, newBlog);
  return response.data;
};

const remove = async (id, token) => {
  const response = await axios.delete(`${baseURL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default { getAll, create, update, remove };
