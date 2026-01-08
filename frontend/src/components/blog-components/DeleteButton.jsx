const DeleteButton = ({ blog, handleBlogDelete }) => {
  return (
    <>
      <button className="btn"
        onClick={() => handleBlogDelete(blog.id, blog.title, blog.author)}
      >
        delete blog
      </button>
      <br />
    </>
  );
};

export default DeleteButton;
