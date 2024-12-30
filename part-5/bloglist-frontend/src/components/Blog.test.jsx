import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, test, expect, describe, beforeEach } from 'vitest'
import Blog from './Blog'

describe('<Blog />', () => {
  let container

  const blog = {
    id: 'blog_id',
    title: 'Title',
    author: 'Author',
    url: 'URL',
    likes: 100,
    user: {
      name: 'Name',
      username: 'UserName',
      id: 'User ID'
    }
  }

  const mockHandleLike = vi.fn()
  const mockRemoveBlog = vi.fn()

  beforeEach(() => {
    container = render(
      <Blog
        blog={blog}
        handleBlogUpdate={mockHandleLike}
        handleRemoveBlog={mockRemoveBlog}
      />
    ).container
  })

  test('renders Blog Content', () => {
    const element = screen.getByText(`${blog.title} || ${blog.author}`)
    const elementWithLikes = container.querySelector('.blog-details')

    expect(element).toBeDefined()
    expect(elementWithLikes).toBeNull()
  })

  test('renders Blog content without the blog-details', () => {
    const element = screen.getByText(`${blog.title} || ${blog.author}`)
    const elementWithLikes = container.querySelector('.blog-details')

    expect(element).toBeDefined()
    expect(elementWithLikes).toBeNull()
  })

  test('Blog component shows blog details when the user cliks view button', () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')

    user.click(viewButton)

    const elementWithBlogDetails = container.querySelector('.blog-details')
    expect(elementWithBlogDetails).toBeDefined()
  })

  test('Blog component calls functions with clicks on like button', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')

    await user.click(viewButton)

    const likeButton = screen.getByText('like')

    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandleLike.mock.calls).toHaveLength(2)
  })
})
