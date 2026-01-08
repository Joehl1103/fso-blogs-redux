import { useEffect } from "react";
import BlogDisplay from "./components/blog-components/BlogDisplay";
import Blog from './components/blog-components/Blog'
import LoginForm from "./components/LoginForm";
import NotificationDisplay from "./components/NotificationDisplay";
import { useSelector, useDispatch } from 'react-redux'
import { setLoggedinUserState, logoutAndClearLoggedinUser } from "./reducers/loggedinUserSlice"
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom'
import { initializeUsers } from "./reducers/usersSlice";
import { initializeBlogs } from "./reducers/blogSlice";
import UserView from './components/users/UserView'
import User from './components/users/User'
import RootRedirect from "./components/route-components/RootRedirect";
import ProtectedRoute from "./components/route-components/ProtectedRoute";
import { setToken } from "./reducers/tokenSlice";
import Nav from './components/Nav'
import Footer from './components/Footer'
import './styles.css'

const App = () => {
  const loggedinUser = useSelector(state => state.loggedinUser)
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedinUser")
    if (loggedInUser) {
      const loggedInUserParsed = JSON.parse(loggedInUser)
      dispatch(setLoggedinUserState(loggedInUserParsed))
      dispatch(setToken(loggedInUserParsed.token))
    } else {
      dispatch(logoutAndClearLoggedinUser())
    }
    dispatch(initializeUsers())
    dispatch(initializeBlogs())
  }, []);

  return (
    <div className="">
        {loggedinUser.token.length === 0 ? (<></>):(<Nav loggedinUser={loggedinUser}/>)}
     
      <Routes>
        <Route path="/" element={<RootRedirect loggedinUser={loggedinUser}/>}/>
        <Route path="/login" element={loggedinUser.token.length === 0 ? <LoginForm/> : <Navigate to="/blogs"/>}/>
        <Route path="/blogs" element={
           <ProtectedRoute loggedinUser={loggedinUser}>
            <BlogDisplay /> 
          </ProtectedRoute>
        }/>
        <Route path="/blogs/:id" element={
          <ProtectedRoute loggedinUser={loggedinUser}>
            <Blog loggedinUser={loggedinUser}/>
          </ProtectedRoute>
        }/>
        <Route path="/users" element={
          <ProtectedRoute loggedinUser={loggedinUser}>
            <UserView/>
          </ProtectedRoute>
        }/>
        <Route path="/users/:id" element={
          <ProtectedRoute loggedinUser={loggedinUser}>
            <User/>
          </ProtectedRoute>
        }/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App;
