import { useState } from "react";
import PasswordInput from "./PasswordInput";
import { setNotificationAndTimeout } from "../reducers/notificationSlice";
import { useDispatch, useSelector } from "react-redux";
import { loginAndSetLoggedinUser } from '../reducers/loggedinUserSlice.js'
import { setTimeoutForLogout } from "../utils/helper.js";
import { useNavigate } from 'react-router'
import NotificationDisplay from "./NotificationDisplay.jsx";

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await dispatch(loginAndSetLoggedinUser(username, password))
      setTimeoutForLogout()
      navigate('/blogs')
    } catch (e) {
      console.log(`Error ${e.message}`);
      dispatch(setNotificationAndTimeout("error", "wrong username or password", 5000))
    }
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="p-1 m-1 w-50 w-max">
      <div>
          <div>Hi there! Welcome to my app! Please log-in:</div>
      </div>
      <NotificationDisplay/>
      <form onSubmit={handleLogin} className="flex flex-col gap-1 mt-5 items-center">
        <div className="flex flex-col gap-2 ">
        <div className="labelInputClass">
          <label className="">Username:</label>
          <input
            data-testid="username"
            type="text"
            value={username}
            name="Username"
            placeholder="username"
            onChange={({ target }) => setUsername(target.value)}
            className="input"
          />
        </div>
        <div>
          <PasswordInput
            data-testid="password"
            password={password}
            setPassword={setPassword} />
        </div>
        </div>
        <button className="self-center btn" type="submit" data-testid="login-button">
          login
        </button>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
