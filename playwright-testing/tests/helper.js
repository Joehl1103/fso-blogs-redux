const loginWith = async (page, username, password) => {
  await page.getByText('show login form').click()
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByTestId('login-button').click()
}

const createBlog = async (page, title, author, url) => {
  await page.getByTestId('title').fill(title)
  await page.getByTestId('author').fill(author)
  await page.getByTestId('url').fill(url)
  await page.getByTestId('createBlogButton').click()
  console.log(`${title} by ${author}`)
  await page.getByRole('heading', { name: `${title} by ${author}` }).waitFor()
}

const addLike = async (page, id) => {
  await page.getByTestId(`like-button${id}`).click()
}

const logout = async (page) => {
  page.on('dialog', dialog => dialog.accept())
  await page.getByText('logout').click()
  await page.getByText('show login form').waitFor({})
}

module.exports = { loginWith, createBlog, logout }
