import BlogForm from "./BlogForm";
import Togglable from "../Togglable";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import NotificationDisplay from "../NotificationDisplay";
import DeleteButton from "./DeleteButton";
import { deleteBlog } from "../../reducers/blogSlice";
import { setNotificationAndTimeout } from "../../reducers/notificationSlice";

const BlogDisplay = () => {
  const blogs = useSelector(state => state.blogs)
  const token = useSelector(state => state.token)
  const loggedinUser = useSelector(state => state.loggedinUser)
  const dispatch = useDispatch()

  const handleBlogDelete = async (id, title, author) => {
    if (window.confirm(`Are you sure that you want to delete ${title} by ${author}?`)) {
      dispatch(deleteBlog(id, token))
      dispatch(setNotificationAndTimeout('deleted', `${title} by ${author} successfully deleted`, 5000))
    }
  }

  return (
    <div>
       <NotificationDisplay/>
      <div className="mt-2">
        <Togglable buttonLabel="create new blog" cancelLabel="cancel">
          <BlogForm />
        </Togglable>
      </div>

      <h2 className="header">Blogs</h2>
      <ul>
      {blogs && blogs.map((blog) => {
        const blogUserId = typeof blog.user === 'string' ? blog.user : blog.user?._id
        const canDelete = blogUserId && loggedinUser.id === blogUserId

        return (
          <li className="flex items-center gap-2" key={blog.id}>
            <span className="link"><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></span>
            {canDelete ? (
              <DeleteButton blog={blog} handleBlogDelete={handleBlogDelete} />
            ) : null}
          </li>
        );
      })}
      </ul>
    </div>

  );
};

export default BlogDisplay;
