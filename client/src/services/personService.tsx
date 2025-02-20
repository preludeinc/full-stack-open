import axios from 'axios'
const baseURL = 'http://localhost:3001/api/people';

const getAll = () => {
    return axios.get(baseURL)
}

const create = (newPerson: any) => {
    return axios.post(baseURL, newPerson)
}

const update = (id: number, newPerson: any) => {
    return axios.put(`${baseURL}/${id}`, newPerson)
}

const remove = (id: number) => {
    return axios.delete(`${baseURL}/${id}`)
}

export default {
    getAll: getAll,
    create: create,
    update: update,
    remove: remove
}