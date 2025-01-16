import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showForm, setShowForm] = useState(false)

  const dispatch = useDispatch()

  const handleCreateNewBlog = async e => {
    e.preventDefault()
    const newBlog = { title, author, url }
    dispatch(createBlog(newBlog))
    toogleBlogForm()
  }

  const resetForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const toogleBlogForm = () => {
    setShowForm(!showForm)
    resetForm()
  }

  return (
    <>
      {showForm ? (
        <div>
          <h3>Create a new Blog</h3>
          <form onSubmit={handleCreateNewBlog}>
            <table>
              <tbody>
                <tr>
                  <td>title</td>
                  <td>
                    <input
                      data-testid="title"
                      type="text"
                      placeholder="Title"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>author</td>
                  <td>
                    <input
                      data-testid="author"
                      type="text"
                      placeholder="Jhon Doe"
                      value={author}
                      onChange={e => setAuthor(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>url</td>
                  <td>
                    <input
                      data-testid="url"
                      type="text"
                      placeholder="example.com"
                      value={url}
                      onChange={e => setUrl(e.target.value)}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <button type="submit">create</button>
            </div>
          </form>
          <div style={{ marginTop: '0.3rem' }}>
            <button onClick={toogleBlogForm}>cancel</button>
          </div>
        </div>
      ) : (
        <button onClick={toogleBlogForm}>create blog</button>
      )}
    </>
  )
}

BlogForm.displayName = 'BlogForm'

export default BlogForm
