import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/loginService.js'
import { setToken, clearToken } from '../reducers/tokenSlice.js'

export const userSlice = createSlice({
  name: 'loggedinUser',
  initialState: {
    token: '',
    username: '',
    name: '',
    id: ''
  },
  reducers: {
    getLoggedinUserState: (state) => {
      return state
    },
    setLoggedinUserState: (state, action) => {
      const pl = action.payload
      state.token = pl.token
      state.username = pl.username
      state.name = pl.name
      state.id = pl.id
      return state
    },
    clearLoggedinUserState: (state) => {
      state.token = ''
      state.username = ''
      state.name = ''
      state.id = ''
    }
  }
})

export const { setLoggedinUserState, clearLoggedinUserState } = userSlice.actions

export const loginAndSetLoggedinUser = (username, password) => {
  return async dispatch => {
    let user = ''
    try {
      user = await loginService.login({ username, password })
    } catch (e) {
      throw new Error(`error: ${e.message}`)
    }
    dispatch(setLoggedinUserState(user))
    window.localStorage.setItem("loggedinUser", JSON.stringify(user))
    dispatch(setToken(user.token))
  }
}

export const logoutAndClearLoggedinUser = () => {
  return async dispatch => {
    localStorage.clear()
    dispatch(clearLoggedinUserState())
    dispatch(clearToken())
  }
}


export default userSlice.reducer
