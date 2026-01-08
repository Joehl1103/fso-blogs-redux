import { setTitle, setAuthor, setUrl, setAllThreeToBlank } from '../../reducers/blogInfoSlice.js'
import { addBlog } from '../../reducers/blogSlice.js'
import { useSelector, useDispatch } from 'react-redux';
import { setNotificationAndTimeout } from '../../reducers/notificationSlice.js'

const BlogForm = () => {
  const { title, author, url } = useSelector(state => state.blogInfo)
  const dispatch = useDispatch();

  const token = useSelector(state => state.token)

  const handleSubmit = (event) => {
    event.preventDefault()
    const blogInfo = {
      title: title,
      author: author,
      url: url,
      likes: 0,
      user: null,
    };
    try {
      dispatch(addBlog(blogInfo,token))
      dispatch(setAllThreeToBlank())
      dispatch(setNotificationAndTimeout("success", `${title} by ${author} added!`, 5000))
    } catch (error) {
      dispatch(setNotificationAndTimeout("error", error.message, 5000))
    }
  }

  return (
    <>
      <h2 className="header">Add new blog</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-2 p-2">
          <div className="labelInputClass">
            <label className="mr-18px">Title:</label>
            <input
              data-testid="title"
              type="text"
              name="title"
              value={title}
              onChange={({ target }) => dispatch(setTitle(target.value))}
              className="input"
            />
          </div>
          <div className="labelInputClass">
            <label>Author:</label>
            <input
              data-testid="author"
              type="text"
              name="author"
              value={author}
              onChange={({ target }) => dispatch(setAuthor(target.value))}
              className="input ml-0.5px w-142px"
            />
          </div>
          <div className="labelInputClass">
            <label className="mr-25px">Url:</label>
            <input
              data-testid="url"
              type="text"
              name="url"
              value={url}
              onChange={({ target }) => dispatch(setUrl(target.value))}
              className="input"
            />
          </div>
        </div>
        <button className="btn mb-1" data-testid="createBlogButton" type="submit">
          create new blog
        </button>
      </form>
    </>
  );
};

export default BlogForm;
