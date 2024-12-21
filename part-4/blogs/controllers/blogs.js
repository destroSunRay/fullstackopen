const Blog = require('../models/blogs')
const blogsRouter = require('express').Router()


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response, next) => {
  try {
    const blog = new Blog(request.body)

    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    response.status(400).send(error)
    next(error)
  }

})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const { title, url, author } = request.body
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      request.params.id,
      { title, url, author },
      { new: true, runValidators: true, context: 'query' }
    )
    response.json(updatedBlog)
  } catch (error) {
    next(error)
  }
})

module.exports = blogsRouter