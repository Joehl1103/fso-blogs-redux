import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserView = () => {
    const users = useSelector(state => state.users)
    console.log('users',users)
 return (
    <div className="relative overflow-x-auto flex-col justify-items-center mt-5">
        <table className="border-collapse ">
            <thead className="bg-sky-400 ">
                <tr>
                    <th className="header-cell-left">Username</th>
                    <th className="header-cell-right">Number of Blogs</th>
                </tr>
            </thead>
            <tbody>
                {users.map(u => {
                    return(
                        <tr key={u._id} className="bg-sky-100">
                            <td className="body-cell-left"><Link to={`/users/${u._id}`}>{u.username}</Link></td>
                            <td className="body-cell-right">{u.blogs.length}</td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </div>
 )
}

export default UserView