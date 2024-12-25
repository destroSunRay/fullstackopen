import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const create = async (newBlog) => {
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (blogId, updateBlog) => {
  const response = await axios.put(`${baseUrl}/${blogId}`, updateBlog)
  return response.data
}

const remove = async (blogId) => {
  await axios.delete(`${baseUrl}/${blogId}`, config)
  return
}

export default { getAll, create, update, remove, setToken }