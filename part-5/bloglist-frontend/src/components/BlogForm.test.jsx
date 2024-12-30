import React from 'react'
import BlogForm from './BlogForm'
import { vi, test, describe, beforeEach, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { render, screen } from '@testing-library/react'

describe('<BlogForm />', () => {
  let container
  const mockHandleBlogFormSubmission = vi.fn()
  const mockRef = React.createRef()

  beforeEach(() => {
    container = render(
      <BlogForm
        handleCreateNewBlog={mockHandleBlogFormSubmission}
        ref={mockRef}
      />
    ).container
  })

  test('new blog creation', async () => {
    const user = userEvent.setup()
    const showFormButton = screen.getByText('new blog')

    await user.click(showFormButton)

    const title = screen.getByPlaceholderText('Title')
    const author = screen.getByPlaceholderText('Jhon Doe')
    const url = screen.getByPlaceholderText('example.com')

    if (title && author && url) {
      console.log('all inputs were found')
    }

    const createBlogButton = screen.getByText('create')

    if (createBlogButton) {
      console.log('Found the submit button')
    }

    await user.type(title, 'Narnia')
    await user.type(author, 'C.S.Lewis')
    await user.type(url, 'narnia.com')

    await user.click(createBlogButton)

    expect(mockHandleBlogFormSubmission).toHaveBeenCalledTimes(1)
    expect(mockRef.current.title).toBe('Narnia')
    expect(mockRef.current.author).toBe('C.S.Lewis')
    expect(mockRef.current.url).toBe('narnia.com')
  })
})
