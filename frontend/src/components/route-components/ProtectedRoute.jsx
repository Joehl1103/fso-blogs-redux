import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({ children, loggedinUser, redirectTo = "/login" }) => {
    if(loggedinUser.token.length === 0){
        return <Navigate to={redirectTo} replace/>
    }
    return children
}

export default ProtectedRoute