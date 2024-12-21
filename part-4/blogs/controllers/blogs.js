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

module.exports = blogsRouter