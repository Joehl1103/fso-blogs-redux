import { createSlice } from '@reduxjs/toolkit'

export const blogInfoSlice = createSlice({
  name: 'blogInfo',
  initialState: {
    title: '',
    author: '',
    url: ''
  },
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setAuthor: (state, action) => {
      state.author = action.payload
    },
    setUrl: (state, action) => {
      state.url = action.payload
    },
  }
})

export const { setTitle, setAuthor, setUrl } = blogInfoSlice.actions

export const setAllThreeToBlank = () => {
  return async dispatch => {
    dispatch(setTitle(""))
    dispatch(setAuthor(""))
    dispatch(setUrl(""))
  }
}

export default blogInfoSlice.reducer 
