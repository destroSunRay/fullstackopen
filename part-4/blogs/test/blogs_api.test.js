const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')

const api = supertest(app)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('blog has an unique identifier id as string', async () => {
  const blog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "ajhbskn",
    likes: 12
  }

  const response = await api.post('/api/blogs').send(blog)

  assert(response.body.hasOwnProperty('id'));

})

test('verifed post is appending blog to the blogs list', async () => {
  const intialBlogs = await api.get('/api/blogs')
  const initalBlogsLength = intialBlogs.body.length

  const blog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "kasndkln",
    likes: 12
  }

  const response = await api.post('/api/blogs').send(blog)
  response.body
  const blogsAfterAppending = await api.get('/api/blogs')

  const currentBlogsLength = blogsAfterAppending.body.length
  assert.strictEqual(currentBlogsLength, initalBlogsLength + 1)
})

test('verifies that if the likes property is missing from the request, it will default to the value 0', async () => {
  const blog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "ajksbd.com/blogs"
  }

  const response = await api.post('/api/blogs').send(blog)
  assert.strictEqual(response.body.likes, 0)
})

describe('verify that if the title or url properties are missing from the request data, the backend responds to the request with the status code 400 Bad Request', () => {
  test('missing title in post object results in 400 Bad Request', async () => {
    const blog = {
      author: "Edsger W. Dijkstra",
      url: "ajksbd.com/blogs"
    }

    const response = await (await api.post('/api/blogs').send(blog))
    assert.strictEqual(response.status, 400)
  })

  test('missing url in post object results in 400 Bad Request', async () => {
    const blog = {
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
    }

    const response = await (await api.post('/api/blogs').send(blog))
    assert.strictEqual(response.status, 400)
  })
})

test('test the put api, verify the object has been updated', async () => {
  const blog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "ajksbd.com/blogs"
  }

  const response = await api.post('/api/blogs').send(blog)
  const id = response.body.id

  const newBlog = {
    title: "Narnia",
    author: "C. W. Levis",
    // url: "ajksbd.com/blogs"
  }
  const updatedBlog = await api.put(`/api/blogs/${id}`).send(newBlog)
  assert.deepStrictEqual(updatedBlog.body, { ...response.body, ...newBlog })
})

test('test delete api, verify the blog has been deleted', async () => {
  const blog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "ajksbd.com/blogs"
  }

  const response = await api.post('/api/blogs').send(blog)
  const id = response.body.id

  await api.delete(`/api/blogs/${id}`)
  const blogs = await api.get('/api/blogs')
  assert.strictEqual(blogs.body.length, 0)
})

beforeEach(async () => {
  await Blog.deleteMany({})
})


after(async () => {
  await mongoose.connection.close()
})