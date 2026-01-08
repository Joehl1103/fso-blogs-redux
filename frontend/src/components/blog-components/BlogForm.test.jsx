import { test, expect, vi } from 'vitest'
import { render, fireEvent, screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'

import BlogForm from './BlogForm'
import blogInfoReducer from '../../reducers/blogInfoSlice.js'
import tokenReducer from '../../reducers/tokenSlice.js'

vi.mock('../../reducers/blogSlice.js', async () => {
  return {
    addBlog: vi.fn(() => ({ type: 'blogs/addBlogMock' }))
  }
})

vi.mock('../../reducers/notificationSlice.js', async () => {
  return {
    setNotificationAndTimeout: vi.fn(() => ({ type: 'notification/mock' }))
  }
})

test('submitting the blog form dispatches addBlog with entered fields', async () => {
  const blogSlice = await import('../../reducers/blogSlice.js')
  const store = configureStore({
    reducer: {
      blogInfo: blogInfoReducer,
      token: tokenReducer,
    },
    preloadedState: {
      blogInfo: { title: '', author: '', url: '' },
      token: 'Bearer token',
    }
  })

  render(
    <Provider store={store}>
      <BlogForm />
    </Provider>
  )

  fireEvent.change(screen.getByTestId('title'), { target: { value: 'Title' } })
  fireEvent.change(screen.getByTestId('author'), { target: { value: 'Author' } })
  fireEvent.change(screen.getByTestId('url'), { target: { value: 'url' } })

  const submitButton = screen.getByTestId('createBlogButton')
  fireEvent.submit(submitButton.closest('form'))

  expect(blogSlice.addBlog).toHaveBeenCalledTimes(1)
  expect(blogSlice.addBlog).toHaveBeenCalledWith(
    {
      title: 'Title',
      author: 'Author',
      url: 'url',
      likes: 0,
      user: null,
    },
    'Bearer token'
  )
})
