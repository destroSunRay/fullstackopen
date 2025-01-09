import axios from 'axios'


const baseURL = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createNew = async (anecdote) => {
  const response = await axios.post(baseURL, anecdote)
  return response.data
}

const update = async (id, anecdote) => {
  const resposne = await axios.put(`${baseURL}/${id}`, anecdote)
  return resposne.data
}

export default { getAll, createNew, update }