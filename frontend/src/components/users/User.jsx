import { useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const User = () => {
    const userId = useParams().id   
    const users = useSelector(state => state.users)
    if(!users){
        return <>...loading users</>
    }
    const user = users.filter(u => u._id === userId)[0]
    const blogs = useSelector(state => state.blogs)
    const userBlogs = blogs.filter(b => b.user._id === userId)
    console.log('blogs in User',blogs)
    if(!blogs){
        return <>...loading blogs</>
    }
    console.log('user in User',user)
    return (
        <>
         <h2 className="header">User</h2>
            <div className="flex-col">
                <ul>
                    <li><u>Name:</u> {user.name}</li>
                    <li><u>Username:</u> {user.username}</li>
                </ul>
            </div>
         <h2 className="header">Added blogs</h2>
         <ul>
            {userBlogs.length === 0 ?
            (
                <div>This user has no blogs to his name</div>
            ) : (
                userBlogs.map(b => (
                    <li className="link" key={b.id}><Link to={`/blogs/${b.id}`}>{b.title}</Link></li>
                ))
            )
           }
         </ul>
        </>
    )
}

export default User