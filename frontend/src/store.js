import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationSlice.js'
import blogReducer from './reducers/blogSlice.js'
import blogInfoReducer from './reducers/blogInfoSlice.js'
import logggedinUserReducer from './reducers/loggedinUserSlice.js'
import usersReducer from './reducers/usersSlice.js'
import tokenReducer from './reducers/tokenSlice.js'

export default configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    blogInfo: blogInfoReducer,
    loggedinUser: logggedinUserReducer,
    users: usersReducer,
    token: tokenReducer
  }
})
