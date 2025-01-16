const Blog = require('../models/blogs')
const blogsRouter = require('express').Router()
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { blogs: 0 })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    const { title, url, author, likes } = request.body
    const blog = new Blog({ title, url, author, likes, user: user.id })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    await savedBlog.populate('user', { blogs: 0 })

    response.status(201).json(savedBlog)
  } catch (error) {
    next(error)
  }

})

blogsRouter.post('/:id/comments', async (request, response, next) => {
  try {
    const comment = request.body
    const id = request.params.id
    const blog = await Blog.findById(id)

    blog.comments = blog.comments.concat(comment)
    blog.save()
    response.status(201).json(blog)
  } catch (error) {
    next(error)
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response, next) => {
  try {
    const user = request.user
    const id = request.params.id
    const blog = await Blog.findById(id)
    if (user.id === blog.user.toString()) {
      await Blog.findByIdAndDelete(id)
      user.blogs = user.blogs.filter(blog => blog.id === id)
      await user.save()
      response.status(204).end()
    } else {
      response.status(403).json({ error: 'Only the user who created the blog can delete it.' })
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, url, author, likes, comments } = request.body
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, url, author, likes, comments },
      { new: true, runValidators: true, context: 'query' }
    ).populate('user', { blogs: 0 })
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter