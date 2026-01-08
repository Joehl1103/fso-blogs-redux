import { Navigate } from "react-router-dom"

const RootRedirect = ({ loggedinUser }) => {
    if(loggedinUser.token.length === 0){
      return <Navigate to="/login" replace/>
    }
    return <Navigate to="/blogs" replace/>
  }

export default RootRedirect