import { useEffect } from "react";
import BlogForm from "./BlogForm";
import Togglable from "../Togglable";
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom'
import NotificationDisplay from "../NotificationDisplay";

const BlogDisplay = ({ }) => {
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
  }, [])

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
        return (
          <li className="link" key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title} by {blog.author}</Link></li>
        );
      })}
      </ul>
    </div>

  );
};

export default BlogDisplay;
