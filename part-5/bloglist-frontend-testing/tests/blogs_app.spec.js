const { test, describe, expect, beforeEach } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog App', () => {

  beforeEach(async ({ page, request }) => {

    await request.post('http://localhost:5173/api/testing/reset')

    await request.post('http://localhost:5173/api/users', {
      data: {
        name: 'Test User',
        username: 'testuser',
        password: 'password'
      }
    })

    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {

    const locator = await page.getByText('login into application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'password')

      await expect(page.getByText('Welcome testuser')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrong-password')

      const locator = await page.getByText('login into application')
      await expect(locator).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'password')
    })

    test('a new blog can be created', async ({ page }) => {
      const newBlog = {
        title: 'Narnia: The Prince Caspian',
        author: 'C.S.Lewis',
        url: 'narnia.com'
      }

      await createBlog(page, newBlog)

      await expect(page.getByText(`new blog ${newBlog.title} has been added by, ${newBlog.author}`)).toBeVisible()
    })

    describe('and a blog exists', () => {
      const newBlog = {
        title: 'Narnia: The Prince Caspian',
        author: 'C.S.Lewis',
        url: 'narnia.com'
      }
      beforeEach(async ({ page }) => {

        await createBlog(page, newBlog)
      })

      test('blog can be liked', async ({ page }) => {
        const blog = page.locator(`text=${newBlog.title} || ${newBlog.author}`).locator('..')
        await blog.getByText('view').click()

        await blog.getByText('like').click()

        await expect(blog.getByText('likes 1')).toBeVisible()
      })

      test('delete blog', async ({ page }) => {
        page.on('dialog', async dialog => {
          // console.log(dialog.message());
          await dialog.accept();
        })
        const blog = page.getByText(`${newBlog.title} || ${newBlog.author}`).locator('..')
        await blog.getByText('view').click()

        await blog.getByText('remove').click()

        await expect(page.getByText(`${newBlog.title} || ${newBlog.author}`)).toBeHidden()
      })

      test('only the user who added the blog sees the delete button', async ({ page, request }) => {
        // Create another user
        await request.post('http://localhost:5173/api/users', {
          data: {
            name: 'Another User',
            username: 'anotheruser',
            password: 'password'
          }
        })

        // Log out the current user
        await page.getByText('logout').click()

        // Log in with the new user
        await loginWith(page, 'anotheruser', 'password')

        // Check that the delete button is not visible
        const blog = page.locator(`text=${newBlog.title} || ${newBlog.author}`).locator('..')
        await blog.getByText('view').click()

        await expect(blog.getByText('remove')).toBeHidden()
      })

      test('blogs are ordered according to likes', async ({ page }) => {
        const blog1 = {
          title: 'First Blog',
          author: 'Author One',
          url: 'firstblog.com'
        }

        const blog2 = {
          title: 'Second Blog',
          author: 'Author Two',
          url: 'secondblog.com'
        }

        await createBlog(page, blog1)
        await createBlog(page, blog2)

        // Like the second blog twice
        let blog = page.locator(`text=${blog2.title} || ${blog2.author}`).locator('..')
        await blog.getByText('view').click()
        await blog.getByText('like').click()
        await blog.getByText('like').click()

        // Like the first blog once
        blog = page.locator(`text=${blog1.title} || ${blog1.author}`).locator('..')
        await blog.getByText('view').click()
        await blog.getByText('like').click()

        // Reload the page to ensure the order is updated
        await page.reload()

        // Check the order of the blogs
        const blogs = page.locator('.blog')
        const firstBlog = await blogs.nth(0).textContent()
        const secondBlog = await blogs.nth(1).textContent()

        expect(firstBlog).toContain(blog2.title)
        expect(secondBlog).toContain(blog1.title)
      })
    })
  })
})
