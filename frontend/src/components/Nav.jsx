import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { ImMenu } from 'react-icons/im'
import { Link, useNavigate } from 'react-router-dom'
import { logoutAndClearLoggedinUser } from '../reducers/loggedinUserSlice'

const Nav = ({ loggedinUser }) => {
    const [navVisibility,setNavVisibility] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleLogout = () => {
        if (window.confirm("Are you sure that you want to logout?")) {
          dispatch(logoutAndClearLoggedinUser())
          navigate('/login')
        }
      }

    const handleNavVisibility = () => {
        setNavVisibility(!navVisibility)
        console.warn(navVisibility)
      }

    const navClassName = navVisibility ? 'flex flex-row gap-4 bg-red-300 p-1' : 'flex flex-row bg-red-300 gap-4 p-1'
    const menuIconClassName = navVisibility ? 'text-red-800 p-1 cursor-pointer' : 'text-red-800 p-1 cursor-pointer'
    const menuTextClassName = navVisibility ? 'hidden' : 'visible text-red-800 pt-1'
    const linkClassname = navVisibility ? 'flex flex-row gap-4 pt-1 pl-0' : 'invisible'
    const linkTextClassName = 'text-red-900 hover:font-bold no-underline'
    return (
        <>
            <div className="flex w-full">
                
                <div className="grow">
                    <nav className={navClassName}>
                        <div onClick={handleNavVisibility}><ImMenu className={menuIconClassName}/></div>
                        <div className={menuTextClassName}>Menu</div>
                        <div className={linkClassname}>
                            <Link className={linkTextClassName} to="/blogs">Blogs</Link>
                            <Link className={linkTextClassName} to="/users">Users</Link>
                        </div>
                    </nav>
                </div>
                <div className="grow-1 place-content-center justify-center bg-slate-200 p-2">
                Logged in as <b>{loggedinUser.username}</b>{" "}
                </div>
                <div className="basis-1/8 place-content-center p-1 bg-slate-200">
                    <button className="btn" onClick={handleLogout}>logout</button>
                </div>
            </div> 
        </>
    )
}

export default Nav