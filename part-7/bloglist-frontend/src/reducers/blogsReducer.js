import { createSlice } from '@reduxjs/toolkit'
import blogsService from '../services/blogs'
import { setNotification } from './notificationReducer'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => {
      return action.payload
    },
    updateBlog: (state, action) => {
      return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
    },
    deleteBlog: (state, action) => {
      return state.filter(blog => blog.id !== action.payload)
    },
    addBlog: (state, action) => {
      return state.concat(action.payload)
    }
  }
})

const { setBlogs, updateBlog, deleteBlog, addBlog } = blogsSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogsService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const { likes, author, title, url, comments } = blog
    const newBlog = await blogsService.update(blog.id, {
      likes: likes + 1,
      author,
      title,
      url,
      comments
    })
    dispatch(updateBlog(newBlog))
  }
}

export const addComment = (blog, comment) => {
  return async dispatch => {
    const { likes, author, title, url, comments } = blog
    const newBlog = await blogsService.update(blog.id, {
      likes,
      author,
      title,
      url,
      comments: comments.concat(comment)
    })
    dispatch(updateBlog(newBlog))
  }
}


export const removeBlog = (blog) => {
  return async (dispatch, getState) => {
    const user = getState().user
    if (
      blog.user.name === user.name &&
      blog.user.username === user.username &&
      window.confirm(`Remove blog ${blog.title}, by ${blog.author}`)
    ) {
      await blogsService.remove(blog.id)
      dispatch(deleteBlog(blog.id))
    }
  }
}

export const createBlog = (newBlog) => {
  return async (dispatch, getState) => {
    const user = getState().user
    try {
      const blog = await blogsService.create(newBlog)
      dispatch(addBlog({ ...blog, user }))
      dispatch(
        setNotification({
          message: `new blog ${newBlog.title} has been added by, ${newBlog.author}`,
        })
      )
    } catch (error) {
      dispatch(setNotification({ message: error.message, type: 'error' }))
    }
  }
}

export default blogsSlice.reducer