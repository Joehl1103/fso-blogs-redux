import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogsService.js'
import { reverse } from '../utils/helper.js'

export const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {

   setBlogs: (state, action) => {
      return action.payload
    },
    newBlog: (state, action) => {
      return state.concat(action.payload)
    },
    delBlog: (state, action) => {
      return state.filter(blog => blog.id !== action.payload)
    },
    plusLike: (state, action) => {
      const newStateWithUpdatedLike = state.map(blog => {
        if (blog.id === action.payload) {
          const newBlog = { ...blog, likes: blog.likes + 1 }
          return newBlog
        }
        return blog

      })
      const sortedState = newStateWithUpdatedLike.sort(reverse)
      return sortedState
    }
  }
})

export const { setBlogs, newBlog, plusLike, delBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    // console.log('blogs in initializeBlogs', blogs)
    blogs.sort(reverse);
    dispatch(setBlogs(blogs))
  }
}

// todo add the global state of the token when addblog is called
export const addBlog = (blogInfo,token) => {
  return async dispatch => {
    const res = await blogService.createBlog(blogInfo,token)
    dispatch(newBlog(res))
  }
}

export const deleteBlog = (id, token) => {
  return async dispatch => {
    await blogService.deleteBlog(id, token)
    dispatch(delBlog(id))
  }
}

export const upLike = (id, blogInfo, token) => {
  return async dispatch => {
    await blogService.updateBlog(blogInfo, id, token)
    dispatch(plusLike(id))
  }
}

export default blogSlice.reducer
