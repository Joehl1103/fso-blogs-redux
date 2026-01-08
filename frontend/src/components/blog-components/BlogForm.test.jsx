import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import blogService from "../../services/blogs";
import BlogForm from "./BlogForm";
import { useState } from "react";

test("", async () => {
  const mockHandlerCreateBlog = vi.fn();

  function TestWrapper() {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
    return (
      <BlogForm
        title={title}
        setTitle={setTitle}
        author={author}
        setAuthor={setAuthor}
        url={url}
        setUrl={setUrl}
        createBlog={mockHandlerCreateBlog}
      />
    );
  }

  let container = render(<TestWrapper />).container;

  const user = userEvent.setup();
  await user.type(container.querySelector("#title"), "Title");
  await user.type(container.querySelector("#author"), "Author");
  await user.type(container.querySelector("#url"), "url");

  const form = container.querySelector("form");
  fireEvent.submit(form);

  expect(mockHandlerCreateBlog).toHaveBeenCalledTimes(1);

  expect(mockHandlerCreateBlog).toHaveBeenCalledWith("Title", "Author", "url");
});
