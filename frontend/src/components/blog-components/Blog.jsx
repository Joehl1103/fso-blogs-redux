import Togglable from "../Togglable";
import DeleteButton from "./DeleteButton";
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from "react-router-dom";
import { deleteBlog, upLike } from "../../reducers/blogSlice";
import { setNotificationAndTimeout } from "../../reducers/notificationSlice";
import RootRedirect from "../route-components/RootRedirect";
import commentsService from '../../services/commentsService'
import { Link } from 'react-router-dom'

const Blog = ({
  loggedinUser,
}) => {
  if(loggedinUser.token.length === 0){
    return <RootRedirect loggedinUser={loggedinUser}/>
  }
  const blogId = useParams().id
  const blogs = useSelector(state => state.blogs)
  const blog = blogs.filter(b => b.id === blogId)[0]
  const users = useSelector(state => state.users)
  const token = useSelector(state => state.token)
  console.log('token',token)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [commentValue, setCommentValue] = useState()
  const [blogComments, setBlogComments] = useState()
  
  const getAllCommentsAndFilterById = async (blogId) =>{
    const allComments = await commentsService.getAllComments()
    const comms = allComments.length > 0 ? allComments.filter(c => c.blog.id === blogId) : []
    return comms
  }
  useEffect(() => {
    getAllCommentsAndFilterById(blogId)
      .then(r => {
        setBlogComments(r)
      })
  },[refreshTrigger])

  if(users.length === 0 || !blogs ){
    return <div>...loading</div>
  }

  const blogUser = users.filter(u => u._id === blog.user._id)[0]

  const handleBlogDelete = async (id, title, author) => {
    if (window.confirm(`Are you sure that you want to delete ${title} by ${author}?`,)) {
      dispatch(deleteBlog(id, token))
      dispatch(setNotificationAndTimeout("deleted", `${title} by ${author} successfully deleted`, 5000))
      navigate('/blogs')
    }
  }

  async function handleLike(blog) {
    const newBlogObject = {
      ...blog,
      likes: blog.likes + 1,
    }
    dispatch(upLike(blog.id, newBlogObject, token))
    dispatch(setNotificationAndTimeout("success", `${blog.title} was just upvoted`, 5000))
  }

  const handleCommentSubmit = async (event) => {
    event.preventDefault()
    const commentObject = {
      content: commentValue,
      date: new Date(),
      blogId: blogId
    }
    try {
      await commentsService.createComment(commentObject,token)
      setRefreshTrigger(prev => prev + 1)
      dispatch(setNotificationAndTimeout('success','Comment added',5000))
    } catch (e) {
      console.error('Something went wrong while creating comment',e.message)
    }
  }

  const formatDate = (date) =>{
    const dateInLocale = date.toLocaleString()
    const split = dateInLocale.split(',')
    return `${split[0]} at ${split[1]}`
  }

  const handleCommentDelete = async (commentId) => {
    try{
      await commentsService.deleteComment(commentId,token)
      setRefreshTrigger(prev => prev + 1)
      dispatch(setNotificationAndTimeout('success','Comment deleted',5000))
    } catch (e) {
      console.error(`Something went wrong while deleting comment: ${e.message}`)
    }
  }

  console.log('blogUser',blogUser)

  return (
    <div>
      <div className="">
        <h2 className="header">Blog</h2>
        <div className="m-2">
        <h3 data-testid="blog-title">{blog.title} by {blog.author}</h3>
          <div className="flex-col">
            <div>Author: {blog.author}</div>
            <div>Url: <a href={blog.url}>{blog.url}</a></div>
            <div className="flex gap-1">
              <div>Likes: {blog.likes}</div>
              <button className="btn" data-testid={"like-button"} onClick={() => handleLike(blog)}>
                like
              </button>
            </div>
            <div className="flex gap-2">
              <div>Blog added by <span className="link"><Link to={`/users/${blogUser._id}`}>{blogUser.username}</Link></span></div>
              <div>
                {loggedinUser.id === blog.user._id ? (
                  <DeleteButton blog={blog} handleBlogDelete={handleBlogDelete} />
                ) : null}
              </div>
            </div>
          </div>
          </div>
      </div>
      <div>
        <div>
          <h2 className="header mb-1">Comments</h2> 
          <Togglable buttonLabel="add comment" cancelLabel="close">
            <form onSubmit={handleCommentSubmit}>
              <label>Add comment:</label><br/>
              <textarea className="input h-20 w-60 font-sans" value={commentValue} onChange={({ target }) => setCommentValue(target.value)} /><br/>
              <button className="btn mb-1" type="submit">submit</button>
            </form>
          </Togglable>
         </div>
         <div>
          {blogComments && blogComments.length > 0 ? (
            blogComments.map(c => {
            return (
              <div className="m-3" key={c.id}>
                <hr/>
                <div><q>{c.content}</q></div>
                <div><i>on {formatDate(new Date(c.date))} by {c.user.username}</i> 
                  {c.user._id === loggedinUser.id && 
                    <button className="btn ml-1" onClick={() => handleCommentDelete(c.id)}>
                      delete
                    </button>}
                </div>
              </div>
            )
            }))
          : (
            null)}
         </div>
      </div>
    </div>
  );
};

export default Blog;
