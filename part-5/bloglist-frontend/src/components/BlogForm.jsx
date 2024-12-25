import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'

const BlogForm = forwardRef(({ handleCreateNewBlog }, ref) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [showForm, setShowForm] = useState(false)

  const resetForm = () => {
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  const toogleBlogForm = () => {
    setShowForm(!showForm)
    resetForm()
  }

  useImperativeHandle(ref, () => {
    return {
      title,
      author,
      url,
      toogleBlogForm,
    }
  })

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
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>author</td>
                  <td>
                    <input
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </td>
                </tr>
                <tr>
                  <td>url</td>
                  <td>
                    <input
                      type="text"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
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
        <button onClick={toogleBlogForm}>new blog</button>
      )}
    </>
  )
})

BlogForm.displayName = 'BlogForm'
BlogForm.propTypes = {
  handleCreateNewBlog: PropTypes.func.isRequired,
}

export default BlogForm
