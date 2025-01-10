import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAllAnecdotes = async () => {
  const response = await axios.get(baseURL)
  return response.data
}

const createAnecdote = async (anecdote) => {
  const response = await axios.post(baseURL, anecdote)
  return response.data
}

const updateAnecdote = async (anecdote) => {
  const response = await axios.put(`${baseURL}/${anecdote.id}`, anecdote)
  return response.data
}

export default { getAllAnecdotes, createAnecdote, updateAnecdote }