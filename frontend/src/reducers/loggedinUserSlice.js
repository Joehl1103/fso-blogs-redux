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
    getLoggedinUserState: (state, action) => {
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
    clearLoggedinUserState: (state, action) => {
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
      console.warn('error while logging in')
      throw new Error(`error: ${e.message}`)
    }
    dispatch(setLoggedinUserState(user))
    window.localStorage.setItem("loggedinUser", JSON.stringify(user))
    dispatch(setToken(user.token))
  }
}

export const logoutAndClearLoggedinUser = () => {
  return async dispatch => {
    console.warn('LET ME KNOW WHEN LOCALSTORAGE IS BEING CLEARED')
    localStorage.clear()
    dispatch(clearLoggedinUserState())
    dispatch(clearToken())
  }
}


export default userSlice.reducer
