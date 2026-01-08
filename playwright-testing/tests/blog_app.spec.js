const { test, expect, describe, beforeEach } = require('@playwright/test')
const { loginWith, createBlog, logout } = require('./helper')

describe('blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3001/api/testing/reset')

    const newUser = {
      username: 'jaloomis',
      name: 'Henry Kissinger',
      password: process.env.TEST_USER_PASSWORD || 'TestPassword123!'
    }
    await request.post('http://localhost:3001/api/users', { data: newUser })

    const anotherUser = {
      username: 'anotherUser',
      name: 'another username',
      password: process.env.TEST_USER_PASSWORD_2 || 'TestPassword456!'
    }

    await request.post('http://localhost:3001/api/users', { data: anotherUser })
    await page.goto('/')

  })

  test('when not logged in displays login form', async ({ page }) => {
    const loginNotVisible = !(await page.getByText("show login form").isVisible())
    if (loginNotVisible) {
      logout(page)
    }
    await page.getByText('show login form').click()
    await expect(page.getByTestId('username')).toBeVisible()
    await expect(page.getByTestId('password')).toBeVisible()
    await expect(page.getByTestId('login-button')).toBeVisible()
    await expect(page.getByText('cancel')).toBeVisible()
  })

  describe('login', () => {
    test('successful login', async ({ page }) => {
      await loginWith(page, 'jaloomis', process.env.TEST_USER_PASSWORD || 'TestPassword123!')
      await page.getByText(`logged in as jaloomis`).waitFor()
      await expect(page.getByText('Logged in as jaloomis')).toBeVisible()

    })

    test('unsuccessful login with incorrect password', async ({ page }) => {
      await loginWith(page, 'jaloomis', 'wrong')
      const errorDiv = page.locator('#notification')
      await expect(errorDiv).toContainText('error: wrong username or password')
      await expect(errorDiv).toHaveCSS('border', '2px solid rgb(100, 2, 2)')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')

    })

    describe('when logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'jaloomis', process.env.TEST_USER_PASSWORD || 'TestPassword123!')
        await page.getByText(`logged in as jaloomis`).waitFor()

      })

      test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await createBlog(page, 'first blog', 'first author', 'first url')
        await expect(page.getByRole('heading', { name: 'first blog by first author' })).toBeVisible()
      })

      test('can like a created blog', async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await createBlog(page, 'first blog', 'first author', 'first url')
        await page.getByRole('button', { name: 'view details' }).click()
        await page.getByRole('button', { name: 'like' }).click()
        await expect(page.getByText('Likes: 1')).toBeVisible()
      })

      test('can delete a blog', async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await createBlog(page, 'first blog', 'first author', 'first url')
        await page.getByRole('button', { name: 'view details' }).click()
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'delete blog' }).click()
        await expect(page.getByRole('heading', { name: 'first blog by first author' })).not.toBeVisible()
      })

      test('only creator can see delete button', async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await createBlog(page, 'first blog', 'first author', 'first url')
        page.on('dialog', dialog => dialog.accept())
        await page.getByRole('button', { name: 'logout' }).click()
        await expect(page.getByRole('button', { name: 'show login form' })).toBeVisible()

        await loginWith(page, 'anotherUser', process.env.TEST_USER_PASSWORD_2 || 'TestPassword456!')
        await expect(page.getByText('Logged in as anotherUser')).toBeVisible()

        await page.getByRole('button', { name: 'view details' }).click()
        await expect(page.getByRole('button', { name: 'delete blog' })).not.toBeVisible()
      })

      test('blogs are sorted by likes', async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await createBlog(page, 'first blog', 'first author', 'first url')
        await createBlog(page, 'second blog', 'second author', 'second url')

        const blogItemOne = await (page.locator('.blogDiv')).first()
        await blogItemOne.getByRole('button', { name: 'view details' }).click()
        await blogItemOne.getByRole('button', { name: 'like' }).click()
        await blogItemOne.getByText('Likes: 1').waitFor()

        const blogItemTwo = await (page.locator('.blogDiv')).nth(1)
        await blogItemTwo.getByRole('button', { name: 'view details' }).click()
        await blogItemTwo.getByRole('button', { name: 'like' }).click()
        await blogItemTwo.getByText('Likes: 1').waitFor()
        await blogItemTwo.getByRole('button', { name: 'like' }).click()
        await page.getByText('Likes: 2').waitFor({ timeout: 5000 })

        const blogItemTwoNowOne = await page.locator('.blogDiv').first()
        await expect(blogItemTwoNowOne).toContainText('Likes: 2')
      })
    })
  })
})
